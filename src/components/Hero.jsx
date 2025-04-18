import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Modern Assessment Platform
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Create, schedule, and analyze exams with ease. Empower educators
                and students with powerful analytics.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-teal-600 hover:bg-teal-700"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Hero Image"
              className="aspect-square overflow-hidden rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
