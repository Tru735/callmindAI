import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DemoSection } from './components/DemoSection';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';
import { Credibility } from './components/Credibility';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/Button';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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
        <Credibility />
        <Features />
        <DemoSection />
        <div id="faq">
          <FAQ />
        </div>

        <section className="py-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-900/20"></div>
           <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">Reclaim 2h/week of manual work</h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Join the beta today. 50% off for the first 200 users for the first month.
              </p>
              <div className="flex justify-center">
                 <Button size="lg" onClick={() => handleOpenWaitlist('')}>
                    Get Early Access
                 </Button>
              </div>
           </div>
        </section>
      </main>

      <Footer onLogoClick={() => setIsAdminOpen(true)} />
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialEmail={capturedEmail}
      />

      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />
    </div>
  );
};

export default App;