import React, { useState } from 'react';
import { connectDataSource } from '../../services/aiFeaturesService';

const dataSources = [
  { id: 'zoho', name: 'Zoho', icon: '🔄' },
  { id: 'odoo', name: 'Odoo', icon: '📊' },
  { id: 'csv', name: 'CSV Upload', icon: '📁' }
];

const DataSourceIntegration = () => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSourceSelect = (source) => {
    setSelectedSource(source);
    setError(null);
    setSuccess(false);
  };

  const handleConnect = async () => {
    if (!selectedSource) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const params = {
        system_type: selectedSource.id,
        // For CSV, we'll handle file upload separately
        ...(selectedSource.id !== 'csv' && {
          credentials: {
            // These would be collected from a form in a real implementation
            api_key: 'demo_key',
            api_secret: 'demo_secret'
          }
        })
      };

      await connectDataSource(params);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Connect Data Source
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {dataSources.map((source) => (
          <button
            key={source.id}
            onClick={() => handleSourceSelect(source)}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              selectedSource?.id === source.id
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-green-500'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">{source.icon}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {source.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedSource && (
        <div className="space-y-4">
          {selectedSource.id === 'csv' ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="csv-upload"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Handle CSV file upload
                    console.log('CSV file selected:', file);
                  }
                }}
              />
              <label
                htmlFor="csv-upload"
                className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
              >
                <div className="text-4xl mb-2">📁</div>
                <p>Click to upload CSV file</p>
                <p className="text-xs mt-1">or drag and drop</p>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter your API key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Secret
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter your API secret"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleConnect}
            className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect Data Source'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-lg">
          Successfully connected to {selectedSource.name}!
        </div>
      )}
    </div>
  );
};

export default DataSourceIntegration; 