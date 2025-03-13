import React, { useState, useEffect } from 'react';
import { getFieldMappingTemplate } from '../../services/importService';

export const systemFields = [
  { id: 'productId', label: 'Product ID', required: true },
  { id: 'quantity', label: 'Quantity', required: true },
  { id: 'location', label: 'Location', required: true },
  { id: 'plannedDate', label: 'Planned Date', required: false },
  { id: 'status', label: 'Status', required: false },
  { id: 'priority', label: 'Priority', required: false },
];

const FieldMapping = ({ sourceData, dataSource, onMappingChange, onComplete, onBack }) => {
  const [mappings, setMappings] = useState({});
  const [autoMapped, setAutoMapped] = useState(false);

  useEffect(() => {
    if (!autoMapped && sourceData && sourceData.length > 0) {
      const template = getFieldMappingTemplate(dataSource);
      const headers = sourceData[0];
      const initialMappings = {};
      
      // Try to auto-map fields based on template
      headers.forEach(header => {
        if (template[header]) {
          initialMappings[header] = template[header];
        }
      });
      
      setMappings(initialMappings);
      onMappingChange(initialMappings);
      setAutoMapped(true);
    }
  }, [sourceData, dataSource, autoMapped, onMappingChange]);

  const handleMappingChange = (sourceField, targetField) => {
    const newMappings = { ...mappings };
    
    // Remove any existing mappings for this target field
    Object.keys(newMappings).forEach(key => {
      if (newMappings[key] === targetField) {
        delete newMappings[key];
      }
    });
    
    if (targetField) {
      newMappings[sourceField] = targetField;
    } else {
      delete newMappings[sourceField];
    }
    
    setMappings(newMappings);
    onMappingChange(newMappings);
  };

  const isValidMapping = () => {
    const mappedFields = new Set(Object.values(mappings));
    return systemFields
      .filter(field => field.required)
      .every(field => mappedFields.has(field.id));
  };

  const sourceFields = sourceData?.[0] || [];
  const sampleData = sourceData?.[1] || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Source Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Sample Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Map To
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {sourceFields.map((field, index) => (
              <tr key={field} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                  {field}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {sampleData[index]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={mappings[field] || ''}
                    onChange={(e) => handleMappingChange(field, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Don't Map</option>
                    {systemFields.map(({ id, label, required }) => (
                      <option 
                        key={id} 
                        value={id}
                        disabled={Object.values(mappings).includes(id) && mappings[field] !== id}
                      >
                        {label} {required ? '*' : ''}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between pt-6">
          <button
            onClick={onBack}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Back
          </button>
          <button
            onClick={onComplete}
            disabled={!isValidMapping()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldMapping;
