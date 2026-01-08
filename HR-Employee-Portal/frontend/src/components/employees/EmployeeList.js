import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { employeeAPI } from '../../services/api';
import { formatINR } from '../../utils/currency';
import Header from '../common/header';
import LoadingSpinner from '../common/LoadingSpinner';
import './EmployeeList.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Mock data with more employees
  const mockEmployees = [
    { id: 1, first_name: 'John', last_name: 'Smith', email: 'john.smith@company.com', position: 'HR Manager', department: 'HR', employee_id: 'HR001', hire_date: '2023-01-15', salary: 75000, phone: '+1-555-0101', status: 'active' },
    { id: 2, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.johnson@company.com', position: 'Project Manager', department: 'Engineering', employee_id: 'MGR001', hire_date: '2023-02-20', salary: 85000, phone: '+1-555-0102', status: 'active' },
    { id: 3, first_name: 'Mike', last_name: 'Davis', email: 'mike.davis@company.com', position: 'Software Developer', department: 'Engineering', employee_id: 'EMP001', hire_date: '2023-03-10', salary: 70000, phone: '+1-555-0103', status: 'active' },
    { id: 4, first_name: 'Emily', last_name: 'Wilson', email: 'emily.wilson@company.com', position: 'UX Designer', department: 'Design', employee_id: 'EMP002', hire_date: '2023-04-05', salary: 65000, phone: '+1-555-0104', status: 'active' },
    { id: 5, first_name: 'David', last_name: 'Brown', email: 'david.brown@company.com', position: 'QA Engineer', department: 'Engineering', employee_id: 'EMP003', hire_date: '2023-05-12', salary: 68000, phone: '+1-555-0105', status: 'active' },
    { id: 6, first_name: 'Lisa', last_name: 'Anderson', email: 'lisa.anderson@company.com', position: 'Marketing Manager', department: 'Marketing', employee_id: 'MKT001', hire_date: '2023-06-01', salary: 72000, phone: '+1-555-0106', status: 'active' },
    { id: 7, first_name: 'James', last_name: 'Taylor', email: 'james.taylor@company.com', position: 'Sales Representative', department: 'Sales', employee_id: 'SAL001', hire_date: '2023-07-15', salary: 60000, phone: '+1-555-0107', status: 'active' },
    { id: 8, first_name: 'Jennifer', last_name: 'Martinez', email: 'jennifer.martinez@company.com', position: 'Data Analyst', department: 'Analytics', employee_id: 'ANA001', hire_date: '2023-08-20', salary: 71000, phone: '+1-555-0108', status: 'active' },
    { id: 9, first_name: 'Robert', last_name: 'Garcia', email: 'robert.garcia@company.com', position: 'DevOps Engineer', department: 'Engineering', employee_id: 'EMP004', hire_date: '2023-09-10', salary: 82000, phone: '+1-555-0109', status: 'active' },
    { id: 10, first_name: 'Maria', last_name: 'Rodriguez', email: 'maria.rodriguez@company.com', position: 'Content Writer', department: 'Marketing', employee_id: 'MKT002', hire_date: '2023-10-01', salary: 55000, phone: '+1-555-0110', status: 'active' },
    { id: 11, first_name: 'William', last_name: 'Lee', email: 'william.lee@company.com', position: 'Product Manager', department: 'Product', employee_id: 'PRD001', hire_date: '2023-11-05', salary: 90000, phone: '+1-555-0111', status: 'active' },
    { id: 12, first_name: 'Jessica', last_name: 'White', email: 'jessica.white@company.com', position: 'Frontend Developer', department: 'Engineering', employee_id: 'EMP005', hire_date: '2024-01-10', salary: 73000, phone: '+1-555-0112', status: 'active' },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      // Try to fetch from API, fallback to mock data
      try {
        const response = await employeeAPI.getAll();
        setEmployees(response.data);
      } catch (apiError) {
        console.log('Using mock data');
        setEmployees(mockEmployees);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees(mockEmployees);
    } finally {
      setLoading(false);
    }
  };

  // Get unique departments
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Enhanced employee data with more professional metrics
  const enhancedEmployees = mockEmployees.map(emp => ({
    ...emp,
    performance_score: Math.floor(Math.random() * 20) + 80, // 80-100
    attendance_rate: Math.floor(Math.random() * 15) + 85, // 85-100%
    last_review_date: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    probation_end_date: emp.hire_date > '2024-01-01' ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
    benefits_enrolled: Math.random() > 0.3,
    training_completed: Math.floor(Math.random() * 5) + 3,
    manager: emp.department === 'HR' ? 'Executive Team' : 'Sarah Johnson'
  }));

  // Enhanced statistics
  const employeeStats = {
    total: employees.length,
    active: employees.filter(emp => emp.status === 'active').length,
    onLeave: employees.filter(emp => emp.status === 'on-leave').length,
    probation: employees.filter(emp => emp.probation_end_date).length,
    highPerformers: employees.filter(emp => emp.performance_score >= 90).length,
    newHires: employees.filter(emp => new Date(emp.hire_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
  };

  // Department statistics
  const departmentStats = departments.map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    return {
      name: dept,
      count: deptEmployees.length,
      avgPerformance: Math.round(deptEmployees.reduce((sum, emp) => sum + emp.performance_score, 0) / deptEmployees.length || 0),
      avgSalary: Math.round(deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length || 0),
      turnoverRate: Math.round(Math.random() * 500) / 100 // 0-5%
    };
  });

  // Enhanced filters
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Intern'];
  const performanceRanges = ['Excellent (90-100)', 'Good (80-89)', 'Average (70-79)', 'Below Average (60-69)'];

  // Bulk actions
  const bulkActions = [
    { label: 'Export Selected', icon: '📤', action: 'export' },
    { label: 'Send Message', icon: '✉️', action: 'message' },
    { label: 'Assign Training', icon: '🎓', action: 'training' },
    { label: 'Schedule Review', icon: '⭐', action: 'review' },
    { label: 'Delete Selected', icon: '🗑️', action: 'delete' }
  ];

  // Quick filters
  const quickFilters = [
    { label: 'New Hires', filter: 'new' },
    { label: 'High Performers', filter: 'high-perf' },
    { label: 'On Probation', filter: 'probation' },
    { label: 'Needs Review', filter: 'review' }
  ];

  // Handle quick filter
  const handleQuickFilter = (filterType) => {
    switch(filterType) {
      case 'new':
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        setSearchTerm('');
        setFilterDepartment('');
        setFilterStatus('all');
        // Filter by recent hires
        break;
      case 'high-perf':
        setSearchTerm('');
        setFilterDepartment('');
        setFilterStatus('all');
        // Filter by high performance
        break;
      case 'probation':
        setSearchTerm('');
        setFilterDepartment('');
        setFilterStatus('all');
        // Filter by probation
        break;
      case 'review':
        setSearchTerm('');
        setFilterDepartment('');
        setFilterStatus('all');
        // Filter by needs review
        break;
      default:
        break;
    }
  };

  // Handle bulk action
  const handleBulkAction = (action) => {
    switch(action) {
      case 'export':
        handleExport('csv');
        break;
      case 'delete':
        handleBulkDelete();
        break;
      case 'message':
        alert(`Sending message to ${selectedEmployees.length} employees`);
        break;
      case 'training':
        alert(`Assigning training to ${selectedEmployees.length} employees`);
        break;
      case 'review':
        alert(`Scheduling reviews for ${selectedEmployees.length} employees`);
        break;
      default:
        break;
    }
  };

  // Filter and sort employees
  const getFilteredAndSortedEmployees = () => {
    let filtered = employees.filter(employee => {
      const matchesSearch = 
        employee.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filterDepartment || employee.department === filterDepartment;
      const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch(sortBy) {
        case 'name':
          aValue = `${a.first_name} ${a.last_name}`;
          bValue = `${b.first_name} ${b.last_name}`;
          break;
        case 'department':
          aValue = a.department;
          bValue = b.department;
          break;
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'hire_date':
          aValue = new Date(a.hire_date);
          bValue = new Date(b.hire_date);
          break;
        case 'salary':
          aValue = a.salary;
          bValue = b.salary;
          break;
        default:
          aValue = a.id;
          bValue = b.id;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredEmployees = getFilteredAndSortedEmployees();

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSelectEmployee = (id) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === currentEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(currentEmployees.map(emp => emp.id));
    }
  };

  const handleExport = (format) => {
    const dataToExport = selectedEmployees.length > 0 
      ? employees.filter(emp => selectedEmployees.includes(emp.id))
      : filteredEmployees;

    if (format === 'csv') {
      const csv = [
        ['ID', 'Name', 'Email', 'Department', 'Position', 'Hire Date', 'Salary'].join(','),
        ...dataToExport.map(emp => [
          emp.employee_id,
          `${emp.first_name} ${emp.last_name}`,
          emp.email,
          emp.department,
          emp.position,
          emp.hire_date,
          emp.salary
        ].join(','))
      ].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.csv';
      a.click();
    } else if (format === 'json') {
      const json = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'employees.json';
      a.click();
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedEmployees.length} selected employees?`)) {
      setEmployees(employees.filter(emp => !selectedEmployees.includes(emp.id)));
      setSelectedEmployees([]);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <main className="main-content">
            <LoadingSpinner />
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
          {/* Enhanced Header */}
          <div className="page-header-section">
            <div className="header-left">
              <h1>👥 Employee Management</h1>
              <p className="page-subtitle">Manage your workforce, track performance, and oversee employee lifecycle</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary" onClick={() => navigate('/employees/new')}>
                ➕ Add Employee
              </button>
            </div>
          </div>

          {/* Enhanced Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                👥
              </div>
              <div className="stat-info">
                <h3>{employeeStats.total}</h3>
                <p>Total Employees</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)'}}>
                ✅
              </div>
              <div className="stat-info">
                <h3>{employeeStats.active}</h3>
                <p>Active</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)'}}>
                ⏳
              </div>
              <div className="stat-info">
                <h3>{employeeStats.probation}</h3>
                <p>On Probation</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{background: 'linear-gradient(135deg, #e83e8c 0%, #6f42c1 100%)'}}>
                ⭐
              </div>
              <div className="stat-info">
                <h3>{employeeStats.highPerformers}</h3>
                <p>High Performers</p>
              </div>
            </div>
          </div>

          {/* Enhanced Controls Section */}
          <div className="dashboard-section">
            <div className="controls-section">
              {/* Quick Filters */}
              <div className="quick-filters">
                <span>Quick Filters:</span>
                {quickFilters.map(filter => (
                  <button 
                    key={filter.filter}
                    className="quick-filter-btn"
                    onClick={() => handleQuickFilter(filter.filter)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Search and Filters */}
              <div className="filters-bar">
                <div className="search-container">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="probation">Probation</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="department">Sort by Department</option>
                  <option value="position">Sort by Position</option>
                  <option value="hire_date">Sort by Hire Date</option>
                  <option value="salary">Sort by Salary</option>
                  <option value="performance_score">Sort by Performance</option>
                </select>
              </div>

              {/* View Controls */}
              <div className="view-controls">
                <div className="view-toggle">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    📊
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                    onClick={() => setViewMode('table')}
                  >
                    📋
                  </button>
                </div>
                
                {selectedEmployees.length > 0 && (
                  <div className="bulk-actions">
                    <span>{selectedEmployees.length} selected</span>
                    <div className="bulk-actions-dropdown">
                      {bulkActions.map(action => (
                        <button
                          key={action.action}
                          className="bulk-action-btn"
                          onClick={() => handleBulkAction(action.action)}
                        >
                          <span>{action.icon}</span>
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Employee Display */}
            {viewMode === 'grid' ? (
              <div className="employees-grid">
                {currentEmployees.map(employee => (
                  <div key={employee.id} className="employee-card">
                    <div className="employee-card-header">
                      <div className="employee-avatar">
                        {employee.first_name[0]}{employee.last_name[0]}
                      </div>
                      <div className="employee-status">
                        <span className={`status-badge ${employee.status}`}>
                          {employee.status}
                        </span>
                        {employee.probation_end_date && (
                          <span className="probation-badge">⚠️ Probation</span>
                        )}
                      </div>
                    </div>
                    <div className="employee-card-body">
                      <h3>{employee.first_name} {employee.last_name}</h3>
                      <p className="employee-position">{employee.position}</p>
                      <p className="employee-department">{employee.department}</p>
                      <div className="employee-metrics">
                        <div className="metric">
                          <span className="metric-label">Performance</span>
                          <span className="metric-value">{employee.performance_score}/100</span>
                        </div>
                        <div className="metric">
                          <span className="metric-label">Attendance</span>
                          <span className="metric-value">{employee.attendance_rate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="employee-card-footer">
                      <button 
                        className="btn-secondary small"
                        onClick={() => navigate(`/employees/edit/${employee.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-primary small"
                        onClick={() => navigate(`/employees/profile/${employee.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th onClick={() => handleSort('name')}>
                        Employee {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('department')}>
                        Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('position')}>
                        Position {sortBy === 'position' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('hire_date')}>
                        Hire Date {sortBy === 'hire_date' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('performance_score')}>
                        Performance {sortBy === 'performance_score' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th onClick={() => handleSort('salary')}>
                        Salary {sortBy === 'salary' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedEmployees.includes(employee.id)}
                            onChange={() => handleSelectEmployee(employee.id)}
                          />
                        </td>
                        <td>
                          <div className="employee-cell">
                            <strong>{employee.first_name} {employee.last_name}</strong>
                            <small>{employee.employee_id}</small>
                          </div>
                        </td>
                        <td>{employee.department}</td>
                        <td>{employee.position}</td>
                        <td>{new Date(employee.hire_date).toLocaleDateString()}</td>
                        <td>
                          <div className="performance-cell">
                            <span className="performance-score">{employee.performance_score}</span>
                            <div className="performance-bar">
                              <div 
                                className="performance-fill" 
                                style={{width: `${employee.performance_score}%`}}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td>{formatINR(employee.salary)}</td>
                        <td>
                          <span className={`status-badge ${employee.status}`}>
                            {employee.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-secondary small"
                              onClick={() => navigate(`/employees/profile/${employee.id}`)}
                            >
                              View
                            </button>
                            <button 
                              className="btn-primary small"
                              onClick={() => navigate(`/employees/edit/${employee.id}`)}
                            >
                              Edit
                            </button>
                            <button 
                              className="btn-danger small"
                              onClick={() => handleDelete(employee.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  Previous
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  className="pagination-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Department Statistics */}
          <div className="dashboard-section">
            <h2>🏢 Department Overview</h2>
            <div className="department-stats-grid">
              {departmentStats.map(dept => (
                <div key={dept.name} className="department-stat-card">
                  <h3>{dept.name}</h3>
                  <div className="dept-metrics">
                    <div className="metric">
                      <span className="metric-label">Employees</span>
                      <span className="metric-value">{dept.count}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Avg Performance</span>
                      <span className="metric-value">{dept.avgPerformance}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Avg Salary</span>
                      <span className="metric-value">{formatINR(dept.avgSalary)}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Turnover Rate</span>
                      <span className="metric-value">{dept.turnoverRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;