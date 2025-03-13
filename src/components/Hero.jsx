import React from 'react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-multiply filter blur-[64px] animate-blob" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[64px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[64px] animate-blob animation-delay-4000" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/10 via-[#121212]/50 to-[#121212] z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in tracking-tight font-montserrat">
          Sustainable Logistics for a Better Future
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg md:text-xl animate-slide-up font-montserrat">
          Optimizing logistics for a better tomorrow
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button className="group px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105 font-montserrat">
            Get Started
            <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
          <button className="group px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 font-montserrat">
            Learn More
            <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero; 