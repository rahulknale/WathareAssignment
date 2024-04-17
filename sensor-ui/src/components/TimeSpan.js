import React from 'react';
import { useState } from 'react';
import MachineSensorChart from './MachineSensorChart';
//import Data from "./Data";

function TimeSpan() {
  const [interval, setInterval] = useState(1); // Default interval is 1 hour
  const [scaleValues, setScaleValues] = useState([...Array(25).keys()]); // Default scale values for 24 hours

  // Function to update scale based on interval
  const updateScale = (interval) => {
    const newScaleValues = [...Array(25 / interval).keys()].map(
      (i) => i * interval
    );
    setScaleValues(newScaleValues);
  };

  const handle1hr = () => {
    return <div>15:00:00</div>;
  };

  return (
    <div>
      <div className="button-container">
        <div
          className="text-white text-xl text-center w-full bg-blue-900 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
          {/* <button className="button" onClick={handle1hr}>
          1 hr
        </button>
        <button className="button">8 hr</button>
        <button className="button">24 hr</button> */}

          <button
            onClick={() => {
              setInterval(1);
              updateScale(1);
            }}>
            1 hr
          </button>
          <button
            onClick={() => {
              setInterval(8);
              updateScale(8);
            }}>
            8 hr
          </button>
          <button
            onClick={() => {
              setInterval(24);
              updateScale(24);
            }}>
            24 hr
          </button>
        </div>
      </div>

      <div>
        <MachineSensorChart></MachineSensorChart>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {scaleValues.map((value) => (
          <span key={value}>{value < 10 ? '0' + value : value}:00</span>
        ))}
      </div>
    </div>
  );
}

export default TimeSpan;
