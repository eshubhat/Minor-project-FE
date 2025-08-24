import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/Dashboard/Layout.jsx";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Calendar } from "@/components/ui/calendar.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.jsx";
import { CalendarIcon, Clock, Edit, Eye, Trash2, Users } from "lucide-react";

// Sample data for scheduled exams
const scheduledExams = [
  {
    id: 1,
    title: "React Advanced Concepts",
    date: new Date("2025-04-18T10:00:00"),
    duration: 120,
    candidates: 32,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Cloud Computing Basics",
    date: new Date("2025-04-20T14:00:00"),
    duration: 90,
    candidates: 24,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Database Design Principles",
    date: new Date("2025-04-22T11:00:00"),
    duration: 120,
    candidates: 28,
    status: "upcoming",
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    date: new Date("2025-03-10T09:00:00"),
    duration: 90,
    candidates: 45,
    status: "completed",
    avgScore: 78,
    passRate: 82,
  },
  {
    id: 5,
    title: "Web Development Basics",
    date: new Date("2025-03-15T13:00:00"),
    duration: 60,
    candidates: 38,
    status: "completed",
    avgScore: 85,
    passRate: 90,
  },
];

export default function ScheduledExamsPage() {
  const [date, setDate] = useState(null);
  const [editExam, setEditExam] = useState(null);
  const [deleteExam, setDeleteExam] = useState(null);

  const openEditDialog = (exam) => {
    setEditExam({ ...exam });
    setDate(exam.date);
  };

  return (
    <DashboardLayout role="examiner">
      <div className="container py-8 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Scheduled Exams</h1>
          <Button
            asChild
            className="bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
          >
            <Link href="/dashboard/create-exam">Schedule New Exam</Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-full max-w-sm">
              <Input placeholder="Search exams..." />
            </div>
          </div>

          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Exams</CardTitle>
                  <CardDescription>Manage your scheduled exams</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scheduledExams
                      .filter((exam) => exam.status === "upcoming")
                      .map((exam) => (
                        <div
                          key={exam.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{exam.title}</h3>
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100">
                                Scheduled
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{format(exam.date, "PPP")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {format(exam.date, "p")} • {exam.duration} min
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>
                                  {exam.candidates} candidates registered
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(exam)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/analytics`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                              onClick={() => setDeleteExam(exam)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Exams</CardTitle>
                  <CardDescription>
                    View results from past exams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {scheduledExams
                      .filter((exam) => exam.status === "completed")
                      .map((exam) => (
                        <div
                          key={exam.id}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{exam.title}</h3>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                                Completed
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{format(exam.date, "PPP")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{exam.candidates} participants</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm">
                            <div className="flex justify-between">
                              <span>Avg. Score:</span>
                              <span className="font-medium">
                                {exam.avgScore}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Pass Rate:</span>
                              <span className="font-medium">
                                {exam.passRate}%
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              asChild
                            >
                              <Link href={`/dashboard/analytics`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Results
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Exam Dialog */}
        {editExam && (
          <Dialog
            open={!!editExam}
            onOpenChange={(open) => !open && setEditExam(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Scheduled Exam</DialogTitle>
                <DialogDescription>
                  Make changes to the exam schedule
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Exam Title</Label>
                  <Input
                    id="title"
                    value={editExam.title}
                    onChange={(e) =>
                      setEditExam({ ...editExam, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Date</Label>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={format(editExam.date, "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value
                          .split(":")
                          .map(Number);
                        const newDate = new Date(date);
                        newDate.setHours(hours, minutes);
                        setEditExam({ ...editExam, date: newDate });
                      }}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration (min)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={editExam.duration}
                      onChange={(e) =>
                        setEditExam({
                          ...editExam,
                          duration: Number.parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditExam(null)}>
                  Cancel
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() => setEditExam(null)}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteExam && (
          <Dialog
            open={!!deleteExam}
            onOpenChange={(open) => !open && setDeleteExam(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete "{deleteExam.title}"? This
                  action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteExam(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDeleteExam(null)}
                >
                  Delete Exam
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
