import React, { useState } from 'react';
import { validateApiCredentials } from '../../services/importService';

const apiFields = {
  odoo: [
    { id: 'url', label: 'Server URL', type: 'text' },
    { id: 'database', label: 'Database Name', type: 'text' },
    { id: 'apiKey', label: 'API Key', type: 'password' },
  ],
  zoho: [
    { id: 'organizationId', label: 'Organization ID', type: 'text' },
    { id: 'apiKey', label: 'API Key', type: 'password' },
    { id: 'region', label: 'Region', type: 'text' },
  ],
  sap: [
    { id: 'systemId', label: 'System ID', type: 'text' },
    { id: 'client', label: 'Client', type: 'text' },
    { id: 'username', label: 'Username', type: 'text' },
    { id: 'password', label: 'Password', type: 'password' },
  ],
  netsuite: [
    { id: 'accountId', label: 'Account ID', type: 'text' },
    { id: 'consumerKey', label: 'Consumer Key', type: 'text' },
    { id: 'consumerSecret', label: 'Consumer Secret', type: 'password' },
    { id: 'tokenId', label: 'Token ID', type: 'text' },
    { id: 'tokenSecret', label: 'Token Secret', type: 'password' },
  ],
};

const steps = ['Select Data Source', 'Enter API Credentials', 'Map Fields', 'Review & Confirm'];

const ApiCredentials = ({ dataSource, onValidated }) => {
  const [credentials, setCredentials] = useState({});
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleInputChange = (fieldId, value) => {
    setCredentials((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    setIsValid(false);
    setError(null);
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setError(null);

    try {
      await validateApiCredentials(dataSource, credentials);
      setIsValid(true);
      onValidated(credentials);
    } catch (err) {
      setError(err.message);
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const fields = apiFields[dataSource] || [];

  return (
    <div className="mt-4 bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6">Connect to {dataSource.toUpperCase()}</h2>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index === activeStep 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {index + 1}
              </div>
              <div className="text-xs mt-2">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {activeStep === 0 && (
        <div className="mt-2">
          <p>Select your data source to proceed.</p>
          {/* Add data source selection UI here */}
        </div>
      )}

      {activeStep === 1 && (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                value={credentials[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          ))}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {isValid && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">Connection validated successfully!</p>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleValidate}
              disabled={isValidating || Object.keys(credentials).length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isValidating ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Validating...
                </span>
              ) : (
                'Validate Connection'
              )}
            </button>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="mt-2">
          <p>Map your fields here.</p>
          {/* Add field mapping UI here */}
        </div>
      )}

      {activeStep === 3 && (
        <div className="mt-2">
          <p>Review and confirm your settings.</p>
          {/* Add review and confirmation UI here */}
        </div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t">
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>

      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          Need help? Click here for documentation.
        </a>
      </div>
    </div>
  );
};

export default ApiCredentials;
