import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./Authentication/Login";
import Registration from "./Authentication/Registration";

import AdminDashboard from "./components/admin/AdminDashbaord";
import EmployeeDashboard from "./components/employee/EmployeeDashbaord";


// Main app content component - user login status check kare
function AppContent() {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState("login");

  // User login hoy to admin/employee dashboard show kare
  if (currentUser) {
    return currentUser.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
  }

  // User na login hoy to login/registration page show kare
  return currentPage === "login" ? (
    <Login onGoToRegister={() => setCurrentPage("register")} />
  ) : (
    <Registration onGoToLogin={() => setCurrentPage("login")} />
  );
}

// Main App component - AuthProvider ne wrap kare
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}