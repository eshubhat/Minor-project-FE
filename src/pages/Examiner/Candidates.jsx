import { useState } from "react";
import { DashboardLayout } from "../../components/Dashboard/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mail, MoreVertical, Search, UserPlus } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Sample candidates data
const candidates = [
  {
    id: 1,
    name: "Emily Johnson",
    email: "emily.j@example.com",
    exams: 8,
    avgScore: 92,
    status: "active",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    exams: 7,
    avgScore: 88,
    status: "active",
  },
  {
    id: 3,
    name: "Sara Rodriguez",
    email: "sara.r@example.com",
    exams: 8,
    avgScore: 85,
    status: "active",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@example.com",
    exams: 6,
    avgScore: 79,
    status: "active",
  },
  {
    id: 5,
    name: "Lisa Patel",
    email: "lisa.p@example.com",
    exams: 5,
    avgScore: 81,
    status: "active",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.w@example.com",
    exams: 7,
    avgScore: 76,
    status: "active",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    email: "olivia.m@example.com",
    exams: 4,
    avgScore: 90,
    status: "active",
  },
  {
    id: 8,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    exams: 8,
    avgScore: 72,
    status: "inactive",
  },
  {
    id: 9,
    name: "Sophia Lee",
    email: "sophia.l@example.com",
    exams: 6,
    avgScore: 83,
    status: "active",
  },
  {
    id: 10,
    name: "Thomas Brown",
    email: "thomas.b@example.com",
    exams: 5,
    avgScore: 78,
    status: "inactive",
  },
];

// Sample performance data for a selected candidate
const candidatePerformanceData = [
  { name: "HTML", score: 92 },
  { name: "CSS", score: 88 },
  { name: "JavaScript", score: 76 },
  { name: "React", score: 85 },
  { name: "Node.js", score: 70 },
];

export default function CandidatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="examiner">
      <div className="container py-8 px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold">Candidates</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="w-full sm:w-[280px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Candidates
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>
                  Manage and view candidate performance
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Email
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Exams Taken
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Avg. Score
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium w-[80px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate) => (
                      <tr
                        key={candidate.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={`/placeholder.svg?height=36&width=36`}
                                alt={candidate.name}
                              />
                              <AvatarFallback>
                                {candidate.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>{candidate.name}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">{candidate.email}</td>
                        <td className="p-4 align-middle">{candidate.exams}</td>
                        <td className="p-4 align-middle">
                          <span
                            className={
                              candidate.avgScore >= 80
                                ? "text-green-600 dark:text-green-400"
                                : candidate.avgScore >= 70
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-amber-600 dark:text-amber-400"
                            }
                          >
                            {candidate.avgScore}%
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant="outline"
                            className={
                              candidate.status === "active"
                                ? "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                : "text-muted-foreground bg-muted"
                            }
                          >
                            {candidate.status === "active"
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setSelectedCandidate(candidate)}
                              >
                                View Performance
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Send Email</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Performance Dialog */}
        {selectedCandidate && (
          <Dialog
            open={!!selectedCandidate}
            onOpenChange={(open) => !open && setSelectedCandidate(null)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {selectedCandidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  Candidate Performance: {selectedCandidate.name}
                </DialogTitle>
                <DialogDescription>
                  View detailed performance analysis for this candidate
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="exams">Exam History</TabsTrigger>
                  <TabsTrigger value="subjects">
                    Subject Performance
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">
                          Average Score
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {selectedCandidate.avgScore}%
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">
                          Exams Completed
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {selectedCandidate.exams}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm font-medium">
                          Pass Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {Math.round(selectedCandidate.avgScore / 10) * 10}%
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trend</CardTitle>
                      <CardDescription>
                        Score progression across exams
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={candidatePerformanceData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar
                            dataKey="score"
                            fill="#0D9488"
                            name="Score (%)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exams" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">
                              Web Development Fundamentals
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Completed: 2 weeks ago
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600 dark:text-green-400">
                              92%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Passed
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">
                              JavaScript Fundamentals
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Completed: 1 month ago
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600 dark:text-green-400">
                              88%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Passed
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">
                              CSS Advanced Techniques
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Completed: 1 month ago
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600 dark:text-green-400">
                              85%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Passed
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">Node.js Basics</h3>
                            <p className="text-sm text-muted-foreground">
                              Completed: 2 months ago
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-amber-600 dark:text-amber-400">
                              70%
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Passed
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="subjects" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">HTML</h3>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              92%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">CSS</h3>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              88%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{ width: "88%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">JavaScript</h3>
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              76%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{ width: "76%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">React</h3>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              85%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Node.js</h3>
                            <span className="font-medium text-amber-600 dark:text-amber-400">
                              70%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{ width: "70%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
