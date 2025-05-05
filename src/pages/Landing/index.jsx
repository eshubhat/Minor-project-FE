import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, ClipboardCheck, BarChart3 } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
          Drone Exam 
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take exams, upload telemetry data, and gain insights with advanced
          analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="rounded-full bg-teal-100 p-3 w-12 h-12 flex items-center justify-center mb-4 dark:bg-teal-900">
              <ClipboardCheck className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle>Candidate Exam</CardTitle>
            <CardDescription>
              Take exams and upload telemetry data
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Answer randomly generated questions and upload your telemetry data
              for comprehensive assessment.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <div onClick={() => navigate("/candidate")}>Take Exam</div>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="rounded-full bg-teal-100 p-3 w-12 h-12 flex items-center justify-center mb-4 dark:bg-teal-900">
              <Activity className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle>Review & Scoring</CardTitle>
            <CardDescription>
              Review candidate answers and telemetry
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Evaluate candidate responses alongside telemetry data and provide
              comprehensive scoring.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <div onClick={() => navigate("/examiner")}>Review Exams</div>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="rounded-full bg-teal-100 p-3 w-12 h-12 flex items-center justify-center mb-4 dark:bg-teal-900">
              <BarChart3 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Visualize exam performance data</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-muted-foreground">
              Gain insights through comprehensive analytics on exam performance
              and telemetry data.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
              <div onClick={() => navigate("/analytics")}>View Analytics</div>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
