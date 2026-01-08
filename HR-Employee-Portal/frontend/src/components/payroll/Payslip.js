import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import { formatINR } from '../../utils/currency';
import './Payslip.css';

const Payslip = () => {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Mock payslip data
  const payslips = [
    {
      id: 1,
      month: '2024-01',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 75000,
      allowances: {
        house: 15000,
        transport: 5000,
        medical: 2000,
        food: 3000
      },
      deductions: {
        tax: 12000,
        insurance: 2500,
        pension: 3750
      },
      overtime_hours: 10,
      overtime_pay: 1500,
      bonus: 5000,
      net_salary: 88250,
      payment_date: '2024-01-31',
      status: 'paid'
    },
    {
      id: 2,
      month: '2023-12',
      employee_name: user?.firstName + ' ' + user?.lastName || 'John Doe',
      employee_id: user?.employeeId || 'EMP001',
      department: user?.department || 'Engineering',
      position: user?.position || 'Software Developer',
      basic_salary: 75000,
      allowances: {
        house: 15000,
        transport: 5000,
        medical: 2000,
        food: 3000
      },
      deductions: {
        tax: 12000,
        insurance: 2500,
        pension: 3750
      },
      overtime_hours: 5,
      overtime_pay: 750,
      bonus: 10000,
      net_salary: 93500,
      payment_date: '2023-12-31',
      status: 'paid'
    }
  ];

  const calculateTotals = (payslip) => {
    const totalAllowances = Object.values(payslip.allowances).reduce((sum, val) => sum + val, 0);
    const totalDeductions = Object.values(payslip.deductions).reduce((sum, val) => sum + val, 0);
    const grossSalary = payslip.basic_salary + totalAllowances + payslip.overtime_pay + payslip.bonus;
    return { totalAllowances, totalDeductions, grossSalary };
  };

  const handleViewPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setShowModal(true);
  };

  const handleDownloadPDF = (payslip) => {
    alert(`Downloading payslip for ${payslip.month}...`);
  };

  const handlePrintPayslip = () => {
    window.print();
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1>💰 Payslips</h1>
              <p>View and download your salary payslips</p>
            </div>
            <div className="header-controls">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="filter-select"
              >
                <option value="2024-01">January 2024</option>
                <option value="2023-12">December 2023</option>
                <option value="2023-11">November 2023</option>
              </select>
            </div>
          </div>

          {/* Salary Summary Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">💵</div>
              <div className="stat-info">
                <h3>{formatINR(payslips[0].basic_salary)}</h3>
                <p>Basic Salary</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>{formatINR(payslips[0].net_salary)}</h3>
                <p>Net Salary (This Month)</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <h3>{payslips[0].overtime_hours}h</h3>
                <p>Overtime Hours</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎁</div>
              <div className="stat-info">
                <h3>{formatINR(payslips[0].bonus)}</h3>
                <p>Bonus</p>
              </div>
            </div>
          </div>

          {/* Payslips List */}
          <div className="dashboard-section">
            <h2>📄 Payslip History</h2>
            <div className="payslips-grid">
              {payslips.map(payslip => {
                const { grossSalary } = calculateTotals(payslip);
                return (
                  <div key={payslip.id} className="payslip-card">
                    <div className="payslip-header">
                      <div>
                        <h3>{new Date(payslip.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                        <p>Paid on {new Date(payslip.payment_date).toLocaleDateString()}</p>
                      </div>
                      <span className={`status-badge ${payslip.status}`}>
                        {payslip.status === 'paid' ? '✓ Paid' : '⏳ Pending'}
                      </span>
                    </div>
                    <div className="payslip-summary">
                      <div className="summary-item">
                        <span className="label">Gross:</span>
                        <span className="value">{formatINR(grossSalary)}</span>
                      </div>
                      <div className="summary-item">
                        <span className="label">Net:</span>
                        <span className="value primary">{formatINR(payslip.net_salary)}</span>
                      </div>
                    </div>
                    <div className="payslip-actions">
                      <button onClick={() => handleViewPayslip(payslip)} className="btn-primary small">
                        👁️ View
                      </button>
                      <button onClick={() => handleDownloadPDF(payslip)} className="btn-secondary small">
                        📥 Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payslip Modal */}
          {showModal && selectedPayslip && (
            <div className="modal-overlay" onClick={() => setShowModal(false)}>
              <div className="modal payslip-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Payslip Details</h2>
                  <button onClick={() => setShowModal(false)} className="close-btn">×</button>
                </div>
                <div className="modal-content payslip-content">
                  {/* Company Header */}
                  <div className="payslip-company-header">
                    <h1>🏢 Company Name</h1>
                    <p>123 Business Street, City, State 12345</p>
                  </div>

                  {/* Employee Info */}
                  <div className="payslip-employee-info">
                    <div>
                      <strong>Employee:</strong> {selectedPayslip.employee_name}<br/>
                      <strong>Employee ID:</strong> {selectedPayslip.employee_id}<br/>
                      <strong>Department:</strong> {selectedPayslip.department}
                    </div>
                    <div>
                      <strong>Position:</strong> {selectedPayslip.position}<br/>
                      <strong>Month:</strong> {new Date(selectedPayslip.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}<br/>
                      <strong>Payment Date:</strong> {new Date(selectedPayslip.payment_date).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Earnings & Deductions */}
                  <div className="payslip-breakdown">
                    <div className="breakdown-section">
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
                            <td>Overtime ({selectedPayslip.overtime_hours}h)</td>
                            <td>{formatINR(selectedPayslip.overtime_pay)}</td>
                          </tr>
                          <tr>
                            <td>Bonus</td>
                            <td>{formatINR(selectedPayslip.bonus)}</td>
                          </tr>
                          <tr className="total-row">
                            <td><strong>Gross Salary</strong></td>
                            <td><strong>{formatINR(calculateTotals(selectedPayslip).grossSalary)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="breakdown-section">
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
                          <tr className="total-row">
                            <td><strong>Total Deductions</strong></td>
                            <td><strong>{formatINR(calculateTotals(selectedPayslip).totalDeductions)}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="payslip-net-salary">
                    <h3>Net Salary</h3>
                    <h2>{formatINR(selectedPayslip.net_salary)}</h2>
                  </div>
                </div>
                <div className="modal-actions">
                  <button onClick={handlePrintPayslip} className="btn-secondary">
                    🖨️ Print
                  </button>
                  <button onClick={() => handleDownloadPDF(selectedPayslip)} className="btn-primary">
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

export default Payslip;
