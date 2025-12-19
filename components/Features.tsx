import React from 'react';
import { PhoneCall, FileText, Globe, CheckSquare, Shield, Clock, Calendar } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: '1',
    title: 'AI Answering',
    description: 'Triggered when you are busy. AI picks up: "Hi, I\'m your assistant. How can I help?"',
    icon: 'phone',
  },
  {
    id: '2',
    title: 'Instant Summaries',
    description: 'Get clean, bullet-point transcriptions and summaries sent directly to your email or Slack.',
    icon: 'text',
  },
  {
    id: '5',
    title: 'Calendly Sync',
    description: 'The "Killer Feature". AI automatically sends your booking link via SMS or email to qualified callers.',
    icon: 'calendar',
  },
  {
    id: '3',
    title: 'Global Translation',
    description: 'Real-time multi-language detection. Answer clients from Spain, China, or Brazil effortlessly.',
    icon: 'globe',
  },
  {
    id: '4',
    title: 'Automated Actions',
    description: 'Trigger SMS follow-ups, Zapier workflows, or CRM updates after every call.',
    icon: 'check',
  }
];

export const Features: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'phone': return <PhoneCall className="w-6 h-6 text-brand-400" />;
      case 'text': return <FileText className="w-6 h-6 text-purple-400" />;
      case 'globe': return <Globe className="w-6 h-6 text-blue-400" />;
      case 'calendar': return <Calendar className="w-6 h-6 text-orange-400" />;
      case 'check': return <CheckSquare className="w-6 h-6 text-green-400" />;
      default: return <Shield className="w-6 h-6 text-slate-400" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Core MVP Features</h2>
          <p className="text-slate-400">
            Advanced AI capabilities built for founders who get 10+ calls a week and miss 30% of them.
          </p>
        </div>

        <div 
          className="grid gap-6 max-w-7xl mx-auto" 
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-brand-500/30 transition-all hover:shadow-xl hover:shadow-brand-500/5 group"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-75">
           <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>98% Margin SaaS</span>
           </div>
           <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>Launch: Jan 5, 2025</span>
           </div>
        </div>
      </div>
    </section>
  );
};