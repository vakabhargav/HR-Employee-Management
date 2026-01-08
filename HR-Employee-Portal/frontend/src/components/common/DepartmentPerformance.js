import React from 'react';
import { formatINR } from '../../utils/currency';

const DepartmentPerformance = ({ metrics, departments }) => {
  // Accept both metrics and departments props for compatibility
  const data = metrics || departments || [];
  
  const getSatisfactionColor = (score) => {
    if (score >= 4.5) return '#28a745';
    if (score >= 4.0) return '#ffc107';
    return '#dc3545';
  };

  const getTurnoverColor = (rate) => {
    if (rate <= 2) return '#28a745';
    if (rate <= 4) return '#ffc107';
    return '#dc3545';
  };

  // Handle case when no data is available
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          textAlign: 'center',
          color: '#666'
        }}>
          No department performance data available
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {data.map((dept, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '600', color: '#333' }}>{dept.name}</span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>{dept.employees} employees</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', fontSize: '0.8rem' }}>
              <div>
                <div style={{ color: '#666', marginBottom: '0.25rem' }}>Avg Salary</div>
                <div style={{ fontWeight: '600', color: '#333' }}>
                  {formatINR(dept.avgSalary)}
                </div>
              </div>
              <div>
                <div style={{ color: '#666', marginBottom: '0.25rem' }}>Satisfaction</div>
                <div style={{ fontWeight: '600', color: getSatisfactionColor(dept.satisfaction) }}>
                  {dept.satisfaction}/5
                </div>
              </div>
              <div>
                <div style={{ color: '#666', marginBottom: '0.25rem' }}>Turnover</div>
                <div style={{ fontWeight: '600', color: getTurnoverColor(dept.turnover) }}>
                  {dept.turnover}%
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentPerformance;