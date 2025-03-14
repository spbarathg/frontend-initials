import React, { useState, useEffect } from 'react';
import { optimizeInventory } from '../../services/aiFeaturesService';

const InventoryOptimization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [optimizationData, setOptimizationData] = useState(null);
  const [activeTab, setActiveTab] = useState('forecasting');

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await optimizeInventory({ type: activeTab });
      setOptimizationData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Inventory Optimization
      </h1>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
            ${activeTab === 'forecasting'
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          onClick={() => setActiveTab('forecasting')}
        >
          Demand Forecasting
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
            ${activeTab === 'docking'
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          onClick={() => setActiveTab('docking')}
        >
          Dynamic Docking
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 
            ${activeTab === 'monitoring'
              ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-lg'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          onClick={() => setActiveTab('monitoring')}
        >
          Monitoring & Alerts
        </button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <button
          className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 
                    dark:bg-blue-500 dark:hover:bg-blue-600
                    text-white font-medium shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:ring-offset-2 dark:focus:ring-offset-gray-800
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition duration-150 ease-in-out"
          onClick={handleOptimize}
          disabled={loading}
        >
          {loading ? 'Optimizing...' : 'Run Optimization'}
        </button>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 
                         border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {optimizationData && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Optimization Results
            </h2>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 
                          border border-gray-200 dark:border-gray-600">
              <pre className="overflow-auto text-sm text-gray-800 dark:text-gray-200">
                {JSON.stringify(optimizationData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOptimization; 