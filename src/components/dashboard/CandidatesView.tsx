import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Sparkles, MessageSquareCode, Mail, ChevronRight, CheckCircle2, UserPlus } from 'lucide-react';
import { Candidate, Job, HiringStage } from '../../types';

interface CandidatesViewProps {
  candidates: Candidate[];
  jobs: Job[];
  onOpenMatchModal: (candidate: Candidate) => void;
  onGenerateInterview: (candidate: Candidate) => void;
  onDraftEmail: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, stage: HiringStage) => void;
  onNavigateToAnalyzer: () => void;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  candidates,
  jobs,
  onOpenMatchModal,
  onGenerateInterview,
  onDraftEmail,
  onStageChange,
  onNavigateToAnalyzer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [minScoreFilter, setMinScoreFilter] = useState(0);

  const filteredCandidates = candidates.filter((c) => {
    if (selectedRoleFilter !== 'all' && c.appliedJobId !== selectedRoleFilter) return false;
    if (selectedStageFilter !== 'all' && c.stage !== selectedStageFilter) return false;
    if (c.matchScore < minScoreFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchRole = c.role.toLowerCase().includes(q);
      const matchSkills = c.skills?.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchSkills) return false;
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Candidates Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {candidates.length} active talent profiles evaluated across neural ontology models.
          </p>
        </div>

        <button
          onClick={onNavigateToAnalyzer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Upload & Parse Resume</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, skill, or role..."
              className="w-full bg-[#121622] rounded-xl pl-9 pr-3 py-2 text-xs text-white border border-white/[0.06] focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Job Filter */}
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-[#121622] border border-white/[0.06] text-slate-300 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">All Roles</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>

          {/* Stage Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="bg-[#121622] border border-white/[0.06] text-slate-300 rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="New">New</option>
            <option value="Screening">Screening</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Hired">Hired</option>
          </select>

          {/* Score Threshold Filter */}
          <div className="flex items-center gap-1 bg-[#121622] px-2 py-1 rounded-xl border border-white/[0.06]">
            <span className="text-slate-400 text-[11px] pl-1">Min Match:</span>
            <button
              onClick={() => setMinScoreFilter(0)}
              className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                minScoreFilter === 0 ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setMinScoreFilter(90)}
              className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                minScoreFilter === 90 ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              &ge;90%
            </button>
            <button
              onClick={() => setMinScoreFilter(95)}
              className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors ${
                minScoreFilter === 95 ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              &ge;95%
            </button>
          </div>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          Showing {filteredCandidates.length} Candidates
        </div>
      </div>

      {/* Candidate List Table/Cards */}
      <div className="space-y-3">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-[#0D1019] rounded-2xl border border-white/[0.08] hover:border-indigo-500/40 p-4 md:p-5 transition-all shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-left"
          >
            {/* Candidate Info */}
            <div className="flex items-start sm:items-center gap-4 min-w-[280px]">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/[0.1] shrink-0"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    onClick={() => onOpenMatchModal(candidate)}
                    className="text-sm font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    {candidate.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    · {candidate.experienceYears === 0 ? 'Fresher (0y)' : `${candidate.experienceYears}y exp`}
                  </span>
                  {candidate.education && (
                    <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {candidate.education}
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300">
                  {candidate.role} · <span className="text-slate-400">{candidate.currentCompany}</span>
                </div>

                <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 pt-0.5">
                  {candidate.skills?.slice(0, 4).map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Explainable Match Score & Breakdown */}
            <div
              onClick={() => onOpenMatchModal(candidate)}
              className="bg-[#121622] rounded-xl p-3 border border-white/[0.06] hover:border-emerald-500/40 transition-colors cursor-pointer min-w-[220px]"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400 text-[11px]">Explainable Fit</span>
                <span className="font-mono font-extrabold text-emerald-400">
                  {candidate.matchScore}% Match
                </span>
              </div>

              {/* Mini Breakdown Visual */}
              <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-slate-400 pt-1">
                <div className="text-center">
                  <div className="w-full bg-white/[0.06] h-1 rounded-full mb-0.5">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${candidate.matchBreakdown?.technicalSkills || 90}%` }}
                    />
                  </div>
                  <span>Tech</span>
                </div>
                <div className="text-center">
                  <div className="w-full bg-white/[0.06] h-1 rounded-full mb-0.5">
                    <div
                      className="bg-cyan-500 h-full rounded-full"
                      style={{ width: `${candidate.matchBreakdown?.relevantExperience || 90}%` }}
                    />
                  </div>
                  <span>Exp</span>
                </div>
                <div className="text-center">
                  <div className="w-full bg-white/[0.06] h-1 rounded-full mb-0.5">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${candidate.matchBreakdown?.roleAlignment || 90}%` }}
                    />
                  </div>
                  <span>Role</span>
                </div>
                <div className="text-center">
                  <div className="w-full bg-white/[0.06] h-1 rounded-full mb-0.5">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${candidate.matchBreakdown?.projectRelevance || 90}%` }}
                    />
                  </div>
                  <span>Proj</span>
                </div>
              </div>
            </div>

            {/* Stage Selector & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                value={candidate.stage}
                onChange={(e) => onStageChange(candidate.id, e.target.value as HiringStage)}
                className="bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="New">Stage: New</option>
                <option value="Screening">Stage: Screening</option>
                <option value="Shortlisted">Stage: Shortlisted</option>
                <option value="Interview">Stage: Interview</option>
                <option value="Offer">Stage: Offer</option>
                <option value="Hired">Stage: Hired</option>
              </select>

              <button
                onClick={() => onOpenMatchModal(candidate)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Explain Fit</span>
              </button>

              <button
                onClick={() => onGenerateInterview(candidate)}
                className="px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Generate interview plan"
              >
                <MessageSquareCode className="w-3.5 h-3.5 text-indigo-400" />
                <span>Interview</span>
              </button>

              <button
                onClick={() => onDraftEmail(candidate)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Draft personalized email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>
          </div>
        ))}

        {filteredCandidates.length === 0 && (
          <div className="py-16 text-center text-slate-400 bg-[#0D1019] rounded-2xl border border-white/[0.06]">
            No candidates matched the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};
