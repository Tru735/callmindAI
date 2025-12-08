import React from 'react';
import { Laptop, Rocket, Mic, Cpu, MessageSquare, Radio, AudioWaveform } from 'lucide-react';

export const Credibility: React.FC = () => {
  return (
    <section className="border-y border-slate-900 bg-slate-950/30">
      
      {/* Tech Attribution */}
      <div className="py-10 border-b border-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-slate-400 text-sm font-medium mb-8 uppercase tracking-wider">
            Built using battle-tested AI technologies used by industry leaders
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* OpenAI */}
            <div className="flex items-center gap-2 group cursor-default">
              <Cpu className="w-5 h-5 text-green-400 group-hover:text-green-400" />
              <span className="text-lg font-bold tracking-tight text-slate-300 group-hover:text-white transition-colors">OpenAI</span>
            </div>
            
            {/* Whisper */}
            <div className="flex items-center gap-2 group cursor-default">
              <MessageSquare className="w-5 h-5 text-blue-400 group-hover:text-blue-400" />
              <span className="text-lg font-bold tracking-tight text-slate-300 group-hover:text-white transition-colors">Whisper</span>
            </div>

            {/* Twilio */}
            <div className="flex items-center gap-2 group cursor-default">
              <Radio className="w-5 h-5 text-red-400 group-hover:text-red-400" />
              <span className="text-lg font-bold tracking-tight text-slate-300 group-hover:text-white transition-colors">Twilio</span>
            </div>

            {/* ElevenLabs */}
            <div className="flex items-center gap-2 group cursor-default">
              <AudioWaveform className="w-5 h-5 text-purple-400 group-hover:text-purple-400" />
              <span className="text-lg font-bold tracking-tight text-slate-300 group-hover:text-white transition-colors">ElevenLabs</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-xs mt-6">
            Powered by reliable, production-grade AI components.
          </p>
        </div>
      </div>

      {/* Persona Highlight */}
      <div className="py-16 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Designed for freelancers, founders & creators.
            </h2>
            <p className="text-slate-400">
              Built for people who live on calls and messages — and want AI to save time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Freelancers */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:border-brand-500/30 transition-all group">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <Laptop size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Freelancers</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Handle international clients and manage your schedule without interrupting deep work.
              </p>
            </div>

            {/* Founders */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:border-brand-500/30 transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Rocket size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Founders</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Look professional with an AI receptionist that filters spam and prioritizes deals.
              </p>
            </div>

            {/* Creators */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:border-brand-500/30 transition-all group">
              <div className="w-12 h-12 bg-pink-500/10 text-pink-400 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/20 transition-colors">
                <Mic size={24} />
              </div>
              <h3 className="font-semibold text-white mb-2">Creators</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Separate business from personal. Let AI handle brand inquiries and booking requests.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};