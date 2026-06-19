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
      url: "https://drive.google.com/file/d/14bSyO7rrS7SSI-cxukZBhrPFn-xeok-Y/view"
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
      { label: "GitHub", href: "https://github.com/Sudhanshusingh1182", icon: "Github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhanshusingh3", icon: "Linkedin" },
      { label: "X", href: "https://x.com/SudhanshuS1182", icon: "Twitter" },
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
        {
          name: "Java", level: 92, unlocked: true, detail: "Production-grade backend language for APIs and services.",
          children: [
            { name: "Spring Boot", level: 88, unlocked: true, detail: "REST APIs, service layers, validation, and modular applications." },
            { name: "Hibernate", level: 78, unlocked: true, detail: "ORM modeling, persistence, and database interaction." },
            { name: "JPA", level: 80, unlocked: true, detail: "Repository-driven data access and domain persistence." }
          ]
        },
        {
          name: "APIs", level: 90, unlocked: true, detail: "Versioned, secure, documented API design.",
          children: [
            { name: "REST", level: 90, unlocked: true, detail: "Resource-oriented API architecture and best practices." },
            { name: "GraphQL", level: 62, unlocked: true, detail: "Query language for flexible data fetching." },
            { name: "JWT", level: 78, unlocked: true, detail: "Token-based authentication and authorization." }
          ]
        },
        { name: "Microservices", level: 72, unlocked: true, detail: "Service boundaries, resilience, and integration patterns." },
        { name: "FastAPI", level: 65, unlocked: true, detail: "Modern Python framework for high-performance APIs." }
      ]
    },
    {
      title: "AI",
      nodes: [
        {
          name: "LLM Integration", level: 84, unlocked: true, detail: "Integrating large language models into products.",
          children: [
            { name: "OpenAI", level: 80, unlocked: true, detail: "LLM-powered product features and assistant experiences." },
            { name: "OpenRouter", level: 74, unlocked: true, detail: "Multi-model routing and experimentation." },
            { name: "LangChain", level: 70, unlocked: true, detail: "Chains, tools, memory, and retrieval workflows." }
          ]
        },
        {
          name: "AI Agents", level: 72, unlocked: true, detail: "Task decomposition and tool-using assistants.",
          children: [
            { name: "Agent Architecture", level: 70, unlocked: true, detail: "Planning, memory, and tool-use patterns." },
            { name: "RAG", level: 76, unlocked: true, detail: "Retrieval over structured and unstructured knowledge." }
          ]
        },
        { name: "Prompt Engineering", level: 84, unlocked: true, detail: "Reliable prompts, evaluation loops, and guardrails." }
      ]
    },
    {
      title: "Programming",
      nodes: [
        {
          name: "Java", level: 92, unlocked: true, detail: "Primary language for DSA and backend systems.",
          children: [
            { name: "OOP", level: 90, unlocked: true, detail: "Object-oriented design patterns and principles." },
            { name: "DSA", level: 88, unlocked: true, detail: "Data structures and algorithmic problem solving." }
          ]
        },
        { name: "Python", level: 78, unlocked: true, detail: "Automation, AI experiments, and scripting." },
        { name: "C++", level: 76, unlocked: true, detail: "Competitive programming and algorithmic problem solving." },
        {
          name: "JavaScript", level: 78, unlocked: true, detail: "Interactive applications and frontend logic.",
          children: [
            { name: "TypeScript", level: 80, unlocked: true, detail: "Typed React and scalable web applications." }
          ]
        }
      ]
    },
    {
      title: "Infrastructure",
      nodes: [
        {
          name: "Docker", level: 70, unlocked: true, detail: "Containerized local and production workflows.",
          children: [
            { name: "Docker Compose", level: 68, unlocked: true, detail: "Multi-container orchestration for local dev." },
            { name: "Containerization", level: 70, unlocked: true, detail: "Building and optimizing container images." }
          ]
        },
        { name: "Linux", level: 72, unlocked: true, detail: "Shell workflows, deployments, and debugging." },
        { name: "Git", level: 86, unlocked: true, detail: "Branching, reviews, and collaborative development." },
        {
          name: "AWS", level: 70, unlocked: true, detail: "Cloud infrastructure and AI/ML services.",
          children: [
            { name: "Personalize", level: 65, unlocked: true, detail: "Real-time personalization and recommendation engine." },
            { name: "S3", level: 72, unlocked: true, detail: "Object storage for data lakes and static assets." },
            { name: "Kinesis", level: 60, unlocked: true, detail: "Real-time streaming data ingestion and processing." },
            { name: "Lambda", level: 68, unlocked: true, detail: "Serverless compute for event-driven workflows." },
            { name: "SQS", level: 64, unlocked: true, detail: "Managed message queuing for decoupled services." },
            { name: "SNS", level: 62, unlocked: true, detail: "Pub/sub notifications and event fan-out patterns." },
            { name: "EC2", level: 70, unlocked: true, detail: "Virtual server provisioning and infrastructure scaling." }
          ]
        },
        {
          name: "CI/CD", level: 66, unlocked: true, detail: "Automated checks and release pipelines.",
          children: [
            { name: "GitHub Actions", level: 68, unlocked: true, detail: "Workflow automation and CI pipelines." }
          ]
        }
      ]
    },
    {
      title: "Frontend",
      nodes: [
        {
          name: "React", level: 78, unlocked: true, detail: "Composable interfaces and stateful experiences.",
          children: [
            { name: "Next.js", level: 80, unlocked: true, detail: "App Router, SEO, performance, and full-stack UI." },
            { name: "Framer Motion", level: 76, unlocked: true, detail: "Declarative animations and gesture handling." }
          ]
        },
        { name: "Tailwind CSS", level: 82, unlocked: true, detail: "Fast, responsive, themeable interface systems." },
        { name: "Three.js", level: 60, unlocked: true, detail: "3D graphics and interactive WebGL experiences." }
      ]
    }
  ],
  projects: [
    {
      name: "Wallet-Based Payment Gateway System",
      description: "Created a Java Spring Boot microservices system with an API Gateway handling routing, authentication, and rate limiting, backed by User, Wallet, Transaction, Reward, and Notification services. Implemented secure REST APIs using Spring Security with stateless access control across services. Executed a SAGA-based transactional money flow with holds, capture, release, refunds, and compensating actions to handle failures and maintain data consistency. Integrated asynchronous communication using Kafka for event-driven workflows.",
      technologies: ["Java", "Spring Boot", "Kafka", "Redis", "Spring Security", "Microservices"],
      github: "https://github.com/Sudhanshusingh1182/paypal-clone-walletms",
      demo: "",
      screenshots: [],
      features: ["SAGA-based transactional money flow", "API Gateway with rate limiting", "Kafka event-driven architecture", "Spring Security with stateless JWT", "Compensating actions for failure handling"],
      status: "Completed",
      difficulty: "Legendary",
      category: "Backend"
    },
    {
      name: "Hospital Management System",
      description: "Created an end-to-end hospital management system with CRUD functionalities and proper role-based access controls.",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT"],
      github: "https://github.com/Sudhanshusingh1182/hospital_management_system_backend",
      demo: "",
      screenshots: [],
      features: ["Role-based access control", "CRUD operations", "RESTful API design", "Patient record management"],
      status: "Completed",
      difficulty: "Medium",
      category: "Backend"
    },
    {
      name: "Sensai",
      description: "An AI career coach that helps users upskill in a selected domain. Provides quizzes with answer explanations, identifies areas to improve, enables resume and cover letter creation and editing, and delivers salary trends and market insights updated every 7 days.",
      technologies: ["Next.js", "Inngest", "Gemini API", "Clerk", "TypeScript"],
      github: "https://github.com/Sudhanshusingh1182/sensai",
      demo: "https://sensai-ochre.vercel.app/",
      screenshots: [],
      features: ["AI-powered career coaching", "Quiz with answer explanations", "Resume and cover letter builder", "Salary and market trend insights", "Weekly skill demand updates"],
      status: "Completed",
      difficulty: "Hard",
      category: "AI"
    },
    {
      name: "Assessly",
      description: "Built a full-stack AI chatbot generator using Next.js and Gemini AI, enabling users to design, customize, and integrate context-aware chatbots into third-party websites via shareable links. Engineered a secure, multi-tenant architecture for seamless third-party website integration.",
      technologies: ["Next.js", "Gemini AI", "Clerk", "TypeScript", "Tailwind"],
      github: "https://github.com/Sudhanshusingh1182/Assessly-",
      demo: "https://assessly.vercel.app/",
      screenshots: [],
      features: ["AI chatbot generator", "Context-aware responses", "Shareable link integration", "Multi-tenant architecture", "Customizable chatbot design"],
      status: "Completed",
      difficulty: "Hard",
      category: "AI"
    },
    {
      name: "Boltt",
      description: "An AI-powered SaaS that builds websites using natural language prompts.",
      technologies: ["Next.js", "Stripe", "Gemini AI", "TypeScript", "Tailwind"],
      github: "https://github.com/Sudhanshusingh1182/boltt",
      demo: "https://boltt-mu.vercel.app/",
      screenshots: [],
      features: ["AI website generation", "Stripe payment integration", "SaaS subscription model", "Prompt-based UI builder"],
      status: "Completed",
      difficulty: "Hard",
      category: "AI"
    },
    {
      name: "Learning Management System",
      description: "A full-stack application with role-based access controls where instructors can perform CRUD operations on courses and students can purchase courses. Integrated analytics for tracking course performance.",
      technologies: ["Node.js", "React.js", "MongoDB", "Express.js", "JWT"],
      github: "https://github.com/Sudhanshusingh1182/learning_management_system",
      demo: "https://learning-management-system-qlcr.onrender.com",
      screenshots: [],
      features: ["Role-based access control", "Course CRUD for instructors", "Student course purchases", "Performance analytics dashboard", "Secure authentication"],
      status: "Completed",
      difficulty: "Hard",
      category: "Full Stack"
    },
    {
      name: "Chat Application",
      description: "Built a real-time chat application using WebSockets in Node.js with a React frontend.",
      technologies: ["Node.js", "React.js", "Socket.io", "Express.js"],
      github: "https://github.com/Sudhanshusingh1182/mern-chat-application",
      demo: "https://mern-chat-application-d046.onrender.com",
      screenshots: [],
      features: ["Real-time messaging via WebSockets", "React frontend", "Node.js backend", "User authentication"],
      status: "Completed",
      difficulty: "Medium",
      category: "Full Stack"
    },
    {
      name: "Code Editor",
      description: "A React-based code editor for HTML, CSS, and JavaScript with live linting and preview.",
      technologies: ["React.js", "JavaScript", "CSS", "HTML"],
      github: "https://github.com/Sudhanshusingh1182/Code-Editor-",
      demo: "https://code-editor-8cyb.onrender.com/",
      screenshots: [],
      features: ["Live code editing", "HTML/CSS/JS preview", "Linting integration", "Real-time output rendering"],
      status: "Completed",
      difficulty: "Medium",
      category: "Frontend"
    }
  ],
  achievements: [
    {
      title: "LeetCode Knight",
      description: "Consistent problem solving across algorithms and data structures. Solved 700+ problems with active contest participation.",
      date: "2024"
    },
    {
      title: "CodeChef 3 Star",
      description: "Ranked programming performance in timed contests with consistent Division 2 and Division 3 performances.",
      date: "2024"
    },
    {
      title: "NPTEL Top 2%",
      description: "Placed in the top 2 percentile nationally for the NPTEL certification in Python course.",
      date: "2023"
    },
    {
      title: "District Topper",
      description: "Academic excellence milestone unlocked during school journey with 98% in CBSE Class 10 board examinations.",
      date: "2019"
    },
    {
      title: "Codeforces Specialist",
      description: "Achieved Specialist rating on Codeforces through consistent contest participation and problem solving.",
      date: "2025"
    }
  ],
  codingProfiles: [
    { platform: "GitHub", username: "Sudhanshusingh1182", rating: "35 Repositories", rank: "Active Builder", stats: "35+ repositories with active contributions", href: "https://github.com/Sudhanshusingh1182" },
    { platform: "LeetCode", username: "sudhanshu1182", rating: "Knight", rank: "Algorithm Arena", stats: "700+ problems solved", href: "https://leetcode.com/u/sudhanshu1182" },
    { platform: "Codeforces", username: "sudhanshu_singh1182", rating: "Specialist", rank: "Contest Division", stats: "500+ problems solved", href: "https://codeforces.com/profile/sudhanshu_singh1182" },
    { platform: "CodeChef", username: "sudhanshu_1182", rating: "3 Star", rank: "Rated Coder", stats: "Regular contest participant", href: "https://www.codechef.com/users/sudhanshu_1182" },
    { platform: "AtCoder", username: "sudhanshu_s1182", rating: "5 Kyu", rank: "Competitive Programmer", stats: "Active problem solver", href: "https://atcoder.jp/users/sudhanshu_s1182" }
  ],
  experience: [
    {
      year: "Sept 2025 — Present",
      role: "Software Engineer",
      company: "Bellpost",
      summary: "Engineer scalable backend systems and AI-driven pipelines for enterprise applications at Bellpost.",
      objectives: ["Contact Acquisition Pipeline", "AI Content Generation", "Payment Integrations", "Search Infrastructure"],
      skills: ["Java", "Spring Boot", "AWS Kinesis", "AWS Lambda", "Razorpay", "Algolia", "Claude AI", "Redis", "Kafka"],
      projects: ["Contact Acquisition Pipeline", "AI Content Orchestration", "Sitemap Generation Engine", "Retailer Payout System", "Algolia Indexing Pipeline"],
      contributions: [
        "Engineered a contact acquisition pipeline using Java and Spring Boot, automating fetching and processing of stakeholder details for a 10,000+ contact outreach campaign",
        "Pioneered an AI content-generation orchestration pipeline integrating Claude, RunwayML, and Heygen, increasing content throughput by 3x via webhook-driven async processing",
        "Integrated Delhivery and Razorpay into core backend workflows, enabling automated onboarding and seamless webhook processing for operational events",
        "Devised sitemap generation tied to content updates, keeping 1,000+ URLs available for search crawlers",
        "Streamlined retailer payouts and payment capture via Razorpay APIs, processing hundreds of weekly transactions",
        "Designed an async message-queue-driven Algolia indexing pipeline for near-real-time search updates across 10k+ records"
      ]
    },
    {
      year: "Mar 2025 — Sept 2025",
      role: "Software Engineering Intern",
      company: "Bellpost",
      summary: "Developed high-throughput event ingestion pipelines and AI-powered recommendation systems.",
      objectives: ["Event Ingestion", "Recommendation Engine", "REST API Development", "Performance Optimization"],
      skills: ["AWS Kinesis", "AWS API Gateway", "AWS Lambda", "Spring Boot", "Amazon Personalize", "Redis", "S3", "Java"],
      projects: ["Event Ingestion Pipeline", "Personalized Recommendation Engine", "Async Data Processing Pipelines"],
      contributions: [
        "Developed a high-throughput real-time event ingestion pipeline handling 1M+ events daily with <100ms latency using AWS Kinesis, API Gateway, and Lambda",
        "Designed and implemented a personalized recommendation engine with Spring Boot and Amazon Personalize, processing event data from AWS S3",
        "Developed and deployed 5+ core REST APIs and multiple async data processing pipelines using Redis caching and distributed locking for performance optimization"
      ]
    }
  ],
  education: [
    {
      stage: "B.Tech in Electronics & Communication Engineering",
      institution: "National Institute of Technology Patna",
      result: "CGPA 8.37 / 10",
      year: "2021 — 2025",
      achievements: ["NPTEL Top 2%"],
      highlights: ["Active in coding events", "Built full-stack projects", "Competitive programming enthusiast"]
    },
    {
      stage: "Intermediate (XII) — CBSE",
      institution: "B.L. Indo Anglian Public School",
      result: "94.2% — School Topper",
      year: "2021",
      achievements: ["School Topper", "Best Student Award"],
      highlights: ["Science stream", "Computer Science focus", "Topped the school"]
    },
    {
      stage: "Matriculation (X) — CBSE",
      institution: "St. Ignatius School",
      result: "98% — District Topper",
      year: "2019",
      achievements: ["District Topper"],
      highlights: ["98% marks", "Topped the district", "Academic excellence"]
    }
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
      { id: "experience", name: "Experience Nexus", section: "Career Logs", description: "Professional journey and engineering milestones.", icon: "Building2" },
      { id: "education", name: "Knowledge Hub", section: "Education Journey", description: "Academic achievements and learning path.", icon: "GraduationCap" },
      { id: "ai", name: "AI Research Lab", section: "Project Archive", description: "AI missions and experiments.", icon: "Bot" },
      { id: "skills", name: "Engineering Workshop", section: "Skill Tree", description: "Unlocked engineering abilities and proficiencies.", icon: "Wrench" },
      { id: "arena", name: "Command Center", section: "Coding Arena", description: "Competitive profiles and ranking achievements.", icon: "Trophy" },
      { id: "projects", name: "Project Galaxy", section: "Project Archive", description: "Mission cards and build records.", icon: "FolderArchive" },
      { id: "contact", name: "Communication Hub", section: "Contact Terminal", description: "Secure recruiter transmission.", icon: "Mail" }
    ]
  },
  assistant: {
    greeting: "SudhanshuGPT online. I represent Sudhanshu Singh inside SudhanshuOS. Ask me about his work, projects, skills, achievements, education, resume, or contact details.",
    suggestedQuestions: [
      "Tell me about Sudhanshu",
      "Show AI projects",
      "What experience does he have?",
      "Where can I download his resume?"
    ]
  }
};
