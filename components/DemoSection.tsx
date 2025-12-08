import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mic, MoreVertical, Play, X, User, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from '../types';

export const DemoSection: React.FC = () => {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const script: ChatMessage[] = [
    { id: 1, sender: 'system', text: 'Incoming Call: Client (Spain)' },
    { id: 2, sender: 'ai', text: 'CallMind answering...' },
    { id: 3, sender: 'caller', text: 'Hola, quería confirmar mi cita para el martes.', translation: 'Hello, I wanted to confirm my appointment for Tuesday.' },
    { id: 4, sender: 'ai', text: 'Hello. I see you have a slot at 2 PM. Should I confirm that?', action: 'Checking Calendar...' },
    { id: 5, sender: 'caller', text: 'Sí, perfecto. Gracias.', translation: 'Yes, perfect. Thanks.' },
    { id: 6, sender: 'ai', text: 'Great. I have confirmed Tuesday at 2 PM. Have a nice day!', action: 'Event Created: Tuesday 2PM' },
    { id: 7, sender: 'system', text: 'Call Ended. Summary sent to email.' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    if (active && step < script.length) {
      timeout = setTimeout(() => {
        setMessages(prev => [...prev, script[step]]);
        setStep(prev => prev + 1);
        
        // Auto scroll
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, step === 0 ? 500 : 2500); // Initial delay short, others longer for reading
    } else if (!active) {
      setMessages([]);
      setStep(0);
    }

    return () => clearTimeout(timeout);
  }, [active, step]);

  const toggleDemo = () => {
    setActive(!active);
    if (active) {
      setStep(0);
      setMessages([]);
    }
  };

  return (
    <section id="demo" className="py-20 bg-slate-900 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            See CallMind in Action
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience how our AI handles multilingual calls, real-time translation, and task execution without you lifting a finger.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Phone Simulator */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-[2.5rem] blur opacity-75"></div>
            <div className="relative bg-slate-950 border-4 border-slate-800 rounded-[2rem] shadow-2xl h-[600px] overflow-hidden flex flex-col">
              
              {/* Phone Header */}
              <div className="bg-slate-900 p-4 border-b border-slate-800 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-300">CallMind Active</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-500">5G</span>
                  <div className="w-4 h-3 border border-slate-500 rounded-sm relative">
                    <div className="absolute left-0 top-0 h-full w-3/4 bg-slate-500"></div>
                  </div>
                </div>
              </div>

              {/* Chat/Transcript Area */}
              <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scroll-smooth">
                {!active && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center animate-float">
                      <Phone className="w-8 h-8 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Ready to take calls</h3>
                      <p className="text-sm text-slate-400 mt-2">Tap the button below to simulate an incoming client call.</p>
                    </div>
                  </div>
                )}

                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'ai' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'} animate-fade-in-up`}>
                    
                    {msg.sender === 'system' ? (
                       <span className="text-xs font-medium text-slate-500 bg-slate-900/50 px-2 py-1 rounded-full border border-slate-800">{msg.text}</span>
                    ) : (
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'ai' 
                          ? 'bg-brand-600 text-white rounded-br-none' 
                          : 'bg-slate-800 text-slate-200 rounded-bl-none'
                      }`}>
                        <div className="flex items-center gap-2 mb-1 opacity-75">
                          {msg.sender === 'ai' ? <Bot size={12} /> : <User size={12} />}
                          <span className="text-[10px] uppercase tracking-wider font-bold">
                            {msg.sender === 'ai' ? 'CallMind AI' : 'Client'}
                          </span>
                        </div>
                        
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        
                        {msg.translation && (
                          <div className="mt-2 pt-2 border-t border-white/10 text-xs text-slate-400 italic flex gap-1.5">
                            <Sparkles size={12} className="text-brand-300 mt-0.5" />
                            <span>Translated: "{msg.translation}"</span>
                          </div>
                        )}

                        {msg.action && (
                          <div className="mt-2 bg-black/20 rounded p-2 flex items-center gap-2">
                             <CheckCircle2 size={14} className="text-green-400" />
                             <span className="text-xs font-mono text-green-100">{msg.action}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {active && step < script.length && (
                  <div className="flex items-center gap-2 p-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-0"></div>
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-150"></div>
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce delay-300"></div>
                    </div>
                    <span className="text-xs text-slate-500">Processing...</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-6 bg-slate-900 border-t border-slate-800">
                <button
                  onClick={toggleDemo}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all ${
                    active 
                      ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/50' 
                      : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                  }`}
                >
                  {active ? (
                    <>
                      <X size={20} /> End Demo Call
                    </>
                  ) : (
                    <>
                      <Play size={20} fill="currentColor" /> Start Simulation
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Explanation / Context */}
          <div className="flex-1 max-w-lg space-y-8">
             <div className="space-y-6">
                <div className={`p-4 rounded-xl border transition-all duration-500 ${step >= 2 && step <= 3 ? 'bg-slate-800/50 border-brand-500/50' : 'border-transparent'}`}>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded flex items-center justify-center text-sm">1</span>
                    Real-time Translation
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 pl-8">
                    The caller speaks in Spanish. CallMind understands, transcribes, and translates instantly, allowing you to read in English.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all duration-500 ${step >= 4 && step <= 5 ? 'bg-slate-800/50 border-brand-500/50' : 'border-transparent'}`}>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded flex items-center justify-center text-sm">2</span>
                    Smart Responses
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 pl-8">
                    The AI checks your actual availability (connected to Calendar) and negotiates with the caller naturally.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border transition-all duration-500 ${step >= 6 ? 'bg-slate-800/50 border-brand-500/50' : 'border-transparent'}`}>
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded flex items-center justify-center text-sm">3</span>
                    Action Execution
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 pl-8">
                    Once agreed, CallMind actually performs the task—booking the slot on your calendar and sending a confirmation.
                  </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};