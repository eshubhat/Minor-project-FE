import { useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../../components/Dashboard/Layout.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

// Sample data
const performanceData = [
  { name: "Exam 1", score: 75 },
  { name: "Exam 2", score: 68 },
  { name: "Exam 3", score: 82 },
  { name: "Exam 4", score: 90 },
  { name: "Exam 5", score: 85 },
];

const compareToClassData = [
  { name: "Exam 1", yourScore: 75, classAvg: 72 },
  { name: "Exam 2", yourScore: 68, classAvg: 70 },
  { name: "Exam 3", yourScore: 82, classAvg: 75 },
  { name: "Exam 4", yourScore: 90, classAvg: 78 },
  { name: "Exam 5", yourScore: 85, classAvg: 80 },
];

const strengthsData = [
  { name: "HTML", score: 90 },
  { name: "CSS", score: 85 },
  { name: "JavaScript", score: 70 },
  { name: "React", score: 78 },
  { name: "Node.js", score: 65 },
];

export default function ResultsPage() {
  const [timeRange, setTimeRange] = useState("all");

  return (
    <DashboardLayout role="candidate">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">My Results</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Weaknesses</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Your exam scores over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#0D9488"
                      name="Your Score (%)"
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Exams</CardTitle>
                  <CardDescription>
                    Your most recent exam results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">
                          Advanced JavaScript Concepts
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Completed: 2 days ago
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600 dark:text-green-400">
                          85%
                        </p>
                        <p className="text-sm text-muted-foreground">Passed</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">React Fundamentals</p>
                        <p className="text-sm text-muted-foreground">
                          Completed: 1 week ago
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600 dark:text-green-400">
                          90%
                        </p>
                        <p className="text-sm text-muted-foreground">Passed</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">CSS Advanced Layouts</p>
                        <p className="text-sm text-muted-foreground">
                          Completed: 2 weeks ago
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-amber-600 dark:text-amber-400">
                          68%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Review recommended
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                  <CardDescription>Summary of your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Average Score</p>
                      <p className="text-lg font-bold">78%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Highest Score</p>
                      <p className="text-lg font-bold">92%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Lowest Score</p>
                      <p className="text-lg font-bold">65%</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Exams Passed</p>
                      <p className="text-lg font-bold">9/12</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Completion Rate</p>
                      <p className="text-lg font-bold">92%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compare to Class Average</CardTitle>
                <CardDescription>
                  Your performance compared to the class average
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={compareToClassData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="yourScore"
                      fill="#0D9488"
                      name="Your Score (%)"
                    />
                    <Bar
                      dataKey="classAvg"
                      fill="#94A3B8"
                      name="Class Average (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compare with Previous Batches</CardTitle>
                <CardDescription>
                  Compare your performance with historical data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-muted-foreground mb-4 md:mb-0">
                      You can compare your performance with students from
                      previous batches to see how you're doing relative to
                      historical trends.
                    </p>
                    <Button
                      asChild
                      className="bg-teal-600 hover:bg-teal-700 w-full md:w-auto"
                    >
                      <Link href="/dashboard/compare">View Comparison</Link>
                    </Button>
                  </div>

                  <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium mb-2">
                      Your Performance Highlights
                    </h3>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>
                        Your React scores are in the top 15% compared to last
                        year's students
                      </li>
                      <li>
                        Your JavaScript performance is 8% above the historical
                        average
                      </li>
                      <li>
                        Your CSS scores are on par with the top performers from
                        previous cohorts
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strengths" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Your performance across different subject areas
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={strengthsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#0D9488" name="Score (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                  <CardDescription>Areas where you excel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">
                        HTML
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You consistently score above 85% on HTML questions. Your
                        understanding of semantic HTML and document structure is
                        excellent.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">
                        CSS
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your CSS skills are strong, with particular strengths in
                        layout techniques and responsive design.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>
                    Topics that need more attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2">
                        Node.js
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Your Node.js scores are lower than other areas. Focus on
                        middleware concepts and async patterns.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          className="text-xs h-7"
                          asChild
                        >
                          <Link href="/resources/nodejs">View Resources</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-2">
                        JavaScript
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        You could improve in advanced JavaScript topics like
                        closures, promises, and async/await.
                      </p>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          className="text-xs h-7"
                          asChild
                        >
                          <Link href="/resources/javascript">
                            View Resources
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
