import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import TerminalReveal from '../components/TerminalReveal';

const projects = [
  {
    name: 'ResQ',
    category: '🏆 Champion – UIU CSE Project Show Spring 2025',
    description: 'Cross-platform emergency response app with real-time SOS, location tracking, and first-aid guidance.',
    tech: ['Flutter', 'Django', 'Python', 'Location Tracking'],
    image: '/assets/resq.png',
    github: 'https://github.com/NabiulIslamNabil/ResQ-FrontEnd',
    details: 'ResQ is an emergency response coordination platform that connects citizens with emergency services during crisis situations. It provides fast, reliable, and accessible assistance through a Flutter mobile app and Django backend.',
    highlights: ['One-tap SOS with GPS location', 'Incident reporting with media uploads', 'AI emergency guidance and role-based support', 'Live tracking, notifications, and smart navigation'],
  },
  {
    name: 'ARAM',
    category: '🥉 3rd Runners-Up – UIU CSE Project Show Summer 2025',
    description: 'Autonomous IoT river monitor measuring pH, turbidity, and temperature with live data visualization.',
    tech: ['Embedded C', 'IoT Sensors', 'Dashboard', 'Hardware'],
    image: '/assets/aram.png',
    video: 'https://www.youtube.com/watch?v=9F3uHl2y_LM',
    details: 'ARAM (Automated River Analysis Marine) is an autonomous, AI-integrated marine vehicle for real-time river monitoring in Bangladesh. It collects environmental data and detects floating waste and surface anomalies before sending results to a cloud dashboard.',
    highlights: ['GPS-guided autonomous navigation', 'pH, temperature, turbidity, and flow-rate sensing', 'Camera and AI-based waste detection', 'Cloud dashboard for historical analysis and decisions'],
  },
  {
    name: 'FinVision 3.0',
    category: '📱 AI-Powered Smart Financial Assistant',
    description: 'Scan receipts, log expenses by chat, predict money runout, and split bills with roommates.',
    tech: ['React Native', 'Expo', 'Tesseract.js', 'OCR'],
    image: '/assets/finvision.png',
    github: 'https://github.com/Team-Anton/Finvision-3.0',
    details: 'FinVision AI is a local-first finance app for Bangladeshi students and young professionals. It understands Bangla and Banglish expense entries, scans receipts, tracks budgets, and helps groups settle shared costs.',
    highlights: ['Bangla/Banglish AI expense assistant', 'Receipt scanning with OCR', 'Budget health score and spending analytics', 'Offline-first group expense splitting and data export'],
  },
  {
    name: 'FarmFriend',
    category: '💻 Full-Stack Smart Agriculture System',
    description: 'Smart farming platform for crop management, expense tracking, fertilizer scheduling & irrigation.',
    tech: ['ReactJS', 'Django', 'MySQL', 'Python'],
    image: '/assets/farmfriend.png',
    github: 'https://github.com/RefatHex/Farm_Friend',
    details: 'FarmFriend is a full-stack agricultural platform designed to empower farmers in Bangladesh. Its Bengali-friendly interface combines AI recommendations, weather data, marketplace services, storage, and agronomist consultations.',
    highlights: ['AI crop and fertilizer recommendations', 'Weather forecasts and agricultural alerts', 'Equipment rentals and crop storage bookings', 'Expert consultations, payments, and multi-role access'],
  },
  {
    name: 'EasyNeeds',
    category: '🛒 4th Runners-Up – UIU CSE Project Show Fall 2023',
    description: 'Integrated service platform connecting users with housing, food, healthcare, and education.',
    tech: ['Java', 'OOP Design', 'Service Platform', 'Backend'],
    image: '/assets/easyneeds.png',
    github: 'https://github.com/RefatHex/EasyNeedsAOOP',
    details: 'EasyNeeds is a service platform for finding homes and managing meal solutions in the capital city. It connects homeowners, tenants, and food consumers through one system.',
    highlights: ['Home listings, conditions, and rent negotiation', 'Food ordering and recurring meal plans', 'Secure database-backed accounts', 'Payments for food and rent advances'],
  },

  {
    name: 'Snake Game',
    category: '🎮 Java Game',
    description: 'Classic snake game with smooth gameplay, scoring system, and collision detection.',
    tech: ['Java', 'Game Logic', 'Desktop App', 'UI'],
    image: '/assets/snake.png',
    github: 'https://github.com/NabiulIslamNabil/SnakeGameJava',
    details: 'A classic Snake game built in Java Swing as a practice project. Move with the arrow keys, collect food for 10 points, and avoid the walls and your own body.',
    highlights: ['Keyboard-controlled movement', 'Food collection and scoring', 'Collision detection and game-over state'],
  },
  {
    name: 'Weather App',
    category: '🌦 API-Based Weather Utility',
    description: 'Real-time weather information with location-based forecasts and clean interactive output.',
    tech: ['JavaScript', 'Public APIs', 'Frontend', 'DOM'],
    image: '/assets/weather.png',
    github: 'https://github.com/NabiulIslamNabil/WeatherApp',
    details: 'A lightweight weather utility that retrieves real-time, location-based forecasts from public APIs and presents them through a clean interactive frontend.',
    highlights: ['Real-time weather lookup', 'Location-based forecasts', 'Interactive browser interface'],
  },
  {
    name: 'Bash Script Practice',
    category: '⌨ Operating Systems Practice',
    description: 'Classwork, lab, and exam-prep Bash scripts for process, file, and shell fundamentals.',
    tech: ['Bash', 'Linux', 'Ubuntu', 'OS'],
    image: '/assets/bash.png',
    github: 'https://github.com/NabiulIslamNabil/Bash-Script-Practice',
    details: 'A collection of classwork, lab, and exam-preparation Bash scripts focused on core Linux and operating-system concepts.',
    highlights: ['Process and file management', 'Shell fundamentals', 'Ubuntu command-line practice'],
  },
  {
    name: 'River Analysis Boat',
    category: '🚢 Electronics Course Project',
    description: 'A course hardware project focused on river condition analysis and practical sensing.',
    tech: ['Hardware', 'Sensors', 'Electronics', 'Prototype'],
    image: '/assets/boat.png',
    video: 'https://www.youtube.com/watch?v=f2o7E0ZSTR8',
    details: 'A practical electronics course prototype focused on analyzing river conditions with onboard sensors and hardware experimentation.',
    highlights: ['River-condition sensing', 'Electronics prototyping', 'Practical hardware integration'],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = React.useState<(typeof projects)[number] | null>(null);

  const openProject = (project: (typeof projects)[number]) => {
    setSelectedProject(project);
  };

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
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col gap-3 md:flex-row md:justify-between md:items-end mb-16">
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
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.name}`}
            onClick={() => openProject(project)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openProject(project);
              }
            }}
            style={{
              borderRadius: '8px',
            }}
          >
            <div
              className="h-48 overflow-hidden border-b bg-black/10 p-2 md:h-56"
              style={{ borderColor: 'rgba(223, 174, 76, 0.22)' }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-contain transition-all duration-500 ease-out group-hover:saturate-125 group-hover:contrast-110"
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
                    onClick={(event) => event.stopPropagation()}
                    className="inline-block font-mono font-bold text-xs uppercase tracking-[0.08em] px-4 py-2.5 rounded-full border transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    style={{
                      color: '#0A0908',
                      backgroundColor: '#DFAE4C',
                      borderColor: '#F7D477',
                      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 244, 190, 0.5)',
                    }}
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

      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent
            className="max-h-[90vh] overflow-y-auto border-[#DFAE4C]/60 bg-[#121617] p-0 text-[#F2E9E4] sm:max-w-2xl"
            closeButtonClassName="!text-red-500 !opacity-100 hover:!bg-red-500/15 hover:!text-red-400"
          >
            <div className="border-b border-[#DFAE4C]/25 bg-black/10 p-4 sm:p-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="max-h-[45vh] w-full object-contain"
              />
            </div>
            <DialogHeader className="gap-3 px-6 pb-6 pt-2 text-left sm:px-8 sm:pb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#DFAE4C]">
                {selectedProject.category}
              </span>
              <DialogTitle className="font-display text-3xl font-normal text-[#F2E9E4]">
                {selectedProject.name}
              </DialogTitle>
              <DialogDescription className="font-body text-sm leading-relaxed text-[#A99F95]">
                {selectedProject.description}
              </DialogDescription>
              <p className="font-body text-sm leading-relaxed text-[#CFC7C1]">
                {selectedProject.details}
              </p>
              <ul className="grid gap-2 pt-1 sm:grid-cols-2">
                {selectedProject.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-4 font-body text-xs leading-relaxed text-[#A99F95] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#DFAE4C]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#F2E9E4]/10 bg-[#F2E9E4]/[0.045] px-2.5 py-1 font-mono text-[10px] text-[#CFC7C1]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {(selectedProject.github || selectedProject.video) && (
                <a
                  href={selectedProject.video ?? selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block w-fit rounded-full border border-[#F7D477] bg-[#DFAE4C] px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-[#0A0908] transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  {selectedProject.video ? 'Watch on YouTube' : 'View on GitHub'}
                </a>
              )}
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
