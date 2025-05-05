import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock telemetry data for different drone types
const mockTelemetryData = {
  micro: {
    flightTime: "8m 23s",
    maxAltitude: "42m",
    maxDistance: "87m",
    batteryUsage: "76%",
    maneuvers: [
      { name: "Takeoff", quality: "Good", timestamp: "00:00:12" },
      { name: "Hover", quality: "Excellent", timestamp: "00:01:05" },
      { name: "Figure 8", quality: "Fair", timestamp: "00:02:38" },
      { name: "Indoor Navigation", quality: "Good", timestamp: "00:04:12" },
      { name: "Precision Landing", quality: "Good", timestamp: "00:07:45" },
    ],
    events: [
      { type: "info", message: "Takeoff initiated", timestamp: "00:00:12" },
      { type: "warning", message: "Wind gust detected", timestamp: "00:03:24" },
      {
        type: "info",
        message: "Return to home initiated",
        timestamp: "00:07:30",
      },
      { type: "info", message: "Landing complete", timestamp: "00:08:23" },
    ],
    metrics: {
      stability: {
        value: 85,
        description:
          "Stability during flight, especially in hover and maneuvers",
      },
      precision: {
        value: 78,
        description: "Precision in executing commands and maintaining position",
      },
      safety: {
        value: 90,
        description: "Adherence to safety protocols and obstacle avoidance",
      },
      indoorNavigation: {
        value: 82,
        description: "Ability to navigate in confined indoor spaces",
      },
    },
    rawData: {
      gpsSignal: "Moderate (6-8 satellites)",
      controllerDistance: "Average: 45m, Max: 87m",
      batteryVoltage: "Start: 3.8V, End: 3.4V",
      motorTemperature: "Max: 42°C",
    },
  },
  small: {
    flightTime: "18m 45s",
    maxAltitude: "95m",
    maxDistance: "1.2km",
    batteryUsage: "85%",
    maneuvers: [
      { name: "Takeoff", quality: "Excellent", timestamp: "00:00:15" },
      { name: "Hover", quality: "Good", timestamp: "00:01:30" },
      { name: "Orbit", quality: "Fair", timestamp: "00:04:12" },
      { name: "Waypoint Navigation", quality: "Good", timestamp: "00:08:25" },
      { name: "Return to Home", quality: "Excellent", timestamp: "00:15:10" },
      { name: "Precision Landing", quality: "Good", timestamp: "00:18:30" },
    ],
    events: [
      { type: "info", message: "Takeoff initiated", timestamp: "00:00:15" },
      {
        type: "info",
        message: "Waypoint mission started",
        timestamp: "00:08:25",
      },
      {
        type: "warning",
        message: "Strong wind detected",
        timestamp: "00:10:42",
      },
      { type: "warning", message: "Battery at 30%", timestamp: "00:14:50" },
      {
        type: "info",
        message: "Return to home initiated",
        timestamp: "00:15:10",
      },
      { type: "info", message: "Landing complete", timestamp: "00:18:45" },
    ],
    metrics: {
      stability: {
        value: 72,
        description: "Stability during flight, especially in windy conditions",
      },
      precision: {
        value: 68,
        description: "Precision in executing commands and maintaining position",
      },
      safety: {
        value: 65,
        description: "Adherence to safety protocols and obstacle avoidance",
      },
      weatherHandling: {
        value: 60,
        description: "Performance in challenging weather conditions",
      },
    },
    rawData: {
      gpsSignal: "Strong (12-14 satellites)",
      controllerDistance: "Average: 650m, Max: 1.2km",
      batteryVoltage: "Start: 15.8V, End: 13.2V",
      motorTemperature: "Max: 58°C",
      windSpeed: "Average: 18km/h, Max: 25km/h",
    },
  },
  large: {
    flightTime: "32m 18s",
    maxAltitude: "110m",
    maxDistance: "3.5km",
    batteryUsage: "78%",
    maneuvers: [
      { name: "Takeoff", quality: "Excellent", timestamp: "00:00:20" },
      { name: "Hover", quality: "Excellent", timestamp: "00:01:45" },
      { name: "Payload Delivery", quality: "Good", timestamp: "00:08:30" },
      {
        name: "Autonomous Mission",
        quality: "Excellent",
        timestamp: "00:12:15",
      },
      {
        name: "Obstacle Avoidance",
        quality: "Excellent",
        timestamp: "00:18:40",
      },
      { name: "Return to Home", quality: "Excellent", timestamp: "00:28:10" },
      { name: "Precision Landing", quality: "Good", timestamp: "00:32:05" },
    ],
    events: [
      { type: "info", message: "Takeoff initiated", timestamp: "00:00:20" },
      { type: "info", message: "Payload secured", timestamp: "00:08:30" },
      {
        type: "info",
        message: "Autonomous mission started",
        timestamp: "00:12:15",
      },
      {
        type: "info",
        message: "Obstacle detected and avoided",
        timestamp: "00:18:40",
      },
      { type: "warning", message: "Battery at 30%", timestamp: "00:27:50" },
      {
        type: "info",
        message: "Return to home initiated",
        timestamp: "00:28:10",
      },
      { type: "info", message: "Landing complete", timestamp: "00:32:18" },
    ],
    metrics: {
      stability: {
        value: 95,
        description: "Stability during flight, especially with payload",
      },
      precision: {
        value: 92,
        description: "Precision in executing commands and maintaining position",
      },
      safety: {
        value: 94,
        description: "Adherence to safety protocols and obstacle avoidance",
      },
      payloadManagement: {
        value: 90,
        description: "Handling and stability with payload",
      },
      autonomousOperation: {
        value: 93,
        description: "Performance during autonomous mission execution",
      },
    },
    rawData: {
      gpsSignal: "Excellent (16-18 satellites)",
      controllerDistance: "Average: 1.8km, Max: 3.5km",
      batteryVoltage: "Start: 22.8V, End: 19.2V",
      motorTemperature: "Max: 62°C",
      windSpeed: "Average: 12km/h, Max: 22km/h",
      payloadWeight: "2.8kg",
    },
  },
};

