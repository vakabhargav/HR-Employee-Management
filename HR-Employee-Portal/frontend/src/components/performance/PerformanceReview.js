import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import { performanceAPI } from '../../services/api';
import './PerformanceReview.css';

const PerformanceReview = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: performanceData, isLoading, error } = useQuery({
    queryKey: ['performance', activeTab, selectedEmployee],
    queryFn: () => performanceAPI.getPerformanceReviews({ 
      type: activeTab, 
      employee: selectedEmployee 
    }),
  });

  // Mock data for demonstration
  const performanceReviews = performanceData?.data || [
    {
      id: 1,
      employee_name: 'Mike Davis',
      employee_id: 'EMP001',
      department: 'Engineering',
      review_date: '2024-01-15',
      rating: 4,
      reviewer: 'Sarah Johnson',
      status: 'completed',
      goals: 'Improve code quality and team collaboration',
      achievements: 'Successfully delivered Project Alpha ahead of schedule',
      areas_for_improvement: 'Documentation and knowledge sharing'
    },
    {
      id: 2,
      employee_name: 'Emily Wilson',
      employee_id: 'EMP002',
      department: 'Design',
      review_date: '2024-01-10',
      rating: 5,
      reviewer: 'Sarah Johnson',
      status: 'completed',
      goals: 'Enhance UX research skills',
      achievements: 'Redesigned customer portal with 40% better user feedback',
      areas_for_improvement: 'Cross-functional collaboration'
    },
    {
      id: 3,
      employee_name: 'David Brown',
      employee_id: 'EMP003',
      department: 'Engineering',
      review_date: '2024-01-20',
      rating: 3,
      reviewer: 'Sarah Johnson',
      status: 'pending',
      goals: 'Improve code review participation',
      achievements: 'Fixed critical production bugs',
      areas_for_improvement: 'Code quality and testing coverage'
    }
  ];

  const performanceStats = {
    totalReviews: performanceReviews.length,
    averageRating: performanceReviews.reduce((sum, review) => sum + review.rating, 0) / performanceReviews.length,
    completedReviews: performanceReviews.filter(review => review.status === 'completed').length,
    pendingReviews: performanceReviews.filter(review => review.status === 'pending').length
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#28a745';
    if (rating >= 3.5) return '#ffc107';
    if (rating >= 2.5) return '#fd7e14';
    return '#dc3545';
  };

  const getStatusBadge = (status) => {
    const config = {
      completed: { class: 'completed', label: 'Completed' },
      pending: { class: 'pending', label: 'Pending' },
      draft: { class: 'draft', label: 'Draft' }
    };
    const configItem = config[status] || config.pending;
    return <span className={`status-badge ${configItem.class}`}>{configItem.label}</span>;
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  // Handle View button
  const handleView = (review) => {
    setSelectedReview(review);
    setShowViewModal(true);
  };

  // Handle Edit button
  const handleEdit = (review) => {
    setSelectedReview(review);
    setShowEditModal(true);
  };

  // Handle New Review button
  const handleNewReview = () => {
    navigate('/performance/new');
  };

  // Handle Quick Actions
  const handleScheduleReview = () => {
    alert('Review scheduling feature coming soon!');
  };

  const handleGenerateReports = () => {
    const reportData = {
      reviews: performanceReviews,
      stats: performanceStats,
      generatedDate: new Date().toLocaleDateString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Performance-Report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Performance report downloaded successfully!');
  };

  const handleTeamAnalytics = () => {
    navigate('/analytics');
  };

  const handleExportData = () => {
    const csv = [
      ['Employee ID', 'Name', 'Department', 'Review Date', 'Rating', 'Reviewer', 'Status'].join(','),
      ...performanceReviews.map(review => [
        review.employee_id,
        review.employee_name,
        review.department,
        review.review_date,
        review.rating,
        review.reviewer,
        review.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-reviews-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert('Performance data exported successfully!');
  };

  const handleStartReview = (review) => {
    navigate(`/performance/review/${review.id}`);
  };

  const closeModals = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedReview(null);
  };

  if (error) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <main className="main-content">
            <div className="error-state">
              <h2>Error Loading Performance Data</h2>
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
              <h1>Performance Management</h1>
              <p>Track and manage employee performance reviews</p>
            </div>
            <div className="header-controls">
              <select 
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Employees</option>
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="hr">HR</option>
              </select>
              <button 
                className="btn-primary"
                onClick={handleNewReview}
              >
                + New Review
              </button>
            </div>
          </div>

          {/* Performance Statistics */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>{performanceStats.totalReviews}</h3>
                <p>Total Reviews</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <h3>{performanceStats.averageRating.toFixed(1)}</h3>
                <p>Average Rating</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>{performanceStats.completedReviews}</h3>
                <p>Completed</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>{performanceStats.pendingReviews}</h3>
                <p>Pending</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Performance Reviews
            </button>
            <button 
              className={`tab-btn ${activeTab === 'goals' ? 'active' : ''}`}
              onClick={() => setActiveTab('goals')}
            >
              Goals & Objectives
            </button>
            <button 
              className={`tab-btn ${activeTab === 'feedback' ? 'active' : ''}`}
              onClick={() => setActiveTab('feedback')}
            >
              360° Feedback
            </button>
            <button 
              className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </button>
          </div>

          {/* Performance Reviews Table */}
          {activeTab === 'reviews' && (
            <div className="dashboard-section">
              <h2>Performance Reviews</h2>
              
              {isLoading ? (
                <div className="loading-state">Loading performance data...</div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Review Date</th>
                        <th>Rating</th>
                        <th>Reviewer</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceReviews.map(review => (
                        <tr key={review.id}>
                          <td>
                            <div className="employee-cell">
                              <strong>{review.employee_name}</strong>
                              <small>{review.employee_id}</small>
                            </div>
                          </td>
                          <td>{review.department}</td>
                          <td>{new Date(review.review_date).toLocaleDateString()}</td>
                          <td>
                            <div className="rating-display">
                              <span className="stars">{renderStars(review.rating)}</span>
                              <span 
                                className="rating-number"
                                style={{ color: getRatingColor(review.rating) }}
                              >
                                {review.rating}/5
                              </span>
                            </div>
                          </td>
                          <td>{review.reviewer}</td>
                          <td>{getStatusBadge(review.status)}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="btn-secondary small"
                                onClick={() => handleView(review)}
                              >
                                View
                              </button>
                              <button 
                                className="btn-primary small"
                                onClick={() => handleEdit(review)}
                              >
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Goals & Objectives Tab */}
          {activeTab === 'goals' && (
            <div className="dashboard-section">
              <h2>Goals & Objectives</h2>
              <div className="goals-container">
                {performanceReviews.map(review => (
                  <div key={review.id} className="goal-card">
                    <div className="goal-header">
                      <h4>{review.employee_name}</h4>
                      <span className="goal-date">Next Review: {new Date(review.review_date).toLocaleDateString()}</span>
                    </div>
                    <div className="goal-content">
                      <div className="goal-section">
                        <h5>Goals</h5>
                        <p>{review.goals}</p>
                      </div>
                      <div className="goal-section">
                        <h5>Recent Achievements</h5>
                        <p>{review.achievements}</p>
                      </div>
                      <div className="goal-section">
                        <h5>Areas for Improvement</h5>
                        <p>{review.areas_for_improvement}</p>
                      </div>
                    </div>
                    <div className="goal-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(review.rating / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        Progress: {Math.round((review.rating / 5) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="dashboard-section">
            <h2>Performance Tools</h2>
            <div className="quick-actions">
              <button 
                className="action-btn"
                onClick={handleScheduleReview}
              >
                Schedule Review
              </button>
              <button 
                className="action-btn"
                onClick={handleGenerateReports}
              >
                Generate Reports
              </button>
              <button 
                className="action-btn"
                onClick={handleTeamAnalytics}
              >
                Team Analytics
              </button>
              <button 
                className="action-btn"
                onClick={handleExportData}
              >
                Export Data
              </button>
            </div>
          </div>

          {/* Upcoming Reviews */}
          <div className="dashboard-section">
            <h2>Upcoming Reviews</h2>
            <div className="upcoming-reviews">
              {performanceReviews
                .filter(review => review.status === 'pending')
                .map(review => (
                  <div key={review.id} className="upcoming-review-item">
                    <div className="review-info">
                      <strong>{review.employee_name}</strong>
                      <span>{review.department}</span>
                    </div>
                    <div className="review-date">
                      {new Date(review.review_date).toLocaleDateString()}
                    </div>
                    <button 
                      className="btn-primary small"
                      onClick={() => handleStartReview(review)}
                    >
                      Start Review
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </main>
      </div>

      {/* View Modal */}
      {showViewModal && selectedReview && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Performance Review Details</h2>
              <button onClick={closeModals} className="close-btn">×</button>
            </div>
            <div className="modal-content">
              <div className="review-details">
                <div className="detail-row">
                  <strong>Employee:</strong>
                  <span>{selectedReview.employee_name} ({selectedReview.employee_id})</span>
                </div>
                <div className="detail-row">
                  <strong>Department:</strong>
                  <span>{selectedReview.department}</span>
                </div>
                <div className="detail-row">
                  <strong>Review Date:</strong>
                  <span>{new Date(selectedReview.review_date).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <strong>Rating:</strong>
                  <span>{renderStars(selectedReview.rating)} ({selectedReview.rating}/5)</span>
                </div>
                <div className="detail-row">
                  <strong>Reviewer:</strong>
                  <span>{selectedReview.reviewer}</span>
                </div>
                <div className="detail-row">
                  <strong>Status:</strong>
                  {getStatusBadge(selectedReview.status)}
                </div>
                <div className="detail-section">
                  <strong>Goals:</strong>
                  <p>{selectedReview.goals}</p>
                </div>
                <div className="detail-section">
                  <strong>Achievements:</strong>
                  <p>{selectedReview.achievements}</p>
                </div>
                <div className="detail-section">
                  <strong>Areas for Improvement:</strong>
                  <p>{selectedReview.areas_for_improvement}</p>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button onClick={closeModals} className="btn-secondary">Close</button>
              <button onClick={() => { closeModals(); handleEdit(selectedReview); }} className="btn-primary">Edit Review</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedReview && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Performance Review</h2>
              <button onClick={closeModals} className="close-btn">×</button>
            </div>
            <div className="modal-content">
              <form className="review-form">
                <div className="form-group">
                  <label>Employee</label>
                  <input type="text" value={`${selectedReview.employee_name} (${selectedReview.employee_id})`} disabled />
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input type="number" min="1" max="5" defaultValue={selectedReview.rating} />
                </div>
                <div className="form-group">
                  <label>Goals</label>
                  <textarea rows="3" defaultValue={selectedReview.goals}></textarea>
                </div>
                <div className="form-group">
                  <label>Achievements</label>
                  <textarea rows="3" defaultValue={selectedReview.achievements}></textarea>
                </div>
                <div className="form-group">
                  <label>Areas for Improvement</label>
                  <textarea rows="3" defaultValue={selectedReview.areas_for_improvement}></textarea>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select defaultValue={selectedReview.status}>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-actions">
              <button onClick={closeModals} className="btn-secondary">Cancel</button>
              <button onClick={() => { alert('Review updated successfully!'); closeModals(); }} className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceReview;