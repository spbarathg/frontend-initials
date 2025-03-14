import React from 'react';
import DataSourceIntegration from '../components/import/DataSourceIntegration';

const ImportPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Import Data
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Connect your data sources or upload CSV files to get started
          </p>
        </div>

        <DataSourceIntegration />
      </div>
    </div>
  );
};

export default ImportPage; 