import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Plus, Users, Sparkles, MapPin, DollarSign, X, Check, ArrowRight } from 'lucide-react';
import { Job } from '../../types';

interface JobsViewProps {
  jobs: Job[];
  onCreateJob: (job: Job) => void;
  onSelectJobForCandidates: (jobId: string) => void;
  onApplyWithResume?: (jobId: string) => void;
}

export const JobsView: React.FC<JobsViewProps> = ({
  jobs,
  onCreateJob,
  onSelectJobForCandidates,
  onApplyWithResume,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Core Product Engineering');
  const [location, setLocation] = useState('San Francisco, CA (Hybrid)');
  const [type, setType] = useState<'Full-time' | 'Remote' | 'Hybrid'>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Senior (5+ yrs)');
  const [description, setDescription] = useState('');
  const [skillsText, setSkillsText] = useState('React, TypeScript, Node.js, Distributed Systems');
  const [salaryRange, setSalaryRange] = useState('$180,000 - $220,000 + Equity');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      department,
      location,
      type,
      experienceLevel,
      description: description || 'Architect and scale high-throughput web applications with modern TypeScript frameworks and distributed backends.',
      requiredSkills: skillsText.split(',').map((s) => s.trim()),
      preferredSkills: ['Next.js', 'Redis', 'PostgreSQL', 'Docker'],
      salaryRange,
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0],
      applicantCount: 0,
    };

    onCreateJob(newJob);
    setModalOpen(false);
    setTitle('');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Job Architecture & Roles
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage open technical requisitions, ontology parameters, and candidate pipelines.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Define New Role</span>
        </button>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#0D1019] rounded-2xl border border-white/[0.08] hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all shadow-sm group"
          >
            <div className="space-y-4">
              {/* Status and Department */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-indigo-400 font-mono">{job.department}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${
                    job.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {job.status}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-1 text-[10px] text-slate-300">
                {job.requiredSkills.slice(0, 4).map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Meta details */}
              <div className="pt-2 border-t border-white/[0.06] space-y-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                  <span className="font-mono text-slate-300">{job.salaryRange}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono font-semibold text-white">{job.applicantCount}</span>
                <span>Applicants</span>
              </div>

              <div className="flex items-center gap-3">
                {onApplyWithResume && (
                  <button
                    onClick={() => onApplyWithResume(job.id)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Apply</span>
                  </button>
                )}

                <button
                  onClick={() => onSelectJobForCandidates(job.id)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Talent</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Role Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-[#0E121B] rounded-2xl border border-white/[0.12] p-6 md:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Define New Role Ontology
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/[0.06] text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Position Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  className="w-full bg-[#121622] rounded-xl px-4 py-2.5 text-white border border-white/[0.08] focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#121622] rounded-xl px-3 py-2 text-white border border-white/[0.08]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#121622] rounded-xl px-3 py-2 text-white border border-white/[0.08]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Required Competencies (comma-separated)</label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full bg-[#121622] rounded-xl px-3 py-2 text-white border border-white/[0.08]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Compensation Range</label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="w-full bg-[#121622] rounded-xl px-3 py-2 text-white border border-white/[0.08]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  Create Position
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
