import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './header';
import './Help.css';

const Help = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'attendance', name: 'Attendance', icon: '⏰' },
    { id: 'leave', name: 'Leave Management', icon: '📅' },
    { id: 'payroll', name: 'Payroll', icon: '💰' },
    { id: 'performance', name: 'Performance', icon: '⭐' },
    { id: 'account', name: 'Account Settings', icon: '⚙️' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' },
  ];

  const helpContent = {
    'getting-started': {
      title: 'Getting Started',
      faqs: [
        {
          question: 'How do I complete my profile?',
          answer: 'Navigate to "My Profile" from the user menu in the top right. Click "Edit Profile" and fill in all required fields including personal information, contact details, and emergency contacts. Don\'t forget to save your changes!'
        },
        {
          question: 'How do I navigate the dashboard?',
          answer: 'The dashboard is your central hub. Use the top navigation bar to access different modules. HR and Managers have access to additional features like employee management and payroll.'
        },
        {
          question: 'What are the different user roles?',
          answer: 'There are three roles: HR (full access), Manager (department-level access), and Employee (personal access). Your role determines which features and data you can access.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings → Privacy & Security → Change Password. Enter your current password and new password, then save changes.'
        }
      ]
    },
    'attendance': {
      title: 'Attendance Management',
      faqs: [
        {
          question: 'How do I mark my attendance?',
          answer: 'Go to the Attendance page and click "Check In" when you start work and "Check Out" when you finish. You can also add notes to explain any late arrivals or early departures.'
        },
        {
          question: 'Can I view my attendance history?',
          answer: 'Yes! The Attendance page shows your complete history including check-in/out times, total hours worked, and any notes. You can filter by date range.'
        },
        {
          question: 'What if I forgot to check in/out?',
          answer: 'Contact your manager or HR to manually adjust your attendance record. Provide the correct times and reason for the adjustment.'
        },
        {
          question: 'How are attendance reports generated?',
          answer: 'HR and Managers can generate attendance reports from the Attendance module. Reports can be filtered by employee, department, or date range.'
        }
      ]
    },
    'leave': {
      title: 'Leave Management',
      faqs: [
        {
          question: 'How do I request leave?',
          answer: 'Navigate to Leave → New Request. Select leave type (sick, vacation, personal), specify dates, and add any relevant notes. Submit for manager approval.'
        },
        {
          question: 'How long does leave approval take?',
          answer: 'Typically 1-3 business days. You\'ll receive a notification once your manager approves or rejects the request. Check the Leave page for status updates.'
        },
        {
          question: 'Can I cancel a leave request?',
          answer: 'Yes, you can cancel pending requests. Go to Leave Management, find your request, and click "Cancel". Approved requests may require manager approval to cancel.'
        },
        {
          question: 'How do I check my leave balance?',
          answer: 'Your current leave balance is displayed on the Leave page and your dashboard. It shows available days for each leave type.'
        }
      ]
    },
    'payroll': {
      title: 'Payroll & Payslips',
      faqs: [
        {
          question: 'How do I view my payslips?',
          answer: 'Click on Payslips in the navigation menu. You\'ll see all your historical payslips. Click on any month to view details or download as PDF.'
        },
        {
          question: 'What information is on my payslip?',
          answer: 'Payslips show gross salary, deductions (tax, insurance, etc.), allowances, bonuses, and net salary. They also include your bank details and payment date.'
        },
        {
          question: 'When are salaries processed?',
          answer: 'Salaries are typically processed on the last working day of each month. Payslips become available on the same day.'
        },
        {
          question: 'How do I report payroll discrepancies?',
          answer: 'Contact HR immediately through the Help Center or email. Include your employee ID, the affected month, and details of the discrepancy.'
        }
      ]
    },
    'performance': {
      title: 'Performance Reviews',
      faqs: [
        {
          question: 'How often are performance reviews conducted?',
          answer: 'Formal reviews are typically conducted quarterly or annually. Your manager may also provide informal feedback throughout the year.'
        },
        {
          question: 'How do I view my performance reviews?',
          answer: 'Go to the Performance page to see all your reviews, ratings, feedback, and goals. You can filter by date or reviewer.'
        },
        {
          question: 'Can I add self-assessment comments?',
          answer: 'Yes! When a review is initiated, you\'ll be notified to complete your self-assessment. Add your comments and achievements before the deadline.'
        },
        {
          question: 'How are performance ratings calculated?',
          answer: 'Ratings are based on multiple factors including goal achievement, competencies, and manager feedback. The final rating is on a scale of 1-5.'
        }
      ]
    },
    'account': {
      title: 'Account Settings',
      faqs: [
        {
          question: 'How do I update my personal information?',
          answer: 'Go to Settings → Account and update your email, phone, language preferences, and timezone. Save changes when done.'
        },
        {
          question: 'How do I manage notification preferences?',
          answer: 'Visit Settings → Notifications to customize which notifications you receive via email and push notifications. Toggle each category on or off.'
        },
        {
          question: 'Can I change the app theme?',
          answer: 'Yes! Go to Settings → Appearance to switch between Light, Dark, or Auto theme. You can also enable Compact Mode for a denser layout.'
        },
        {
          question: 'How do I control my privacy settings?',
          answer: 'Visit Settings → Privacy to manage profile visibility, choose who can see your contact information, and change your password.'
        }
      ]
    },
    'troubleshooting': {
      title: 'Troubleshooting',
      faqs: [
        {
          question: 'I can\'t log in. What should I do?',
          answer: 'First, verify your email and password are correct. Use the "Forgot Password" link to reset if needed. Clear browser cache and try again. Contact IT if the issue persists.'
        },
        {
          question: 'The page is loading slowly. How can I fix this?',
          answer: 'Check your internet connection. Clear browser cache and cookies. Try using a different browser. If the problem continues, report it to IT support.'
        },
        {
          question: 'I\'m not receiving email notifications.',
          answer: 'Check your spam folder. Verify notification settings in Settings → Notifications. Ensure your email address is correct in your profile. Contact IT if still not working.'
        },
        {
          question: 'How do I report a bug or issue?',
          answer: 'Use the "Contact Support" form below. Provide detailed information including what you were doing, error messages, and screenshots if possible.'
        }
      ]
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const currentContent = helpContent[activeCategory];

  const filteredFaqs = currentContent.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <div className="help-page">
        <div className="help-header">
          <h1>❓ Help Center</h1>
          <p>Find answers to common questions and get support</p>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="help-container">
          <div className="help-sidebar">
            <h3>Categories</h3>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="help-content">
            <div className="content-header">
              <h2>{currentContent.title}</h2>
              <p>{filteredFaqs.length} article{filteredFaqs.length !== 1 ? 's' : ''}</p>
            </div>

            <div className="faq-list">
              {filteredFaqs.length === 0 ? (
                <div className="no-results">
                  <span className="no-results-icon">🔍</span>
                  <h3>No results found</h3>
                  <p>Try different keywords or browse categories</p>
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-toggle">{expandedFaq === index ? '−' : '+'}</span>
                    </button>
                    {expandedFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="support-section">
          <div className="support-card">
            <div className="support-icon">📧</div>
            <h3>Email Support</h3>
            <p>Get help via email</p>
            <a href="mailto:support@hrportal.com" className="support-link">
              support@hrportal.com
            </a>
          </div>
          <div className="support-card">
            <div className="support-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Chat with our team</p>
            <button className="support-button">Start Chat</button>
          </div>
          <div className="support-card">
            <div className="support-icon">📞</div>
            <h3>Phone Support</h3>
            <p>Call us for urgent issues</p>
            <a href="tel:+1234567890" className="support-link">
              +1 (234) 567-890
            </a>
          </div>
          <div className="support-card">
            <div className="support-icon">📚</div>
            <h3>Documentation</h3>
            <p>Read our full guides</p>
            <button className="support-button">View Docs</button>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Still Need Help?</h2>
          <p>Send us a message and we'll get back to you as soon as possible.</p>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  defaultValue={`${user?.firstName} ${user?.lastName}`}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="form-input"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Brief description of your issue"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="5"
                placeholder="Please describe your issue in detail..."
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
