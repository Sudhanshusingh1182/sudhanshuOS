import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudhanshu Singh — Software Engineer & AI Enthusiast",
  description:
    "Portfolio of Sudhanshu Singh, a Software Engineer specializing in backend development, AI engineering, and competitive programming.",
  keywords: ["Sudhanshu Singh", "Software Engineer", "Backend Developer", "AI Engineer", "Next.js Portfolio"],
  authors: [{ name: "Sudhanshu Singh" }],
  openGraph: {
    title: "Sudhanshu Singh — Portfolio",
    description: "Software engineer portfolio featuring backend systems, AI applications, and competitive programming.",
    type: "website"
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg"
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