export default function TelemetryReview({ droneType, onScoresChange }) {
  const telemetryData = mockTelemetryData[droneType] || mockTelemetryData.small;
  const [scores, setScores] = useState({
    stability: telemetryData.metrics.stability.value / 5,
    precision: telemetryData.metrics.precision.value / 5,
    safety: telemetryData.metrics.safety.value / 5,
    ...(droneType === "micro" && {
      indoorNavigation: telemetryData.metrics.indoorNavigation.value / 5,
    }),
    ...(droneType === "small" && {
      weatherHandling: telemetryData.metrics.weatherHandling.value / 5,
    }),
    ...(droneType === "large" && {
      payloadManagement: telemetryData.metrics.payloadManagement.value / 5,
      autonomousOperation: telemetryData.metrics.autonomousOperation.value / 5,
    }),
  });

  const handleScoreChange = (metric, value) => {
    const newScores = { ...scores, [metric]: value[0] };
    setScores(newScores);

    // Convert scores from 0-20 scale to 0-100 scale
    const scaledScores = Object.entries(newScores).reduce(
      (acc, [key, value]) => {
        acc[key] = value * 5;
        return acc;
      },
      {}
    );

    onScoresChange(scaledScores);
  };

  const getQualityBadge = (quality) => {
    switch (quality) {
      case "Excellent":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Excellent
          </Badge>
        );
      case "Good":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            Good
          </Badge>
        );
      case "Fair":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            Fair
          </Badge>
        );
      case "Poor":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            Poor
          </Badge>
        );
      default:
        return <Badge variant="outline">{quality}</Badge>;
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Telemetry Data Review</AlertTitle>
        <AlertDescription>
          Review the telemetry data and score the candidate's performance.
          Scores should reflect the quality of flight execution, safety
          procedures, and drone handling.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="maneuvers">Maneuvers</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="raw">Raw Data</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Flight Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {telemetryData.flightTime}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Max Altitude
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {telemetryData.maxAltitude}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Max Distance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {telemetryData.maxDistance}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Battery Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {telemetryData.batteryUsage}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maneuvers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flight Maneuvers</CardTitle>
              <CardDescription>
                Key maneuvers performed during the flight test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {telemetryData.maneuvers.map((maneuver, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{maneuver.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {maneuver.timestamp}
                      </p>
                    </div>
                    {getQualityBadge(maneuver.quality)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flight Events</CardTitle>
              <CardDescription>
                Significant events during the flight
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {telemetryData.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 border-b pb-2"
                  >
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="font-medium">{event.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="raw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Raw Telemetry Data</CardTitle>
              <CardDescription>Technical flight data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(telemetryData.rawData).map(
                  ([key, value], index) => (
                    <div key={index} className="grid grid-cols-2 border-b pb-2">
                      <p className="font-medium">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p>{value}</p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Performance Scoring</CardTitle>
          <CardDescription>
            Score the candidate's performance based on telemetry data (0-20
            scale)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">
                  Stability (Score: {scores.stability})
                </label>
                <span className="text-sm text-muted-foreground">
                  {scores.stability * 5}/100
                </span>
              </div>
              <Slider
                defaultValue={[scores.stability]}
                max={20}
                step={1}
                onValueChange={(value) => handleScoreChange("stability", value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {telemetryData.metrics.stability.description}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">
                  Precision (Score: {scores.precision})
                </label>
                <span className="text-sm text-muted-foreground">
                  {scores.precision * 5}/100
                </span>
              </div>
              <Slider
                defaultValue={[scores.precision]}
                max={20}
                step={1}
                onValueChange={(value) => handleScoreChange("precision", value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {telemetryData.metrics.precision.description}
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">
                  Safety (Score: {scores.safety})
                </label>
                <span className="text-sm text-muted-foreground">
                  {scores.safety * 5}/100
                </span>
              </div>
              <Slider
                defaultValue={[scores.safety]}
                max={20}
                step={1}
                onValueChange={(value) => handleScoreChange("safety", value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {telemetryData.metrics.safety.description}
              </p>
            </div>

            {droneType === "micro" && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">
                    Indoor Navigation (Score: {scores.indoorNavigation})
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {scores.indoorNavigation * 5}/100
                  </span>
                </div>
                <Slider
                  defaultValue={[scores.indoorNavigation]}
                  max={20}
                  step={1}
                  onValueChange={(value) =>
                    handleScoreChange("indoorNavigation", value)
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {telemetryData.metrics.indoorNavigation.description}
                </p>
              </div>
            )}

            {droneType === "small" && (
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">
                    Weather Handling (Score: {scores.weatherHandling})
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {scores.weatherHandling * 5}/100
                  </span>
                </div>
                <Slider
                  defaultValue={[scores.weatherHandling]}
                  max={20}
                  step={1}
                  onValueChange={(value) =>
                    handleScoreChange("weatherHandling", value)
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {telemetryData.metrics.weatherHandling.description}
                </p>
              </div>
            )}

            {droneType === "large" && (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Payload Management (Score: {scores.payloadManagement})
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {scores.payloadManagement * 5}/100
                    </span>
                  </div>
                  <Slider
                    defaultValue={[scores.payloadManagement]}
                    max={20}
                    step={1}
                    onValueChange={(value) =>
                      handleScoreChange("payloadManagement", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {telemetryData.metrics.payloadManagement.description}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">
                      Autonomous Operation (Score: {scores.autonomousOperation})
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {scores.autonomousOperation * 5}/100
                    </span>
                  </div>
                  <Slider
                    defaultValue={[scores.autonomousOperation]}
                    max={20}
                    step={1}
                    onValueChange={(value) =>
                      handleScoreChange("autonomousOperation", value)
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {telemetryData.metrics.autonomousOperation.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
