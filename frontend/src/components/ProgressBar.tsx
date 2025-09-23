// /assessment_engine/frontend/components/ProgressBar.tsx

import React from 'react';

interface Props {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: Props) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  return (
    <div style={{ width: '100%', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden', height: '10px', marginBottom: '1rem' }}>
      <div style={{ width: `${percentage}%`, backgroundColor: '#007bff', height: '100%', transition: 'width 0.3s ease-in-out' }}></div>
    </div>
  );
};