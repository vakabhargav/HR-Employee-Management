import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  const handleActionClick = (path) => {
    navigate(path);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  };

  const buttonStyle = (color) => ({
    background: 'white',
    border: `2px solid ${color}`,
    borderRadius: '10px',
    padding: '1.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
    color: 'inherit',
  });

  const iconStyle = (color) => ({
    fontSize: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `${color}20`,
    border: `2px solid ${color}`,
  });

  const labelStyle = {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  };

  const descriptionStyle = {
    fontSize: '0.8rem',
    color: '#666',
    textAlign: 'center',
    margin: 0,
  };

  return (
    <div style={gridStyle}>
      {actions.map((action, index) => (
        <button
          key={index}
          style={buttonStyle(action.color)}
          onClick={() => handleActionClick(action.path)}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={iconStyle(action.color)}>
            {action.icon}
          </div>
          <span style={labelStyle}>{action.label}</span>
          {action.description && (
            <p style={descriptionStyle}>{action.description}</p>
          )}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;