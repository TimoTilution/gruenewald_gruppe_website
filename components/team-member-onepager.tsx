import { ClayServicesSection } from "@/components/clay/clay-services-section";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeInnovationsSection } from "@/components/home/home-innovations-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeServicesSection } from "@/components/home/home-services-section";
import {
  HomeTeamSection,
  type TeamData,
} from "@/components/home/home-team-section";
import { ScrollToRouteSection } from "@/components/scroll-to-route-section";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";

type TeamMemberOnePagerVariant =
  | "group"
  | "tilution"
  | "clay"
  | "verwaltung";

export function TeamMemberOnePager({
  variant,
  teamData,
  initialMemberSlug,
}: {
  variant: TeamMemberOnePagerVariant;
  teamData: TeamData;
  initialMemberSlug: string;
}) {
  const teamSection = (
    <HomeTeamSection
      variant={variant}
      teamData={teamData}
      initialMemberSlug={initialMemberSlug}
    />
  );

  if (variant === "group") {
    return (
      <div className="group-theme contents">
        <ScrollToRouteSection sectionId="team" />
        <HomeHeroSection />
        <HomeAboutSection />
        <HomeServicesSection />
        <HomeReferencesSection />
        <HomeInnovationsSection />
        {teamSection}
        <HomeCareerSection variant="group" />
        <HomeContactSection />
      </div>
    );
  }

  if (variant === "tilution") {
    return (
      <div className="tilution-theme contents">
        <ScrollToRouteSection sectionId="team" />
        <HomeHeroSection variant="tilution" />
        <TilutionServicesSection />
        <HomeReferencesSection />
        <HomeAboutSection />
        <HomeInnovationsSection />
        {teamSection}
        <HomeCareerSection variant="tilution" />
        <HomeContactSection />
      </div>
    );
  }

  if (variant === "clay") {
    return (
      <div className="clay-theme contents">
        <ScrollToRouteSection sectionId="team" />
        <HomeHeroSection variant="clay" />
        <ClayServicesSection />
        <HomeReferencesSection />
        <HomeAboutSection />
        {teamSection}
        <HomeCareerSection />
        <HomeContactSection />
      </div>
    );
  }

  return (
    <div className="verwaltung-theme contents">
      <ScrollToRouteSection sectionId="team" />
      <HomeHeroSection variant="verwaltung" />
      <TilutionServicesSection variant="verwaltung" />
      {teamSection}
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}
