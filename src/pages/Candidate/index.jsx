import { useState, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [timePerQuestion, setTimePerQuestion] = useState({});
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shouldForceRestart, setShouldForceRestart] = useState(false);

  // Remove the old useEffect and replace with this corrected version
  // Replace the existing useEffect with visibility change handler with this:
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentStep === "exam") {
        // Check if we're still in fullscreen - if yes, then it's tab switching
        const isCurrentlyFullscreen =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;

        setShowExitWarning(true);
        // Force restart if still in fullscreen (meaning tab switch)
        // OR if warning is already showing but user switched tabs anyway
        setShouldForceRestart(!!isCurrentlyFullscreen || showExitWarning);
      }
    };

    const handleWindowBlur = () => {
      if (currentStep === "exam") {
        // Check if we're still in fullscreen
        const isCurrentlyFullscreen =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;

        setShowExitWarning(true);
        // Force restart if still in fullscreen (meaning focus lost while in fullscreen)
        // OR if warning is already showing but user lost focus anyway
        setShouldForceRestart(!!isCurrentlyFullscreen || showExitWarning);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [currentStep, showExitWarning]); // Add showExitWarning to dependencies

  useEffect(() => {
    if (currentStep === "completed") {
      navigate(`/`);
    }
  }, [currentStep, submissionId, navigate]);

  // Fullscreen event listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!isCurrentlyFullscreen);

      // Only show warning if fullscreen was exited unexpectedly during exam
      if (
        !isCurrentlyFullscreen &&
        currentStep === "exam" &&
        !showExitWarning
      ) {
        setShowExitWarning(true);
        // Don't force restart for just exiting fullscreen
        setShouldForceRestart(false);
      }
    };

    const handleKeyDown = (e) => {
      // Prevent common shortcuts during exam
      if (currentStep === "exam") {
        if (
          e.key === "Escape" ||
          e.key === "F11" ||
          (e.altKey && e.key === "Tab") ||
          (e.ctrlKey && (e.key === "w" || e.key === "t" || e.key === "n")) ||
          (e.metaKey && (e.key === "w" || e.key === "t" || e.key === "n"))
        ) {
          e.preventDefault();
          e.stopPropagation();
          setShowExitWarning(true);

          // Force restart for keyboard shortcuts that could be used to cheat
          if (
            (e.altKey && e.key === "Tab") ||
            (e.ctrlKey && (e.key === "w" || e.key === "t" || e.key === "n")) ||
            (e.metaKey && (e.key === "w" || e.key === "t" || e.key === "n"))
          ) {
            setShouldForceRestart(true);
          } else {
            // For ESC and F11, don't force restart (just exiting fullscreen)
            setShouldForceRestart(false);
          }
        }
      }
    };

    // Add event listeners with capture phase for keydown to catch before default behavior
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown, true); // Use capture phase

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [currentStep, showExitWarning]);

  // Enter fullscreen
  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  // Exit fullscreen
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Handle exit warning actions
  const handleContinueExam = () => {
    setShowExitWarning(false);
    setShouldForceRestart(false); // Reset the flag
    if (!isFullscreen) {
      enterFullscreen();
    }
  };

  const handleRestartExam = () => {
    exitFullscreen();
    setShowExitWarning(false);
    setShouldForceRestart(false); // Reset the flag
    setCurrentStep("start");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuestions([]);
    setTimePerQuestion({});
    setCandidateName("");
    setCandidateEmail("");
    setDroneType("");
  };

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

    if (!candidateEmail.trim()) {
      setEmailError("Please enter your email to continue");
      hasError = true;
    } else {
      setEmailError("");
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
            numberOfQuestions: 10,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to start exam");
      }

      const data = await response.json();
      setQuestions(data.questions?.slice(0, 10));
      console.log(data.questions?.slice(0, 10));
      setCurrentStep("exam");
      setQuestionStartTime(Date.now());

      // Enter fullscreen when exam starts
      setTimeout(() => {
        enterFullscreen();
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting the exam.");
    }
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
          // Exit fullscreen when exam is completed
          exitFullscreen();
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
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
        <div className="w-full space-y-4">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Important:</strong> The exam will start in fullscreen
              mode. Attempting to exit fullscreen or switch tabs will trigger a
              warning and may require you to restart the exam.
            </p>
          </div>
          <Button
            onClick={startExam}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            Start Exam
          </Button>
        </div>
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
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Progress: {Math.round(progress)}%
                </span>
                {isFullscreen && (
                  <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                    Fullscreen Active
                  </span>
                )}
              </div>
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

      {/* Exit Warning Dialog */}
      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Exam Security Warning</AlertDialogTitle>
            <AlertDialogDescription className={"text-black"}>
              You have attempted to exit the fullscreen mode or navigate away
              from the exam. This is not allowed during the examination process.
              <br />
              <br />
              {shouldForceRestart ? (
                "You attempted to navigate away from the exam. Restarting the exam is the only option."
              ) : (
                <>
                  If the screen has come out of the fullscreen then you have two
                  options:
                  <br />
                  • Continue the exam in fullscreen mode
                  <br />• Restart the exam from the beginning
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {shouldForceRestart ? (
              <AlertDialogAction onClick={handleRestartExam}>
                Restart Exam
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel onClick={handleRestartExam}>
                  Restart Exam
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleContinueExam}>
                  Continue Exam
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
