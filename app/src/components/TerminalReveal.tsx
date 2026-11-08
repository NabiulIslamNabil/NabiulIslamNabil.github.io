import { type ReactNode, useEffect, useRef, useState } from 'react';

interface TerminalRevealProps {
  command: string;
  label?: string;
  children: ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function TerminalReveal({
  command,
  label,
  children,
  className = '',
  maxWidth = '1100px',
}: TerminalRevealProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        let i = 0;
        const typeInterval = window.setInterval(() => {
          i += 1;
          setTypedText(command.slice(0, i));

          if (i >= command.length) {
            window.clearInterval(typeInterval);
            window.setTimeout(() => setShowOutput(true), 350);
          }
        }, 36);

        observer.unobserve(entry.target);
      },
      { threshold: 0.25 }
    );

    observer.observe(terminal);

    return () => observer.disconnect();
  }, [command]);

  return (
    <div
      ref={terminalRef}
      className={`group relative mx-auto overflow-hidden ${className}`}
      style={{
        maxWidth,
        background:
          'linear-gradient(145deg, rgba(16, 23, 25, 0.98), rgba(5, 5, 5, 0.98) 62%, rgba(20, 17, 11, 0.96))',
        borderRadius: '18px',
        padding: 'clamp(24px, 4vw, 40px)',
        border: '1px solid rgba(223, 174, 76, 0.38)',
        boxShadow:
          '0 24px 80px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(223, 174, 76, 0.05), inset 0 1px 0 rgba(247, 181, 56, 0.14)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(223, 174, 76, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(223, 174, 76, 0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
        }}
      />
      <div
        className="relative -mx-[clamp(24px,4vw,40px)] -mt-[clamp(24px,4vw,40px)] mb-7 flex items-center justify-between border-b px-[clamp(24px,4vw,40px)] py-3.5"
        style={{
          background: 'rgba(5, 5, 5, 0.62)',
          borderColor: 'rgba(223, 174, 76, 0.22)',
        }}
      >
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#27C93F' }} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: '#8A817C' }}>
          {label ?? 'terminal'} <span style={{ color: '#DFAE4C' }}>●</span>
        </span>
      </div>

      <div
        className="relative rounded-lg px-4 py-3 font-mono text-sm"
        style={{
          background: 'rgba(0, 0, 0, 0.34)',
          border: '1px solid rgba(242, 233, 228, 0.08)',
          boxShadow: 'inset 0 1px 10px rgba(0, 0, 0, 0.18)',
        }}
      >
        <span style={{ color: '#DFAE4C' }}>nabiul</span>
        <span style={{ color: '#8A817C' }}>@portfolio</span>
        <span style={{ color: '#DFAE4C' }}>:~$</span>{' '}
        <span className="text-bone">{typedText}</span>
        <span className="ml-0.5 inline-block h-4 w-2 bg-[#DFAE4C] align-middle animate-caret-blink" />
      </div>

      <div
        className="relative mt-8 border-t pt-6 transition-all duration-500"
        style={{
          opacity: showOutput ? 1 : 0,
          transform: showOutput ? 'translateY(0)' : 'translateY(14px)',
          pointerEvents: showOutput ? 'auto' : 'none',
          borderColor: 'rgba(223, 174, 76, 0.16)',
        }}
      >
        {showOutput && children}
      </div>
    </div>
  );
}
