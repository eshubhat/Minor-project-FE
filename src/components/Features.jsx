import { ActivitySquare, CalendarCheck, LineChart, Users } from "lucide-react";

export default function Features() {
  return (
    <div className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Examiners & Candidates
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Everything you need to create, manage, and analyze assessments in
            one place
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-4 dark:bg-teal-900">
              <CalendarCheck className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Flexible Scheduling</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Schedule exams for specific dates and control exactly when they're
              available
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-4 dark:bg-teal-900">
              <ActivitySquare className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Advanced Analytics</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Gain insights into performance with detailed analytics and
              reporting
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-4 dark:bg-teal-900">
              <LineChart className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Performance Tracking</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Track progress over time with historical performance comparisons
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-teal-100 p-4 dark:bg-teal-900">
              <Users className="h-8 w-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-bold">Privacy Controls</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Compare results while maintaining privacy and confidentiality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
