import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRAPH_NODES } from '../../data/mockData';
import { GraphNode } from '../../types';
import { Network, Sparkles, Check, ChevronRight, X, Cpu, Info, ArrowUpRight } from 'lucide-react';

const CATEGORY_STYLES: Record<
  GraphNode['category'],
  { bg: string; border: string; text: string; glow: string; dot: string }
> = {
  job: {
    bg: 'bg-blue-950/50',
    border: 'border-blue-500/40',
    text: 'text-blue-300',
    glow: 'rgba(59, 130, 246, 0.4)',
    dot: 'bg-blue-400',
  },
  skill: {
    bg: 'bg-cyan-950/50',
    border: 'border-cyan-500/40',
    text: 'text-cyan-300',
    glow: 'rgba(6, 182, 212, 0.4)',
    dot: 'bg-cyan-400',
  },
  candidate: {
    bg: 'bg-indigo-950/50',
    border: 'border-indigo-500/40',
    text: 'text-indigo-300',
    glow: 'rgba(99, 102, 241, 0.4)',
    dot: 'bg-indigo-400',
  },
  resume: {
    bg: 'bg-violet-950/50',
    border: 'border-violet-500/40',
    text: 'text-violet-300',
    glow: 'rgba(139, 92, 246, 0.4)',
    dot: 'bg-violet-400',
  },
  experience: {
    bg: 'bg-amber-950/50',
    border: 'border-amber-500/40',
    text: 'text-amber-300',
    glow: 'rgba(245, 158, 11, 0.4)',
    dot: 'bg-amber-400',
  },
  analysis: {
    bg: 'bg-purple-950/60',
    border: 'border-purple-500/60',
    text: 'text-purple-300',
    glow: 'rgba(168, 85, 247, 0.6)',
    dot: 'bg-purple-400',
  },
  score: {
    bg: 'bg-emerald-950/50',
    border: 'border-emerald-500/40',
    text: 'text-emerald-300',
    glow: 'rgba(16, 185, 129, 0.5)',
    dot: 'bg-emerald-400',
  },
  interview: {
    bg: 'bg-rose-950/50',
    border: 'border-rose-500/40',
    text: 'text-rose-300',
    glow: 'rgba(244, 63, 94, 0.4)',
    dot: 'bg-rose-400',
  },
  email: {
    bg: 'bg-sky-950/50',
    border: 'border-sky-500/40',
    text: 'text-sky-300',
    glow: 'rgba(14, 165, 233, 0.4)',
    dot: 'bg-sky-400',
  },
  decision: {
    bg: 'bg-fuchsia-950/50',
    border: 'border-fuchsia-500/40',
    text: 'text-fuchsia-300',
    glow: 'rgba(217, 70, 239, 0.4)',
    dot: 'bg-fuchsia-400',
  },
  hire: {
    bg: 'bg-teal-950/60',
    border: 'border-teal-500/50',
    text: 'text-teal-300',
    glow: 'rgba(20, 184, 166, 0.5)',
    dot: 'bg-teal-400',
  },
};

