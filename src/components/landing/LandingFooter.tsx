import React from 'react';
import { ShieldCheck, Lock, Award, HeartHandshake, ArrowRight, ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onStartHiring: () => void;
  onSignIn: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onStartHiring, onSignIn }) => {
  return (
    <footer id="security" className="bg-[#07080D] border-t border-white/[0.08] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Security & Ethical AI Commitment Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-[#0D101A] to-cyan-950/30 border border-white/[0.08] p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ethical AI Compliance Guarantee</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Recruitment intelligence anchored purely on verifiable merit.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                HireFlow AI strictly analyzes job-relevant capabilities: technical proficiencies, verifiable contributions, and role alignment.
                Our architecture completely strips protected characteristics (race, gender, age, religion, marital status, and disability) from the reasoning loop.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Lock className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">SOC 2 Type II Certified</div>
                  <div className="text-[11px] text-slate-400">End-to-end data encryption at rest and in transit</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Award className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-white">EU AI Act Conformant</div>
                  <div className="text-[11px] text-slate-400">High-risk AI recruitment safeguards strictly audited</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big CTA Before Footer Links */}
        <div className="text-center py-12 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to experience intelligent hiring orchestration?
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base">
            Join hundreds of forward-thinking engineering leaders who close top technical talent 4x faster with explainable AI.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={onStartHiring}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-600/30 border border-indigo-400/30 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Launch HireFlow Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSignIn}
              className="px-6 py-3.5 rounded-xl text-sm font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
            >
              Sign In to Workspace
            </button>
          </div>
        </div>

        {/* Quiet Editorial Footer */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">HireFlow AI</span>
            <span>·</span>
            <span>© 2026 HireFlow Systems Inc. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Security Whitepaper
            </span>
            <span className="hover:text-slate-200 transition-colors cursor-pointer">
              Bias Audit Report
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
