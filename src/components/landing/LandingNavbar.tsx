import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Layers, Cpu, BarChart3 } from 'lucide-react';

interface LandingNavbarProps {
  onStartHiring: () => void;
  onSignIn: () => void;
  onNavigateSection: (sectionId: string) => void;
  onUploadResume?: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onStartHiring,
  onSignIn,
  onNavigateSection,
  onUploadResume,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3.5 bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/[0.07] shadow-2xl shadow-black/40'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35 transition-all">
            <div className="w-full h-full bg-[#0A0D14] rounded-[11px] flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-300 to-cyan-300 font-extrabold text-base tracking-tight">
                HF
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                HireFlow
              </span>
              <span className="font-semibold text-xs tracking-wider uppercase text-cyan-400 font-mono">
                AI
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
              Recruitment Operating System
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateSection('intelligence-graph')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            AI Intelligence
          </button>
          <button
            onClick={() => onNavigateSection('workflow')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Workflow
          </button>
          <button
            onClick={() => onNavigateSection('resume-intelligence')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Resume Engine
          </button>
          <button
            onClick={() => onNavigateSection('analytics')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Analytics
          </button>
          <button
            onClick={() => onNavigateSection('security')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Security & Ethics
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {onUploadResume && (
            <button
              onClick={onUploadResume}
              className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer hidden sm:flex items-center gap-1.5"
            >
              <span>Upload Resume</span>
            </button>
          )}
          <button
            onClick={onSignIn}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-2 py-1.5 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={onStartHiring}
            className="relative group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-size-200 hover:bg-pos-100 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 border border-indigo-400/30 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Start Hiring</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
