import React, { useRef, useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  HomeIcon, 
  TruckIcon, 
  ChartBarIcon,
  UserCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';
import DarkModeToggle from '../DarkModeToggle';

const Layout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-dark dark:text-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-neutral-dark border-r dark:border-gray-800 flex flex-col">
          {/* Logo Section */}
          <div className="border-b dark:border-gray-800">
            <div className="flex justify-center py-8">
              <Logo size="small" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 mt-6 overflow-y-auto">
            <Link
              to="/dashboard"
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ease-in-out
                ${isActive('/dashboard')
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50'
                }
              `}
            >
              <HomeIcon className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                isActive('/dashboard') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              Dashboard
            </Link>
            <Link
              to="/dashboard/routes"
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ease-in-out
                ${isActive('/dashboard/routes')
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50'
                }
              `}
            >
              <TruckIcon className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                isActive('/dashboard/routes') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              Routes
            </Link>
            <Link
              to="/dashboard/analytics"
              className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-1 transition-all duration-200 ease-in-out
                ${isActive('/dashboard/analytics')
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50'
                }
              `}
            >
              <ChartBarIcon className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                isActive('/dashboard/analytics') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              Analytics
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="border-t dark:border-gray-800 bg-white dark:bg-neutral-dark">
            <div className="px-6 py-4">
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50 transition-all duration-200 ease-in-out"
                >
                  <div className="flex items-center">
                    <UserCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-base -translate-y-[1px]">Profile</span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div 
                  className={`
                    absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-neutral-dark rounded-lg shadow-lg border border-gray-100 dark:border-gray-800
                    transform transition-all duration-200 ease-in-out origin-bottom
                    ${isProfileOpen 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
                    }
                  `}
                >
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50 transition-all duration-200 ease-in-out"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserCircleIcon className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-dark/50 transition-all duration-200 ease-in-out"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 ease-in-out"
                    >
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-neutral-dark relative">
          <DarkModeToggle />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;