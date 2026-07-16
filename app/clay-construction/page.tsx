import { ClayServicesSection } from "@/components/clay/clay-services-section";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeTeamSection } from "@/components/home/home-team-section";

export default function ClayConstructionPage() {
  return (
    <div className="clay-theme contents">
      <HomeHeroSection variant="clay" />
      <ClayServicesSection />
      <HomeAboutSection />
      <HomeReferencesSection />
      <HomeTeamSection />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
