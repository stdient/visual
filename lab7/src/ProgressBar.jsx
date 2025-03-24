import React from 'react';

const ProgressBar = ({ title, percentage, onCancel }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: '300px', color: 'white' }}>
      <h3>{title}</h3>
      {percentage !== null ? (
        <div>
          <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px' }}>
            <div
              style={{
                width: `${percentage}%`,
                backgroundColor: '#70f321',
                height: '24px',
                borderRadius: '5px',
                textAlign: 'center',
                color: 'black',
                lineHeight: '24px',
              }}
            >
              {percentage}%
            </div>
          </div>
          <button onClick={onCancel} style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      ) : (
        <p>Canceled</p>
      )}
    </div>
  );
};

export default ProgressBar;