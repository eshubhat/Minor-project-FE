import { DashboardLayout } from "@/components/Dashboard/Layout.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { BookOpen, Clock, FileCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function CandidateDashboardPage() {
  return (
    <DashboardLayout role="candidate">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Candidate Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Exams
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 new this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Exams
              </CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+5% improvement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: Tomorrow</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Available Exams</CardTitle>
              <CardDescription>
                Exams you can take right now or scheduled for the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        Web Development Fundamentals
                      </p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                        Available Now
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Duration: 1 hour 30 minutes • 40 questions
                    </p>
                  </div>
                  <Button
                    asChild
                    className="bg-teal-600 hover:bg-teal-700 w-full md:w-auto"
                  >
                    <Link href="/dashboard/take-exam/1">Start Exam</Link>
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">React Advanced Concepts</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100">
                        Scheduled
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available Apr 18, 2025 • 10:00 AM
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 2 hours • 50 questions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full md:w-auto"
                  >
                    Upcoming
                  </Button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">Database Design Principles</p>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-100">
                        Scheduled
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available Apr 22, 2025 • 11:00 AM
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 2 hours • 45 questions
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    disabled
                    className="w-full md:w-auto"
                  >
                    Upcoming
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
              <CardDescription>Your most recent exam results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b pb-4">
                  <div>
                    <p className="font-medium">JavaScript Basics</p>
                    <p className="text-sm text-muted-foreground">
                      Completed: Apr 10, 2025
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-right">
                      Score: 85%
                    </div>
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                      Excellent
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b pb-4">
                  <div>
                    <p className="font-medium">CSS and Responsive Design</p>
                    <p className="text-sm text-muted-foreground">
                      Completed: Apr 5, 2025
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-right">
                      Score: 78%
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100">
                      Good
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b pb-4">
                  <div>
                    <p className="font-medium">HTML Fundamentals</p>
                    <p className="text-sm text-muted-foreground">
                      Completed: Mar 28, 2025
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-right">
                      Score: 92%
                    </div>
                    <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                      Excellent
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