export const RecruitmentGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-score');

  const selectedNode = GRAPH_NODES.find((n) => n.id === selectedNodeId) || GRAPH_NODES[6];

  // Helper to determine if a node or edge is connected to selectedNode
  const isConnected = (nodeId: string) => {
    if (nodeId === selectedNodeId) return true;
    if (selectedNode.connectedTo.includes(nodeId)) return true;
    const targetNode = GRAPH_NODES.find((n) => n.id === nodeId);
    return targetNode?.connectedTo.includes(selectedNodeId);
  };

  return (
    <section id="intelligence-graph" className="py-24 relative overflow-hidden bg-[#0A0C13]">
      {/* Background glow & subtle grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-indigo-900/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-xs text-cyan-300 mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>The Signature Intelligence Core</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Recruitment Intelligence Graph
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Click any node below. See how HireFlow connects raw job specs, candidate resumes, and neural analysis into an explainable decision trail.
          </p>
        </div>

        {/* Main Graph Visual Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Graph Canvas */}
          <div className="lg:col-span-8 bg-[#0D1019] rounded-2xl border border-white/[0.08] p-6 shadow-2xl relative overflow-hidden">
            {/* Legend / Status Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.06] text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Active Graph Nodes: 11 Entities Connected</span>
              </div>
              <div className="text-[11px] text-slate-400 hidden sm:block">
                Select any node to inspect semantic linkages
              </div>
            </div>

            {/* SVG Visual Graph for Desktop/Tablet */}
            <div className="relative w-full h-[520px] overflow-x-auto overflow-y-hidden select-none">
              <svg
                viewBox="0 0 1340 540"
                className="w-[1340px] h-[540px] max-w-none transition-all duration-300"
              >
                <defs>
                  <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Render Connecting Lines */}
                {GRAPH_NODES.map((node) => {
                  return node.connectedTo.map((targetId) => {
                    const target = GRAPH_NODES.find((n) => n.id === targetId);
                    if (!target) return null;

                    const active =
                      node.id === selectedNodeId ||
                      target.id === selectedNodeId ||
                      (isConnected(node.id) && isConnected(target.id));

                    return (
                      <g key={`${node.id}-${target.id}`}>
                        <line
                          x1={node.x}
                          y1={node.y}
                          x2={target.x}
                          y2={target.y}
                          stroke={active ? 'url(#edge-gradient)' : 'rgba(255, 255, 255, 0.08)'}
                          strokeWidth={active ? 2.5 : 1.2}
                          strokeDasharray={active ? '6 4' : 'none'}
                          filter={active ? 'url(#glow-filter)' : undefined}
                          className="transition-all duration-300"
                        />
                        {/* Animated pulse packet along active edges */}
                        {active && (
                          <circle r="3.5" fill="#38BDF8">
                            <animateMotion
                              path={`M ${node.x} ${node.y} L ${target.x} ${target.y}`}
                              dur="2.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                      </g>
                    );
                  });
                })}

                {/* Render Nodes */}
                {GRAPH_NODES.map((node) => {
                  const style = CATEGORY_STYLES[node.category];
                  const isSel = node.id === selectedNodeId;
                  const isConn = isConnected(node.id);

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer group"
                    >
                      {/* Node Halo when selected */}
                      {isSel && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="46"
                          fill="none"
                          stroke={style.glow}
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="34"
                        fill="#0F131E"
                        stroke={isSel ? '#FFFFFF' : isConn ? style.glow : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth={isSel ? 2.5 : isConn ? 2 : 1}
                        className="transition-all duration-300 group-hover:scale-105"
                      />

                      {/* Inner Dot Indicator */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="6"
                        className={`${style.dot} transition-all duration-300 ${
                          isSel ? 'scale-125' : ''
                        }`}
                      />

                      {/* Node Label Below */}
                      <text
                        x={node.x}
                        y={node.y + 50}
                        textAnchor="middle"
                        fill={isSel ? '#FFFFFF' : isConn ? '#CBD5E1' : '#64748B'}
                        fontSize="12"
                        fontWeight={isSel ? '700' : '600'}
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {node.label}
                      </text>

                      {/* Metric Tag Above */}
                      {node.metrics && (
                        <text
                          x={node.x}
                          y={node.y - 44}
                          textAnchor="middle"
                          fill={isSel ? '#38BDF8' : '#94A3B8'}
                          fontSize="10"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          {node.metrics.value}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Quick Helper Tip */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Showing verified links for Senior Full-Stack role orchestration</span>
              </span>
              <span className="font-mono text-slate-400 text-[11px]">
                Active Node: <span className="text-white font-semibold">{selectedNode.label}</span>
              </span>
            </div>
          </div>

          {/* Contextual Intelligence Panel */}
          <div className="lg:col-span-4 bg-[#0D1019] rounded-2xl border border-white/[0.09] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    CATEGORY_STYLES[selectedNode.category].dot
                  }`}
                />
                <span className="text-xs uppercase tracking-wider font-mono text-slate-400">
                  Node Analysis
                </span>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-medium">
                {selectedNode.category.toUpperCase()}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedNode.label}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Key Metrics Box */}
                {selectedNode.metrics && (
                  <div className="bg-[#131724] rounded-xl p-4 border border-white/[0.06]">
                    <div className="text-xs text-slate-400">{selectedNode.metrics.label}</div>
                    <div className="text-lg font-bold text-white font-mono mt-1">
                      {selectedNode.metrics.value}
                    </div>
                  </div>
                )}

                {/* Connected Relationships */}
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    Directly Linked Entities
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.connectedTo.map((targetId) => {
                      const target = GRAPH_NODES.find((n) => n.id === targetId);
                      if (!target) return null;
                      return (
                        <button
                          key={targetId}
                          onClick={() => setSelectedNodeId(targetId)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.09] text-slate-200 border border-white/[0.08] hover:border-indigo-400/40 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{target.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Why This Matters for Recruiter */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-xs font-semibold text-indigo-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How HireFlow Leverages This</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    By maintaining explicit bipartite graph edges rather than flattening into a single score, HireFlow can audit every hiring decision back to verified candidate contributions.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
