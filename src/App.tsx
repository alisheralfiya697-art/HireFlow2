import React, { useState, useEffect } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATES,
  INITIAL_INTERVIEW_PLANS,
  INITIAL_EMAIL_DRAFTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ANALYTICS,
} from './data/mockData';
import { Job, Candidate, InterviewPlan, EmailDraft, NotificationItem, HiringStage } from './types';

// Dynamic Background & Toast System
import { DynamicBackground, BackgroundTheme } from './components/common/DynamicBackground';
import { ToastSystem, ToastMessage } from './components/common/ToastSystem';

// Landing Page Components
import { LandingNavbar } from './components/landing/LandingNavbar';
import { HeroSection } from './components/landing/HeroSection';
import { RecruitmentGraph } from './components/landing/RecruitmentGraph';
import { ScrollStory } from './components/landing/ScrollStory';
import { LandingFooter } from './components/landing/LandingFooter';

// Dashboard Components
import { Sidebar, DashboardTab } from './components/dashboard/Sidebar';
import { DashboardHeader } from './components/dashboard/DashboardHeader';
import { OverviewView } from './components/dashboard/OverviewView';
import { JobsView } from './components/dashboard/JobsView';
import { CandidatesView } from './components/dashboard/CandidatesView';
import { AIRecruiterView } from './components/dashboard/AIRecruiterView';
import { PipelineView } from './components/dashboard/PipelineView';
import { ResumeAnalyzerView } from './components/dashboard/ResumeAnalyzerView';
import { InterviewStudioView } from './components/dashboard/InterviewStudioView';
import { EmailStudioView } from './components/dashboard/EmailStudioView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { SettingsView } from './components/dashboard/SettingsView';

// Modals
import { ExplainableMatchModal } from './components/dashboard/ExplainableMatchModal';
import { CommandPalette } from './components/dashboard/CommandPalette';
import { NotificationsModal } from './components/dashboard/NotificationsModal';
import { AuthModal } from './components/auth/AuthModal';

