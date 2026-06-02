import TerminalReveal from '../components/TerminalReveal';

const education = [
  'B.Sc. in Computer Science and Engineering, United International University - Fall 2022 to ongoing, CGPA 4.00, 110 credits completed and ongoing',
  'Higher Secondary Certificate, Shaheed Police Smrity College, Dhaka Board - 2021, GPA 5.00',
  'Secondary School Certificate, Banani Bidyaniketan School & College, Dhaka Board - 2019, GPA 4.89',
];

const experience = [
  'Undergraduate Teaching Assistant at United International University - Spring 2025 to present',
  'Assisted labs for Data Structures & Algorithms I & II, Electronics Lab, introductory programming, and computer systems courses',
  'Guided debugging, algorithmic problem solving, project development, and probation student counselling',
  'Volunteer with Bangladesh Red Crescent Youth, BBNSC - 2014 to 2019',
];

const achievements = [
  'Champion - UIU CSE Project Show Spring 2025, Project ResQ',
  '3rd Runners-Up - UIU CSE Project Show Summer 2025, Project ARAM',
  '4th Runners-Up - UIU CSE Project Show Fall 2023, Project EasyNeeds',
  '100% Merit Scholarship from UIU for 10 consecutive semesters, Spring 2023 to Fall 2025',
  '2nd Place - First Aid Training Competition, Bangladesh Red Crescent Youth',
];

const certifications = [
  'DevOps for Engineers - CENTER & UIU Cisco Networking Academy',
  'Grameenphone Academy - Interview & Assessment Centre, Art of Communication, Corporate Presentation Skills, Sharpen Your Interview Skills',
];

const research = [
  'Cybersecurity',
  'Machine Learning',
  'Edge Intelligence',
  'Internet of Things',
  'Green Computing',
  'Federated Learning',
  'Software Development',
];

const highlightResearch = new Set([
  'Cybersecurity',
  'Machine Learning',
  'Edge Intelligence',
  'Internet of Things',
  'Green Computing',
  'Federated Learning',
  'Software Development',
]);

const groups = [
  { title: 'Education', items: education },
  { title: 'Experience', items: experience },
  { title: 'Achievements', items: achievements },
  { title: 'Certifications', items: certifications },
];

export default function Credentials() {
  return (
    <section
      id="credentials"
      className="gold-dotted-bg"
      style={{
        paddingTop: 'clamp(80px, 12vh, 150px)',
        paddingBottom: 'clamp(80px, 12vh, 150px)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: '#DFAE4C' }}>
              CV Highlights
            </span>
            <h2
              className="font-display text-bone mt-5"
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Education, work, and recognition.
            </h2>
          </div>
          <a
            href="Nabiul_Islam_CV.pdf"
            className="font-mono text-xs uppercase tracking-[0.08em] px-6 py-3 rounded-full border transition-all duration-200 w-fit"
            style={{ borderColor: '#DFAE4C', color: '#DFAE4C' }}
          >
            Download CV
          </a>
        </div>

        <TerminalReveal command="cat cv-highlights.json" label="CV" maxWidth="1400px">
          <div
            className="grid gap-5"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {groups.map((group) => (
              <article
                key={group.title}
                style={{
                  backgroundColor: 'rgba(5, 5, 5, 0.72)',
                  border: '1px solid rgba(242, 233, 228, 0.1)',
                  borderRadius: '8px',
                  padding: '24px',
                }}
              >
                  <h3 className="font-mono text-sm uppercase tracking-[0.08em]" style={{ color: '#DFAE4C' }}>
                  "{group.title.toLowerCase()}":
                </h3>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="font-body" style={{ color: '#F2E9E4', lineHeight: 1.6 }}>
                      <span className="font-mono mr-2" style={{ color: '#DFAE4C' }}>-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {research.map((item) => {
              const highlight = typeof highlightResearch !== 'undefined' && highlightResearch.has(item);
              return (
                <span
                  key={item}
                  className="font-mono text-xs"
                  style={{
                    color: highlight ? '#DFAE4C' : '#F2E9E4',
                    border: highlight ? '1px solid rgba(247, 181, 56, 0.46)' : '1px solid rgba(242, 233, 228, 0.1)',
                    borderRadius: '100px',
                    padding: '8px 12px',
                    backgroundColor: highlight ? 'rgba(247, 181, 56, 0.08)' : 'rgba(242, 233, 228, 0.04)',
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </TerminalReveal>
      </div>
    </section>
  );
}
