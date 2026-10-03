import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Briefcase,
  Users,
  Bot,
  FileSearch,
  MessageSquareCode,
  Mail,
  BarChart3,
  Plus,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { DashboardTab } from './Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string, payload?: any) => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: any;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const COMMANDS: CommandItem[] = [
    {
      id: 'create-job',
      label: 'Create Job',
      category: 'Requisitions',
      icon: Plus,
      action: () => onSelectAction('create-job'),
    },
    {
      id: 'run-agent',
      label: 'Run AI Recruiter Agent',
      category: 'Autonomous Workflows',
      icon: Bot,
      action: () => onSelectAction('nav', 'ai-recruiter'),
    },
    {
      id: 'upload-resume',
      label: 'Upload & Parse Resume',
      category: 'Intelligence',
      icon: FileSearch,
      action: () => onSelectAction('nav', 'resume-analyzer'),
    },
    {
      id: 'search-candidates',
      label: 'Search Candidates',
      category: 'Talent Directory',
      icon: Users,
      action: () => onSelectAction('nav', 'candidates'),
    },
    {
      id: 'generate-interview',
      label: 'Generate Interview Rubric',
      category: 'Evaluation',
      icon: MessageSquareCode,
      action: () => onSelectAction('nav', 'interview-studio'),
    },
    {
      id: 'draft-email',
      label: 'Draft Email to Candidate',
      category: 'Outreach',
      icon: Mail,
      action: () => onSelectAction('nav', 'email-studio'),
    },
    {
      id: 'open-analytics',
      label: 'Open Analytics & AI Insights',
      category: 'Intelligence',
      icon: BarChart3,
      action: () => onSelectAction('nav', 'analytics'),
    },
    {
      id: 'search-jobs',
      label: 'Search Active Positions',
      category: 'Requisitions',
      icon: Briefcase,
      action: () => onSelectAction('nav', 'jobs'),
    },
  ];

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-[#0E121B] rounded-2xl border border-white/[0.12] shadow-2xl overflow-hidden text-left"
      >
        {/* Search Input */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-slate-400 border border-white/[0.08]">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filteredCommands.map((cmd, idx) => {
            const Icon = cmd.icon;
            const isSelected = selectedIndex === idx;

            return (
              <div
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`p-3 rounded-xl flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-indigo-600/20 text-white border border-indigo-500/40'
                    : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-white/[0.04] text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{cmd.label}</div>
                    <div className="text-[10px] text-slate-400">{cmd.category}</div>
                  </div>
                </div>

                {isSelected && (
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                )}
              </div>
            );
          })}

          {filteredCommands.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching commands found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/[0.06] bg-[#0A0D15] flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
          <span className="font-mono text-indigo-400">HireFlow AI Command</span>
        </div>
      </motion.div>
    </div>
  );
};
