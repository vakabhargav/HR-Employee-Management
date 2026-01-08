import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import './ComprehensiveReports.css';

const ComprehensiveReports = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('employee');
  const [showPreview, setShowPreview] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportFilters, setReportFilters] = useState({
    dateRange: 'last-month',
    department: 'all',
    status: 'all'
  });

  // Mock report categories
  const reportCategories = [
    {
      id: 'employee',
      title: 'Employee Reports',
      description: 'Detailed employee data, demographics, and organizational structure',
      icon: '👥',
      count: 12
    },
    {
      id: 'payroll',
      title: 'Payroll Reports',
      description: 'Compensation data, salary distributions, and payroll summaries',
      icon: '💰',
      count: 8
    },
    {
      id: 'attendance',
      title: 'Attendance Reports',
      description: 'Time tracking, leave balances, and attendance patterns',
      icon: '📅',
      count: 6
    },
    {
      id: 'performance',
      title: 'Performance Reports',
      description: 'Review results, goal tracking, and performance metrics',
      icon: '⭐',
      count: 9
    },
    {
      id: 'leave',
      title: 'Leave Reports',
      description: 'Leave requests, balances, and utilization statistics',
      icon: '🌴',
      count: 7
    },
    {
      id: 'training',
      title: 'Training Reports',
      description: 'Learning progress, skill development, and certification tracking',
      icon: '🎓',
      count: 5
    }
  ];

  // Mock generated reports
  const generatedReports = [
    {
      id: 1,
      title: 'Employee Directory Q2 2024',
      category: 'employee',
      generatedDate: '2024-06-01',
      generatedBy: 'Sarah Johnson',
      format: 'PDF',
      size: '2.4 MB',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Payroll Summary May 2024',
      category: 'payroll',
      generatedDate: '2024-05-31',
      generatedBy: 'Michael Chen',
      format: 'Excel',
      size: '1.8 MB',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Attendance Report April 2024',
      category: 'attendance',
      generatedDate: '2024-05-01',
      generatedBy: 'David Wilson',
      format: 'PDF',
      size: '3.1 MB',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Performance Reviews Q1 2024',
      category: 'performance',
      generatedDate: '2024-04-15',
      generatedBy: 'Lisa Rodriguez',
      format: 'Excel',
      size: '4.2 MB',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Leave Balance Summary Q2 2024',
      category: 'leave',
      generatedDate: '2024-06-05',
      generatedBy: 'Thomas Kumar',
      format: 'PDF',
      size: '1.5 MB',
      status: 'completed'
    }
  ];

  // Mock dashboard widgets data
  const dashboardWidgets = [
    {
      title: 'Total Reports Generated',
      value: '124',
      description: 'This month',
      trend: '+12%',
      trendDirection: 'up'
    },
    {
      title: 'Avg. Report Size',
      value: '2.8 MB',
      description: 'Across all formats',
      trend: '-0.3 MB',
      trendDirection: 'down'
    },
    {
      title: 'Most Popular Format',
      value: 'PDF',
      description: '65% of downloads',
      trend: '+5%',
      trendDirection: 'up'
    },
    {
      title: 'Avg. Generation Time',
      value: '4.2s',
      description: 'Per report',
      trend: '-0.8s',
      trendDirection: 'down'
    }
  ];

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setReportFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle report generation
  const handleGenerateReport = () => {
    alert(`Generating ${activeCategory} report with filters: ${JSON.stringify(reportFilters)}`);
  };

  // Handle report preview
  const handlePreviewReport = (report) => {
    setSelectedReport(report);
    setShowPreview(true);
  };

  // Handle report download
  const handleDownloadReport = (report) => {
    alert(`Downloading report: ${report.title} in ${report.format} format`);
  };

  // Handle report export
  const handleExportReport = (format) => {
    alert(`Exporting report in ${format} format`);
  };

  // Handle print report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content comprehensive-reports-container">
          {/* Page Header */}
          <div className="comprehensive-reports-header">
            <div className="comprehensive-header-content">
              <h1>📋 Comprehensive Reports</h1>
              <p>Generate, view, and export detailed HR reports and analytics</p>
            </div>
            <div className="comprehensive-header-actions">
              <button className="btn-primary">
                📊 Analytics Dashboard
              </button>
              <button className="btn-secondary">
                📅 Schedule Reports
              </button>
            </div>
          </div>

          {/* Dashboard Widgets */}
          <div className="comprehensive-dashboard-widgets">
            {dashboardWidgets.map((widget, index) => (
              <div key={index} className="comprehensive-widget-card">
                <div className="comprehensive-widget-header">
                  <h3>{widget.title}</h3>
                </div>
                <div className="comprehensive-widget-value">{widget.value}</div>
                <div className="comprehensive-widget-description">{widget.description}</div>
                <div className={`comprehensive-widget-trend ${widget.trendDirection}`}>
                  <span>{widget.trendDirection === 'up' ? '↑' : '↓'} {widget.trend}</span>
                  <span>from last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Report Categories */}
          <div className="comprehensive-report-categories">
            {reportCategories.map(category => (
              <div 
                key={category.id}
                className="comprehensive-category-card"
                onClick={() => setActiveCategory(category.id)}
              >
                <div className="comprehensive-category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="comprehensive-report-count">{category.count} reports</span>
              </div>
            ))}
          </div>

          {/* Report Builder */}
          <div className="comprehensive-report-builder">
            <div className="comprehensive-builder-header">
              <h2>🛠️ Report Builder</h2>
              <p>Create custom reports with specific filters and parameters</p>
            </div>
            
            <div className="comprehensive-filter-bar">
              <div className="comprehensive-filter-group">
                <label className="comprehensive-filter-label">Date Range</label>
                <select 
                  className="comprehensive-form-select"
                  value={reportFilters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                >
                  <option value="last-week">Last Week</option>
                  <option value="last-month">Last Month</option>
                  <option value="last-quarter">Last Quarter</option>
                  <option value="last-year">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <div className="comprehensive-filter-group">
                <label className="comprehensive-filter-label">Department</label>
                <select 
                  className="comprehensive-form-select"
                  value={reportFilters.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="hr">Human Resources</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
              </div>
              
              <div className="comprehensive-filter-group">
                <label className="comprehensive-filter-label">Status</label>
                <select 
                  className="comprehensive-form-select"
                  value={reportFilters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            
            <div className="comprehensive-form-actions">
              <button className="btn-secondary">
                🔍 Preview Report
              </button>
              <button 
                className="btn-primary"
                onClick={handleGenerateReport}
              >
                📄 Generate Report
              </button>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="comprehensive-generated-reports">
            <div className="comprehensive-reports-header">
              <h2>📤 Generated Reports</h2>
              <p>Recently created reports and their download history</p>
            </div>
            
            <table className="comprehensive-reports-table">
              <thead>
                <tr>
                  <th>Report Title</th>
                  <th>Category</th>
                  <th>Generated Date</th>
                  <th>Generated By</th>
                  <th>Format</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {generatedReports.map(report => (
                  <tr key={report.id}>
                    <td>{report.title}</td>
                    <td>{report.category.charAt(0).toUpperCase() + report.category.slice(1)}</td>
                    <td>{new Date(report.generatedDate).toLocaleDateString()}</td>
                    <td>{report.generatedBy}</td>
                    <td>{report.format}</td>
                    <td>{report.size}</td>
                    <td>
                      <span className="status-badge completed">
                        {report.status}
                      </span>
                    </td>
                    <td className="comprehensive-table-actions">
                      <button 
                        className="comprehensive-table-btn"
                        onClick={() => handlePreviewReport(report)}
                      >
                        👁️ Preview
                      </button>
                      <button 
                        className="comprehensive-table-btn primary"
                        onClick={() => handleDownloadReport(report)}
                      >
                        📥 Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Report Preview Modal */}
          {showPreview && selectedReport && (
            <div className="modal-overlay" onClick={() => setShowPreview(false)}>
              <div className="modal comprehensive-report-modal" onClick={(e) => e.stopPropagation()}>
                <div className="comprehensive-modal-header">
                  <h2 className="comprehensive-modal-title">Report Preview</h2>
                  <button 
                    className="comprehensive-close-btn"
                    onClick={() => setShowPreview(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="comprehensive-modal-content">
                  <div className="comprehensive-report-header">
                    <h1>{selectedReport.title}</h1>
                    <p>Detailed report preview with key metrics and data visualization</p>
                  </div>
                  
                  <div className="comprehensive-report-meta">
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Generated Date</span>
                      <span className="comprehensive-meta-value">
                        {new Date(selectedReport.generatedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Generated By</span>
                      <span className="comprehensive-meta-value">{selectedReport.generatedBy}</span>
                    </div>
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Format</span>
                      <span className="comprehensive-meta-value">{selectedReport.format}</span>
                    </div>
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Size</span>
                      <span className="comprehensive-meta-value">{selectedReport.size}</span>
                    </div>
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Category</span>
                      <span className="comprehensive-meta-value">
                        {selectedReport.category.charAt(0).toUpperCase() + selectedReport.category.slice(1)}
                      </span>
                    </div>
                    <div className="comprehensive-meta-item">
                      <span className="comprehensive-meta-label">Status</span>
                      <span className="comprehensive-meta-value">
                        <span className="status-badge completed">{selectedReport.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="comprehensive-report-section">
                    <h2>📊 Key Metrics</h2>
                    <div className="comprehensive-dashboard-widgets">
                      <div className="comprehensive-widget-card">
                        <div className="comprehensive-widget-header">
                          <h3>Total Records</h3>
                        </div>
                        <div className="comprehensive-widget-value">1,247</div>
                        <div className="comprehensive-widget-description">Employee records included</div>
                      </div>
                      <div className="comprehensive-widget-card">
                        <div className="comprehensive-widget-header">
                          <h3>Data Coverage</h3>
                        </div>
                        <div className="comprehensive-widget-value">98.5%</div>
                        <div className="comprehensive-widget-description">Complete data accuracy</div>
                      </div>
                      <div className="comprehensive-widget-card">
                        <div className="comprehensive-widget-header">
                          <h3>Last Updated</h3>
                        </div>
                        <div className="comprehensive-widget-value">Today</div>
                        <div className="comprehensive-widget-description">Real-time data sync</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="comprehensive-report-section">
                    <h2>📋 Report Data</h2>
                    <table className="comprehensive-data-table">
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                          <th>Department</th>
                          <th>Position</th>
                          <th>Salary</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>EMP001</td>
                          <td>John Smith</td>
                          <td>Engineering</td>
                          <td>Software Developer</td>
                          <td>$85,000</td>
                          <td><span className="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                          <td>EMP002</td>
                          <td>Sarah Johnson</td>
                          <td>HR</td>
                          <td>HR Manager</td>
                          <td>$95,000</td>
                          <td><span className="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                          <td>EMP003</td>
                          <td>Mike Davis</td>
                          <td>Design</td>
                          <td>UX Designer</td>
                          <td>$78,000</td>
                          <td><span className="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                          <td>EMP004</td>
                          <td>Emily Wilson</td>
                          <td>Marketing</td>
                          <td>Marketing Specialist</td>
                          <td>$65,000</td>
                          <td><span className="status-badge active">Active</span></td>
                        </tr>
                        <tr>
                          <td>EMP005</td>
                          <td>David Brown</td>
                          <td>Sales</td>
                          <td>Sales Representative</td>
                          <td>$70,000</td>
                          <td><span className="status-badge active">Active</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="comprehensive-report-section">
                    <h2>📈 Data Visualization</h2>
                    <div className="comprehensive-chart-container">
                      <div className="comprehensive-chart-placeholder">
                        <div className="comprehensive-chart-placeholder-icon">📊</div>
                        <p>Department Distribution Visualization</p>
                        <small>Interactive chart showing employee distribution across departments</small>
                      </div>
                    </div>
                    
                    <div className="comprehensive-chart-container">
                      <div className="comprehensive-chart-placeholder">
                        <div className="comprehensive-chart-placeholder-icon">📈</div>
                        <p>Salary Range Analysis</p>
                        <small>Bar chart showing salary distribution by department</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="comprehensive-modal-actions">
                  <button 
                    className="comprehensive-export-btn print"
                    onClick={handlePrintReport}
                  >
                    🖨️ Print Report
                  </button>
                  <button 
                    className="comprehensive-export-btn pdf"
                    onClick={() => handleExportReport('pdf')}
                  >
                    📄 Export as PDF
                  </button>
                  <button 
                    className="comprehensive-export-btn excel"
                    onClick={() => handleExportReport('excel')}
                  >
                    📊 Export as Excel
                  </button>
                  <button 
                    className="comprehensive-export-btn csv"
                    onClick={() => handleExportReport('csv')}
                  >
                    📉 Export as CSV
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComprehensiveReports;