/**
 * Static portfolio data.
 * Single source of truth — every page reads from here.
 */

export const profile = {
  name: "Azahruddin Mohammad Hassan",
  title: "Full Stack JavaScript Developer",
  tagline: "I build scalable web apps where crafted frontends meet intelligent backends.",
  shortAbout:
    "Full Stack Developer from Lucknow shipping production web apps with React, Next.js, Node.js, MongoDB — and AI woven in with LangChain, LangGraph and OpenAI.",
  about:
    "I'm Azhar — a Full Stack JavaScript Developer with 2+ years of experience building production applications that serve real users. My work spans the whole stack: modern, animated frontends in React and Next.js; robust Node.js and Express backends with REST APIs, authentication and role-based access control; and MongoDB data layers tuned for scale.\n\nWhat sets my recent work apart is AI: I've integrated OpenAI, LangChain and LangGraph into real products — RAG pipelines, AI chatbots and intelligent features that users actually rely on. I've also shipped real-time systems with Socket.IO, queue-driven workloads with Redis and BullMQ, and integrated payments, streaming video, shipping and notifications into live platforms.\n\nI care about the details — clean architecture, fast interfaces, and code the next developer will thank me for.",
  resumeUrl: "/Azahruddin_Software_Engineer_Full_Stack_Developer.pdf",
  github: "https://github.com/azahruddin101",
  linkedin: "https://www.linkedin.com/in/azhar619",
  email: "azahruddin101@gmail.com",
  phone: "+91 6389655708",
  whatsapp: "https://wa.me/916389655708?text=Hi%20Azhar,%20I%20came%20across%20your%20portfolio",
  location: "Lucknow, Uttar Pradesh, India",
  availability: "Open to full-time roles & freelance projects",
  socialLinks: [
    { label: "WhatsApp", url: "https://wa.me/916389655708?text=Hi%20Azhar,%20I%20came%20across%20your%20portfolio", icon: "whatsapp" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/azhar619", icon: "linkedin" },
    { label: "Email", url: "mailto:azahruddin101@gmail.com", icon: "mail" },
    { label: "GitHub", url: "https://github.com/azahruddin101", icon: "github" },
  ],
  stats: [
    { label: "Years of experience", value: 2, suffix: "+" },
    { label: "Production projects", value: 4, suffix: "+" },
    { label: "Technologies mastered", value: 5, suffix: "+" },
    { label: "API integrations", value: 100, suffix: "+" },
  ],
  keywords: [
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "GenAI",
    "LangChain",
  ],
};

export const projects = [
  {
    title: "AstroBharat AI",
    slug: "astrobharat-ai",
    description:
      "AI-powered astrology, wellness and learning platform with live consultations, digital rituals and intelligent guidance.",
    longDescription:
      "AstroBharat AI is a production platform that blends traditional astrology with modern AI. I worked across the stack — building the modern frontend, integrating APIs, implementing authentication and dashboards, and developing backend services including the Digital Mandir experience and KYC management for astrologers.\n\nThe platform serves real users with AI-driven guidance powered by OpenAI, live audio/video consultations via Agora, and e-commerce fulfilment through Shiprocket.",
    features: [
      "AI-powered astrology guidance and chat built on OpenAI",
      "Live audio/video consultations with astrologers via Agora",
      "Digital Mandir — an immersive online ritual experience",
      "KYC onboarding and verification flow for astrologers",
      "Role-based dashboards for users, astrologers and admins",
      "Order fulfilment and shipping through Shiprocket",
    ],
    challenges: [
      "Coordinating real-time consultation state across users, astrologers and billing",
      "Keeping AI responses grounded, safe and context-aware for a spiritual audience",
      "Handling KYC document workflows with strict verification states",
    ],
    solutions: [
      "Modeled consultation sessions as explicit state machines backed by Redis",
      "Prompt-engineered guardrails and retrieval context for the AI guidance layer",
      "Built a stepwise KYC pipeline with resumable uploads and admin review queues",
    ],
    technologies: [
      "Next.js", "React", "Tailwind CSS", "Node.js", "Express.js", "MongoDB",
      "Redis", "OpenAI", "JWT", "Firebase Auth", "Agora", "Shiprocket",
    ],
    images: [],
    videos: [],
    github: "",
    liveDemo: "",
    category: "AI Platform",
    timeline: "2025 — Present",
    teamSize: "Product team",
    role: "Full Stack Developer",
    status: "In Production",
    featured: true,
    order: 1,
    accent: "#a35e47",
  },
  {
    title: "Estoriz OTT Platform",
    slug: "estoriz-ott",
    description:
      "Production-grade OTT platform with live streaming, VOD, multi-role management and advertisement systems.",
    longDescription:
      "Estoriz is a full OTT product: live streaming, video-on-demand, advertisement management and content workflows across multiple user roles. I built major parts of the React admin panel and backend services, including the KYC module and the Digital Mandir service.\n\nVideo delivery runs on MUX with Redis-backed caching keeping browse and playback surfaces fast under load.",
    features: [
      "Live streaming and video-on-demand via MUX",
      "Multi-role management — admins, creators, viewers",
      "Advertisement management and placement engine",
      "Content management workflows with review states",
      "KYC verification module for creators",
    ],
    challenges: [
      "Streaming reliability and playback analytics at production scale",
      "Modeling many user roles with distinct permissions over shared content",
    ],
    solutions: [
      "Leveraged MUX webhooks with idempotent processors for asset lifecycle",
      "Centralized RBAC middleware so every route declares its permission needs",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "MUX", "Redis"],
    images: [],
    videos: [],
    github: "",
    liveDemo: "",
    category: "OTT / Streaming",
    timeline: "2024 — 2025",
    teamSize: "Product team",
    role: "Full Stack Developer",
    status: "In Production",
    featured: true,
    order: 2,
    accent: "#8a6a5a",
  },
  {
    title: "CNews",
    slug: "cnews",
    description:
      "Multi-role news platform with publishing workflows, AI assistance and scheduled automation.",
    longDescription:
      "CNews is a newsroom platform supporting Admins, Reporters, Editors and readers — each with their own workflows. Articles move through a publishing pipeline with editorial review, AI-assisted drafting via OpenAI, and cron-driven scheduled publishing.\n\nBuilt on the MERN stack with a role-aware admin dashboard at its center.",
    features: [
      "Role-based publishing workflow: Reporter → Editor → Admin",
      "AI-assisted writing and summarization with OpenAI",
      "Scheduled publishing and housekeeping via cron jobs",
      "Authentication with JWT and per-role dashboards",
    ],
    challenges: [
      "Encoding an editorial approval chain without blocking writers",
      "Publishing content on schedule reliably",
    ],
    solutions: [
      "Draft/review/publish states with per-role transition rules",
      "Idempotent cron tasks with run-locking to prevent double publishing",
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "OpenAI", "Cron"],
    images: [],
    videos: [],
    github: "",
    liveDemo: "",
    category: "Full Stack",
    timeline: "2024",
    teamSize: "Small team",
    role: "Full Stack Developer",
    status: "Completed",
    featured: true,
    order: 3,
    accent: "#7d5c44",
  },
  {
    title: "BuildMyCV",
    slug: "buildmycv",
    description:
      "Online resume builder that turns structured input into polished, recruiter-ready resumes.",
    longDescription:
      "BuildMyCV is a live resume-building product — structured editing, clean templates and instant output, built for speed and simplicity. Live at buildmycv.in.",
    features: [
      "Structured resume editor with live preview",
      "Clean, ATS-friendly templates",
      "Instant export flow",
    ],
    challenges: ["Keeping the editing experience fast and forgiving for non-technical users"],
    solutions: ["Optimistic UI state with autosave and undo-friendly editing"],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    images: [],
    videos: [],
    github: "",
    liveDemo: "https://buildmycv.in",
    category: "Product",
    timeline: "2025",
    teamSize: "Solo / small team",
    role: "Full Stack Developer",
    status: "In Production",
    featured: true,
    order: 4,
    accent: "#5d7250",
  },
];

export const minorProjects = [
  {
    title: "Video Streaming Pipeline",
    description: "Built a video streaming backend with Node.js, Express.js, MongoDB, BullMQ, Redis, and FFmpeg, supporting HLS adaptive streaming and multi-resolution video processing.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Redis", "FFMPEG"],
    github: "https://github.com/azahruddin101/nodejs-video-streaming-hls-ffmpeg",
    demo: "",
    image: "",
    order: 1,
  },
  {
  title: "AI-Powered Cinema & Mall Analytics",

  description: "MERN-based cinema and mall management system with AI-driven sales analysis, stock forecasting, and a RAG chatbot for spending and movie ticket insights.",

  techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "LangChain", "RAG", "OpenAI"],

  github: "",

  demo: "",

  image: "",

  order: 2,
},
  {
  title: "AI Competitor Intelligence Tool",

  description: "Built an AI-powered tool that analyzes cinema competitors across social media and websites, identifies trends, and suggests mall events, themes, and social media content ideas.",

  techStack: ["Node.js", "Puppeteer", "Apify", "LangChain", "OpenAI"],

  github: "",

  demo: "",

  image: "",

  order: 3,
},
{
  title: "Arogyam",

  description: "Built a comprehensive Ayurveda platform combining doctor consultations, e-commerce, e-learning, and short-form educational content for Ayurveda.",

  techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],

  github: "",

  demo: "",

  image: "",

  order: 4,
},
{
  title: "Quick Commerce Platform [Working]",

  description: "Built a full-stack quick commerce platform with location-based store access, real-time delivery tracking, inventory management, role-based dashboards, and race-condition-safe order processing.",

  techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "Expo"],

  github: "",

  demo: "",

  image: "",

  order: 5,
}
];

