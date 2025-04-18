import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-teal-600" />
        <span className="hidden font-bold sm:inline-block">QuizGenius</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/features"
          className="flex items-center text-sm font-medium text-muted-foreground"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="flex items-center text-sm font-medium text-muted-foreground"
        >
          Pricing
        </Link>
        <Link
          href="/about"
          className="flex items-center text-sm font-medium text-muted-foreground"
        >
          About
        </Link>
      </nav>
    </div>
  );
}
