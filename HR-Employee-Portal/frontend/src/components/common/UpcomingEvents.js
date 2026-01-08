import React from 'react';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Performance Review Cycle',
      date: '2024-01-15',
      type: 'review',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Payroll Processing',
      date: '2024-01-20',
      type: 'payroll',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Team Building Workshop',
      date: '2024-01-25',
      type: 'training',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Quarterly Planning',
      date: '2024-02-01',
      type: 'meeting',
      priority: 'medium'
    }
  ];

  const getPriorityStyle = (priority) => {
    const styles = {
      high: { background: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' },
      medium: { background: '#fff3cd', color: '#856404', borderColor: '#ffeaa7' },
      low: { background: '#d1edff', color: '#0c5460', borderColor: '#bee5eb' },
    };
    return styles[priority] || styles.medium;
  };

  const getTypeIcon = (type) => {
    const icons = {
      review: '⭐',
      payroll: '💰',
      training: '🎓',
      meeting: '📅',
    };
    return icons[type] || '📌';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {events.map(event => (
        <div
          key={event.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <div style={{ fontSize: '1.5rem' }}>
            {getTypeIcon(event.type)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.25rem' }}>
              {event.title}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              {new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '15px',
              fontSize: '0.7rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              ...getPriorityStyle(event.priority)
            }}
          >
            {event.priority}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;