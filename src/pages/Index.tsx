
import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ColumnSelector from '@/components/ColumnSelector';
import ChartTypeSelector from '@/components/ChartTypeSelector';
import ChartCanvas from '@/components/ChartCanvas';

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [xColumn, setXColumn] = useState<string>('');
  const [yColumn, setYColumn] = useState<string>('');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');

  const handleDataLoad = (loadedData: any[], availableColumns: string[]) => {
    setData(loadedData);
    setColumns(availableColumns);
    // Auto-select first two columns if available
    if (availableColumns.length >= 2) {
      setXColumn(availableColumns[0]);
      setYColumn(availableColumns[1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Zidio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your Excel file and create beautiful interactive charts with dynamic column selection
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <FileUpload onDataLoad={handleDataLoad} />
        </div>

        {/* Controls Section */}
        {columns.length > 0 && (
          <div className="space-y-6 mb-8">
            <ColumnSelector
              columns={columns}
              xColumn={xColumn}
              yColumn={yColumn}
              onXColumnChange={setXColumn}
              onYColumnChange={setYColumn}
            />
            
            <ChartTypeSelector
              chartType={chartType}
              onChartTypeChange={setChartType}
            />
          </div>
        )}

        {/* Chart Display Section */}
        <div className="mb-8">
          <ChartCanvas
            data={data}
            xColumn={xColumn}
            yColumn={yColumn}
            chartType={chartType}
          />
        </div>

        {/* Data Info Section */}
        {data.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Data Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{data.length}</div>
                <div className="text-sm text-gray-600">Total Rows</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{columns.length}</div>
                <div className="text-sm text-gray-600">Columns</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{xColumn || 'None'}</div>
                <div className="text-sm text-gray-600">X-Axis</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">{yColumn || 'None'}</div>
                <div className="text-sm text-gray-600">Y-Axis</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
