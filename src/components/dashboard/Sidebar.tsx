import React from 'react';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Bot,
  Kanban,
  FileSearch,
  MessageSquareCode,
  Mail,
  BarChart3,
  Settings,
  Sparkles,
  ArrowUpRight,
  LogOut,
} from 'lucide-react';

export type DashboardTab =
  | 'overview'
  | 'jobs'
  | 'candidates'
  | 'ai-recruiter'
  | 'pipeline'
  | 'resume-analyzer'
  | 'interview-studio'
  | 'email-studio'
  | 'analytics'
  | 'settings';

interface SidebarProps {
  currentTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onSignOut: () => void;
  pendingApprovalsCount?: number;
}

const NAV_ITEMS = [
  { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
  { id: 'jobs' as DashboardTab, label: 'Jobs', icon: Briefcase },
  { id: 'candidates' as DashboardTab, label: 'Candidates', icon: Users },
  {
    id: 'ai-recruiter' as DashboardTab,
    label: 'AI Recruiter',
    icon: Bot,
    isAgent: true,
  },
  { id: 'pipeline' as DashboardTab, label: 'Pipeline', icon: Kanban },
  { id: 'resume-analyzer' as DashboardTab, label: 'Resume Analyzer', icon: FileSearch },
  { id: 'interview-studio' as DashboardTab, label: 'Interview Studio', icon: MessageSquareCode },
  { id: 'email-studio' as DashboardTab, label: 'Email Studio', icon: Mail },
  { id: 'analytics' as DashboardTab, label: 'Analytics', icon: BarChart3 },
  { id: 'settings' as DashboardTab, label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onSignOut,
  pendingApprovalsCount = 1,
}) => {
  return (
    <aside className="w-64 bg-[#0A0D14] border-r border-white/[0.08] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/[0.08]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#0A0D14] rounded-[7px] flex items-center justify-center font-extrabold text-sm text-cyan-300">
              HF
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white">HireFlow AI</span>
            <span className="text-[10px] text-slate-400 font-mono">Workspace OS</span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Talent Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600/15 text-white border border-indigo-500/30 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      active ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.isAgent && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Agent</span>
                  </span>
                )}

                {item.id === 'ai-recruiter' && pendingApprovalsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner & Signout */}
      <div className="p-4 border-t border-white/[0.08] space-y-2">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-950/40 to-cyan-950/30 border border-white/[0.07] text-left">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>AI Agent Online</span>
            </span>
            <span className="text-[10px] font-mono text-emerald-400">Ready</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Autonomous recruiter agent waiting for prompt instructions.
          </p>
        </div>

        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out / Switch Mode</span>
        </button>
      </div>
    </aside>
  );
};
