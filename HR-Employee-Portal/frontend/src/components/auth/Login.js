import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const demoCredentials = [
    { 
      role: 'HR Manager', 
      email: 'hr@company.com', 
      password: 'password',
      color: '#667eea',
      icon: '👔',
      description: 'Full access to all features'
    },
    { 
      role: 'Manager', 
      email: 'manager@company.com', 
      password: 'password',
      color: '#f093fb',
      icon: '👨‍💼',
      description: 'Department level access'
    },
    { 
      role: 'Employee', 
      email: 'employee@company.com', 
      password: 'password',
      color: '#4facfe',
      icon: '👤',
      description: 'Personal profile access'
    }
  ];

  const quickLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);
    setError('');

    const result = await login(demoEmail, demoPassword);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* Background Elements */}
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="brand-logo">
              <span className="logo-icon">🏢</span>
              <h1>HR Employee Portal</h1>
            </div>
            <p className="brand-tagline">
              Modern HR management platform designed for efficiency and growth
            </p>
            
            <div className="brand-features">
              <div className="brand-feature">
                <span className="feature-icon">✓</span>
                <span>Employee Management</span>
              </div>
              <div className="brand-feature">
                <span className="feature-icon">✓</span>
                <span>Attendance Tracking</span>
              </div>
              <div className="brand-feature">
                <span className="feature-icon">✓</span>
                <span>Payroll Processing</span>
              </div>
              <div className="brand-feature">
                <span className="feature-icon">✓</span>
                <span>Performance Reviews</span>
              </div>
            </div>

            <div className="brand-stats">
              <div className="brand-stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="brand-stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Users</div>
              </div>
              <div className="brand-stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="card-header">
              <h2>Welcome Back</h2>
              <p>Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="alert alert-error animate-fade-in">
                  <span className="alert-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <a href="#forgot" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-full btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="divider">
              <span>or</span>
            </div>

            <button 
              className="btn btn-ghost w-full"
              onClick={() => setShowDemo(!showDemo)}
            >
              <span>🎭</span>
              <span>{showDemo ? 'Hide' : 'Show'} Demo Accounts</span>
            </button>

            {showDemo && (
              <div className="demo-section animate-fade-in">
                <h3 className="demo-title">Quick Demo Access</h3>
                <div className="demo-grid">
                  {demoCredentials.map((cred, index) => (
                    <div 
                      key={index} 
                      className="demo-card"
                      style={{ '--card-color': cred.color }}
                    >
                      <div className="demo-header">
                        <span className="demo-icon">{cred.icon}</span>
                        <div>
                          <div className="demo-role">{cred.role}</div>
                          <div className="demo-description">{cred.description}</div>
                        </div>
                      </div>
                      <div className="demo-credentials-text">
                        <div className="credential-item">
                          <span className="credential-label">Email:</span>
                          <span className="credential-value">{cred.email}</span>
                        </div>
                        <div className="credential-item">
                          <span className="credential-label">Password:</span>
                          <span className="credential-value">password</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => quickLogin(cred.email, cred.password)}
                        className="demo-login-btn"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Quick Login'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="login-footer">
              <p className="signup-prompt">
                Don't have an account?{' '}
                <Link to="/signup" className="signup-link">
                  Create one now
                </Link>
              </p>
              <Link to="/" className="back-home">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;