import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  MessageSquareCode,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Bot,
  Activity,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { Job, Candidate, RecruitmentAnalytics } from '../../types';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface OverviewViewProps {
  jobs: Job[];
  candidates: Candidate[];
  analytics: RecruitmentAnalytics;
  onNavigateTab: (tab: any) => void;
  onOpenMatchModal: (candidate: Candidate) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  jobs,
  candidates,
  analytics,
  onNavigateTab,
  onOpenMatchModal,
}) => {
  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;
  const shortlistedCount = candidates.filter((c) => c.stage === 'Shortlisted').length;
  const interviewCount = candidates.filter((c) => c.stage === 'Interview').length;
  const offerCount = candidates.filter((c) => c.stage === 'Offer').length;
  const hiredCount = candidates.filter((c) => c.stage === 'Hired').length;

  // Metric Cards
  const METRIC_STATS = [
    { label: 'Active Jobs', value: activeJobsCount, icon: Briefcase, color: 'text-blue-400', tab: 'jobs' },
    { label: 'Candidates', value: candidates.length, icon: Users, color: 'text-indigo-400', tab: 'candidates' },
    { label: 'Shortlisted', value: shortlistedCount, icon: Sparkles, color: 'text-cyan-400', tab: 'pipeline' },
    { label: 'Interviews', value: interviewCount, icon: MessageSquareCode, color: 'text-amber-400', tab: 'interview-studio' },
    { label: 'Offers', value: offerCount, icon: Award, color: 'text-purple-400', tab: 'pipeline' },
    { label: 'Hired', value: hiredCount, icon: CheckCircle2, color: 'text-emerald-400', tab: 'pipeline' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0D1019] to-cyan-950/30 border border-white/[0.08] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Autonomous Recruitment Engine Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, Elena
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            4 candidates are staged and waiting for your review. Sourcing velocity is up 38% with zero compliance flags detected.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigateTab('ai-recruiter')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Recruiter Agent</span>
          </button>
        </div>
      </div>

      {/* 6 Key Metric Cards with Animated Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {METRIC_STATS.map((stat, idx) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onNavigateTab(stat.tab)}
              className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 flex flex-col justify-between hover:border-indigo-500/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </div>
              <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
                <AnimatedCounter value={stat.value} duration={800} />
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1 group-hover:text-indigo-300 transition-colors">
                <span>View</span>
                <ChevronRight className="w-2.5 h-2.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Hiring Insights & Hiring Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: AI Hiring Insights (Derived from actual data) */}
        <div className="lg:col-span-7 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                AI Hiring Insights
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {analytics.insights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-3.5 rounded-xl bg-[#121622] border border-white/[0.06] text-xs space-y-1.5 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-300 uppercase">
                    {insight.category} Trend
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-[11px]">
                    {insight.metric}
                  </span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Hiring Funnel Progression */}
        <div className="lg:col-span-5 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                Active Funnel
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Avg Score: {analytics.averageMatchScore}%
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {analytics.funnel.map((st) => (
              <div key={st.stage} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>{st.stage}</span>
                  <span className="font-mono text-white">
                    {st.count} ({st.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${st.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent High-Scoring Candidates */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              High-Synergy Candidates Ready for Review
            </h3>
            <p className="text-xs text-slate-400">
              Candidates with verified explainable match scores over 90%.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('candidates')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({candidates.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {candidates.slice(0, 4).map((cand) => (
            <div
              key={cand.id}
              onClick={() => onOpenMatchModal(cand)}
              className="bg-[#121622] rounded-xl p-4 border border-white/[0.06] hover:border-indigo-500/40 transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={cand.avatar}
                  alt={cand.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/[0.1]"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {cand.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {cand.currentCompany}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.04]">
                <span className="text-[11px] text-slate-400">{cand.stage}</span>
                <span className="font-mono font-extrabold text-emerald-400 text-xs">
                  {cand.matchScore}% Fit
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
