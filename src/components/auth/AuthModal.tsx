import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, Lock, Mail, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('elena.vance@hireflow.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Elena Vance');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="w-full max-w-md bg-[#0E121B] rounded-2xl border border-white/[0.12] shadow-2xl p-6 sm:p-8 space-y-6 text-left relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-xs text-white">
              HF
            </div>
            <span className="font-bold text-sm tracking-tight text-white">HireFlow AI</span>
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">
            {mode === 'signin' && 'Sign in to HireFlow OS'}
            {mode === 'signup' && 'Create your Recruiter Workspace'}
            {mode === 'forgot' && 'Reset your credentials'}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'signin' && 'Autonomous recruitment intelligence workspace.'}
            {mode === 'signup' && 'Empower your talent operations with explainable AI.'}
            {mode === 'forgot' && 'Enter your verified enterprise email to recover access.'}
          </p>
        </div>

        {/* 1-Click Instant Demo Login Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/50 to-cyan-950/40 border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Instant Recruiter Demo</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Verified</span>
          </div>
          <p className="text-[11px] text-slate-300">
            Sign in instantly as <strong>Elena Vance</strong> (Lead Talent Acquisition Partner) with full preloaded pipeline access.
          </p>
          <button
            onClick={onLoginSuccess}
            className="w-full py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Enter Demo Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-white/[0.08]" />
          <span className="absolute bg-[#0E121B] px-3 text-[10px] text-slate-500 uppercase tracking-wider font-mono">
            Or continue with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#121622] rounded-xl px-3.5 py-2.5 text-white border border-white/[0.08] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Work Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121622] rounded-xl px-3.5 py-2.5 text-white border border-white/[0.08] focus:outline-none focus:border-indigo-500"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-medium">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121622] rounded-xl px-3.5 py-2.5 text-white border border-white/[0.08] focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}</span>
          </button>
        </form>

        {/* Toggle signin / signup */}
        <div className="text-center text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
          {mode === 'signin' ? (
            <span>
              Don’t have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};
