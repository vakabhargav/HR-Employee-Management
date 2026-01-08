import React from 'react';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      action: 'New employee onboarded',
      user: 'John Doe',
      time: '2 hours ago',
      type: 'success'
    },
    {
      id: 2,
      action: 'Leave request approved',
      user: 'Sarah Wilson',
      time: '4 hours ago',
      type: 'info'
    },
    {
      id: 3,
      action: 'Payroll processed',
      user: 'Mike Johnson',
      time: '1 day ago',
      type: 'warning'
    },
    {
      id: 4,
      action: 'Performance review completed',
      user: 'Emily Chen',
      time: '2 days ago',
      type: 'success'
    },
    {
      id: 5,
      action: 'Training scheduled',
      user: 'David Brown',
      time: '3 days ago',
      type: 'info'
    }
  ];

  const getTypeStyle = (type) => {
    const styles = {
      success: { background: '#d4edda', color: '#155724' },
      info: { background: '#d1edff', color: '#0c5460' },
      warning: { background: '#fff3cd', color: '#856404' },
    };
    return styles[type] || styles.info;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {activities.map(activity => (
        <div
          key={activity.id}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: '4px solid #667eea',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600', color: '#333', marginBottom: '0.25rem' }}>
              {activity.action}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              by {activity.user}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                ...getTypeStyle(activity.type)
              }}
            >
              {activity.type}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#999' }}>
              {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivities;