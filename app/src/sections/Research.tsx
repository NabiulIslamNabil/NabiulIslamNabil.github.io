import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import TerminalReveal from '../components/TerminalReveal';

const research = [
  {
    title: 'Where Trust Breaks',
    category: 'ICEEICT 2027 — Submitted, Under Review',
    description:
      'A comparative framework for software supply-chain compromises across the software lifecycle.',
    details:
      'This research categorizes real-world software supply-chain compromises by the lifecycle stages and trust properties they compromise, helping compare attacks through a consistent security framework.',
    highlights: ['Lifecycle-based compromise taxonomy', 'Trust-property analysis', 'Comparative framework for real-world attacks'],
    tech: ['Software Security', 'Threat Modeling', 'Comparative Analysis'],
  },
  {
    title: 'PackagePolice',
    category: 'Final-Year Design Project — Ongoing',
    description:
      'A leakage-controlled, zero-execution framework for pre-installation risk assessment of npm and PyPI packages.',
    details:
      'PackagePolice addresses acquisition-provenance bias and data leakage while combining static program analysis with machine learning to identify malicious packages before installation.',
    highlights: ['AST-based static analysis', 'CodeBERT embeddings and XGBoost', 'SHAP-based explanations', 'Group-aware validation and leakage audits'],
    tech: ['Python', 'AST', 'CodeBERT', 'XGBoost', 'SHAP'],
  },
  {
    title: 'Carbon-Aware Edge Intelligence',
    category: 'Manuscript in Preparation — Ongoing',
    description:
      'A multi-objective scheduling framework for sustainable water-quality monitoring.',
    details:
      'This work develops a simulation-based scheduling framework that coordinates monitoring tasks under energy, carbon, battery, and reliability constraints for edge-enabled environmental sensing.',
    highlights: ['Energy and carbon-aware scheduling', 'Battery-constrained edge intelligence', 'Monitoring reliability optimization'],
    tech: ['Edge Computing', 'Sustainability', 'Optimization', 'IoT'],
  },
  {
    title: 'Smartphone-Based Relative Illuminance Estimation',
    category: 'Digital Image Processing — Ongoing',
    description:
      'Evaluating relative illuminance estimation across unfamiliar surface materials from a single smartphone image.',
    details:
      'Using an existing lux-meter-verified dataset, this research compares traditional brightness ratios, gamma correction, and lightweight machine learning methods to predict lux ratios at five surface positions. The central goal is to measure robustness on unseen materials and lighting sessions.',
    highlights: ['OpenCV image-processing pipeline', 'Brightness ratios and gamma correction', 'ExtraTrees prediction model', 'Material- and session-aware validation'],
    tech: ['Python', 'OpenCV', 'ExtraTrees', 'Digital Image Processing'],
  },
  {
    title: 'Paddy Rice Yield Prediction & Smart Irrigation',
    category: 'Machine Learning Term Paper — Completed',
    description:
      'Applying remote sensing and machine learning for paddy rice yield prediction and smart irrigation recommendations in Bangladesh.',
    details:
      'This course-based study investigated how remote-sensing data and machine learning can support agricultural decision-making, with a focus on rice yield estimation and irrigation advisory.',
    highlights: ['Remote-sensing feature analysis', 'Paddy rice yield prediction', 'Smart irrigation recommendations'],
    tech: ['Remote Sensing', 'Agricultural AI', 'Machine Learning'],
  },
  {
    title: 'Human-Computer Interaction (HCI)',
    category: 'HCI Term Paper — Completed',
    description:
      'Exploring human-centered design, user research, usability, and technology-driven solutions for women’s safety.',
    details:
      'This course-based research explored how HCI methods can identify user needs and guide the design of more usable, inclusive, and safety-oriented technology.',
    highlights: ['Human-centered design', 'User research and usability', 'Technology for women’s safety'],
    tech: ['HCI', 'UX Research', 'Usability'],
  },
];

export default function Research() {
  const [selectedResearch, setSelectedResearch] = React.useState<(typeof research)[number] | null>(null);

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
                Research / 01—06
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
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${item.title}`}
                  onClick={() => setSelectedResearch(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedResearch(item);
                    }
                  }}
                  className="group relative cursor-pointer transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DFAE4C]"
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
                  <span className="float-right font-mono text-[10px] uppercase tracking-[0.08em]" style={{ color: '#8A817C' }}>
                    View details
                  </span>
                  <span className="block font-mono mt-4 text-[10px] uppercase tracking-wider" style={{ color: '#DFAE4C' }}>
                    {item.category}
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

          <Dialog open={selectedResearch !== null} onOpenChange={(open) => !open && setSelectedResearch(null)}>
            {selectedResearch && (
              <DialogContent
                className="max-h-[90vh] overflow-y-auto border-[#DFAE4C]/60 bg-[#121617] text-[#F2E9E4] sm:max-w-2xl"
                closeButtonClassName="!text-red-500 !opacity-100 hover:!bg-red-500/15 hover:!text-red-400"
              >
                <DialogHeader className="gap-3 text-left">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#DFAE4C]">
                    {selectedResearch.category}
                  </span>
                  <DialogTitle className="font-display text-3xl font-normal text-[#F2E9E4]">
                    {selectedResearch.title}
                  </DialogTitle>
                  <DialogDescription className="font-body text-sm leading-relaxed text-[#A99F95]">
                    {selectedResearch.description}
                  </DialogDescription>
                  <p className="font-body text-sm leading-relaxed text-[#CFC7C1]">
                    {selectedResearch.details}
                  </p>
                  <ul className="grid gap-2 pt-1 sm:grid-cols-2">
                    {selectedResearch.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="relative pl-4 font-body text-xs leading-relaxed text-[#A99F95] before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#DFAE4C]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedResearch.tech.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[#F2E9E4]/10 bg-[#F2E9E4]/[0.045] px-2.5 py-1 font-mono text-[10px] text-[#CFC7C1]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </DialogHeader>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </div>
    </section>
  );
}
