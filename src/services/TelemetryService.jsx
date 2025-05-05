// Mock telemetry data - would be replaced with actual uploaded data
const mockTelemetryData = {
  sub1: {
    flightData: [
      {
        timestamp: "2025-04-15T10:00:00",
        batteryLevel: 95,
        altitude: 10,
        speed: 5,
      },
      {
        timestamp: "2025-04-15T10:01:00",
        batteryLevel: 92,
        altitude: 15,
        speed: 8,
      },
      {
        timestamp: "2025-04-15T10:02:00",
        batteryLevel: 89,
        altitude: 20,
        speed: 10,
      },
      {
        timestamp: "2025-04-15T10:03:00",
        batteryLevel: 86,
        altitude: 18,
        speed: 7,
      },
      {
        timestamp: "2025-04-15T10:04:00",
        batteryLevel: 83,
        altitude: 15,
        speed: 5,
      },
      {
        timestamp: "2025-04-15T10:05:00",
        batteryLevel: 80,
        altitude: 10,
        speed: 3,
      },
    ],
    events: [
      {
        timestamp: "2025-04-15T10:01:30",
        type: "WARNING",
        message: "Strong wind detected",
      },
      {
        timestamp: "2025-04-15T10:04:15",
        type: "INFO",
        message: "Return to home initiated",
      },
    ],
    summary: {
      flightDuration: "5m 30s",
      maxAltitude: 20,
      maxSpeed: 10,
      batteryUsage: 15,
      successRate: 92,
    },
  },
  sub2: {
    flightData: [
      {
        timestamp: "2025-04-16T14:00:00",
        batteryLevel: 100,
        altitude: 5,
        speed: 3,
      },
      {
        timestamp: "2025-04-16T14:01:00",
        batteryLevel: 95,
        altitude: 10,
        speed: 6,
      },
      {
        timestamp: "2025-04-16T14:02:00",
        batteryLevel: 90,
        altitude: 15,
        speed: 8,
      },
      {
        timestamp: "2025-04-16T14:03:00",
        batteryLevel: 85,
        altitude: 12,
        speed: 7,
      },
      {
        timestamp: "2025-04-16T14:04:00",
        batteryLevel: 80,
        altitude: 8,
        speed: 5,
      },
    ],
    events: [
      {
        timestamp: "2025-04-16T14:02:45",
        type: "ERROR",
        message: "Signal loss detected",
      },
      {
        timestamp: "2025-04-16T14:03:10",
        type: "ERROR",
        message: "Battery critical",
      },
      {
        timestamp: "2025-04-16T14:03:30",
        type: "CRITICAL",
        message: "Emergency landing initiated",
      },
    ],
    summary: {
      flightDuration: "3m 45s",
      maxAltitude: 15,
      maxSpeed: 8,
      batteryUsage: 20,
      successRate: 65,
    },
  },
  sub3: {
    flightData: [
      {
        timestamp: "2025-04-17T09:00:00",
        batteryLevel: 98,
        altitude: 8,
        speed: 4,
      },
      {
        timestamp: "2025-04-17T09:01:00",
        batteryLevel: 96,
        altitude: 12,
        speed: 6,
      },
      {
        timestamp: "2025-04-17T09:02:00",
        batteryLevel: 94,
        altitude: 18,
        speed: 9,
      },
      {
        timestamp: "2025-04-17T09:03:00",
        batteryLevel: 92,
        altitude: 22,
        speed: 11,
      },
      {
        timestamp: "2025-04-17T09:04:00",
        batteryLevel: 90,
        altitude: 25,
        speed: 12,
      },
      {
        timestamp: "2025-04-17T09:05:00",
        batteryLevel: 88,
        altitude: 20,
        speed: 10,
      },
      {
        timestamp: "2025-04-17T09:06:00",
        batteryLevel: 86,
        altitude: 15,
        speed: 8,
      },
      {
        timestamp: "2025-04-17T09:07:00",
        batteryLevel: 84,
        altitude: 10,
        speed: 5,
      },
      {
        timestamp: "2025-04-17T09:08:00",
        batteryLevel: 82,
        altitude: 5,
        speed: 3,
      },
    ],
    events: [
      {
        timestamp: "2025-04-17T09:02:30",
        type: "INFO",
        message: "Waypoint 1 reached",
      },
      {
        timestamp: "2025-04-17T09:04:15",
        type: "INFO",
        message: "Waypoint 2 reached",
      },
      {
        timestamp: "2025-04-17T09:06:45",
        type: "INFO",
        message: "Waypoint 3 reached",
      },
      {
        timestamp: "2025-04-17T09:08:00",
        type: "INFO",
        message: "Mission completed",
      },
    ],
    summary: {
      flightDuration: "8m 15s",
      maxAltitude: 25,
      maxSpeed: 12,
      batteryUsage: 16,
      successRate: 98,
    },
  },
};

export const telemetryService = {
  getTelemetryData: (submissionId) => {
    return mockTelemetryData[submissionId] || null;
  },

  getAggregatedTelemetryStats: () => {
    // Calculate aggregated stats from all telemetry data
    const stats = {
      averageSuccessRate: 0,
      totalFlights: Object.keys(mockTelemetryData).length,
      batteryIssues: 0,
      signalIssues: 0,
      averageFlightDuration: 0,
      averageMaxAltitude: 0,
    };

    let successRateSum = 0;
    let durationSum = 0;
    let altitudeSum = 0;

    Object.values(mockTelemetryData).forEach((data) => {
      successRateSum += data.summary.successRate;
      altitudeSum += data.summary.maxAltitude;

      // Extract minutes and seconds from duration string like "5m 30s"
      const durationParts = data.summary.flightDuration.split(" ");
      const minutes = Number.parseInt(durationParts[0].replace("m", ""));
      const seconds = Number.parseInt(durationParts[1].replace("s", ""));
      durationSum += minutes * 60 + seconds;

      // Count issues
      data.events.forEach((event) => {
        if (event.message.toLowerCase().includes("battery")) {
          stats.batteryIssues++;
        }
        if (event.message.toLowerCase().includes("signal")) {
          stats.signalIssues++;
        }
      });
    });

    stats.averageSuccessRate = successRateSum / stats.totalFlights;
    stats.averageMaxAltitude = altitudeSum / stats.totalFlights;

    // Convert seconds back to a readable format
    const avgSeconds = Math.round(durationSum / stats.totalFlights);
    const avgMinutes = Math.floor(avgSeconds / 60);
    const remainingSeconds = avgSeconds % 60;
    stats.averageFlightDuration = `${avgMinutes}m ${remainingSeconds}s`;

    return stats;
  },
};
