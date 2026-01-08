import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../common/header';
import { leaveAPI } from '../../services/api';
import './LeaveManagement.css';

const LeaveManagement = () => {
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionData, setActionData] = useState({
    status: 'approved',
    comments: ''
  });

  const { data: leaveRequests, isLoading, error } = useQuery({
    queryKey: ['leave-requests'],
    queryFn: leaveAPI.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }) => leaveAPI.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leave-requests']);
      setSelectedRequest(null);
      setActionData({ status: 'approved', comments: '' });
    },
  });

  const handleStatusUpdate = (requestId) => {
    updateStatusMutation.mutate({
      id: requestId,
      data: actionData
    });
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

  const pendingRequests = leaveRequests?.data?.filter(req => req.status === 'pending') || [];
  const processedRequests = leaveRequests?.data?.filter(req => req.status !== 'pending') || [];

  if (error) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <main className="main-content">
            <div>Error loading leave requests: {error.message}</div>
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
            <h1>Leave Management</h1>
            <div className="header-stats">
              <span className="stat">
                Pending: <strong>{pendingRequests.length}</strong>
              </span>
              <span className="stat">
                Total: <strong>{leaveRequests?.data?.length || 0}</strong>
              </span>
            </div>
          </div>

          {/* Pending Requests Section */}
          <div className="leave-section">
            <h2>Pending Approval</h2>
            
            {isLoading ? (
              <div className="loading">Loading leave requests...</div>
            ) : pendingRequests.length > 0 ? (
              <div className="requests-table">
                <table>
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Leave Type</th>
                      <th>Dates</th>
                      <th>Reason</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map(request => (
                      <tr key={request.id}>
                        <td>
                          <div className="employee-info">
                            <strong>{request.first_name} {request.last_name}</strong>
                          </div>
                        </td>
                        <td>
                          <span className="leave-type">{request.leave_type}</span>
                        </td>
                        <td>
                          <div className="date-range">
                            <div>{new Date(request.start_date).toLocaleDateString()}</div>
                            <div>to</div>
                            <div>{new Date(request.end_date).toLocaleDateString()}</div>
                          </div>
                        </td>
                        <td>
                          <div className="reason-text">
                            {request.reason}
                          </div>
                        </td>
                        <td>
                          <span className="department">{request.department}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setActionData({ status: 'approved', comments: '' });
                              }}
                              className="btn-approve"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequest(request);
                                setActionData({ status: 'rejected', comments: '' });
                              }}
                              className="btn-reject"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-requests">
                <p>No pending leave requests.</p>
              </div>
            )}
          </div>

          {/* Processed Requests Section */}
          <div className="leave-section">
            <h2>Processed Requests</h2>
            
            {processedRequests.length > 0 ? (
              <div className="requests-grid">
                {processedRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h3>{request.first_name} {request.last_name}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    
                    <div className="request-details">
                      <div className="detail-item">
                        <strong>Type:</strong>
                        <span className="leave-type">{request.leave_type}</span>
                      </div>
                      
                      <div className="detail-item">
                        <strong>Dates:</strong>
                        <span>
                          {new Date(request.start_date).toLocaleDateString()} - {new Date(request.end_date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="detail-item">
                        <strong>Department:</strong>
                        <span>{request.department}</span>
                      </div>
                      
                      <div className="detail-item">
                        <strong>Reason:</strong>
                        <span>{request.reason}</span>
                      </div>
                      
                      {request.comments && (
                        <div className="detail-item">
                          <strong>Comments:</strong>
                          <span>{request.comments}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="request-footer">
                      <span className="request-date">
                        Submitted: {new Date(request.created_at).toLocaleDateString()}
                      </span>
                      {request.updated_at !== request.created_at && (
                        <span className="processed-date">
                          Processed: {new Date(request.updated_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-requests">
                <p>No processed leave requests.</p>
              </div>
            )}
          </div>

          {/* Action Modal */}
          {selectedRequest && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h2>
                    {actionData.status === 'approved' ? 'Approve' : 'Reject'} Leave Request
                  </h2>
                  <button 
                    onClick={() => setSelectedRequest(null)}
                    className="close-btn"
                  >
                    ×
                  </button>
                </div>
                
                <div className="modal-content">
                  <div className="request-summary">
                    <h4>Request Details</h4>
                    <p><strong>Employee:</strong> {selectedRequest.first_name} {selectedRequest.last_name}</p>
                    <p><strong>Leave Type:</strong> {selectedRequest.leave_type}</p>
                    <p><strong>Dates:</strong> {new Date(selectedRequest.start_date).toLocaleDateString()} to {new Date(selectedRequest.end_date).toLocaleDateString()}</p>
                    <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                  </div>

                  <div className="form-group">
                    <label>Comments (Optional)</label>
                    <textarea
                      value={actionData.comments}
                      onChange={(e) => setActionData(prev => ({
                        ...prev,
                        comments: e.target.value
                      }))}
                      rows="4"
                      placeholder="Add any comments for the employee..."
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button 
                    onClick={() => setSelectedRequest(null)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedRequest.id)}
                    className={actionData.status === 'approved' ? 'btn-approve' : 'btn-reject'}
                    disabled={updateStatusMutation.isLoading}
                  >
                    {updateStatusMutation.isLoading ? 'Processing...' : 
                     actionData.status === 'approved' ? 'Approve Request' : 'Reject Request'}
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

export default LeaveManagement;