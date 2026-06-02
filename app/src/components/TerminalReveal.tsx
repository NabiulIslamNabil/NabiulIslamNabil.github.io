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
      className={`mx-auto ${className}`}
      style={{
        maxWidth,
        background: 'linear-gradient(145deg, rgba(5, 5, 5, 0.96), rgba(12, 16, 17, 0.94))',
        borderRadius: '16px',
        padding: 'clamp(24px, 4vw, 40px)',
        border: '1px solid rgba(242, 233, 228, 0.1)',
        boxShadow: '0 24px 80px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(242, 233, 228, 0.05)',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center gap-2 mb-7"
        aria-hidden="true"
        style={{
          margin: 'clamp(-40px, -4vw, -24px) clamp(-40px, -4vw, -24px) 28px',
          padding: '14px clamp(24px, 4vw, 40px)',
          background: 'linear-gradient(90deg, rgb(28 157 62 / 95%), rgb(100 197 48 / 78%))',
          borderBottom: '1px solid rgba(100, 197, 48, 0.65)',
        }}
      >
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5F56' }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FFBD2E' }} />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27C93F' }} />
        {label && (
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] ml-3" style={{ color: '#0A0908' }}>
            {label}
          </span>
        )}
      </div>

      <div className="font-mono text-sm">
        <span style={{ color: '#DFAE4C' }}>nabiul</span>
        <span style={{ color: '#8A817C' }}>@portfolio</span>
        <span style={{ color: '#DFAE4C' }}>:~$</span>{' '}
        <span className="text-bone">{typedText}</span>
        <span className="inline-block w-2 h-4 bg-bone ml-0.5 animate-caret-blink align-middle" />
      </div>

      <div
        className="mt-8 transition-all duration-500"
        style={{
          opacity: showOutput ? 1 : 0,
          transform: showOutput ? 'translateY(0)' : 'translateY(14px)',
          pointerEvents: showOutput ? 'auto' : 'none',
        }}
      >
        {showOutput && children}
      </div>
    </div>
  );
}
