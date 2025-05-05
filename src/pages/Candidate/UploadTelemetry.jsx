import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { examService } from "@/services/ExamServices";

export default function UploadTelemetryPage({ params }) {
  const navigate = useNavigate();
  const { id: submissionId } = useParams();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Check file type
    const fileType = selectedFile.type;
    const validTypes = ["application/json", "text/csv"];

    if (!validTypes.includes(fileType)) {
      setFileError("Please upload a JSON or CSV file");
      setFile(null);
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size should be less than 5MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setFileError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setFileError("");
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:5000/upload/${submissionId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setUploadSuccess(true);
        setTimeout(() => navigate("/"), 3000);
      } else {
        setFileError(result.message || "Failed to upload telemetry data");
      }
    } catch (error) {
      setFileError("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Upload Telemetry Data
      </h1>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Telemetry Upload</CardTitle>
          <CardDescription>
            Upload your telemetry data in JSON or CSV format
          </CardDescription>
        </CardHeader>
        <CardContent>
          {uploadSuccess ? (
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Upload Successful</AlertTitle>
              <AlertDescription>
                Your telemetry data has been uploaded successfully. Redirecting
                to home page...
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="telemetry">Telemetry File</Label>
                <Input
                  id="telemetry"
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileChange}
                />
                {fileError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{fileError}</AlertDescription>
                  </Alert>
                )}
                <p className="text-sm text-muted-foreground">
                  Upload your flight telemetry data in JSON or CSV format.
                  Maximum file size: 5MB.
                </p>
              </div>

              {file && (
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <AlertTitle>Selected File</AlertTitle>
                  <AlertDescription>
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!uploadSuccess && (
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              {isUploading ? (
                <>Uploading...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Telemetry
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="max-w-md mx-auto mt-6">
        <h3 className="text-lg font-medium mb-2">Sample Telemetry Format</h3>
        <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
          {`{
  "flightData": [
    { "timestamp": "2025-04-15T10:00:00", "batteryLevel": 95, "altitude": 10, "speed": 5 },
    { "timestamp": "2025-04-15T10:01:00", "batteryLevel": 92, "altitude": 15, "speed": 8 }
  ],
  "events": [
    { "timestamp": "2025-04-15T10:01:30", "type": "WARNING", "message": "Strong wind detected" }
  ],
  "summary": {
    "flightDuration": "5m 30s",
    "maxAltitude": 20,
    "maxSpeed": 10,
    "batteryUsage": 15,
    "successRate": 92
  }
}`}
        </pre>
      </div>
    </div>
  );
}
