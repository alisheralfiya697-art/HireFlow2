import { Job, Candidate, InterviewPlan, EmailDraft, NotificationItem, RecruitmentAnalytics, GraphNode } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full-Stack Engineer (React & Distributed Systems)',
    department: 'Core Product Engineering',
    location: 'San Francisco, CA (Hybrid / Remote)',
    type: 'Full-time',
    experienceLevel: 'Senior (5+ yrs)',
    description: 'Lead high-throughput web applications with React 19, TypeScript, and distributed Node/Go microservices. Architect real-time collaboration engines and maintain sub-100ms latency pipelines.',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'PostgreSQL', 'System Architecture'],
    preferredSkills: ['Next.js', 'Redis', 'GraphQL', 'Tailwind CSS', 'Docker', 'Event-Driven Architecture'],
    salaryRange: '$175,000 - $215,000 + Equity',
    status: 'Active',
    createdAt: '2026-09-18',
    applicantCount: 38,
  },
  {
    id: 'job-2',
    title: 'Lead AI/ML Research Engineer (Agents & RAG)',
    department: 'Applied Intelligence',
    location: 'New York, NY (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Lead / Principal (7+ yrs)',
    description: 'Design autonomous multi-agent reasoning workflows, embedding retrieval pipelines, and high-performance LLM fine-tuning benchmarks using state-of-the-art multimodal models.',
    requiredSkills: ['Python', 'PyTorch', 'LLMs', 'Vector Databases', 'LangChain/LlamaIndex', 'Evaluation Pipelines'],
    preferredSkills: ['FastAPI', 'Kubernetes', 'Hugging Face', 'Prompt Engineering', 'C++ Inference'],
    salaryRange: '$210,000 - $260,000 + Equity',
    status: 'Active',
    createdAt: '2026-09-22',
    applicantCount: 29,
  },
  {
    id: 'job-3',
    title: 'Staff Product Designer (Design Systems & AI UX)',
    department: 'Product & Design',
    location: 'Remote (US/Canada)',
    type: 'Remote',
    experienceLevel: 'Staff (6+ yrs)',
    description: 'Define the design language of generative intelligence tools. Establish motion guidelines, high-density dashboard layouts, and human-in-the-loop approval workflows.',
    requiredSkills: ['Figma', 'Design Systems', 'Design Prototyping', 'AI Interaction Design', 'Micro-interactions'],
    preferredSkills: ['Framer', 'HTML/CSS/Tailwind', 'Typography Mastery', 'User Research', 'Design Tokens'],
    salaryRange: '$165,000 - $195,000 + Equity',
    status: 'Active',
    createdAt: '2026-09-25',
    applicantCount: 22,
  },
  {
    id: 'job-4',
    title: 'Principal Cloud & Security Architect',
    department: 'Infrastructure & Trust',
    location: 'Seattle, WA (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Principal (8+ yrs)',
    description: 'Architect multi-tenant cloud security perimeters, SOC2 / ISO27001 data isolation policies, and automated zero-trust authentication bridges.',
    requiredSkills: ['AWS/GCP', 'Terraform', 'Zero-Trust Architecture', 'Kubernetes Security', 'SOC2/HIPAA'],
    preferredSkills: ['Rust', 'eBPF', 'Vault', 'Cloudflare Workers', 'Incident Response'],
    salaryRange: '$220,000 - $275,000 + Equity',
    status: 'Active',
    createdAt: '2026-09-29',
    applicantCount: 14,
  },
  {
    id: 'job-5',
    title: 'Senior Frontend Engineer (Creative Motion & WebGL)',
    department: 'Interactive Experiences',
    location: 'San Francisco, CA (Remote Friendly)',
    type: 'Remote',
    experienceLevel: 'Senior (4+ yrs)',
    description: 'Craft fluid, tactile digital canvases and high-framerate interfaces with Framer Motion, Three.js, and modern CSS architecture.',
    requiredSkills: ['React', 'TypeScript', 'Motion / Framer Motion', 'WebGL / Three.js', 'Canvas 2D'],
    preferredSkills: ['GLSL Shaders', 'Tailwind CSS', 'Web Audio API', 'Performance Profiling'],
    salaryRange: '$160,000 - $190,000 + Equity',
    status: 'Active',
    createdAt: '2026-10-01',
    applicantCount: 19,
  },
  {
    id: 'job-6',
    title: 'Director of Enterprise Talent Acquisition',
    department: 'People Operations',
    location: 'Austin, TX (Hybrid)',
    type: 'Full-time',
    experienceLevel: 'Director (8+ yrs)',
    description: 'Oversee technical hiring scale-up from 60 to 250 engineers. Implement AI-assisted sourcing and data-driven pipeline velocity analytics.',
    requiredSkills: ['Executive Recruiting', 'Headcount Planning', 'Talent Analytics', 'Recruitment Automation'],
    preferredSkills: ['Greenhouse/Lever', 'Employer Branding', 'Compensation Benchmarking'],
    salaryRange: '$180,000 - $230,000 + Performance Bonus',
    status: 'Paused',
    createdAt: '2026-09-10',
    applicantCount: 16,
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@engineered.io',
    phone: '+1 (415) 892-4410',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Staff Full-Stack Engineer',
    location: 'San Francisco, CA',
    experienceYears: 7,
    education: 'B.S. in Computer Science, UC Berkeley (2019)',
    currentCompany: 'Linear Labs',
    appliedJobId: 'job-1',
    appliedDate: '2026-09-28',
    stage: 'Shortlisted',
    matchScore: 94,
    matchBreakdown: {
      technicalSkills: 96,
      relevantExperience: 92,
      roleAlignment: 95,
      projectRelevance: 93,
    },
    whyMatches: [
      '7+ years shipping mission-critical React, TypeScript, and high-throughput Node.js microservices.',
      'Led migration of synchronous APIs to event-driven Kafka architecture handling 45M daily events.',
      'Authored internal design system and real-time state synchronization engine using WebSockets.',
      'Demonstrated expertise in sub-100ms database indexing on PostgreSQL and Redis clusters.'
    ],
    potentialGaps: [
      'Primary cloud background is AWS rather than Google Cloud Platform (readily transferable).',
      'Limited production exposure to Go concurrency patterns outside side projects.'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Distributed Systems'],
    resumeText: 'Staff Full Stack Engineer at Linear Labs. 7 years experience in distributed web engineering, React 19, Node.js microservices, sub-second queries, and team technical leadership.',
    projects: [
      {
        title: 'Real-Time Synchronous State Canvas',
        description: 'Engineered a conflict-free replicated data type (CRDT) engine powering multi-user document edits with 12ms synchronization.',
        tech: ['React', 'TypeScript', 'WebSockets', 'Redis', 'Rust']
      },
      {
        title: 'Enterprise Billing Gateway Refactor',
        description: 'Re-architected payment webhooks pipeline reducing dropped events to 0.001% across 6 international currencies.',
        tech: ['Node.js', 'PostgreSQL', 'Docker', 'Terraform']
      }
    ],
    notes: ['Excellent communication during initial touchpoint. Highly enthusiastic about our 2026 platform roadmap.'],
    lastActivity: 'Shortlisted by AI Agent on Oct 2, 2026'
  },
  {
    id: 'cand-2',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@deepquantum.ai',
    phone: '+1 (212) 401-9877',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Machine Learning Scientist',
    location: 'New York, NY',
    experienceYears: 6,
    education: 'Ph.D. in Computer Science & NLP, Columbia University (2020)',
    currentCompany: 'Anthropic Research Affiliate',
    appliedJobId: 'job-2',
    appliedDate: '2026-09-29',
    stage: 'Interview',
    matchScore: 96,
    matchBreakdown: {
      technicalSkills: 98,
      relevantExperience: 94,
      roleAlignment: 96,
      projectRelevance: 96,
    },
    whyMatches: [
      'Published 4 peer-reviewed papers on multi-hop reasoning and verifiable retrieval augmented generation.',
      'Extensive experience fine-tuning 7B-70B parameter models with LoRA and distributed vLLM inference.',
      'Production-tested agentic tool execution frameworks with strict guardrails and latency bounds.',
      'Strong Python, PyTorch, and Milvus/Pinecone vector database optimization mastery.'
    ],
    potentialGaps: [
      'Academic background leans heavily toward foundational research; less focus on enterprise frontend integration.',
      'Prefers self-directed autonomous research projects over scheduled sprint rituals.'
    ],
    skills: ['Python', 'PyTorch', 'LLMs', 'Vector Databases', 'LangChain', 'vLLM', 'FastAPI', 'RAG'],
    resumeText: 'Senior ML Scientist with deep expertise in autonomous reasoning agents, RAG pipeline evaluation, embeddings, and low-latency inference orchestration.',
    projects: [
      {
        title: 'Verifiable Multi-Agent Factuality Engine',
        description: 'Engineered an automated agentic verification pipeline that reduced hallucination rates by 41% across dense legal texts.',
        tech: ['Python', 'PyTorch', 'Qdrant', 'FastAPI']
      }
    ],
    notes: ['Technical deep dive scheduled with Head of AI. Top candidate for role.'],
    lastActivity: 'AI Interview Studio plan created Oct 1, 2026'
  },
  {
    id: 'cand-3',
    name: 'Sienna Chen',
    email: 'sienna.chen@designflow.co',
    phone: '+1 (206) 552-3190',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Design Technologist',
    location: 'Seattle, WA',
    experienceYears: 8,
    education: 'B.F.A. in Interaction Design, RISD (2018)',
    currentCompany: 'Notion Design Labs',
    appliedJobId: 'job-3',
    appliedDate: '2026-09-27',
    stage: 'Offer',
    matchScore: 92,
    matchBreakdown: {
      technicalSkills: 91,
      relevantExperience: 95,
      roleAlignment: 93,
      projectRelevance: 89,
    },
    whyMatches: [
      'Pioneered AI-assisted canvas interfaces used by over 4M weekly active professionals.',
      'Mastery of Figma variable tokens, multi-platform design systems, and coded interactive prototypes in Framer & React.',
      'Proven track record of zero-pill design discipline and high-density editorial data presentation.',
      'Co-authored widely cited design guidelines for ethical Human-AI collaboration.'
    ],
    potentialGaps: [
      'Prefers fully remote arrangement due to family commitments in Washington state.',
      'Moderate compensation expectations at the top quartile of band.'
    ],
    skills: ['Figma', 'Design Systems', 'AI UX', 'Framer', 'React Prototyping', 'Design Tokens', 'Micro-interactions'],
    resumeText: 'Principal Product Designer with 8 years crafting next-generation AI workflows, editorial typography, and high-density productivity software.',
    projects: [
      {
        title: 'AI Collaborative Canvas Operating System',
        description: 'Designed frictionless multi-modal workspace with contextual sidebars, keyboard-first navigation, and reactive AI assistants.',
        tech: ['Figma', 'Framer', 'React', 'Tailwind']
      }
    ],
    notes: ['Offer letter dispatched after unanimous approval from Design & Engineering leads.'],
    lastActivity: 'Offer package sent Oct 3, 2026'
  },
  {
    id: 'cand-4',
    name: 'Kavita Patel',
    email: 'kavita.patel@cloudcore.dev',
    phone: '+1 (408) 773-1944',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Lead Cloud Security Architect',
    location: 'San Jose, CA',
    experienceYears: 9,
    education: 'M.S. in Cybersecurity, Georgia Tech (2017)',
    currentCompany: 'Palo Alto Networks',
    appliedJobId: 'job-4',
    appliedDate: '2026-09-30',
    stage: 'Interview',
    matchScore: 95,
    matchBreakdown: {
      technicalSkills: 97,
      relevantExperience: 96,
      roleAlignment: 94,
      projectRelevance: 93,
    },
    whyMatches: [
      'Architected multi-region Kubernetes clusters supporting HIPAA & FedRAMP High compliance.',
      'Deep expertise in automated Infrastructure as Code using Terraform and Terragrunt.',
      'Designed zero-trust service mesh using Envoy, SPIFFE/SPIRE, and automated mTLS rotation.',
      'Maintained 99.995% uptime across enterprise security perimeters spanning 12 global regions.'
    ],
    potentialGaps: [
      'Notice period is 4 weeks due to sensitive security handoff requirements.',
      'Slightly higher travel availability restrictions.'
    ],
    skills: ['AWS', 'GCP', 'Terraform', 'Kubernetes Security', 'Zero-Trust', 'Envoy', 'SOC2/HIPAA', 'Vault'],
    resumeText: 'Cloud Security Architect with 9 years implementing zero-trust perimeters, infrastructure automation, and automated compliance auditing for Fortune 500 tech.',
    projects: [
      {
        title: 'Zero-Trust Multi-Cloud Mesh',
        description: 'Deployed enterprise SPIFFE/SPIRE identity attestation securing 12,000 ephemeral microservice containers.',
        tech: ['Terraform', 'Kubernetes', 'Envoy', 'Vault']
      }
    ],
    notes: ['Passed technical architectural round with 10/10 rating.'],
    lastActivity: 'System Design Interview completed'
  },
  {
    id: 'cand-5',
    name: 'Julian Mercer',
    email: 'julian.mercer@motioncraft.io',
    phone: '+1 (310) 912-8831',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Creative Frontend Developer',
    location: 'Los Angeles, CA',
    experienceYears: 5,
    education: 'B.S. in Media Arts & Science, UCLA (2021)',
    currentCompany: 'Active Theory Alum',
    appliedJobId: 'job-5',
    appliedDate: '2026-10-01',
    stage: 'Screening',
    matchScore: 91,
    matchBreakdown: {
      technicalSkills: 94,
      relevantExperience: 89,
      roleAlignment: 92,
      projectRelevance: 89,
    },
    whyMatches: [
      'Specialist in high-fidelity Framer Motion choreography and GPU-accelerated interactive graphics.',
      'Strong React 19 and modern TypeScript foundation with keen aesthetic attention to detail.',
      'Built bespoke particle systems and responsive 60fps graph visualizations.',
      'Strong understanding of accessibility and prefers-reduced-motion fallbacks.'
    ],
    potentialGaps: [
      'Backend experience is limited to lightweight Node API wrappers and serverless functions.',
      'Has not previously managed large monorepo build pipelines.'
    ],
    skills: ['React', 'TypeScript', 'Motion', 'Three.js', 'Tailwind CSS', 'GLSL', 'Canvas API'],
    resumeText: 'Creative Frontend Developer passionate about fluid interaction design, tactile physics-based animations, and Framer-grade web engineering.',
    projects: [
      {
        title: 'Interactive Spatial Data Sphere',
        description: 'Built a 60fps interactive 3D WebGL data globe visualizing international routing networks.',
        tech: ['Three.js', 'React', 'Motion', 'GLSL']
      }
    ],
    notes: ['Portfolio is visually world-class. Fits the exact aesthetic target for HireFlow AI.'],
    lastActivity: 'Screening call scheduled for tomorrow'
  },
  {
    id: 'cand-6',
    name: 'Elena Rostova',
    email: 'elena.rostova@techscale.global',
    phone: '+1 (512) 640-1129',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'Head of Technical Recruiting',
    location: 'Austin, TX',
    experienceYears: 10,
    education: 'B.A. in Organizational Psychology, UT Austin (2016)',
    currentCompany: 'ScaleOps Recruiting',
    appliedJobId: 'job-6',
    appliedDate: '2026-09-15',
    stage: 'Hired',
    matchScore: 97,
    matchBreakdown: {
      technicalSkills: 96,
      relevantExperience: 98,
      roleAlignment: 97,
      projectRelevance: 97,
    },
    whyMatches: [
      'Scaled tech hiring across 3 high-growth unicorns from Series B to IPO.',
      'Reduced average time-to-hire by 43% through data-driven pipeline stages and structured rubric evaluations.',
      'Deep industry network across senior AI researchers and distributed systems architects.'
    ],
    potentialGaps: [
      'None noted for this role profile.'
    ],
    skills: ['Executive Recruiting', 'Headcount Planning', 'Talent Analytics', 'Recruiter Enablement', 'Offer Closing'],
    resumeText: 'Talent Acquisition Leader with a decade of scaling world-class engineering organizations through data-driven recruitment pipelines.',
    projects: [
      {
        title: 'Global Engineering Hiring Playbook',
        description: 'Standardized hiring rubric across 14 hiring managers resulting in 91% candidate satisfaction.',
        tech: ['Talent Analytics', 'Greenhouse', 'Workday']
      }
    ],
    notes: ['Successfully signed offer! Starting first week of November.'],
    lastActivity: 'Onboarding pack delivered'
  },
  {
    id: 'cand-7',
    name: 'Devon Gallagher',
    email: 'devon.g@stackfoundry.io',
    phone: '+1 (415) 309-8812',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Full-Stack Software Engineer',
    location: 'Oakland, CA',
    experienceYears: 4,
    education: 'B.S. in Software Engineering, San Jose State (2022)',
    currentCompany: 'Vercel Ecosystem Partner',
    appliedJobId: 'job-1',
    appliedDate: '2026-10-02',
    stage: 'New',
    matchScore: 86,
    matchBreakdown: {
      technicalSkills: 89,
      relevantExperience: 82,
      roleAlignment: 88,
      projectRelevance: 85,
    },
    whyMatches: [
      'Solid experience in React, TypeScript, Next.js App Router, and Tailwind CSS.',
      'Active open-source contributor with clean architectural instincts.',
      'Implemented optimistic UI mutations with TanStack Query and Server Actions.'
    ],
    potentialGaps: [
      '4 years experience is slightly below the 5+ years senior threshold requested.',
      'Limited experience tuning high-concurrency database connection pools.'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    resumeText: 'Full Stack developer specialized in Next.js, TypeScript, PostgreSQL, and performant web frontends.',
    projects: [
      {
        title: 'Developer Analytics Dashboard',
        description: 'Next.js 15 analytics portal with real-time log ingestion and query visualization.',
        tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL']
      }
    ],
    notes: ['Promising candidate. Could be considered for Mid-Senior leveling.'],
    lastActivity: 'Applied via Careers portal'
  },
  {
    id: 'cand-8',
    name: 'Amina Al-Mansoor',
    email: 'amina.mansoor@ai-foundry.net',
    phone: '+1 (617) 492-7011',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Machine Learning Research Engineer',
    location: 'Boston, MA',
    experienceYears: 5,
    education: 'M.S. in Artificial Intelligence, MIT (2021)',
    currentCompany: 'Boston AI Labs',
    appliedJobId: 'job-2',
    appliedDate: '2026-10-01',
    stage: 'Shortlisted',
    matchScore: 93,
    matchBreakdown: {
      technicalSkills: 95,
      relevantExperience: 91,
      roleAlignment: 94,
      projectRelevance: 92,
    },
    whyMatches: [
      'Strong publication record in agentic tool-use and speculative decoding techniques.',
      'Developed distributed evaluation framework for benchmarking semantic recall in complex RAG workflows.',
      'High proficiency in Python, PyTorch, LangChain, and ChromaDB vector indexing.'
    ],
    potentialGaps: [
      'Currently based in Boston; relocation or remote contract structure required.',
      'Less hands-on experience with production Kubernetes deployment pipelines.'
    ],
    skills: ['Python', 'PyTorch', 'LLMs', 'LangChain', 'Vector Search', 'Evaluation Pipelines', 'Docker'],
    resumeText: 'AI Research Engineer with 5 years experience creating autonomous agents, fine-tuning reasoning models, and building reliable evaluation benchmarks.',
    projects: [
      {
        title: 'Speculative Decoding Inference Accelerator',
        description: 'Achieved 2.3x speedup on autoregressive language models using smaller draft models.',
        tech: ['PyTorch', 'CUDA', 'Python', 'vLLM']
      }
    ],
    notes: ['Shortlisted automatically by AI Recruiter Agent. Interview plan generated.'],
    lastActivity: 'AI Agent Shortlist batch Oct 2'
  },
  {
    id: 'cand-9',
    name: 'Tariq Sterling',
    email: 'tariq.sterling@cloudnative.pro',
    phone: '+1 (206) 881-9923',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'Cloud Infrastructure & SRE Architect',
    location: 'Seattle, WA',
    experienceYears: 7,
    education: 'B.S. in Computer Engineering, University of Washington (2019)',
    currentCompany: 'Amazon Web Services',
    appliedJobId: 'job-4',
    appliedDate: '2026-09-24',
    stage: 'Shortlisted',
    matchScore: 91,
    matchBreakdown: {
      technicalSkills: 93,
      relevantExperience: 90,
      roleAlignment: 92,
      projectRelevance: 89,
    },
    whyMatches: [
      'Direct experience engineering zero-downtime multi-region failover across Tier 1 cloud services.',
      'Expert in Terraform module design, Kubernetes orchestration, and automated canary deployments.',
      'Strong track record writing proactive observability monitors in Prometheus and Grafana.'
    ],
    potentialGaps: [
      'Security certifications (CISSP) currently in progress rather than finalized.',
      'Primarily AWS focused; GCP is secondary.'
    ],
    skills: ['AWS', 'Terraform', 'Kubernetes', 'Prometheus', 'Docker', 'Go', 'Zero-Trust'],
    resumeText: 'Senior Systems & SRE Architect specialized in fault-tolerant distributed infrastructure, Kubernetes, and automated disaster recovery.',
    projects: [
      {
        title: 'Automated Multi-Region Disaster Recovery',
        description: 'Engineered sub-30 second RTO failover architecture for 500+ microservices.',
        tech: ['AWS Route53', 'Terraform', 'Kubernetes', 'Go']
      }
    ],
    notes: ['High technical competence demonstrated in screening.'],
    lastActivity: 'Review completed by Hiring Manager'
  },
  {
    id: 'cand-10',
    name: 'Maya Lin',
    email: 'maya.lin@uxstudio.design',
    phone: '+1 (415) 604-3321',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Product Designer',
    location: 'San Francisco, CA',
    experienceYears: 5,
    education: 'B.S. in Human-Computer Interaction, Carnegie Mellon (2021)',
    currentCompany: 'Figma Community Creator',
    appliedJobId: 'job-3',
    appliedDate: '2026-10-02',
    stage: 'Screening',
    matchScore: 89,
    matchBreakdown: {
      technicalSkills: 92,
      relevantExperience: 86,
      roleAlignment: 91,
      projectRelevance: 87,
    },
    whyMatches: [
      'Created top-rated Figma UI kits with over 150k community downloads.',
      'Demonstrated expertise in editorial typography, responsive design tokens, and fluid layouts.',
      'Proficient in Framer prototyping and interactive design specifications.'
    ],
    potentialGaps: [
      '5 years experience meets senior criteria, but role is Staff level.',
      'Has not previously led enterprise cross-functional design reviews alone.'
    ],
    skills: ['Figma', 'Design Systems', 'Framer', 'UI/UX', 'Micro-interactions', 'User Research'],
    resumeText: 'Product Designer focused on scalable design systems, typography hierarchy, and intuitive SaaS developer tools.',
    projects: [
      {
        title: 'Editorial SaaS Design Token Framework',
        description: 'Comprehensive token library supporting light/dark high-contrast themes across 40+ atomic components.',
        tech: ['Figma', 'Tokens Studio', 'Framer']
      }
    ],
    notes: ['Candidate has exceptional aesthetic taste. Portfolio review scheduled.'],
    lastActivity: 'Phone screen queued'
  },
  {
    id: 'cand-11',
    name: 'Ethan Ross',
    email: 'ethan.ross@kernelcode.com',
    phone: '+1 (650) 419-8221',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Systems Architect',
    location: 'Palo Alto, CA',
    experienceYears: 11,
    education: 'M.S. in Computer Science, Stanford (2015)',
    currentCompany: 'Datadog Alum',
    appliedJobId: 'job-1',
    appliedDate: '2026-09-20',
    stage: 'Interview',
    matchScore: 95,
    matchBreakdown: {
      technicalSkills: 98,
      relevantExperience: 96,
      roleAlignment: 94,
      projectRelevance: 92,
    },
    whyMatches: [
      'Over a decade architecting high-throughput low-latency distributed systems.',
      'Pioneered in-memory caching frameworks processing 1.2M queries per second.',
      'Deep knowledge of React rendering internals, WebAssembly bridges, and Node runtime profiling.'
    ],
    potentialGaps: [
      'Salary expectation is at upper bound of tier.',
      'Requires team lead responsibilities included in title.'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'C++', 'PostgreSQL', 'Redis'],
    resumeText: 'Principal Engineer with 11 years engineering high-concurrency cloud software, distributed data stores, and ultra-performant web interfaces.',
    projects: [
      {
        title: 'High-Volume Distributed Ingestion Engine',
        description: 'Engineered multi-threaded ingestion worker pipeline processing 80GB/s of telemetry metrics.',
        tech: ['C++', 'Node.js', 'Kafka', 'PostgreSQL']
      }
    ],
    notes: ['Executive interview scheduled with CTO.'],
    lastActivity: 'Round 3 Interview scheduled'
  },
  {
    id: 'cand-12',
    name: 'Nadia Solis',
    email: 'nadia.solis@creativecanvas.org',
    phone: '+1 (415) 781-4490',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Motion & Interaction Developer',
    location: 'San Francisco, CA',
    experienceYears: 6,
    education: 'B.S. in Computer Graphics, CalArts (2020)',
    currentCompany: 'Stripe Agency Partner',
    appliedJobId: 'job-5',
    appliedDate: '2026-09-28',
    stage: 'Shortlisted',
    matchScore: 94,
    matchBreakdown: {
      technicalSkills: 96,
      relevantExperience: 93,
      roleAlignment: 95,
      projectRelevance: 92,
    },
    whyMatches: [
      'World-class portfolio of Framer Motion and WebGL interactive award-winning web applications.',
      'Expertise in physics springs, gesture-driven interfaces, and responsive canvas layouts.',
      'High proficiency in React, TypeScript, and modern Tailwind CSS.'
    ],
    potentialGaps: [
      'Notice period of 3 weeks.',
      'Prefers focusing on frontend motion over backend integration work.'
    ],
    skills: ['React', 'TypeScript', 'Motion', 'Three.js', 'Tailwind CSS', 'GLSL', 'SVG Animation'],
    resumeText: 'Senior Creative Developer specializing in tactile UI transitions, 3D WebGL scenes, and delightful interactive animations for modern SaaS.',
    projects: [
      {
        title: 'Tactile Physics Interaction Suite',
        description: 'Open-source motion primitives library with over 12k GitHub stars.',
        tech: ['Motion', 'React', 'TypeScript', 'Tailwind']
      }
    ],
    notes: ['Superb match for our interactive Recruitment Graph visual storytelling.'],
    lastActivity: 'AI Interview Studio plan prepared'
  }
];

export const INITIAL_INTERVIEW_PLANS: InterviewPlan[] = [
  {
    id: 'plan-1',
    candidateId: 'cand-2',
    candidateName: 'Dr. Aris Thorne',
    jobId: 'job-2',
    jobTitle: 'Lead AI/ML Research Engineer (Agents & RAG)',
    interviewType: 'Technical',
    difficulty: 'Deep Dive',
    focusAreas: ['Autonomous Multi-Agent Orchestration', 'RAG Retrieval Benchmarking', 'Latency & Cost Optimization'],
    technicalQuestions: [
      {
        question: 'How do you design deterministic guardrails for an autonomous agent executing arbitrary function calls to prevent execution loops?',
        criteria: 'Candidate explains state machines, circuit breakers, semantic reflection loops, and token budgeting.',
        expectedAnswer: 'Implement finite state automata with max-hop cutoffs, parameter validation schemas (Zod/Pydantic), and intermediate state replay verification.'
      },
      {
        question: 'When scaling vector search across 50M embeddings, how do you handle hybrid lexical/dense search balancing latency and recall?',
        criteria: 'Explains Reciprocal Rank Fusion (RRF), HNSW indexing trade-offs, and BM25 integration with scalar quantization.',
        expectedAnswer: 'Use two-stage retrieval: lightweight BM25 + IVF-PQ dense index, fused with RRF followed by cross-encoder re-ranking for top 30 items.'
      }
    ],
    behavioralQuestions: [
      {
        question: 'Describe a situation where a state-of-the-art model showed strong benchmark results in literature but failed unpredictably on messy production data. How did you diagnose and resolve it?',
        situation: 'Real-world data distribution drift versus academic benchmark cleanliness.',
        lookFor: 'Systematic error taxonomy, synthetic data augmentation, and automated regression test suites.'
      }
    ],
    roleSpecificQuestions: [
      'How would you structure HireFlow AI’s multi-step recruitment agent to ensure recruiter approval is strictly requested before sensitive actions?',
      'What evaluation metrics do you track to measure explainability fidelity in candidate match scores?'
    ],
    followUpQuestions: [
      'What are the memory trade-offs between KV-cache quantization (FP8 vs INT4) in high-concurrency agent workflows?'
    ],
    evaluationCriteria: [
      'Architectural rigour and deep understanding of reasoning limitations in LLMs.',
      'Practical pragmatism balancing research novelty with sub-second production performance.',
      'Clear, transparent communication when explaining complex agentic failure modes.'
    ],
    createdAt: '2026-10-02'
  },
  {
    id: 'plan-2',
    candidateId: 'cand-1',
    candidateName: 'Marcus Vance',
    jobId: 'job-1',
    jobTitle: 'Senior Full-Stack Engineer (React & Distributed Systems)',
    interviewType: 'System Design',
    difficulty: 'Challenging',
    focusAreas: ['Real-Time Collaboration', 'Distributed Caching', 'Event Driven Queuing'],
    technicalQuestions: [
      {
        question: 'Design a real-time collaborative recruitment pipeline where 50 recruiters can update candidate stages concurrently with optimistic UI updates.',
        criteria: 'Handles optimistic rollback, WebSocket synchronization, CRDT or Operational Transformation, and database atomicity.',
        expectedAnswer: 'Combine optimistic React state with idempotent event queues, Redis Pub/Sub channels, and PostgreSQL row-level version locks.'
      }
    ],
    behavioralQuestions: [
      {
        question: 'Tell me about a time you had to push back on a product requirement because it introduced unacceptable latency into the core user loop.',
        situation: 'Engineering vs Product trade-off navigation.',
        lookFor: 'Data-driven advocacy, performance benchmarking, and creative alternative compromise.'
      }
    ],
    roleSpecificQuestions: [
      'How would you architect our Explainable Match Score engine to calculate 4-dimensional breakdown vectors in under 80ms?'
    ],
    followUpQuestions: [
      'How does React 19 Actions and useOptimistic simplify or change your architecture compared to React 18?'
    ],
    evaluationCriteria: [
      'Clarity of system boundaries.',
      'Thorough consideration of edge failure states.',
      'Deep mastery of modern full-stack web primitives.'
    ],
    createdAt: '2026-10-01'
  }
];

export const INITIAL_EMAIL_DRAFTS: EmailDraft[] = [
  {
    id: 'email-1',
    candidateId: 'cand-1',
    candidateName: 'Marcus Vance',
    candidateEmail: 'marcus.vance@engineered.io',
    jobId: 'job-1',
    jobTitle: 'Senior Full-Stack Engineer (React & Distributed Systems)',
    templateType: 'Shortlist Email',
    tone: 'Professional',
    subject: 'HireFlow AI // Senior Full-Stack Engineering role next steps',
    body: `Hi Marcus,

Our technical hiring team and AI recruitment intelligence engine recently analyzed your background for our Senior Full-Stack Engineer position.

Your 7+ years architecting distributed React applications and event-driven microservices at Linear Labs strongly aligned with our 2026 product roadmap (94% role match). In particular, your work engineering real-time state synchronization engines stood out as directly relevant to our platform's architecture.

We would love to invite you to an introductory 30-minute conversation with our Lead Technical Talent Partner to discuss our mission and review mutual fit.

Are you available this Thursday or Friday afternoon for a brief video call?

Best regards,
Elena Vance
Principal Talent Acquisition Partner, HireFlow AI`,
    status: 'Approved',
    createdAt: '2026-10-02'
  },
  {
    id: 'email-2',
    candidateId: 'cand-2',
    candidateName: 'Dr. Aris Thorne',
    candidateEmail: 'aris.thorne@deepquantum.ai',
    jobId: 'job-2',
    jobTitle: 'Lead AI/ML Research Engineer (Agents & RAG)',
    templateType: 'Interview Invitation',
    tone: 'Warm',
    subject: 'Interview Invitation: Lead AI/ML Research Engineer at HireFlow AI',
    body: `Dear Aris,

Thank you for speaking with our team earlier this week. We were deeply impressed by your published work on verifiable multi-agent reasoning and low-latency retrieval pipelines.

We would be thrilled to invite you to our Technical Deep Dive session with our VP of Applied Intelligence and Founding Engineers. The conversation will focus on autonomous agent architecture, deterministic guardrails, and production vector optimization.

You can select a time that fits your calendar through this private link, or let us know if you prefer specific times next week.

We look forward to diving into the details with you!

Warmly,
The HireFlow AI Engineering Team`,
    status: 'Draft',
    createdAt: '2026-10-03'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'AI Workflow Complete',
    message: 'Autonomous Recruiter Agent evaluated 38 candidates for Senior Full-Stack Engineer and generated 4 top recommendations.',
    type: 'agent',
    timestamp: '12m ago',
    read: false,
    actionTab: 'ai-recruiter'
  },
  {
    id: 'notif-2',
    title: 'Action Requires Approval',
    message: '2 interview invitation emails are queued and awaiting recruiter authorization before sending.',
    type: 'alert',
    timestamp: '35m ago',
    read: false,
    actionTab: 'emails'
  },
  {
    id: 'notif-3',
    title: 'Resume Analysis Completed',
    message: 'New resume parsed for Devon Gallagher. 86% match score calculated against Senior Full-Stack role.',
    type: 'success',
    timestamp: '1h ago',
    read: true,
    actionTab: 'candidates'
  },
  {
    id: 'notif-4',
    title: 'Interview Plan Generated',
    message: 'AI Interview Studio generated a Deep Dive evaluation rubric for Dr. Aris Thorne.',
    type: 'info',
    timestamp: '3h ago',
    read: true,
    actionTab: 'interviews'
  }
];

export const INITIAL_ANALYTICS: RecruitmentAnalytics = {
  totalApplications: 144,
  qualifiedCandidates: 62,
  averageMatchScore: 88.4,
  timeToShortlistDays: 1.2,
  timeToHireDays: 18.5,
  interviewConversionRate: 64.2,
  funnel: [
    { stage: 'Applications', count: 144, percentage: 100 },
    { stage: 'AI Screened', count: 112, percentage: 78 },
    { stage: 'Shortlisted', count: 42, percentage: 29 },
    { stage: 'Interviewed', count: 26, percentage: 18 },
    { stage: 'Offer Extended', count: 8, percentage: 6 },
    { stage: 'Hired', count: 6, percentage: 4 }
  ],
  sources: [
    { source: 'Direct Careers Portal', candidates: 54, hireRate: 18 },
    { source: 'AI Recruiter Sourced', candidates: 42, hireRate: 28 },
    { source: 'Employee Referrals', candidates: 28, hireRate: 36 },
    { source: 'LinkedIn Inbound', candidates: 20, hireRate: 12 }
  ],
  insights: [
    {
      id: 'ins-1',
      text: 'Candidates with strong Next.js and distributed systems experience progress 2.4x faster through technical screening rounds.',
      category: 'Velocity',
      impact: 'positive',
      metric: '2.4x Speed'
    },
    {
      id: 'ins-2',
      text: 'Your Senior Full-Stack role has high application volume (38) but a tighter shortlist threshold (90%+ match). 4 candidates ready for immediate interview dispatch.',
      category: 'Quality',
      impact: 'positive',
      metric: '4 Ready'
    },
    {
      id: 'ins-3',
      text: 'Average time from candidate upload to explainable match scoring decreased from 4 days to 4 minutes using autonomous processing.',
      category: 'Sourcing',
      impact: 'positive',
      metric: '98% Time Saved'
    },
    {
      id: 'ins-4',
      text: 'AI-generated personalized interview questions have improved technical interviewer satisfaction scores from 7.4 to 9.2 out of 10.',
      category: 'Conversion',
      impact: 'positive',
      metric: '+1.8 Rating'
    }
  ]
};

export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'node-job',
    label: 'Job Specification',
    category: 'job',
    x: 120,
    y: 120,
    description: 'Senior Full-Stack Engineer role requirements, stack constraints, and domain seniority targets.',
    connectedTo: ['node-skills', 'node-analysis'],
    metrics: { label: 'Active Role', value: 'Sr. Full-Stack' }
  },
  {
    id: 'node-skills',
    label: 'Skills Ontology',
    category: 'skill',
    x: 320,
    y: 80,
    description: 'Dynamic graph of required competencies: React 19, TypeScript, Distributed Systems, Kafka, and PostgreSQL.',
    connectedTo: ['node-job', 'node-resume', 'node-analysis'],
    metrics: { label: 'Verified Skills', value: '18 mapped' }
  },
  {
    id: 'node-candidate',
    label: 'Candidate Profile',
    category: 'candidate',
    x: 120,
    y: 340,
    description: 'Marcus Vance, 7 years professional experience, current Staff Engineer at Linear Labs.',
    connectedTo: ['node-resume', 'node-experience', 'node-analysis'],
    metrics: { label: 'Experience', value: '7 Years' }
  },
  {
    id: 'node-resume',
    label: 'Resume Parsing',
    category: 'resume',
    x: 310,
    y: 280,
    description: 'Multimodal document breakdown extracting verified contributions, career timeline, and project artifacts.',
    connectedTo: ['node-candidate', 'node-skills', 'node-experience', 'node-analysis'],
    metrics: { label: 'Extraction', value: '100% Parsed' }
  },
  {
    id: 'node-experience',
    label: 'Experience Vector',
    category: 'experience',
    x: 240,
    y: 460,
    description: 'Verifiable impact: 45M daily events handled, CRDT collaborative sync engine authored.',
    connectedTo: ['node-candidate', 'node-resume', 'node-analysis'],
    metrics: { label: 'Relevance', value: 'High' }
  },
  {
    id: 'node-analysis',
    label: 'AI Semantic Analysis',
    category: 'analysis',
    x: 520,
    y: 240,
    description: 'Deep neural semantic cross-matching between job requirements and demonstrated architectural capabilities.',
    connectedTo: ['node-job', 'node-skills', 'node-resume', 'node-experience', 'node-score'],
    metrics: { label: 'Model', value: 'Gemini 3.8' }
  },
  {
    id: 'node-score',
    label: 'Explainable Match Score',
    category: 'score',
    x: 720,
    y: 240,
    description: '94% Match: Technical Skills (96%), Experience (92%), Role Fit (95%), Project Relevance (93%). Zero protected demographic factors.',
    connectedTo: ['node-analysis', 'node-interview', 'node-decision'],
    metrics: { label: 'Score', value: '94% Match' }
  },
  {
    id: 'node-interview',
    label: 'Interview Studio',
    category: 'interview',
    x: 880,
    y: 130,
    description: 'Tailored 5-part evaluation rubric focusing on distributed state synchronization and event concurrency.',
    connectedTo: ['node-score', 'node-decision', 'node-email'],
    metrics: { label: 'Questions', value: 'Generated' }
  },
  {
    id: 'node-email',
    label: 'Automated Communication',
    category: 'email',
    x: 890,
    y: 380,
    description: 'Personalized shortlist invitation explaining specific project resonance. Recruiter human-in-the-loop approved.',
    connectedTo: ['node-score', 'node-decision', 'node-interview'],
    metrics: { label: 'Status', value: 'Approved' }
  },
  {
    id: 'node-decision',
    label: 'Recruiter Decision',
    category: 'decision',
    x: 1060,
    y: 250,
    description: 'Human talent partner validates AI recommendation and initiates hiring stage progression.',
    connectedTo: ['node-score', 'node-interview', 'node-email', 'node-hire'],
    metrics: { label: 'Action', value: 'Shortlisted' }
  },
  {
    id: 'node-hire',
    label: 'Target Hire',
    category: 'hire',
    x: 1220,
    y: 250,
    description: 'Successful, low-bias hire made with transparent justification, 4x faster hiring velocity.',
    connectedTo: ['node-decision'],
    metrics: { label: 'Outcome', value: 'Success' }
  }
];
