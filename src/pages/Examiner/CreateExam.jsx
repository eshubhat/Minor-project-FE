import { useState, useEffect } from "react";
import { DashboardLayout } from "../../components/Dashboard/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";

export default function CreateExamPage() {
  const [date, setDate] = useState(null);
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const [examDetails, setExamDetails] = useState({
    title: "",
    description: "",
    duration: "",
    passScore: "",
    startTime: "",
    endTime: "",
    maxAttempts: "1",
  });

  const [activeTab, setActiveTab] = useState("details");

  // useEffect(() => {
  //   const FetchExamList = async () => {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BACKEND_URL}/teacher/fetchExams/teacher1`
  //     );

  //     setExams(response.data.exams);
  //     console.log(response.data.exams);
  //   };
  //   FetchExamList();
  // }, []);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].text = text;
    setQuestions(newQuestions);
  };

  const setCorrectOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.forEach((option, i) => {
      option.isCorrect = i === optionIndex;
    });
    setQuestions(newQuestions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateExam = async () => {
    const formattedQuestions = questions.map((q) => ({
      question: q.text,
      options: q.options.map((opt) => opt.text),
      correctOption: q.options.findIndex((opt) => opt.isCorrect),
    }));

    const payload = {
      title: examDetails.title,
      teacher: "demo",
      questions: formattedQuestions,
      description: examDetails.description,
      passScore: examDetails.passScore,
      duration: examDetails.duration,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}teacher/createExam`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Exam created successfully!");
        console.log("Saved exam:", data.exam);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  return (
    <DashboardLayout role="examiner">
      <div className="container py-8 px-8">
        <h1 className="text-3xl font-bold mb-6">Create Exam</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
                <CardDescription>
                  Set the basic information for your exam
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Exam Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={examDetails.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Web Development Fundamentals"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={examDetails.description}
                    onChange={handleInputChange}
                    placeholder="Provide a description of the exam"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      name="duration"
                      value={examDetails.duration}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="e.g. 60"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pass-score">Passing Score (%)</Label>
                    <Input
                      id="pass-score"
                      type="number"
                      name="passScore"
                      value={examDetails.passScore}
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      placeholder="e.g. 70"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setActiveTab("questions")}>
                  Continue to Questions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <div className="space-y-6">
              {questions.map((question, questionIndex) => (
                <Card key={questionIndex}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>Question {questionIndex + 1}</CardTitle>
                      <CardDescription>
                        Define the question and possible answers
                      </CardDescription>
                    </div>
                    {questions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(questionIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`question-${questionIndex}`}>
                        Question
                      </Label>
                      <Textarea
                        id={`question-${questionIndex}`}
                        placeholder="Enter your question"
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(questionIndex, e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Answer Options</Label>
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option.text}
                            onChange={(e) =>
                              updateOption(
                                questionIndex,
                                optionIndex,
                                e.target.value
                              )
                            }
                          />
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id={`correct-${questionIndex}-${optionIndex}`}
                              name={`correct-${questionIndex}`}
                              checked={option.isCorrect}
                              onChange={() =>
                                setCorrectOption(questionIndex, optionIndex)
                              }
                            />
                            <Label
                              htmlFor={`correct-${questionIndex}-${optionIndex}`}
                            >
                              Correct
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                onClick={addQuestion}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("details")}
                >
                  Back to Details
                </Button>
                <Button onClick={() => setActiveTab("schedule")}>
                  Continue to Schedule
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Exam</CardTitle>
                <CardDescription>
                  Set when this exam will be available to candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={examDetails.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={examDetails.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="max-attempts">
                    Max Attempts per Candidate
                  </Label>
                  <Input
                    id="max-attempts"
                    type="number"
                    min="1"
                    name="maxAttempts"
                    value={examDetails.maxAttempts}
                    onChange={handleInputChange}
                    defaultValue="1"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("questions")}
                >
                  Back to Questions
                </Button>
                <Button
                  onClick={handleCreateExam}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Create Exam
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
