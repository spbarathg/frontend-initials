import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import PredictiveChart from '../components/dashboard/PredictiveChart';
import CostSavingsWidget from '../components/dashboard/CostSavingsWidget';
import EmissionsImpactChart from '../components/dashboard/charts/EmissionsImpactChart';
import PerformanceRadar from '../components/dashboard/charts/PerformanceRadar';
import DarkModeToggle from '../components/DarkModeToggle';
import { SparklesIcon, ShieldCheckIcon, ChartPieIcon } from '@heroicons/react/24/outline';

const Map = lazy(() => import('../components/Map'));

const LoadingSpinner = () => (
  <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [inventoryData, setInventoryData] = useState({
    liveOrders: 45,
    pastOrders: 120,
    plannedOrders: 30
  });

  const [predictiveData] = useState({
    current: 2.4,
    prediction: 2.2,
    historical: [
      { x: 'Week 1', y: 2.8 },
      { x: 'Week 2', y: 2.6 },
      { x: 'Week 3', y: 2.4 }
    ],
    forecast: [
      { x: 'Week 4', y: 2.3 },
      { x: 'Week 5', y: 2.2 },
      { x: 'Week 6', y: 2.2 }
    ]
  });

  const [costSavingsData] = useState({
    fuelSavings: 12500,
    fuelSavingsPercentage: 15,
    carbonCredits: 3200,
    availableCredits: 500,
    breakdown: {
      'Route Optimization': 45,
      'Vehicle Efficiency': 30,
      'Load Optimization': 25
    }
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sample optimized routes data
  const routes = [
    { id: 1, coordinates: [51.505, -0.09], description: 'Warehouse A' },
    { id: 2, coordinates: [51.51, -0.1], description: 'Distribution Center B' },
    { id: 3, coordinates: [51.515, -0.095], description: 'Retail Store C' }
  ];

  // Sample inventory threshold data
  const thresholdData = {
    critical: 10,
    warning: 30,
    optimal: 50
  };

  const handleImportData = () => {
    navigate('/dashboard/import');
  };

  const handleOptimizeRoutes = () => {
    setLoading(true);
    // Simulate optimization process
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/dashboard/ai-autopilot')}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Autopilot</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Configure AI settings</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/dashboard/sustainability')}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <SparklesIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sustainability Hub</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">View sustainability metrics</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/dashboard/risk-radar')}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <ShieldCheckIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Risk Radar</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Monitor risks</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/dashboard/ai-decisions')}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ChartPieIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">AI Decisions</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">View AI insights</p>
            </div>
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Environmental Impact Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Track your sustainability metrics and carbon footprint</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleImportData}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Import Data'}
          </button>
          <button
            onClick={handleOptimizeRoutes}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Optimizing...' : 'Optimize Routes'}
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Processing data...</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">CO2 Emissions Saved</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">2.4 tons</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12% vs last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fuel Saved</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">850L</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">↑ 8% vs last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Trees Equivalent</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">48</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">↑ 15% vs last week</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Efficiency Score</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">92%</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">↑ 5% vs last week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">OPTIMIZED ROUTES</h2>
          <div style={{ height: '400px', width: '100%' }} className="rounded-lg overflow-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              <Map routes={routes} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Inventory Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">LIVE ORDERS</h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-blue-600">{inventoryData.liveOrders}</div>
            <div className="text-sm text-gray-500">Current Processing</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full" 
              style={{ width: `${(inventoryData.liveOrders / thresholdData.optimal) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Past Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">PAST ORDERS</h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-green-600">{inventoryData.pastOrders}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full" 
              style={{ width: '100%' }}
            ></div>
          </div>
        </div>

        {/* Planned Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">PLANNED ORDERS</h3>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-purple-600">{inventoryData.plannedOrders}</div>
            <div className="text-sm text-gray-500">Upcoming</div>
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-purple-600 rounded-full" 
              style={{ width: `${(inventoryData.plannedOrders / thresholdData.optimal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carbon Emissions Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">CARBON EMISSIONS TREND</h2>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-xs font-medium rounded-md ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                onClick={() => setTimeRange('week')}
              >
                Week
              </button>
              <button
                className={`px-3 py-1 text-xs font-medium rounded-md ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                onClick={() => setTimeRange('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveLine
              data={[
                {
                  id: "Carbon Emissions",
                  data: [
                    { x: "Mon", y: 2.4 },
                    { x: "Tue", y: 2.1 },
                    { x: "Wed", y: 1.8 },
                    { x: "Thu", y: 1.9 },
                    { x: "Fri", y: 1.7 },
                    { x: "Sat", y: 1.5 },
                    { x: "Sun", y: 1.4 }
                  ]
                }
              ]}
              margin={{ top: 30, right: 80, bottom: 40, left: 70 }}
              xScale={{ type: 'point' }}
              yScale={{ type: 'linear', min: 1.3, max: 2.5 }}
              enableArea={true}
              areaOpacity={0.1}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 12,
                tickRotation: 0,
                legend: 'Day',
                legendOffset: 35,
                legendPosition: 'middle'
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 12,
                tickRotation: 0,
                legend: 'CO₂ (tons)',
                legendOffset: -45,
                legendPosition: 'middle'
              }}
              enablePoints={true}
              pointSize={6}
              pointColor={{ theme: 'background' }}
              pointBorderWidth={2}
              pointBorderColor={{ from: 'serieColor' }}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fontSize: 11,
                      fill: darkMode ? '#9CA3AF' : '#4B5563'
                    }
                  },
                  legend: {
                    text: {
                      fontSize: 11,
                      fill: darkMode ? '#D1D5DB' : '#374151'
                    }
                  }
                },
                grid: {
                  line: {
                    stroke: darkMode ? '#374151' : '#E5E7EB',
                    strokeWidth: 1,
                    strokeDasharray: '4 4'
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Predictive Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <PredictiveChart data={predictiveData} />
        </div>

        {/* Emissions Impact Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <EmissionsImpactChart />
        </div>

        {/* Performance Radar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <PerformanceRadar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;