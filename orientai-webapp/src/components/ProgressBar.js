import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;
