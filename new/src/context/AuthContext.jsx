import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS, EMPLOYEE_STATUS, DEFAULT_ADMIN } from "../constants";
import { getFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext(null);

// Auth context ne use karva mate custom hook
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication provider - user data manage kare
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  // Page load thay tyare saved user data restore kare
  useEffect(() => {
    const savedUser = getFromStorage(STORAGE_KEYS.loggedInUser);
    if (savedUser) setCurrentUser(savedUser);

    const savedEmployees = getFromStorage(STORAGE_KEYS.employees);
    if (savedEmployees) setEmployees(savedEmployees);
  }, []);

  // Employee data ne localStorage ma save kare
  function persistEmployees(updatedList) {
    setEmployees(updatedList);
    saveToStorage(STORAGE_KEYS.employees, updatedList);
  }

  // User login function - admin/employee login check kare
  function login(email, password) {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      setCurrentUser(DEFAULT_ADMIN);
      saveToStorage(STORAGE_KEYS.loggedInUser, DEFAULT_ADMIN);
      return { success: true };
    }

    const savedEmployees = getFromStorage(STORAGE_KEYS.employees) || [];
    const match = savedEmployees.find(
      (emp) => emp.email === email && emp.password === password
    );

    if (!match) return { success: false, message: "Invalid email or password." };
    if (match.status === EMPLOYEE_STATUS.pending)
      return { success: false, message: "Your account is pending admin approval." };
    if (match.status === EMPLOYEE_STATUS.blocked)
      return { success: false, message: "Your account has been blocked. Contact admin." };

    setCurrentUser(match);
    saveToStorage(STORAGE_KEYS.loggedInUser, match);
    return { success: true };
  }

  // User logout function - session clear kare
  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.loggedInUser);
  }

  // Employee registration function - new employee add kare
  function registerEmployee(formData) {
    const savedEmployees = getFromStorage(STORAGE_KEYS.employees) || [];
    const emailExists = savedEmployees.some((emp) => emp.email === formData.email);

    if (emailExists || formData.email === DEFAULT_ADMIN.email)
      return { success: false, message: "This email is already registered." };

    const newEmployee = {
      id: `emp-${Date.now()}`,
      ...formData,
      role: "employee",
      status: EMPLOYEE_STATUS.pending,
      createdAt: new Date().toISOString(),
    };

    persistEmployees([...savedEmployees, newEmployee]);
    return { success: true };
  }

  // Direct employee add - admin mate
  function addEmployee(formData) {
    const newEmployee = {
      id: `emp-${Date.now()}`,
      ...formData,
      role: "employee",
      status: EMPLOYEE_STATUS.active,
      createdAt: new Date().toISOString(),
    };
    persistEmployees([...employees, newEmployee]);
  }

  // Employee update function - details edit kare
  function updateEmployee(employeeId, updatedData) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, ...updatedData } : emp
    );
    persistEmployees(updatedList);
  }

  // Employee approve function - pending to active
  function approveEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.active } : emp
    );
    persistEmployees(updatedList);
  }

  // Employee block function - login prevent kare
  function blockEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.blocked } : emp
    );
    persistEmployees(updatedList);
  }

  // Employee unblock function - blocked to active
  function unblockEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.active } : emp
    );
    persistEmployees(updatedList);
  }

  // Employee delete function - permanently remove kare
  function deleteEmployee(employeeId) {
    const updatedList = employees.filter((emp) => emp.id !== employeeId);
    persistEmployees(updatedList);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        employees,
        login,
        logout,
        registerEmployee,
        addEmployee,
        updateEmployee,
        approveEmployee,
        blockEmployee,
        unblockEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}