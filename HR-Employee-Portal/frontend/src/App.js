import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './components/home/HomePage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HRDashboard from './components/dashboard/HRDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import EmployeeDashboard from './components/dashboard/EmployeeDashboard';
import EmployeeList from './components/employees/EmployeeList';
import EmployeeProfile from './components/employees/EmployeeProfile';
import EmployeeForm from './components/employees/EmployeeForm';
import AttendanceTracker from './components/attendance/AttendanceTracker';
import LeaveRequest from './components/leave/LeaveRequest';
import LeaveManagement from './components/leave/LeaveManagement';
import PayrollManagement from './components/payroll/PayrollManagement';
import Payslip from './components/payroll/Payslip';
import PerformanceReview from './components/performance/PerformanceReview';
import PerformanceTracking from './components/performance/PerformanceTracking';
import Settings from './components/common/Settings';
import Notifications from './components/common/Notifications';
import Help from './components/common/Help';
import './styles/global.css';
import './styles/theme.css';

// Create a client with advanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Enhanced Protected Routes with Role-Based Access */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          {user?.role === 'hr' ? <HRDashboard /> : 
           user?.role === 'manager' ? <ManagerDashboard /> : 
           <EmployeeDashboard />}
        </ProtectedRoute>
      } />
      
      <Route path="/employees" element={
        <ProtectedRoute allowedRoles={['hr', 'manager']}>
          <EmployeeList />
        </ProtectedRoute>
      } />

      <Route path="/employees/new" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <EmployeeForm />
        </ProtectedRoute>
      } />

      <Route path="/employees/edit/:id" element={
        <ProtectedRoute allowedRoles={['hr']}>
          <EmployeeForm />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <EmployeeProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/attendance" element={
        <ProtectedRoute>
          <AttendanceTracker />
        </ProtectedRoute>
      } />
      
      <Route path="/leave" element={
        <ProtectedRoute>
          {user?.role === 'employee' ? <LeaveRequest /> : <LeaveManagement />}
        </ProtectedRoute>
      } />
      
      <Route path="/payroll" element={
        <ProtectedRoute allowedRoles={['hr', 'manager']}>
          <PayrollManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/payslips" element={
        <ProtectedRoute>
          <Payslip />
        </ProtectedRoute>
      } />
      
      <Route path="/performance" element={
        <ProtectedRoute>
          <PerformanceReview />
        </ProtectedRoute>
      } />
      
      <Route path="/performance/new" element={
        <ProtectedRoute allowedRoles={['hr', 'manager']}>
          <PerformanceTracking />
        </ProtectedRoute>
      } />
      
      <Route path="/performance/review/:id" element={
        <ProtectedRoute allowedRoles={['hr', 'manager']}>
          <PerformanceTracking />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      
      <Route path="/help" element={
        <ProtectedRoute>
          <Help />
        </ProtectedRoute>
      } />
      
      {/* Remove the default redirect to dashboard - keep home page as default */}
      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      
      {/* 404 Page */}
      <Route path="*" element={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
        </div>
      } />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <div className="App">
              <AppRoutes />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;