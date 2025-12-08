import React, { useState, useEffect } from 'react';
import { X, Check, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';
import { UseCaseOption, WaitlistData } from '../types';
import { submitWaitlist } from '../services/waitlist';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail: string;
}

const USE_CASES: UseCaseOption[] = [
  { id: 'freelancer', label: 'Freelancer', icon: '💻' },
  { id: 'smb', label: 'SMB Owner', icon: 'shop' },
  { id: 'founder', label: 'Founder', icon: '🚀' },
  { id: 'support', label: 'Support Team', icon: '🎧' },
  { id: 'remote', label: 'Remote Worker', icon: '🌍' },
  { id: 'other', label: 'Other', icon: '...' },
];

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, initialEmail }) => {
  const [step, setStep] = useState(1); // 1: Use Case, 2: Pricing, 3: Success
  const [data, setData] = useState<WaitlistData>({
    email: '',
    useCase: null,
    willingnessToPay: null,
    source: 'landing_page_v1',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Sync initialEmail prop to state when modal opens
  useEffect(() => {
    if (isOpen && initialEmail) {
      setData(prev => ({ ...prev, email: initialEmail }));
      setStep(1);
      setApiError(null);
    }
  }, [isOpen, initialEmail]);

  const handleUseCaseSelect = (id: string) => {
    setData(prev => ({ ...prev, useCase: id }));
    // Auto advance after short delay for better UX
    setTimeout(() => setStep(2), 300);
  };

  const handlePricingSelect = async (score: number) => {
    // Optimistic update of state
    const finalData = { ...data, willingnessToPay: score };
    setData(finalData);
    
    setIsSubmitting(true);
    setApiError(null);
    
    // Call Service
    const response = await submitWaitlist(finalData);
    
    setIsSubmitting(false);

    if (response.success) {
      setStep(3);
    } else {
      // Handle API Errors
      if (response.error === 'duplicate') {
        setApiError("This email is already on the waitlist!");
      } else if (response.error === 'invalid_email') {
        setApiError("Please provide a valid email address.");
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl shadow-brand-500/10 overflow-hidden transform transition-all">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Progress Bar (Only show if not success) */}
          {step < 3 && (
            <div className="flex gap-2 mb-8">
              <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
              <div className={`h-1 flex-1 rounded-full ${step >= 3 ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold mb-2 text-white">How will you use CallMind?</h3>
              <p className="text-slate-400 mb-6">Help us tailor the experience for your needs.</p>
              
              <div className="grid grid-cols-2 gap-3">
                {USE_CASES.map(uc => (
                  <button
                    key={uc.id}
                    onClick={() => handleUseCaseSelect(uc.id)}
                    className={`p-4 rounded-xl border text-left transition-all hover:bg-slate-800 ${
                      data.useCase === uc.id 
                        ? 'border-brand-500 bg-brand-500/10 text-brand-100' 
                        : 'border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="block font-medium">{uc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in text-center">
              <h3 className="text-2xl font-bold mb-2 text-white">One last thing...</h3>
              <p className="text-slate-400 mb-8">
                How likely are you to pay <span className="text-white font-bold">$9/month</span> for this service if it saves you 2 hours a week?
              </p>

              <div className="flex justify-between items-center mb-4 px-2">
                 <span className="text-xs text-slate-500">Not likely</span>
                 <span className="text-xs text-slate-500">Take my money</span>
              </div>
              
              <div className="flex justify-between gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePricingSelect(num)}
                    disabled={isSubmitting}
                    className={`w-12 h-12 rounded-lg font-bold text-lg transition-all ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                    } ${
                      data.willingnessToPay === num 
                        ? 'bg-brand-500 text-white' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              {isSubmitting && (
                <p className="text-brand-400 text-sm animate-pulse">Saving your spot...</p>
              )}

              {apiError && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm text-left animate-fade-in">
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in text-center py-6">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} strokeWidth={3} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">You're on the list!</h3>
              <p className="text-slate-400 mb-8">
                We'll notify <strong>{data.email}</strong> as soon as we open up spots for the {data.useCase ? data.useCase : 'beta'} cohort.
              </p>
              <Button onClick={onClose} fullWidth>
                Return to Site <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
