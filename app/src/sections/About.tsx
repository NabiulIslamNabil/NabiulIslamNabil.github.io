import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import TerminalReveal from '../components/TerminalReveal';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (rightRef.current) {
              gsap.to(rightRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="gold-dotted-bg"
      style={{
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: 'clamp(80px, 12vh, 160px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
        {/* Left Column */}
        <TerminalReveal command="cat about-nabiul.md" label="About" className="flex-1">
          <span
            className="font-mono text-xs uppercase tracking-[0.1em]"
            style={{ color: '#DFAE4C' }}
          >
            ABOUT
          </span>

          <h2
            className="font-display text-bone mt-5"
            style={{
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Purpose-driven engineering.
          </h2>

          <p
            className="font-body mt-8"
            style={{
              fontSize: '18px',
              color: '#A99F95',
              lineHeight: 1.7,
            }}
          >
            I'm a Computer Science and Engineering undergraduate at United International University
            with a 4.00 CGPA and 121 credits completed and ongoing. I work across mobile apps,
            full-stack systems, embedded hardware, and research-oriented computing.
          </p>

          <p
            className="font-body mt-6"
            style={{
              fontSize: '18px',
              color: '#A99F95',
              lineHeight: 1.7,
            }}
          >
            I’m a full-stack, mobile, and hardware developer with award-winning projects recognized at the UIU CSE Project Show. 
            My work includes ResQ, a real-time emergency response app with SOS alerts and location tracking; 
            ARAM, an autonomous IoT river monitoring system; EasyNeeds, a service platform connecting users with essential resources; 
            FarmFriend, a smart agriculture management platform; and FinVision AI, an AI-powered personal finance assistant 
            featuring OCR receipt scanning, NLP expense logging, bill splitting, and budgeting tools.

          </p>

          <p
            className="font-body mt-6"
            style={{
              fontSize: '18px',
              color: '#A99F95',
              lineHeight: 1.7,
            }}
          >
            My research interests include <span style={{ color: '#DFAE4C' }}>cybersecurity</span>, <span style={{ color: '#DFAE4C' }}>machine learning</span>, <span style={{ color: '#DFAE4C' }}>edge intelligence</span>, <span style={{ color: '#DFAE4C' }}>IoT</span>, <span style={{ color: '#DFAE4C' }}>green computing</span>, and <span style={{ color: '#DFAE4C' }}>federated learning</span>.
          </p>

          {/* Status row */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse-dot"
              style={{ backgroundColor: '#DFAE4C' }}
            />
            <span className="font-mono text-xs" style={{ color: '#F2E9E4' }}>
              Based in Dhaka, Bangladesh
            </span>
            <a
              href="mailto:nabilnabiulislam@gmail.com"
              className="font-mono text-xs transition-colors duration-200 hover:underline"
              style={{ color: '#DFAE4C' }}
            >
              nabilnabiulislam@gmail.com
            </a>
          </div>
        </TerminalReveal>

        {/* Right Column — Portrait */}
        <div
          ref={rightRef}
          className="flex-1 max-w-[500px] w-full opacity-0"
          style={{ transform: 'translateX(40px)' }}
        >
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '3/4', borderRadius: '20px' }}
          >
            <img
              src="/assets/Nabiul3.jpg"
              alt="S.M. Nabiul Islam Nabil"
              className="w-full h-full object-cover"
            />

            {/* Location badge */}
            <div
              className="absolute flex items-center gap-2"
              style={{
                bottom: '24px',
                left: '24px',
                backgroundColor: '#0A0908',
                borderRadius: '12px',
                padding: '12px 20px',
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0C3.065 0 1.5 1.565 1.5 3.5C1.5 5.75 5 10 5 10C5 10 8.5 5.75 8.5 3.5C8.5 1.565 6.935 0 5 0ZM5 4.5C4.175 4.5 3.5 3.825 3.5 3C3.5 2.175 4.175 1.5 5 1.5C5.825 1.5 6.5 2.175 6.5 3C6.5 3.825 5.825 4.5 5 4.5Z"
                  fill="#DFAE4C"
                />
              </svg>
              <span className="font-mono text-xs" style={{ color: '#F2E9E4' }}>
                Dhaka, Bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
