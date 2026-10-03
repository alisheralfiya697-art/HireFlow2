import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FilePlus2,
  BrainCircuit,
  FileSearch,
  CheckCircle2,
  Users,
  MessageSquareCode,
  Mail,
  Award,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

const STORY_STEPS = [
  {
    step: '01',
    title: 'Create the role',
    headline: 'Define architectural requirements in minutes',
    description:
      'Input natural language expectations or paste existing job briefs. HireFlow AI structures required technical ontologies, seniority benchmarks, and team stack invariants.',
    icon: FilePlus2,
    preview: {
      tag: 'Role Specification',
      title: 'Senior Distributed Systems & React Engineer',
      items: [
        'React 19 & modern concurrent features',
        'High-concurrency Node.js / Go microservices',
        'Zero-downtime PostgreSQL migrations',
        'Sub-100ms latency guarantees',
      ],
      badge: 'Validated by AI Architect',
    },
  },
  {
    step: '02',
    title: 'Understand requirements',
    headline: 'Translating job descriptions into neural rubrics',
    description:
      'Rather than relying on naive keyword matching, HireFlow decomposes job criteria into semantic vectors, distinguishing core architectural skills from preferred accessories.',
    icon: BrainCircuit,
    preview: {
      tag: 'Requirement Decomposition',
      title: 'Neural Weight Distribution',
      items: [
        'Core Architecture (Weight: 35%)',
        'Demonstrated Production Tenure (Weight: 25%)',
        'Domain & Role Alignment (Weight: 20%)',
        'Verified Project Impact (Weight: 20%)',
      ],
      badge: 'Bipartite Ontology Built',
    },
  },
  {
    step: '03',
    title: 'Analyze candidates',
    headline: 'Multimodal resume & portfolio parsing',
    description:
      'Upload PDFs, DOCX, or portfolio links. Gemini 3.8 extracts verifiable contributions, technology recency, and leadership impact without hallucinating credentials.',
    icon: FileSearch,
    preview: {
      tag: 'Resume Intelligence',
      title: 'Marcus Vance — Resume Ingestion',
      items: [
        '7.2 years verified full-stack tenure',
        'Built real-time collaborative state canvas',
        'Scaled Kafka pipeline to 45M daily events',
        'Reduced database p99 query latency by 64%',
      ],
      badge: '100% Parsed Without Drift',
    },
  },
  {
    step: '04',
    title: 'Explain candidate fit',
    headline: 'Transparent breakdown, zero black-box percentages',
    description:
      'Never wonder why a candidate scored 94%. HireFlow details technical skills (96%), experience (92%), role alignment (95%), and project relevance (93%) alongside objective gaps.',
    icon: CheckCircle2,
    preview: {
      tag: 'Explainable Fit Report',
      title: 'Overall Role Match: 94%',
      items: [
        '✓ Direct alignment with distributed event loops',
        '✓ Deep React 19 reconciliation mastery',
        '✓ Documented mentoring of mid-level engineers',
        '△ Primary cloud is AWS rather than GCP',
      ],
      badge: 'Audit Trail Stored',
    },
  },
  {
    step: '05',
    title: 'Shortlist',
    headline: 'Intelligent ranking with human-in-the-loop governance',
    description:
      'Autonomous agents stage the top candidates into a curated shortlist batch. Recruiters retain sovereign approval authority over pipeline movements.',
    icon: Users,
    preview: {
      tag: 'Shortlist Staging',
      title: 'Top 4 Candidates Recommended',
      items: [
        'Marcus Vance (94% Match) — Ready for Deep Dive',
        'Dr. Aris Thorne (96% Match) — AI Specialist',
        'Kavita Patel (95% Match) — Cloud Security Lead',
        'Nadia Solis (94% Match) — Motion Architect',
      ],
      badge: 'Recruiter Authorization Pending',
    },
  },
  {
    step: '06',
    title: 'Generate interview',
    headline: 'AI Interview Studio produces tailored rubrics',
    description:
      'Eliminate generic interview questions. HireFlow generates deep technical challenges and behavioral probes tailored specifically to each candidate’s past projects.',
    icon: MessageSquareCode,
    preview: {
      tag: 'Interview Studio Output',
      title: 'Technical Deep Dive: Marcus Vance',
      items: [
        'Question: "Architect real-time conflict-free document sync..."',
        'Criteria: Evaluates CRDT trade-offs vs WebSockets',
        'Behavioral: Handling sudden scope pivots under latency SLAs',
        'Scoring Rubric: 1 to 5 scale with explicit guidelines',
      ],
      badge: 'Custom Rubric Prepared',
    },
  },
  {
    step: '07',
    title: 'Automate communication',
    headline: 'Personalized outreach calibrated for maximum conversion',
    description:
      'Generate personalized interview invitations, feedback reminders, and offer letters highlighting exact project synergy. Recruiters review and approve every message before delivery.',
    icon: Mail,
    preview: {
      tag: 'AI Communication Studio',
      title: 'Personalized Shortlist Invitation',
      items: [
        'Recipient: Marcus Vance (marcus.vance@engineered.io)',
        'Resonance: Mentions real-time state sync engine',
        'Tone: Professional, high-respect, action-oriented',
        'Status: Approved by Lead Talent Partner',
      ],
      badge: 'Human Recruiter Verified',
    },
  },
  {
    step: '08',
    title: 'Hire',
    headline: 'Close candidates 4x faster with verified confidence',
    description:
      'A seamless conclusion from application to signed offer letter. Every decision backed by transparent evaluation trails, compliance audits, and analytics.',
    icon: Award,
    preview: {
      tag: 'Final Outcome',
      title: 'Offer Accepted & Talent Secured',
      items: [
        'Time to hire reduced from 45 days to 18 days',
        'Zero protected demographic attributes accessed',
        'Candidate rating: 9.8 / 10 interview satisfaction',
        'Full audit trail exported for compliance',
      ],
      badge: 'Hiring Goal Accomplished',
    },
  },
];

