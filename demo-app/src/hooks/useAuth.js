import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setEmployees, addEmployee, updateEmployee, logout } from '../store/slices/authSlice';
import { STORAGE_KEYS, EMPLOYEE_STATUS, DEFAULT_ADMIN } from '../constants';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Custom auth hook using Redux
export function useAuth() {
  const dispatch = useDispatch();
  const { currentUser, employees, isAuthenticated } = useSelector((state) => state.auth);

  // Employee data ne localStorage ma save kare
  const persistEmployees = (updatedList) => {
    dispatch(setEmployees(updatedList));
    saveToStorage(STORAGE_KEYS.employees, updatedList);
  };

  // User login function
  const login = (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      dispatch(setCurrentUser(DEFAULT_ADMIN));
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

    dispatch(setCurrentUser(match));
    saveToStorage(STORAGE_KEYS.loggedInUser, match);
    return { success: true };
  };

  // User logout function
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem(STORAGE_KEYS.loggedInUser);
  };

  // Employee registration function
  const registerEmployee = (formData) => {
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
  };

  // Direct employee add - admin mate
  const addNewEmployee = (formData) => {
    const newEmployee = {
      id: `emp-${Date.now()}`,
      ...formData,
      role: "employee",
      status: EMPLOYEE_STATUS.active,
      createdAt: new Date().toISOString(),
    };
    dispatch(addEmployee(newEmployee));
    saveToStorage(STORAGE_KEYS.employees, [...employees, newEmployee]);
  };

  // Employee update function
  const updateEmployeeData = (employeeId, updatedData) => {
    dispatch(updateEmployee({ id: employeeId, data: updatedData }));
    const updatedList = employees.map((emp) =>
      emp.id === employeeId ? { ...emp, ...updatedData } : emp
    );
    saveToStorage(STORAGE_KEYS.employees, updatedList);
  };

  // Employee approve function
  const approveEmployee = (employeeId) => {
    updateEmployeeData(employeeId, { status: EMPLOYEE_STATUS.active });
  };

  // Employee block function
  const blockEmployee = (employeeId) => {
    updateEmployeeData(employeeId, { status: EMPLOYEE_STATUS.blocked });
  };

  // Employee unblock function
  const unblockEmployee = (employeeId) => {
    updateEmployeeData(employeeId, { status: EMPLOYEE_STATUS.active });
  };

  return {
    currentUser,
    employees,
    isAuthenticated: !!currentUser,
    login,
    logout: handleLogout,
    registerEmployee,
    addEmployee: addNewEmployee,
    updateEmployee: updateEmployeeData,
    approveEmployee,
    blockEmployee,
    unblockEmployee,
  };
}
