import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const path = window.location?.pathname || '';
      const onAuthPage = path.startsWith('/login') || path.startsWith('/signup');
      const hasToken = Boolean(localStorage.getItem('token'));
      // Only redirect if a session existed and we're not on auth pages
      if (hasToken && !onAuthPage) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (data) => api.post('/auth/signup', data),
};

// Employees API
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  update: (id, data) => api.put(`/employees/${id}`, data),
};

// Attendance API
export const attendanceAPI = {
  getAttendance: () => api.get('/attendance'),
  recordAttendance: (type) => api.post('/attendance/record', { type }),
  getSummary: (employeeId) => {
    if (employeeId) {
      return api.get(`/attendance/summary/${employeeId}`);
    }
    return api.get('/attendance/summary');
  },
};

// Leave API
export const leaveAPI = {
  getAll: () => api.get('/leave'),
  create: (data) => api.post('/leave', data),
  updateStatus: (id, data) => api.put(`/leave/${id}/status`, data),
};

// Payroll API
export const payrollAPI = {
  getAll: () => api.get('/payroll'),
  getPayslip: (id) => api.get(`/payroll/${id}/payslip`),
  generate: (data) => api.post('/payroll/generate', data),
    getPayroll: (params) => api.get('/payroll', { params }),
};

// Performance API
export const performanceAPI = {
  getAll: () => api.get('/performance'),
  create: (data) => api.post('/performance', data),
  update: (id, data) => api.put(`/performance/${id}`, data),
  getPerformanceReviews: (params) => api.get('/performance', { params }),
};

// Dashboard API
export const dashboardAPI = {
  getHRStats: (filters) => api.get('/dashboard/hr-stats', { params: filters }),
  getManagerStats: (filters) => api.get('/dashboard/manager-stats', { params: filters }),
  getEmployeeStats: () => api.get('/dashboard/employee-stats'),
  getActivities: () => api.get('/dashboard/activities'),
};

export default api;