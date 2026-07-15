import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProjectPage from "../pages/projects/ProjectPage";
export default function AppRouter() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />

  <Route path="/login" element={<LoginPage />} />

  <Route path="/register" element={<RegisterPage />} />

  <Route path="/dashboard" element={<DashboardPage />} />

  <Route
    path="/projects/:id"
    element={<ProjectPage />}
  />
</Routes>
    </BrowserRouter>
  );
}