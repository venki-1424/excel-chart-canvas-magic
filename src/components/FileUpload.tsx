
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onDataLoad?: (data: any[], columns: string[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoad }) => {
  const navigate = useNavigate();

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length > 0) {
          const columns = Object.keys(jsonData[0] as object);
          console.log('Loaded data:', jsonData);
          console.log('Available columns:', columns);
          
          // Navigate to results page with data
          navigate('/results', { 
            state: { data: jsonData, columns: columns } 
          });
          
          // Call onDataLoad if provided (for backward compatibility)
          if (onDataLoad) {
            onDataLoad(jsonData, columns);
          }
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please make sure it\'s a valid Excel file.');
      }
    };
    reader.readAsArrayBuffer(file);
  }, [navigate, onDataLoad]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (excelFile) {
      handleFileUpload(excelFile);
    } else {
      alert('Please upload an Excel file (.xlsx or .xls)');
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, [handleFileUpload]);

  return (
    <div
      className="border-2 border-dashed border-blue-500 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-gradient-to-br from-gray-800 to-gray-700"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <FileSpreadsheet className="w-16 h-16 text-blue-400 mx-auto" />
          <Upload className="w-6 h-6 text-blue-300 absolute -top-1 -right-1 bg-gray-800 rounded-full p-1" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-2">
            Upload Excel File
          </h3>
          <p className="text-gray-400 mb-4">
            Drag and drop your Excel file here, or click to browse
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer shadow-lg hover:shadow-xl">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Supports .xlsx and .xls files
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
