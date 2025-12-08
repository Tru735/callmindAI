import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
               C
             </div>
             <span className="text-xl font-bold text-white">CallMind AI</span>
          </div>
          
          {/* Social links removed for production */}
        </div>
        
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} CallMind AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};