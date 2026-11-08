import TerminalReveal from '../components/TerminalReveal';

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
      { name: 'Edge Intelligence', color: '#8FA3A6' },
      { name: 'HCI', color: '#C8B6FF' },
      { name: 'Computer Security', color: '#DFAE4C' },
      { name: 'Digital Image Processing', color: '#8FA3A6' },
    ],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
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

      <TerminalReveal command="cat nabiul-stack.txt" label="Tech Stack" maxWidth="900px" className="mt-16">
          {categories.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="mb-6 last:mb-0"
              style={{
                animation: 'terminal-output-in 500ms ease both',
                animationDelay: `${catIdx * 100}ms`,
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
                      border: '1px solid rgba(223, 174, 76, 0.18)',
                      borderRadius: '10px',
                      padding: '10px 16px',
                      boxShadow: 'inset 0 1px 0 rgba(247, 181, 56, 0.08)',
                      transition: 'border-color 200ms ease, background-color 200ms ease, transform 200ms ease',
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
      </TerminalReveal>
    </section>
  );
}
