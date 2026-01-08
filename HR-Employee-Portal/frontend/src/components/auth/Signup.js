import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    position: '',
    dateOfBirth: '',
    address: '',
    role: 'employee'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const validateStep1 = () => {
    if (!formData.firstName.trim()) {
      setError('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!['employee', 'manager', 'hr'].includes(formData.role)) {
      setError('Please select a valid role');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
      return;
    }

    setLoading(true);
    setError('');

    // Prepare the complete signup data
    const signupData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      phone: formData.phone ? formData.phone.trim() : '',
      department: formData.department || '',
      position: formData.position ? formData.position.trim() : '',
      dateOfBirth: formData.dateOfBirth || '',
      address: formData.address ? formData.address.trim() : '',
      role: formData.role
    };

    console.log('Submitting signup form with data:', signupData);

    try {
      const { data } = await authAPI.signup(signupData);
      console.log('Signup success:', data);
      setSuccess('Registration successful! You can now login with your credentials.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        department: '',
        position: '',
        dateOfBirth: '',
        address: '',
        role: 'employee'
      });
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } catch (err) {
      console.error('Signup error:', err);
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      const detail = err.response?.data?.error ? ` Details: ${err.response.data.error}` : '';
      setError(message + detail);
    } finally {
      setLoading(false);
    }
  };

  // Removed additional details step; departments list no longer needed

  return (
    <div className="signup-page">
      {/* Background Elements */}
      <div className="signup-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="signup-container">
        {/* Left Side - Branding */}
        <div className="signup-branding">
          <div className="branding-content">
            <div className="brand-logo">
              <span className="logo-icon">🏢</span>
              <h1>Join Our Team</h1>
            </div>
            <p className="brand-tagline">
              Create your account and become part of our growing organization
            </p>
            
            <div className="brand-benefits">
              <h3>What you'll get:</h3>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <div>
                  <h4>Personal Dashboard</h4>
                  <p>Track your performance and progress</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📊</span>
                <div>
                  <h4>Attendance Management</h4>
                  <p>Easy clock-in/out and leave requests</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div>
                  <h4>Payroll Access</h4>
                  <p>View payslips and salary details</p>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🚀</span>
                <div>
                  <h4>Career Growth</h4>
                  <p>Performance reviews and development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-form-container">
          <div className="signup-card">
            {/* Progress Indicator - Two Steps */}
            <div className="progress-indicator">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <div className="step-circle">1</div>
                <div className="step-label">Basic Info</div>
              </div>
              <div className={`progress-line ${step > 1 ? 'completed' : ''}`}></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <div className="step-label">Security</div>
              </div>
            </div>

            <div className="card-header">
              <h2>Create Account</h2>
              <p>Step {step} of 2 - Let's get you started</p>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              {error && (
                <div className="alert alert-error animate-fade-in">
                  <span className="alert-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="alert alert-success animate-fade-in">
                  <span className="alert-icon">✓</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="form-step animate-fade-in">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName" className="form-label">
                        First Name *
                      </label>
                      <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="form-input"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          autoComplete="given-name"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName" className="form-label">
                        Last Name *
                      </label>
                      <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="form-input"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          autoComplete="family-name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <div className="input-group">
                      <span className="input-icon">📧</span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@company.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role *
                </label>
                <div className="input-group">
                  <span className="input-icon">🛡️</span>
                  <select
                    id="role"
                    name="role"
                    className="form-input"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <span className="input-icon">📱</span>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="form-step animate-fade-in">
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password *
                    </label>
                    <div className="input-group">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                    <div className="password-strength">
                      <small>Password must be at least 6 characters</small>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password *
                    </label>
                    <div className="input-group">
                      <span className="input-icon">🔒</span>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-input"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 removed - Additional Details no longer required */}

              {/* Navigation Buttons */}
              <div className="form-actions">
                {step > 1 && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handlePrevStep}
                    disabled={loading}
                  >
                    ← Previous
                  </button>
                )}
                
                {step < 2 ? (
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Next →
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <span>✓</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            <div className="signup-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in here
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

export default Signup;
