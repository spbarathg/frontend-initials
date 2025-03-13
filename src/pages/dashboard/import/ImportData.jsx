import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  QuestionMarkCircleIcon, 
  XMarkIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';
import FieldMapping, { systemFields } from '../../../components/import/FieldMapping';
import ApiCredentials from '../../../components/import/ApiCredentials';
import { processImport, validateData } from '../../../services/importService';
import { useNavigate } from 'react-router-dom';

const parseCSV = (lines) => {
  if (lines.length === 0) return [];
  
  const data = [];
  let inQuotes = false;
  let currentField = '';
  let fields = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      
      if (char === ',' && !inQuotes) {
        fields.push(currentField.trim());
        currentField = '';
        continue;
      }
      
      currentField += char;
    }
    
    fields.push(currentField.trim());
    data.push(fields);
    
    fields = [];
    currentField = '';
    inQuotes = false;
  }
  
  return data;
};

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);
  const [importType, setImportType] = useState('inventory');
  const [isValidating, setIsValidating] = useState(false);
  const [importStep, setImportStep] = useState(1);
  const [dataSource, setDataSource] = useState('csv');
  const [validationResults, setValidationResults] = useState(null);
  const [mappings, setMappings] = useState({});
  const [importStats, setImportStats] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({ type: '', message: '' });
  const [progress, setProgress] = useState(0);
  const [selectedSource, setSelectedSource] = useState('csv');
  const navigate = useNavigate();

  useEffect(() => {
    setProgress((importStep / 5) * 100);
  }, [importStep]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    try {
      setFile(file);
      setProgress(0);
      
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const content = reader.result;
          const lines = content.split('\n').filter(line => line.trim());
          const parsedData = parseCSV(lines);
          setPreviewData(parsedData); // Add this line to set preview data
          
          // Validate data
          await validateData(parsedData);
          
          // Process import with progress
          await processImport(parsedData, selectedSource, (progress) => {
            setProgress(progress);
          });
          
          setNotificationData({
            type: 'success',
            message: 'Import completed successfully'
          });
        } catch (error) {
          setNotificationData({
            type: 'error',
            message: error.message
          });
        }
      };
      
      reader.readAsText(file);
    } catch (error) {
      setNotificationData({
        type: 'error',
        message: `File reading failed: ${error.message}`
      });
    }
  }, [selectedSource]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false
  });

  const handleDataSourceChange = (source) => {
    setSelectedSource(source);
    setDataSource(source);
    setFile(null);
    setPreviewData(null);
    setValidationResults(null);
  };

  const handleMappingChange = (newMappings) => {
    setMappings(newMappings);
  };

  const validateData = () => {
    const totalRows = previewData.length - 1; // Exclude header row
    const headers = previewData[0];
    
    // Count valid rows by checking required fields
    const validRows = previewData.slice(1).filter(row => {
      const productIdIndex = headers.indexOf(Object.entries(mappings).find(([_, target]) => target === 'productId')?.[0]);
      const quantityIndex = headers.indexOf(Object.entries(mappings).find(([_, target]) => target === 'quantity')?.[0]);
      const locationIndex = headers.indexOf(Object.entries(mappings).find(([_, target]) => target === 'location')?.[0]);

      return productIdIndex !== -1 && row[productIdIndex] &&
             quantityIndex !== -1 && !isNaN(row[quantityIndex]) &&
             locationIndex !== -1 && row[locationIndex];
    }).length;

    setValidationResults({
      totalRows,
      validRows,
      errors: validRows < totalRows ? [
        `${totalRows - validRows} rows contain invalid or missing data`
      ] : [],
      warnings: []
    });
    
    setImportStep(4);
  };

  const handleImport = async () => {
    try {
      setNotificationData({
        type: 'success',
        message: 'Data imported successfully!'
      });
      // Add a small delay before navigation to show the success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setNotificationData({
        type: 'error',
        message: 'Import failed: ' + err.message
      });
    }
    setShowNotification(true);
  };

  const handleMappingComplete = () => {
    validateData();
    setImportStep(4); // Move to validation step
  };

  return (
    <div className="h-full flex flex-col">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-4">
          {[
            'Select Source',
            'Upload Data',
            'Map Fields',
            'Validate',
            'Confirm'
          ].map((step, index) => (
            <div 
              key={step}
              className="flex flex-col items-center relative"
              style={{ width: '20%' }}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center 
                transition-all duration-300 mb-2
                ${index + 1 === importStep 
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110' 
                  : index + 1 < importStep 
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index + 1 < importStep ? '✓' : index + 1}
              </div>
              <span className={`
                text-xs font-medium text-center
                ${index + 1 === importStep 
                  ? 'text-blue-600' 
                  : index + 1 < importStep 
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }
              `}>
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {importStep === 1 && (
          <div className="space-y-6">
            {/* Add instruction panel */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Step 1: Select Your Data Source</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Choose the data source you want to import from:</p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>CSV/Excel - Upload a file from your computer</li>
                <li>ERP Systems - Connect directly to your existing system</li>
              </ul>
            </div>
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Select Data Source</h2>
              <button 
                className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                onClick={() => window.open('/docs/import-guide', '_blank')}
              >
                <QuestionMarkCircleIcon className="w-5 h-5 mr-1" />
                View Import Guide
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: 'csv', name: 'CSV/Excel Upload', icon: '📄' },
                { id: 'odoo', name: 'Odoo ERP', icon: '🔄' },
                { id: 'zoho', name: 'Zoho Inventory', icon: '📦' },
                { id: 'sap', name: 'SAP Business One', icon: '💼' },
                { id: 'netsuite', name: 'NetSuite', icon: '🌐' },
              ].map(source => (
                <button
                  key={source.id}
                  onClick={() => handleDataSourceChange(source.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200
                    ${dataSource === source.id 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="text-2xl mb-2">{source.icon}</span>
                  <p className="font-medium">{source.name}</p>
                </button>
              ))}
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setImportStep(2)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {importStep === 2 && (
          <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Your Data</h2>
            </div>

            {/* CSV Format Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-4">CSV File Format Instructions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Required Format</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Your CSV file should have the following columns:</p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                    <li><span className="font-medium">Product ID</span> - Unique identifier for each product</li>
                    <li><span className="font-medium">Quantity</span> - Numeric value (whole numbers only)</li>
                    <li><span className="font-medium">Location</span> - Warehouse or storage location</li>
                    <li><span className="font-medium">Planned Date</span> (Optional) - Format: YYYY-MM-DD</li>
                    <li><span className="font-medium">Status</span> (Optional) - Current status of the order</li>
                    <li><span className="font-medium">Priority</span> (Optional) - High, Medium, or Low</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Example CSV Content</h4>
                  <div className="bg-white dark:bg-gray-800 rounded-md p-3 font-mono text-xs">
                    product_id,quantity,location,planned_date,status,priority<br/>
                    PRD001,100,Warehouse A,2024-03-15,pending,high<br/>
                    PRD002,50,Warehouse B,2024-03-16,processing,medium
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Notes</h4>
                  <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                    <li>First row must contain column headers</li>
                    <li>Use comma (,) as the delimiter</li>
                    <li>Text values should not contain commas</li>
                    <li>Dates must be in YYYY-MM-DD format</li>
                    <li>File must be UTF-8 encoded</li>
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Column names in your file don't need to match exactly. You'll be able to map them in the next step.
                  </p>
                </div>
              </div>
            </div>

            {file && previewData && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Preview Data</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                      <tr>
                        {previewData[0]?.map((header, index) => (
                          <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {previewData.slice(1, 4).map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing first 3 rows of {previewData.length - 1} records
                  </p>
                </div>
              </div>
            )}

            {/* File Upload Area */}
            {dataSource === 'csv' ? (
              <div className="space-y-6">
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-blue-500">Drop the files here...</p>
                  ) : (
                    <p className="text-gray-500">Drag and drop your file here, or click to select files</p>
                  )}
                  {file && (
                    <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setImportStep(1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700"
                  >
                    Back
                  </button>
                  {file && (
                    <button
                      onClick={() => setImportStep(3)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <ApiCredentials 
                dataSource={dataSource}
                onValidated={(credentials) => {
                  setImportStep(3);
                }}
                onBack={() => setImportStep(1)}
              />
            )}
          </div>
        )}

        {importStep === 3 && previewData && (
          <>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Step 3: Map Your Fields</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Match your source columns with our system fields:</p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>Required fields must be mapped: Product ID, Quantity, Location</li>
                <li>Use the dropdown menus to select matching fields</li>
                <li>Sample data is shown to help you identify correct mappings</li>
              </ul>
            </div>
            
            <FieldMapping
              sourceData={previewData}
              dataSource={dataSource}
              onMappingChange={handleMappingChange}
              onComplete={handleMappingComplete}
              onBack={() => setImportStep(2)}
            />
          </>
        )}

        {importStep === 4 && validationResults && previewData && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Step 4: Review Validation Results</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Review the validation results of your data:</p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>Check the number of valid rows</li>
                <li>Review any validation errors</li>
                <li>You can go back to fix mapping issues if needed</li>
                <li>Click Continue when ready to proceed</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Data Sample with Mappings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      {systemFields.map((field) => (
                        <th key={field.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {field.label} {field.id === 'productId' || field.id === 'quantity' || field.id === 'location' ? '*' : ''}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {previewData.slice(1, 4).map((row, rowIndex) => {
                      const headers = previewData[0];
                      return (
                        <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          {systemFields.map((field) => {
                            // Find source field mapped to this target field
                            const sourceField = Object.entries(mappings).find(([_, target]) => target === field.id)?.[0];
                            // Get the index of the source field in the headers
                            const sourceIndex = sourceField ? headers.indexOf(sourceField) : -1;
                            return (
                              <td key={field.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                {sourceIndex !== -1 ? row[sourceIndex] : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Showing first 3 rows with mapped fields • Required fields marked with *
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Rows</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{validationResults.totalRows}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valid Rows</p>
                  <p className="text-2xl font-semibold text-green-500 dark:text-green-400">
                    {validationResults.validRows}
                  </p>
                </div>
              </div>

              {validationResults.errors.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-red-600 font-medium mb-2">Errors</h3>
                  <ul className="space-y-2">
                    {validationResults.errors.map((error, index) => (
                      <li key={index} className="flex items-center text-sm text-red-600">
                        <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setImportStep(3)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Back to Mapping
                </button>
                <button
                  onClick={() => setImportStep(5)}
                  disabled={validationResults.errors.length > 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Continue to Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {importStep === 5 && (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Step 5: Confirm Import</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">Final step before importing your data:</p>
              <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>Review the import summary</li>
                <li>Verify the number of records to be imported</li>
                <li>Click Confirm Import to complete the process</li>
                <li>You can go back to make changes if needed</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-gray-600 mb-6">
                Please review the import details below before confirming:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Data Source</span>
                  <span className="font-medium">{dataSource.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Total Records</span>
                  <span className="font-medium">{validationResults?.totalRows}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Valid Records</span>
                  <span className="font-medium text-green-600">
                    {validationResults?.validRows}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setImportStep(4)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Import
                </button>
              </div>
            </div>
          </div>
        )}

        {showNotification && (
          <div className={`
            fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
            ${notificationData.type === 'success' ? 'bg-green-600' : 'bg-red-600'}
            text-white
          `}>
            <div className="flex items-center">
              {notificationData.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 mr-2" />
              ) : (
                <XMarkIcon className="w-5 h-5 mr-2" />
              )}
              {notificationData.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportData;
