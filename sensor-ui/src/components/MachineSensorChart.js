import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";

const MachineSensorChart = ({ data }) => {
  // Pass data as a prop
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (data) {
      const labels = data.map((point) =>
        new Date(point.ts * 1000).toLocaleTimeString()
      ); // Assuming timestamps in seconds, convert to milliseconds for Date object
      const colors = data.map((point) =>
        point.value === 0 ? 'yellow' : point.value === 1 ? 'green' : 'red'
      );
      const chartDataset = {
        label: 'Cycle Status',
        data: data.map((point) => point.value),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      };

      setChartData({ labels, datasets: [chartDataset] });
    }
  }, [data]);

  const chartOptions = {
    maintainAspectRatio: false, // Adjust chart dimensions as needed
    scales: {
      xAxes: [
        {
          type: 'time', // Set x-axis as time scale
          time: {
            unit: 'second', // Display time in seconds
            unitStepSize: 1, // Show data for each second
            displayFormats: {
              second: 'HH:mm:ss', // Format time labels (adjust as needed)
            },
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1,
          },
        },
      ],
    },
  };

  return (
    <div className="machine-sensor-ui">
      <h1>Machine Sensor Data</h1>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MachineSensorChart;
