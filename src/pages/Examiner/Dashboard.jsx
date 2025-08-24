import { DashboardLayout } from "@/components/dashboard/layout.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { FileText, Users, CheckCircle, Clock } from "lucide-react";

export default function ExaminerDashboardPage() {
  return (
    <DashboardLayout role="examiner">
      <div className="container py-8 px-8">
        <h1 className="text-3xl font-bold mb-6">Examiner Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +30 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Exams
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">183</div>
              <p className="text-xs text-muted-foreground">
                +22 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">2 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exam Activity</CardTitle>
              <CardDescription>
                Latest candidate activity on your exams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Safety Standards</p>
                    <p className="text-sm text-muted-foreground">
                      4 new attempts
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">75% Avg. Score</p>
                    <p className="text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Registration Licensing</p>
                    <p className="text-sm text-muted-foreground">
                      7 new attempts
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">68% Avg. Score</p>
                    <p className="text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Compliance with regulations</p>
                    <p className="text-sm text-muted-foreground">
                      2 new attempts
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium">82% Avg. Score</p>
                    <p className="text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Scheduled Exams</CardTitle>
              <CardDescription>
                Exams scheduled for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Drone Technologies</p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 2 hours
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium text-teal-600">Tomorrow</p>
                    <p className="text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Safety Standards</p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 1.5 hours
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium text-teal-600">Apr 20, 2025</p>
                    <p className="text-muted-foreground">2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">Registration Licensing</p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 2 hours
                    </p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="font-medium text-teal-600">Apr 22, 2025</p>
                    <p className="text-muted-foreground">11:00 AM</p>
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
