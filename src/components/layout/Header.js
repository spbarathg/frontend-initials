import React from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Logistics Optimizer</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-[1.02]">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 ease-in-out hover:scale-[1.02]">
              <UserCircleIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 