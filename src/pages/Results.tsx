
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ColumnSelector from '@/components/ColumnSelector';
import ChartTypeSelector from '@/components/ChartTypeSelector';
import ChartCanvas, { ChartCanvasRef } from '@/components/ChartCanvas';
import ExportControls from '@/components/ExportControls';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const chartRef = useRef<ChartCanvasRef>(null);
  
  const { data, columns } = location.state || { data: [], columns: [] };
  
  const [xColumn, setXColumn] = useState<string>(columns[0] || '');
  const [yColumn, setYColumn] = useState<string>(columns[1] || '');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram'>('bar');
  
  // Preview states for hover functionality
  const [previewXColumn, setPreviewXColumn] = useState<string>('');
  const [previewYColumn, setPreviewYColumn] = useState<string>('');
  const [previewChartType, setPreviewChartType] = useState<'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram' | ''>('');

  if (!data || data.length === 0) {
    navigate('/');
    return null;
  }

  const handleXColumnHover = (column: string) => {
    setPreviewXColumn(column);
  };

  const handleYColumnHover = (column: string) => {
    setPreviewYColumn(column);
  };

  const handleChartTypeHover = (type: 'bar' | 'line' | 'area' | 'pie' | 'radar' | 'histogram') => {
    setPreviewChartType(type);
  };

  const handleHoverEnd = () => {
    setPreviewXColumn('');
    setPreviewYColumn('');
    setPreviewChartType('');
  };

  // Use preview values if hovering, otherwise use selected values
  const displayXColumn = previewXColumn || xColumn;
  const displayYColumn = previewYColumn || yColumn;
  const displayChartType = previewChartType || chartType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload</span>
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Zidio Analytics
            </h1>
            <p className="text-lg text-muted-foreground">
              Interactive Data Visualization Dashboard
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <ExportControls 
              data={data} 
              chartRef={{ current: chartRef.current?.getCanvas() || null }}
              chartTitle={`${displayYColumn}_vs_${displayXColumn}`}
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-6 mb-8">
          <ColumnSelector
            columns={columns}
            xColumn={xColumn}
            yColumn={yColumn}
            onXColumnChange={setXColumn}
            onYColumnChange={setYColumn}
            onXColumnHover={handleXColumnHover}
            onYColumnHover={handleYColumnHover}
            onHoverEnd={handleHoverEnd}
          />
          
          <ChartTypeSelector
            chartType={chartType}
            onChartTypeChange={setChartType}
            onChartTypeHover={handleChartTypeHover}
            onHoverEnd={handleHoverEnd}
          />
        </div>

        {/* Chart Display Section */}
        <div className="mb-8">
          <ChartCanvas
            ref={chartRef}
            data={data}
            xColumn={displayXColumn}
            yColumn={displayYColumn}
            chartType={displayChartType}
          />
        </div>

        {/* Data Info Section */}
        <div className="bg-card rounded-lg shadow-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Data Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-500">{data.length}</div>
              <div className="text-sm text-muted-foreground">Total Rows</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-500">{columns.length}</div>
              <div className="text-sm text-muted-foreground">Columns</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-500">{displayXColumn || 'None'}</div>
              <div className="text-sm text-muted-foreground">X-Axis {previewXColumn && '(Preview)'}</div>
            </div>
            <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-500">{displayYColumn || 'None'}</div>
              <div className="text-sm text-muted-foreground">Y-Axis {previewYColumn && '(Preview)'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
