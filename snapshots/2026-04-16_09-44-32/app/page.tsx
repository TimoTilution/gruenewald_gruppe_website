import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeServicesSection } from "@/components/home/home-services-section";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeServicesSection />
      <HomeReferencesSection />
      <HomeCareerSection />
      <HomeContactSection />
    </>
  );
}
