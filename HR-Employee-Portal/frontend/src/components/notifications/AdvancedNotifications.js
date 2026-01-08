import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../common/header';
import './AdvancedNotifications.css';

const AdvancedNotifications = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    email: true,
    push: true,
    sms: false
  });

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      title: 'Leave Request Approved',
      message: 'Your leave request for June 15-17 has been approved by your manager.',
      category: 'leave',
      priority: 'medium',
      time: '2024-06-10T09:30:00Z',
      read: false,
      urgent: false,
      actions: ['View Details', 'Add to Calendar']
    },
    {
      id: 2,
      title: 'Payroll Processed',
      message: 'Your salary for May 2024 has been processed and will be deposited on June 5th.',
      category: 'payroll',
      priority: 'low',
      time: '2024-06-01T14:15:00Z',
      read: true,
      urgent: false,
      actions: ['View Payslip', 'Download Receipt']
    },
    {
      id: 3,
      title: 'Performance Review Due',
      message: 'Your Q2 performance review is due by June 30th. Please schedule a meeting with your manager.',
      category: 'performance',
      priority: 'high',
      time: '2024-06-10T11:45:00Z',
      read: false,
      urgent: true,
      actions: ['Schedule Review', 'View Goals']
    },
    {
      id: 4,
      title: 'System Maintenance',
      message: 'Scheduled maintenance on June 15th from 10 PM to 2 AM. Some services may be temporarily unavailable.',
      category: 'system',
      priority: 'medium',
      time: '2024-06-08T16:20:00Z',
      read: true,
      urgent: false,
      actions: ['View Details', 'Set Reminder']
    },
    {
      id: 5,
      title: 'Company Anniversary Celebration',
      message: 'Join us for our 10th anniversary celebration on June 20th at the main conference hall.',
      category: 'announcement',
      priority: 'low',
      time: '2024-06-05T09:00:00Z',
      read: false,
      urgent: false,
      actions: ['RSVP', 'Add to Calendar']
    },
    {
      id: 6,
      title: 'Training Session Reminder',
      message: 'Reminder: Advanced React Patterns training starts tomorrow at 2 PM in Room 301.',
      category: 'training',
      priority: 'medium',
      time: '2024-06-10T08:00:00Z',
      read: false,
      urgent: false,
      actions: ['View Details', 'Join Session']
    },
    {
      id: 7,
      title: 'New Policy Update',
      message: 'Please review the updated remote work policy that takes effect July 1st.',
      category: 'announcement',
      priority: 'medium',
      time: '2024-06-09T13:30:00Z',
      read: true,
      urgent: false,
      actions: ['View Policy', 'Acknowledge']
    },
    {
      id: 8,
      title: 'Birthday Celebration',
      message: 'Today is Sarah Johnson\'s birthday! Join the celebration in the break room at 3 PM.',
      category: 'social',
      priority: 'low',
      time: '2024-06-10T07:45:00Z',
      read: false,
      urgent: false,
      actions: ['Send Wishes', 'Join Celebration']
    }
  ];

  // Initialize notifications
  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  // Filter notifications based on category and search term
  const filteredNotifications = notifications.filter(notification => {
    const matchesCategory = activeCategory === 'all' || notification.category === activeCategory;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
    setShowDetail(true);
  };

  // Handle action click
  const handleActionClick = (action, notification) => {
    alert(`Performing action: ${action} on notification: ${notification.title}`);
  };

  // Handle preference change
  const handlePreferenceChange = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  // Get category display name
  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      leave: 'Leave',
      payroll: 'Payroll',
      performance: 'Performance',
      system: 'System',
      announcement: 'Announcement',
      training: 'Training',
      social: 'Social'
    };
    return categoryMap[category] || category;
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

  // Get time ago string
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <main className="main-content advanced-notifications-container">
          {/* Page Header */}
          <div className="advanced-notifications-header">
            <div className="advanced-header-content">
              <h1>🔔 Advanced Notifications</h1>
              <p>Manage your notifications, preferences, and stay updated with important alerts</p>
            </div>
            <div className="advanced-header-actions">
              <button className="btn-secondary">
                📅 Schedule Notification
              </button>
              <button 
                className="btn-primary"
                onClick={markAllAsRead}
              >
                ✅ Mark All Read
              </button>
            </div>
          </div>

          {/* Notification Controls */}
          <div className="advanced-notification-controls">
            <div className="advanced-category-filters">
              <button 
                className={`advanced-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                📣 All
              </button>
              <button 
                className={`advanced-category-btn ${activeCategory === 'leave' ? 'active' : ''}`}
                onClick={() => setActiveCategory('leave')}
              >
                🌴 Leave
              </button>
              <button 
                className={`advanced-category-btn ${activeCategory === 'payroll' ? 'active' : ''}`}
                onClick={() => setActiveCategory('payroll')}
              >
                💰 Payroll
              </button>
              <button 
                className={`advanced-category-btn ${activeCategory === 'performance' ? 'active' : ''}`}
                onClick={() => setActiveCategory('performance')}
              >
                ⭐ Performance
              </button>
              <button 
                className={`advanced-category-btn ${activeCategory === 'system' ? 'active' : ''}`}
                onClick={() => setActiveCategory('system')}
              >
                ⚙️ System
              </button>
              <button 
                className={`advanced-category-btn ${activeCategory === 'announcement' ? 'active' : ''}`}
                onClick={() => setActiveCategory('announcement')}
              >
                📢 Announcement
              </button>
            </div>
            
            <div className="advanced-search-container">
              <input
                type="text"
                placeholder="Search notifications..."
                className="advanced-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="advanced-search-icon">🔍</span>
            </div>
            
            <div className="advanced-notification-actions">
              <button className="advanced-action-btn">
                ⚙️ Settings
              </button>
              <button className="advanced-action-btn">
                📤 Export
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {filteredNotifications.length > 0 && (
            <div className="advanced-bulk-actions">
              <div className="advanced-bulk-select">
                <input type="checkbox" />
                <span>Select all</span>
              </div>
              <div className="advanced-bulk-actions-group">
                <button className="advanced-bulk-btn">
                  📧 Send Email
                </button>
                <button className="advanced-bulk-btn primary">
                  🗑️ Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* Notifications List */}
          {filteredNotifications.length > 0 ? (
            <div className="advanced-notifications-list">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`advanced-notification-card ${
                    !notification.read ? 'unread' : ''
                  } ${notification.urgent ? 'urgent' : ''}`}
                >
                  <div className="advanced-notification-header">
                    <div className="advanced-notification-meta">
                      <span className={`advanced-notification-category ${notification.category}`}>
                        {getCategoryDisplayName(notification.category)}
                      </span>
                      <span className="advanced-notification-time">
                        {getTimeAgo(notification.time)}
                      </span>
                    </div>
                    <div className="advanced-notification-actions">
                      <button 
                        className="advanced-notification-btn"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        ✅
                      </button>
                      <button 
                        className="advanced-notification-btn"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="advanced-notification-content"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                  </div>
                  
                  <div className="advanced-notification-footer">
                    <span className={`advanced-notification-priority ${notification.priority}`}>
                      {getPriorityDisplayName(notification.priority)} Priority
                    </span>
                    <div className="advanced-notification-actions">
                      {notification.actions.map((action, index) => (
                        <button
                          key={index}
                          className="btn-secondary small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(action, notification);
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="advanced-empty-state">
              <div className="advanced-empty-icon">📭</div>
              <h3>No Notifications Found</h3>
              <p>
                {searchTerm 
                  ? `No notifications match your search for "${searchTerm}"`
                  : 'You have no notifications in this category'
                }
              </p>
              <button className="btn-primary" onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}>
                View All Notifications
              </button>
            </div>
          )}

          {/* Notification Preferences */}
          <div className="advanced-notification-preferences">
            <div className="advanced-preferences-header">
              <h2>⚙️ Notification Preferences</h2>
              <p>Customize how and when you receive notifications</p>
            </div>
            
            <div className="advanced-preferences-grid">
              <div className="advanced-preference-category">
                <div className="advanced-preference-header">
                  <span className="advanced-preference-icon">📧</span>
                  <h3>Email Notifications</h3>
                </div>
                <div className="advanced-preference-options">
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Receive email notifications</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={preferences.email}
                        onChange={() => handlePreferenceChange('email')}
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Daily summary emails</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={true}
                        onChange={() => {}}
                        disabled
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="advanced-preference-category">
                <div className="advanced-preference-header">
                  <span className="advanced-preference-icon">📱</span>
                  <h3>Push Notifications</h3>
                </div>
                <div className="advanced-preference-options">
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Enable push notifications</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={preferences.push}
                        onChange={() => handlePreferenceChange('push')}
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Sound alerts</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={true}
                        onChange={() => {}}
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="advanced-preference-category">
                <div className="advanced-preference-header">
                  <span className="advanced-preference-icon">💬</span>
                  <h3>SMS Notifications</h3>
                </div>
                <div className="advanced-preference-options">
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Receive SMS alerts</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={preferences.sms}
                        onChange={() => handlePreferenceChange('sms')}
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                  <div className="advanced-toggle-group">
                    <span className="advanced-toggle-label">Critical alerts only</span>
                    <label className="advanced-toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={true}
                        onChange={() => {}}
                        disabled
                      />
                      <span className="advanced-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Detail Modal */}
          {showDetail && selectedNotification && (
            <div className="modal-overlay" onClick={() => setShowDetail(false)}>
              <div className="modal advanced-notification-modal" onClick={(e) => e.stopPropagation()}>
                <div className="advanced-modal-header">
                  <h2 className="advanced-modal-title">Notification Details</h2>
                  <button 
                    className="advanced-close-btn"
                    onClick={() => setShowDetail(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="advanced-modal-content">
                  <div className="advanced-notification-detail">
                    <div className="advanced-detail-header">
                      <div className="advanced-detail-meta">
                        <span className={`advanced-detail-category ${selectedNotification.category}`}>
                          {getCategoryDisplayName(selectedNotification.category)}
                        </span>
                        <span className="advanced-detail-time">
                          {new Date(selectedNotification.time).toLocaleString()}
                        </span>
                      </div>
                      <span className={`advanced-notification-priority ${selectedNotification.priority}`}>
                        {getPriorityDisplayName(selectedNotification.priority)} Priority
                      </span>
                    </div>
                    
                    <div className="advanced-detail-content">
                      <h2>{selectedNotification.title}</h2>
                      <p>{selectedNotification.message}</p>
                      
                      <div className="advanced-detail-actions">
                        {selectedNotification.actions.map((action, index) => (
                          <button
                            key={index}
                            className={`advanced-detail-btn ${
                              action.includes('View') || action.includes('Join') ? 'primary' :
                              action.includes('Add') ? 'success' :
                              action.includes('RSVP') ? 'warning' :
                              action.includes('Delete') ? 'error' : ''
                            }`}
                            onClick={() => handleActionClick(action, selectedNotification)}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="advanced-modal-footer">
                  <div className="advanced-footer-meta">
                    Notification ID: {selectedNotification.id}
                  </div>
                  <div className="advanced-footer-meta">
                    Status: {selectedNotification.read ? 'Read' : 'Unread'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdvancedNotifications;