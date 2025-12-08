import React from 'react';
import { PhoneCall, FileText, Globe, CheckSquare, Shield, Clock } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: '1',
    title: 'AI Answers Your Calls',
    description: 'Your intelligent agent picks up instantly, speaks naturally, and handles initial triage so you aren\'t disturbed.',
    icon: 'phone',
  },
  {
    id: '2',
    title: 'Instant Summaries',
    description: 'Get clean, bullet-point summaries of every conversation sent directly to your email or Slack.',
    icon: 'text',
  },
  {
    id: '3',
    title: 'Real-Time Translation',
    description: 'Break language barriers. The AI translates foreign callers to your language and responds in theirs.',
    icon: 'globe',
  },
  {
    id: '4',
    title: 'Action Oriented',
    description: 'CallMind doesn\'t just listen. It can send SMS follow-ups, save contacts, and book calendar meetings.',
    icon: 'check',
  }
];

export const Features: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'phone': return <PhoneCall className="w-6 h-6 text-brand-400" />;
      case 'text': return <FileText className="w-6 h-6 text-purple-400" />;
      case 'globe': return <Globe className="w-6 h-6 text-blue-400" />;
      case 'check': return <CheckSquare className="w-6 h-6 text-green-400" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Everything you need to manage calls</h2>
          <p className="text-slate-400">
            Designed for freelancers, founders, and teams who can't afford to miss business opportunities but hate phone tag.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-brand-500/30 transition-colors">
              <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Secondary Benefits */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-75">
           <div className="flex items-center gap-3 text-slate-400">
              <Shield className="w-5 h-5" />
              <span>Enterprise-grade Security</span>
           </div>
           <div className="flex items-center gap-3 text-slate-400">
              <Clock className="w-5 h-5" />
              <span>24/7 Availability</span>
           </div>
        </div>
      </div>
    </section>
  );
};