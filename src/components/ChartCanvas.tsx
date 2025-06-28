
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartCanvasProps {
  data: any[];
  xColumn: string;
  yColumn: string;
  chartType: 'bar' | 'line' | 'area';
}

const ChartCanvas: React.FC<ChartCanvasProps> = ({ data, xColumn, yColumn, chartType }) => {
  if (!data.length || !xColumn || !yColumn) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-500 text-lg">Select columns to display chart</p>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: data.map(row => row[xColumn]),
    datasets: [
      {
        label: yColumn,
        data: data.map(row => parseFloat(row[yColumn]) || 0),
        backgroundColor: chartType === 'bar' 
          ? 'rgba(59, 130, 246, 0.6)' 
          : chartType === 'area' 
          ? 'rgba(59, 130, 246, 0.2)'
          : 'transparent',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: chartType === 'area',
        tension: chartType === 'line' || chartType === 'area' ? 0.4 : 0,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'bar' ? 0 : 6,
        pointHoverRadius: chartType === 'bar' ? 0 : 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: '500',
          },
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: `${yColumn} vs ${xColumn}`,
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#1f2937',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const,
    },
  };

  return (
    <div className="h-96 w-full bg-white rounded-lg shadow-lg p-4 border">
      {chartType === 'bar' ? (
        <Bar data={chartData} options={options} />
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartCanvas;
