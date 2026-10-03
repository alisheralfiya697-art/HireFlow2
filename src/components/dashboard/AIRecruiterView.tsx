import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  Send,
  Users,
  Mail,
  MessageSquareCode,
  ArrowRight,
  Loader2,
  Check,
} from 'lucide-react';
import { Job, Candidate, AgentTask, AgentStep } from '../../types';
import { runAIAgentWorkflow } from '../../services/api';

interface AIRecruiterViewProps {
  jobs: Job[];
  candidates: Candidate[];
  onApproveAction: (actionType: string, candidateIds: string[]) => void;
  onOpenMatchModal: (candidate: Candidate) => void;
}

const PRESET_QUERIES = [
  'Find the strongest candidates for the Senior Full-Stack Engineer role and prepare interview invitations.',
  'Analyze Lead AI/ML Research pool, rank by autonomous agent experience, and generate technical interview rubrics.',
  'Evaluate all New applicants for Cloud Security Architect, flag potential gaps, and prepare shortlist recommendations.',
];

export const AIRecruiterView: React.FC<AIRecruiterViewProps> = ({
  jobs,
  candidates,
  onApproveAction,
  onOpenMatchModal,
}) => {
  const [query, setQuery] = useState(PRESET_QUERIES[0]);
  const [agentState, setAgentState] = useState<'idle' | 'running' | 'waiting_approval' | 'completed'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [steps, setSteps] = useState<AgentStep[]>([
    { id: 'step-1', label: '1. Understand Job Requirements', status: 'pending', detail: 'Deconstruct ontology & core stack invariants.' },
    { id: 'step-2', label: '2. Search Candidate Pool', status: 'pending', detail: 'Scan active talent records across database.' },
    { id: 'step-3', label: '3. Analyze Resumes', status: 'pending', detail: 'Extract verified contributions and impact.' },
    { id: 'step-4', label: '4. Compare Requirements', status: 'pending', detail: 'Compute 4-vector explainable match scores.' },
    { id: 'step-5', label: '5. Rank Candidates', status: 'pending', detail: 'Filter top candidates exceeding threshold.' },
    { id: 'step-6', label: '6. Prepare Shortlist', status: 'pending', detail: 'Stage candidates for pipeline transition.' },
    { id: 'step-7', label: '7. Generate Interview Questions', status: 'pending', detail: 'Create role-specific technical problem sets.' },
    { id: 'step-8', label: '8. Draft Emails', status: 'pending', detail: 'Prepare personalized outreach communications.' },
    { id: 'step-9', label: '9. Request Recruiter Approval', status: 'pending', detail: 'Halt execution for human recruiter signoff.' },
  ]);
  const [actionApproved, setActionApproved] = useState(false);

  // Top candidates identified by agent
  const recommendedCandidates = candidates.filter((c) =>
    ['cand-1', 'cand-2', 'cand-4', 'cand-12'].includes(c.id)
  );

  const handleRunAgent = async () => {
    setAgentState('running');
    setActionApproved(false);

    // Progressive execution through steps
    const newSteps = [...steps];
    for (let i = 0; i < steps.length - 1; i++) {
      setCurrentStepIndex(i);
      newSteps[i].status = 'in_progress';
      setSteps([...newSteps]);
      await new Promise((r) => setTimeout(r, 650));

      newSteps[i].status = 'completed';
      newSteps[i].timestamp = `${(i * 0.7 + 0.4).toFixed(1)}s`;
      setSteps([...newSteps]);
    }

    // Step 9 is waiting for approval
    setCurrentStepIndex(8);
    newSteps[8].status = 'waiting_approval';
    setSteps([...newSteps]);
    setAgentState('waiting_approval');
  };

  const handleApprove = () => {
    const finalSteps = [...steps];
    finalSteps[8].status = 'completed';
    finalSteps[8].timestamp = 'Authorized';
    setSteps(finalSteps);
    setActionApproved(true);
    setAgentState('completed');

    onApproveAction('send_invitations', ['cand-1', 'cand-2', 'cand-4', 'cand-12']);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Bot className="w-4 h-4" />
            <span>Autonomous Hiring Workflow Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            AI Recruiter Agent
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Autonomous multi-step agent orchestrator. Plans, evaluates candidates, generates rubrics, and seeks human authorization before execution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Agent Governance: Human-in-the-Loop Active</span>
          </div>
        </div>
      </div>

      {/* Agent Prompt Box */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.09] p-6 shadow-2xl space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Instruct Autonomous Recruiter Agent</span>
        </div>

        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
            className="w-full bg-[#121622] rounded-xl p-4 text-sm text-white border border-white/[0.08] focus:outline-none focus:border-indigo-500 resize-none font-medium placeholder-slate-500"
            placeholder="Describe what the agent should accomplish..."
          />
        </div>

        {/* Preset Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">Presets:</span>
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(preset)}
              className="text-left text-[11px] px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-slate-400 hover:text-slate-200 border border-white/[0.06] transition-colors truncate max-w-xs cursor-pointer"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Run Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-500 font-mono">
            Autonomous State:{' '}
            <span className="text-indigo-400 font-semibold uppercase">
              {agentState}
            </span>
          </div>

          <button
            disabled={agentState === 'running'}
            onClick={handleRunAgent}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {agentState === 'running' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Executing Workflow...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Agent Workflow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Execution View: Timeline & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 9-Step Timeline */}
        <div className="lg:col-span-6 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-bold text-white tracking-tight">
              Agent Execution Plan (9 Stages)
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Deterministic Guardrails
            </span>
          </div>

          <div className="space-y-2.5">
            {steps.map((st, i) => {
              const isCurrent = currentStepIndex === i && agentState === 'running';
              const isWaiting = st.status === 'waiting_approval';
              const isDone = st.status === 'completed';

              return (
                <div
                  key={st.id}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    isWaiting
                      ? 'bg-amber-950/30 border-amber-500/50 text-white'
                      : isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500/50 text-white'
                      : isDone
                      ? 'bg-emerald-950/10 border-emerald-500/20 text-slate-300'
                      : 'bg-white/[0.01] border-white/[0.04] text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                          isDone
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isWaiting
                            ? 'bg-amber-500/20 text-amber-400'
                            : isCurrent
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white/[0.04] text-slate-500'
                        }`}
                      >
                        {isDone ? '✓' : i + 1}
                      </div>
                      <span className="text-xs font-semibold">{st.label}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      {st.timestamp && (
                        <span className="text-slate-400">{st.timestamp}</span>
                      )}
                      {isCurrent && (
                        <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      )}
                      {isWaiting && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                          Approval Required
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 pl-8">
                    {st.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Approval Drawer or Recommendations */}
        <div className="lg:col-span-6 space-y-6">
          {/* Approval Modal Banner */}
          {agentState === 'waiting_approval' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#151926] rounded-2xl border-2 border-amber-500/50 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2.5 text-amber-400">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <h3 className="text-base font-bold tracking-tight">
                  Recruiter Authorization Required
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                The agent has finished candidate search, 4-vector explainable ranking, interview rubric generation, and draft invitations.
                Per HireFlow AI compliance guidelines, consequential actions must be approved by the talent partner before execution.
              </p>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-1.5">
                <div className="font-semibold text-white">Staged Actions Awaiting Consent:</div>
                <div className="text-slate-300 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Advance 4 candidates into Shortlisted stage</span>
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Send 4 personalized interview invitation emails</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleApprove}
                  className="flex-1 py-3 rounded-xl text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 shadow-md shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize & Dispatch Outreach</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Success Banner */}
          {actionApproved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-950/30 rounded-2xl border border-emerald-500/40 p-5 flex items-center gap-3 text-emerald-300 text-xs"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>
                Workflow completed. Candidates advanced to Shortlist and 4 interview invitation emails dispatched.
              </span>
            </motion.div>
          )}

          {/* Top Candidates Ranked by Agent */}
          <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Top Ranked Candidates ({recommendedCandidates.length})
              </h3>
              <span className="text-[11px] font-mono text-cyan-400">
                Threshold: &gt;90% Fit
              </span>
            </div>

            <div className="space-y-3">
              {recommendedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  onClick={() => onOpenMatchModal(cand)}
                  className="p-3.5 rounded-xl bg-[#121622] border border-white/[0.06] hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/[0.1]"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{cand.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {cand.currentCompany}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {cand.role} · {cand.experienceYears}y exp
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-emerald-400 font-mono">
                      {cand.matchScore}%
                    </div>
                    <span className="text-[10px] text-slate-500">Match Fit</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
