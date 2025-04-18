import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-white dark:from-slate-900 dark:to-slate-950 px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <BookOpen className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Select your role and enter your credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <RadioGroup
              defaultValue="candidate"
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="candidate"
                  id="candidate"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="candidate"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600"
                >
                  <span className="font-semibold">Candidate</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="examiner"
                  id="examiner"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="examiner"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-muted-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600"
                >
                  <span className="font-semibold">Examiner</span>
                </Label>
              </div>
            </RadioGroup>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              <Link href="/dashboard">Sign In</Link>
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
