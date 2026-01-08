import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../common/header';
import { leaveAPI } from '../../services/api';
import './LeaveManagement.css';

const LeaveRequest = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: 'vacation',
    start_date: '',
    end_date: '',
    reason: ''
  });

  const { data: leaveRequests, isLoading } = useQuery({
    queryKey: ['leave-requests'],
    queryFn: leaveAPI.getAll,
  });

  const createMutation = useMutation({
    mutationFn: leaveAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['leave-requests']);
      setShowForm(false);
      setFormData({
        leave_type: 'vacation',
        start_date: '',
        end_date: '',
        reason: ''
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'pending', label: 'Pending' },
      approved: { class: 'approved', label: 'Approved' },
      rejected: { class: 'rejected', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        
        <main className="main-content">
          <div className="page-header">
            <h1>Leave Management</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              New Leave Request
            </button>
          </div>

          {showForm && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h2>New Leave Request</h2>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="close-btn"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="leave-form">
                  <div className="form-group">
                    <label>Leave Type</label>
                    <select
                      name="leave_type"
                      value={formData.leave_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="vacation">Vacation</option>
                      <option value="sick">Sick Leave</option>
                      <option value="personal">Personal</option>
                      <option value="maternity">Maternity</option>
                      <option value="paternity">Paternity</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Date</label>
                      <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>End Date</label>
                      <input
                        type="date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Reason</label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={createMutation.isLoading}
                    >
                      {createMutation.isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="leave-requests">
            <h2>My Leave Requests</h2>
            
            {isLoading ? (
              <div>Loading leave requests...</div>
            ) : (
              <div className="requests-grid">
                {leaveRequests?.data?.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.leave_type}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="request-dates">
                      <span>
                        <strong>From:</strong> {new Date(request.start_date).toLocaleDateString()}
                      </span>
                      <span>
                        <strong>To:</strong> {new Date(request.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="request-reason">
                      <strong>Reason:</strong> {request.reason}
                    </div>
                    
                    {request.comments && (
                      <div className="request-comments">
                        <strong>Manager Comments:</strong> {request.comments}
                      </div>
                    )}
                    
                    <div className="request-footer">
                      <span className="request-date">
                        Submitted: {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {leaveRequests?.data?.length === 0 && (
              <div className="no-requests">
                <p>No leave requests found.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeaveRequest;