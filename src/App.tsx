import { useCallback } from 'react';
import { submitWaitlistEmail } from '@/lib/supabase';

// Layout components
import FloatingNav from './components/FloatingNav';
import MobileBottomCTA from './components/MobileBottomCTA';
import WordmarkFooter from './components/WordmarkFooter';
import ExitIntentPopup from './components/ExitIntentPopup';

// Sections
import HeroSection from './sections/HeroSection';
import LearnSection from './sections/LearnSection';
import PredictSection from './sections/PredictSection';
import LoopSection from './sections/LoopSection';
import SocialProofSection from './sections/SocialProofSection';
import FounderSection from './sections/FounderSection';
import CTASection from './sections/CTASection';

// Styles
import './styles/landing.css';

export default function App() {
  const handleEmailSubmit = useCallback(async (email: string) => {
    const { error } = await submitWaitlistEmail(email);
    if (error) {
      console.error('Waitlist submission failed:', error);
    }
  }, []);

  const scrollToCTA = useCallback(() => {
    document.getElementById('cta-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="landing-page min-h-screen" style={{ background: 'var(--bg-page)' }}>
      {/* Navigation */}
      <FloatingNav />

      {/* Hero */}
      <HeroSection onCTAClick={scrollToCTA} />

      {/* Section 2: It Learns You */}
      <LearnSection />

      {/* Section 3: Before You Film */}
      <PredictSection />

      {/* Section 4: The Full Loop */}
      <LoopSection />

      {/* Section 5: Social Proof */}
      <SocialProofSection />

      {/* Section 6: Founder */}
      <FounderSection />

      {/* Section 5: CTA */}
      <CTASection onSubmit={handleEmailSubmit} />

      {/* Footer */}
      <WordmarkFooter />

      {/* Mobile Bottom CTA */}
      <MobileBottomCTA />

      {/* Exit Intent (desktop only) */}
      <ExitIntentPopup onSubmit={handleEmailSubmit} />
    </div>
  );
}
