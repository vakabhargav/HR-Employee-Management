import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['main']);

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  // HR Menu - Full Access
  const hrMenu = [
    {
      section: 'main',
      title: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: '📈', badge: null },
        { path: '/employees', label: 'Employees', icon: '👥', badge: '156' },
      ]
    },
    {
      section: 'operations',
      title: 'Operations',
      items: [
        { path: '/attendance', label: 'Attendance', icon: '⏰', badge: null },
        { path: '/leave', label: 'Leave Management', icon: '📅', badge: '8' },
        { path: '/payroll', label: 'Payroll', icon: '💰', badge: null },
        { path: '/performance', label: 'Performance', icon: '⭐', badge: null },
      ]
    },
    {
      section: 'analytics',
      title: 'Insights',
      items: [
        { path: '/analytics', label: 'Analytics', icon: '📊', badge: null },
        { path: '/reports', label: 'Reports', icon: '📋', badge: null },
      ]
    },
    {
      section: 'settings',
      title: 'System',
      items: [
        { path: '/settings', label: 'Settings', icon: '⚙️', badge: null },
      ]
    }
  ];

  // Manager Menu - Department Level
  const managerMenu = [
    {
      section: 'main',
      title: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: '📈', badge: null },
        { path: '/employees', label: 'My Team', icon: '👥', badge: '24' },
      ]
    },
    {
      section: 'operations',
      title: 'Team Management',
      items: [
        { path: '/attendance', label: 'Team Attendance', icon: '⏰', badge: null },
        { path: '/leave', label: 'Leave Approval', icon: '📅', badge: '3' },
        { path: '/performance', label: 'Performance', icon: '⭐', badge: null },
      ]
    },
    {
      section: 'reports',
      title: 'Reports',
      items: [
        { path: '/reports', label: 'Team Reports', icon: '📋', badge: null },
      ]
    }
  ];

  // Employee Menu - Personal Access
  const employeeMenu = [
    {
      section: 'main',
      title: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: '📈', badge: null },
        { path: '/profile', label: 'My Profile', icon: '👤', badge: null },
      ]
    },
    {
      section: 'mywork',
      title: 'My Work',
      items: [
        { path: '/attendance', label: 'My Attendance', icon: '⏰', badge: null },
        { path: '/leave', label: 'Leave Request', icon: '📅', badge: null },
        { path: '/payslips', label: 'My Payslips', icon: '💰', badge: null },
        { path: '/performance', label: 'My Performance', icon: '⭐', badge: null },
      ]
    }
  ];

  const menuSections = user?.role === 'hr' ? hrMenu : 
                       user?.role === 'manager' ? managerMenu : 
                       employeeMenu;

  const getRoleBadge = () => {
    if (user?.role === 'hr') return { label: 'HR Manager', color: '#f093fb' };
    if (user?.role === 'manager') return { label: 'Manager', color: '#38ef7d' };
    return { label: 'Employee', color: '#4facfe' };
  };

  const roleBadge = getRoleBadge();

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && window.innerWidth < 768 && (
        <div 
          className="sidebar-mobile-overlay"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <aside className={`modern-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-header-section">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <span className="icon-gradient">🏢</span>
            </div>
            {!isCollapsed && (
              <div className="brand-info">
                <h2 className="brand-title">HR Portal</h2>
                <p className="brand-subtitle">Management System</p>
              </div>
            )}
          </div>
          
          <button 
            className="sidebar-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <span className="collapse-icon">
              {isCollapsed ? '→' : '←'}
            </span>
          </button>
        </div>

        {/* Role Badge */}
        {!isCollapsed && (
          <div className="role-badge-container">
            <div className="role-badge" style={{ background: roleBadge.color }}>
              <span className="role-icon">👑</span>
              <span className="role-text">{roleBadge.label}</span>
            </div>
          </div>
        )}

        {/* Navigation Sections */}
        <nav className="sidebar-navigation">
          {menuSections.map(section => (
            <div key={section.section} className="nav-section">
              {!isCollapsed && (
                <button 
                  className="section-header"
                  onClick={() => toggleSection(section.section)}
                >
                  <span className="section-title">{section.title}</span>
                  <span className={`section-arrow ${expandedSections.includes(section.section) ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </button>
              )}
              
              <ul className={`nav-items ${!expandedSections.includes(section.section) && !isCollapsed ? 'collapsed' : ''}`}>
                {section.items.map(item => (
                  <li key={item.path} className="nav-item">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      title={isCollapsed ? item.label : ''}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      {!isCollapsed && (
                        <>
                          <span className="nav-label">{item.label}</span>
                          {item.badge && (
                            <span className="nav-badge">{item.badge}</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Quick Actions */}
        {!isCollapsed && (
          <div className="sidebar-quick-actions">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              {user?.role === 'hr' && (
                <>
                  <button className="quick-action-btn">
                    <span>➕</span>
                    <span>Add Employee</span>
                  </button>
                  <button className="quick-action-btn">
                    <span>📊</span>
                    <span>Generate Report</span>
                  </button>
                </>
              )}
              {user?.role === 'manager' && (
                <>
                  <button className="quick-action-btn">
                    <span>✅</span>
                    <span>Approve Leaves</span>
                  </button>
                  <button className="quick-action-btn">
                    <span>📊</span>
                    <span>Team Report</span>
                  </button>
                </>
              )}
              {user?.role === 'employee' && (
                <>
                  <button className="quick-action-btn">
                    <span>🔔</span>
                    <span>Clock In/Out</span>
                  </button>
                  <button className="quick-action-btn">
                    <span>📅</span>
                    <span>Request Leave</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="sidebar-user-card">
          <div className="user-card-avatar">
            <div className="avatar-circle" style={{ background: roleBadge.color }}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="user-status-dot"></div>
          </div>
          {!isCollapsed && (
            <div className="user-card-info">
              <h4 className="user-card-name">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="user-card-role">{user?.position}</p>
              <p className="user-card-dept">{user?.department}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;