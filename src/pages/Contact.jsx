import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ email: '', message: '' });
    // You can add a success message or redirect here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-xl border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Why would you like to contact us?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 rounded-lg bg-[#2A2A2A] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors duration-200 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 