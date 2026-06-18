import type { PortfolioConfig } from "@/types/portfolio";

export const portfolioConfig: PortfolioConfig = {
  profile: {
    name: "Sudhanshu Singh",
    className: "Software Engineer",
    level: 42,
    title: "Software Engineer | Backend Developer | AI Enthusiast",
    mission: "Become an AI Engineer and build impactful products.",
    location: "India",
    email: "sudhanshu.sde@gmail.com",
    resume: {
      title: "Sudhanshu Singh Resume",
      url: "/resume.pdf"
    },
    xp: 78,
    stats: [
      { label: "Backend Engineering", value: 92 },
      { label: "AI Engineering", value: 82 },
      { label: "Problem Solving", value: 90 },
      { label: "System Design", value: 76 },
      { label: "Frontend", value: 72 },
      { label: "DevOps", value: 68 }
    ],
    socials: [
      { label: "GitHub", href: "https://github.com/sudhanshu", icon: "Github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanshu", icon: "Linkedin" },
      { label: "Email", href: "mailto:sudhanshu.sde@gmail.com", icon: "Mail" }
    ]
  },
  bootModules: [
    "Backend Systems",
    "AI Systems",
    "Competitive Programming",
    "Projects Database",
    "Experience Logs",
    "Mission Archive"
  ],
  skills: [
    {
      title: "Backend",
      nodes: [
        { name: "Java", level: 92, unlocked: true, detail: "Production-grade backend language for APIs and services." },
        { name: "Spring Boot", level: 88, unlocked: true, detail: "REST APIs, service layers, validation, and modular applications." },
        { name: "Hibernate", level: 78, unlocked: true, detail: "ORM modeling, persistence, and database interaction." },
        { name: "JPA", level: 80, unlocked: true, detail: "Repository-driven data access and domain persistence." },
        { name: "REST APIs", level: 90, unlocked: true, detail: "Versioned, secure, documented API design." },
        { name: "Microservices", level: 72, unlocked: true, detail: "Service boundaries, resilience, and integration patterns." }
      ]
    },
    {
      title: "AI",
      nodes: [
        { name: "OpenAI", level: 80, unlocked: true, detail: "LLM-powered product features and assistant experiences." },
        { name: "OpenRouter", level: 74, unlocked: true, detail: "Multi-model routing and experimentation." },
        { name: "LangChain", level: 70, unlocked: true, detail: "Chains, tools, memory, and retrieval workflows." },
        { name: "AI Agents", level: 72, unlocked: true, detail: "Task decomposition and tool-using assistants." },
        { name: "RAG", level: 76, unlocked: true, detail: "Retrieval over structured and unstructured knowledge." },
        { name: "Prompt Engineering", level: 84, unlocked: true, detail: "Reliable prompts, evaluation loops, and guardrails." }
      ]
    },
    {
      title: "Programming",
      nodes: [
        { name: "Java", level: 92, unlocked: true, detail: "Primary language for DSA and backend systems." },
        { name: "Python", level: 78, unlocked: true, detail: "Automation, AI experiments, and scripting." },
        { name: "C++", level: 76, unlocked: true, detail: "Competitive programming and algorithmic problem solving." },
        { name: "JavaScript", level: 78, unlocked: true, detail: "Interactive applications and frontend logic." },
        { name: "TypeScript", level: 80, unlocked: true, detail: "Typed React and scalable web applications." }
      ]
    },
    {
      title: "Infrastructure",
      nodes: [
        { name: "Docker", level: 70, unlocked: true, detail: "Containerized local and production workflows." },
        { name: "Linux", level: 72, unlocked: true, detail: "Shell workflows, deployments, and debugging." },
        { name: "Git", level: 86, unlocked: true, detail: "Branching, reviews, and collaborative development." },
        { name: "CI/CD", level: 66, unlocked: true, detail: "Automated checks and release pipelines." }
      ]
    },
    {
      title: "Frontend",
      nodes: [
        { name: "React", level: 78, unlocked: true, detail: "Composable interfaces and stateful experiences." },
        { name: "Next.js", level: 80, unlocked: true, detail: "App Router, SEO, performance, and full-stack UI." },
        { name: "Tailwind CSS", level: 82, unlocked: true, detail: "Fast, responsive, themeable interface systems." }
      ]
    }
  ],
  projects: [
    {
      name: "SudhanshuGPT Portfolio Agent",
      description: "Retrieval-powered AI assistant that answers recruiter questions from structured portfolio data.",
      technologies: ["Next.js", "TypeScript", "RAG-ready Architecture", "Tailwind"],
      github: "https://github.com/sudhanshu/sudhanshugpt",
      demo: "https://sudhanshu-os.vercel.app",
      screenshots: [],
      features: ["Knowledge retrieval", "Suggested prompts", "Portable provider interface", "Contextual answers"],
      status: "Completed",
      difficulty: "Legendary",
      category: "AI"
    },
    {
      name: "Backend Mission Control",
      description: "Spring Boot service blueprint for secure APIs, persistence, validation, and observability.",
      technologies: ["Java", "Spring Boot", "JPA", "Docker"],
      github: "https://github.com/sudhanshu/backend-mission-control",
      demo: "https://github.com/sudhanshu/backend-mission-control",
      screenshots: [],
      features: ["REST APIs", "Layered architecture", "DTO validation", "Docker-ready setup"],
      status: "Completed",
      difficulty: "Hard",
      category: "Backend"
    },
    {
      name: "AI Research Console",
      description: "Experimental lab for prompts, model routing, and agent-style workflow prototypes.",
      technologies: ["OpenAI", "OpenRouter", "LangChain", "Python"],
      github: "https://github.com/sudhanshu/ai-research-console",
      demo: "https://github.com/sudhanshu/ai-research-console",
      screenshots: [],
      features: ["Prompt tests", "Model comparisons", "Tool calls", "RAG experiments"],
      status: "In Progress",
      difficulty: "Hard",
      category: "AI"
    },
    {
      name: "Portfolio RPG Engine",
      description: "A game-like portfolio system that renders career data as missions, arenas, and skill trees.",
      technologies: ["Next.js", "Framer Motion", "GSAP", "React Three Fiber"],
      github: "https://github.com/sudhanshu/portfolio-rpg",
      demo: "https://sudhanshu-os.vercel.app",
      screenshots: [],
      features: ["Boot sequence", "Cyber city", "Skill tree", "Achievement unlocks"],
      status: "Completed",
      difficulty: "Legendary",
      category: "Full Stack"
    }
  ],
  achievements: [
    { title: "LeetCode Knight", description: "Consistent problem solving across algorithms and data structures." },
    { title: "Codeforces Pupil", description: "Competitive programming rank unlocked through contest participation." },
    { title: "CodeChef 3 Star", description: "Ranked programming performance in timed contests." },
    { title: "NPTEL Top 2%", description: "Placed in the top percentile for an NPTEL certification." },
    { title: "District Topper", description: "Academic excellence milestone unlocked during school journey." }
  ],
  codingProfiles: [
    { platform: "GitHub", username: "sudhanshu", rating: "Open Source", rank: "Builder", stats: "Projects, commits, experiments", href: "https://github.com/sudhanshu" },
    { platform: "LeetCode", username: "sudhanshu", rating: "Knight", rank: "Algorithm Arena", stats: "DSA practice and contests", href: "https://leetcode.com/u/sudhanshu" },
    { platform: "Codeforces", username: "sudhanshu", rating: "Pupil", rank: "Contest Division", stats: "Rated rounds and problem sets", href: "https://codeforces.com/profile/sudhanshu" },
    { platform: "CodeChef", username: "sudhanshu", rating: "3 Star", rank: "Rated Coder", stats: "Long and short contests", href: "https://www.codechef.com/users/sudhanshu" },
    { platform: "AtCoder", username: "sudhanshu", rating: "Active", rank: "Training", stats: "Algorithm practice", href: "https://atcoder.jp/users/sudhanshu" }
  ],
  experience: [
    {
      year: "2025",
      role: "Software Engineer",
      company: "Bellpost",
      objectives: ["Backend Development", "API Design", "Feature Development", "System Improvements"]
    }
  ],
  education: [
    { stage: "Stage 1: Matriculation", institution: "School Board", result: "Strong academic foundation", year: "Completed" },
    { stage: "Stage 2: Intermediate", institution: "Science Stream", result: "District Topper milestone", year: "Completed" },
    { stage: "Stage 3: B.Tech", institution: "Engineering Program", result: "Software engineering path", year: "Completed" }
  ],
  interests: [
    { name: "Artificial Intelligence", signal: "Model-powered products" },
    { name: "Agentic AI", signal: "Autonomous workflows" },
    { name: "Distributed Systems", signal: "Reliable scale" },
    { name: "Backend Engineering", signal: "APIs and services" },
    { name: "Open Source", signal: "Shared tools" },
    { name: "Problem Solving", signal: "Algorithms" },
    { name: "System Design", signal: "Architecture" },
    { name: "Startups", signal: "Impact velocity" }
  ],
  world: {
    buildings: [
      { id: "experience", name: "Bellpost Tower", section: "Experience Logs", description: "Mission history and engineering objectives.", icon: "Building2" },
      { id: "education", name: "Education Center", section: "Education Journey", description: "Unlocked academic stages.", icon: "GraduationCap" },
      { id: "ai", name: "AI Research Lab", section: "Project Archive", description: "AI missions and experiments.", icon: "Bot" },
      { id: "skills", name: "Engineering Workshop", section: "Skill Tree", description: "Unlocked engineering abilities.", icon: "Wrench" },
      { id: "arena", name: "Arena", section: "Achievements Arena", description: "Competitive profiles and trophies.", icon: "Trophy" },
      { id: "projects", name: "Project Archive", section: "Project Archive", description: "Mission cards and build records.", icon: "FolderArchive" },
      { id: "contact", name: "Communication Hub", section: "Contact Terminal", description: "Secure recruiter transmission.", icon: "Mail" }
    ]
  },
  assistant: {
    greeting: "SudhanshuGPT online. I represent Sudhanshu Singh inside SudhanshuOS. Ask me about his work, projects, skills, achievements, education, resume, or contact details.",
    suggestedQuestions: [
      "Tell me about Sudhanshu",
      "Show AI projects",
      "Tell me about his experience at Bellpost",
      "Where can I download his resume?"
    ]
  }
};
