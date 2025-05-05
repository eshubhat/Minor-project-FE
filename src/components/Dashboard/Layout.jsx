import { Link } from "react-router-dom";
import { useState } from "react";
import { BookOpen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DashboardNav } from "./DashboaradNav";
import { UserNav } from "./UserNav";

export function DashboardLayout({ children, role = "examiner" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <Link
                  href="/"
                  className="flex items-center gap-2 py-4"
                  onClick={() => setOpen(false)}
                >
                  <BookOpen className="h-6 w-6 text-teal-600" />
                  <span className="font-bold">DCP</span>
                </Link>
                <div className="mt-8">
                  <DashboardNav role={role} mobile={true} setOpen={setOpen} />
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-teal-600" />
              <span className="hidden font-bold md:inline-block">
                DCP
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <div className="sticky top-16 overflow-y-auto py-6 pr-6 lg:py-8">
            <DashboardNav role={role} />
          </div>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
