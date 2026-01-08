import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    emergency_contact: '',
    emergency_phone: ''
  });

  // Mock employee data with user context
  const employeeData = {
    id: user?.id || 1,
    employee_id: user?.employeeId || 'EMP001',
    first_name: user?.firstName || 'John',
    last_name: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: user?.department || 'Engineering',
    position: user?.position || 'Software Developer',
    hire_date: '2023-01-15',
    date_of_birth: '1990-05-20',
    salary: '$75,000',
    address: '123 Main Street, Apt 4B\nNew York, NY 10001',
    emergency_contact: 'Jane Doe',
    emergency_phone: '+1 (555) 987-6543',
    manager: 'Sarah Johnson',
    employment_type: 'Full-Time',
    work_location: 'Hybrid',
    reports_to: 'Sarah Johnson (Manager)',
    team: 'Development Team A',
    skills: ['JavaScript', 'React', 'Node.js', 'MySQL', 'CSS'],
    certifications: ['AWS Certified Developer', 'Scrum Master'],
    projects: [
      { name: 'HR Portal', role: 'Lead Developer', status: 'Active' },
      { name: 'Customer Dashboard', role: 'Frontend Dev', status: 'Completed' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile:', formData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    alert('Change password functionality coming soon!');
  };

  const handleDownloadProfile = () => {
    const profileData = JSON.stringify(employeeData, null, 2);
    const blob = new Blob([profileData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-${employeeData.employee_id}.json`;
    a.click();
    alert('Profile data downloaded!');
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1>My Profile</h1>
              <p>Manage your personal information and settings</p>
            </div>
            <div className="header-actions">
              <button onClick={handleDownloadProfile} className="btn-secondary">
                📄 Export Profile
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary"
              >
                {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          <div className="profile-container">
            {/* Profile Header Card */}
            <div className="profile-header-card">
              <div className="profile-avatar-large">
                {employeeData.first_name?.[0]}{employeeData.last_name?.[0]}
              </div>
              <div className="profile-header-info">
                <h2>{employeeData.first_name} {employeeData.last_name}</h2>
                <p className="profile-position">{employeeData.position}</p>
                <p className="profile-department">🏯 {employeeData.department}</p>
                <div className="profile-meta">
                  <span>🆔 {employeeData.employee_id}</span>
                  <span>📅 Joined {new Date(employeeData.hire_date).toLocaleDateString()}</span>
                  <span>📍 {employeeData.work_location}</span>
                </div>
              </div>
              <div className="profile-quick-stats">
                <div className="quick-stat">
                  <h4>15</h4>
                  <p>Leave Days</p>
                </div>
                <div className="quick-stat">
                  <h4>160</h4>
                  <p>Hours/Month</p>
                </div>
                <div className="quick-stat">
                  <h4>4.5</h4>
                  <p>Performance</p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                👤 Personal Info
              </button>
              <button 
                className={`tab-btn ${activeTab === 'employment' ? 'active' : ''}`}
                onClick={() => setActiveTab('employment')}
              >
                💼 Employment
              </button>
              <button 
                className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                🎯 Skills & Certs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                📊 Projects
              </button>
              <button 
                className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                📁 Documents
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="dashboard-section">
                  <h2>👤 Personal Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name</label>
                      <input type="text" value={employeeData.first_name} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input type="text" value={employeeData.last_name} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" value={employeeData.email} disabled />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        defaultValue={employeeData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input type="date" value={employeeData.date_of_birth} disabled={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Employee ID</label>
                      <input type="text" value={employeeData.employee_id} disabled />
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label>Home Address</label>
                    <textarea 
                      name="address"
                      defaultValue={employeeData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                    />
                  </div>

                  <h3 className="section-subtitle">🔴 Emergency Contact</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Contact Name</label>
                      <input 
                        type="text" 
                        name="emergency_contact"
                        defaultValue={employeeData.emergency_contact}
                        onChange={handleInputChange}
                        disabled={!isEditing} 
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Phone</label>
                      <input 
                        type="tel" 
                        name="emergency_phone"
                        defaultValue={employeeData.emergency_phone}
                        onChange={handleInputChange}
                        disabled={!isEditing} 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Employment Details Tab */}
              {activeTab === 'employment' && (
                <div className="dashboard-section">
                  <h2>💼 Employment Details</h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Department</span>
                      <span className="info-value">{employeeData.department}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Position</span>
                      <span className="info-value">{employeeData.position}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Employment Type</span>
                      <span className="info-value">{employeeData.employment_type}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Work Location</span>
                      <span className="info-value">{employeeData.work_location}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Hire Date</span>
                      <span className="info-value">{new Date(employeeData.hire_date).toLocaleDateString()}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Salary</span>
                      <span className="info-value">{employeeData.salary}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Manager</span>
                      <span className="info-value">{employeeData.manager}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Team</span>
                      <span className="info-value">{employeeData.team}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills & Certifications Tab */}
              {activeTab === 'skills' && (
                <div className="dashboard-section">
                  <h2>🎯 Skills & Certifications</h2>
                  <h3 className="section-subtitle">Technical Skills</h3>
                  <div className="skills-container">
                    {employeeData.skills.map((skill, index) => (
                      <span key={index} className="skill-badge">{skill}</span>
                    ))}
                  </div>

                  <h3 className="section-subtitle">Certifications</h3>
                  <div className="certifications-list">
                    {employeeData.certifications.map((cert, index) => (
                      <div key={index} className="certification-item">
                        <span className="cert-icon">🎖️</span>
                        <span className="cert-name">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="dashboard-section">
                  <h2>📊 Active Projects</h2>
                  <div className="projects-grid">
                    {employeeData.projects.map((project, index) => (
                      <div key={index} className="project-card">
                        <h4>{project.name}</h4>
                        <p>Role: {project.role}</p>
                        <span className={`project-status ${project.status.toLowerCase()}`}>
                          {project.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="dashboard-section">
                  <h2>📁 Documents & Files</h2>
                  <div className="documents-list">
                    <div className="document-item">
                      <span className="doc-icon">📝</span>
                      <div className="doc-info">
                        <strong>Employment Contract</strong>
                        <small>Uploaded: Jan 15, 2023</small>
                      </div>
                      <button className="btn-secondary small">⬇️ Download</button>
                    </div>
                    <div className="document-item">
                      <span className="doc-icon">📝</span>
                      <div className="doc-info">
                        <strong>Tax Documents (W-2)</strong>
                        <small>Uploaded: Jan 1, 2024</small>
                      </div>
                      <button className="btn-secondary small">⬇️ Download</button>
                    </div>
                    <div className="document-item">
                      <span className="doc-icon">📝</span>
                      <div className="doc-info">
                        <strong>Benefits Enrollment</strong>
                        <small>Uploaded: Jan 15, 2023</small>
                      </div>
                      <button className="btn-secondary small">⬇️ Download</button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="form-actions">
                  <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    ✔️ Save Changes
                  </button>
                </div>
              )}
            </form>

            {/* Security Settings */}
            <div className="dashboard-section">
              <h2>🔒 Security Settings</h2>
              <div className="security-options">
                <div className="security-item">
                  <div>
                    <strong>Password</strong>
                    <p>Last changed: Never</p>
                  </div>
                  <button onClick={handleChangePassword} className="btn-secondary">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeProfile;