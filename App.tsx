import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DemoSection } from './components/DemoSection';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { Credibility } from './components/Credibility';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedEmail, setCapturedEmail] = useState('');

  const handleOpenWaitlist = (email: string) => {
    setCapturedEmail(email);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-brand-500 selection:text-white font-sans">
      <Header />
      
      <main>
        <Hero onJoinWaitlist={handleOpenWaitlist} />
        
        {/* Credibility & Trust Section */}
        <Credibility />

        <Features />
        
        <DemoSection />
        
        <div id="faq">
          <FAQ />
        </div>

        {/* Final CTA Section */}
        <section className="py-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-900/20"></div>
           <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to reclaim your time?</h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Join the waitlist today and get 20 free AI calls when we launch our beta program next month.
              </p>
              <div className="flex justify-center">
                 <Button size="lg" onClick={() => handleOpenWaitlist('')}>
                    Join the Waitlist Now
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer />
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialEmail={capturedEmail}
      />
      
      <Analytics />
    </div>
  );
};

export default App;