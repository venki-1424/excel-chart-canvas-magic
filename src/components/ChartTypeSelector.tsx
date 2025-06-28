
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBar, ChartLine, ChartArea } from 'lucide-react';

interface ChartTypeSelectorProps {
  chartType: 'bar' | 'line' | 'area';
  onChartTypeChange: (type: 'bar' | 'line' | 'area') => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  chartType,
  onChartTypeChange,
}) => {
  const chartTypes = [
    { type: 'bar' as const, label: 'Bar Chart', icon: ChartBar },
    { type: 'line' as const, label: 'Line Chart', icon: ChartLine },
    { type: 'area' as const, label: 'Area Chart', icon: ChartArea },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Chart Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {chartTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant={chartType === type ? "default" : "outline"}
            onClick={() => onChartTypeChange(type)}
            className={`h-16 flex flex-col items-center space-y-2 transition-all duration-200 ${
              chartType === type 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                : 'hover:bg-blue-50 hover:border-blue-300'
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
