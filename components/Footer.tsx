import React, { useState } from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onLogoClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLogoClick }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 3 && onLogoClick) {
      onLogoClick();
      setClickCount(0);
    }
    // Reset click count after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div 
            className="cursor-default select-none"
            onClick={handleLogoClick}
            title="Admin Login (Triple Click)"
          >
             <Logo />
          </div>
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CallMind AI. Built for Founders.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};