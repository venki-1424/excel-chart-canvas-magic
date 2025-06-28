
import React from 'react';
import FileUpload from '@/components/FileUpload';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Zidio
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Upload your Excel file and create beautiful interactive charts with dynamic column selection
          </p>
        </div>

        {/* File Upload Section */}
        <div className="max-w-2xl mx-auto">
          <FileUpload />
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Powerful Data Visualization Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-blue-400 text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Multiple Chart Types</h3>
              <p className="text-gray-400 text-sm">
                Bar, Line, Area, Pie, Radar, and Histogram charts
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-green-400 text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Interactive Controls</h3>
              <p className="text-gray-400 text-sm">
                Dynamic column selection for X and Y axes
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-purple-400 text-3xl mb-4">🎨</div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Beautiful Design</h3>
              <p className="text-gray-400 text-sm">
                Modern dark theme with smooth animations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
