import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Globe, Linkedin, Mail, Send } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = contentRef.current?.children;
            if (children) {
              gsap.to(children, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/NabiulIslamNabil', icon: Github },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/nabiul-islam-nabil', icon: Linkedin },
    { name: 'Portfolio', href: 'https://nabiulislamnabil.github.io', icon: Globe },
    { name: 'Email', href: 'mailto:nabilnabiulislam@gmail.com', icon: Mail },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="gold-dotted-bg"
      style={{
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: 'clamp(80px, 12vh, 160px)',
      }}
    >
      <div
        ref={contentRef}
        className="max-w-[700px] mx-auto px-6 text-center"
      >
        {/* Label */}
        <div
          className="font-mono text-xs uppercase tracking-[0.12em] opacity-0"
          style={{
            color: '#DFAE4C',
            transform: 'translateY(30px)',
          }}
        >
          CONTACT
        </div>

        {/* Heading */}
        <h2
          className="font-display text-bone mt-5 opacity-0"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            transform: 'translateY(30px)',
          }}
        >
          Let us build something useful.
        </h2>

        {/* Body */}
        <p
          className="font-body mt-6 opacity-0"
          style={{
            fontSize: '20px',
            color: '#8A817C',
            lineHeight: 1.6,
            transform: 'translateY(30px)',
          }}
        >
          I am open to research collaborations, software projects, teaching assistantship work,
          and practical systems that combine mobile, backend, AI, and IoT. You can also reach
          me at 01713706733.
        </p>

        {/* CTA Button */}
        <div
          className="mt-12 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          <a
            href="mailto:nabilnabiulislam@gmail.com"
            className="inline-block font-mono text-sm uppercase tracking-wider px-10 py-4 rounded-full transition-all duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: '#DFAE4C',
              color: '#0A0908',
              borderRadius: '100px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F7B538';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DFAE4C';
            }}
          >
            <Send className="inline-block mr-2 align-[-3px]" size={16} />
            Email me
          </a>
        </div>

        {/* Social Links */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-3 opacity-0"
          style={{ transform: 'translateY(30px)' }}
        >
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-xs uppercase transition-all duration-200 inline-flex items-center gap-2 px-4 py-2 rounded-full hover:-translate-y-0.5"
                style={{
                  color: '#F2E9E4',
                  border: '1px solid rgba(242, 233, 228, 0.1)',
                  backgroundColor: 'rgba(5, 5, 5, 0.48)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F7B538';
                  e.currentTarget.style.borderColor = 'rgba(247, 181, 56, 0.5)';
                  e.currentTarget.style.backgroundColor = 'rgba(247, 181, 56, 0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#F2E9E4';
                  e.currentTarget.style.borderColor = 'rgba(242, 233, 228, 0.1)';
                  e.currentTarget.style.backgroundColor = 'rgba(5, 5, 5, 0.48)';
                }}
              >
                <Icon size={15} />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
