import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { GruenewaldContactSection } from "@/components/gruenewald/gruenewald-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { GruenewaldReferencesSection } from "@/components/gruenewald/gruenewald-references-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";

export default function GruenewaldPage() {
  return (
    <div className="tilution-theme gruenewald-theme contents">
      <HomeHeroSection variant="gruenewald" />
      <TilutionServicesSection variant="gruenewald" />
      <HomeAboutSection />
      <GruenewaldReferencesSection />
      <HomeCareerSection />
      <GruenewaldContactSection />
    </div>
  );
}
