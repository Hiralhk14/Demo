import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppInitializer from '../components/AppInitializer';
import Login from '../Authentication/Login';
import Registration from '../Authentication/Registration';
import AdminDashboard from '../components/admin/AdminDashbaord';
import EmployeeDashboard from '../components/employee/EmployeeDashbaord';
import Navbar from '../shared/ui/Navbar';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  
  if (isAuthenticated) {
    return <Navigate to={currentUser?.role === 'admin' ? '/dashboard' : '/employee-dashboard'} replace />;
  }
  
  return children;
};

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <AppInitializer>
      <BrowserRouter>
        {currentUser && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-dashboard" 
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Default Route */}
          <Route 
            path="/" 
            element={
              currentUser ? (
                <Navigate to={currentUser?.role === 'admin' ? '/dashboard' : '/employee-dashboard'} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '24px',
                color: '#666'
              }}>
                Page Not Found
              </div>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AppInitializer>
  );
};

export default AppRouter;
