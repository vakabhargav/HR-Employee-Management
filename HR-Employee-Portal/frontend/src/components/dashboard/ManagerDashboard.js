import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import './Dashboard.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [teamStats, setTeamStats] = useState({
    teamSize: 12,
    presentToday: 10,
    pendingLeave: 3,
    avgPerformance: 4.2
  });
  const [pendingRequests, setPendingRequests] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchManagerData();
  }, []);

  const fetchManagerData = () => {
    setPendingRequests([
      { id: 1, type: 'Leave', employee: 'John Doe', date: '2024-01-15', status: 'pending', reason: 'Family vacation' },
      { id: 2, type: 'Leave', employee: 'Sarah Wilson', date: '2024-01-16', status: 'pending', reason: 'Medical appointment' },
      { id: 3, type: 'Leave', employee: 'Mike Johnson', date: '2024-01-18', status: 'pending', reason: 'Personal work' }
    ]);

    setTeamMembers([
      { id: 1, name: 'John Doe', position: 'Developer', status: 'present', performance: 4.5 },
      { id: 2, name: 'Sarah Wilson', position: 'Designer', status: 'present', performance: 4.3 },
      { id: 3, name: 'Mike Johnson', position: 'Tester', status: 'leave', performance: 4.0 },
      { id: 4, name: 'Emily Brown', position: 'Developer', status: 'present', performance: 4.7 }
    ]);
  };

  // Handle approve/reject leave
  const handleApprove = (requestId) => {
    if (window.confirm('Approve this leave request?')) {
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
      alert('✓ Leave request approved successfully!');
    }
  };

  const handleReject = (requestId) => {
    if (window.confirm('Reject this leave request?')) {
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
      alert('✘ Leave request rejected.');
    }
  };

  // Navigation handlers
  const handleReviewPerformance = () => {
    navigate('/performance');
  };

  const handleManageLeave = () => {
    navigate('/leave');
  };

  const handleViewTeam = () => {
    navigate('/employees');
  };

  const handleScheduleMeeting = () => {
    alert('📅 Meeting scheduler feature will be available soon!');
  };

  const handleTeamReport = () => {
    const reportData = {
      teamStats,
      pendingRequests,
      teamMembers,
      generatedDate: new Date().toLocaleDateString(),
      generatedBy: user?.firstName + ' ' + user?.lastName
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Team-Report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('📄 Team report downloaded successfully!');
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="dashboard-header">
            <div className="header-content">
              <h1>Manager Dashboard</h1>
              <p>Welcome back, {user?.firstName || 'Manager'}! Manage your team and approvals.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card" onClick={handleViewTeam} style={{ cursor: 'pointer' }}>
              <div className="stat-icon team">👥</div>
              <div className="stat-info">
                <h3>{teamStats.teamSize}</h3>
                <p>Team Members</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon present">✅</div>
              <div className="stat-info">
                <h3>{teamStats.presentToday}</h3>
                <p>Present Today</p>
              </div>
            </div>

            <div className="stat-card" onClick={handleManageLeave} style={{ cursor: 'pointer' }}>
              <div className="stat-icon pending">📋</div>
              <div className="stat-info">
                <h3>{teamStats.pendingLeave}</h3>
                <p>Pending Leave Requests</p>
              </div>
            </div>

            <div className="stat-card" onClick={handleReviewPerformance} style={{ cursor: 'pointer' }}>
              <div className="stat-icon performance">⭐</div>
              <div className="stat-info">
                <h3>{teamStats.avgPerformance.toFixed(1)}</h3>
                <p>Avg Team Performance</p>
              </div>
            </div>
          </div>

          <div className="dashboard-sections">
            <div className="dashboard-section">
              <h2>Pending Approvals ({pendingRequests.length})</h2>
              <div className="requests-list">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map(request => (
                    <div key={request.id} className="request-item">
                      <div className="request-info">
                        <strong>{request.type} Request</strong>
                        <span>👤 {request.employee}</span>
                        <small>📅 {request.date}</small>
                        {request.reason && <small style={{ color: '#666' }}>📝 {request.reason}</small>}
                      </div>
                      <div className="request-actions">
                        <button 
                          className="btn-approve"
                          onClick={() => handleApprove(request.id)}
                        >
                          ✓ Approve
                        </button>
                        <button 
                          className="btn-reject"
                          onClick={() => handleReject(request.id)}
                        >
                          ✘ Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>No pending approvals</p>
                )}
              </div>
            </div>

            <div className="dashboard-section">
              <h2>Team Overview</h2>
              <div className="team-list">
                {teamMembers.map(member => (
                  <div key={member.id} className="team-member-item">
                    <div className="member-info">
                      <strong>{member.name}</strong>
                      <span>{member.position}</span>
                    </div>
                    <div className="member-stats">
                      <span className={`member-status ${member.status}`}>
                        {member.status === 'present' ? '✓ Present' : '🏖️ On Leave'}
                      </span>
                      <span className="member-performance">
                        ⭐ {member.performance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button 
                className="action-btn"
                onClick={handleReviewPerformance}
              >
                <span className="action-icon">⭐</span>
                <span>Review Performance</span>
              </button>
              <button 
                className="action-btn"
                onClick={handleScheduleMeeting}
              >
                <span className="action-icon">📅</span>
                <span>Schedule Meeting</span>
              </button>
              <button 
                className="action-btn"
                onClick={handleTeamReport}
              >
                <span className="action-icon">📄</span>
                <span>Download Team Report</span>
              </button>
              <button 
                className="action-btn"
                onClick={handleViewTeam}
              >
                <span className="action-icon">👥</span>
                <span>View All Employees</span>
              </button>
              <button 
                className="action-btn"
                onClick={handleManageLeave}
              >
                <span className="action-icon">📋</span>
                <span>Manage Leave</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManagerDashboard;