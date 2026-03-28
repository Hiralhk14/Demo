import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setEmployees } from '../store/slices/authSlice';
import { STORAGE_KEYS } from '../constants';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Component to initialize auth data from localStorage
export default function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize user data from localStorage
    const savedUser = getFromStorage(STORAGE_KEYS.loggedInUser);
    if (savedUser) {
      dispatch(setCurrentUser(savedUser));
    }

    // Initialize employees data from localStorage
    const savedEmployees = getFromStorage(STORAGE_KEYS.employees);
    if (savedEmployees) {
      // Fix old status values (migrate 'Pending' to 'pending')
      const fixedEmployees = savedEmployees.map(emp => ({
        ...emp,
        status: emp.status === 'Pending' ? 'pending' : emp.status
      }));
      dispatch(setEmployees(fixedEmployees));
      // Save the corrected data back to storage
      saveToStorage(STORAGE_KEYS.employees, fixedEmployees);
    }
  }, [dispatch]);

  return children;
}
