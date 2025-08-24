import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Search, FileCheck, FileX } from "lucide-react";
import { examService } from "@/services/ExamServices.jsx";
import axios from "axios";

export default function TeacherReviewPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const submissions = examService.getSubmissions();
  const droneTypes = examService.getDroneTypes();
  const [examSubmissions, setExamSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/teacher/fetchExamSubmissions"
        );
        console.log("Fetched submissions:", response.data);
        setExamSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) =>
    submission.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDroneTypeName = (typeId) => {
    const droneType = droneTypes.find((t) => t.id === typeId);
    return droneType ? droneType.name : typeId;
  };

  return (
    <div className="container py-8 px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Review & Scoring</h1>
        <Button
          asChild
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
        >
          <div onClick={() => navigate(`/examiner/addQuestion`)}>
            Add Question
          </div>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exam Submissions</CardTitle>
          <CardDescription>
            Review and score candidate exam submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate name..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Drone Type</TableHead>
                  <TableHead>Telemetry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.candidateName}
                      </TableCell>
                      <TableCell>{submission.examDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                          {getDroneTypeName(submission.droneType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {submission.telemetryUploaded ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                            Uploaded
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Missing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission.scores ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
                            Scored
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-amber-600 dark:text-amber-400"
                          >
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700 cursor-pointer"
                        >
                          <div
                            onClick={() =>
                              navigate(`/examiner/review/${submission.id}`)
                            }
                          >
                            Review
                          </div>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No submissions found
                    </TableCell>
                  </TableRow>
                )}
                {examSubmissions.length > 0 ? (
                  examSubmissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell className="font-medium">
                        {submission.candidateName}
                      </TableCell>
                      <TableCell>
                        {submission?.submittedAt?.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                          {getDroneTypeName(submission.droneType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {submission?.telemetryUploaded ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                            Uploaded
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Missing
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {submission?.scores ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
                            Scored
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-amber-600 dark:text-amber-400"
                          >
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          size="sm"
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          <div
                            onClick={() =>
                              navigate(`/examiner/review/${submission._id}`)
                            }
                          >
                            Review
                          </div>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No submissions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <FileX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSubmissions.filter((s) => !s.scores).length +
                examSubmissions.filter((s) => !s.scores).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Submissions awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Reviews
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submissions.filter((s) => s.scores).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total submissions reviewed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
