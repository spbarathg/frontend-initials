import React from 'react';
import { FaTruck, FaChartLine, FaLeaf, FaBoxes, FaMapMarkedAlt, FaCog } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-[#1E1E1E] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-800"
  >
    <div className="flex items-center mb-4">
      <Icon className="text-green-500 text-3xl mr-3" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const Features = () => {
  return (
    <div className="min-h-screen bg-[#121212] overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section with gradient background */}
      <div className="relative">
        {/* Gradient Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[-20%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob opacity-70" />
          <div className="absolute top-1/2 right-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob animation-delay-2000 opacity-70" />
          <div className="absolute bottom-[-20%] left-1/3 w-[600px] h-[600px] bg-indigo-600/20 rounded-full mix-blend-normal filter blur-[80px] animate-blob animation-delay-4000 opacity-70" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-32 mb-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Revolutionizing Logistics Management
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Our platform combines AI-powered solutions with sustainability practices to transform your logistics operations
            </p>
          </motion.div>

          {/* Main Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <FeatureCard
                icon={FaTruck}
                title="AI-Powered Route Optimization"
                description="Real-time route optimization with interactive map display, multi-point routing, and dynamic adjustments based on traffic and weather conditions."
                delay={0.1}
              />
              <FeatureCard
                icon={FaBoxes}
                title="Predictive Inventory Management"
                description="Smart inventory tracking with automated reordering, threshold-based alerts, and demand forecasting using advanced AI algorithms."
                delay={0.2}
              />
              <FeatureCard
                icon={FaChartLine}
                title="Real-time Analytics Dashboard"
                description="Comprehensive analytics with interactive visualizations, performance metrics, and customizable KPI tracking in both dark and light modes."
                delay={0.3}
              />
              <FeatureCard
                icon={FaLeaf}
                title="Sustainability Integration"
                description="Track and optimize your carbon footprint with eco-friendly route suggestions and resource optimization recommendations."
                delay={0.4}
              />
              <FeatureCard
                icon={FaMapMarkedAlt}
                title="Interactive Mapping"
                description="Advanced mapping features with Leaflet integration, custom markers, real-time location tracking, and route visualization."
                delay={0.5}
              />
              <FeatureCard
                icon={FaCog}
                title="System Integration"
                description="Seamless integration with existing systems, APIs, and third-party services for enhanced operational efficiency."
                delay={0.6}
              />
            </div>

            {/* Performance Metrics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-16 max-w-4xl mx-auto bg-[#1E1E1E] rounded-lg shadow-lg p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">35-40%</div>
                  <div className="text-gray-400">Route Efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">40-45%</div>
                  <div className="text-gray-400">Resource Usage</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">25-30%</div>
                  <div className="text-gray-400">Processing Time</div>
                </div>
              </div>
            </motion.div>

            {/* System Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 max-w-4xl mx-auto bg-[#1E1E1E] rounded-lg shadow-lg p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">System Performance</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Route Optimization</span>
                  <span className="text-green-500 font-semibold">&lt; 2s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Map Rendering</span>
                  <span className="text-green-500 font-semibold">&lt; 1s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Inventory Updates</span>
                  <span className="text-green-500 font-semibold">~100ms</span>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="text-center mt-16 mb-16"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Logistics?
              </h2>
              <p className="text-gray-400 mb-8">
                Join the future of sustainable logistics management today.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features; 