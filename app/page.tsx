import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeInnovationsSection } from "@/components/home/home-innovations-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeServicesSection } from "@/components/home/home-services-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { getCmsTeamData } from "@/lib/sanity/team";

export default async function HomePage() {
  const teamData = await getCmsTeamData("group");

  return (
    <div className="group-theme contents">
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeServicesSection />
      <HomeReferencesSection />
      <HomeInnovationsSection />
      <HomeTeamSection variant="group" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
