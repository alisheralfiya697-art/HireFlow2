import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { RecruitmentAnalytics, AIInsightItem } from '../../types';
import { AnimatedCounter } from '../common/AnimatedCounter';

interface AnalyticsViewProps {
  analytics: RecruitmentAnalytics;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics }) => {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Talent Pipeline Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Recruitment Velocity & Analytics
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Data-driven pipeline health metrics, AI sourcing attribution, and real-time conversion insights.
        </p>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Applications</div>
          <div className="text-2xl font-extrabold text-white font-mono">
            <AnimatedCounter value={analytics.totalApplications} duration={850} />
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
            <span>+18% this month</span>
          </div>
        </div>

        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Qualified</div>
          <div className="text-2xl font-extrabold text-cyan-300 font-mono">
            <AnimatedCounter value={analytics.qualifiedCandidates} duration={900} />
          </div>
          <div className="text-[10px] text-slate-400 font-mono">43% pass rate</div>
        </div>

        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Avg Match Score</div>
          <div className="text-2xl font-extrabold text-indigo-300 font-mono">
            <AnimatedCounter value={analytics.averageMatchScore} decimals={1} suffix="%" duration={950} />
          </div>
          <div className="text-[10px] text-indigo-400 font-mono">High precision</div>
        </div>

        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Time to Shortlist</div>
          <div className="text-2xl font-extrabold text-white font-mono">
            <AnimatedCounter value={analytics.timeToShortlistDays} decimals={1} suffix="d" duration={900} />
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">-72% with AI</div>
        </div>

        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Time to Hire</div>
          <div className="text-2xl font-extrabold text-white font-mono">
            <AnimatedCounter value={analytics.timeToHireDays} decimals={1} suffix="d" duration={950} />
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">Industry avg: 45d</div>
        </div>

        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-4 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Interview Conv.</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            <AnimatedCounter value={analytics.interviewConversionRate} decimals={1} suffix="%" duration={1000} />
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Screen to Offer</div>
        </div>
      </div>

      {/* AI Hiring Insights - Core Requirement */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.09] p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              AI Hiring Insights (Derived from Actual Data)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Updated in Real-Time
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics.insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-xl bg-[#121622] border border-white/[0.06] space-y-2 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 uppercase tracking-wider">
                  {insight.category} Insight
                </span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {insight.metric}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {insight.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Hiring Funnel & Sourcing Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Funnel */}
        <div className="lg:col-span-7 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Hiring Funnel Progression
            </h3>
            <span className="text-xs text-slate-400 font-mono">144 Total Candidates</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.funnel.map((stage, idx) => (
              <div key={stage.stage} className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="font-mono text-white">
                    {stage.count} ({stage.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-white/[0.05] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Sources */}
        <div className="lg:col-span-5 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Candidate Sources & Quality
            </h3>
            <span className="text-xs text-slate-400 font-mono">Top Channels</span>
          </div>

          <div className="space-y-3 pt-2">
            {analytics.sources.map((src) => (
              <div
                key={src.source}
                className="p-3.5 rounded-xl bg-[#121622] border border-white/[0.06] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{src.source}</div>
                  <div className="text-[11px] text-slate-400">
                    {src.candidates} Total Ingestion
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400">
                    {src.hireRate}% Hire Rate
                  </div>
                  <span className="text-[10px] text-slate-500">Pipeline Yield</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
