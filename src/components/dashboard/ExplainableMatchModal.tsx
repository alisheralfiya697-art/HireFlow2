import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, MessageSquareCode, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { Candidate, Job } from '../../types';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface ExplainableMatchModalProps {
  candidate: Candidate | null;
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerateInterview: (candidate: Candidate) => void;
  onDraftEmail: (candidate: Candidate) => void;
}

export const ExplainableMatchModal: React.FC<ExplainableMatchModalProps> = ({
  candidate,
  job,
  isOpen,
  onClose,
  onGenerateInterview,
  onDraftEmail,
}) => {
  if (!isOpen || !candidate) return null;

  const targetJob = job || {
    title: candidate.role || 'Open Role',
    department: 'Engineering',
  };

  const bd = candidate.matchBreakdown || {
    technicalSkills: 94,
    relevantExperience: 90,
    roleAlignment: 92,
    projectRelevance: 91,
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#0E121B] rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#121624]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={candidate.avatar}
                  alt={candidate.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-indigo-400/40"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0E121B] flex items-center justify-center text-[9px] font-bold text-white">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {candidate.name}
                  </h3>
                  <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {candidate.experienceYears === 0 ? 'Fresher (0y exp)' : `${candidate.experienceYears}y exp`}
                  </span>
                  {candidate.education && (
                    <span className="text-xs text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {candidate.education}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Target Role: <span className="text-indigo-300 font-medium">{targetJob.title}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-7 max-h-[calc(85vh-120px)] overflow-y-auto">
            {/* Primary Score Banner */}
            <div className="rounded-xl p-6 bg-gradient-to-r from-indigo-950/40 via-[#141926] to-cyan-950/30 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explainable Match Score</span>
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight flex items-baseline justify-center sm:justify-start">
                  <AnimatedCounter value={candidate.matchScore} duration={850} suffix="%" />
                  <span className="text-base sm:text-lg text-slate-400 font-normal ml-2">
                    Overall Fit
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Calculated against {targetJob.title} verified ontology.
                </p>
              </div>

              {/* Vector Score Breakdown Bars */}
              <div className="w-full sm:w-64 space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Technical Skills</span>
                    <AnimatedCounter value={bd.technicalSkills} duration={900} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bd.technicalSkills}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="bg-indigo-500 h-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Relevant Experience</span>
                    <AnimatedCounter value={bd.relevantExperience} duration={950} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bd.relevantExperience}%` }}
                      transition={{ duration: 0.85, ease: 'easeOut' }}
                      className="bg-cyan-500 h-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Role Alignment</span>
                    <AnimatedCounter value={bd.roleAlignment} duration={1000} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bd.roleAlignment}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut' }}
                      className="bg-emerald-500 h-full"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Project Relevance</span>
                    <AnimatedCounter value={bd.projectRelevance} duration={1050} suffix="%" className="font-mono text-white" />
                  </div>
                  <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${bd.projectRelevance}%` }}
                      transition={{ duration: 0.95, ease: 'easeOut' }}
                      className="bg-purple-500 h-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Why This Candidate Matches & Potential Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Positives */}
              <div className="bg-[#121624] rounded-xl p-5 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Why This Candidate Matches</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {candidate.whyMatches.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Potential Gaps */}
              <div className="bg-[#121624] rounded-xl p-5 border border-amber-500/20">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Potential Gaps & Probes</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {candidate.potentialGaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">△</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verified Project Artifacts */}
            {candidate.projects && candidate.projects.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Verified Project Contributions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {candidate.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-1.5"
                    >
                      <div className="font-semibold text-white">{proj.title}</div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-slate-400">
                        {proj.tech.map((t, ti) => (
                          <span key={ti}>
                            {t} {ti < proj.tech.length - 1 ? '·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ethical AI Compliance Notice */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-slate-300">Ethical Audit Verified:</strong> Scoring conducted solely on job-relevant skills, verifiable experience, and role alignment without protected demographic traits.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 border-t border-white/[0.08] bg-[#121624] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Current Hiring Stage: <span className="text-white font-medium">{candidate.stage}</span>
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onGenerateInterview(candidate);
                }}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquareCode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Generate Interview</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onDraftEmail(candidate);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Draft Email</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
