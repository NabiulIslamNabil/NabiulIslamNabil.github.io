import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import FluidCanvas from './components/FluidCanvas';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Research from './sections/Research';
import Credentials from './sections/Credentials';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-32 w-px -translate-y-1/2 overflow-hidden rounded-full bg-bone/10 md:block"
      aria-hidden="true"
    >
      <div
        className="relative w-full rounded-full bg-gold transition-[height] duration-150"
        style={{ height: `${progress}%` }}
      >
        <span className="absolute -left-1 h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(223,174,76,0.9)]" />
      </div>
    </div>
  );
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-atmosphere relative">
      <FluidCanvas />
      <div className="ambient-background" aria-hidden="true">
        <span className="ambient-orb ambient-orb-gold" />
        <span className="ambient-orb ambient-orb-blue" />
        <span className="ambient-frame ambient-frame-one" />
        <span className="ambient-frame ambient-frame-two" />
      </div>
      <div className="cs-atmosphere" aria-hidden="true">
        <span className="cs-label cs-label-top">SYS.ONLINE // 01</span>
        <span className="cs-label cs-label-middle">BUILD / CREATE / RESEARCH</span>
        <span className="cs-label cs-label-bottom">01001&nbsp; 10110&nbsp; 01101</span>
        <span className="circuit circuit-one" />
        <span className="circuit circuit-two" />
        <span className="circuit circuit-three" />
        <span className="circuit-node node-one" />
        <span className="circuit-node node-two" />
        <span className="circuit-node node-three" />
        <span className="circuit-node node-four" />
        <span className="scan-beam" />
      </div>
      <ScrollProgress />
      <Navigation lenisRef={lenisRef} />
      <main className="relative z-10">
        <Hero lenisRef={lenisRef} />
        <Projects />
        <Stack />
        <Research />
        <Credentials />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
