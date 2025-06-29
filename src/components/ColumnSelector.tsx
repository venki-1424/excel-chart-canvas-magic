
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface ColumnSelectorProps {
  columns: string[];
  xColumn: string;
  yColumn: string;
  onXColumnChange: (column: string) => void;
  onYColumnChange: (column: string) => void;
  onXColumnHover?: (column: string) => void;
  onYColumnHover?: (column: string) => void;
  onHoverEnd?: () => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  xColumn,
  yColumn,
  onXColumnChange,
  onYColumnChange,
  onXColumnHover,
  onYColumnHover,
  onHoverEnd,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card rounded-lg shadow-lg border">
      <div className="space-y-3">
        <Label htmlFor="x-axis" className="text-sm font-semibold">
          X-Axis Column
        </Label>
        <Select value={xColumn} onValueChange={onXColumnChange}>
          <SelectTrigger id="x-axis" className="w-full h-12 border-2 hover:border-primary transition-colors">
            <SelectValue placeholder="Select X-axis column" />
          </SelectTrigger>
          <SelectContent 
            className="bg-popover border-2 shadow-xl z-50"
            onPointerLeave={onHoverEnd}
          >
            {columns.map((column) => (
              <SelectItem 
                key={column} 
                value={column}
                className="hover:bg-accent cursor-pointer py-3 px-4"
                onMouseEnter={() => onXColumnHover?.(column)}
              >
                {column}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label htmlFor="y-axis" className="text-sm font-semibold">
          Y-Axis Column
        </Label>
        <Select value={yColumn} onValueChange={onYColumnChange}>
          <SelectTrigger id="y-axis" className="w-full h-12 border-2 hover:border-primary transition-colors">
            <SelectValue placeholder="Select Y-axis column" />
          </SelectTrigger>
          <SelectContent 
            className="bg-popover border-2 shadow-xl z-50"
            onPointerLeave={onHoverEnd}
          >
            {columns.map((column) => (
              <SelectItem 
                key={column} 
                value={column}
                className="hover:bg-accent cursor-pointer py-3 px-4"
                onMouseEnter={() => onYColumnHover?.(column)}
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
