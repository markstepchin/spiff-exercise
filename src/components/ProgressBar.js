import React from 'react';

const ProgressBar = ({ progress }) => (
  <div className="progress-bar">
    <div style={{ width: progress + '%' }} className="progress-bar__progress"></div>
  </div>
);

export default ProgressBar;
