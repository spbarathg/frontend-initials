import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-dark dark:text-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-gray-800/50 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-800/30 transition-all duration-200"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;