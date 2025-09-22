import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dynamic from "./pages/Dynamic";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import AssessmentFlow from "./pages/AssessmentFlow";
import AssessmentResults from "./pages/AssessmentResults";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* MindfulU Landing */}
          <Route path="/" element={<Landing />} />
          <Route path="/dynamic" element={<Dynamic />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/assessment" element={<AssessmentFlow />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* 404 Handler */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
