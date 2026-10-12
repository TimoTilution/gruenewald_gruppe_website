import type { Metadata } from "next";
import { HrwContactSection, HrwHeroSection, HrwServicesSection, HrwWhySection } from "@/components/hrw/hrw-page-sections";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { createPageMetadata } from "@/lib/seo-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "HRW GmbH – Fachkräfte für Bauprojekte",
  description:
    "Die HRW GmbH stellt qualifizierte Fachkräfte und Personalkapazitäten für zuverlässige Abläufe auf anspruchsvollen Bauprojekten bereit.",
  path: "/hrw",
});

export default function HrwPage() {
  return (
    <div className="verwaltung-theme hrw-theme contents">
      <HrwHeroSection />
      <HrwServicesSection />
      <HrwWhySection />
      <HomeCareerSection />
      <HrwContactSection />
    </div>
  );
}
