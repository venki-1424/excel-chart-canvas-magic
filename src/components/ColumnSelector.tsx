
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ColumnSelectorProps {
  columns: string[];
  xColumn: string;
  yColumn: string;
  onXColumnChange: (column: string) => void;
  onYColumnChange: (column: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  xColumn,
  yColumn,
  onXColumnChange,
  onYColumnChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="space-y-3">
        <Label htmlFor="x-axis" className="text-sm font-semibold text-gray-200">
          X-Axis Column
        </Label>
        <Select value={xColumn} onValueChange={onXColumnChange}>
          <SelectTrigger id="x-axis" className="w-full h-12 border-2 border-gray-600 bg-gray-700 text-gray-200 hover:border-blue-500 transition-colors">
            <SelectValue placeholder="Select X-axis column" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-2 border-gray-600 shadow-xl z-50">
            {columns.map((column) => (
              <SelectItem 
                key={column} 
                value={column}
                className="hover:bg-gray-600 cursor-pointer py-3 px-4 text-gray-200"
              >
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="y-axis" className="text-sm font-semibold text-gray-200">
          Y-Axis Column
        </Label>
        <Select value={yColumn} onValueChange={onYColumnChange}>
          <SelectTrigger id="y-axis" className="w-full h-12 border-2 border-gray-600 bg-gray-700 text-gray-200 hover:border-blue-500 transition-colors">
            <SelectValue placeholder="Select Y-axis column" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-2 border-gray-600 shadow-xl z-50">
            {columns.map((column) => (
              <SelectItem 
                key={column} 
                value={column}
                className="hover:bg-gray-600 cursor-pointer py-3 px-4 text-gray-200"
              >
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ColumnSelector;
