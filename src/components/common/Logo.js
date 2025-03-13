import React from 'react';

const Logo = ({ className = '', size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-5xl'
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <h1 className={`font-montserrat text-black dark:text-white ${sizeClasses[size]}`}>
        Steadility
        <div className="h-0.5 bg-black dark:bg-white w-full mt-1 transition-all duration-300 group-hover:w-0"></div>
      </h1>
    </div>
  );
};

export default Logo; 