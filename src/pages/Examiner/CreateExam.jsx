import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Plus, Trash2, Save } from "lucide-react";
import axios from "axios";

export default function DroneExamCreator() {
  const [examType, setExamType] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""],
      correctOption: 0,
      droneType: "",
      difficulty: "medium",
      tags: [],
      isActive: true,
    },
  ]);

  const droneTypes = [
    { value: "micro", label: "Micro Drone" },
    { value: "small", label: "Small Drone" },
    { value: "medium", label: "Medium Drone" },
    { value: "large", label: "Large Drone" },
  ];

  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", ""],
        correctOption: 0,
        droneType: examType,
        difficulty: "medium",
        tags: [],
        isActive: true,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push("");
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length > 2) {
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      // Adjust correct option if needed
      if (newQuestions[questionIndex].correctOption >= optionIndex) {
        newQuestions[questionIndex].correctOption = Math.max(
          0,
          newQuestions[questionIndex].correctOption - 1
        );
      }
      setQuestions(newQuestions);
    }
  };

  const setCorrectOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = optionIndex;
    setQuestions(newQuestions);
  };

  const updateTags = (questionIndex, tagsString) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].tags = tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setQuestions(newQuestions);
  };

  const handleSaveExam = async () => {
    // Validate that all questions have the same drone type as exam type
    const validatedQuestions = questions.map((q) => ({
      ...q,
      droneType: examType,
      options: q.options.filter((opt) => opt.trim() !== ""), // Remove empty options
    }));

    // Basic validation
    if (!examType) {
      alert("Please select an exam type");
      return;
    }

    const invalidQuestions = validatedQuestions.filter(
      (q) =>
        !q.question.trim() ||
        q.options.length < 2 ||
        q.options.some((opt) => !opt.trim()) ||
        q.correctOption >= q.options.length
    );

    if (invalidQuestions.length > 0) {
      alert(
        "Please complete all questions with at least 2 non-empty options and valid correct answers"
      );
      return;
    }

    const payload = {
      examType,
      questions: validatedQuestions,
    };

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://localhost:3000/teacher/createQuestion",
        payload,
      );

      if (response.status === 201) {
        alert("Exam created successfully!");
        navigate("/");
        console.log("Exam saved:", payload);
      } else {
        console.error("Failed to create questions:", response);
        alert("Failed to create questions. Please try again.");
      }
    } catch (error) {
      console.error("Error saving exam:", error);
      alert("Error creating questions");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Drone Questions</h1>
        <p className="text-gray-600">
          Create questions for drone certification exams
        </p>
      </div>

      {/* Exam Type Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Exam Type</CardTitle>
          <CardDescription>Select the type of drone exam</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="exam-type">Drone Type</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Select drone type" />
              </SelectTrigger>
              <SelectContent>
                {droneTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Questions</h2>
          <Button onClick={addQuestion} disabled={!examType}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </div>

        {!examType && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">
                Please select an exam type first
              </p>
            </CardContent>
          </Card>
        )}

        {examType &&
          questions.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>Question {questionIndex + 1}</CardTitle>
                  <CardDescription>
                    {examType.charAt(0).toUpperCase() + examType.slice(1)} Drone
                    Question
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
                {/* Question Text */}
                <div className="grid gap-2">
                  <Label htmlFor={`question-${questionIndex}`}>Question</Label>
                  <Textarea
                    id={`question-${questionIndex}`}
                    placeholder="Enter your question"
                    value={question.question}
                    onChange={(e) =>
                      updateQuestion(questionIndex, "question", e.target.value)
                    }
                  />
                </div>

                {/* Difficulty and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Difficulty</Label>
                    <Select
                      value={question.difficulty}
                      onValueChange={(value) =>
                        updateQuestion(questionIndex, "difficulty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff.value} value={diff.value}>
                            {diff.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Tags (comma-separated)</Label>
                    <Input
                      placeholder="safety, regulations, flight"
                      value={question.tags.join(", ")}
                      onChange={(e) =>
                        updateTags(questionIndex, e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addOption(questionIndex)}
                    >
                      <Plus className="mr-1 h-3 w-3" />
                      Add Option
                    </Button>
                  </div>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
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
                          checked={question.correctOption === optionIndex}
                          onChange={() =>
                            setCorrectOption(questionIndex, optionIndex)
                          }
                        />
                        <Label
                          htmlFor={`correct-${questionIndex}-${optionIndex}`}
                          className="text-sm"
                        >
                          Correct
                        </Label>
                      </div>
                      {question.options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            removeOption(questionIndex, optionIndex)
                          }
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

        {/* Save Button */}
        {examType && questions.length > 0 && (
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSaveExam}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Questions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
