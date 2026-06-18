import { portfolioConfig } from "@/data/portfolio.config";

type ContextBlock = {
  id: string;
  label: string;
  keywords: string[];
  value: unknown;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export const accessDeniedMessage =
  "Access Denied.\n\nI am SudhanshuGPT, the AI operating inside SudhanshuOS. My knowledge is restricted to information about Sudhanshu Singh, including his experience, projects, skills, achievements, education, resume, contact details, and professional background.\n\nTry asking me something about the engineer running this system.";

const scopeKeywords = [
  "sudhanshu",
  "singh",
  "he",
  "his",
  "candidate",
  "engineer",
  "portfolio",
  "education",
  "experience",
  "bellpost",
  "project",
  "projects",
  "skill",
  "skills",
  "technology",
  "technologies",
  "coding",
  "leetcode",
  "codeforces",
  "codechef",
  "atcoder",
  "github",
  "achievement",
  "achievements",
  "interest",
  "interests",
  "resume",
  "contact",
  "email",
  "career",
  "background",
  "ai",
  "backend",
  "system design"
];

function contextBlocks(): ContextBlock[] {
  const { profile, education, experience, projects, skills, achievements, codingProfiles, interests } = portfolioConfig;

  return [
    {
      id: "profile",
      label: "Personal information and career summary",
      keywords: ["sudhanshu", "singh", "about", "profile", "candidate", "engineer", "career", "background", "mission"],
      value: profile
    },
    {
      id: "education",
      label: "Education",
      keywords: ["education", "school", "college", "matriculation", "intermediate", "b.tech", "btech"],
      value: education
    },
    {
      id: "experience",
      label: "Experience",
      keywords: ["experience", "work", "job", "bellpost", "company", "role"],
      value: experience
    },
    {
      id: "projects",
      label: "Projects",
      keywords: ["project", "projects", "built", "mission", "missions", "ai project", "backend project", "demo", "github"],
      value: projects
    },
    {
      id: "skills",
      label: "Skills and technologies",
      keywords: ["skill", "skills", "technology", "technologies", "stack", "java", "spring", "python", "react", "next", "docker", "ai", "backend"],
      value: skills
    },
    {
      id: "achievements",
      label: "Achievements",
      keywords: ["achievement", "achievements", "award", "trophy", "nptel", "topper", "rank"],
      value: achievements
    },
    {
      id: "codingProfiles",
      label: "Coding profiles",
      keywords: ["coding", "leetcode", "codeforces", "codechef", "atcoder", "github", "profile", "profiles", "rating"],
      value: codingProfiles
    },
    {
      id: "interests",
      label: "Interests",
      keywords: ["interest", "interests", "focus", "future", "curious", "curiosity"],
      value: interests
    },
    {
      id: "resume",
      label: "Resume access",
      keywords: ["resume", "cv", "download"],
      value: profile.resume
    },
    {
      id: "contact",
      label: "Contact information",
      keywords: ["contact", "email", "hire", "reach", "message"],
      value: { email: profile.email, socials: profile.socials }
    }
  ];
}

export function retrievePortfolioContext(question: string) {
  const normalized = question.toLowerCase();
  const isScoped = scopeKeywords.some((keyword) => normalized.includes(keyword));

  if (!isScoped) {
    return null;
  }

  const blocks = contextBlocks();
  const relevant = blocks.filter((block) => block.keywords.some((keyword) => normalized.includes(keyword)));
  const selected = relevant.length > 0 ? relevant : blocks;

  return selected
    .map((block) => `${block.label}:\n${JSON.stringify(block.value, null, 2)}`)
    .join("\n\n");
}

export async function askSudhanshuGPT(question: string) {
  const context = retrievePortfolioContext(question);

  if (!context) {
    return accessDeniedMessage;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-1.5-flash";

  if (!apiKey) {
    return "Gemini uplink is not configured yet. Add GEMINI_API_KEY to the environment so SudhanshuGPT can answer from the portfolio data.";
  }

  const prompt = [
    "You are SudhanshuGPT, the AI representative inside SudhanshuOS.",
    "Answer only questions about Sudhanshu Singh using the provided portfolio context.",
    "Do not invent details. If the requested information is not present, say that it is not available in the current portfolio data.",
    "If asked about the resume, mention that it is available from the Download Resume button in the Hero section and include the configured URL when useful.",
    "Keep responses concise, recruiter-friendly, and lightly cyberpunk-themed without being confusing.",
    "",
    `Portfolio context:\n${context}`,
    "",
    `User query: ${question}`
  ].join("\n");

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        topP: 0.8,
        maxOutputTokens: 500
      }
    })
  });

  if (!response.ok) {
    return "Gemini uplink failed. SudhanshuGPT could not generate a response right now.";
  }

  const data = (await response.json()) as GeminiResponse;
  const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();

  return text || "No portfolio-backed answer was generated. Try asking about Sudhanshu's projects, experience, skills, resume, or contact details.";
}
