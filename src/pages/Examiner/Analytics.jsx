import { DashboardLayout } from "@/components/Dashboard/layout.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data
const examsData = [
  { name: "Web Dev", attempts: 120, avgScore: 76, passRate: 82 },
  { name: "JavaScript", attempts: 95, avgScore: 72, passRate: 78 },
  { name: "React", attempts: 65, avgScore: 68, passRate: 70 },
  { name: "Node.js", attempts: 45, avgScore: 74, passRate: 80 },
  { name: "Database", attempts: 70, avgScore: 79, passRate: 85 },
];

const scoreDistribution = [
  { name: "90-100%", value: 25, color: "#0D9488" },
  { name: "80-89%", value: 35, color: "#14B8A6" },
  { name: "70-79%", value: 20, color: "#2DD4BF" },
  { name: "60-69%", value: 15, color: "#5EEAD4" },
  { name: "Below 60%", value: 5, color: "#99F6E4" },
];

const timeSpentData = [
  { name: "Q1", avgTime: 45 },
  { name: "Q2", avgTime: 70 },
  { name: "Q3", avgTime: 30 },
  { name: "Q4", avgTime: 55 },
  { name: "Q5", avgTime: 65 },
  { name: "Q6", avgTime: 40 },
  { name: "Q7", avgTime: 50 },
  { name: "Q8", avgTime: 75 },
  { name: "Q9", avgTime: 60 },
  { name: "Q10", avgTime: 35 },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout role="examiner">
      <div className="container py-8 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="web-dev">Safety Standards</SelectItem>
                <SelectItem value="javascript">Security Compliance</SelectItem>
                <SelectItem value="react">Registration Licensing</SelectItem>
                <SelectItem value="nodejs">Testing Regulations</SelectItem>
                <SelectItem value="database">Legal Aspects</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">395</div>
              <p className="text-xs text-muted-foreground">
                +42 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">74%</div>
              <p className="text-xs text-muted-foreground">
                +3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">79%</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions Analysis</TabsTrigger>
            <TabsTrigger value="candidates">Candidate Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Performance</CardTitle>
                <CardDescription>
                  Comparing attempts, average scores, and pass rates across
                  exams
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={examsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="attempts" fill="#0D9488" name="Attempts" />
                    <Bar
                      dataKey="avgScore"
                      fill="#14B8A6"
                      name="Avg Score (%)"
                    />
                    <Bar
                      dataKey="passRate"
                      fill="#2DD4BF"
                      name="Pass Rate (%)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of scores across all exams
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} (${(percent * 100).toFixed(0)}%)`
                        }
                      >
                        {scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Time Spent on Questions</CardTitle>
                  <CardDescription>
                    Time spent on each question in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timeSpentData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="avgTime"
                        fill="#0D9488"
                        name="Avg Time (sec)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Difficulty Analysis</CardTitle>
                <CardDescription>
                  Success rate for each question
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Question {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Success Rate:{" "}
                          {Math.floor(Math.random() * (95 - 50) + 50)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded">
                        <div
                          className="bg-teal-600 h-2 rounded"
                          style={{
                            width: `${Math.floor(
                              Math.random() * (95 - 50) + 50
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Candidates</CardTitle>
                <CardDescription>
                  Candidates with the highest average scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Emily Johnson</div>
                    </div>
                    <div className="text-sm font-medium">Average: 94%</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Michael Chen</div>
                    </div>
                    <div className="text-sm font-medium">Average: 92%</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Sara Rodriguez</div>
                    </div>
                    <div className="text-sm font-medium">Average: 89%</div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">David Kim</div>
                    </div>
                    <div className="text-sm font-medium">Average: 87%</div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Lisa Patel</div>
                    </div>
                    <div className="text-sm font-medium">Average: 85%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
