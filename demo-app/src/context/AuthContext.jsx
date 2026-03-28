import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS, EMPLOYEE_STATUS, DEFAULT_ADMIN } from "../constants";
import { getFromStorage, saveToStorage } from "../utils/storage";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const savedUser = getFromStorage(STORAGE_KEYS.loggedInUser);
    if (savedUser) setCurrentUser(savedUser);

    const savedEmployees = getFromStorage(STORAGE_KEYS.employees);
    if (savedEmployees) setEmployees(savedEmployees);
  }, []);

  function persistEmployees(updatedList) {
    setEmployees(updatedList);
    saveToStorage(STORAGE_KEYS.employees, updatedList);
  }

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

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEYS.loggedInUser);
  }

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

  function updateEmployee(employeeId, updatedData) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, ...updatedData } : emp
    );
    persistEmployees(updatedList);
  }

  function approveEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.active } : emp
    );
    persistEmployees(updatedList);
  }

  function blockEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.blocked } : emp
    );
    persistEmployees(updatedList);
  }

  function unblockEmployee(employeeId) {
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, status: EMPLOYEE_STATUS.active } : emp
    );
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}