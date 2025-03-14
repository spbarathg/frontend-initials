import React, { useState } from 'react';
import { optimizeLastMileDelivery } from '../../services/aiFeaturesService';

const LastMileDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleOptimize = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await optimizeLastMileDelivery();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Last Mile Delivery Optimization
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 
                       border border-blue-200 dark:border-blue-800">
          <p className="text-blue-800 dark:text-blue-200">
            This feature is currently a placeholder for future implementation of the IAFSA-based Last Mile Delivery Optimization.
          </p>
        </div>

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
          {loading ? 'Processing...' : 'Try Feature (Placeholder)'}
        </button>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/30 
                         border border-red-200 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Placeholder Response
            </h2>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 
                          border border-gray-200 dark:border-gray-600">
              <pre className="overflow-auto text-sm text-gray-800 dark:text-gray-200">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LastMileDelivery; 