import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./Authentication/Login";
import Registration from "./Authentication/Registration";

// import AdminDashboard from "./components/admin/AdminDashboard";
// import EmployeeDashboard from "./components/employee/EmployeeDashboard";

function AppContent() {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState("login");

  if (currentUser) {
    return currentUser.role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />;
  }

  return currentPage === "login" ? (
    <Login onGoToRegister={() => setCurrentPage("register")} />
  ) : (
    <Registration onGoToLogin={() => setCurrentPage("login")} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}