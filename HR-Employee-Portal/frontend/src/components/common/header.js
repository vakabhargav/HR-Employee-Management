import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getNavItems = () => {
    if (user?.role === 'hr') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/employees', label: 'Employees', icon: '👥' },
        { path: '/attendance', label: 'Attendance', icon: '⏰' },
        { path: '/leave', label: 'Leave', icon: '📅' },
        { path: '/payroll', label: 'Payroll', icon: '💰' },
        { path: '/performance', label: 'Performance', icon: '⭐' },
      ];
    } else if (user?.role === 'manager') {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/employees', label: 'My Team', icon: '👥' },
        { path: '/attendance', label: 'Attendance', icon: '⏰' },
        { path: '/leave', label: 'Leave', icon: '📅' },
        { path: '/performance', label: 'Performance', icon: '⭐' },
      ];
    } else {
      return [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/profile', label: 'My Profile', icon: '👤' },
        { path: '/attendance', label: 'Attendance', icon: '⏰' },
        { path: '/leave', label: 'Leave', icon: '📅' },
        { path: '/payslips', label: 'Payslips', icon: '💰' },
        { path: '/performance', label: 'Performance', icon: '⭐' },
      ];
    }
  };

  const navItems = getNavItems();

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', title: 'New Employee', message: 'John Doe joined Engineering', timestamp: new Date(Date.now() - 5 * 60 * 1000), unread: true },
    { id: 2, type: 'warning', title: 'Leave Pending', message: '3 requests need approval', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), unread: true },
    { id: 3, type: 'success', title: 'Payroll Done', message: 'Monthly payroll completed', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), unread: false },
  ]);

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

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="top-navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
            <div className="brand-icon">🏢</div>
            <div className="brand-text">
              <h1 className="brand-title">HR Portal</h1>
              <p className="brand-subtitle">Management System</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="navbar-nav">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Greeting */}
            <div className="user-greeting">
              <span className="greeting-text">{getGreeting()}, {user?.firstName}!</span>
              <span className="current-time">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Notifications */}
            <div className="action-item">
              <button 
                className="action-button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
              >
                <span className="action-icon">🔔</span>
                {unreadCount > 0 && <span className="badge-dot">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="dropdown-panel notifications-panel">
                  <div className="panel-header">
                    <h3>Notifications</h3>
                    <button className="text-button" onClick={markAllAsRead}>Mark all read</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.unread ? 'unread' : ''}`} onClick={() => markAsRead(notif.id)}>
                        <div className="notification-indicator">
                          {notif.unread && <span className="unread-dot"></span>}
                        </div>
                        <div className={`notif-icon ${notif.type}`}>
                          {notif.type === 'info' && 'ℹ️'}
                          {notif.type === 'warning' && '⚠️'}
                          {notif.type === 'success' && '✅'}
                          {notif.type === 'error' && '❌'}
                        </div>
                        <div className="notif-content">
                          <h4>{notif.title}</h4>
                          <p>{notif.message}</p>
                          <span className="notif-time">{getRelativeTime(notif.timestamp)}</span>
                        </div>
                        <button 
                          className="delete-notification-btn"
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
                  <div className="panel-footer">
                    <button className="footer-button" onClick={() => navigate('/notifications')}>
                      View All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="action-item">
              <button 
                className="user-profile-button"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="user-avatar-small">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                <div className="user-info-small">
                  <span className="user-name-small">{user?.firstName} {user?.lastName}</span>
                  <span className="user-role-small">
                    {user?.role === 'hr' ? 'HR Manager' : user?.role === 'manager' ? 'Manager' : 'Employee'}
                  </span>
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>

              {showUserMenu && (
                <div className="dropdown-panel user-panel">
                  <div className="panel-header user-header">
                    <div className="user-avatar-large">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <div className="user-details">
                      <h4>{user?.firstName} {user?.lastName}</h4>
                      <p>{user?.email}</p>
                      <span className="user-dept">{user?.department} • {user?.position}</span>
                    </div>
                  </div>
                  <div className="panel-menu">
                    <button className="menu-item" onClick={() => { navigate('/profile'); setShowUserMenu(false); }}>
                      <span>👤</span>
                      <span>My Profile</span>
                    </button>
                    <button className="menu-item" onClick={() => { navigate('/settings'); setShowUserMenu(false); }}>
                      <span>⚙️</span>
                      <span>Settings</span>
                    </button>
                    <button className="menu-item" onClick={() => { navigate('/notifications'); setShowUserMenu(false); }}>
                      <span>🔔</span>
                      <span>Notifications</span>
                    </button>
                    <button className="menu-item" onClick={() => { navigate('/help'); setShowUserMenu(false); }}>
                      <span>❓</span>
                      <span>Help</span>
                    </button>
                  </div>
                  <div className="panel-footer">
                    <button className="logout-button" onClick={handleLogout}>
                      <span>🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="navbar-overlay"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
};

export default Header;
