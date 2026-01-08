import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '👥',
      title: 'Employee Management',
      description: 'Comprehensive employee database with detailed profiles, hierarchy management, and department organization.',
      color: '#667eea'
    },
    {
      icon: '⏰',
      title: 'Attendance Tracking',
      description: 'Real-time clock-in/out system with automatic hour calculations and attendance analytics.',
      color: '#f093fb'
    },
    {
      icon: '📅',
      title: 'Leave Management',
      description: 'Streamlined leave request workflow with approval system and leave balance tracking.',
      color: '#38ef7d'
    },
    {
      icon: '💰',
      title: 'Payroll Processing',
      description: 'Automated salary calculation, tax computation, and digital payslip generation.',
      color: '#fee140'
    },
    {
      icon: '⭐',
      title: 'Performance Reviews',
      description: '360-degree feedback system with goal tracking and performance analytics.',
      color: '#ff6b6b'
    },
    {
      icon: '📊',
      title: 'Analytics & Reports',
      description: 'Comprehensive dashboards with insights, charts, and exportable reports.',
      color: '#4ecdc4'
    }
  ];

  const benefits = [
    {
      icon: '🚀',
      title: 'Boost Productivity',
      description: 'Automate routine HR tasks and focus on strategic initiatives'
    },
    {
      icon: '🔒',
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security with role-based access control'
    },
    {
      icon: '📱',
      title: 'Mobile Responsive',
      description: 'Access from anywhere on any device'
    },
    {
      icon: '💡',
      title: 'Easy to Use',
      description: 'Intuitive interface designed for all skill levels'
    }
  ];

  const stats = [
    { number: '500+', label: 'Companies', icon: '🏢' },
    { number: '50K+', label: 'Employees', icon: '👨‍💼' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '24/7', label: 'Support', icon: '💬' }
  ];

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className={`home-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🏢</span>
              <span className="logo-text">HR Portal</span>
            </div>
            <div className="nav-links">
              <a href="#features">Features</a>
              <a href="#benefits">Benefits</a>
              <a href="#about">About</a>
              <button onClick={() => navigate('/login')} className="btn btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1 className="hero-title">
              Modern HR Management
              <span className="gradient-text"> Simplified</span>
            </h1>
            <p className="hero-subtitle">
              Streamline your HR operations with our comprehensive employee management platform.
              From attendance tracking to payroll processing, we've got you covered.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/login')} className="btn btn-primary btn-lg">
                <span>Start Free Trial</span>
                <span>→</span>
              </button>
              <button className="btn btn-secondary btn-lg">
                <span>Watch Demo</span>
                <span>▶</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item animate-slide-left">
                  <span className="stat-icon">{stat.icon}</span>
                  <div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle">
              Everything you need to manage your workforce efficiently
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon" style={{ background: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <button className="feature-link">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits-section">
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 className="section-title">Why Choose Our Platform?</h2>
              <p className="section-subtitle">
                Built for modern HR teams who value efficiency, security, and user experience.
              </p>
              
              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <div>
                      <h4 className="benefit-title">{benefit.title}</h4>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="benefits-visual">
              <div className="visual-card card-1">
                <div className="visual-header">
                  <span>📊</span>
                  <span>Dashboard</span>
                </div>
                <div className="visual-content">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '85%' }}></div>
                  </div>
                  <div className="visual-stats">
                    <div className="visual-stat">
                      <span className="stat-value">142</span>
                      <span className="stat-label">Present</span>
                    </div>
                    <div className="visual-stat">
                      <span className="stat-value">8</span>
                      <span className="stat-label">On Leave</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your HR Operations?</h2>
            <p className="cta-subtitle">
              Join thousands of companies already using our platform
            </p>
            <div className="cta-buttons">
              <button onClick={() => navigate('/login')} className="btn btn-primary btn-lg">
                Get Started Now
              </button>
              <button className="btn btn-ghost btn-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <div className="footer-logo">
                <span className="logo-icon">🏢</span>
                <span className="logo-text">HR Portal</span>
              </div>
              <p className="footer-description">
                Modern HR management platform designed for the future of work.
              </p>
            </div>
            
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#demo">Demo</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 HR Employee Portal. All rights reserved.</p>
            <div className="footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;