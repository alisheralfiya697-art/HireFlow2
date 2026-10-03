import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquareCode,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Save,
  Sliders,
  ChevronRight,
  ShieldCheck,
  Loader2,
  FileQuestion,
} from 'lucide-react';
import { Job, Candidate, InterviewPlan } from '../../types';
import { generateInterviewPlan } from '../../services/api';

interface InterviewStudioViewProps {
  jobs: Job[];
  candidates: Candidate[];
  savedPlans: InterviewPlan[];
  onSavePlan: (plan: InterviewPlan) => void;
  initialCandidate?: Candidate | null;
}

export const InterviewStudioView: React.FC<InterviewStudioViewProps> = ({
  jobs,
  candidates,
  savedPlans,
  onSavePlan,
  initialCandidate,
}) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(
    initialCandidate?.appliedJobId || jobs[0]?.id || 'job-1'
  );
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    initialCandidate?.id || candidates[0]?.id || 'cand-1'
  );
  const [interviewType, setInterviewType] = useState<'Technical' | 'Behavioral' | 'System Design' | 'Executive'>('Technical');
  const [difficulty, setDifficulty] = useState<'Standard' | 'Challenging' | 'Deep Dive'>('Challenging');
  const [focusAreasText, setFocusAreasText] = useState('Distributed Systems, Concurrency, State Sync');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const selectedCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const [currentPlan, setCurrentPlan] = useState<InterviewPlan | null>(
    savedPlans[0] || null
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSavedSuccess(false);

    try {
      const data = await generateInterviewPlan({
        candidate: selectedCandidate,
        job: selectedJob,
        interviewType,
        difficulty,
        focusAreas: focusAreasText.split(',').map((s) => s.trim()),
      });

      const newPlan: InterviewPlan = {
        id: `plan-${Date.now()}`,
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        interviewType,
        difficulty,
        focusAreas: focusAreasText.split(',').map((s) => s.trim()),
        technicalQuestions: data.technicalQuestions || [],
        behavioralQuestions: data.behavioralQuestions || [],
        roleSpecificQuestions: data.roleSpecificQuestions || [],
        followUpQuestions: data.followUpQuestions || [],
        evaluationCriteria: data.evaluationCriteria || [],
        createdAt: new Date().toISOString().split('T')[0],
      };

      setCurrentPlan(newPlan);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!currentPlan) return;
    const text = `INTERVIEW PLAN: ${currentPlan.candidateName} - ${currentPlan.jobTitle}
Type: ${currentPlan.interviewType} | Difficulty: ${currentPlan.difficulty}

TECHNICAL CHALLENGES:
${currentPlan.technicalQuestions.map((q, i) => `${i + 1}. ${q.question}\n   Criteria: ${q.criteria}\n   Expected: ${q.expectedAnswer}`).join('\n\n')}

BEHAVIORAL QUESTIONS:
${currentPlan.behavioralQuestions.map((b, i) => `${i + 1}. ${b.question}\n   Look For: ${b.lookFor}`).join('\n\n')}

EVALUATION CRITERIA:
${currentPlan.evaluationCriteria.map((c, i) => `• ${c}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!currentPlan) return;
    onSavePlan(currentPlan);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Rubric Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Interview Studio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Synthesize rigorous technical problem sets and behavioral evaluation criteria calibrated to candidate experience.
          </p>
        </div>
      </div>

      {/* Inputs Board */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-6">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Evaluation Parameters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Target Job */}
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

          {/* Candidate */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Candidate</label>
            <select
              value={selectedCandidateId}
              onChange={(e) => setSelectedCandidateId(e.target.value)}
              className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
            >
              {candidates.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.matchScore}% Match)
                </option>
              ))}
            </select>
          </div>

          {/* Interview Type */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Session Focus</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value as any)}
              className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="Technical">Technical Deep Dive</option>
              <option value="System Design">System Architecture</option>
              <option value="Behavioral">Behavioral & Leadership</option>
              <option value="Executive">Executive Alignment</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">Rigor Level</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl p-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="Standard">Standard Senior</option>
              <option value="Challenging">Challenging Staff</option>
              <option value="Deep Dive">Deep Dive Principal</option>
            </select>
          </div>
        </div>

        {/* Custom Focus Areas Input */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-300 font-medium">
            Custom Topic Focus Areas (comma-separated)
          </label>
          <input
            type="text"
            value={focusAreasText}
            onChange={(e) => setFocusAreasText(e.target.value)}
            className="w-full bg-[#121622] border border-white/[0.08] text-xs text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            placeholder="e.g. Distributed State, WebSockets, Zero-Downtime Migration"
          />
        </div>

        {/* Generate Button */}
        <div className="flex justify-end pt-2">
          <button
            disabled={isGenerating}
            onClick={handleGenerate}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Rubric with Gemini 3.8...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Tailored Interview Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Plan Output */}
      {currentPlan && (
        <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-6">
          {/* Output Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 uppercase">
                  {currentPlan.interviewType} Plan
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">
                  {currentPlan.difficulty} Rigor
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                {currentPlan.candidateName} — {currentPlan.jobTitle}
              </h3>
            </div>

            {/* Quick Actions: Copy & Save */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Saved!' : 'Save Plan'}</span>
              </button>
            </div>
          </div>

          {/* Technical Questions */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
              Technical Problem Statements & Criteria
            </h4>
            <div className="space-y-4">
              {currentPlan.technicalQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#121622] border border-white/[0.06] text-xs space-y-2"
                >
                  <div className="text-sm font-semibold text-white">
                    {idx + 1}. {q.question}
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] space-y-1">
                    <div className="text-cyan-400 font-semibold text-[11px]">Evaluation Criteria:</div>
                    <p className="text-slate-300 text-[11px]">{q.criteria}</p>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    <span className="text-slate-300 font-medium">Ideal Candidate Response: </span>
                    {q.expectedAnswer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Questions */}
          {currentPlan.behavioralQuestions && currentPlan.behavioralQuestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                Behavioral & Leadership Scenarios
              </h4>
              <div className="space-y-3">
                {currentPlan.behavioralQuestions.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#121622] border border-white/[0.06] text-xs space-y-1.5"
                  >
                    <div className="text-sm font-semibold text-white">
                      {idx + 1}. {b.question}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      <span className="text-slate-300 font-medium">Competency Look-For: </span>
                      {b.lookFor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evaluation Criteria Checklist */}
          {currentPlan.evaluationCriteria && currentPlan.evaluationCriteria.length > 0 && (
            <div className="p-4 rounded-xl bg-[#121622] border border-emerald-500/20 text-xs space-y-2">
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Standardized Scoring Rubric
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {currentPlan.evaluationCriteria.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
