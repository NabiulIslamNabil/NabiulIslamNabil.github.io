import TerminalReveal from '../components/TerminalReveal';

const projects = [
  {
    name: 'ResQ',
    category: '🏆 Champion – UIU CSE Project Show Spring 2025',
    description: 'Cross-platform emergency response app with real-time SOS, location tracking, and first-aid guidance.',
    tech: ['Flutter', 'Django', 'Python', 'Location Tracking'],
    image: '/assets/resq.png',
    github: 'https://github.com/NabiulIslamNabil/ResQ-FrontEnd',
  },
  {
    name: 'ARAM',
    category: '🥉 3rd Runners-Up – UIU CSE Project Show Summer 2025',
    description: 'Autonomous IoT river monitor measuring pH, turbidity, and temperature with live data visualization.',
    tech: ['Embedded C', 'IoT Sensors', 'Dashboard', 'Hardware'],
    image: '/assets/aram.jpg',
    video: 'https://www.youtube.com/watch?v=9F3uHl2y_LM',
  },
  {
    name: 'FinVision 3.0',
    category: '📱 AI-Powered Smart Financial Assistant',
    description: 'Scan receipts, log expenses by chat, predict money runout, and split bills with roommates.',
    tech: ['React Native', 'Expo', 'Tesseract.js', 'OCR'],
    image: '/assets/finvision.png',
    github: 'https://github.com/Team-Anton/Finvision-3.0',
  },
  {
    name: 'FarmFriend',
    category: '💻 Full-Stack Smart Agriculture System',
    description: 'Smart farming platform for crop management, expense tracking, fertilizer scheduling & irrigation.',
    tech: ['ReactJS', 'Django', 'MySQL', 'Python'],
    image: '/assets/farmfriend.jpg',
    github: 'https://github.com/RefatHex/Farm_Friend',
  },
  {
    name: 'EasyNeeds',
    category: '🛒 4th Runners-Up – UIU CSE Project Show Fall 2023',
    description: 'Integrated service platform connecting users with housing, food, healthcare, and education.',
    tech: ['Java', 'OOP Design', 'Service Platform', 'Backend'],
    image: '/assets/easyneeds.jpg',
    github: 'https://github.com/RefatHex/EasyNeedsAOOP',
  },

  {
    name: 'Snake Game',
    category: '🎮 Java Game',
    description: 'Classic snake game with smooth gameplay, scoring system, and collision detection.',
    tech: ['Java', 'Game Logic', 'Desktop App', 'UI'],
    image: '/assets/snake.png',
    github: 'https://github.com/NabiulIslamNabil/SnakeGameJava',
  },
  {
    name: 'Weather App',
    category: '🌦 API-Based Weather Utility',
    description: 'Real-time weather information with location-based forecasts and clean interactive output.',
    tech: ['JavaScript', 'Public APIs', 'Frontend', 'DOM'],
    image: '/assets/weather.png',
    github: 'https://github.com/NabiulIslamNabil/WeatherApp',
  },
  {
    name: 'Bash Script Practice',
    category: '⌨ Operating Systems Practice',
    description: 'Classwork, lab, and exam-prep Bash scripts for process, file, and shell fundamentals.',
    tech: ['Bash', 'Linux', 'Ubuntu', 'OS'],
    image: '/assets/bash.png',
    github: 'https://github.com/NabiulIslamNabil/Bash-Script-Practice',
  },
  {
    name: 'River Analysis Boat',
    category: '🚢 Electronics Course Project',
    description: 'A course hardware project focused on river condition analysis and practical sensing.',
    tech: ['Hardware', 'Sensors', 'Electronics', 'Prototype'],
    image: '/assets/boat.jpg',
    video: 'https://www.youtube.com/watch?v=f2o7E0ZSTR8',
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="gold-dotted-bg"
      style={{
        paddingTop: 'clamp(80px, 12vh, 160px)',
        paddingBottom: '120px',
      }}
    >
      {/* Header Row */}
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-end mb-16">
        <div>
          <h2
            className="font-display text-bone"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="relative inline-block">
              Projects
              <span
                className="absolute left-0 w-full"
                style={{
                  bottom: '-8px',
                  height: '2px',
                  backgroundColor: '#DFAE4C',
                }}
              />
            </span>
          </h2>
        </div>
        <span className="font-mono text-xs" style={{ color: '#8A817C' }}>
          (2022-Present)
        </span>
      </div>

      <TerminalReveal command="ls projects --featured" label="Projects" maxWidth="1400px" className="px-0">
        <div
          className="project-grid-frame"
          style={{
            border: '1px solid rgba(223, 174, 76, 0.58)',
            borderRadius: '12px',
            padding: '18px',
            background: 'rgba(10, 9, 8, 0.28)',
            boxShadow: 'inset 0 1px 0 rgba(247, 181, 56, 0.16), 0 18px 50px rgba(0, 0, 0, 0.24)',
          }}
        >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((project, index) => (
          <div
            key={index}
            className="project-card group relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1"
            style={{
              borderRadius: '8px',
            }}
          >
            <div className="h-28 overflow-hidden border-b" style={{ borderColor: 'rgba(223, 174, 76, 0.22)' }}>
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:saturate-125 group-hover:contrast-110"
              />
            </div>

            <div className="p-5">
              <div className="font-mono text-[11px] mb-4" style={{ color: '#746F69' }}>
                ./projects/{String(index + 1).padStart(2, '0')}-{project.name.toLowerCase().replaceAll(' ', '-')}.md
              </div>
              <span
                className="font-mono text-[11px] uppercase tracking-wider"
                style={{ color: '#DFAE4C' }}
              >
                {project.category}
              </span>
              <h3
                className="font-display mt-2"
                style={{
                  fontSize: '22px',
                  fontWeight: 400,
                  lineHeight: 1.2,
                  color: '#F2E9E4',
                }}
              >
                {project.name}
              </h3>
              {project.description && (
                <p
                  className="font-body text-sm mt-3"
                  style={{ color: '#A99F95', lineHeight: 1.55 }}
                >
                  {project.description}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono text-[9px]"
                    style={{
                      color: '#CFC7C1',
                      border: '1px solid rgba(242, 233, 228, 0.1)',
                      borderRadius: '100px',
                      padding: '4px 10px',
                      backgroundColor: 'rgba(242, 233, 228, 0.045)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              {(project.github || project.video) && (
                <div className="mt-4">
                  <a
                    href={project.video ?? project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] transition-all duration-200 hover:underline"
                    style={{ color: '#DFAE4C', textDecoration: 'none' }}
                  >
                    {project.video ? 'Watch on YouTube' : 'View on GitHub'}
                  </a>
                </div>
              )}
            </div>
          </div>
          ))}
        </div>
        </div>
      </TerminalReveal>
    </section>
  );
}
