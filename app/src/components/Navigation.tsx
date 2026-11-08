import { type MutableRefObject, useEffect, useRef, useState } from 'react';

interface NavigationProps {
  lenisRef: MutableRefObject<{
    scrollTo: (target: string | number, options?: { duration?: number }) => void;
  } | null>;
}

const navItems = [
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'research', label: 'Research' },
  { id: 'credentials', label: 'CV' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navigation({ lenisRef }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [navVisible, setNavVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 100);
      setNavVisible(currentScrollY < 12 || currentScrollY < lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      const marker = currentScrollY + window.innerHeight * 0.36;
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
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-out"
      style={{
        transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
        background: scrolled
          ? 'linear-gradient(90deg, rgba(5, 5, 5, 0.98), rgba(15, 22, 24, 0.97), rgba(5, 5, 5, 0.98))'
          : 'linear-gradient(90deg, rgba(5, 5, 5, 0.9), rgba(16, 23, 25, 0.84), rgba(5, 5, 5, 0.9))',
        height: 82,
        borderBottom: '1px solid rgba(223, 174, 76, 0.65)',
        boxShadow: scrolled
          ? '0 12px 42px rgba(0, 0, 0, 0.42), 0 1px 0 rgba(247, 181, 56, 0.14)'
          : '0 8px 28px rgba(0, 0, 0, 0.24), 0 1px 0 rgba(247, 181, 56, 0.1)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-full flex items-center justify-between">
        {/* Monogram */}
        <button
          onClick={() => {
            if (lenisRef.current) lenisRef.current.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-4 font-mono font-bold text-lg tracking-tight transition-all duration-200 hover:shadow-lg"
          aria-label="Return to the top of the portfolio"
        >
          <span
            className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg"
            style={{
              color: '#DFAE4C',
              backgroundColor: '#0A0908',
              border: '2px solid #F7D477',
              boxShadow: '0 0 20px rgba(10, 9, 8, 0.22)',
            }}
          >
            <span className="text-sm" aria-hidden="true">SN</span>
            <img
              src="/assets/headshot.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          </span>
          <span
            className="rounded-lg px-4 py-2.5"
            style={{
              color: '#0A0908',
              backgroundColor: '#DFAE4C',
              border: '1px solid #F7D477',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 244, 190, 0.5)',
            }}
          >
            S.M. Nabiul Islam
          </span>
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative rounded-md px-1.5 py-2 font-mono text-sm uppercase tracking-[0.1em] transition-colors duration-300"
              style={{
                color: '#DFAE4C',
                fontWeight: activeSection === item.id ? 700 : 500,
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
