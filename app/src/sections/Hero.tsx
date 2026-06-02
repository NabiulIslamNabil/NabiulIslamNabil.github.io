import { type MutableRefObject, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: MutableRefObject<{
    scrollTo: (target: string | number, options?: { duration?: number }) => void;
  } | null>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }, 0);

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }, 0.12);

      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }, 0.24);

      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }, 0.36);

      tl.to(imageRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      }, 0.3);

      if (badgesContainerRef.current) {
        const badges = badgesContainerRef.current.querySelectorAll('.badge-item');
        tl.to(badges, {
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'none',
        }, 0.5);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#projects', { duration: 1.2 });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="gold-dotted-bg relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 78% 48%, rgba(34, 51, 59, 0.34) 0%, transparent 48%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          {/* Label */}
          <div
            ref={labelRef}
            className="font-mono text-xs uppercase tracking-[0.12em] mb-6 opacity-0"
            style={{ color: '#DFAE4C', transform: 'translateY(40px)' }}
          >
            CSE UNDERGRADUATE & UNDERGRADUATE TEACHING ASSISTANT
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="font-display text-bone opacity-0"
            style={{
              fontSize: 'clamp(48px, 6vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              transform: 'translateY(40px)',
            }}
          >
            S.M. Nabiul Islam Nabil
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body mt-6 opacity-0"
            style={{
              fontSize: '18px',
              fontWeight: 400,
              lineHeight: 1.7,
              color: '#8A817C',
              transform: 'translateY(40px)',
            }}
          >
            I build practical software, IoT systems, and AI-assisted solutions for real-world problems in Bangladesh. 
            Currently working on projects and doing research at UIU and I have also mentored over 300+ students as an 
            Undergraduate Teaching Assistant.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToProjects}
            className="mt-8 font-mono text-xs uppercase tracking-[0.08em] px-8 py-4 rounded-full border transition-all duration-[250ms] ease-out opacity-0 hover:scale-[1.02]"
            style={{
              borderColor: '#DFAE4C',
              color: '#F2E9E4',
              backgroundColor: 'rgba(10, 9, 8, 0.62)',
              transform: 'translateY(40px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F7B538';
              e.currentTarget.style.color = '#0A0908';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(10, 9, 8, 0.62)';
              e.currentTarget.style.color = '#F2E9E4';
            }}
          >
            Explore my work
          </button>
        </div>

        {/* Right Side - Image & Badges */}
        <div className="relative h-[600px]">
          {/* Profile Image */}
          <div
            ref={imageRef}
            className="absolute inset-0 rounded-2xl overflow-hidden opacity-0"
            style={{
              background: 'linear-gradient(135deg, rgba(5, 5, 5, 0.92) 0%, rgba(16, 23, 25, 0.86) 100%)',
              border: '1px solid rgba(247, 181, 56, 0.16)',
              boxShadow: '0 28px 70px rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src="/assets/Nabiul4.jpg"
              alt="S.M. Nabiul Islam Nabil"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badges */}
          <div ref={badgesContainerRef}>
            <div className="badge-item absolute -bottom-6 -left-12 opacity-0">
              <div
                className="font-mono text-sm px-4 py-3 rounded-lg backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(10, 9, 8, 0.86)',
                  color: '#F2E9E4',
                  border: '1px solid rgba(247, 181, 56, 0.22)',
                }}
              >
                <div className="font-bold">Champion</div>
                <div className="text-xs opacity-80">UIU Project Show 2025</div>
              </div>
            </div>

            <div className="badge-item absolute top-8 -right-12 opacity-0">
              <div
                className="font-mono text-sm px-4 py-3 rounded-lg backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(34, 51, 59, 0.8)',
                  color: '#F2E9E4',
                  border: '1px solid rgba(247, 181, 56, 0.14)',
                }}
              >
                <div className="font-bold">300+</div>
                <div className="text-xs">Students Mentored</div>
              </div>
            </div>

            <div className="badge-item absolute bottom-1/3 -right-8 opacity-0">
              <div
                className="font-mono text-sm px-4 py-3 rounded-lg backdrop-blur-md"
                style={{
                  backgroundColor: 'rgba(16, 23, 25, 0.84)',
                  color: '#F2E9E4',
                  border: '1px solid rgba(169, 159, 149, 0.22)',
                }}
              >
                <div className="font-bold">Full Stack</div>
                <div className="text-xs">Developer & Mentor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
