import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-navigate-dom";

// Sample exam data
const examData = {
  id: 1,
  title: "Web Development Fundamentals",
  description:
    "Test your knowledge of HTML, CSS, and basic JavaScript concepts.",
  duration: 90, // minutes
  questions: [
    {
      id: 1,
      text: "What does HTML stand for?",
      options: [
        { id: "a", text: "Hyper Text Markup Language" },
        { id: "b", text: "High Tech Modern Language" },
        { id: "c", text: "Hyper Technical Marking Language" },
        { id: "d", text: "Home Tool Markup Language" },
      ],
      correctAnswer: "a",
    },
    {
      id: 2,
      text: "Which CSS property is used to change the text color of an element?",
      options: [
        { id: "a", text: "font-color" },
        { id: "b", text: "text-color" },
        { id: "c", text: "color" },
        { id: "d", text: "font-style" },
      ],
      correctAnswer: "c",
    },
    {
      id: 3,
      text: "What is the correct JavaScript syntax to change the content of the HTML element with id 'demo'?",
      options: [
        { id: "a", text: "document.getElement('demo').innerHTML = 'Hello';" },
        {
          id: "b",
          text: "document.getElementById('demo').innerHTML = 'Hello';",
        },
        { id: "c", text: "#demo.innerHTML = 'Hello';" },
        {
          id: "d",
          text: "document.getElementByName('demo').innerHTML = 'Hello';",
        },
      ],
      correctAnswer: "b",
    },
    {
      id: 4,
      text: "Which HTML tag is used to define an internal style sheet?",
      options: [
        { id: "a", text: "<css>" },
        { id: "b", text: "<script>" },
        { id: "c", text: "<style>" },
        { id: "d", text: "<stylesheet>" },
      ],
      correctAnswer: "c",
    },
    {
      id: 5,
      text: "How do you create a function in JavaScript?",
      options: [
        { id: "a", text: "function myFunction()" },
        { id: "b", text: "function:myFunction()" },
        { id: "c", text: "function = myFunction()" },
        { id: "d", text: "create function myFunction()" },
      ],
      correctAnswer: "a",
    },
  ],
};

export default function TakeExamPage({ params }) {
  const navigate = useNavigate();
  const { id } = params;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [examComplete, setExamComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60); // seconds

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Track timer
  useEffect(() => {
    if (!examComplete && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !examComplete) {
      submitExam();
    }
  }, [timeLeft, examComplete]);

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [examData.questions[currentQuestion].id]: value,
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < examData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitExam = () => {
    setExamComplete(true);
    // Calculate score
    let score = 0;
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    // In a real app, you would send this data to your backend
    console.log({
      examId: id,
      answers,
      score,
      totalQuestions: examData.questions.length,
    });
  };

  const progress = (currentQuestion / examData.questions.length) * 100;

  // If exam is complete, show results
  if (examComplete) {
    // Calculate score
    let correctAnswers = 0;
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const scorePercentage = Math.round(
      (correctAnswers / examData.questions.length) * 100
    );
    const isPassed = scorePercentage >= 70; // Assuming 70% is passing score

    return (
      <div className="container max-w-4xl py-8 px-4">
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Exam Results</CardTitle>
            <CardDescription>{examData.title}</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center ${
                  isPassed
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }`}
              >
                {isPassed ? (
                  <CheckCircle className="h-12 w-12" />
                ) : (
                  <AlertCircle className="h-12 w-12" />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold">{scorePercentage}%</h3>
                <p className="text-lg text-muted-foreground">
                  {correctAnswers} out of {examData.questions.length} correct
                </p>
                <p
                  className={`mt-2 text-lg font-medium ${
                    isPassed
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {isPassed ? "Passed!" : "Failed"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Question Review</h3>
              {examData.questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Question {index + 1}</h4>
                    {answers[question.id] === question.correctAnswer ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" /> Correct
                      </span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" /> Incorrect
                      </span>
                    )}
                  </div>
                  <p className="mb-2">{question.text}</p>
                  <div className="pl-4 border-l-2 border-muted">
                    <p className="text-sm">
                      Your answer:{" "}
                      <span
                        className={
                          answers[question.id] === question.correctAnswer
                            ? "font-medium text-green-600 dark:text-green-400"
                            : "font-medium text-red-600 dark:text-red-400"
                        }
                      >
                        {question.options.find(
                          (o) => o.id === answers[question.id]
                        )?.text || "Not answered"}
                      </span>
                    </p>
                    {answers[question.id] !== question.correctAnswer && (
                      <p className="text-sm">
                        Correct answer:{" "}
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {
                            question.options.find(
                              (o) => o.id === question.correctAnswer
                            )?.text
                          }
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => navigate.push("/dashboard/candidate")}
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      <Card className="mb-4">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <CardTitle>{examData.title}</CardTitle>
            <div className="flex items-center mt-2 sm:mt-0 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <CardDescription className="mt-2">
            Question {currentQuestion + 1} of {examData.questions.length}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {examData.questions[currentQuestion].text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[examData.questions[currentQuestion].id] || ""}
            onValueChange={handleAnswerChange}
          >
            {examData.questions[currentQuestion].options.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 border rounded-lg p-4 mb-3 hover:bg-accent"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion === examData.questions.length - 1 ? (
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                onClick={submitExam}
              >
                Submit Exam
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
