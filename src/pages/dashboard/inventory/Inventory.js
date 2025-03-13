import React, { useState } from 'react';
import { 
  CubeIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';

const Inventory = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Sample inventory data
  const inventoryData = {
    totalItems: 1250,
    lowStock: 45,
    outOfStock: 12,
    reorderPoints: 89,
    categories: [
      { name: 'Electronics', count: 450, status: 'healthy' },
      { name: 'Furniture', count: 320, status: 'warning' },
      { name: 'Clothing', count: 580, status: 'healthy' },
      { name: 'Accessories', count: 280, status: 'critical' }
    ],
    recentMovements: [
      { item: 'Laptop Pro X', type: 'in', quantity: 25, date: '2024-03-15' },
      { item: 'Office Chair', type: 'out', quantity: 15, date: '2024-03-14' },
      { item: 'Wireless Mouse', type: 'in', quantity: 50, date: '2024-03-13' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Inventory Management</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Monitor and manage your inventory levels</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CubeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Items</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{inventoryData.totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Low Stock Items</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{inventoryData.lowStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Out of Stock</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{inventoryData.outOfStock}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Reorder Points</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{inventoryData.reorderPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Inventory by Category</h2>
          <div className="space-y-4">
            {inventoryData.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    category.status === 'healthy' ? 'bg-green-500' :
                    category.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Movements</h2>
          <div className="space-y-4">
            {inventoryData.recentMovements.map((movement, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    movement.type === 'in' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300">{movement.item}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${
                    movement.type === 'in' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                  </span>
                  <span className="text-sm text-gray-500">{movement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory; 