export const skillCategories = [
  {
    title: "Frontend",
    icon: "layout",
    order: 1,
    skills: [
      { name: "React.js", level: 92, note: "Component architecture, hooks, performance" },
      { name: "Next.js", level: 88, note: "App Router, SSR, API routes" },
      { name: "JavaScript (ES6+)", level: 92, note: "" },
      { name: "Tailwind CSS", level: 90, note: "" },
      { name: "Material UI", level: 82, note: "" },
      { name: "GSAP", level: 78, note: "ScrollTrigger, timelines" },
      { name: "Zustand", level: 84, note: "" },
      { name: "TanStack Query", level: 82, note: "" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    order: 2,
    skills: [
      { name: "Node.js", level: 88, note: "" },
      { name: "Express.js", level: 88, note: "" },
      { name: "REST API Design", level: 88, note: "" },
      { name: "JWT / RBAC", level: 86, note: "Auth & role-based access" },
      { name: "Socket.IO", level: 80, note: "Real-time communication" },
      { name: "Redis", level: 78, note: "Caching & sessions" },
      { name: "BullMQ", level: 72, note: "Queues & background jobs" },
    ],
  },
  {
    title: "Database",
    icon: "database",
    order: 3,
    skills: [
      { name: "MongoDB", level: 88, note: "" },
      { name: "Mongoose", level: 88, note: "" },
      { name: "Redis", level: 70, note: "Learning" },
    ],
  },
  {
    title: "AI / GenAI",
    icon: "sparkles",
    order: 4,
    skills: [
      { name: "OpenAI API", level: 85, note: "" },
      { name: "LangChain", level: 80, note: "" },
      { name: "LangGraph", level: 74, note: "" },
      { name: "RAG Pipelines", level: 80, note: "" },
      { name: "Prompt Engineering", level: 85, note: "" },
      { name: "AI Chatbots", level: 84, note: "" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "wrench",
    order: 5,
    skills: [
      { name: "Git / GitHub", level: 88, note: "" },
      { name: "GitLab CI/CD", level: 72, note: "" },
      { name: "AWS", level: 20, note: "EC2 Deployment" },
      { name: "Vercel", level: 84, note: "" },
      { name: "Postman", level: 88, note: "" },
      { name: "Vite", level: 84, note: "" },
    ],
  },
];

export const minorSkills = [
  { name: "Axios", category: "Frontend", order: 1 },
  { name: "React Hook Form", category: "Frontend", order: 2 },
  { name: "Framer Motion", category: "Frontend", order: 3 },
  { name: "JWT", category: "Backend", order: 4 },
  { name: "RBAC", category: "Backend", order: 5 },
  { name: "BullMQ", category: "Backend", order: 6 },
  { name: "Redis", category: "Backend", order: 7 },
  { name: "Socket.IO", category: "Backend", order: 8 },
  { name: "Cron Jobs", category: "Backend", order: 9 },
  { name: "REST APIs", category: "Backend", order: 10 },
  { name: "Agora", category: "Services", order: 11 },
  { name: "Shiprocket", category: "Services", order: 12 },
  { name: "MUX", category: "Services", order: 13 },
  { name: "OneSignal", category: "Services", order: 14 },
  { name: "Razorpay", category: "Services", order: 15 },
  { name: "Vector Search", category: "AI", order: 16 },
  { name: "Git", category: "Tools", order: 17 },
  { name: "GitHub", category: "Tools", order: 18 },
  { name: "npm", category: "Tools", order: 19 },
  { name: "VS Code", category: "Tools", order: 20 },
];

export const learning = [
  {
    skill: "TypeScript",
    progress: 55,
    category: "Language",
    startedDate: "2026-03-01",
    description: "Typed patterns for React and Node codebases.",
    order: 1,
  },
  {
    skill: "React Native + Expo",
    progress: 40,
    category: "Mobile",
    startedDate: "2026-04-01",
    description: "Bringing JavaScript skills to mobile apps.",
    order: 2,
  },
  {
    skill: "System Design",
    progress: 45,
    category: "Architecture",
    startedDate: "2026-01-01",
    description: "Scalability, caching strategies and distributed systems.",
    order: 5,
  },
  {
    skill: "DSA",
    progress: 40,
    category: "Fundamentals",
    startedDate: "2026-01-01",
    description: "Sharpening problem-solving depth.",
    order: 6,
  },
  {
    skill: "DevOps",
    progress: 35,
    category: "Infrastructure",
    startedDate: "2026-05-01",
    description: "CI/CD pipelines, containers and deployment automation.",
    order: 7,
  },
];

export const experience = [
  {
    company: "Venture Consultancy Services",
    role: "Full Stack Developer",
    type: "work",
    location: "Lucknow, India",
    startDate: "2025-07-19",
    endDate: null,
    current: true,
    description:
      "Building and shipping production platforms — AstroBharat AI and Estoriz OTT — across frontend, backend and AI integrations.",
    highlights: [
      "Developed AI features with OpenAI, LangChain and RAG pipelines",
      "Built real-time consultation and streaming flows (Agora, MUX, Socket.IO)",
      "Implemented JWT auth, RBAC and KYC verification modules",
      "Integrated Razorpay payments, Shiprocket logistics and OneSignal notifications",
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Redis", "OpenAI"],
    order: 1,
  }
];
