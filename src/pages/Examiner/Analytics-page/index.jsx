import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { analyticsService } from "@/services/AnalyticsService";
import { examService } from "@/services/ExamServices";

export default function AnalyticsPage() {
  const [dateFilter, setDateFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState("all");
  const [droneTypeFilter, setDroneTypeFilter] = useState("all");
  const [droneTypeData, setDroneTypeData] = useState([]);
  const [stats, setStats] = useState({
    count: 0,
    avgScore: 0,
    passRate: 0,
    failedCount: 0,
    maxScore: 0,
    minScore: 0,
    passedCount: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get analytics data
  const analytics = analyticsService.getCombinedAnalytics();
  const droneTypes = examService.getDroneTypes();

  // Colors for charts
  const COLORS = ["#0D9488", "#14B8A6", "#2DD4BF", "#5EEAD4", "#99F6E4"];

  // Format data for score distribution chart
  const scoreDistributionData = Object.entries(analytics.scoreDistribution).map(
    ([range, count]) => ({
      name: range,
      value: count,
    })
  );

  // Format data for most missed questions chart
  const missedQuestionsData = analytics.mostMissedQuestions.map((item) => ({
    name: `Q${item.questionId.replace(/[a-z]+/i, "")}`,
    incorrectRate: item.incorrectRate,
  }));

  useEffect(() => {
    const fetchDroneTypeAnalytics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/student/analytics/drone-types"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDroneTypeData(data);
        console.log(data);
        const fetchStats = {
          count: 0,
          avgScore: 0,
          failedCount: 0,
          passRate: 0,
          maxScore: 0,
          minScore: 0,
          passedCount: 0,
        };
        data.map((data, index) => {
          fetchStats.count += data.count;
          fetchStats.avgScore += data.avgScore;
          fetchStats.passRate += data.passRate;
          fetchStats.maxScore += data.maxScore;
          fetchStats.minScore += data.minScore;
          fetchStats.failedCount += data.failedCount;
          fetchStats.passedCount += data.passedCount;
        });
        setStats(fetchStats);
      } catch (err) {
        console.error("Failed to fetch drone analytics:", err);
        setError("Failed to load drone analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchDroneTypeAnalytics();
  }, []);

  useEffect(() => {
    const fetchStats = {
      count: 0,
      avgScore: 0,
      passRate: 0,
    };
    console.log("droneType data", droneTypeData);
    if (droneTypeFilter === "all") {
      droneTypeData.map((data, index) => {
        fetchStats.count += data.count;
        fetchStats.avgScore += data.avgScore;
        fetchStats.passRate += data.passRate;
        fetchStats.maxScore += data.maxScore;
        fetchStats.minScore += data.minScore;
        fetchStats.failedCount += data.failedCount;
        fetchStats.passedCount += data.passedCount;
      });
      setStats(fetchStats);
    } else {
      droneTypeData.map((data, index) => {
        if (data.name === droneTypeFilter) {
          fetchStats.count += data.count;
          fetchStats.avgScore += data.avgScore;
          fetchStats.passRate += data.passRate;
          fetchStats.maxScore += data.maxScore;
          fetchStats.minScore += data.minScore;
          fetchStats.failedCount += data.failedCount;
          fetchStats.passedCount += data.passedCount;
        }
      });
      setStats(fetchStats);
    }
  }, [droneTypeFilter]);

  // Format data for drone type breakdown
  // const droneTypeData = Object.entries(analytics.droneTypeBreakdown || {})
  //   .filter(([_, data]) => data.count > 0)
  //   .map(([typeId, data]) => {
  //     const typeName = droneTypes.find((t) => t.id === typeId)?.name || typeId;
  //     return {
  //       name: typeName,
  //       count: data.count,
  //       avgScore: data.avgScore,
  //       passRate: data.passRate,
  //     };
  //   });

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="text-xl font-semibold">Exam Performance Overview</div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>

          <Select value={scoreFilter} onValueChange={setScoreFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="passing">Passing Only</SelectItem>
              <SelectItem value="failing">Failing Only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={droneTypeFilter} onValueChange={setDroneTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by drone type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Drone Types</SelectItem>
              {droneTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.count}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.avgScore}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.passRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Telemetry Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analytics.telemetry.averageSuccessRate)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exam" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exam">Exam Analytics</TabsTrigger>
          <TabsTrigger value="droneTypes">Drone Type Analytics</TabsTrigger>
          <TabsTrigger value="telemetry">Telemetry Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="exam">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>
                  Distribution of candidate scores by range
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {scoreDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Missed Questions</CardTitle>
                <CardDescription>
                  Questions with highest incorrect answer rates
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={missedQuestionsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar
                      dataKey="incorrectRate"
                      name="Incorrect Rate (%)"
                      fill="#0D9488"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Score Range</CardTitle>
                <CardDescription>Highest and lowest scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Highest Score</span>
                      <span className="text-sm font-medium">
                        {stats?.maxScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${stats?.maxScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Average Score</span>
                      <span className="text-sm font-medium">
                        {stats?.avgScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${stats?.avgScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Lowest Score</span>
                      <span className="text-sm font-medium">
                        {stats?.minScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{ width: `${stats?.minScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass/Fail Rate</CardTitle>
                <CardDescription>
                  Percentage of candidates who passed the exam
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center rounded-full w-40 h-40 border-8 ${
                      stats?.passRate < 35
                        ? "border-red-600"
                        : "border-teal-600"
                    } mb-4`}
                  >
                    <span className="text-4xl font-bold">
                      {stats?.passRate}%
                    </span>
                  </div>
                  <div className="flex justify-center gap-4">
                    <div className="text-center">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100 mb-1">
                        Passed
                      </Badge>
                      <p className="text-lg font-medium">
                        {stats?.passedCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100 mb-1">
                        Failed
                      </Badge>
                      <p className="text-lg font-medium">
                        {stats?.failedCount}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="droneTypes">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Drone Type Distribution</CardTitle>
                <CardDescription>
                  Number of exams taken by drone type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={droneTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {droneTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Score by Drone Type</CardTitle>
                <CardDescription>
                  Comparison of average scores across drone types
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={droneTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar
                      dataKey="avgScore"
                      name="Average Score (%)"
                      fill="#0D9488"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass Rate by Drone Type</CardTitle>
                <CardDescription>
                  Comparison of pass rates across drone types
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={droneTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar
                      dataKey="passRate"
                      name="Pass Rate (%)"
                      fill="#0D9488"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drone Type Performance Summary</CardTitle>
                <CardDescription>
                  Detailed performance metrics by drone type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {droneTypeData.map((type) => (
                    <div key={type.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{type.name}</h3>
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900 dark:text-teal-100">
                          {type.count} Exams
                        </Badge>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Average Score</span>
                          <span className="text-sm font-medium">
                            {type.avgScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                          <div
                            className="bg-teal-600 h-2 rounded-full"
                            style={{ width: `${type.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Pass Rate</span>
                          <span className="text-sm font-medium">
                            {type.passRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                          <div
                            className="bg-teal-600 h-2 rounded-full"
                            style={{ width: `${type.passRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="telemetry">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Telemetry Success Rate</CardTitle>
                <CardDescription>
                  Average success rate from telemetry data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center rounded-full w-40 h-40 border-8 border-teal-600 mb-4">
                    <span className="text-4xl font-bold">
                      {Math.round(analytics.telemetry.averageSuccessRate)}%
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Based on {analytics.telemetry.totalFlights} flights
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Telemetry Issues</CardTitle>
                <CardDescription>
                  Common issues detected in telemetry data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Battery Issues",
                        count: analytics.telemetry.batteryIssues,
                      },
                      {
                        name: "Signal Issues",
                        count: analytics.telemetry.signalIssues,
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="count"
                      name="Number of Issues"
                      fill="#0D9488"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Flight Performance</CardTitle>
                <CardDescription>Average flight metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Average Flight Duration
                      </span>
                      <span className="text-sm font-medium">
                        {analytics.telemetry.averageFlightDuration}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Average Max Altitude
                      </span>
                      <span className="text-sm font-medium">
                        {analytics.telemetry.averageMaxAltitude}m
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                      <div
                        className="bg-teal-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (analytics.telemetry.averageMaxAltitude / 30) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Flight Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Flights
                        </p>
                        <p className="text-lg font-medium">
                          {analytics.telemetry.totalFlights}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Issues
                        </p>
                        <p className="text-lg font-medium">
                          {analytics.telemetry.batteryIssues +
                            analytics.telemetry.signalIssues}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Telemetry vs. Exam Performance</CardTitle>
                <CardDescription>
                  Correlation between telemetry success and exam scores
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Exam Score", value: analytics.averageScore },
                      {
                        name: "Telemetry Success",
                        value: Math.round(
                          analytics.telemetry.averageSuccessRate
                        ),
                      },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="value" name="Percentage (%)" fill="#0D9488" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
