import type { LucideIcon } from "lucide-react";

export type Status = "Completed" | "In Progress" | "Archived";

export type SocialLink = {
  label: string;
  href: string;
  icon: "Github" | "Linkedin" | "Mail" | "FileText";
};

export type RpgStat = {
  label: string;
  value: number;
};

export type SkillNode = {
  name: string;
  level: number;
  unlocked: boolean;
  detail: string;
};

export type SkillCategory = {
  title: string;
  nodes: SkillNode[];
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  screenshots: string[];
  features: string[];
  status: Status;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  category: "AI" | "Backend" | "Full Stack" | "Open Source";
};

export type Achievement = {
  title: string;
  description: string;
  date?: string;
};

export type CodingProfile = {
  platform: string;
  username: string;
  rating: string;
  rank: string;
  stats: string;
  href: string;
};

export type Experience = {
  year: string;
  role: string;
  company: string;
  objectives: string[];
};

export type Education = {
  stage: string;
  institution: string;
  result: string;
  year: string;
};

export type Interest = {
  name: string;
  signal: string;
};

export type CityBuilding = {
  id: string;
  name: string;
  section: string;
  description: string;
  icon: keyof typeof import("lucide-react");
};

export type PortfolioConfig = {
  profile: {
    name: string;
    className: string;
    level: number;
    title: string;
    mission: string;
    location: string;
    email: string;
    resume: {
      title: string;
      url: string;
    };
    xp: number;
    stats: RpgStat[];
    socials: SocialLink[];
  };
  bootModules: string[];
  skills: SkillCategory[];
  projects: Project[];
  achievements: Achievement[];
  codingProfiles: CodingProfile[];
  experience: Experience[];
  education: Education[];
  interests: Interest[];
  world: {
    buildings: CityBuilding[];
  };
  assistant: {
    greeting: string;
    suggestedQuestions: string[];
  };
};

export type IconComponent = LucideIcon;
