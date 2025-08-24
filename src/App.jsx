import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ExaminerDashboardPage from "./pages/Examiner/Dashboard";
// import AnalyticsPage from "./pages/Examiner/Analytics";
import CandidatesPage from "./pages/Examiner/Candidates";
import CandidateDashboardPage from "./pages/Candidate/Dashboard";
import CandidateExamPage from "./pages/Candidate";
import ComparePage from "./pages/Candidate/ComparePerformance";
import ResultsPage from "./pages/Candidate/Results";
import ScheduledExamsPage from "./pages/Examiner/ScheduledExams";
import CreateExamPage from "./pages/Examiner/CreateExam";
import { MainNav } from "./components/MainNav";
import UploadTelemetryPage from "./pages/Candidate/UploadTelemetry";
import ExaminerReviewPage from "./pages/Examiner";
import ReviewSubmissionPage from "./pages/Examiner/ReviewSubmission";
import AnalyticsPage from "./pages/Examiner/Analytics-page";
import DronePathCesium from "./pages/DroneSimulation";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path="/" element={<Landing />} />

          {/**Examiners Route */}
          <Route path="/examiner" element={<ExaminerReviewPage />} />
          <Route path="/examiner/review" element={<ExaminerReviewPage />} />
          <Route path="/examiner/addQuestion" element={<CreateExamPage />} />
          <Route
            path="/examiner/review/:id"
            element={<ReviewSubmissionPage />}
          />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard" element={<ExaminerDashboardPage />} />
          {/* <Route path="/create-exam" element={<CreateExamPage />} /> */}
          {/* <Route path="/analytics" element={<AnalyticsPage />} /> */}
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/scheduled-exams" element={<ScheduledExamsPage />} />

          {/**Candidates Route */}
          <Route path="/candidate" element={<CandidateExamPage />} />
          <Route
            path="/candidate/upload-telemetry/:id"
            element={<UploadTelemetryPage />}
          />
          <Route
            path="/candidate/dashboard"
            element={<CandidateDashboardPage />}
          />
          <Route path="/candidate/compare" element={<ComparePage />} />
          <Route path="/candidate/results" element={<ResultsPage />} />
          <Route path="/candidate/:id" element={<ResultsPage />} />

          {/**Testing Routes */}
          <Route path="/test" element={<DronePathCesium />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
