import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './header';
import './Notifications.css';

const Notifications = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      category: 'general',
      title: 'Welcome to HR Portal',
      message: 'Your account has been successfully created. Complete your profile to get started.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      actionUrl: '/profile'
    },
    {
      id: 2,
      type: 'warning',
      category: 'leave',
      title: 'Leave Request Pending',
      message: 'You have 3 pending leave requests that need your approval.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
      actionUrl: '/leave'
    },
    {
      id: 3,
      type: 'success',
      category: 'payroll',
      title: 'Payroll Processed',
      message: 'Monthly payroll for December has been successfully processed.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/payroll'
    },
    {
      id: 4,
      type: 'info',
      category: 'attendance',
      title: 'Attendance Reminder',
      message: 'Don\'t forget to check in for today. Your shift starts in 30 minutes.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/attendance'
    },
    {
      id: 5,
      type: 'success',
      category: 'performance',
      title: 'Performance Review Completed',
      message: 'Your Q4 performance review has been completed and is ready for viewing.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/performance'
    },
    {
      id: 6,
      type: 'warning',
      category: 'general',
      title: 'Profile Incomplete',
      message: 'Please update your emergency contact information and bank details.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/profile'
    },
    {
      id: 7,
      type: 'info',
      category: 'leave',
      title: 'Leave Request Approved',
      message: 'Your leave request for Jan 15-18 has been approved by your manager.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/leave'
    },
    {
      id: 8,
      type: 'success',
      category: 'payroll',
      title: 'Payslip Available',
      message: 'Your payslip for December 2024 is now available for download.',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      read: true,
      actionUrl: '/payslips'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getIcon = (type) => {
    switch (type) {
      case 'info': return 'ℹ️';
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return '📢';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.category === filter;
  });

  const categories = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'unread', label: 'Unread', icon: '🔔' },
    { value: 'general', label: 'General', icon: '📢' },
    { value: 'leave', label: 'Leave', icon: '📅' },
    { value: 'attendance', label: 'Attendance', icon: '⏰' },
    { value: 'payroll', label: 'Payroll', icon: '💰' },
    { value: 'performance', label: 'Performance', icon: '⭐' },
  ];

  return (
    <div className="page-container">
      <Header />
      <div className="notifications-page">
        <div className="notifications-header">
          <div className="header-title">
            <h1>🔔 Notifications</h1>
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount} unread</span>
            )}
          </div>
          <div className="header-actions">
            <button className="action-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
            <button className="action-btn danger" onClick={clearAll}>
              Clear all
            </button>
          </div>
        </div>

        <div className="notifications-container">
          <div className="notifications-sidebar">
            <h3>Filters</h3>
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`filter-btn ${filter === cat.value ? 'active' : ''}`}
                onClick={() => setFilter(cat.value)}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span className="filter-label">{cat.label}</span>
                {cat.value === 'unread' && unreadCount > 0 && (
                  <span className="filter-count">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          <div className="notifications-content">
            {filteredNotifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No notifications</h3>
                <p>You're all caught up! No notifications to display.</p>
              </div>
            ) : (
              <div className="notifications-list">
                {filteredNotifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notification-card ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notification-indicator">
                      {!notif.read && <span className="unread-dot"></span>}
                    </div>
                    <div className={`notification-icon ${notif.type}`}>
                      {getIcon(notif.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-header">
                        <h4>{notif.title}</h4>
                        <span className="notification-time">
                          {getRelativeTime(notif.timestamp)}
                        </span>
                      </div>
                      <p className="notification-message">{notif.message}</p>
                      {notif.actionUrl && (
                        <a href={notif.actionUrl} className="notification-action">
                          View Details →
                        </a>
                      )}
                    </div>
                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