export default function App() {
  // Navigation / View State
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [targetJobIdForAnalyzer, setTargetJobIdForAnalyzer] = useState<string | null>(null);

  // Core Data State
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [interviewPlans, setInterviewPlans] = useState<InterviewPlan[]>(INITIAL_INTERVIEW_PLANS);
  const [emailDrafts, setEmailDrafts] = useState<EmailDraft[]>(INITIAL_EMAIL_DRAFTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [analytics, setAnalytics] = useState(INITIAL_ANALYTICS);

  // Modals & Drawers
  const [matchModalCandidate, setMatchModalCandidate] = useState<Candidate | null>(null);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toast System State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Open Resume Analyzer directly
  const handleOpenResumeAnalyzer = (jobId?: string) => {
    if (jobId) {
      setTargetJobIdForAnalyzer(jobId);
    }
    setCurrentTab('resume-analyzer');
    setView('dashboard');
  };

  // Studio Contexts
  const [activeStudioCandidate, setActiveStudioCandidate] = useState<Candidate | null>(null);

  // Global Search
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleOpenMatchModal = (candidate: Candidate) => {
    setMatchModalCandidate(candidate);
    setIsMatchModalOpen(true);
  };

  const handleStageChange = (candidateId: string, newStage: HiringStage) => {
    const cand = candidates.find((c) => c.id === candidateId);
    const oldStage = cand?.stage;

    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );

    if (cand && oldStage && oldStage !== newStage) {
      addToast({
        title: 'Stage Updated',
        message: `${cand.name} moved to ${newStage}.`,
        type: 'undo',
        duration: 6500,
        onUndo: () => {
          setCandidates((prev) =>
            prev.map((c) => (c.id === candidateId ? { ...c, stage: oldStage } : c))
          );
          addToast({
            title: 'Action Reverted',
            message: `${cand.name} returned to ${oldStage}.`,
            type: 'info',
          });
        },
      });
    }
  };

  const handleCandidateCreated = (newCand: Candidate) => {
    setCandidates((prev) => [newCand, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Candidate Profile Created',
      message: `${newCand.name} (${newCand.education}) added with ${newCand.matchScore}% explainable fit.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
      actionTab: 'candidates',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      title: 'Application Received',
      message: `${newCand.name} (${newCand.education}, ${newCand.experienceYears} yrs) successfully added to pipeline.`,
      type: 'success',
    });
  };

  const handleCreateJob = (newJob: Job) => {
    setJobs((prev) => [newJob, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Position Defined',
      message: `${newJob.title} created with active neural ontology.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      actionTab: 'jobs',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      title: 'Role Created',
      message: `${newJob.title} is now active and ready for neural matching.`,
      type: 'info',
    });
  };

  const handleSaveInterviewPlan = (plan: InterviewPlan) => {
    setInterviewPlans((prev) => [plan, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Interview Rubric Saved',
      message: `Evaluation rubric saved for ${plan.candidateName}.`,
      type: 'info',
      timestamp: 'Just now',
      read: false,
      actionTab: 'interview-studio',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      title: 'Rubric Saved',
      message: `Evaluation criteria archived for ${plan.candidateName}.`,
      type: 'success',
    });
  };

  const handleSendEmail = (draft: EmailDraft) => {
    setEmailDrafts((prev) => [draft, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Email Sent to Candidate',
      message: `"${draft.subject}" dispatched to ${draft.candidateName}.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
      actionTab: 'email-studio',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      title: 'Email Dispatched',
      message: `Candidate outreach delivered to ${draft.candidateName}.`,
      type: 'success',
    });
  };

  const handleApproveAgentAction = (actionType: string, candidateIds: string[]) => {
    setCandidates((prev) =>
      prev.map((c) =>
        candidateIds.includes(c.id) && c.stage === 'New' ? { ...c, stage: 'Shortlisted' } : c
      )
    );
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Agent Outreach Approved',
      message: `Recruiter approved dispatch of 4 interview invitations.`,
      type: 'agent',
      timestamp: 'Just now',
      read: false,
      actionTab: 'pipeline',
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      title: 'Agent Workflow Executed',
      message: '4 candidates advanced to Shortlist and personalized invitations sent.',
      type: 'agent',
    });
  };

  const handleCommandAction = (actionId: string, payload?: any) => {
    if (actionId === 'create-job') {
      setCurrentTab('jobs');
      setView('dashboard');
    } else if (actionId === 'nav' && payload) {
      setCurrentTab(payload as DashboardTab);
      setView('dashboard');
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    if (view === 'dashboard') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Compute active dynamic background theme
  const getBackgroundTheme = (): BackgroundTheme => {
    if (isAuthModalOpen) return 'auth';
    if (view === 'landing') return 'landing-hero';
    switch (currentTab) {
      case 'overview':
        return 'dashboard-default';
      case 'candidates':
        return 'candidates';
      case 'ai-recruiter':
        return 'ai-recruiter';
      case 'pipeline':
        return 'pipeline';
      case 'resume-analyzer':
        return 'resume-analyzer';
      case 'interview-studio':
        return 'intelligence-graph';
      case 'email-studio':
        return 'ai-recruiter';
      case 'analytics':
        return 'analytics';
      default:
        return 'dashboard-default';
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Dynamic Background System with smooth ambient tracking */}
      <DynamicBackground theme={getBackgroundTheme()} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col">
        {view === 'landing' ? (
          /* ============================================================== */
          /* LANDING PAGE EXPERIENCE                                        */
          /* ============================================================== */
          <main className="flex-1">
            {/* Sticky Navbar */}
            <LandingNavbar
              onStartHiring={() => setView('dashboard')}
              onSignIn={() => setIsAuthModalOpen(true)}
              onNavigateSection={handleNavigateSection}
              onUploadResume={() => handleOpenResumeAnalyzer()}
            />

            {/* Hero Section */}
            <HeroSection
              onStartHiring={() => setView('dashboard')}
              onUploadResume={() => handleOpenResumeAnalyzer()}
              onExploreAI={() => {
                const el = document.getElementById('intelligence-graph');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Signature Visual: Recruitment Intelligence Graph */}
            <RecruitmentGraph />

            {/* Scroll Story: 8 Stages of Orchestration */}
            <ScrollStory />

            {/* Footer & Security Assurance */}
            <LandingFooter
              onStartHiring={() => setView('dashboard')}
              onSignIn={() => setIsAuthModalOpen(true)}
            />
          </main>
        ) : (
          /* ============================================================== */
          /* AUTHENTICATED RECRUITER SAAS DASHBOARD                        */
          /* ============================================================== */
          <div className="flex-1 flex min-h-screen overflow-x-hidden">
            {/* Navigation Sidebar */}
            <Sidebar
              currentTab={currentTab}
              onTabChange={(tab) => setCurrentTab(tab)}
              onSignOut={() => setView('landing')}
            />

            {/* Main Workspace Column */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#090B10]/80 backdrop-blur-sm">
              {/* Top Bar */}
              <DashboardHeader
                onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                notifications={notifications}
                onReturnToLanding={() => setView('landing')}
                searchQuery={searchQuery}
                onSearchChange={(q) => setSearchQuery(q)}
              />

              {/* Dashboard Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {currentTab === 'overview' && (
                  <OverviewView
                    jobs={jobs}
                    candidates={candidates}
                    analytics={analytics}
                    onNavigateTab={(tab) => setCurrentTab(tab)}
                    onOpenMatchModal={handleOpenMatchModal}
                  />
                )}

                {currentTab === 'jobs' && (
                  <JobsView
                    jobs={jobs}
                    onCreateJob={handleCreateJob}
                    onSelectJobForCandidates={(jobId) => {
                      setCurrentTab('candidates');
                    }}
                    onApplyWithResume={(jobId) => {
                      handleOpenResumeAnalyzer(jobId);
                    }}
                  />
                )}

                {currentTab === 'candidates' && (
                  <CandidatesView
                    candidates={candidates}
                    jobs={jobs}
                    onOpenMatchModal={handleOpenMatchModal}
                    onGenerateInterview={(cand) => {
                      setActiveStudioCandidate(cand);
                      setCurrentTab('interview-studio');
                    }}
                    onDraftEmail={(cand) => {
                      setActiveStudioCandidate(cand);
                      setCurrentTab('email-studio');
                    }}
                    onStageChange={handleStageChange}
                    onNavigateToAnalyzer={() => handleOpenResumeAnalyzer()}
                  />
                )}

                {currentTab === 'ai-recruiter' && (
                  <AIRecruiterView
                    jobs={jobs}
                    candidates={candidates}
                    onApproveAction={handleApproveAgentAction}
                    onOpenMatchModal={handleOpenMatchModal}
                  />
                )}

                {currentTab === 'pipeline' && (
                  <PipelineView
                    candidates={candidates}
                    jobs={jobs}
                    onStageChange={handleStageChange}
                    onOpenMatchModal={handleOpenMatchModal}
                    onGenerateInterview={(cand) => {
                      setActiveStudioCandidate(cand);
                      setCurrentTab('interview-studio');
                    }}
                  />
                )}

                {currentTab === 'resume-analyzer' && (
                  <ResumeAnalyzerView
                    jobs={jobs}
                    onCandidateCreated={handleCandidateCreated}
                    onOpenMatchModal={handleOpenMatchModal}
                    onNavigateToCandidates={() => setCurrentTab('candidates')}
                    initialJobId={targetJobIdForAnalyzer || undefined}
                  />
                )}

                {currentTab === 'interview-studio' && (
                  <InterviewStudioView
                    jobs={jobs}
                    candidates={candidates}
                    savedPlans={interviewPlans}
                    onSavePlan={handleSaveInterviewPlan}
                    initialCandidate={activeStudioCandidate}
                  />
                )}

                {currentTab === 'email-studio' && (
                  <EmailStudioView
                    jobs={jobs}
                    candidates={candidates}
                    savedDrafts={emailDrafts}
                    onSendEmail={handleSendEmail}
                    initialCandidate={activeStudioCandidate}
                  />
                )}

                {currentTab === 'analytics' && (
                  <AnalyticsView analytics={analytics} />
                )}

                {currentTab === 'settings' && <SettingsView />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Explainable Match Modal */}
      <ExplainableMatchModal
        candidate={matchModalCandidate}
        job={jobs.find((j) => j.id === matchModalCandidate?.appliedJobId) || null}
        isOpen={isMatchModalOpen}
        onClose={() => setIsMatchModalOpen(false)}
        onGenerateInterview={(cand) => {
          setActiveStudioCandidate(cand);
          setCurrentTab('interview-studio');
          setView('dashboard');
        }}
        onDraftEmail={(cand) => {
          setActiveStudioCandidate(cand);
          setCurrentTab('email-studio');
          setView('dashboard');
        }}
      />

      {/* Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleCommandAction}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onNavigateTab={(tab) => {
          setCurrentTab(tab as DashboardTab);
          setView('dashboard');
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthModalOpen(false);
          setView('dashboard');
          addToast({
            title: 'Welcome Back, Elena',
            message: 'Signed in as Lead Technical Talent Partner.',
            type: 'success',
          });
        }}
      />

      {/* Global Toast Notification & Undo System */}
      <ToastSystem toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