export const ScrollStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStory = STORY_STEPS[activeStepIndex];
  const Icon = activeStory.icon;

  return (
    <section id="workflow" className="py-28 bg-[#090B10] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-300 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The End-to-End Orchestration Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            From hundreds of resumes to one clear decision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Follow the 8 progressive stages of intelligent hiring orchestration designed to eliminate recruiter fatigue and eradicate hiring bias.
          </p>
        </div>

        {/* Interactive Sticky / Stepper Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Step Navigation List */}
          <div className="lg:col-span-5 space-y-2">
            {STORY_STEPS.map((s, idx) => {
              const isSelected = activeStepIndex === idx;
              const StepIcon = s.icon;

              return (
                <div
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-xl transition-all duration-300 cursor-pointer flex items-start gap-4 border ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                      : 'bg-white/[0.02] border-transparent hover:bg-white/[0.04] hover:border-white/[0.06]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                      isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-indigo-400 font-semibold">
                        {s.step}
                      </span>
                      <span className="text-slate-500 text-xs">/</span>
                      <h4
                        className={`text-sm font-semibold tracking-tight transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-300'
                        }`}
                      >
                        {s.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {s.headline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Transformation Card (Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0E121B] rounded-2xl border border-white/[0.09] p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        Stage {activeStory.step} of 08
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {activeStory.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.08]">
                    {activeStory.preview.badge}
                  </span>
                </div>

                {/* Detailed Description */}
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-indigo-200 mb-2">
                    {activeStory.headline}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeStory.description}
                  </p>
                </div>

                {/* Visual Stage Interactive Card Mock */}
                <div className="bg-[#121622] rounded-xl p-5 border border-white/[0.07] shadow-inner space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/[0.06]">
                    <span className="font-mono text-indigo-400">{activeStory.preview.tag}</span>
                    <span className="text-slate-400 font-mono text-[11px]">Simulated Output</span>
                  </div>

                  <div className="text-sm font-semibold text-white">
                    {activeStory.preview.title}
                  </div>

                  <div className="space-y-2 pt-1">
                    {activeStory.preview.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Controls at Bottom */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors cursor-pointer"
                  >
                    ← Previous Stage
                  </button>

                  <div className="flex items-center gap-1.5">
                    {STORY_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeStepIndex === i
                            ? 'w-6 bg-indigo-500'
                            : 'w-1.5 bg-white/[0.1]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    disabled={activeStepIndex === STORY_STEPS.length - 1}
                    onClick={() =>
                      setActiveStepIndex((prev) =>
                        Math.min(STORY_STEPS.length - 1, prev + 1)
                      )
                    }
                    className="text-xs font-medium text-indigo-400 hover:text-indigo-300 disabled:opacity-30 disabled:hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
