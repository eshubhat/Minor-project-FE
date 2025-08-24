import { useNavigate } from "react-router-dom";
import {
  Calendar,
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

const examinerLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Create Exam",
    href: "/create-exam",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Scheduled Exams",
    href: "/scheduled-exams",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Candidates",
    href: "/candidates",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: <Settings className="h-5 w-5" />,
  },
];

const candidateLinks = [
  {
    title: "Dashboard",
    href: "/candidate/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Available Exams",
    href: "/candidate/available-exams",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "My Results",
    href: "/candidate/results",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Compare Performance",
    href: "/candidate/compare",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/candidate/profile",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function DashboardNav({ role = "examiner", mobile = false, setOpen }) {
  const navigate = useNavigate();
  const links = role === "examiner" ? examinerLinks : candidateLinks;

  return (
    <nav className="grid gap-2">
      {links.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          className="justify-start gap-2"
          asChild
          onClick={mobile && setOpen ? () => setOpen(false) : undefined}
        >
          <button onClick={() => navigate(link.href)}>
            {link.icon}
            {link.title}
          </button>
        </Button>
      ))}
    </nav>
  );
}
