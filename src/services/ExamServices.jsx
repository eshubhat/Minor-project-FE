// Mock data for exams - would be replaced with MongoDB API calls
const mockQuestions = {
  micro: [
    {
      id: "micro1",
      question: "What is the typical weight range for micro drones?",
      options: ["Under 250g", "250g-2kg", "2kg-5kg", "Over 5kg"],
      correctAnswer: "Under 250g",
    },
    {
      id: "micro2",
      question:
        "Which component is most commonly downsized in micro drones to save weight?",
      options: ["Motors", "Battery", "Camera", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      id: "micro3",
      question: "What is a common flight time limitation for micro drones?",
      options: [
        "5-10 minutes",
        "10-15 minutes",
        "15-20 minutes",
        "Over 30 minutes",
      ],
      correctAnswer: "5-10 minutes",
    },
    {
      id: "micro4",
      question: "Which of these is NOT typically a feature of micro drones?",
      options: [
        "Foldable arms",
        "4K camera",
        "Long-range transmission",
        "Altitude hold",
      ],
      correctAnswer: "Long-range transmission",
    },
    {
      id: "micro5",
      question: "What battery type is most commonly used in micro drones?",
      options: ["1S LiPo", "2S LiPo", "3S LiPo", "NiMH"],
      correctAnswer: "1S LiPo",
    },
    {
      id: "micro6",
      question: "What is the typical control range for most micro drones?",
      options: [
        "30-100 meters",
        "100-500 meters",
        "500-1000 meters",
        "Over 1km",
      ],
      correctAnswer: "30-100 meters",
    },
    {
      id: "micro7",
      question: "Which propeller size is commonly used on micro drones?",
      options: ["1-2 inch", "3-4 inch", "5-6 inch", "7-8 inch"],
      correctAnswer: "1-2 inch",
    },
    {
      id: "micro8",
      question: "What is a common frame material for micro drones?",
      options: ["Carbon fiber", "Plastic", "Aluminum", "Titanium"],
      correctAnswer: "Plastic",
    },
    {
      id: "micro9",
      question:
        "Which feature is most important for indoor micro drone flying?",
      options: ["Prop guards", "GPS", "4K camera", "Long battery life"],
      correctAnswer: "Prop guards",
    },
    {
      id: "micro10",
      question: "What is the main advantage of brushed motors in micro drones?",
      options: [
        "Simplicity and cost",
        "Power efficiency",
        "Durability",
        "Speed control",
      ],
      correctAnswer: "Simplicity and cost",
    },
    {
      id: "micro11",
      question: "Which of these micro drone features helps with stability?",
      options: ["Gyroscope", "Barometer", "GPS", "Wi-Fi antenna"],
      correctAnswer: "Gyroscope",
    },
    {
      id: "micro12",
      question:
        "What is a common camera resolution for entry-level micro drones?",
      options: ["720p", "1080p", "2.7K", "4K"],
      correctAnswer: "720p",
    },
    {
      id: "micro13",
      question: "Which of these is NOT a common micro drone flight mode?",
      options: [
        "Headless mode",
        "Waypoint navigation",
        "Flip mode",
        "Altitude hold",
      ],
      correctAnswer: "Waypoint navigation",
    },
    {
      id: "micro14",
      question: "What is the typical motor size used in micro drones?",
      options: [
        "0603-0802 size",
        "1104-1306 size",
        "2204-2306 size",
        "2700-3100 size",
      ],
      correctAnswer: "0603-0802 size",
    },
    {
      id: "micro15",
      question:
        "Which regulatory advantage do sub-250g micro drones have in many countries?",
      options: [
        "Exempt from registration",
        "Can fly at night",
        "No altitude restrictions",
        "Can fly over people",
      ],
      correctAnswer: "Exempt from registration",
    },
    {
      id: "micro16",
      question: "What is a common charging method for micro drone batteries?",
      options: [
        "USB charging",
        "Balance charger",
        "AC adapter",
        "Wireless charging",
      ],
      correctAnswer: "USB charging",
    },
    {
      id: "micro17",
      question: "Which of these is a common micro drone transmitter protocol?",
      options: ["DSM2/DSMX", "FlySky", "FrSky", "All of the above"],
      correctAnswer: "All of the above",
    },
    {
      id: "micro18",
      question: "What is the typical maximum wind resistance of micro drones?",
      options: [
        "Level 1-2 (0-10 mph)",
        "Level 3-4 (11-20 mph)",
        "Level 5 (21-25 mph)",
        "Level 6+ (25+ mph)",
      ],
      correctAnswer: "Level 1-2 (0-10 mph)",
    },
    {
      id: "micro19",
      question:
        "Which feature allows a micro drone to maintain a specific height?",
      options: [
        "Altitude hold",
        "Headless mode",
        "One-key return",
        "Trim adjustment",
      ],
      correctAnswer: "Altitude hold",
    },
    {
      id: "micro20",
      question:
        "What is a common issue with micro drones in outdoor environments?",
      options: [
        "Wind sensitivity",
        "Signal interference",
        "Battery drainage",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
  ],
  small: [
    {
      id: "small1",
      question: "What is the typical weight range for small drones?",
      options: ["Under 250g", "250g-2kg", "2kg-5kg", "Over 5kg"],
      correctAnswer: "250g-2kg",
    },
    {
      id: "small2",
      question: "Which battery configuration is most common in small drones?",
      options: ["1S LiPo", "2S-3S LiPo", "4S-6S LiPo", "NiMH"],
      correctAnswer: "3S-4S LiPo",
    },
    {
      id: "small3",
      question: "What is a typical flight time for small consumer drones?",
      options: [
        "5-10 minutes",
        "10-20 minutes",
        "20-30 minutes",
        "Over 30 minutes",
      ],
      correctAnswer: "20-30 minutes",
    },
    {
      id: "small4",
      question:
        "Which feature is standard on most modern small drones but not micro drones?",
      options: [
        "GPS positioning",
        "Propellers",
        "Flight controller",
        "Battery",
      ],
      correctAnswer: "GPS positioning",
    },
    {
      id: "small5",
      question: "What is the typical maximum range for small consumer drones?",
      options: ["500m", "1-2km", "4-5km", "10km+"],
      correctAnswer: "4-5km",
    },
    {
      id: "small6",
      question:
        "Which camera capability is common in small drones but rare in micro drones?",
      options: [
        "4K video",
        "Photo capture",
        "SD card storage",
        "Wi-Fi transmission",
      ],
      correctAnswer: "4K video",
    },
    {
      id: "small7",
      question: "What motor size is typically used in small drones?",
      options: [
        "0802-1105 size",
        "1306-1806 size",
        "2204-2306 size",
        "2700-3100 size",
      ],
      correctAnswer: "2204-2306 size",
    },
    {
      id: "small8",
      question:
        "Which obstacle avoidance technology is common in small drones?",
      options: [
        "Infrared sensors",
        "Ultrasonic sensors",
        "Visual sensors",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      id: "small9",
      question: "What is a common frame material for small drones?",
      options: ["Plastic", "Carbon fiber", "Aluminum", "Wood"],
      correctAnswer: "Carbon fiber",
    },
    {
      id: "small10",
      question:
        "Which of these is a common intelligent flight mode in small drones?",
      options: ["Follow Me", "Flip Mode", "Manual Mode", "Acro Mode"],
      correctAnswer: "Follow Me",
    },
    {
      id: "small11",
      question: "What is the typical propeller size range for small drones?",
      options: ["1-2 inch", "3-4.5 inch", "5-7 inch", "8-10 inch"],
      correctAnswer: "5-7 inch",
    },
    {
      id: "small12",
      question:
        "Which transmission technology is commonly used in small drones?",
      options: ["Wi-Fi", "Bluetooth", "OcuSync/Lightbridge", "Radio frequency"],
      correctAnswer: "OcuSync/Lightbridge",
    },
    {
      id: "small13",
      question: "What is a common maximum speed for small consumer drones?",
      options: ["15-20 mph", "30-40 mph", "45-55 mph", "60+ mph"],
      correctAnswer: "30-40 mph",
    },
    {
      id: "small14",
      question:
        "Which gimbal configuration is most common in small camera drones?",
      options: ["1-axis", "2-axis", "3-axis", "4-axis"],
      correctAnswer: "3-axis",
    },
    {
      id: "small15",
      question: "What is a common wind resistance rating for small drones?",
      options: [
        "Level 1-2 (0-10 mph)",
        "Level 3-4 (11-20 mph)",
        "Level 5 (21-25 mph)",
        "Level 6+ (25+ mph)",
      ],
      correctAnswer: "Level 5 (21-25 mph)",
    },
    {
      id: "small16",
      question:
        "Which feature allows a small drone to return to its takeoff point automatically?",
      options: [
        "Return to Home (RTH)",
        "Waypoint navigation",
        "Follow Me mode",
        "Orbit mode",
      ],
      correctAnswer: "Return to Home (RTH)",
    },
    {
      id: "small17",
      question:
        "What is a common maximum altitude limit set by manufacturers for small drones?",
      options: ["50 meters", "120 meters", "500 meters", "No limit"],
      correctAnswer: "120 meters",
    },
    {
      id: "small18",
      question:
        "Which of these is NOT typically a feature of small consumer drones?",
      options: [
        "Automated landing",
        "Payload delivery",
        "Obstacle avoidance",
        "Automatic takeoff",
      ],
      correctAnswer: "Payload delivery",
    },
    {
      id: "small19",
      question:
        "What type of remote controller is typically used with small drones?",
      options: [
        "Smartphone app only",
        "Dedicated controller with smartphone integration",
        "Simple 2-stick controller",
        "Voice control",
      ],
      correctAnswer: "Dedicated controller with smartphone integration",
    },
    {
      id: "small20",
      question:
        "Which storage media is most commonly used in small drones for recording footage?",
      options: [
        "Internal memory only",
        "microSD card",
        "SSD drive",
        "USB drive",
      ],
      correctAnswer: "microSD card",
    },
  ],
  medium: [
    {
      id: "medium1",
      question:
        "What is the typical weight range for medium commercial drones?",
      options: ["Under 2kg", "2kg-5kg", "5kg-25kg", "Over 25kg"],
      correctAnswer: "5kg-25kg",
    },
    {
      id: "medium2",
      question:
        "Which battery configuration is most common in medium professional drones?",
      options: ["3S-4S LiPo", "6S-8S LiPo", "12S+ LiPo", "Lead-acid"],
      correctAnswer: "6S-8S LiPo",
    },
    {
      id: "medium3",
      question: "What is a typical flight time for medium professional drones?",
      options: [
        "5-15 minutes",
        "15-25 minutes",
        "25-40 minutes",
        "40+ minutes",
      ],
      correctAnswer: "25-40 minutes",
    },
    {
      id: "medium4",
      question: "Which of these is a common use case for medium drones?",
      options: [
        "Selfie photography",
        "Professional cinematography",
        "Indoor racing",
        "Children's toys",
      ],
      correctAnswer: "Professional cinematography",
    },
    {
      id: "medium5",
      question:
        "What is a common maximum payload capacity for medium commercial drones?",
      options: ["Under 500g", "500g-2kg", "2kg-5kg", "5kg+"],
      correctAnswer: "2kg-5kg",
    },
    {
      id: "medium6",
      question:
        "Which motor configuration is common in medium professional drones?",
      options: [
        "Brushed motors",
        "Small brushless motors",
        "Large brushless motors",
        "Gasoline engines",
      ],
      correctAnswer: "Large brushless motors",
    },
    {
      id: "medium7",
      question: "What is a typical propeller size for medium drones?",
      options: ["3-5 inch", "5-8 inch", "9-15 inch", "16+ inch"],
      correctAnswer: "9-15 inch",
    },
    {
      id: "medium8",
      question:
        "Which camera system is commonly used on medium professional drones?",
      options: [
        "Built-in camera only",
        "Action cameras like GoPro",
        "Interchangeable camera systems",
        "Smartphone cameras",
      ],
      correctAnswer: "Interchangeable camera systems",
    },
    {
      id: "medium9",
      question:
        "What is a common frame material for medium professional drones?",
      options: [
        "Plastic",
        "Carbon fiber",
        "Aluminum",
        "Combination of materials",
      ],
      correctAnswer: "Combination of materials",
    },
    {
      id: "medium10",
      question:
        "Which feature is critical for medium drone operations in professional settings?",
      options: [
        "Flip mode",
        "Redundant systems",
        "Voice control",
        "Compact folding",
      ],
      correctAnswer: "Redundant systems",
    },
    {
      id: "medium11",
      question:
        "What is a common maximum speed for medium professional drones?",
      options: ["20-30 mph", "40-50 mph", "60-70 mph", "80+ mph"],
      correctAnswer: "40-50 mph",
    },
    {
      id: "medium12",
      question:
        "Which transmission system is preferred for long-range medium drone operations?",
      options: [
        "Wi-Fi",
        "Bluetooth",
        "Digital radio (900MHz/2.4GHz/5.8GHz)",
        "Cellular network",
      ],
      correctAnswer: "Digital radio (900MHz/2.4GHz/5.8GHz)",
    },
    {
      id: "medium13",
      question:
        "What type of flight controller is typically used in medium professional drones?",
      options: [
        "Basic stabilization only",
        "GPS-enabled",
        "Advanced with RTK positioning",
        "Manual control only",
      ],
      correctAnswer: "Advanced with RTK positioning",
    },
    {
      id: "medium14",
      question:
        "Which regulatory requirement is common for medium drone operations in most countries?",
      options: [
        "No special requirements",
        "Registration only",
        "Registration and pilot certification",
        "No regulations exist",
      ],
      correctAnswer: "Registration and pilot certification",
    },
    {
      id: "medium15",
      question:
        "What is a common wind resistance rating for medium professional drones?",
      options: [
        "Level 3-4 (11-20 mph)",
        "Level 5 (21-25 mph)",
        "Level 6 (26-30 mph)",
        "Level 7+ (31+ mph)",
      ],
      correctAnswer: "Level 6 (26-30 mph)",
    },
    {
      id: "medium16",
      question:
        "Which feature allows precise positioning for medium drone mapping operations?",
      options: ["Standard GPS", "GLONASS", "RTK/PPK GPS", "Barometer"],
      correctAnswer: "RTK/PPK GPS",
    },
    {
      id: "medium17",
      question:
        "What is a common safety feature in medium professional drones?",
      options: [
        "Return to Home",
        "Parachute systems",
        "Redundant power systems",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      id: "medium18",
      question:
        "Which sensor is commonly added to medium drones for specialized operations?",
      options: [
        "Thermal camera",
        "LiDAR",
        "Multispectral sensor",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
    {
      id: "medium19",
      question:
        "What is a common control interface for medium professional drones?",
      options: [
        "Simple remote control",
        "Smartphone app",
        "Ground control station with telemetry",
        "Voice commands",
      ],
      correctAnswer: "Ground control station with telemetry",
    },
    {
      id: "medium20",
      question:
        "Which power system is sometimes used in medium endurance drones?",
      options: [
        "Standard LiPo batteries",
        "Hydrogen fuel cells",
        "Solar power",
        "All of the above",
      ],
      correctAnswer: "All of the above",
    },
  ],
};

const mockSubmissions = [
  {
    id: "sub1",
    candidateName: "John Doe",
    examDate: "2025-04-15",
    droneType: "small",
    answers: [
      { questionId: "small1", answer: "250g-2kg" },
      { questionId: "small3", answer: "20-30 minutes" },
      { questionId: "small5", answer: "4-5km" },
      { questionId: "small7", answer: "1306-1806 size" },
      { questionId: "small9", answer: "Carbon fiber" },
      { questionId: "small11", answer: "5-7 inch" },
      { questionId: "small13", answer: "30-40 mph" },
      { questionId: "small15", answer: "Level 5 (21-25 mph)" },
      { questionId: "small17", answer: "120 meters" },
      {
        questionId: "small19",
        answer: "Dedicated controller with smartphone integration",
      },
    ],
    telemetryUploaded: true,
    scores: null,
    totalScore: null,
    passed: null,
  },
  {
    id: "sub2",
    candidateName: "Jane Smith",
    examDate: "2025-04-16",
    droneType: "micro",
    answers: [
      { questionId: "micro2", answer: "All of the above" },
      { questionId: "micro4", answer: "Long-range transmission" },
      { questionId: "micro6", answer: "100-500 meters" },
      { questionId: "micro8", answer: "Plastic" },
      { questionId: "micro10", answer: "Simplicity and cost" },
      { questionId: "micro12", answer: "720p" },
      { questionId: "micro14", answer: "0603-0802 size" },
      { questionId: "micro16", answer: "USB charging" },
      { questionId: "micro18", answer: "Level 1-2 (0-10 mph)" },
      { questionId: "micro20", answer: "All of the above" },
    ],
    telemetryUploaded: true,
    scores: {
      micro2: 10,
      micro4: 10,
      micro6: 0,
      micro8: 10,
      micro10: 10,
      micro12: 10,
      micro14: 10,
      micro16: 10,
      micro18: 10,
      micro20: 10,
    },
    totalScore: 90,
    passed: true,
  },
  {
    id: "sub3",
    candidateName: "Mike Johnson",
    examDate: "2025-04-17",
    droneType: "medium",
    answers: [
      { questionId: "medium1", answer: "5kg-25kg" },
      { questionId: "medium3", answer: "25-40 minutes" },
      { questionId: "medium5", answer: "2kg-5kg" },
      { questionId: "medium7", answer: "9-15 inch" },
      { questionId: "medium9", answer: "Carbon fiber" },
      { questionId: "medium11", answer: "40-50 mph" },
      { questionId: "medium13", answer: "Advanced with RTK positioning" },
      { questionId: "medium15", answer: "Level 6 (26-30 mph)" },
      { questionId: "medium17", answer: "All of the above" },
      {
        questionId: "medium19",
        answer: "Ground control station with telemetry",
      },
    ],
    telemetryUploaded: true,
    scores: {
      medium1: 10,
      medium3: 10,
      medium5: 10,
      medium7: 10,
      medium9: 0,
      medium11: 10,
      medium13: 10,
      medium15: 10,
      medium17: 10,
      medium19: 10,
    },
    totalScore: 90,
    passed: true,
  },
];

// In a real app, these would be API calls to MongoDB
export const examService = {
  getDroneTypes: () => {
    return [
      { id: "micro", name: "Micro Drone", description: "Under 250g drones" },
      {
        id: "small",
        name: "Small Drone",
        description: "250g-2kg consumer drones",
      },
      {
        id: "medium",
        name: "Medium Drone",
        description: "Professional drones over 2kg",
      },
    ];
  },

  getRandomQuestions: (droneType, count = 10) => {
    // Get questions for the selected drone type
    const questions = mockQuestions[droneType] || [];

    // Shuffle and return random questions
    return [...questions].sort(() => 0.5 - Math.random()).slice(0, count);
  },

  submitExam: (candidateName, droneType, answers) => {
    // Would send data to MongoDB in a real app
    console.log("Exam submitted:", { candidateName, droneType, answers });
    return { success: true, submissionId: "sub" + Date.now() };
  },

  uploadTelemetry: (submissionId, telemetryData) => {
    // Would send telemetry data to MongoDB in a real app
    console.log("Telemetry uploaded:", { submissionId, telemetryData });
    return { success: true };
  },

  getSubmissions: () => {
    return mockSubmissions;
  },

  getSubmissionById: (id) => {
    return mockSubmissions.find((sub) => sub.id === id);
  },

  saveScores: (submissionId, scores, totalScore, passed) => {
    // Would update scores in MongoDB in a real app
    console.log("Scores saved:", { submissionId, scores, totalScore, passed });

    // Update the mock submission
    const submission = mockSubmissions.find((sub) => sub.id === submissionId);
    if (submission) {
      submission.scores = scores;
      submission.totalScore = totalScore;
      submission.passed = passed;
    }

    return { success: true };
  },
};
