import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ExaminerDashboardPage from "./pages/Examiner/Dashboard";
import AnalyticsPage from "./pages/Examiner/Analytics";
import CandidatesPage from "./pages/Examiner/Candidates";
import CandidateDashboardPage from "./pages/Candidate/Dashboard";
import ComparePage from "./pages/Candidate/ComparePerformance";
import ResultsPage from "./pages/Candidate/Results";
import ScheduledExamsPage from "./pages/Examiner/ScheduledExams";
import CreateExamPage from "./pages/Examiner/CreateExam";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />

          {/**Examiners Route */}
          <Route path="/dashboard" element={<ExaminerDashboardPage />} />
          <Route path="/create-exam" element={<CreateExamPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/scheduled-exams" element={<ScheduledExamsPage />} />

          {/**Candidates Route */}
          <Route
            path="/candidate/dashboard"
            element={<CandidateDashboardPage />}
          />
          <Route path="/candidate/compare" element={<ComparePage />} />
          <Route path="/candidate/results" element={<ResultsPage />} />
          <Route path="/candidate/:id" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
