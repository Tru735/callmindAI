import React, { useState } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { validateEmail } from '../services/waitlist';

interface HeroProps {
  onJoinWaitlist: (email: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinWaitlist }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear error and proceed
    setError(null);
    onJoinWaitlist(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null); // Clear error while typing
  };

  return (
    <div className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-900/20 blur-[100px] pointer-events-none rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Accepting early access requests
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">AI Phone Assistant</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          CallMind answers your calls, summarizes conversations, translates languages in real-time, and creates calendar events—automatically.
        </p>

        {/* Form */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={handleInputChange}
                className={`w-full bg-slate-800/50 border text-white placeholder-slate-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all ${error ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-700'}`}
              />
              {error && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs text-red-400 animate-fade-in">
                  <AlertCircle size={12} />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <Button type="submit" size="lg" className="whitespace-nowrap">
              Join Waitlist
            </Button>
          </form>
        </div>

        {/* Social Proof Text */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-1">
             <div className="flex -space-x-2">
                <img src="https://picsum.photos/30/30?random=1" className="w-6 h-6 rounded-full border border-slate-900" alt="User" />
                <img src="https://picsum.photos/30/30?random=2" className="w-6 h-6 rounded-full border border-slate-900" alt="User" />
                <img src="https://picsum.photos/30/30?random=3" className="w-6 h-6 rounded-full border border-slate-900" alt="User" />
             </div>
             <span className="ml-2">Joined by 400+ freelancers</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-slate-400">Secure AI Models</span>
          </div>
        </div>

      </div>
    </div>
  );
};
