import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import './EnhancedEmployeeProfile.css';

const EnhancedEmployeeProfile = () => {
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
    salary: '$95,000',
    address: '123 Main Street, Apt 4B\nNew York, NY 10001',
    emergency_contact: 'Jane Doe',
    emergency_phone: '+1 (555) 987-6543',
    manager: 'Sarah Johnson',
    employment_type: 'Full-Time',
    work_location: 'Hybrid',
    reports_to: 'Sarah Johnson (Manager)',
    team: 'Development Team A',
    skills: ['JavaScript', 'React', 'Node.js', 'MySQL', 'CSS', 'Python', 'AWS', 'Docker'],
    certifications: [
      'AWS Certified Developer', 
      'Scrum Master', 
      'Google Cloud Professional', 
      'CISSP Security Professional'
    ],
    projects: [
      { 
        name: 'HR Portal', 
        role: 'Lead Developer', 
        status: 'active',
        description: 'Developing next-generation HR management system with React and Node.js'
      },
      { 
        name: 'Customer Dashboard', 
        role: 'Frontend Dev', 
        status: 'completed',
        description: 'Designed and implemented responsive customer analytics dashboard'
      },
      { 
        name: 'Mobile App', 
        role: 'Full Stack Developer', 
        status: 'pending',
        description: 'Building cross-platform mobile application for iOS and Android'
      }
    ],
    performance: {
      current_rating: 4.7,
      previous_rating: 4.5,
      reviews: [
        {
          date: '2024-01-15',
          reviewer: 'Sarah Johnson',
          rating: 4.8,
          comments: 'Exceptional work on the HR Portal project. Strong technical skills and leadership.'
        },
        {
          date: '2023-07-20',
          reviewer: 'Sarah Johnson',
          rating: 4.5,
          comments: 'Consistent performer with excellent problem-solving abilities.'
        }
      ]
    },
    goals: [
      {
        title: 'Complete HR Portal MVP',
        description: 'Deliver fully functional HR Portal with all core features',
        status: 'In Progress',
        progress: 85,
        deadline: '2024-06-30',
        priority: 'High'
      },
      {
        title: 'Obtain AWS Certification',
        description: 'Complete AWS Certified Developer certification',
        status: 'In Progress',
        progress: 60,
        deadline: '2024-08-15',
        priority: 'Medium'
      },
      {
        title: 'Mentor Junior Developers',
        description: 'Provide guidance and training to 3 junior team members',
        status: 'Not Started',
        progress: 0,
        deadline: '2024-12-31',
        priority: 'Low'
      }
    ],
    training: [
      {
        title: 'Advanced React Patterns',
        provider: 'Udemy',
        status: 'completed',
        completion_date: '2024-03-15',
        hours: 24,
        skills: ['React', 'JavaScript']
      },
      {
        title: 'Cloud Security Best Practices',
        provider: 'Coursera',
        status: 'in-progress',
        completion_date: null,
        hours: 16,
        skills: ['Security', 'Cloud']
      },
      {
        title: 'Leadership Development',
        provider: 'Internal',
        status: 'pending',
        completion_date: null,
        hours: 20,
        skills: ['Leadership', 'Management']
      }
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

  const handleExportResume = () => {
    alert('Exporting resume as PDF...');
  };

  const handleViewDocument = (documentName) => {
    alert(`Viewing document: ${documentName}`);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content enhanced-profile-container">
          {/* Page Header */}
          <div className="enhanced-page-header">
            <div className="enhanced-header-content">
              <h1>👤 My Enhanced Profile</h1>
              <p>Manage your personal information, career development, and settings</p>
            </div>
            <div className="enhanced-header-actions">
              <button onClick={handleExportResume} className="btn-secondary">
                📄 Export Resume
              </button>
              <button onClick={handleDownloadProfile} className="btn-secondary">
                📥 Export Profile
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary"
              >
                {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
              </button>
            </div>
          </div>

          <div className="enhanced-profile-wrapper">
            <div className="enhanced-profile-main">
              {/* Profile Header Card */}
              <div className="enhanced-profile-header-card">
                <div className="enhanced-profile-avatar-large">
                  {employeeData.first_name?.[0]}{employeeData.last_name?.[0]}
                </div>
                <div className="enhanced-profile-header-info">
                  <h2>{employeeData.first_name} {employeeData.last_name}</h2>
                  <p className="enhanced-profile-position">{employeeData.position}</p>
                  <p className="enhanced-profile-department">🏢 {employeeData.department}</p>
                  <div className="enhanced-profile-meta">
                    <span>🆔 {employeeData.employee_id}</span>
                    <span>📅 Joined {new Date(employeeData.hire_date).toLocaleDateString()}</span>
                    <span>📍 {employeeData.work_location}</span>
                    <span>💰 {employeeData.salary}</span>
                  </div>
                  <div className="enhanced-profile-quick-stats">
                    <div className="enhanced-quick-stat">
                      <h4>22</h4>
                      <p>Leave Days</p>
                    </div>
                    <div className="enhanced-quick-stat">
                      <h4>180</h4>
                      <p>Hours/Month</p>
                    </div>
                    <div className="enhanced-quick-stat">
                      <h4>4.7</h4>
                      <p>Performance</p>
                    </div>
                    <div className="enhanced-quick-stat">
                      <h4>12</h4>
                      <p>Trainings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="enhanced-tab-navigation">
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  👤 Personal Info
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'employment' ? 'active' : ''}`}
                  onClick={() => setActiveTab('employment')}
                >
                  💼 Employment
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('skills')}
                >
                  🎯 Skills & Certs
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  📊 Projects
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'performance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('performance')}
                >
                  ⭐ Performance
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
                  onClick={() => setActiveTab('goals')}
                >
                  🎯 Goals
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'training' ? 'active' : ''}`}
                  onClick={() => setActiveTab('training')}
                >
                  🎓 Training
                </button>
                <button 
                  className={`enhanced-tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  📁 Documents
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Personal Information Tab */}
                {activeTab === 'personal' && (
                  <div className="enhanced-dashboard-section">
                    <h2>👤 Personal Information</h2>
                    <div className="enhanced-form-grid">
                      <div className="enhanced-form-group">
                        <label>First Name</label>
                        <input 
                          type="text" 
                          value={employeeData.first_name} 
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Last Name</label>
                        <input 
                          type="text" 
                          value={employeeData.last_name} 
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          value={employeeData.email} 
                          disabled 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          defaultValue={employeeData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Date of Birth</label>
                        <input 
                          type="date" 
                          value={employeeData.date_of_birth} 
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Employee ID</label>
                        <input 
                          type="text" 
                          value={employeeData.employee_id} 
                          disabled 
                          className="enhanced-form-input"
                        />
                      </div>
                    </div>

                    <div className="enhanced-form-group full-width">
                      <label>Home Address</label>
                      <textarea 
                        name="address"
                        defaultValue={employeeData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        rows="3"
                        className="enhanced-form-textarea"
                      />
                    </div>

                    <h3 className="enhanced-section-subtitle">🔴 Emergency Contact</h3>
                    <div className="enhanced-form-grid">
                      <div className="enhanced-form-group">
                        <label>Contact Name</label>
                        <input 
                          type="text" 
                          name="emergency_contact"
                          defaultValue={employeeData.emergency_contact}
                          onChange={handleInputChange}
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                      <div className="enhanced-form-group">
                        <label>Contact Phone</label>
                        <input 
                          type="tel" 
                          name="emergency_phone"
                          defaultValue={employeeData.emergency_phone}
                          onChange={handleInputChange}
                          disabled={!isEditing} 
                          className="enhanced-form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Employment Details Tab */}
                {activeTab === 'employment' && (
                  <div className="enhanced-dashboard-section">
                    <h2>💼 Employment Details</h2>
                    <div className="enhanced-info-grid">
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Department</span>
                        <span className="enhanced-info-value">{employeeData.department}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Position</span>
                        <span className="enhanced-info-value">{employeeData.position}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Employment Type</span>
                        <span className="enhanced-info-value">{employeeData.employment_type}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Work Location</span>
                        <span className="enhanced-info-value">{employeeData.work_location}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Hire Date</span>
                        <span className="enhanced-info-value">{new Date(employeeData.hire_date).toLocaleDateString()}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Salary</span>
                        <span className="enhanced-info-value">{employeeData.salary}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Manager</span>
                        <span className="enhanced-info-value">{employeeData.manager}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Team</span>
                        <span className="enhanced-info-value">{employeeData.team}</span>
                      </div>
                    </div>

                    <h3 className="enhanced-section-subtitle">Reporting Structure</h3>
                    <div className="enhanced-info-grid">
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Reports To</span>
                        <span className="enhanced-info-value">{employeeData.reports_to}</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Direct Reports</span>
                        <span className="enhanced-info-value">5 Team Members</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Peer Groups</span>
                        <span className="enhanced-info-value">Engineering Leads</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Career Level</span>
                        <span className="enhanced-info-value">Senior IC</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills & Certifications Tab */}
                {activeTab === 'skills' && (
                  <div className="enhanced-dashboard-section">
                    <h2>🎯 Skills & Certifications</h2>
                    <h3 className="enhanced-section-subtitle">Technical Skills</h3>
                    <div className="enhanced-skills-container">
                      {employeeData.skills.map((skill, index) => (
                        <span key={index} className="enhanced-skill-badge">{skill}</span>
                      ))}
                    </div>

                    <h3 className="enhanced-section-subtitle">Certifications</h3>
                    <div className="enhanced-certifications-list">
                      {employeeData.certifications.map((cert, index) => (
                        <div key={index} className="enhanced-certification-item">
                          <span className="enhanced-cert-icon">🎖️</span>
                          <span className="enhanced-cert-name">{cert}</span>
                        </div>
                      ))}
                    </div>

                    <h3 className="enhanced-section-subtitle">Skill Proficiency</h3>
                    <div className="enhanced-info-grid">
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Frontend Development</span>
                        <div className="enhanced-progress-bar">
                          <div className="enhanced-progress-fill" style={{width: '90%'}}></div>
                        </div>
                        <span className="enhanced-info-value">Expert</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Backend Development</span>
                        <div className="enhanced-progress-bar">
                          <div className="enhanced-progress-fill" style={{width: '75%'}}></div>
                        </div>
                        <span className="enhanced-info-value">Advanced</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">Cloud Technologies</span>
                        <div className="enhanced-progress-bar">
                          <div className="enhanced-progress-fill" style={{width: '80%'}}></div>
                        </div>
                        <span className="enhanced-info-value">Advanced</span>
                      </div>
                      <div className="enhanced-info-item">
                        <span className="enhanced-info-label">DevOps</span>
                        <div className="enhanced-progress-bar">
                          <div className="enhanced-progress-fill" style={{width: '65%'}}></div>
                        </div>
                        <span className="enhanced-info-value">Intermediate</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="enhanced-dashboard-section">
                    <h2>📊 Active Projects</h2>
                    <div className="enhanced-projects-grid">
                      {employeeData.projects.map((project, index) => (
                        <div key={index} className="enhanced-project-card">
                          <h4>{project.name}</h4>
                          <p>{project.description}</p>
                          <p><strong>Role:</strong> {project.role}</p>
                          <span className={`enhanced-project-status ${project.status}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="enhanced-dashboard-section">
                    <h2>⭐ Performance Overview</h2>
                    <div className="enhanced-performance-grid">
                      <div className="enhanced-performance-card">
                        <div className="enhanced-rating-display">{employeeData.performance.current_rating}</div>
                        <div className="enhanced-rating-label">Current Rating</div>
                        <div className="enhanced-rating-description">Based on Q2 2024 review</div>
                      </div>
                      <div className="enhanced-performance-card">
                        <div className="enhanced-rating-display">+0.2</div>
                        <div className="enhanced-rating-label">Improvement</div>
                        <div className="enhanced-rating-description">From previous review</div>
                      </div>
                      <div className="enhanced-performance-card">
                        <div className="enhanced-rating-display">95%</div>
                        <div className="enhanced-rating-label">Goal Achievement</div>
                        <div className="enhanced-rating-description">Of annual targets</div>
                      </div>
                    </div>

                    <h3 className="enhanced-section-subtitle">Recent Reviews</h3>
                    <div className="enhanced-goals-container">
                      {employeeData.performance.reviews.map((review, index) => (
                        <div key={index} className="enhanced-goal-card">
                          <div className="enhanced-goal-header">
                            <h4>Review by {review.reviewer}</h4>
                            <span className="enhanced-goal-date">{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                          <div className="enhanced-goal-content">
                            <div className="enhanced-goal-section">
                              <h5>Rating: {review.rating}/5</h5>
                            </div>
                            <div className="enhanced-goal-section">
                              <h5>Comments</h5>
                              <p>{review.comments}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Goals Tab */}
                {activeTab === 'goals' && (
                  <div className="enhanced-dashboard-section">
                    <h2>🎯 Goals & Objectives</h2>
                    <div className="enhanced-goals-container">
                      {employeeData.goals.map((goal, index) => (
                        <div key={index} className="enhanced-goal-card">
                          <div className="enhanced-goal-header">
                            <h4>{goal.title}</h4>
                            <span className="enhanced-goal-date">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="enhanced-goal-content">
                            <div className="enhanced-goal-section">
                              <h5>Description</h5>
                              <p>{goal.description}</p>
                            </div>
                            <div className="enhanced-goal-section">
                              <h5>Status: {goal.status}</h5>
                              <p>Priority: {goal.priority}</p>
                            </div>
                          </div>
                          <div className="enhanced-goal-progress">
                            <div className="enhanced-progress-bar">
                              <div 
                                className="enhanced-progress-fill" 
                                style={{width: `${goal.progress}%`}}
                              ></div>
                            </div>
                            <div className="enhanced-progress-text">{goal.progress}% Complete</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Training Tab */}
                {activeTab === 'training' && (
                  <div className="enhanced-dashboard-section">
                    <h2>🎓 Training & Development</h2>
                    <div className="enhanced-training-grid">
                      {employeeData.training.map((training, index) => (
                        <div key={index} className="enhanced-training-card">
                          <div className="enhanced-training-header">
                            <h4>{training.title}</h4>
                            <span className={`enhanced-training-status ${training.status}`}>
                              {training.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="enhanced-training-details">
                            <div className="enhanced-training-detail">
                              <span className="enhanced-training-label">Provider:</span>
                              <span className="enhanced-training-value">{training.provider}</span>
                            </div>
                            <div className="enhanced-training-detail">
                              <span className="enhanced-training-label">Hours:</span>
                              <span className="enhanced-training-value">{training.hours}</span>
                            </div>
                            {training.completion_date && (
                              <div className="enhanced-training-detail">
                                <span className="enhanced-training-label">Completed:</span>
                                <span className="enhanced-training-value">
                                  {new Date(training.completion_date).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                          <p className="enhanced-training-description">
                            Skills: {training.skills.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div className="enhanced-dashboard-section">
                    <h2>📁 Documents & Files</h2>
                    <div className="enhanced-documents-list">
                      <div className="enhanced-document-item">
                        <span className="enhanced-doc-icon">📝</span>
                        <div className="enhanced-doc-info">
                          <strong>Employment Contract</strong>
                          <small>Uploaded: Jan 15, 2023</small>
                        </div>
                        <button 
                          className="btn-secondary small"
                          onClick={() => handleViewDocument('Employment Contract')}
                        >
                          👁️ View
                        </button>
                      </div>
                      <div className="enhanced-document-item">
                        <span className="enhanced-doc-icon">📝</span>
                        <div className="enhanced-doc-info">
                          <strong>Tax Documents (W-2)</strong>
                          <small>Uploaded: Jan 1, 2024</small>
                        </div>
                        <button 
                          className="btn-secondary small"
                          onClick={() => handleViewDocument('Tax Documents (W-2)')}
                        >
                          👁️ View
                        </button>
                      </div>
                      <div className="enhanced-document-item">
                        <span className="enhanced-doc-icon">📝</span>
                        <div className="enhanced-doc-info">
                          <strong>Benefits Enrollment</strong>
                          <small>Uploaded: Jan 15, 2023</small>
                        </div>
                        <button 
                          className="btn-secondary small"
                          onClick={() => handleViewDocument('Benefits Enrollment')}
                        >
                          👁️ View
                        </button>
                      </div>
                      <div className="enhanced-document-item">
                        <span className="enhanced-doc-icon">🎓</span>
                        <div className="enhanced-doc-info">
                          <strong>AWS Certification</strong>
                          <small>Uploaded: Mar 20, 2024</small>
                        </div>
                        <button 
                          className="btn-secondary small"
                          onClick={() => handleViewDocument('AWS Certification')}
                        >
                          👁️ View
                        </button>
                      </div>
                      <div className="enhanced-document-item">
                        <span className="enhanced-doc-icon">🎓</span>
                        <div className="enhanced-doc-info">
                          <strong>Scrum Master Certificate</strong>
                          <small>Uploaded: Jun 5, 2023</small>
                        </div>
                        <button 
                          className="btn-secondary small"
                          onClick={() => handleViewDocument('Scrum Master Certificate')}
                        >
                          👁️ View
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {isEditing && (
                  <div className="enhanced-form-actions">
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
              <div className="enhanced-dashboard-section">
                <h2>🔒 Security Settings</h2>
                <div className="enhanced-security-options">
                  <div className="enhanced-security-item">
                    <div className="enhanced-security-info">
                      <strong>Password</strong>
                      <p>Last changed: Never</p>
                    </div>
                    <button onClick={handleChangePassword} className="btn-secondary">
                      Change Password
                    </button>
                  </div>
                  <div className="enhanced-security-item">
                    <div className="enhanced-security-info">
                      <strong>Two-Factor Authentication</strong>
                      <p>Not enabled</p>
                    </div>
                    <button className="btn-secondary">
                      Enable 2FA
                    </button>
                  </div>
                  <div className="enhanced-security-item">
                    <div className="enhanced-security-info">
                      <strong>Login History</strong>
                      <p>Last login: Today at 09:15 AM</p>
                    </div>
                    <button className="btn-secondary">
                      View History
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Sidebar */}
            <div className="enhanced-profile-sidebar">
              <div className="enhanced-sidebar-section">
                <h3>📞 Contact Information</h3>
                <div className="enhanced-contact-info">
                  <div className="enhanced-contact-item">
                    <div className="enhanced-contact-icon">📱</div>
                    <div className="enhanced-contact-details">
                      <div className="enhanced-contact-label">Phone</div>
                      <div className="enhanced-contact-value">{employeeData.phone}</div>
                    </div>
                  </div>
                  <div className="enhanced-contact-item">
                    <div className="enhanced-contact-icon">✉️</div>
                    <div className="enhanced-contact-details">
                      <div className="enhanced-contact-label">Email</div>
                      <div className="enhanced-contact-value">{employeeData.email}</div>
                    </div>
                  </div>
                  <div className="enhanced-contact-item">
                    <div className="enhanced-contact-icon">🏢</div>
                    <div className="enhanced-contact-details">
                      <div className="enhanced-contact-label">Department</div>
                      <div className="enhanced-contact-value">{employeeData.department}</div>
                    </div>
                  </div>
                  <div className="enhanced-contact-item">
                    <div className="enhanced-contact-icon">👨‍💼</div>
                    <div className="enhanced-contact-details">
                      <div className="enhanced-contact-label">Manager</div>
                      <div className="enhanced-contact-value">{employeeData.manager}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="enhanced-sidebar-section">
                <h3>🎯 Key Skills</h3>
                <div className="enhanced-skills-container">
                  {employeeData.skills.slice(0, 8).map((skill, index) => (
                    <span key={index} className="enhanced-skill-badge">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="enhanced-sidebar-section">
                <h3>🎖️ Certifications</h3>
                <div className="enhanced-certifications-list">
                  {employeeData.certifications.map((cert, index) => (
                    <div key={index} className="enhanced-certification-item">
                      <span className="enhanced-cert-icon">🎖️</span>
                      <span className="enhanced-cert-name">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="enhanced-sidebar-section">
                <h3>📊 Performance</h3>
                <div className="enhanced-info-grid">
                  <div className="enhanced-info-item">
                    <span className="enhanced-info-label">Current Rating</span>
                    <span className="enhanced-info-value">{employeeData.performance.current_rating}/5</span>
                  </div>
                  <div className="enhanced-info-item">
                    <span className="enhanced-info-label">Goal Progress</span>
                    <span className="enhanced-info-value">85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedEmployeeProfile;