import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, Check, Sparkles, AlertCircle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onNavigateTab: (tab: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="w-full max-w-sm bg-[#0E121B] rounded-2xl border border-white/[0.12] shadow-2xl p-5 space-y-4 text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Recruitment Notifications
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                if (notif.actionTab) {
                  onNavigateTab(notif.actionTab);
                  onClose();
                }
              }}
              className={`p-3 rounded-xl border text-xs space-y-1 transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white/[0.02] border-white/[0.04] text-slate-400'
                  : 'bg-[#141926] border-indigo-500/30 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  {!notif.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                  )}
                  {notif.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {notif.message}
              </p>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="py-8 text-center text-xs text-slate-500">
              No recent notifications.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
