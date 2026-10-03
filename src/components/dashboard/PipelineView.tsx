import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Candidate, HiringStage, Job } from '../../types';
import { ChevronRight, Sparkles, Filter, ArrowRight, UserCheck, MessageSquareCode } from 'lucide-react';

interface PipelineViewProps {
  candidates: Candidate[];
  jobs: Job[];
  onStageChange: (candidateId: string, newStage: HiringStage) => void;
  onOpenMatchModal: (candidate: Candidate) => void;
  onGenerateInterview: (candidate: Candidate) => void;
}

const STAGES: HiringStage[] = [
  'New',
  'Screening',
  'Shortlisted',
  'Interview',
  'Offer',
  'Hired',
];

const STAGE_COLORS: Record<HiringStage, { border: string; text: string; bg: string }> = {
  New: { border: 'border-slate-500/30', text: 'text-slate-400', bg: 'bg-slate-500/10' },
  Screening: { border: 'border-cyan-500/30', text: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  Shortlisted: { border: 'border-indigo-500/30', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  Interview: { border: 'border-amber-500/30', text: 'text-amber-400', bg: 'bg-amber-500/10' },
  Offer: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  Hired: { border: 'border-emerald-500/30', text: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

export const PipelineView: React.FC<PipelineViewProps> = ({
  candidates,
  jobs,
  onStageChange,
  onOpenMatchModal,
  onGenerateInterview,
}) => {
  const [selectedJobFilter, setSelectedJobFilter] = useState<string>('all');

  const filteredCandidates = candidates.filter((c) => {
    if (selectedJobFilter === 'all') return true;
    return c.appliedJobId === selectedJobFilter;
  });

  const getNextStage = (current: HiringStage): HiringStage | null => {
    const idx = STAGES.indexOf(current);
    if (idx >= 0 && idx < STAGES.length - 1) {
      return STAGES[idx + 1];
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header & Role Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Recruitment Pipeline Kanban
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time candidate workflow across 6 structured evaluation stages.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 bg-[#121622] p-1.5 rounded-xl border border-white/[0.08]">
          <Filter className="w-3.5 h-3.5 text-slate-400 pl-1" />
          <span className="text-xs text-slate-400">Role:</span>
          <select
            value={selectedJobFilter}
            onChange={(e) => setSelectedJobFilter(e.target.value)}
            className="bg-[#0A0D14] border border-white/[0.08] text-xs text-white rounded-lg px-3 py-1 focus:outline-none"
          >
            <option value="all">All Active Positions</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Board Horizontal Scrolling Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
          const style = STAGE_COLORS[stage];

          return (
            <div
              key={stage}
              className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 flex flex-col min-h-[550px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${style.bg} ${style.border}`} />
                  <span className="text-xs font-bold text-white tracking-tight">
                    {stage}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded-md bg-white/[0.04]">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-1">
                {stageCandidates.map((candidate) => {
                  const next = getNextStage(candidate.stage);

                  return (
                    <motion.div
                      layout
                      key={candidate.id}
                      className="bg-[#121622] rounded-xl p-3.5 border border-white/[0.07] hover:border-indigo-500/40 shadow-sm transition-all text-left space-y-3 group"
                    >
                      {/* Top: Avatar, Name & Match Score */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={candidate.avatar}
                            alt={candidate.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/[0.1]"
                          />
                          <div>
                            <div
                              onClick={() => onOpenMatchModal(candidate)}
                              className="text-xs font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                            >
                              {candidate.name}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                              {candidate.education ? `${candidate.education}` : candidate.currentCompany}
                              <span className="text-slate-500 font-mono"> · {candidate.experienceYears === 0 ? '0y' : `${candidate.experienceYears}y`}</span>
                            </div>
                          </div>
                        </div>

                        {/* Match Pill */}
                        <div
                          onClick={() => onOpenMatchModal(candidate)}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold cursor-pointer"
                        >
                          {candidate.matchScore}%
                        </div>
                      </div>

                      {/* Role & Experience */}
                      <div className="text-[11px] text-slate-300 line-clamp-1">
                        {candidate.role}
                      </div>

                      {/* Top Skills */}
                      <div className="flex flex-wrap gap-1 text-[9px] text-slate-400">
                        {candidate.skills?.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Action Row */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-1 text-[11px]">
                        <button
                          onClick={() => onOpenMatchModal(candidate)}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Explain Fit</span>
                        </button>

                        {next && (
                          <button
                            onClick={() => onStageChange(candidate.id, next)}
                            className="px-2 py-1 rounded-md bg-white/[0.04] hover:bg-indigo-600 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                            title={`Move to ${next}`}
                          >
                            <span>Advance</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {stageCandidates.length === 0 && (
                  <div className="py-8 text-center text-slate-500 text-xs italic">
                    No candidates in {stage}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
