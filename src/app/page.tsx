import { portfolioConfig } from "@/data/portfolio.config";
import { HomeExperience } from "@/features/home/HomeExperience";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioConfig.profile.name,
    jobTitle: portfolioConfig.profile.className,
    email: portfolioConfig.profile.email,
    url: portfolioConfig.profile.resume.url,
    sameAs: portfolioConfig.profile.socials.map((link) => link.href)
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeExperience />
    </>
  );
}
