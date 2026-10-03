import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Sparkles,
  Send,
  Copy,
  Check,
  RefreshCw,
  Scissors,
  CheckCircle2,
  ShieldCheck,
  Sliders,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Job, Candidate, EmailDraft, EmailTemplateType, EmailTone } from '../../types';
import { generateEmailDraft } from '../../services/api';

interface EmailStudioViewProps {
  jobs: Job[];
  candidates: Candidate[];
  savedDrafts: EmailDraft[];
  onSendEmail: (draft: EmailDraft) => void;
  initialCandidate?: Candidate | null;
}

const TEMPLATES: EmailTemplateType[] = [
  'Interview Invitation',
  'Interview Reminder',
  'Shortlist Email',
  'Follow-up',
  'Rejection',
  'Offer Communication',
];

const TONES: EmailTone[] = [
  'Professional',
  'Friendly',
  'Concise',
  'Warm',
  'Formal',
];

export const EmailStudioView: React.FC<EmailStudioViewProps> = ({
  jobs,
  candidates,
  savedDrafts,
  onSendEmail,
  initialCandidate,
}) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    initialCandidate?.id || candidates[0]?.id || 'cand-1'
  );
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialCandidate?.appliedJobId || jobs[0]?.id || 'job-1'
  );
  const [templateType, setTemplateType] = useState<EmailTemplateType>('Interview Invitation');
  const [tone, setTone] = useState<EmailTone>('Professional');
  const [customNotes, setCustomNotes] = useState('Highlight specific project resonance and invite to 30-min conversation.');

  const [subject, setSubject] = useState(savedDrafts[0]?.subject || '');
  const [body, setBody] = useState(savedDrafts[0]?.body || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];
  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleGenerate = async (modifier?: 'shorten' | 'improve') => {
    setIsGenerating(true);
    setSentSuccess(false);

    let notes = customNotes;
    if (modifier === 'shorten') notes += ' Please keep it under 3 punchy sentences.';
    if (modifier === 'improve') notes += ' Elevate warmth and emphasize exciting technical roadmap.';

    try {
      const data = await generateEmailDraft({
        candidate: selectedCandidate,
        job: selectedJob,
        templateType,
        tone,
        customNotes: notes,
      });

      if (data) {
        setSubject(data.subject);
        setBody(data.body);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmSend = () => {
    const draft: EmailDraft = {
      id: `email-${Date.now()}`,
      candidateId: selectedCandidate.id,
      candidateName: selectedCandidate.name,
      candidateEmail: selectedCandidate.email,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      templateType,
      tone,
      subject,
      body,
      status: 'Sent',
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSendEmail(draft);
    setApprovalModalOpen(false);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Communication Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          AI Email Studio
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Draft, refine, and dispatch personalized talent communications. Every email requires recruiter approval before sending.
        </p>
      </div>

      {sentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            Email dispatched successfully to <strong>{selectedCandidate.email}</strong>. Activity logged in pipeline audit trail.
          </span>
        </motion.div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Template & Tone Controls */}
        <div className="lg:col-span-5 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tone & Context Configuration</span>
          </div>

          {/* Candidate Picker */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Candidate</label>
            <select
              value={selectedCandidateId}
              onChange={(e) => setSelectedCandidateId(e.target.value)}
              className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.role} ({c.matchScore}%)
                </option>
              ))}
            </select>
          </div>

          {/* Role Picker */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Target Role</label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>

          {/* Template Type */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Message Objective</label>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((tmpl) => (
                <button
                  key={tmpl}
                  onClick={() => setTemplateType(tmpl)}
                  className={`p-2 rounded-lg text-left text-xs font-medium border transition-colors cursor-pointer ${
                    templateType === tmpl
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tmpl}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Cadence Tone</label>
            <div className="flex flex-wrap gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    tone === t
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                      : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Guidance */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              Specific Directives & Guidance
            </label>
            <textarea
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              rows={3}
              className="w-full bg-[#121622] rounded-xl p-3 text-xs text-slate-300 border border-white/[0.06] focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="e.g. Reference their real-time state sync project..."
            />
          </div>

          {/* Generate Primary Action */}
          <button
            disabled={isGenerating}
            onClick={() => handleGenerate()}
            className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Composing Personalized Draft...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Email Draft</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Draft Editor & Recruiter Approval */}
        <div className="lg:col-span-7 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-5">
          {/* Quick Modifier Actions */}
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/[0.06] gap-2">
            <div className="flex items-center gap-2">
              <button
                disabled={isGenerating}
                onClick={() => handleGenerate('shorten')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Scissors className="w-3 h-3 text-cyan-400" />
                <span>Shorten</span>
              </button>

              <button
                disabled={isGenerating}
                onClick={() => handleGenerate('improve')}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span>Elevate Warmth</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Subject Line */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#121622] rounded-xl px-4 py-2.5 text-xs font-semibold text-white border border-white/[0.06] focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Email Body */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={11}
              className="w-full bg-[#121622] rounded-xl p-4 text-xs text-slate-200 border border-white/[0.06] focus:outline-none focus:border-indigo-500 resize-none font-sans leading-relaxed"
            />
          </div>

          {/* Recruiter Send Action */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Recruiter signoff required prior to SMTP delivery</span>
            </div>

            <button
              onClick={() => setApprovalModalOpen(true)}
              className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Review & Send Email</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recruiter Send Approval Modal */}
      {approvalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#0E121B] rounded-2xl border border-white/[0.12] p-6 shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center gap-2 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Authorize Candidate Communication
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are about to dispatch an email to <strong>{selectedCandidate.name}</strong> ({selectedCandidate.email}) regarding <strong>{selectedJob.title}</strong>.
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-1">
              <div className="text-slate-400">Subject:</div>
              <div className="text-white font-medium line-clamp-1">{subject}</div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setApprovalModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSend}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Approve & Send
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
