import { useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { FloatingElements } from '@/components/FloatingElements';
import { Navbar } from '@/sections/Navbar';
import { Hero } from '@/sections/Hero';
import { PainPoints } from '@/sections/PainPoints';
import { CoreFeatures } from '@/sections/CoreFeatures';
import { MultiPlatform } from '@/sections/MultiPlatform';
import { CoreValues } from '@/sections/CoreValues';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500 relative" style={{ background: 'var(--bg)' }}>
        {/* Global animated background */}
        <AnimatedBackground />
        
        {/* Floating decorative elements */}
        <FloatingElements />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content */}
        <main className="relative z-10">
          <Hero />
          <PainPoints />
          <CoreFeatures />
          <MultiPlatform />
          <CoreValues />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
