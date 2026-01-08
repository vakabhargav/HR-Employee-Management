import React, { useState, useEffect } from 'react';
import Header from '../common/header';
import './AttendanceTracker.css';

const AttendanceTracker = () => {
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    setAttendanceHistory([
      {
        id: 1,
        date: '2024-01-15',
        check_in: '2024-01-15T09:00:00',
        check_out: '2024-01-15T17:00:00',
        total_hours: 8.0,
        status: 'present'
      },
      {
        id: 2,
        date: '2024-01-16',
        check_in: '2024-01-16T09:15:00',
        check_out: '2024-01-16T17:00:00',
        total_hours: 7.75,
        status: 'present'
      },
      {
        id: 3,
        date: '2024-01-17',
        check_in: '2024-01-17T09:00:00',
        check_out: '2024-01-17T17:00:00',
        total_hours: 8.0,
        status: 'present'
      }
    ]);
  }, []);

  const handleCheckIn = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const currentTime = new Date();
      const today = currentTime.toISOString().split('T')[0];
      
      setTodayAttendance({
        check_in: currentTime.toISOString(),
        date: today,
        status: 'present'
      });
      
      setLoading(false);
    }, 1000);
  };

  const handleCheckOut = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const currentTime = new Date();
      
      setTodayAttendance(prev => ({
        ...prev,
        check_out: currentTime.toISOString(),
        total_hours: 8.0
      }));
      
      setLoading(false);
    }, 1000);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canCheckIn = !todayAttendance;
  const canCheckOut = todayAttendance && !todayAttendance.check_out;

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="page-header">
            <h1>Attendance Tracker</h1>
            <div className="current-time">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <div className="attendance-controls">
            <div className="attendance-card">
              <h3>Today's Attendance</h3>
              
              <div className="attendance-status">
                <div className="status-item">
                  <span className="label">Check In:</span>
                  <span className="value">{formatTime(todayAttendance?.check_in)}</span>
                </div>
                
                <div className="status-item">
                  <span className="label">Check Out:</span>
                  <span className="value">{formatTime(todayAttendance?.check_out)}</span>
                </div>
                
                <div className="status-item">
                  <span className="label">Total Hours:</span>
                  <span className="value">{todayAttendance?.total_hours || '0'}</span>
                </div>
              </div>

              <div className="attendance-actions">
                <button
                  onClick={handleCheckIn}
                  disabled={!canCheckIn || loading}
                  className="btn-checkin"
                >
                  {loading ? 'Checking In...' : 'Check In'}
                </button>
                
                <button
                  onClick={handleCheckOut}
                  disabled={!canCheckOut || loading}
                  className="btn-checkout"
                >
                  {loading ? 'Checking Out...' : 'Check Out'}
                </button>
              </div>
            </div>
          </div>

          <div className="attendance-history">
            <h2>Attendance History</h2>
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceHistory.map(record => (
                    <tr key={record.id}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{formatTime(record.check_in)}</td>
                      <td>{formatTime(record.check_out)}</td>
                      <td>{record.total_hours || '-'}</td>
                      <td>
                        <span className={`status-badge ${record.status}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AttendanceTracker;