import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import './Dashboard.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [personalStats, setPersonalStats] = useState({
    leaveBalance: 18,
    hoursWorked: 160,
    upcomingReviews: 1,
    pendingRequests: 2
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      // Simulate API call
      setRecentActivity([
        { id: 1, action: 'Leave request submitted', date: '2024-01-10', status: 'pending' },
        { id: 2, action: 'Performance review completed', date: '2024-01-05', status: 'completed' },
        { id: 3, action: 'Payslip downloaded', date: '2024-01-01', status: 'completed' },
        { id: 4, action: 'Attendance marked', date: '2024-01-15', status: 'completed' }
      ]);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Navigation handlers for quick actions
  const handleRequestLeave = () => {
    navigate('/leave');
  };

  const handleViewPayslips = () => {
    navigate('/payslips');
  };

  const handleUpdateProfile = () => {
    navigate('/profile');
  };

  const handleCheckAttendance = () => {
    navigate('/attendance');
  };

  const handlePerformanceReview = () => {
    navigate('/performance');
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="dashboard-header">
            <div className="header-content">
              <h1>Employee Dashboard</h1>
              <p>Welcome back, {user?.firstName || 'Employee'}! Manage your workspace efficiently.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card" onClick={handleRequestLeave} style={{ cursor: 'pointer' }}>
              <div className="stat-icon leave">🏖️</div>
              <div className="stat-info">
                <h3>{personalStats.leaveBalance}</h3>
                <p>Leave Balance (Days)</p>
              </div>
            </div>

            <div className="stat-card" onClick={handleCheckAttendance} style={{ cursor: 'pointer' }}>
              <div className="stat-icon hours">⏱️</div>
              <div className="stat-info">
                <h3>{personalStats.hoursWorked}</h3>
                <p>Hours This Month</p>
              </div>
            </div>

            <div className="stat-card" onClick={handlePerformanceReview} style={{ cursor: 'pointer' }}>
              <div className="stat-icon review">📊</div>
              <div className="stat-info">
                <h3>{personalStats.upcomingReviews}</h3>
                <p>Upcoming Reviews</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">📝</div>
              <div className="stat-info">
                <h3>{personalStats.pendingRequests}</h3>
                <p>Pending Requests</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h2>Recent Activity</h2>
              <div className="activities-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-content">
                        <strong>{activity.action}</strong>
                        <span className={`status ${activity.status}`}>
                          {activity.status === 'completed' ? '✓' : '⏳'} {activity.status}
                        </span>
                      </div>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No recent activity</p>
                )}
              </div>
            </div>

            <div className="dashboard-section">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <button className="action-btn" onClick={handleRequestLeave}>
                  <span className="action-icon">📅</span>
                  <span>Request Leave</span>
                </button>
                <button className="action-btn" onClick={handleViewPayslips}>
                  <span className="action-icon">💰</span>
                  <span>View Payslips</span>
                </button>
                <button className="action-btn" onClick={handleUpdateProfile}>
                  <span className="action-icon">👤</span>
                  <span>Update Profile</span>
                </button>
                <button className="action-btn" onClick={handleCheckAttendance}>
                  <span className="action-icon">⏰</span>
                  <span>Check Attendance</span>
                </button>
                <button className="action-btn" onClick={handlePerformanceReview}>
                  <span className="action-icon">📊</span>
                  <span>Performance Review</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="dashboard-section">
            <h2>Your Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Employee ID:</span>
                <span className="info-value">{user?.employeeId || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department:</span>
                <span className="info-value">{user?.department || 'Not Assigned'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Position:</span>
                <span className="info-value">{user?.position || 'Not Assigned'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email || 'N/A'}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;