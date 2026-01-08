import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import '../../styles/enhanced-global.css';
import './PerformanceTracking.css';

const PerformanceTracking = () => {
  const { id } = useParams(); // Get the review ID from the route parameter
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [kpiData, setKpiData] = useState([]);
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalForm, setGoalForm] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    category: 'individual'
  });

  // Mock data initialization
  useEffect(() => {
    // Mock goals data
    const mockGoals = [
      {
        id: 1,
        title: 'Complete HR Portal MVP',
        description: 'Deliver fully functional HR Portal with all core features including employee management, payroll, and reporting.',
        status: 'in-progress',
        progress: 85,
        deadline: '2024-06-30',
        priority: 'high',
        category: 'individual',
        createdAt: '2024-01-15',
        updatedAt: '2024-06-10'
      },
      {
        id: 2,
        title: 'Obtain AWS Certification',
        description: 'Complete AWS Certified Developer certification to enhance cloud computing skills.',
        status: 'in-progress',
        progress: 60,
        deadline: '2024-08-15',
        priority: 'medium',
        category: 'skill-development',
        createdAt: '2024-03-01',
        updatedAt: '2024-06-10'
      },
      {
        id: 3,
        title: 'Mentor Junior Developers',
        description: 'Provide guidance and training to 3 junior team members to improve their technical skills.',
        status: 'not-started',
        progress: 0,
        deadline: '2024-12-31',
        priority: 'low',
        category: 'leadership',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-10'
      },
      {
        id: 4,
        title: 'Improve Code Quality',
        description: 'Reduce bug reports by 30% through better testing and code review practices.',
        status: 'completed',
        progress: 100,
        deadline: '2024-05-31',
        priority: 'high',
        category: 'individual',
        createdAt: '2024-01-01',
        updatedAt: '2024-05-28'
      }
    ];

    // Mock reviews data
    const mockReviews = [
      {
        id: 1,
        title: 'Q2 2024 Performance Review',
        rating: 4.8,
        reviewer: 'Sarah Johnson',
        date: '2024-06-15',
        comments: 'Exceptional work on the HR Portal project. Strong technical skills and leadership. Exceeded expectations in all areas.',
        strengths: ['Technical Excellence', 'Team Collaboration', 'Problem Solving'],
        improvements: ['Time Management', 'Documentation'],
        goals: ['Continue mentoring junior developers', 'Lead next major project']
      },
      {
        id: 2,
        title: 'Q1 2024 Performance Review',
        rating: 4.5,
        reviewer: 'Sarah Johnson',
        date: '2024-03-20',
        comments: 'Consistent performer with excellent problem-solving abilities. Strong contribution to team projects.',
        strengths: ['Reliability', 'Communication', 'Technical Skills'],
        improvements: ['Proactive Communication', 'Cross-team Collaboration'],
        goals: ['Improve code quality metrics', 'Take on more leadership responsibilities']
      },
      {
        id: 3,
        title: 'Q4 2023 Performance Review',
        rating: 4.2,
        reviewer: 'Sarah Johnson',
        date: '2023-12-15',
        comments: 'Solid performance with good technical contributions. Room for growth in leadership and initiative.',
        strengths: ['Technical Competence', 'Punctuality', 'Team Player'],
        improvements: ['Leadership', 'Innovation'],
        goals: ['Lead a small project', 'Improve presentation skills']
      }
    ];

    // Mock KPI data
    const mockKpiData = [
      {
        id: 1,
        name: 'Project Completion Rate',
        value: '92%',
        target: '90%',
        trend: 'up',
        change: '+5%',
        icon: '✅'
      },
      {
        id: 2,
        name: 'Code Quality Score',
        value: '4.7/5',
        target: '4.5',
        trend: 'up',
        change: '+0.3',
        icon: '⭐'
      },
      {
        id: 3,
        name: 'Peer Feedback',
        value: '4.6/5',
        target: '4.3',
        trend: 'up',
        change: '+0.4',
        icon: '👥'
      },
      {
        id: 4,
        name: 'Training Hours',
        value: '42h',
        target: '40h',
        trend: 'up',
        change: '+12h',
        icon: '🎓'
      },
      {
        id: 5,
        name: 'Goal Achievement',
        value: '85%',
        target: '80%',
        trend: 'up',
        change: '+8%',
        icon: '🎯'
      },
      {
        id: 6,
        name: 'Attendance',
        value: '98%',
        target: '95%',
        trend: 'up',
        change: '+3%',
        icon: '📅'
      }
    ];

    setGoals(mockGoals);
    setReviews(mockReviews);
    setKpiData(mockKpiData);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle goal form submission
  const handleGoalSubmit = (e) => {
    e.preventDefault();
    
    if (selectedGoal) {
      // Update existing goal
      setGoals(prev => prev.map(goal => 
        goal.id === selectedGoal.id 
          ? { ...goal, ...goalForm, updatedAt: new Date().toISOString().split('T')[0] }
          : goal
      ));
      setSelectedGoal(null);
    } else {
      // Create new goal
      const newGoal = {
        id: goals.length + 1,
        ...goalForm,
        status: 'not-started',
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setGoals(prev => [...prev, newGoal]);
    }
    
    setGoalForm({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      category: 'individual'
    });
    setShowCreateGoal(false);
  };

  // Handle goal edit
  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setGoalForm({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      priority: goal.priority,
      category: goal.category
    });
    setShowCreateGoal(true);
  };

  // Handle goal delete
  const handleDeleteGoal = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  // Get priority display name
  const getPriorityDisplayName = (priority) => {
    const priorityMap = {
      high: 'High',
      medium: 'Medium',
      low: 'Low'
    };
    return priorityMap[priority] || priority;
  };

  // Get priority class
  const getPriorityClass = (priority) => {
    return `performance-goal-priority ${priority}`;
  };

  // Get status display name
  const getStatusDisplayName = (status) => {
    const statusMap = {
      'not-started': 'Not Started',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    return statusMap[status] || status;
  };

  // Get days until deadline
  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get overall performance rating
  const getOverallRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  // Get completed goals count
  const getCompletedGoalsCount = () => {
    return goals.filter(goal => goal.status === 'completed').length;
  };

  // Get in-progress goals count
  const getInProgressGoalsCount = () => {
    return goals.filter(goal => goal.status === 'in-progress').length;
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content">
          <div className="page-header">
            <div>
              <h1>Performance Tracking</h1>
              <p>Manage goals, track progress, and view performance reviews</p>
            </div>
          </div>

          {/* Performance Overview Cards */}
          <div className="performance-overview-grid">
            <div className="performance-card">
              <div className="performance-card-header">
                <span className="performance-card-icon">⭐</span>
                <h3>Overall Rating</h3>
              </div>
              <div className="performance-card-content">
                <span className="performance-rating">{getOverallRating()}/5</span>
              </div>
            </div>
            
            <div className="performance-card">
              <div className="performance-card-header">
                <span className="performance-card-icon">🎯</span>
                <h3>Goals Completed</h3>
              </div>
              <div className="performance-card-content">
                <span className="performance-value">{getCompletedGoalsCount()}</span>
                <span className="performance-subtext">of {goals.length} goals</span>
              </div>
            </div>
            
            <div className="performance-card">
              <div className="performance-card-header">
                <span className="performance-card-icon">📊</span>
                <h3>In Progress</h3>
              </div>
              <div className="performance-card-content">
                <span className="performance-value">{getInProgressGoalsCount()}</span>
                <span className="performance-subtext">active goals</span>
              </div>
            </div>
            
            <div className="performance-card">
              <div className="performance-card-header">
                <span className="performance-card-icon">📝</span>
                <h3>Reviews</h3>
              </div>
              <div className="performance-card-content">
                <span className="performance-value">{reviews.length}</span>
                <span className="performance-subtext">performance reviews</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="performance-tab-navigation">
            <button 
              className={`performance-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`performance-tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              Goals & Objectives
            </button>
            <button 
              className={`performance-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Performance Reviews
            </button>
            <button 
              className={`performance-tab-btn ${activeTab === 'kpi' ? 'active' : ''}`}
              onClick={() => setActiveTab('kpi')}
            >
              KPI Dashboard
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="performance-overview-content">
              <div className="performance-section">
                <h2>Recent Goals Progress</h2>
                {goals.length > 0 ? (
                  <div className="performance-goals-container">
                    {goals.slice(0, 3).map(goal => (
                      <div key={goal.id} className="performance-goal-card">
                        <div className="performance-goal-header">
                          <h3>{goal.title}</h3>
                          <span className={`performance-goal-status ${goal.status}`}>
                            {getStatusDisplayName(goal.status)}
                          </span>
                        </div>
                        
                        <div className="performance-goal-progress">
                          <div className="performance-progress-bar">
                            <div 
                              className="performance-progress-fill" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <span className="performance-progress-text">{goal.progress}%</span>
                        </div>
                        
                        <div className="performance-goal-details">
                          <div className="performance-goal-meta">
                            <span className={getPriorityClass(goal.priority)}>
                              {getPriorityDisplayName(goal.priority)}
                            </span>
                            <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          </div>
                          <p>{goal.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="performance-empty-state">
                    <p>No goals found. Create your first goal to get started.</p>
                  </div>
                )}
              </div>
              
              <div className="performance-section">
                <h2>Recent Performance Reviews</h2>
                {reviews.length > 0 ? (
                  <div className="performance-reviews-grid">
                    {reviews.slice(0, 2).map(review => (
                      <div key={review.id} className="performance-review-card">
                        <div className="performance-review-header">
                          <h3>{review.title}</h3>
                          <span className="performance-review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="performance-review-rating">{review.rating}/5</div>
                        <div className="performance-review-rating-label">Performance Rating</div>
                        
                        <p className="performance-review-comments">"{review.comments}"</p>
                        
                        <div className="performance-review-reviewer">
                          Reviewed by: {review.reviewer}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="performance-empty-state">
                    <p>No performance reviews available.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div className="performance-goals-content">
              <div className="performance-section-header">
                <h2>Performance Goals</h2>
                <button 
                  className="btn-primary"
                  onClick={() => setShowCreateGoal(true)}
                >
                  + New Goal
                </button>
              </div>
              
              {goals.length > 0 ? (
                <div className="performance-goals-grid">
                  {goals.map(goal => (
                    <div key={goal.id} className="performance-goal-item">
                      <div className="performance-goal-info">
                        <h3>{goal.title}</h3>
                        <p>{goal.description}</p>
                        
                        <div className="performance-goal-meta">
                          <span className={getPriorityClass(goal.priority)}>
                            {getPriorityDisplayName(goal.priority)}
                          </span>
                          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                          <span className={`performance-goal-status ${goal.status}`}>
                            {getStatusDisplayName(goal.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="performance-goal-actions">
                        <div className="performance-goal-progress-small">
                          <div className="performance-progress-bar-small">
                            <div 
                              className="performance-progress-fill-small" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <span>{goal.progress}%</span>
                        </div>
                        
                        <div className="performance-action-buttons">
                          <button 
                            className="btn-secondary small"
                            onClick={() => handleEditGoal(goal)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn-error small"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="performance-empty-state">
                  <p>No goals found. Create your first goal to get started.</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setShowCreateGoal(true)}
                  >
                    Create New Goal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="performance-reviews-content">
              <div className="performance-section-header">
                <h2>Performance Reviews</h2>
              </div>
              
              {reviews.length > 0 ? (
                <div className="performance-reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="performance-review-item">
                      <div className="performance-review-summary">
                        <h3>{review.title}</h3>
                        <div className="performance-review-meta">
                          <span className="performance-review-date">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                          <span className="performance-review-rating-badge">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                      
                      <div className="performance-review-details">
                        <p className="performance-review-comments">"{review.comments}"</p>
                        
                        <div className="performance-review-section">
                          <h4>Strengths</h4>
                          <ul>
                            {review.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="performance-review-section">
                          <h4>Areas for Improvement</h4>
                          <ul>
                            {review.improvements.map((improvement, index) => (
                              <li key={index}>{improvement}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="performance-review-section">
                          <h4>Future Goals</h4>
                          <ul>
                            {review.goals.map((goal, index) => (
                              <li key={index}>{goal}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="performance-review-footer">
                        <span>Reviewed by: {review.reviewer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="performance-empty-state">
                  <p>No performance reviews available.</p>
                </div>
              )}
            </div>
          )}

          {/* KPI Tab */}
          {activeTab === 'kpi' && (
            <div className="performance-kpi-content">
              <div className="performance-section-header">
                <h2>KPI Dashboard</h2>
              </div>
              
              <div className="performance-kpi-grid">
                {kpiData.map(kpi => (
                  <div key={kpi.id} className="performance-kpi-card">
                    <div className="performance-kpi-header">
                      <span className="performance-kpi-icon">{kpi.icon}</span>
                      <h3>{kpi.name}</h3>
                    </div>
                    
                    <div className="performance-kpi-content">
                      <span className="performance-kpi-value">{kpi.value}</span>
                      <span className="performance-kpi-target">Target: {kpi.target}</span>
                    </div>
                    
                    <div className="performance-kpi-footer">
                      <span className={`performance-kpi-trend ${kpi.trend}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="performance-charts-section">
                <div className="performance-chart-container">
                  <div className="performance-chart-placeholder">
                    <div className="performance-chart-placeholder-icon">📊</div>
                    <p>Performance Trends</p>
                    <small>Historical performance metrics and trends</small>
                  </div>
                </div>
                
                <div className="performance-chart-container">
                  <div className="performance-chart-placeholder">
                    <div className="performance-chart-placeholder-icon">👥</div>
                    <p>Peer Comparison</p>
                    <small>Performance comparison with team members</small>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Create/Edit Goal Modal */}
          {showCreateGoal && (
            <div className="modal-overlay" onClick={() => {
              setShowCreateGoal(false);
              setSelectedGoal(null);
              setGoalForm({
                title: '',
                description: '',
                deadline: '',
                priority: 'medium',
                category: 'individual'
              });
            }}>
              <div className="modal performance-goal-modal" onClick={(e) => e.stopPropagation()}>
                <div className="performance-modal-header">
                  <h2 className="performance-modal-title">
                    {selectedGoal ? 'Edit Goal' : 'Create New Goal'}
                  </h2>
                  <button 
                    className="performance-close-btn"
                    onClick={() => {
                      setShowCreateGoal(false);
                      setSelectedGoal(null);
                      setGoalForm({
                        title: '',
                        description: '',
                        deadline: '',
                        priority: 'medium',
                        category: 'individual'
                      });
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleGoalSubmit} className="performance-goal-form">
                  <div className="performance-form-group">
                    <label className="performance-form-label">Goal Title</label>
                    <input
                      type="text"
                      name="title"
                      value={goalForm.title}
                      onChange={handleInputChange}
                      className="performance-form-input"
                      required
                    />
                  </div>
                  
                  <div className="performance-form-group">
                    <label className="performance-form-label">Description</label>
                    <textarea
                      name="description"
                      value={goalForm.description}
                      onChange={handleInputChange}
                      className="performance-form-textarea"
                      rows="3"
                      required
                    />
                  </div>
                  
                  <div className="performance-form-row">
                    <div className="performance-form-group">
                      <label className="performance-form-label">Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        value={goalForm.deadline}
                        onChange={handleInputChange}
                        className="performance-form-input"
                        required
                      />
                    </div>
                    
                    <div className="performance-form-group">
                      <label className="performance-form-label">Priority</label>
                      <select
                        name="priority"
                        value={goalForm.priority}
                        onChange={handleInputChange}
                        className="performance-form-select"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="performance-form-group">
                    <label className="performance-form-label">Category</label>
                    <select
                      name="category"
                      value={goalForm.category}
                      onChange={handleInputChange}
                      className="performance-form-select"
                    >
                      <option value="individual">Individual</option>
                      <option value="team">Team</option>
                      <option value="department">Department</option>
                      <option value="company">Company</option>
                      <option value="skill-development">Skill Development</option>
                      <option value="leadership">Leadership</option>
                      <option value="innovation">Innovation</option>
                    </select>
                  </div>
                  
                  <div className="performance-form-actions">
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => {
                        setShowCreateGoal(false);
                        setSelectedGoal(null);
                        setGoalForm({
                          title: '',
                          description: '',
                          deadline: '',
                          priority: 'medium',
                          category: 'individual'
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary">
                      {selectedGoal ? 'Update Goal' : 'Create Goal'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PerformanceTracking;