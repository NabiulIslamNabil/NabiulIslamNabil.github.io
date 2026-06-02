import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import FluidCanvas from './components/FluidCanvas';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Credentials from './sections/Credentials';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

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
    <div className="relative" style={{ backgroundColor: '#0A0908' }}>
      <FluidCanvas />
      <Navigation lenisRef={lenisRef} />
      <main className="relative z-10">
        <Hero lenisRef={lenisRef} />
        <Projects />
        <Stack />
        <Credentials />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
