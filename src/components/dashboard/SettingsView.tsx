import React, { useState } from 'react';
import { ShieldCheck, Cpu, Bell, Lock, CheckCircle2, UserCheck, Key, RefreshCw } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [biasFilterActive, setBiasFilterActive] = useState(true);
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);
  const [autoVectorizeResumes, setAutoVectorizeResumes] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          System & Ethics Governance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure autonomous agent boundaries, model telemetry, and compliance safeguards.
        </p>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Governance settings saved successfully across active workspace.</span>
        </div>
      )}

      {/* Ethical AI Guardrails */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Ethical AI & Compliance Safeguards
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-white">Demographic Bias Stripping</div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Automatically masks race, religion, gender, age, disability, and health information from candidate evaluation vectors.
              </p>
            </div>
            <button
              onClick={() => setBiasFilterActive(!biasFilterActive)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                biasFilterActive ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  biasFilterActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-start justify-between gap-4 pt-3 border-t border-white/[0.04]">
            <div>
              <div className="font-semibold text-white">Human-in-the-Loop Sovereign Approval</div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Mandates talent partner verification before any autonomous agent sends outreach emails or promotes candidates to offer stages.
              </p>
            </div>
            <button
              onClick={() => setRequireHumanApproval(!requireHumanApproval)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                requireHumanApproval ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  requireHumanApproval ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-start justify-between gap-4 pt-3 border-t border-white/[0.04]">
            <div>
              <div className="font-semibold text-white">Real-Time Ingestion Vectorization</div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Extract verifiable accomplishments directly from uploaded PDFs with sub-second latency caching.
              </p>
            </div>
            <button
              onClick={() => setAutoVectorizeResumes(!autoVectorizeResumes)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                autoVectorizeResumes ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  autoVectorizeResumes ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Model & Architecture Status */}
      <div className="bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            AI Engine Configuration
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#121622] border border-white/[0.06] space-y-1">
            <div className="text-slate-400 text-[11px]">Primary Reasoning Model</div>
            <div className="text-white font-mono font-bold">gemini-3.8-flash</div>
            <div className="text-emerald-400 text-[10px] font-mono">Status: Connected & Operational</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#121622] border border-white/[0.06] space-y-1">
            <div className="text-slate-400 text-[11px]">Telemetry Header</div>
            <div className="text-white font-mono font-bold">User-Agent: aistudio-build</div>
            <div className="text-cyan-400 text-[10px] font-mono">Status: Verified Compliant</div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all cursor-pointer"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};
