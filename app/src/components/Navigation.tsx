import { type MutableRefObject, useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: MutableRefObject<{
    scrollTo: (target: string | number, options?: { duration?: number }) => void;
  } | null>;
}

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'credentials', label: 'CV' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const marker = window.scrollY + window.innerHeight * 0.36;
      const sections = navItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => Boolean(section));
      let current: HTMLElement | undefined;

      for (const section of sections) {
        if (section.offsetTop <= marker) {
          current = section;
        }
      }

      setActiveSection(current?.id ?? '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-200"
      style={{
        background: scrolled
          ? 'linear-gradient(90deg, rgba(5, 5, 5, 0.96), rgba(14, 20, 22, 0.94), rgba(5, 5, 5, 0.96))'
          : 'linear-gradient(90deg, rgba(5, 5, 5, 0.78), rgba(16, 23, 25, 0.58), rgba(5, 5, 5, 0.78))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        height: 72,
        borderBottom: '1px solid rgba(242, 233, 228, 0.1)',
        boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.28)' : 'none',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Monogram */}
        <button
          onClick={() => {
            if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono font-bold text-base tracking-tight transition-all duration-200 hover:shadow-lg"
          style={{
            color: '#0A0908',
            backgroundColor: '#DFAE4C',
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: '0 0 24px rgba(247, 181, 56, 0.16)',
          }}
        >
          S.M. Nabiul Islam
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative font-mono text-xs uppercase tracking-[0.08em] transition-colors duration-300"
              style={{
                color: activeSection === item.id ? '#DFAE4C' : '#F2E9E4',
              }}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 h-[1px] w-full origin-left transition-transform duration-300"
                style={{
                  backgroundColor: '#DFAE4C',
                  transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
              <span
                className="absolute -bottom-1 left-0 h-[1px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: '#DFAE4C' }}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
