import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import StatCard from '../common/StatCard';
import QuickActions from '../common/QuickActions';
import RecentActivities from '../common/RecentActivities';
import DepartmentPerformance from '../common/DepartmentPerformance';
import UpcomingEvents from '../common/UpcomingEvents';
import './Dashboard.css';

const HRDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Handle alert actions
  const handleAlertAction = (alertType) => {
    if (alertType === 'probation') {
      navigate('/employees?filter=probation');
    } else if (alertType === 'compliance') {
      navigate('/compliance');
    }
  };

  // Handle report download
  const handleReportDownload = (reportType, format) => {
    const reportData = {
      type: reportType,
      generatedDate: new Date().toLocaleDateString(),
      data: stats,
      format
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportType}-${new Date().toISOString().split('T')[0]}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert(`Downloading ${reportType} as ${format.toUpperCase()}`);
  };

  // Export report function
  const handleExportReport = () => {
    const reportData = {
      generatedDate: new Date().toLocaleDateString(),
      timeRange,
      department: departmentFilter,
      stats,
      departmentMetrics
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `HR-Report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Mock data with enhanced metrics
  const stats = {
    totalEmployees: 156,
    presentToday: 142,
    pendingLeave: 8,
    payrollPending: 12,
    newHires: 5,
    turnoverRate: 2.3,
    avgPerformance: 4.2,
    trainingPending: 7,
    budgetUtilization: 78,
    employeeSatisfaction: 4.5,
    recruitmentPipeline: 23,
    complianceAlerts: 2
  };

  const quickActions = [
    { 
      label: 'Add Employee', 
      icon: '👤', 
      path: '/employees/new',
      color: '#667eea',
      description: 'Add new employee to system'
    },
    { 
      label: 'Process Payroll', 
      icon: '💰', 
      path: '/payroll',
      color: '#28a745',
      description: 'Run payroll for current period'
    },
    { 
      label: 'View Analytics', 
      icon: '📊', 
      path: '/analytics',
      color: '#17a2b8',
      description: 'Detailed analytics & reports'
    },
    { 
      label: 'Manage Leave', 
      icon: '📅', 
      path: '/leave',
      color: '#ffc107',
      description: 'Approve/reject leave requests'
    },
    { 
      label: 'Performance Reviews', 
      icon: '⭐', 
      path: '/performance',
      color: '#e83e8c',
      description: 'Manage performance cycles'
    },
    { 
      label: 'Training Programs', 
      icon: '🎓', 
      path: '/training',
      color: '#6f42c1',
      description: 'Schedule training sessions'
    },
    { 
      label: 'Compliance Check', 
      icon: '🛡️', 
      path: '/compliance',
      color: '#dc3545',
      description: 'Review compliance issues'
    },
    { 
      label: 'Recruitment', 
      icon: '💼', 
      path: '/recruitment',
      color: '#20c997',
      description: 'Manage job postings'
    }
  ];

  const departmentMetrics = [
    { name: 'Engineering', employees: 70, avgSalary: 85000, satisfaction: 4.6, turnover: 1.8 },
    { name: 'HR', employees: 12, avgSalary: 65000, satisfaction: 4.8, turnover: 0.5 },
    { name: 'Design', employees: 25, avgSalary: 75000, satisfaction: 4.4, turnover: 2.1 },
    { name: 'Marketing', employees: 18, avgSalary: 70000, satisfaction: 4.3, turnover: 3.2 },
    { name: 'Sales', employees: 31, avgSalary: 80000, satisfaction: 4.2, turnover: 4.5 }
  ];

  // Enhanced analytics data
  const analyticsData = {
    employeeGrowth: [
      { month: 'Jan', count: 142 },
      { month: 'Feb', count: 145 },
      { month: 'Mar', count: 148 },
      { month: 'Apr', count: 152 },
      { month: 'May', count: 156 }
    ],
    turnoverTrend: [
      { month: 'Jan', rate: 2.1 },
      { month: 'Feb', rate: 1.8 },
      { month: 'Mar', rate: 2.3 },
      { month: 'Apr', rate: 2.0 },
      { month: 'May', rate: 2.3 }
    ],
    satisfactionTrend: [
      { month: 'Jan', score: 4.1 },
      { month: 'Feb', score: 4.3 },
      { month: 'Mar', score: 4.2 },
      { month: 'Apr', score: 4.4 },
      { month: 'May', score: 4.5 }
    ]
  };

  // Enhanced department metrics with more data
  const enhancedDepartmentMetrics = departmentMetrics.map(dept => ({
    ...dept,
    budget: dept.employees * dept.avgSalary * 0.3,
    productivity: Math.floor(Math.random() * 20) + 80, // 80-100%
    trainingHours: Math.floor(Math.random() * 40) + 20 // 20-60 hours
  }));

  // Critical alerts and notifications
  const criticalAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Compliance Alert',
      message: 'Annual compliance training is due in 3 days',
      priority: 'high',
      action: 'View Compliance'
    },
    {
      id: 2,
      type: 'info',
      title: 'Probation Review',
      message: '3 employees completing probation period this week',
      priority: 'medium',
      action: 'Review Now'
    },
    {
      id: 3,
      type: 'success',
      title: 'Performance Cycle',
      message: 'Q2 performance reviews are 85% complete',
      priority: 'low',
      action: 'View Progress'
    }
  ];

  // Upcoming important dates
  const importantDates = [
    {
      id: 1,
      title: 'Payroll Processing',
      date: '2024-06-05',
      type: 'payroll',
      daysLeft: 1
    },
    {
      id: 2,
      title: 'Annual Performance Reviews',
      date: '2024-06-15',
      type: 'performance',
      daysLeft: 11
    },
    {
      id: 3,
      title: 'Compliance Training Deadline',
      date: '2024-06-10',
      type: 'training',
      daysLeft: 6
    }
  ];

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          {/* Enhanced Header with Tabs */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1>HR Dashboard</h1>
              <p>Welcome, {user?.firstName || 'HR Manager'}! Comprehensive overview of HR operations and workforce analytics</p>
            </div>
            <div className="header-controls">
              <div className="tab-navigation">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reports')}
                >
                  Reports
                </button>
              </div>
              <div className="filter-controls">
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="filter-select"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
                <select 
                  value={departmentFilter} 
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="hr">HR</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
            </div>
          </div>

          {/* Critical Alerts */}
          {criticalAlerts.length > 0 && (
            <div className="dashboard-section">
              <h2>🚨 Critical Alerts</h2>
              <div className="alerts-grid">
                {criticalAlerts.map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.type}`}>
                    <div className="alert-content">
                      <h4>{alert.title}</h4>
                      <p>{alert.message}</p>
                    </div>
                    <button 
                      className="alert-action-btn"
                      onClick={() => handleAlertAction(alert.title.toLowerCase().includes('compliance') ? 'compliance' : 'probation')}
                    >
                      {alert.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Statistics Grid */}
          <div className="stats-grid">
            <StatCard 
              title="Total Employees" 
              value={stats.totalEmployees} 
              change="+2.3%" 
              icon="👥" 
              color="#667eea"
            />
            <StatCard 
              title="Present Today" 
              value={stats.presentToday} 
              change="+1.2%" 
              icon="✅" 
              color="#28a745"
            />
            <StatCard 
              title="Pending Leave" 
              value={stats.pendingLeave} 
              change="+0.5%" 
              icon="📅" 
              color="#ffc107"
            />
            <StatCard 
              title="Payroll Pending" 
              value={stats.payrollPending} 
              change="-1.8%" 
              icon="💰" 
              color="#dc3545"
            />
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2>⚡ Quick Actions</h2>
            <QuickActions actions={quickActions} />
          </div>

          {/* Department Performance */}
          <div className="dashboard-section">
            <h2>🏢 Department Performance</h2>
            <DepartmentPerformance metrics={enhancedDepartmentMetrics} />
          </div>

          {/* Recent Activities */}
          <div className="dashboard-section">
            <h2>🕒 Recent Activities</h2>
            <RecentActivities />
          </div>

          {/* Upcoming Important Dates */}
          <div className="dashboard-section">
            <h2>📅 Upcoming Important Dates</h2>
            <div className="dates-grid">
              {importantDates.map(date => (
                <div key={date.id} className="date-card">
                  <div className="date-header">
                    <span className={`date-badge ${date.type}`}>
                      {date.daysLeft} days
                    </span>
                    <h4>{date.title}</h4>
                  </div>
                  <p className="date-value">{new Date(date.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Charts Section */}
          {activeTab === 'analytics' && (
            <div className="dashboard-section">
              <h2>📈 Analytics & Trends</h2>
              <div className="analytics-grid">
                <div className="chart-container">
                  <h3>Employee Growth Trend</h3>
                  <div className="chart-placeholder">
                    <p>Employee Growth Chart Visualization</p>
                  </div>
                </div>
                <div className="chart-container">
                  <h3>Turnover Rate Trend</h3>
                  <div className="chart-placeholder">
                    <p>Turnover Rate Chart Visualization</p>
                  </div>
                </div>
                <div className="chart-container">
                  <h3>Employee Satisfaction Trend</h3>
                  <div className="chart-placeholder">
                    <p>Satisfaction Score Chart Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Section */}
          {activeTab === 'reports' && (
            <div className="dashboard-section">
              <h2>📋 Reports & Exports</h2>
              <div className="reports-grid">
                <div className="report-card">
                  <h3>Employee Summary Report</h3>
                  <p>Comprehensive employee data and statistics</p>
                  <div className="report-actions">
                    <button className="btn-secondary" onClick={() => handleReportDownload('employee-summary', 'pdf')}>
                      📄 PDF
                    </button>
                    <button className="btn-secondary" onClick={() => handleReportDownload('employee-summary', 'excel')}>
                      📊 Excel
                    </button>
                  </div>
                </div>
                <div className="report-card">
                  <h3>Payroll Report</h3>
                  <p>Detailed payroll and compensation data</p>
                  <div className="report-actions">
                    <button className="btn-secondary" onClick={() => handleReportDownload('payroll', 'pdf')}>
                      📄 PDF
                    </button>
                    <button className="btn-secondary" onClick={() => handleReportDownload('payroll', 'excel')}>
                      📊 Excel
                    </button>
                  </div>
                </div>
                <div className="report-card">
                  <h3>Performance Report</h3>
                  <p>Employee performance and review data</p>
                  <div className="report-actions">
                    <button className="btn-secondary" onClick={() => handleReportDownload('performance', 'pdf')}>
                      📄 PDF
                    </button>
                    <button className="btn-secondary" onClick={() => handleReportDownload('performance', 'excel')}>
                      📊 Excel
                    </button>
                  </div>
                </div>
                <div className="report-card">
                  <h3>Compliance Report</h3>
                  <p>Regulatory compliance and training records</p>
                  <div className="report-actions">
                    <button className="btn-secondary" onClick={() => handleReportDownload('compliance', 'pdf')}>
                      📄 PDF
                    </button>
                    <button className="btn-secondary" onClick={() => handleReportDownload('compliance', 'excel')}>
                      📊 Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HRDashboard;
