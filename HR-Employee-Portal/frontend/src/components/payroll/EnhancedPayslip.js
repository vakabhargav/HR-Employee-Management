import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import { formatINR } from '../../utils/currency';
import './EnhancedPayslip.css';

const EnhancedPayslip = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or table
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [comparisonData, setComparisonData] = useState({
    currentMonth: null,
    previousMonth: null
  });

  // Mock payslip data with more comprehensive information
  const payslips = [
    {
      id: 1,
      month: '2024-05',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 85000,
      allowances: {
        house: 17000,
        transport: 5000,
        medical: 3000,
        food: 4000,
        performance: 10000
      },
      deductions: {
        tax: 15000,
        insurance: 3000,
        pension: 4250,
        professional_tax: 200
      },
      overtime_hours: 15,
      overtime_pay: 2250,
      bonus: 15000,
      incentives: 5000,
      net_salary: 98800,
      payment_date: '2024-05-31',
      status: 'paid',
      bank_details: {
        name: 'State Bank of India',
        account_number: '**** **** **** 1234',
        ifsc: 'SBIN0002499'
      },
      payment_mode: 'Bank Transfer'
    },
    {
      id: 2,
      month: '2024-04',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 85000,
      allowances: {
        house: 17000,
        transport: 5000,
        medical: 3000,
        food: 4000,
        performance: 8000
      },
      deductions: {
        tax: 14500,
        insurance: 3000,
        pension: 4250,
        professional_tax: 200
      },
      overtime_hours: 10,
      overtime_pay: 1500,
      bonus: 10000,
      incentives: 3000,
      net_salary: 94550,
      payment_date: '2024-04-30',
      status: 'paid',
      bank_details: {
        name: 'State Bank of India',
        account_number: '**** **** **** 1234',
        ifsc: 'SBIN0002499'
      },
      payment_mode: 'Bank Transfer'
    },
    {
      id: 3,
      month: '2024-03',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 80000,
      allowances: {
        house: 16000,
        transport: 5000,
        medical: 3000,
        food: 4000,
        performance: 7000
      },
      deductions: {
        tax: 13500,
        insurance: 3000,
        pension: 4000,
        professional_tax: 200
      },
      overtime_hours: 8,
      overtime_pay: 1200,
      bonus: 8000,
      incentives: 2000,
      net_salary: 89500,
      payment_date: '2024-03-31',
      status: 'paid',
      bank_details: {
        name: 'State Bank of India',
        account_number: '**** **** **** 1234',
        ifsc: 'SBIN0002499'
      },
      payment_mode: 'Bank Transfer'
    },
    {
      id: 4,
      month: '2024-02',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 80000,
      allowances: {
        house: 16000,
        transport: 5000,
        medical: 3000,
        food: 4000,
        performance: 6000
      },
      deductions: {
        tax: 13000,
        insurance: 3000,
        pension: 4000,
        professional_tax: 200
      },
      overtime_hours: 5,
      overtime_pay: 750,
      bonus: 5000,
      incentives: 1000,
      net_salary: 86450,
      payment_date: '2024-02-29',
      status: 'paid',
      bank_details: {
        name: 'State Bank of India',
        account_number: '**** **** **** 1234',
        ifsc: 'SBIN0002499'
      },
      payment_mode: 'Bank Transfer'
    }
  ];

  // Calculate totals for a payslip
  const calculateTotals = (payslip) => {
    const totalAllowances = Object.values(payslip.allowances).reduce((sum, val) => sum + val, 0);
    const totalDeductions = Object.values(payslip.deductions).reduce((sum, val) => sum + val, 0);
    const grossSalary = payslip.basic_salary + totalAllowances + payslip.overtime_pay + payslip.bonus + payslip.incentives;
    return { totalAllowances, totalDeductions, grossSalary };
  };

  // Handle viewing a payslip
  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setShowModal(true);
  };

  // Handle downloading payslip
  const handleDownloadPDF = (payslip) => {
    alert(`Downloading payslip for ${new Date(payslip.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}...`);
  };

  // Handle printing payslip
  const handlePrintPayslip = () => {
    window.print();
  };

  // Handle exporting data
  const handleExport = (format) => {
    alert(`Exporting payslip data as ${format.toUpperCase()}...`);
  };

  // Get month name from date string
  const getMonthName = (dateString) => {
    return new Date(dateString + '-01').toLocaleDateString('en-US', { month: 'long' });
  };

  // Get year from date string
  const getYear = (dateString) => {
    return new Date(dateString + '-01').getFullYear();
  };

  // Filter payslips by selected year
  const filteredPayslips = payslips.filter(payslip => 
    getYear(payslip.month) === selectedYear
  );

  // Get monthly summary data
  const getMonthlySummary = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map((month, index) => {
      const monthPayslip = filteredPayslips.find(p => 
        new Date(p.month + '-01').getMonth() === index
      );
      
      return {
        name: month,
        short: month.substring(0, 3),
        salary: monthPayslip ? monthPayslip.net_salary : 0,
        paid: !!monthPayslip
      };
    });
  };

  // Calculate comparison data
  useEffect(() => {
    if (filteredPayslips.length >= 2) {
      const sortedPayslips = [...filteredPayslips].sort((a, b) => 
        new Date(b.month + '-01') - new Date(a.month + '-01')
      );
      
      setComparisonData({
        currentMonth: sortedPayslips[0],
        previousMonth: sortedPayslips[1]
      });
    }
  }, [filteredPayslips]);

  // Calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    return `enhanced-status-badge ${status}`;
  };

  // Navigate years
  const navigateYear = (direction) => {
    setSelectedYear(prev => prev + direction);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content enhanced-payslip-container">
          <div className="enhanced-payslip-header">
            <div>
              <h1 className="enhanced-payslip-title">💰 Payslips & Compensation</h1>
              <p className="enhanced-payslip-subtitle">View, download, and manage your salary payslips</p>
            </div>
            <div className="enhanced-payslip-controls">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="enhanced-filter-select"
              >
                <option value="2024-05">May 2024</option>
                <option value="2024-04">April 2024</option>
                <option value="2024-03">March 2024</option>
                <option value="2024-02">February 2024</option>
                <option value="2024-01">January 2024</option>
              </select>
              <div className="enhanced-view-toggle">
                <button 
                  className={`enhanced-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid View
                </button>
                <button 
                  className={`enhanced-view-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  Table View
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics Cards */}
          <div className="enhanced-stats-grid">
            <div className="enhanced-stat-card">
              <div className="enhanced-stat-icon">💵</div>
              <div className="enhanced-stat-info">
                <h3>{formatINR(payslips[0]?.basic_salary || 0)}</h3>
                <p>Basic Salary</p>
              </div>
              <div className="enhanced-stat-trend up">
                <span>↑ 5.2%</span> from last month
              </div>
            </div>
            <div className="enhanced-stat-card">
              <div className="enhanced-stat-icon">💰</div>
              <div className="enhanced-stat-info">
                <h3>{formatINR(payslips[0]?.net_salary || 0)}</h3>
                <p>Net Salary (This Month)</p>
              </div>
              <div className="enhanced-stat-trend up">
                <span>↑ 3.1%</span> from last month
              </div>
            </div>
            <div className="enhanced-stat-card">
              <div className="enhanced-stat-icon">⏱️</div>
              <div className="enhanced-stat-info">
                <h3>{payslips[0]?.overtime_hours || 0}h</h3>
                <p>Overtime Hours</p>
              </div>
              <div className="enhanced-stat-trend up">
                <span>↑ 50%</span> from last month
              </div>
            </div>
            <div className="enhanced-stat-card">
              <div className="enhanced-stat-icon">🎁</div>
              <div className="enhanced-stat-info">
                <h3>{formatINR((payslips[0]?.bonus || 0) + (payslips[0]?.incentives || 0))}</h3>
                <p>Bonuses & Incentives</p>
              </div>
              <div className="enhanced-stat-trend up">
                <span>↑ 25%</span> from last month
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="enhanced-export-section">
            <div className="enhanced-export-header">
              <h2>📤 Export Payslip Data</h2>
              <div className="enhanced-export-options">
                <button 
                  className="enhanced-export-btn pdf"
                  onClick={() => handleExport('pdf')}
                >
                  📄 PDF
                </button>
                <button 
                  className="enhanced-export-btn excel"
                  onClick={() => handleExport('excel')}
                >
                  📊 Excel
                </button>
                <button 
                  className="enhanced-export-btn csv"
                  onClick={() => handleExport('csv')}
                >
                  📉 CSV
                </button>
              </div>
            </div>
          </div>

          {/* Payslip History */}
          <div className="enhanced-payslip-history">
            <div className="enhanced-history-header">
              <h2>📅 Payslip History</h2>
              <div className="enhanced-year-selector">
                <button 
                  className="enhanced-year-btn"
                  onClick={() => navigateYear(-1)}
                >
                  ‹
                </button>
                <div className="enhanced-year-display">{selectedYear}</div>
                <button 
                  className="enhanced-year-btn"
                  onClick={() => navigateYear(1)}
                  disabled={selectedYear >= new Date().getFullYear()}
                >
                  ›
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="enhanced-payslips-grid">
                {filteredPayslips.map(payslip => {
                  const { grossSalary } = calculateTotals(payslip);
                  return (
                    <div key={payslip.id} className="enhanced-payslip-card">
                      <div className="enhanced-payslip-header">
                        <div>
                          <h3>{getMonthName(payslip.month)} {getYear(payslip.month)}</h3>
                          <p>Paid on {new Date(payslip.payment_date).toLocaleDateString()}</p>
                        </div>
                        <span className={getStatusBadgeClass(payslip.status)}>
                          {payslip.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                        </span>
                      </div>
                      <div className="enhanced-payslip-summary">
                        <div className="enhanced-summary-item">
                          <span className="label">Gross:</span>
                          <span className="value">{formatINR(grossSalary)}</span>
                        </div>
                        <div className="enhanced-summary-item">
                          <span className="label">Deductions:</span>
                          <span className="value">{formatINR(calculateTotals(payslip).totalDeductions)}</span>
                        </div>
                        <div className="enhanced-summary-item">
                          <span className="label">Net:</span>
                          <span className="value primary">{formatINR(payslip.net_salary)}</span>
                        </div>
                      </div>
                      <div className="enhanced-payslip-actions">
                        <button 
                          onClick={() => handleViewPayslip(payslip)} 
                          className="enhanced-btn-primary"
                        >
                          👁️ View
                        </button>
                        <button 
                          onClick={() => handleDownloadPDF(payslip)} 
                          className="enhanced-btn-secondary"
                        >
                          📥 Download
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <table className="enhanced-payslip-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Payment Date</th>
                    <th>Basic Salary</th>
                    <th>Gross Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayslips.map(payslip => {
                    const { grossSalary, totalDeductions } = calculateTotals(payslip);
                    return (
                      <tr key={payslip.id}>
                        <td>{getMonthName(payslip.month)} {getYear(payslip.month)}</td>
                        <td>{new Date(payslip.payment_date).toLocaleDateString()}</td>
                        <td>{formatINR(payslip.basic_salary)}</td>
                        <td>{formatINR(grossSalary)}</td>
                        <td>{formatINR(totalDeductions)}</td>
                        <td><strong>{formatINR(payslip.net_salary)}</strong></td>
                        <td>
                          <span className={getStatusBadgeClass(payslip.status)}>
                            {payslip.status === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="enhanced-table-actions">
                          <button 
                            className="enhanced-table-btn primary"
                            onClick={() => handleViewPayslip(payslip)}
                          >
                            View
                          </button>
                          <button 
                            className="enhanced-table-btn"
                            onClick={() => handleDownloadPDF(payslip)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* Monthly Summary */}
            <div className="enhanced-monthly-summary">
              {getMonthlySummary().map((month, index) => (
                <div 
                  key={index} 
                  className={`enhanced-month-card ${filteredPayslips.find(p => 
                    new Date(p.month + '-01').getMonth() === index
                  ) ? 'active' : ''}`}
                >
                  <h4>{month.short}</h4>
                  <p>{month.paid ? formatINR(month.salary) : 'N/A'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Salary Comparison */}
          {comparisonData.currentMonth && comparisonData.previousMonth && (
            <div className="enhanced-comparison-section">
              <div className="enhanced-comparison-header">
                <h2>📊 Salary Comparison</h2>
                <p>Compare your current salary with previous months</p>
              </div>
              
              <div className="enhanced-comparison-stats">
                <div className="enhanced-comparison-card">
                  <h3>Current Month</h3>
                  <div className="enhanced-comparison-value">
                    {formatINR(comparisonData.currentMonth.net_salary)}
                  </div>
                  <p>{getMonthName(comparisonData.currentMonth.month)} {getYear(comparisonData.currentMonth.month)}</p>
                </div>
                
                <div className="enhanced-comparison-card">
                  <h3>Previous Month</h3>
                  <div className="enhanced-comparison-value">
                    {formatINR(comparisonData.previousMonth.net_salary)}
                  </div>
                  <p>{getMonthName(comparisonData.previousMonth.month)} {getYear(comparisonData.previousMonth.month)}</p>
                </div>
                
                <div className="enhanced-comparison-card">
                  <h3>Change</h3>
                  <div className="enhanced-comparison-value">
                    {formatINR(comparisonData.currentMonth.net_salary - comparisonData.previousMonth.net_salary)}
                  </div>
                  <div className={`enhanced-comparison-change ${
                    comparisonData.currentMonth.net_salary >= comparisonData.previousMonth.net_salary ? 'positive' : 'negative'
                  }`}>
                    {comparisonData.currentMonth.net_salary >= comparisonData.previousMonth.net_salary ? '↑' : '↓'} 
                    {Math.abs(calculatePercentageChange(
                      comparisonData.currentMonth.net_salary, 
                      comparisonData.previousMonth.net_salary
                    )).toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="enhanced-chart-container">
                <div className="enhanced-chart-placeholder">
                  <div className="enhanced-chart-placeholder-icon">📈</div>
                  <p>Salary Trend Visualization</p>
                  <small>Chart showing salary trends over the past months</small>
                </div>
              </div>
            </div>
          )}

          {/* Payslip Modal */}
          {showModal && selectedPayslip && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal enhanced-payslip-modal" onClick={(e) => e.stopPropagation()}>
                <div className="enhanced-modal-header">
                  <h2 className="enhanced-modal-title">Payslip Details</h2>
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="enhanced-close-btn"
                  >
                    ×
                  </button>
                </div>
                <div className="enhanced-modal-content">
                  {/* Company Header */}
                  <div className="enhanced-payslip-company-header">
                    <h1>🏢 TechCorp Solutions</h1>
                    <p>123 Business Avenue, Tech Park, Bangalore, Karnataka 560001</p>
                    <p>PAN: ABCDE1234F | TAN: KAR0000001</p>
                  </div>

                  {/* Employee Info */}
                  <div className="enhanced-payslip-employee-info">
                    <div>
                      <strong>Employee:</strong> {selectedPayslip.employee_name}<br/>
                      <strong>Employee ID:</strong> {selectedPayslip.employee_id}<br/>
                      <strong>Department:</strong> {selectedPayslip.department}<br/>
                      <strong>Designation:</strong> {selectedPayslip.position}
                    </div>
                    <div>
                      <strong>Month:</strong> {new Date(selectedPayslip.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}<br/>
                      <strong>Payment Date:</strong> {new Date(selectedPayslip.payment_date).toLocaleDateString()}<br/>
                      <strong>Payment Mode:</strong> {selectedPayslip.payment_mode}<br/>
                      <strong>Bank:</strong> {selectedPayslip.bank_details.name}
                    </div>
                  </div>

                  {/* Earnings & Deductions */}
                  <div className="enhanced-payslip-breakdown">
                    <div className="enhanced-breakdown-section">
                      <h3>Earnings</h3>
                      <table>
                        <tbody>
                          <tr>
                            <td>Basic Salary</td>
                            <td>{formatINR(selectedPayslip.basic_salary)}</td>
                          </tr>
                          <tr>
                            <td>House Allowance</td>
                            <td>{formatINR(selectedPayslip.allowances.house)}</td>
                          </tr>
                          <tr>
                            <td>Transport Allowance</td>
                            <td>{formatINR(selectedPayslip.allowances.transport)}</td>
                          </tr>
                          <tr>
                            <td>Medical Allowance</td>
                            <td>{formatINR(selectedPayslip.allowances.medical)}</td>
                          </tr>
                          <tr>
                            <td>Food Allowance</td>
                            <td>{formatINR(selectedPayslip.allowances.food)}</td>
                          </tr>
                          <tr>
                            <td>Performance Allowance</td>
                            <td>{formatINR(selectedPayslip.allowances.performance)}</td>
                          </tr>
                          <tr>
                            <td>Overtime ({selectedPayslip.overtime_hours}h)</td>
                            <td>{formatINR(selectedPayslip.overtime_pay)}</td>
                          </tr>
                          <tr>
                            <td>Bonus</td>
                            <td>{formatINR(selectedPayslip.bonus)}</td>
                          </tr>
                          <tr>
                            <td>Incentives</td>
                            <td>{formatINR(selectedPayslip.incentives)}</td>
                          </tr>
                          <tr className="total-row">
                            <td><strong>Gross Salary</strong></td>
                            <td><strong>{formatINR(calculateTotals(selectedPayslip).grossSalary)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="enhanced-breakdown-section">
                      <h3>Deductions</h3>
                      <table>
                        <tbody>
                          <tr>
                            <td>Income Tax</td>
                            <td>{formatINR(selectedPayslip.deductions.tax)}</td>
                          </tr>
                          <tr>
                            <td>Health Insurance</td>
                            <td>{formatINR(selectedPayslip.deductions.insurance)}</td>
                          </tr>
                          <tr>
                            <td>Pension Fund</td>
                            <td>{formatINR(selectedPayslip.deductions.pension)}</td>
                          </tr>
                          <tr>
                            <td>Professional Tax</td>
                            <td>{formatINR(selectedPayslip.deductions.professional_tax)}</td>
                          </tr>
                          <tr className="total-row">
                            <td><strong>Total Deductions</strong></td>
                            <td><strong>{formatINR(calculateTotals(selectedPayslip).totalDeductions)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="enhanced-payslip-net-salary">
                    <h3>Net Salary</h3>
                    <h2>{formatINR(selectedPayslip.net_salary)}</h2>
                    <p>(Gross Salary - Total Deductions)</p>
                  </div>

                  {/* Additional Information */}
                  <div className="enhanced-breakdown-section">
                    <h3>Additional Information</h3>
                    <table>
                      <tbody>
                        <tr>
                          <td>Leave Encashment</td>
                          <td>{formatINR(0)}</td>
                        </tr>
                        <tr>
                          <td>Reimbursements</td>
                          <td>{formatINR(0)}</td>
                        </tr>
                        <tr>
                          <td>Arrears</td>
                          <td>{formatINR(0)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="enhanced-modal-actions">
                  <button 
                    onClick={handlePrintPayslip} 
                    className="enhanced-btn-secondary"
                  >
                    🖨️ Print
                  </button>
                  <button 
                    onClick={() => handleDownloadPDF(selectedPayslip)} 
                    className="enhanced-btn-primary"
                  >
                    📥 Download PDF
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

export default EnhancedPayslip;