import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    if (loading && !canceled) {
      const totalTime = 5000;
      const intervalTime = 100;
      const steps = totalTime / intervalTime;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        setProgress(Math.round((currentStep / steps) * 100));

        if (currentStep >= steps) {
          clearInterval(interval);
          fetch('https://fakeapi.extendsclass.com/countries')
            .then(response => response.json())
            .then((responseData) => {
              setData(responseData);
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching data:", error);
              setLoading(false);
              setProgress(null);
            });
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, [loading, canceled]);

  const handleCancel = () => {
    setCanceled(true);
    setProgress(null);
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: 'white' }}>
      <h1>Data Loading Simulation</h1>
      {loading ? (
        <ProgressBar title="Loading Data" percentage={progress} onCancel={handleCancel} />
      ) : (
        <div>
          <h2>Loaded Data:</h2>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>No data loaded.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;