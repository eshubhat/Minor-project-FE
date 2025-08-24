import { useNavigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export function MainNav() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-between py-4 px-4">
      <div className="flex gap-6 md:gap-10">
        <div href="/" className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-teal-600" />
          <span className="hidden font-bold sm:inline-block">
            ExamTelemetry
          </span>
        </div>
        <nav className="hidden md:flex gap-6">
          <div
            onClick={() => navigate("/")}
            className="flex items-center text-sm font-medium text-muted-foreground cursor-pointer hover:text-teal-600"
          >
            Candidate
          </div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center text-sm font-medium text-muted-foreground cursor-pointer hover:text-teal-600"
          >
            Review
          </div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center text-sm font-medium text-muted-foreground cursor-pointer hover:text-teal-600"
          >
            Analytics
          </div>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button asChild className="hidden md:flex cursor-pointer">
          <div onClick={() => navigate("/")}>Login</div>
        </Button>
      </div>
    </div>
  );
}
