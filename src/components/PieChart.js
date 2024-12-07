// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './PieChart.css'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const colorPalette = ['#008884', '#652885', '#86649C', '#C6A4DB', '#5A4E61', '#413647'];
  
  const sortedData = [...data].sort((a, b) => b.percentage - a.percentage);
  
  const chartData = {
    labels: sortedData.map(item => item.area),
    datasets: [
      {
        data: sortedData.map(item => item.percentage),
        backgroundColor: colorPalette.slice(0, sortedData.length),
        hoverBackgroundColor: colorPalette.slice(0, sortedData.length),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className='pie-container'>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
