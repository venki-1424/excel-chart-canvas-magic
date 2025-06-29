
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChartBar, ChartLine, ChartArea, ChartPie, Radar, BarChart3 } from 'lucide-react';

interface ChartTypeSelectorProps {
  chartType: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram';
  onChartTypeChange: (type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram') => void;
  onChartTypeHover?: (type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram') => void;
  onHoverEnd?: () => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  chartType,
  onChartTypeChange,
  onChartTypeHover,
  onHoverEnd,
}) => {
  const chartTypes = [
    { type: 'bar' as const, label: 'Bar Chart', icon: ChartBar },
    { type: 'line' as const, label: 'Line Chart', icon: ChartLine },
    { type: 'area' as const, label: 'Area Chart', icon: ChartArea },
    { type: 'pie' as const, label: 'Pie Chart', icon: ChartPie },
    { type: 'radar' as const, label: 'Radar Chart', icon: Radar },
    { type: 'histogram' as const, label: 'Histogram', icon: BarChart3 },
  ];

  return (
    <div className="p-6 bg-card rounded-lg shadow-lg border">
      <h3 className="text-lg font-semibold mb-4">Chart Type</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {chartTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant={chartType === type ? "default" : "outline"}
            onClick={() => onChartTypeChange(type)}
            onMouseEnter={() => onChartTypeHover?.(type)}
            onMouseLeave={onHoverEnd}
            className={`h-16 flex flex-col items-center space-y-2 transition-all duration-200 ${
              chartType === type 
                ? 'shadow-lg' 
                : 'hover:border-primary'
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
