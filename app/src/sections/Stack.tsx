import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Tool {
  name: string;
  color: string;
}

interface Category {
  name: string;
  tools: Tool[];
}

const categories: Category[] = [
  {
    name: 'Programming',
    tools: [
      { name: 'C', color: '#A8B9CC' },
      { name: 'C++', color: '#00599C' },
      { name: 'Python', color: '#3776AB' },
      { name: 'Java', color: '#F89820' },
    ],
  },
  {
    name: 'Web & App Development',
    tools: [
      { name: 'ReactJS', color: '#61DAFB' },
      { name: 'Flutter', color: '#02569B' },
      { name: 'HTML', color: '#E34F26' },
      { name: 'CSS', color: '#1572B6' },
      { name: 'JavaScript', color: '#F7DF1E' },
    ],
  },
  {
    name: 'Database & Backend',
    tools: [
      { name: 'MySQL', color: '#4479A1' },
      { name: 'Django', color: '#092E20' },
      { name: 'REST APIs', color: '#DFAE4C' },
    ],
  },
  {
    name: 'Tools & Research Interests',
    tools: [
      { name: 'GitHub', color: '#FFFFFF' },
      { name: 'Ubuntu', color: '#E95420' },
      { name: 'Machine Learning', color: '#DFAE4C' },
      { name: 'IoT', color: '#8FA3A6' },
      { name: 'Cybersecurity', color: '#DFAE4C' },
      { name: 'Federated Learning', color: '#8FA3A6' },
    ],
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const fullCommand = 'cat nabiul-stack.txt';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypingAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const startTypingAnimation = () => {
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setTypedText(fullCommand.slice(0, i));
      if (i >= fullCommand.length) {
        clearInterval(typeInterval);
        // Show categories after command is typed
        setTimeout(() => {
          setShowCategories(true);
          // Animate tool chips
          const chips = categoriesRef.current?.querySelectorAll('.tool-chip');
          if (chips) {
            gsap.to(chips, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.03,
              ease: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            });
          }
        }, 400);
      }
    }, 40);
  };

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="gold-dotted-bg"
      style={{
        paddingTop: '120px',
        paddingBottom: '120px',
      }}
    >
      {/* Header */}
      <div className="text-center">
        <h2
          className="font-display text-bone"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          Tech Stack
        </h2>
        <p
          className="font-body mt-4"
          style={{
            fontSize: '18px',
            color: '#8A817C',
            lineHeight: 1.5,
          }}
        >
          Skills from my CV, projects, and current research interests.
        </p>
      </div>

      {/* Terminal Block */}
      <div
        ref={terminalRef}
        className="mx-auto mt-16"
        style={{
          maxWidth: '900px',
          background: 'linear-gradient(145deg, rgba(5, 5, 5, 0.96), rgba(12, 16, 17, 0.94))',
          borderRadius: '16px',
          padding: '40px',
          border: '1px solid rgba(242, 233, 228, 0.1)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.34)',
          overflow: 'hidden',
        }}
      >
        <div
          className="flex items-center gap-2"
          aria-hidden="true"
          style={{
            margin: '-40px -40px 28px',
            padding: '14px 40px',
            background: 'linear-gradient(90deg, rgb(28 157 62 / 95%), rgb(100 197 48 / 78%))',
            borderBottom: '1px solid rgba(100, 197, 48, 0.65)',
          }}
        >
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27C93F' }} />
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] ml-3" style={{ color: '#0A0908' }}>
            Stack
          </span>
        </div>

        {/* Prompt line */}
        <div className="font-mono text-sm">
          <span style={{ color: '#DFAE4C' }}>nabiul</span>
          <span style={{ color: '#8A817C' }}>@dev</span>
          <span style={{ color: '#DFAE4C' }}>:~$</span>{' '}
          <span ref={commandRef} className="text-bone">{typedText}</span>
          <span className="inline-block w-2 h-4 bg-bone ml-0.5 animate-caret-blink align-middle" />
        </div>

        {/* Command output label */}
        <div className="font-mono text-sm mt-3" style={{ color: '#8A817C' }}>
          {typedText === fullCommand ? fullCommand : ''}
        </div>

        {/* Separator */}
        <div
          className="my-6"
          style={{
            height: '1px',
            backgroundColor: 'rgba(242, 233, 228, 0.08)',
          }}
        />

        {/* Categories */}
        <div ref={categoriesRef}>
          {categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="mb-6 last:mb-0"
              style={{
                opacity: showCategories ? 1 : 0,
                transition: 'opacity 0.3s ease',
                transitionDelay: `${catIdx * 100}ms`,
              }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-[0.06em] mb-3"
                style={{ color: '#DFAE4C' }}
              >
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.tools.map((tool, toolIdx) => (
                  <div
                    key={toolIdx}
                    className="tool-chip flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(242, 233, 228, 0.045)',
                      border: '1px solid rgba(242, 233, 228, 0.07)',
                      borderRadius: '8px',
                      padding: '10px 16px',
                      opacity: 0,
                      transform: 'translateY(10px)',
                    }}
                  >
                    <span
                      className="inline-block rounded-full"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: tool.color,
                        border: tool.color === '#FFFFFF' || tool.color === '#000000' ? '1px solid rgba(242, 233, 228, 0.3)' : 'none',
                      }}
                    />
                    <span className="font-mono text-[13px]" style={{ color: '#F2E9E4' }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
