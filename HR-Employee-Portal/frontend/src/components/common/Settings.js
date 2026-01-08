import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Header from './header';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { theme, changeTheme, compactMode, setCompactMode } = useTheme();
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    email: user?.email || '',
    phone: user?.phone || '',
    language: 'English',
    timezone: 'UTC-5',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    leaveNotifications: true,
    attendanceReminders: true,
    payrollNotifications: true,
    performanceNotifications: true,
    
    // Privacy Settings
    profileVisibility: 'all',
    showEmail: true,
    showPhone: false,
  });

  // Sync theme and compact mode with context
  useEffect(() => {
    // Theme is managed by ThemeContext
  }, [theme, compactMode]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save settings to backend
    // Theme and compact mode are automatically saved by ThemeContext
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
  };

  const handleCompactModeToggle = () => {
    setCompactMode(!compactMode);
  };

  const renderAccountSettings = () => (
    <div className="settings-section">
      <h3>Account Information</h3>
      <div className="settings-group">
        <div className="settings-item">
          <label>Email Address</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-item">
          <label>Phone Number</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="settings-input"
          />
        </div>
        <div className="settings-item">
          <label>Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="settings-select"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <div className="settings-item">
          <label>Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="settings-select"
          >
            <option value="UTC-5">EST (UTC-5)</option>
            <option value="UTC-6">CST (UTC-6)</option>
            <option value="UTC-7">MST (UTC-7)</option>
            <option value="UTC-8">PST (UTC-8)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <div className="settings-group">
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Email Notifications</strong>
            <span>Receive notifications via email</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Push Notifications</strong>
            <span>Receive browser push notifications</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleChange('pushNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Leave Notifications</strong>
            <span>Updates on leave requests and approvals</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.leaveNotifications}
              onChange={(e) => handleChange('leaveNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Attendance Reminders</strong>
            <span>Daily check-in and check-out reminders</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.attendanceReminders}
              onChange={(e) => handleChange('attendanceReminders', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Payroll Notifications</strong>
            <span>Salary processing and payslip updates</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.payrollNotifications}
              onChange={(e) => handleChange('payrollNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Performance Notifications</strong>
            <span>Performance reviews and feedback alerts</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.performanceNotifications}
              onChange={(e) => handleChange('performanceNotifications', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <h3>Privacy & Security</h3>
      <div className="settings-group">
        <div className="settings-item">
          <label>Profile Visibility</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => handleChange('profileVisibility', e.target.value)}
            className="settings-select"
          >
            <option value="all">Everyone</option>
            <option value="department">My Department Only</option>
            <option value="private">Only Me</option>
          </select>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Show Email Address</strong>
            <span>Display email on your profile</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.showEmail}
              onChange={(e) => handleChange('showEmail', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Show Phone Number</strong>
            <span>Display phone number on your profile</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={settings.showPhone}
              onChange={(e) => handleChange('showPhone', e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="settings-item">
          <button className="secondary-button">Change Password</button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <h3>Appearance</h3>
      <div className="settings-group">
        <div className="settings-item">
          <label>Theme</label>
          <div className="theme-options">
            <button
              className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              onClick={() => handleThemeChange('light')}
            >
              <span className="theme-icon">☀️</span>
              <span>Light</span>
            </button>
            <button
              className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => handleThemeChange('dark')}
            >
              <span className="theme-icon">🌙</span>
              <span>Dark</span>
            </button>
            <button
              className={`theme-option ${theme === 'gradient' ? 'active' : ''}`}
              onClick={() => handleThemeChange('gradient')}
            >
              <span className="theme-icon">🌈</span>
              <span>Gradient</span>
            </button>
          </div>
        </div>
        <div className="settings-toggle">
          <div className="toggle-info">
            <strong>Compact Mode</strong>
            <span>Reduce spacing and use smaller fonts</span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={compactMode}
              onChange={handleCompactModeToggle}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <Header />
      <div className="settings-page">
        <div className="settings-header">
          <h1>⚙️ Settings</h1>
          <p>Manage your account preferences and application settings</p>
        </div>

        {showSuccess && (
          <div className="success-alert">
            <span>✅</span>
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="settings-container">
          <div className="settings-sidebar">
            <button
              className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <span>👤</span>
              <span>Account</span>
            </button>
            <button
              className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <span>🔔</span>
              <span>Notifications</span>
            </button>
            <button
              className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
              onClick={() => setActiveTab('privacy')}
            >
              <span>🔒</span>
              <span>Privacy</span>
            </button>
            <button
              className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
              onClick={() => setActiveTab('appearance')}
            >
              <span>🎨</span>
              <span>Appearance</span>
            </button>
          </div>

          <div className="settings-content">
            {activeTab === 'account' && renderAccountSettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'privacy' && renderPrivacySettings()}
            {activeTab === 'appearance' && renderAppearanceSettings()}

            <div className="settings-actions">
              <button className="primary-button" onClick={handleSave}>
                Save Changes
              </button>
              <button className="secondary-button">
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
