
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBar, ChartLine, ChartArea, ChartPie, Radar, Histogram } from 'lucide-react';

interface ChartTypeSelectorProps {
  chartType: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram';
  onChartTypeChange: (type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram') => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  chartType,
  onChartTypeChange,
}) => {
  const chartTypes = [
    { type: 'bar' as const, label: 'Bar Chart', icon: ChartBar },
    { type: 'line' as const, label: 'Line Chart', icon: ChartLine },
    { type: 'area' as const, label: 'Area Chart', icon: ChartArea },
    { type: 'pie' as const, label: 'Pie Chart', icon: ChartPie },
    { type: 'radar' as const, label: 'Radar Chart', icon: Radar },
    { type: 'histogram' as const, label: 'Histogram', icon: Histogram },
  ];

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Chart Type</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {chartTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant={chartType === type ? "default" : "outline"}
            onClick={() => onChartTypeChange(type)}
            className={`h-16 flex flex-col items-center space-y-2 transition-all duration-200 ${
              chartType === type 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-blue-500'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChartTypeSelector;
