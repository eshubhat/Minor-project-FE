import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { examService } from "@/services/ExamServices";

export default function CandidateExamPage() {
  const navigate = useNavigate();
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [droneType, setDroneType] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [droneTypeError, setDroneTypeError] = useState("");
  const [currentStep, setCurrentStep] = useState("start"); // start, exam, completed
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submissionId, setSubmissionId] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null); // track when current question started
  const [timePerQuestion, setTimePerQuestion] = useState({}); // store time taken for each question

  // Get drone types
  const droneTypes = examService.getDroneTypes();

  const startExam = async () => {
    // Validate inputs
    let hasError = false;

    if (!candidateName.trim()) {
      setNameError("Please enter your name to continue");
      hasError = true;
    } else {
      setNameError("");
    }

    if(!candidateEmail.trim()) {
      setEmailError("Please enter your email to continue")
    }
    else {
      setEmailError("")
    }

    if (!droneType) {
      setDroneTypeError("Please select a drone type");
      hasError = true;
    } else {
      setDroneTypeError("");
    }

    if (hasError) return;

    try {
      const response = await fetch(
        `http://localhost:3000/student/getExam/${droneType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            candidateName,
            droneType,
            numberOfQuestions: 10, // you can change as needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start exam");
      }

      const data = await response.json();
      setQuestions(data.questions?.slice(0, 10)); // assuming backend sends { questions: [...] }
      console.log(data.questions?.slice(0, 10));
      setCurrentStep("exam");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting the exam.");
    }

    // Get random questions for the selected drone type
    // const randomQuestions = questions[10];
    // setQuestions(randomQuestions);
    // setCurrentStep("exam");
  };

  const handleAnswerChange = (value) => {
    console.log(answers);
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].question]: value,
    });
  };

  const nextQuestion = () => {
    const currentTime = Date.now();
    const timeTaken = (currentTime - questionStartTime) / 1000; // in seconds

    const currentQuestionId = questions[currentQuestionIndex].question;

    setTimePerQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: timeTaken,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionStartTime(Date.now()); // reset timer for next question
    }
  };

  const prevQuestion = () => {
    const currentTime = Date.now();
    const timeTaken = (currentTime - questionStartTime) / 1000;

    const currentQuestionId = questions[currentQuestionIndex].question;

    setTimePerQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: timeTaken,
    }));

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const submitExam = async () => {
    const currentTime = Date.now();
    const timeTaken = (currentTime - questionStartTime) / 1000;

    const currentQuestionId = questions[currentQuestionIndex].question;

    setTimePerQuestion((prev) => ({
      ...prev,
      [currentQuestionId]: timeTaken,
    }));

    // small timeout to ensure setState is applied before submitting
    setTimeout(async () => {
      const answersArray = Object.entries(answers).map(
        ([questionId, answer]) => ({
          question: questionId,
          answer,
          timeTaken: timePerQuestion[questionId] || 0, // attach time
        })
      );

      console.log("answerArray with timing", answersArray);

      try {
        const response = await fetch(
          `http://localhost:3000/student/submitExam`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidateName,
              candidateEmail,
              droneType,
              answers: answersArray,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit exam");
        }

        const data = await response.json();
        if (data.success) {
          setSubmissionId(data.submissionId);
          setCurrentStep("completed");
        } else {
          alert("Failed to submit exam. Please try again.");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong while submitting the exam.");
      }
    }, 100);
  };

  const renderStartScreen = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Start Exam</CardTitle>
        <CardDescription>Enter your details to begin the exam</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter your full name"
            />
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Email</Label>
            <Input
              id="name"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="Enter your full name"
            />
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
          </div>

          <div className="grid gap-2">
            <Label>Drone Type</Label>
            <RadioGroup value={droneType} onValueChange={setDroneType}>
              {droneTypes.map((type) => (
                <div
                  key={type.id}
                  className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-accent"
                >
                  <RadioGroupItem value={type.id} id={`drone-${type.id}`} />
                  <Label
                    htmlFor={`drone-${type.id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {type.description}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {droneTypeError && (
              <p className="text-sm text-red-500">{droneTypeError}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={startExam}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Start Exam
        </Button>
      </CardFooter>
    </Card>
  );

  const renderExamScreen = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div>
                <CardTitle>
                  Question {currentQuestionIndex + 1} of {questions.length}
                </CardTitle>
                <CardDescription>
                  Exam Type: {droneTypes.find((t) => t.id === droneType)?.name}
                </CardDescription>
              </div>
              <span className="text-sm text-muted-foreground">
                Progress: {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="bg-teal-600 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.question] || ""}
              onValueChange={handleAnswerChange}
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 border rounded-lg p-4 mb-3 hover:bg-accent"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={submitExam}
                  disabled={Object.keys(answers).length < questions.length}
                >
                  Submit Exam
                </Button>
              ) : (
                <Button onClick={nextQuestion}>Next</Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {currentQuestionIndex === questions.length - 1 &&
          Object.keys(answers).length < questions.length && (
            <p className="text-center mt-4 text-amber-600 dark:text-amber-400">
              Please answer all questions before submitting.
            </p>
          )}
      </div>
    );
  };

  const renderCompletedScreen = () => (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Exam Completed</CardTitle>
        <CardDescription>
          Thank you for completing the{" "}
          {droneTypes.find((t) => t.id === droneType)?.name} exam
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Your answers have been submitted successfully.</p>
        <p className="mb-4">
          The next step is to upload your telemetry data for comprehensive
          assessment.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            navigate(`/candidate/upload-telemetry/${submissionId}`)
          }
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Upload Telemetry Data
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Candidate Exam</h1>

      {currentStep === "start" && renderStartScreen()}
      {currentStep === "exam" && renderExamScreen()}
      {currentStep === "completed" && renderCompletedScreen()}
    </div>
  );
}
