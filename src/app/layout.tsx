import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SudhanshuOS v1.0 | Cyberpunk AI Portfolio RPG",
  description:
    "A cyberpunk operating-system portfolio for Sudhanshu Singh: backend engineering, AI engineering, problem solving, system design, and competitive programming.",
  keywords: ["Sudhanshu Singh", "Software Engineer", "Backend Developer", "AI Engineer", "Next.js Portfolio"],
  authors: [{ name: "Sudhanshu Singh" }],
  openGraph: {
    title: "SudhanshuOS v1.0",
    description: "Explore an AI engineer portfolio as a cyberpunk RPG operating system.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
