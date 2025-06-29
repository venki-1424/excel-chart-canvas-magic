
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { downloadChart, downloadExcelData } from '@/utils/exportUtils';

interface ExportControlsProps {
  data: any[];
  chartRef?: React.RefObject<HTMLCanvasElement>;
  chartTitle?: string;
}

const ExportControls: React.FC<ExportControlsProps> = ({ data, chartRef, chartTitle = 'chart' }) => {
  const handleChartDownload = async (format: 'png' | 'pdf') => {
    if (chartRef?.current) {
      await downloadChart(chartRef.current, chartTitle, format);
    }
  };

  const handleDataDownload = () => {
    downloadExcelData(data, 'filtered-data');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem onClick={() => handleChartDownload('png')} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Chart as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChartDownload('pdf')} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Chart as PDF
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDataDownload} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Excel Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportControls;
