export type HiringStage = 'New' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Hired';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  experienceLevel: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange: string;
  status: 'Active' | 'Paused' | 'Closed';
  createdAt: string;
  applicantCount: number;
}

export interface CandidateProject {
  title: string;
  description: string;
  tech: string[];
}

export interface MatchBreakdown {
  technicalSkills: number;
  relevantExperience: number;
  roleAlignment: number;
  projectRelevance: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  location: string;
  experienceYears: number;
  education: string;
  currentCompany: string;
  appliedJobId: string;
  appliedDate: string;
  stage: HiringStage;
  matchScore: number;
  matchBreakdown: MatchBreakdown;
  whyMatches: string[];
  potentialGaps: string[];
  skills: string[];
  resumeText: string;
  projects: CandidateProject[];
  notes: string[];
  lastActivity: string;
}

export interface TechnicalQuestion {
  question: string;
  criteria: string;
  expectedAnswer: string;
}

export interface BehavioralQuestion {
  question: string;
  situation: string;
  lookFor: string;
}

export interface InterviewPlan {
  id: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  interviewType: 'Technical' | 'Behavioral' | 'System Design' | 'Executive';
  difficulty: 'Standard' | 'Challenging' | 'Deep Dive';
  focusAreas: string[];
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  roleSpecificQuestions: string[];
  followUpQuestions: string[];
  evaluationCriteria: string[];
  createdAt: string;
}

export type EmailTemplateType =
  | 'Interview Invitation'
  | 'Interview Reminder'
  | 'Shortlist Email'
  | 'Follow-up'
  | 'Rejection'
  | 'Offer Communication';

export type EmailTone = 'Professional' | 'Friendly' | 'Concise' | 'Warm' | 'Formal';

export interface EmailDraft {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  templateType: EmailTemplateType;
  tone: EmailTone;
  subject: string;
  body: string;
  status: 'Draft' | 'Approved' | 'Sent';
  sentAt?: string;
  createdAt: string;
}

export type AgentStepStatus = 'pending' | 'in_progress' | 'completed' | 'waiting_approval';

export interface AgentStep {
  id: string;
  label: string;
  status: AgentStepStatus;
  detail?: string;
  timestamp?: string;
}

export interface AgentTask {
  id: string;
  query: string;
  status: 'idle' | 'thinking' | 'running' | 'waiting_approval' | 'completed' | 'failed';
  currentStepIndex: number;
  steps: AgentStep[];
  targetJobId?: string;
  shortlistedCandidateIds?: string[];
  generatedInterviewsCount?: number;
  draftedEmailsCount?: number;
  pendingAction?: {
    type: 'send_invitations' | 'move_to_shortlist' | 'schedule_interviews';
    description: string;
    candidateCount: number;
  };
  createdAt: string;
  summary?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert' | 'agent';
  timestamp: string;
  read: boolean;
  actionTab?: string;
}

export interface AIInsightItem {
  id: string;
  text: string;
  category: 'Velocity' | 'Quality' | 'Sourcing' | 'Conversion';
  impact: 'positive' | 'warning' | 'neutral';
  metric: string;
}

export interface RecruitmentAnalytics {
  totalApplications: number;
  qualifiedCandidates: number;
  averageMatchScore: number;
  timeToShortlistDays: number;
  timeToHireDays: number;
  interviewConversionRate: number;
  funnel: { stage: string; count: number; percentage: number }[];
  sources: { source: string; candidates: number; hireRate: number }[];
  insights: AIInsightItem[];
}

export interface GraphNode {
  id: string;
  label: string;
  category: 'job' | 'skill' | 'candidate' | 'resume' | 'experience' | 'analysis' | 'score' | 'interview' | 'email' | 'decision' | 'hire';
  x: number;
  y: number;
  description: string;
  connectedTo: string[];
  metrics?: { label: string; value: string };
}
