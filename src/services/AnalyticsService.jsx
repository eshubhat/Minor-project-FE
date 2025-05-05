import { examService } from "./ExamServices";
import { telemetryService } from "./TelemetryService";

export const analyticsService = {
  getExamAnalytics: () => {
    const submissions = examService.getSubmissions();
    const droneTypes = examService.getDroneTypes();

    // Calculate analytics
    const analytics = {
      totalCandidates: submissions.length,
      averageScore: 0,
      passRate: 0,
      highestScore: 0,
      lowestScore: 100,
      mostMissedQuestions: [],
      scoreDistribution: {
        "0-50": 0,
        "51-70": 0,
        "71-85": 0,
        "86-100": 0,
      },
      droneTypeBreakdown: {},
    };

    // Initialize drone type breakdown
    droneTypes.forEach((type) => {
      analytics.droneTypeBreakdown[type.id] = {
        count: 0,
        avgScore: 0,
        passRate: 0,
      };
    });

    // Question stats to find most missed
    const questionStats = {};

    let scoreSum = 0;
    let passCount = 0;

    // Filter only scored submissions
    const scoredSubmissions = submissions.filter((s) => s.scores);

    if (scoredSubmissions.length === 0) {
      return analytics;
    }

    scoredSubmissions.forEach((submission) => {
      const score = submission.totalScore;
      scoreSum += score;

      if (submission.passed) {
        passCount++;
      }

      // Update highest and lowest scores
      if (score > analytics.highestScore) {
        analytics.highestScore = score;
      }
      if (score < analytics.lowestScore) {
        analytics.lowestScore = score;
      }

      // Update score distribution
      if (score <= 50) {
        analytics.scoreDistribution["0-50"]++;
      } else if (score <= 70) {
        analytics.scoreDistribution["51-70"]++;
      } else if (score <= 85) {
        analytics.scoreDistribution["71-85"]++;
      } else {
        analytics.scoreDistribution["86-100"]++;
      }

      // Track incorrect answers
      Object.entries(submission.scores).forEach(([questionId, score]) => {
        if (!questionStats[questionId]) {
          questionStats[questionId] = { incorrect: 0, total: 0 };
        }

        questionStats[questionId].total++;
        if (score === 0) {
          questionStats[questionId].incorrect++;
        }
      });

      // Update drone type breakdown
      if (
        submission.droneType &&
        analytics.droneTypeBreakdown[submission.droneType]
      ) {
        analytics.droneTypeBreakdown[submission.droneType].count++;
        analytics.droneTypeBreakdown[submission.droneType].totalScore =
          (analytics.droneTypeBreakdown[submission.droneType].totalScore || 0) +
          score;

        if (submission.passed) {
          analytics.droneTypeBreakdown[submission.droneType].passed =
            (analytics.droneTypeBreakdown[submission.droneType].passed || 0) +
            1;
        }
      }
    });

    // Calculate average score and pass rate
    analytics.averageScore = Math.round(scoreSum / scoredSubmissions.length);
    analytics.passRate = Math.round(
      (passCount / scoredSubmissions.length) * 100
    );

    // Calculate drone type averages
    Object.keys(analytics.droneTypeBreakdown).forEach((typeId) => {
      const typeData = analytics.droneTypeBreakdown[typeId];
      if (typeData.count > 0) {
        typeData.avgScore = Math.round(typeData.totalScore / typeData.count);
        typeData.passRate = Math.round(
          ((typeData.passed || 0) / typeData.count) * 100
        );
      }
    });

    // Find most missed questions
    analytics.mostMissedQuestions = Object.entries(questionStats)
      .map(([questionId, stats]) => ({
        questionId,
        incorrectRate: Math.round((stats.incorrect / stats.total) * 100),
      }))
      .sort((a, b) => b.incorrectRate - a.incorrectRate)
      .slice(0, 3);

    return analytics;
  },

  getCombinedAnalytics: () => {
    const examAnalytics = analyticsService.getExamAnalytics();
    const telemetryStats = telemetryService.getAggregatedTelemetryStats();

    return {
      ...examAnalytics,
      telemetry: telemetryStats,
    };
  },
};
