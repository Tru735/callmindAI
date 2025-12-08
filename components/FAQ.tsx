import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI answer calls?",
    answer: "You simply forward your missed calls (or all calls) to a dedicated CallMind number. Our AI picks up instantly, identifies itself (optional), and handles the conversation based on your instructions."
  },
  {
    question: "Will callers know it's an AI?",
    answer: "You have full control. You can choose a hyper-realistic voice that's hard to distinguish, or have the AI announce itself as your digital assistant. We recommend transparency for business calls."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. Transcriptions are encrypted, and we do not use your personal call data to train public models. You retain full ownership of your conversation logs."
  },
  {
    question: "What languages are supported?",
    answer: "Currently, we support English, Spanish, French, German, and Mandarin, with 30+ more languages coming in the beta release."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Common Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-white">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-brand-400 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-slate-500 w-5 h-5" />
                )}
              </button>
              
              <div 
                className={`px-6 text-slate-400 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 py-4 pt-0' : 'max-h-0'
                }`}
              >
                <p className="leading-relaxed text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};