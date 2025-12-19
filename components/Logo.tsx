import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg 
        viewBox="0 0 100 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto"
      >
        {/* Phone Handset Shape */}
        <path 
          d="M20 25C20 22.2386 22.2386 20 25 20H35C37.7614 20 40 22.2386 40 25V35C40 37.7614 37.7614 40 35 40H30C30 51.0457 38.9543 60 50 60V55C50 52.2386 52.2386 50 55 50H65C67.7614 50 70 52.2386 70 55V65C70 67.7614 67.7614 70 65 70H55C35.67 70 20 54.33 20 35V25Z" 
          stroke="#00d9ff" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Brain/Network Nodes inside Handset Area */}
        <circle cx="45" cy="35" r="3" fill="#00d9ff" />
        <circle cx="55" cy="25" r="3" fill="#00d9ff" />
        <circle cx="65" cy="35" r="3" fill="#00d9ff" />
        <circle cx="55" cy="45" r="3" fill="#00d9ff" />
        <path d="M45 35L55 25L65 35L55 45L45 35" stroke="#00d9ff" strokeWidth="2" />
        <path d="M55 25V45" stroke="#00d9ff" strokeWidth="2" />
        <path d="M45 35H65" stroke="#00d9ff" strokeWidth="2" />
      </svg>
      <div className="flex font-bold text-xl tracking-tight">
        <span className="text-white">CallMind</span>
        <span className="text-[#00d9ff] ml-1">AI</span>
      </div>
    </div>
  );
};