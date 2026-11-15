import TerminalReveal from '../components/TerminalReveal';

const research = [
  {
    title: 'Cybersecurity & Software Supply Chain Security',
    description:
      'Machine learning-based malicious package detection, dependency risk assessment, and software supply-chain attack prevention.',
  },
  {
    title: 'Green Computing & Edge Intelligence',
    description:
      'Carbon-aware scheduling, energy-efficient edge computing, and sustainable IoT-based environmental monitoring.',
  },
  {
    title: 'Software Supply Chain Security',
    description:
      'Analyzing trust relationships, attack vectors, and critical compromise points in modern software ecosystems.',
  },
  {
    title: 'Remote Sensing & Agricultural AI',
    description:
      'Applying remote sensing and machine learning for paddy rice yield prediction and smart irrigation advisory in Bangladesh.',
  },
  {
    title: 'Human-Computer Interaction (HCI)',
    description:
      "Human-centered design, user research, usability, and technology-driven solutions for women's safety.",
  },
];

export default function Research() {
  return (
    <section
      id="research"
      className="gold-dotted-bg"
      style={{
        paddingTop: 'clamp(100px, 14vh, 170px)',
        paddingBottom: 'clamp(100px, 14vh, 170px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div>
          <div className="flex flex-col gap-8 mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: '#DFAE4C' }}>
                Research / 01—05
              </span>
              <h2
                className="font-display text-bone mt-5"
                style={{
                  fontSize: 'clamp(42px, 6vw, 78px)',
                  fontWeight: 400,
                  lineHeight: 0.98,
                  letterSpacing: '-0.04em',
                }}
              >
                Ideas in
                <br />
                motion.
              </h2>
            </div>
            <p className="font-body mt-7 max-w-sm" style={{ color: '#A99F95', lineHeight: 1.7 }}>
              Exploring how thoughtful computing can make software safer, systems more sustainable, and technology more human.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-px w-14" style={{ backgroundColor: '#DFAE4C' }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#8A817C' }}>
                Curiosity-led computing
              </span>
            </div>
          </div>

          <TerminalReveal command="cat research-interests.json" label="Research" maxWidth="none" className="!mx-0">
            <div className="grid gap-4 md:grid-cols-2">
              {research.map((item, index) => (
                <article
                  key={item.title}
                  className={`group relative transition-all duration-300 hover:-translate-y-1 ${
                    index === research.length - 1 ? 'md:col-span-2 md:mx-auto md:w-1/2' : ''
                  }`}
                  style={{
                    border: '1px solid rgba(242, 233, 228, 0.12)',
                    borderRadius: '12px',
                    padding: 'clamp(22px, 3vw, 34px)',
                    background:
                      'linear-gradient(120deg, rgba(247, 181, 56, 0.075), rgba(5, 5, 5, 0.62) 38%, rgba(34, 51, 59, 0.28))',
                    boxShadow: 'inset 0 1px 0 rgba(242, 233, 228, 0.08)',
                  }}
                >
                  <span className="font-mono text-xs" style={{ color: '#DFAE4C' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-display mt-7 max-w-2xl"
                    style={{ color: '#F2E9E4', fontSize: 'clamp(20px, 2.4vw, 30px)', lineHeight: 1.15, fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>
                  <p className="font-body mt-4 max-w-2xl" style={{ color: '#A99F95', lineHeight: 1.65 }}>
                    {item.description}
                  </p>
                  <div
                    className="mt-7 h-px w-12 transition-all duration-300 group-hover:w-24"
                    style={{ backgroundColor: '#DFAE4C' }}
                  />
                </article>
              ))}
            </div>
          </TerminalReveal>
        </div>
      </div>
    </section>
  );
}
