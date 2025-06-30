
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
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
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  RadialLinearScale
);

interface ChartCanvasProps {
  data: any[];
  xColumn: string;
  yColumn: string;
  chartType: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram';
}

export interface ChartCanvasRef {
  getCanvas: () => HTMLCanvasElement | null;
}

const ChartCanvas = forwardRef<ChartCanvasRef, ChartCanvasProps>(({ data, xColumn, yColumn, chartType }, ref) => {
  const barChartRef = useRef<ChartJS<'bar'>>(null);
  const lineChartRef = useRef<ChartJS<'line'>>(null);
  const pieChartRef = useRef<ChartJS<'pie'>>(null);
  const radarChartRef = useRef<ChartJS<'radar'>>(null);

  useImperativeHandle(ref, () => ({
    getCanvas: () => {
      let currentRef = null;
      switch (chartType) {
        case 'bar':
        case 'histogram':
          currentRef = barChartRef.current;
          break;
        case 'line':
        case 'area':
          currentRef = lineChartRef.current;
          break;
        case 'pie':
          currentRef = pieChartRef.current;
          break;
        case 'radar':
          currentRef = radarChartRef.current;
          break;
        default:
          currentRef = barChartRef.current;
      }
      return currentRef?.canvas || null;
    },
  }));

  if (!data.length || !xColumn || !yColumn) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-400 text-lg">Select columns to display chart</p>
        </div>
      </div>
    );
  }

  const generateColors = (count: number) => {
    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 101, 101, 0.8)',
      'rgba(251, 191, 36, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
      'rgba(6, 182, 212, 0.8)',
      'rgba(34, 197, 94, 0.8)',
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  const chartData = {
    labels: data.map(row => row[xColumn]),
    datasets: [
      {
        label: yColumn,
        data: data.map(row => parseFloat(row[yColumn]) || 0),
        backgroundColor: chartType === 'pie' || chartType === 'radar' 
          ? generateColors(data.length)
          : chartType === 'bar' 
          ? 'rgba(59, 130, 246, 0.6)' 
          : chartType === 'area' 
          ? 'rgba(59, 130, 246, 0.2)'
          : 'transparent',
        borderColor: chartType === 'pie' 
          ? generateColors(data.length).map(color => color.replace('0.8', '1'))
          : 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: chartType === 'area' || chartType === 'radar',
        tension: chartType === 'line' || chartType === 'area' ? 0.4 : 0,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: chartType === 'bar' || chartType === 'pie' ? 0 : 6,
        pointHoverRadius: chartType === 'bar' || chartType === 'pie' ? 0 : 8,
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
            weight: 'bold' as const,
          },
          color: '#e5e7eb',
        },
      },
      title: {
        display: true,
        text: `${yColumn} vs ${xColumn}`,
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        color: '#f9fafb',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: chartType === 'pie' ? {} : chartType === 'radar' ? {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    } : {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
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

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
      case 'histogram':
        return <Bar data={chartData} options={options} ref={barChartRef} />;
      case 'line':
      case 'area':
        return <Line data={chartData} options={options} ref={lineChartRef} />;
      case 'pie':
        return <Pie data={chartData} options={options} ref={pieChartRef} />;
      case 'radar':
        return <Radar data={chartData} options={options} ref={radarChartRef} />;
      default:
        return <Bar data={chartData} options={options} ref={barChartRef} />;
    }
  };

  return (
    <div className="h-96 w-full bg-background border rounded-lg shadow-lg p-4">
      {renderChart()}
    </div>
  );
});

ChartCanvas.displayName = 'ChartCanvas';

export default ChartCanvas;
