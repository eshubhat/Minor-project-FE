import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/layout.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Sample data - anonymized for privacy
const performanceData = [
  { name: "Exam 1", yourScore: 75, topScore: 92, avgScore: 72 },
  { name: "Exam 2", yourScore: 68, topScore: 88, avgScore: 70 },
  { name: "Exam 3", yourScore: 82, topScore: 95, avgScore: 75 },
  { name: "Exam 4", yourScore: 90, topScore: 98, avgScore: 78 },
  { name: "Exam 5", yourScore: 85, topScore: 94, avgScore: 80 },
];

const subjectData = [
  { subject: "HTML", yourScore: 90, avgScore: 82 },
  { subject: "CSS", yourScore: 85, avgScore: 78 },
  { subject: "JavaScript", yourScore: 70, avgScore: 72 },
  { subject: "React", yourScore: 78, avgScore: 68 },
  { subject: "Node.js", yourScore: 65, avgScore: 63 },
];

const radarData = [
  { subject: "HTML", yourScore: 90, avgScore: 82 },
  { subject: "CSS", yourScore: 85, avgScore: 78 },
  { subject: "JavaScript", yourScore: 70, avgScore: 72 },
  { subject: "React", yourScore: 78, avgScore: 68 },
  { subject: "Node.js", yourScore: 65, avgScore: 63 },
];

export default function ComparePage() {
  const [compareWith, setCompareWith] = useState("class");

  return (
    <DashboardLayout role="candidate">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Compare Performance</h1>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select value={compareWith} onValueChange={setCompareWith}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Compare with" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class">Current Class</SelectItem>
                <SelectItem value="batch">Previous Batches</SelectItem>
                <SelectItem value="top">Top Performers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>
                Your exam scores compared to{" "}
                {compareWith === "class"
                  ? "class average"
                  : compareWith === "batch"
                  ? "previous batches"
                  : "top performers"}
                <span className="text-xs text-muted-foreground block mt-1">
                  Note: All comparisons are anonymized for privacy
                </span>
              </CardDescription>
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
                    dataKey="yourScore"
                    stroke="#0D9488"
                    name="Your Score"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey={compareWith === "top" ? "topScore" : "avgScore"}
                    stroke="#94A3B8"
                    name={
                      compareWith === "class"
                        ? "Class Average"
                        : compareWith === "batch"
                        ? "Previous Batch Avg"
                        : "Top Performers"
                    }
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Tabs defaultValue="bar" className="space-y-4">
            <TabsList>
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="radar">Radar Chart</TabsTrigger>
            </TabsList>

            <TabsContent value="bar">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance Comparison</CardTitle>
                  <CardDescription>
                    Your performance by subject compared to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="yourScore"
                        fill="#0D9488"
                        name="Your Score"
                      />
                      <Bar
                        dataKey="avgScore"
                        fill="#94A3B8"
                        name={
                          compareWith === "class"
                            ? "Class Average"
                            : compareWith === "batch"
                            ? "Previous Batch"
                            : "Top Performers"
                        }
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="radar">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Comparison</CardTitle>
                  <CardDescription>
                    Visualize your skills compared to others
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={150} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Your Score"
                        dataKey="yourScore"
                        stroke="#0D9488"
                        fill="#0D9488"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name={
                          compareWith === "class"
                            ? "Class Average"
                            : compareWith === "batch"
                            ? "Previous Batch"
                            : "Top Performers"
                        }
                        dataKey="avgScore"
                        stroke="#94A3B8"
                        fill="#94A3B8"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Privacy Notice</CardTitle>
              <CardDescription>
                How we protect your data in comparisons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p>
                  We take your privacy seriously. When comparing your
                  performance with others:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    All data is anonymized - no personal information is shared
                  </li>
                  <li>
                    Only aggregated statistics are shown (averages, medians,
                    etc.)
                  </li>
                  <li>
                    Individual scores from other candidates are never displayed
                  </li>
                  <li>You can only see your own detailed performance</li>
                  <li>You control which comparisons you want to see</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
