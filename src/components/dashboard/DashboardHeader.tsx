import React, { useState } from 'react';
import { Search, Command, Bell, ExternalLink, ChevronDown, Check, Sparkles, User } from 'lucide-react';
import { NotificationItem } from '../../types';

interface DashboardHeaderProps {
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  notifications: NotificationItem[];
  onReturnToLanding: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCandidate?: (candId: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenCommandPalette,
  onOpenNotifications,
  notifications,
  onReturnToLanding,
  searchQuery,
  onSearchChange,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#0A0D15]/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search & Command Palette Trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Global search jobs, candidates, skills..."
            className="w-full bg-[#121622] border border-white/[0.08] rounded-xl pl-10 pr-24 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
          <button
            onClick={onOpenCommandPalette}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Switch back to Landing Page */}
        <button
          onClick={onReturnToLanding}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-colors cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          <span>Landing Page</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Recruiter Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/[0.08]">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
              alt="Elena Vance"
              className="w-8 h-8 rounded-full object-cover border border-indigo-400/40"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A0D15]" />
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-white tracking-tight">Elena Vance</span>
            <span className="text-[10px] text-indigo-400 font-mono">Lead Talent Partner</span>
          </div>
        </div>
      </div>
    </header>
  );
};
