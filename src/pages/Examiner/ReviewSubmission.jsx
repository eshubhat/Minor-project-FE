import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { examService } from "@/services/ExamServices";
import { telemetryService } from "@/services/TelemetryService";

export default function ReviewSubmissionPage({ params }) {
  const navigate = useNavigate();
  const { id: submissionId } = useParams;
  const [submission, setSubmission] = useState(null);
  const [telemetryData, setTelemetryData] = useState(null);
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [droneTypes, setDroneTypes] = useState([]);

  useEffect(() => {
    const FetchExamSubmissionDetails = async () => {
      // Check if submissionId is provided
      if (!submissionId) {
        navigate("/examiner/review");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/teacher/submission/${submissionId}`,{
          
        }
      );

      // Fetch submission data
      const submissionData = examService.getSubmissionById(submissionId);
      if (submissionData) {
        setSubmission(submissionData);

        // Initialize scores from existing data or set to 0
        const initialScores = {};
        submissionData.answers.forEach((answer) => {
          initialScores[answer.questionId] =
            submissionData.scores?.[answer.questionId] || 0;
        });
        setScores(initialScores);

        // Calculate total score
        if (submissionData.scores) {
          const total = Object.values(submissionData.scores).reduce(
            (sum, score) => sum + score,
            0
          );
          setTotalScore(total);
        }

        // Fetch questions for the specific drone type
        const allQuestions = examService.getRandomQuestions(
          submissionData.droneType,
          20
        ); // Get all questions
        setQuestions(allQuestions);

        // Get drone types
        setDroneTypes(examService.getDroneTypes());
      }

      // Fetch telemetry data
      const telemetry = telemetryService.getTelemetryData(submissionId);
      setTelemetryData(telemetry);
    };
    // Fetch submission data
    const submissionData = examService.getSubmissionById(submissionId);
    if (submissionData) {
      setSubmission(submissionData);

      // Initialize scores from existing data or set to 0
      const initialScores = {};
      submissionData.answers.forEach((answer) => {
        initialScores[answer.questionId] =
          submissionData.scores?.[answer.questionId] || 0;
      });
      setScores(initialScores);

      // Calculate total score
      if (submissionData.scores) {
        const total = Object.values(submissionData.scores).reduce(
          (sum, score) => sum + score,
          0
        );
        setTotalScore(total);
      }

      // Fetch questions for the specific drone type
      const allQuestions = examService.getRandomQuestions(
        submissionData.droneType,
        20
      ); // Get all questions
      setQuestions(allQuestions);

      // Get drone types
      setDroneTypes(examService.getDroneTypes());
    }

    // Fetch telemetry data
    const telemetry = telemetryService.getTelemetryData(submissionId);
    setTelemetryData(telemetry);
  }, [submissionId]);

  const handleScoreChange = (questionId, value) => {
    // Validate score (0-10)
    const score = Number.parseInt(value);
    const newErrors = { ...errors };

    if (isNaN(score) || score < 0 || score > 10) {
      newErrors[questionId] = "Score must be between 0 and 10";
    } else {
      delete newErrors[questionId];
    }

    setErrors(newErrors);

    // Update scores
    const newScores = { ...scores, [questionId]: score };
    setScores(newScores);

    // Calculate total score
    const total = Object.values(newScores).reduce(
      (sum, s) => sum + (isNaN(s) ? 0 : s),
      0
    );
    setTotalScore(total);
  };

  const saveScores = () => {
    // Check for errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Determine if passed (70% or higher)
    const passed = totalScore >= 70;

    // Save scores
    const result = examService.saveScores(
      submissionId,
      scores,
      totalScore,
      passed
    );
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };

  if (!submission) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Review Submission</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p>Loading submission data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getQuestionText = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    return question ? question.question : "Question not found";
  };

  const getCorrectAnswer = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    return question ? question.correctAnswer : "Unknown";
  };

  const isAnswerCorrect = (questionId, answer) => {
    const correctAnswer = getCorrectAnswer(questionId);
    return answer === correctAnswer;
  };

  const getDroneTypeName = (typeId) => {
    const droneType = droneTypes.find((t) => t.id === typeId);
    return droneType ? droneType.name : typeId;
  };

  return (
    <div className="container py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/examiner/review")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Review Submission</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {submission.candidateName}
              </div>
              <div>
                <span className="font-medium">Exam Date:</span>{" "}
                {submission.examDate}
              </div>
              <div>
                <span className="font-medium">Drone Type:</span>{" "}
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                  {getDroneTypeName(submission.droneType)}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Telemetry:</span>{" "}
                {submission.telemetryUploaded ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                    Uploaded
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Missing
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scoring Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Total Score:</span> {totalScore}
                /100
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                {totalScore >= 70 ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                    Passed
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
                    Failed
                  </Badge>
                )}
              </div>
              <div>
                <span className="font-medium">Questions:</span>{" "}
                {submission.answers.length}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Telemetry Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {telemetryData ? (
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Flight Duration:</span>{" "}
                  {telemetryData.summary.flightDuration}
                </div>
                <div>
                  <span className="font-medium">Max Altitude:</span>{" "}
                  {telemetryData.summary.maxAltitude}m
                </div>
                <div>
                  <span className="font-medium">Success Rate:</span>{" "}
                  {telemetryData.summary.successRate}%
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No telemetry data available
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="answers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="answers">Answers & Scoring</TabsTrigger>
          <TabsTrigger value="telemetry">Telemetry Data</TabsTrigger>
        </TabsList>

        <TabsContent value="answers">
          <Card>
            <CardHeader>
              <CardTitle>Answers & Scoring</CardTitle>
              <CardDescription>
                Review answers and assign scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Candidate Answer</TableHead>
                    <TableHead>Correct Answer</TableHead>
                    <TableHead className="w-[100px] text-right">
                      Score (0-10)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submission.answers.map((answer, index) => (
                    <TableRow key={answer.questionId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {getQuestionText(answer.questionId)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {answer.answer}
                          {isAnswerCorrect(answer.questionId, answer.answer) ? (
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getCorrectAnswer(answer.questionId)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={scores[answer.questionId] || ""}
                            onChange={(e) =>
                              handleScoreChange(
                                answer.questionId,
                                e.target.value
                              )
                            }
                            className="w-16 text-right"
                          />
                        </div>
                        {errors[answer.questionId] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[answer.questionId]}
                          </p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-lg font-medium">
                Total Score: {totalScore}/100
              </div>
              <Button
                onClick={saveScores}
                disabled={Object.keys(errors).length > 0}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Save Scores
              </Button>
            </CardFooter>
          </Card>

          {saveSuccess && (
            <Alert className="mt-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Scores have been saved successfully.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="telemetry">
          <Card>
            <CardHeader>
              <CardTitle>Telemetry Data</CardTitle>
              <CardDescription>Review flight telemetry data</CardDescription>
            </CardHeader>
            <CardContent>
              {telemetryData ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Flight Summary</h3>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Flight Duration
                          </TableCell>
                          <TableCell>
                            {telemetryData.summary.flightDuration}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Max Altitude
                          </TableCell>
                          <TableCell>
                            {telemetryData.summary.maxAltitude}m
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Max Speed
                          </TableCell>
                          <TableCell>
                            {telemetryData.summary.maxSpeed}m/s
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Battery Usage
                          </TableCell>
                          <TableCell>
                            {telemetryData.summary.batteryUsage}%
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Success Rate
                          </TableCell>
                          <TableCell>
                            {telemetryData.summary.successRate}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Flight Events</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {telemetryData.events.map((event, index) => (
                          <TableRow key={index}>
                            <TableCell>{event.timestamp}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  event.type === "ERROR" ||
                                  event.type === "CRITICAL"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                                    : event.type === "WARNING"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                }
                              >
                                {event.type}
                              </Badge>
                            </TableCell>
                            <TableCell>{event.message}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Flight Data</h3>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Battery Level</TableHead>
                            <TableHead>Altitude</TableHead>
                            <TableHead>Speed</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {telemetryData.flightData.map((data, index) => (
                            <TableRow key={index}>
                              <TableCell>{data.timestamp}</TableCell>
                              <TableCell>{data.batteryLevel}%</TableCell>
                              <TableCell>{data.altitude}m</TableCell>
                              <TableCell>{data.speed}m/s</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No telemetry data available for this submission
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
