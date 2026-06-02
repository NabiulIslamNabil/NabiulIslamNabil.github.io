import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Stack', href: '#stack' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const connectLinks = [
    { label: 'GitHub', href: 'https://github.com/NabiulIslamNabil', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nabiul-islam-nabil', icon: Linkedin },
    { label: 'Email', href: 'mailto:nabilnabiulislam@gmail.com', icon: Mail },
  ];

  return (
    <footer
      className="gold-dotted-bg"
      style={{
        borderTop: '1px solid rgba(242, 233, 228, 0.1)',
        padding: '60px 0 40px',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] mb-4" style={{ color: '#DFAE4C' }}>
              About
            </h3>
            <p className="font-body text-sm" style={{ color: '#8A817C', lineHeight: 1.6 }}>
              CSE @ UIU. Building practical software, IoT systems, and AI solutions. Champion of UIU Project Show 2025.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] mb-4" style={{ color: '#DFAE4C' }}>
              Quick Links
            </h3>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} className="block font-body text-sm gold-link" style={{ color: '#A99F95' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.08em] mb-4" style={{ color: '#DFAE4C' }}>
              Connect
            </h3>
            <div className="flex flex-col items-start gap-3">
              {connectLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm gold-link inline-flex items-center gap-2.5"
                    style={{ color: '#A99F95' }}
                  >
                    <Icon size={15} />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(242, 233, 228, 0.08)', marginBottom: '24px' }} />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[11px]" style={{ color: '#8A817C' }}>
            © 2026 S.M. Nabiul Islam Nabil. All rights reserved.
          </span>

          <span className="font-display text-sm font-bold" style={{ color: '#DFAE4C' }}>
            S.M. Nabiul Islam Nabil
          </span>

          <span className="font-mono text-[11px]" style={{ color: '#8A817C' }}>
            Built using React & Vite
          </span>
        </div>
      </div>
    </footer>
  );
}
