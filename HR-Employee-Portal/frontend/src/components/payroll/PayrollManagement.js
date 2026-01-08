import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../common/header';
import { payrollAPI } from '../../services/api';
import { formatINR, formatIndianNumber } from '../../utils/currency';
import './PayrollManagement.css';

const PayrollManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [view, setView] = useState('overview'); // overview, processing, history

  const { data: payrollData, isLoading, error } = useQuery({
    queryKey: ['payroll', selectedMonth],
    queryFn: () => payrollAPI.getPayroll({ month: selectedMonth }),
  });

  const payrollRecords = payrollData?.data || [
    {
      id: 1,
      employee_name: 'Mike Davis',
      employee_id: 'EMP001',
      department: 'Engineering',
      basic_salary: 55000,
      allowances: 2000,
      deductions: 1500,
      overtime: 500,
      bonus: 1000,
      tax: 5500,
      net_salary: 55000 + 2000 - 1500 + 500 + 1000 - 5500,
      status: 'paid',
      payment_date: '2024-01-05'
    },
    {
      id: 2,
      employee_name: 'Sarah Johnson',
      employee_id: 'MGR001',
      department: 'Engineering',
      basic_salary: 65000,
      allowances: 3000,
      deductions: 2000,
      overtime: 0,
      bonus: 1500,
      tax: 6500,
      net_salary: 65000 + 3000 - 2000 + 0 + 1500 - 6500,
      status: 'paid',
      payment_date: '2024-01-05'
    }
  ];

  const payrollStats = {
    totalEmployees: payrollRecords.length,
    totalPayout: payrollRecords.reduce((sum, record) => sum + record.net_salary, 0),
    pendingPayments: payrollRecords.filter(record => record.status === 'pending').length,
    processedPayments: payrollRecords.filter(record => record.status === 'paid').length
  };

  if (error) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <main className="main-content">
            <div className="error-state">
              <h2>Error Loading Payroll Data</h2>
              <p>{error.message}</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1>Payroll Management</h1>
              <p>Manage employee payroll and compensation</p>
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
              <button className="btn-primary" onClick={() => setView('processing')}>
                Process Payroll
              </button>
            </div>
          </div>

          {/* Payroll Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>{payrollStats.totalEmployees}</h3>
                <p>Total Employees</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>{formatINR(payrollStats.totalPayout)}</h3>
                <p>Total Payout</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>{payrollStats.pendingPayments}</h3>
                <p>Pending Payments</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{payrollStats.processedPayments}</h3>
                <p>Processed</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${view === 'overview' ? 'active' : ''}`}
              onClick={() => setView('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${view === 'processing' ? 'active' : ''}`}
              onClick={() => setView('processing')}
            >
              Processing
            </button>
            <button 
              className={`tab-btn ${view === 'history' ? 'active' : ''}`}
              onClick={() => setView('history')}
            >
              History
            </button>
          </div>

          {/* Payroll Table */}
          <div className="dashboard-section">
            <h2>Payroll Records - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
            
            {isLoading ? (
              <div className="loading-state">Loading payroll data...</div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Basic Salary</th>
                      <th>Allowances</th>
                      <th>Deductions</th>
                      <th>Bonus</th>
                      <th>Tax</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollRecords.map(record => (
                      <tr key={record.id}>
                        <td>
                          <div className="employee-cell">
                            <strong>{record.employee_name}</strong>
                            <small>{record.employee_id}</small>
                          </div>
                        </td>
                        <td>{record.department}</td>
                        <td>{formatINR(record.basic_salary)}</td>
                        <td>{formatINR(record.allowances)}</td>
                        <td>{formatINR(record.deductions)}</td>
                        <td>{formatINR(record.bonus)}</td>
                        <td>{formatINR(record.tax)}</td>
                        <td>
                          <strong>{formatINR(record.net_salary)}</strong>
                        </td>
                        <td>
                          <span className={`status-badge ${record.status}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-secondary small">View</button>
                            <button className="btn-primary small">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-btn">Generate Payslips</button>
              <button className="action-btn">Export to Excel</button>
              <button className="action-btn">Run Payroll Report</button>
              <button className="action-btn">Tax Compliance</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PayrollManagement;