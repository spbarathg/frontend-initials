import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  TruckIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  ArrowUpTrayIcon,
  CubeIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  ArrowPathIcon,
  DocumentCheckIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Routes', href: '/dashboard/routes', icon: TruckIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  { name: 'Inventory', href: '/dashboard/inventory', icon: CubeIcon },
  { name: 'Import Data', href: '/dashboard/import', icon: ArrowUpTrayIcon },
  { name: 'Team', href: '/dashboard/team', icon: UserGroupIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

const aiFeatures = [
  { name: 'AI Autopilot', href: '/dashboard/ai-autopilot', icon: SparklesIcon },
  { name: 'Risk Radar', href: '/dashboard/risk-radar', icon: ShieldCheckIcon },
  { name: 'AI Decisions', href: '/dashboard/ai-decisions', icon: ChartPieIcon },
  { name: 'AI Inventory', href: '/dashboard/ai-inventory', icon: ArrowPathIcon },
  { name: 'AI Data', href: '/dashboard/ai-data', icon: DocumentCheckIcon },
];

const sustainabilityFeatures = [
  { name: 'Sustainability Hub', href: '/dashboard/sustainability', icon: SparklesIcon },
  { name: 'Team Performance', href: '/dashboard/team-performance', icon: TrophyIcon },
];

const Sidebar = () => {
  const location = useLocation();

  const renderNavItems = (items) => (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ease-in-out
              ${isActive
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50'
              }
            `}
          >
            <item.icon className={`mr-3 h-5 w-5 transition-colors duration-200 ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
            }`} />
            {item.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="w-64 bg-white dark:bg-neutral-dark border-r dark:border-gray-800 flex flex-col">
      {/* Logo Section */}
      <div className="border-b dark:border-gray-800">
        <div className="flex justify-center py-8">
          <Logo size="small" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 mt-6 overflow-y-auto">
        {renderNavItems(navigation)}
        
        {/* AI Features Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            AI Features
          </h3>
          <div className="mt-3">
            {renderNavItems(aiFeatures)}
          </div>
        </div>

        {/* Sustainability Features Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Sustainability
          </h3>
          <div className="mt-3">
            {renderNavItems(sustainabilityFeatures)}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 