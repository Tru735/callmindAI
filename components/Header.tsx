import React from 'react';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-40 top-0 left-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-500/20">
            C
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CallMind AI</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">Features</button>
          <button onClick={scrollToDemo} className="hover:text-white transition-colors">Demo</button>
          <button onClick={() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-white transition-colors">FAQ</button>
        </div>

        <Button size="sm" variant="outline" onClick={scrollToDemo}>
          See Demo
        </Button>
      </div>
    </nav>
  );
};