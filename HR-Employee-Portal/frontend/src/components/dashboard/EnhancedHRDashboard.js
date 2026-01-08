import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import './EnhancedDashboard.css';

const EnhancedHRDashboard = () => {
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
    totalEmployees: 185,
    presentToday: 168,
    pendingLeave: 12,
    payrollPending: 8,
    newHires: 7,
    turnoverRate: 1.8,
    avgPerformance: 4.3,
    trainingPending: 5,
    budgetUtilization: 72,
    employeeSatisfaction: 4.6,
    recruitmentPipeline: 32,
    complianceAlerts: 1,
    diversityIndex: 82,
    engagementScore: 88,
    retentionRate: 92
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
    },
    { 
      label: 'Employee Engagement', 
      icon: '❤️', 
      path: '/engagement',
      color: '#fd7e14',
      description: 'Track engagement metrics'
    },
    { 
      label: 'Diversity Report', 
      icon: '🌍', 
      path: '/diversity',
      color: '#6610f2',
      description: 'View diversity analytics'
    },
    { 
      label: 'Budget Planning', 
      icon: '📈', 
      path: '/budget',
      color: '#20c997',
      description: 'Plan department budgets'
    },
    { 
      label: 'Exit Interviews', 
      icon: '👋', 
      path: '/exit-interviews',
      color: '#6c757d',
      description: 'Manage exit processes'
    }
  ];

  const departmentMetrics = [
    { name: 'Engineering', employees: 82, avgSalary: 95000, satisfaction: 4.7, turnover: 1.2, diversity: 78, budget: 8500000 },
    { name: 'HR', employees: 15, avgSalary: 75000, satisfaction: 4.9, turnover: 0.3, diversity: 85, budget: 1200000 },
    { name: 'Design', employees: 28, avgSalary: 85000, satisfaction: 4.5, turnover: 1.8, diversity: 72, budget: 2500000 },
    { name: 'Marketing', employees: 22, avgSalary: 78000, satisfaction: 4.4, turnover: 2.5, diversity: 75, budget: 1800000 },
    { name: 'Sales', employees: 38, avgSalary: 88000, satisfaction: 4.3, turnover: 3.2, diversity: 68, budget: 3500000 }
  ];

  // Enhanced analytics data
  const analyticsData = {
    employeeGrowth: [
      { month: 'Jan', count: 152 },
      { month: 'Feb', count: 158 },
      { month: 'Mar', count: 162 },
      { month: 'Apr', count: 170 },
      { month: 'May', count: 178 },
      { month: 'Jun', count: 185 }
    ],
    turnoverTrend: [
      { month: 'Jan', rate: 2.1 },
      { month: 'Feb', rate: 1.8 },
      { month: 'Mar', rate: 2.0 },
      { month: 'Apr', rate: 1.9 },
      { month: 'May', rate: 1.8 },
      { month: 'Jun', rate: 1.8 }
    ],
    satisfactionTrend: [
      { month: 'Jan', score: 4.1 },
      { month: 'Feb', score: 4.2 },
      { month: 'Mar', score: 4.3 },
      { month: 'Apr', score: 4.4 },
      { month: 'May', score: 4.5 },
      { month: 'Jun', score: 4.6 }
    ],
    engagementTrend: [
      { month: 'Jan', score: 82 },
      { month: 'Feb', score: 84 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 86 },
      { month: 'May', score: 87 },
      { month: 'Jun', score: 88 }
    ]
  };

  // Enhanced department metrics with more data
  const enhancedDepartmentMetrics = departmentMetrics.map(dept => ({
    ...dept,
    productivity: Math.floor(Math.random() * 20) + 80, // 80-100%
    trainingHours: Math.floor(Math.random() * 40) + 20 // 20-60 hours
  }));

  // Critical alerts and notifications
  const criticalAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Compliance Alert',
      message: 'Annual compliance training is due in 3 days for 15 employees',
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
      message: 'Q2 performance reviews are 92% complete',
      priority: 'low',
      action: 'View Progress'
    },
    {
      id: 4,
      type: 'info',
      title: 'Budget Approval',
      message: 'Q3 budget requests require approval from 3 departments',
      priority: 'medium',
      action: 'Review Budgets'
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
    },
    {
      id: 4,
      title: 'Diversity & Inclusion Workshop',
      date: '2024-06-20',
      type: 'diversity',
      daysLeft: 16
    }
  ];

  // Recruitment pipeline data
  const recruitmentPipeline = [
    { stage: 'Applications', count: 124, change: 12 },
    { stage: 'Screening', count: 42, change: 5 },
    { stage: 'Interviews', count: 18, change: 3 },
    { stage: 'Offers', count: 7, change: 2 },
    { stage: 'Hired', count: 5, change: 1 }
  ];

  // Employee demographics
  const demographics = {
    gender: [
      { label: 'Male', value: 62, color: '#3b82f6' },
      { label: 'Female', value: 35, color: '#ec4899' },
      { label: 'Non-binary', value: 3, color: '#10b981' }
    ],
    age: [
      { label: '18-25', value: 18, color: '#8b5cf6' },
      { label: '26-35', value: 42, color: '#06b6d4' },
      { label: '36-45', value: 28, color: '#f59e0b' },
      { label: '46-55', value: 18, color: '#ef4444' },
      { label: '55+', value: 4, color: '#84cc16' }
    ]
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          {/* Enhanced Header with Tabs */}
          <div className="dashboard-header">
            <div className="header-content">
              <h1>🏢 HR Executive Dashboard</h1>
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
                <button 
                  className={`tab-btn ${activeTab === 'recruitment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recruitment')}
                >
                  Recruitment
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
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>{stats.totalEmployees}</h3>
                <p>Total Employees</p>
                <div className="stat-trend up">
                  <span>↑ 2.3%</span> from last month
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{stats.presentToday}</h3>
                <p>Present Today</p>
                <div className="stat-trend up">
                  <span>↑ 1.2%</span> from yesterday
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>{stats.pendingLeave}</h3>
                <p>Pending Leave</p>
                <div className="stat-trend down">
                  <span>↓ 0.5%</span> from last week
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>{stats.payrollPending}</h3>
                <p>Payroll Pending</p>
                <div className="stat-trend down">
                  <span>↓ 1.8%</span> from last month
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <h3>{stats.avgPerformance}/5</h3>
                <p>Avg Performance</p>
                <div className="stat-trend up">
                  <span>↑ 0.1</span> from last quarter
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❤️</div>
              <div className="stat-info">
                <h3>{stats.employeeSatisfaction}/5</h3>
                <p>Satisfaction Score</p>
                <div className="stat-trend up">
                  <span>↑ 0.1</span> from last quarter
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2>⚡ Quick Actions</h2>
            <div className="quick-actions-grid">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  className="quick-action-card"
                  onClick={() => navigate(action.path)}
                >
                  <div className="action-icon" style={{background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}dd 100%)`}}>
                    {action.icon}
                  </div>
                  <div className="action-content">
                    <h3>{action.label}</h3>
                    <p>{action.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Department Performance */}
              <div className="dashboard-section">
                <h2>🏢 Department Performance</h2>
                <div className="department-performance-grid">
                  {enhancedDepartmentMetrics.map((dept, index) => (
                    <div key={index} className="department-card">
                      <div className="department-header">
                        <h3>{dept.name}</h3>
                        <span className="department-employees">{dept.employees} employees</span>
                      </div>
                      <div className="department-stats">
                        <div className="stat-item">
                          <span className="stat-label">Satisfaction</span>
                          <span className="stat-value">{dept.satisfaction}/5</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Turnover</span>
                          <span className="stat-value">{dept.turnover}%</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Diversity</span>
                          <span className="stat-value">{dept.diversity}%</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Budget</span>
                          <span className="stat-value">₹{dept.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="department-progress">
                        <div className="progress-label">
                          <span>Productivity</span>
                          <span>{dept.productivity}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{width: `${dept.productivity}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
            </>
          )}

          {/* Analytics Tab Content */}
          {activeTab === 'analytics' && (
            <>
              {/* Key Metrics */}
              <div className="dashboard-section">
                <h2>📊 Key HR Metrics</h2>
                <div className="key-metrics-grid">
                  <div className="metric-card">
                    <h3>Turnover Rate</h3>
                    <div className="metric-value">{stats.turnoverRate}%</div>
                    <div className="metric-trend down">
                      <span>↓ 0.5%</span> from last quarter
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Retention Rate</h3>
                    <div className="metric-value">{stats.retentionRate}%</div>
                    <div className="metric-trend up">
                      <span>↑ 2.1%</span> from last quarter
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Engagement Score</h3>
                    <div className="metric-value">{stats.engagementScore}/100</div>
                    <div className="metric-trend up">
                      <span>↑ 3.2</span> points
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Diversity Index</h3>
                    <div className="metric-value">{stats.diversityIndex}/100</div>
                    <div className="metric-trend up">
                      <span>↑ 4.1</span> points
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Charts Section */}
              <div className="dashboard-section">
                <h2>📈 Analytics & Trends</h2>
                <div className="analytics-grid">
                  <div className="chart-container">
                    <h3>Employee Growth Trend</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">📈</div>
                      <p>Employee Growth Visualization</p>
                      <small>Showing growth over the last 6 months</small>
                    </div>
                  </div>
                  <div className="chart-container">
                    <h3>Turnover Rate Trend</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">📉</div>
                      <p>Turnover Rate Visualization</p>
                      <small>Monthly turnover rate trends</small>
                    </div>
                  </div>
                  <div className="chart-container">
                    <h3>Employee Satisfaction Trend</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">😊</div>
                      <p>Satisfaction Score Visualization</p>
                      <small>Quarterly satisfaction trends</small>
                    </div>
                  </div>
                  <div className="chart-container">
                    <h3>Employee Engagement Trend</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">❤️</div>
                      <p>Engagement Score Visualization</p>
                      <small>Monthly engagement trends</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employee Demographics */}
              <div className="dashboard-section">
                <h2>👥 Employee Demographics</h2>
                <div className="demographics-grid">
                  <div className="demographic-card">
                    <h3>Gender Distribution</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">🚻</div>
                      <p>Gender Distribution Chart</p>
                      <small>Male: 62% | Female: 35% | Non-binary: 3%</small>
                    </div>
                  </div>
                  <div className="demographic-card">
                    <h3>Age Distribution</h3>
                    <div className="chart-placeholder">
                      <div className="chart-placeholder-icon">🎂</div>
                      <p>Age Group Distribution</p>
                      <small>26-35: 42% | 36-45: 28% | 18-25: 18%</small>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Reports Tab Content */}
          {activeTab === 'reports' && (
            <>
              {/* Reports Section */}
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
                  <div className="report-card">
                    <h3>Engagement Report</h3>
                    <p>Employee engagement and satisfaction metrics</p>
                    <div className="report-actions">
                      <button className="btn-secondary" onClick={() => handleReportDownload('engagement', 'pdf')}>
                        📄 PDF
                      </button>
                      <button className="btn-secondary" onClick={() => handleReportDownload('engagement', 'excel')}>
                        📊 Excel
                      </button>
                    </div>
                  </div>
                  <div className="report-card">
                    <h3>Diversity Report</h3>
                    <p>Workforce diversity and inclusion metrics</p>
                    <div className="report-actions">
                      <button className="btn-secondary" onClick={() => handleReportDownload('diversity', 'pdf')}>
                        📄 PDF
                      </button>
                      <button className="btn-secondary" onClick={() => handleReportDownload('diversity', 'excel')}>
                        📊 Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Report Builder */}
              <div className="dashboard-section">
                <h2>🛠️ Custom Report Builder</h2>
                <div className="custom-report-builder">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Report Type</label>
                      <select className="form-select">
                        <option>Employee Directory</option>
                        <option>Payroll Summary</option>
                        <option>Performance Metrics</option>
                        <option>Leave Balance</option>
                        <option>Training Records</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Date Range</label>
                      <select className="form-select">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Last Year</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Department</label>
                      <select className="form-select">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>HR</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-actions">
                    <button className="btn-primary">Generate Report</button>
                    <button className="btn-secondary">Save Template</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Recruitment Tab Content */}
          {activeTab === 'recruitment' && (
            <>
              {/* Recruitment Pipeline */}
              <div className="dashboard-section">
                <h2>💼 Recruitment Pipeline</h2>
                <div className="recruitment-pipeline">
                  <div className="pipeline-stages">
                    {recruitmentPipeline.map((stage, index) => (
                      <div key={index} className="pipeline-stage">
                        <div className="stage-header">
                          <h3>{stage.stage}</h3>
                          <span className="stage-count">{stage.count}</span>
                        </div>
                        <div className="stage-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{width: `${(stage.count / recruitmentPipeline[0].count) * 100}%`}}
                            ></div>
                          </div>
                        </div>
                        <div className="stage-change">
                          <span className={stage.change >= 0 ? 'up' : 'down'}>
                            {stage.change >= 0 ? '↑' : '↓'} {Math.abs(stage.change)}
                          </span>
                          <span>from last week</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              <div className="dashboard-section">
                <h2>📝 Open Positions</h2>
                <div className="open-positions-grid">
                  <div className="position-card">
                    <h3>Senior Software Engineer</h3>
                    <p>Engineering Department</p>
                    <div className="position-details">
                      <span>Posted: 5 days ago</span>
                      <span>Applications: 24</span>
                      <span>Status: Active</span>
                    </div>
                    <button className="btn-primary">View Details</button>
                  </div>
                  <div className="position-card">
                    <h3>UX Designer</h3>
                    <p>Design Department</p>
                    <div className="position-details">
                      <span>Posted: 3 days ago</span>
                      <span>Applications: 18</span>
                      <span>Status: Active</span>
                    </div>
                    <button className="btn-primary">View Details</button>
                  </div>
                  <div className="position-card">
                    <h3>HR Manager</h3>
                    <p>Human Resources</p>
                    <div className="position-details">
                      <span>Posted: 12 days ago</span>
                      <span>Applications: 32</span>
                      <span>Status: Active</span>
                    </div>
                    <button className="btn-primary">View Details</button>
                  </div>
                </div>
              </div>

              {/* Recruitment Metrics */}
              <div className="dashboard-section">
                <h2>🎯 Recruitment Metrics</h2>
                <div className="recruitment-metrics-grid">
                  <div className="metric-card">
                    <h3>Time to Hire</h3>
                    <div className="metric-value">24 days</div>
                    <div className="metric-trend down">
                      <span>↓ 3 days</span> from last quarter
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Cost per Hire</h3>
                    <div className="metric-value">₹45,000</div>
                    <div className="metric-trend down">
                      <span>↓ ₹8,000</span> from last quarter
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Offer Acceptance Rate</h3>
                    <div className="metric-value">78%</div>
                    <div className="metric-trend up">
                      <span>↑ 5%</span> from last quarter
                    </div>
                  </div>
                  <div className="metric-card">
                    <h3>Quality of Hire</h3>
                    <div className="metric-value">4.2/5</div>
                    <div className="metric-trend up">
                      <span>↑ 0.3</span> from last quarter
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default EnhancedHRDashboard;