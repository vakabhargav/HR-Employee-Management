import React from 'react';

const StatCard = ({ title, value, change, trend, icon, color, loading = false }) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const getTrendClass = () => {
    switch (trend) {
      case 'up': return 'trend-up';
      case 'down': return 'trend-down';
      default: return 'trend-neutral';
    }
  };

  const cardStyle = {
    borderLeft: `4px solid ${color}`,
    background: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  };

  const iconStyle = {
    backgroundColor: `${color}20`,
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  };

  const trendStyle = {
    fontSize: '0.8rem',
    fontWeight: '500',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    background: trend === 'up' ? '#d4edda' : trend === 'down' ? '#f8d7da' : '#e2e3e5',
    color: trend === 'up' ? '#155724' : trend === 'down' ? '#721c24' : '#383d41',
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={iconStyle}>⏳</div>
          <div style={trendStyle}>Loading...</div>
        </div>
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', color: '#333' }}>--</h3>
          <p style={{ margin: 0, color: '#666' }}>{title}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={iconStyle}>{icon}</div>
        <div style={trendStyle}>
          {getTrendIcon()} {change}
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem', color: '#333' }}>{value}</h3>
        <p style={{ margin: 0, color: '#666' }}>{title}</p>
      </div>
    </div>
  );
};

export default StatCard;