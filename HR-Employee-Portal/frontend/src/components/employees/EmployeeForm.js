import React, { useState } from 'react';
import Header from '../common/header';
import './EmployeeForm.css';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    hireDate: '',
    address: '',
    dateOfBirth: '',
    emergencyContact: ''
  });

  const departments = ['HR', 'Engineering', 'Design', 'Marketing', 'Sales', 'Finance', 'Operations'];
  const positions = {
    HR: ['HR Manager', 'HR Specialist', 'Recruiter'],
    Engineering: ['Software Developer', 'QA Engineer', 'DevOps Engineer', 'Project Manager'],
    Design: ['UX Designer', 'UI Designer', 'Graphic Designer'],
    Marketing: ['Marketing Manager', 'Content Writer', 'SEO Specialist'],
    Sales: ['Sales Manager', 'Sales Representative', 'Account Executive'],
    Finance: ['Finance Manager', 'Accountant', 'Financial Analyst'],
    Operations: ['Operations Manager', 'Office Administrator']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Employee added successfully!');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: '',
      hireDate: '',
      address: '',
      dateOfBirth: '',
      emergencyContact: ''
    });
  };

  const availablePositions = positions[formData.department] || [];

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="page-header">
            <h1>Add New Employee</h1>
          </div>

          <div className="employee-form-container">
            <form onSubmit={handleSubmit} className="employee-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Employment Details</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="position">Position *</label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.department}
                    >
                      <option value="">Select Position</option>
                      {availablePositions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                      type="number"
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="Annual salary"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="hireDate">Hire Date</label>
                    <input
                      type="date"
                      id="hireDate"
                      name="hireDate"
                      value={formData.hireDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Contact Information</h3>
                <div className="form-group full-width">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Full address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="emergencyContact">Emergency Contact</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Name and phone number"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeForm;