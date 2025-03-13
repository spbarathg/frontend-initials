import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import { FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-[#121212] overflow-x-hidden">
      <Navbar />
      
      {/* Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[-20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob opacity-70" />
        <div className="absolute top-1/2 right-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob animation-delay-2000 opacity-70" />
        <div className="absolute bottom-[-20%] left-1/3 w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob animation-delay-4000 opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <FaHeart className="text-white text-4xl animate-pulse" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-8"
          >
            Made with Love
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-xl md:text-2xl text-gray-400 space-y-2"
          >
            <p className="font-light">by</p>
            <div className="space-y-1">
              {['Barath', 'Tanush', 'Suhas', 'Bisista'].map((name, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mt-12 text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} Steadility
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 