import React from 'react';
import { Button } from './ui/Button';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed w-full z-40 top-0 left-0 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#top" className="transition-opacity hover:opacity-80">
          <Logo />
        </a>

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