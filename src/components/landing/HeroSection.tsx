import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, FileText, UserCheck, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface HeroSectionProps {
  onStartHiring: () => void;
  onExploreAI: () => void;
  onUploadResume?: () => void;
}

const FLOW_STEPS = [
  { id: 'step-job', title: 'Job Requirements', subtitle: 'Distributed React 19 Stack', icon: FileText, badge: 'Role Defined' },
  { id: 'step-ai', title: 'AI Analysis', subtitle: 'Semantic Vector Parsing', icon: Sparkles, badge: 'Neural Processing' },
  { id: 'step-cand', title: 'Candidate Intelligence', subtitle: 'Verifiable Impact History', icon: UserCheck, badge: 'Extracted' },
  { id: 'step-match', title: 'Match Score', subtitle: '94% Explainable Fit', icon: CheckCircle2, badge: 'Bias-Free' },
  { id: 'step-interview', title: 'Interview Studio', subtitle: 'Dynamic Technical Rubric', icon: MessageSquare, badge: 'Generated' },
  { id: 'step-hire', title: 'Hire', subtitle: 'Offer Approved & Accepted', icon: ShieldCheck, badge: 'Concluded' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartHiring,
  onExploreAI,
  onUploadResume,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % FLOW_STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-cyan-500/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-300 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>The 2026 Autonomous Recruitment Platform</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Explainable AI & High Velocity</span>
          </div>
        </motion.div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Hiring, intelligently orchestrated.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            HireFlow AI analyzes candidates, explains why they match, and automates the workflows that move hiring forward.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartHiring}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <span>Recruiter Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {onUploadResume && (
              <button
                onClick={onUploadResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-600/25 border border-emerald-400/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-200" />
                <span>Upload Resume & Apply</span>
              </button>
            )}
            <button
              onClick={onExploreAI}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all hover:text-white cursor-pointer"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore AI Intelligence</span>
            </button>
          </div>
        </motion.div>

        {/* Animated Product Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
        >
          {/* Main Visual Board */}
          <div className="relative rounded-2xl bg-[#0D1017] border border-white/[0.09] shadow-2xl shadow-black/80 overflow-hidden p-6 md:p-8">
            {/* Top Bar of the Mock Interface */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-8">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-slate-400">
                  orchestrator.hireflow.ai/pipeline-stream
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Pipeline Ingestion</span>
                <span>·</span>
                <span className="font-mono text-slate-300">Latency: 42ms</span>
              </div>
            </div>

            {/* Continuous Flow Pipeline Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
              {FLOW_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = activeStepIndex === idx;
                const isPassed = idx < activeStepIndex;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`relative p-4 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                      isActive
                        ? 'bg-indigo-950/40 border border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                        : isPassed
                        ? 'bg-white/[0.02] border border-emerald-500/20 text-slate-300'
                        : 'bg-white/[0.01] border border-white/[0.05] text-slate-400 hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isActive
                            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/40'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/[0.04] text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-semibold tracking-tight transition-colors line-clamp-1 ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {step.subtitle}
                    </p>

                    {/* Progress Indicator Line */}
                    <div className="mt-3 w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-400 to-cyan-400 w-full'
                            : isPassed
                            ? 'bg-emerald-400/80 w-full'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Step Real-Time Demonstration Display */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono">
                  <span>STAGE {activeStepIndex + 1} OF 6</span>
                  <span>·</span>
                  <span>{FLOW_STEPS[activeStepIndex].title}</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {activeStepIndex === 0 && 'Instant Role Taxonomy & Neural Skill Extraction'}
                  {activeStepIndex === 1 && 'Deep Multimodal Resume & Portfolio Vectorization'}
                  {activeStepIndex === 2 && 'Candidate Experience Verification & Graph Linking'}
                  {activeStepIndex === 3 && 'Explainable Match Scoring with Zero Demographic Bias'}
                  {activeStepIndex === 4 && 'Autonomous Technical Interview Rubric Generation'}
                  {activeStepIndex === 5 && 'Recruiter-Approved Offer & Seamless Onboarding'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeStepIndex === 0 && 'Define open roles in natural language. HireFlow AI maps out required architectures, seniority expectations, and tech stack boundaries in seconds.'}
                  {activeStepIndex === 1 && 'Resumes, GitHub repositories, and work portfolios are parsed with Gemini 3.8. Verifiable technical accomplishments are separated from buzzwords.'}
                  {activeStepIndex === 2 && 'Candidates are connected to dynamic recruitment knowledge graphs, isolating relevant real-world distributed systems impact.'}
                  {activeStepIndex === 3 && 'Never settle for a black-box percentage. Recruiters inspect technical skills, experience alignment, project synergy, and objective gaps.'}
                  {activeStepIndex === 4 && 'Generate role-tailored technical problem sets, system design dilemmas, and behavioral rubrics calibrated to the candidate’s exact background.'}
                  {activeStepIndex === 5 && 'Human-in-the-loop recruiter authorization moves candidates across final milestones with automated, personalized outreach.'}
                </p>
              </div>

              {/* Live Preview Card */}
              <div className="bg-[#121622] rounded-xl p-4 border border-white/[0.08] shadow-inner">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Match Diagnostic</span>
                  <span className="text-emerald-400 font-mono font-medium flex items-center">
                    <AnimatedCounter value={94} duration={900} suffix="% Role Fit" />
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Technical Architecture</span>
                    <AnimatedCounter value={96} duration={950} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '96%' }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="bg-indigo-500 h-full"
                    />
                  </div>
                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>Production Experience</span>
                    <AnimatedCounter value={92} duration={1000} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 0.95, ease: 'easeOut' }}
                      className="bg-cyan-500 h-full"
                    />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Ethical Audit:</span>
                  <span className="text-[11px] text-emerald-400 font-medium">Zero Bias Passed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating AI Insight Card 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="hidden sm:flex absolute -top-8 -left-6 md:-left-12 bg-[#0E121B]/90 backdrop-blur-md border border-indigo-500/30 shadow-xl shadow-black/60 rounded-xl p-3.5 items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">8 strong candidates discovered</p>
              <p className="text-[10px] text-slate-400">Sr. Full-Stack Engineer pool matched</p>
            </div>
          </motion.div>

          {/* Floating AI Insight Card 2 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="hidden sm:flex absolute -bottom-6 -right-4 md:-right-8 bg-[#0E121B]/90 backdrop-blur-md border border-cyan-500/30 shadow-xl shadow-black/60 rounded-xl p-3.5 items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">92% role match</p>
              <p className="text-[10px] text-slate-400">Technical breakdown verified</p>
            </div>
          </motion.div>

          {/* Floating AI Insight Card 3 */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="hidden lg:flex absolute top-1/2 -right-10 bg-[#0E121B]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl shadow-black/60 rounded-xl p-3.5 items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Interview plan generated</p>
              <p className="text-[10px] text-slate-400">5 custom rubric questions ready</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
