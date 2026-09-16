import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamMemberDetailPage } from "@/components/team-member-detail-page";
import { siteBaseUrl } from "@/data/site-architecture";
import { getCmsTeamData } from "@/lib/sanity/team";
import { getTeamMemberSlug } from "@/lib/team-member-path";

type CompanyRoute = "tilution" | "clay-construction" | "verwaltung";

const routeConfig = {
  tilution: { variant: "tilution", title: "Tilution GmbH" },
  "clay-construction": { variant: "clay", title: "Clay Construction" },
  verwaltung: { variant: "verwaltung", title: "Grünewald Verwaltung" },
} as const;

type PageProps = {
  params: Promise<{ company: string; person: string }>;
};

async function getMember(company: string, person: string) {
  const config = routeConfig[company as CompanyRoute];
  if (!config) return null;
  const data = await getCmsTeamData(config.variant);
  const member = data?.members.find((entry) => getTeamMemberSlug(entry.name) === person);
  if (!member) return null;
  const department = data?.categories.find((entry) => entry.id === member.categoryId)?.label ?? "Team";
  return { member, department, companyTitle: config.title };
}

export async function generateStaticParams() {
  const entries = await Promise.all(
    (Object.keys(routeConfig) as CompanyRoute[]).map(async (company) => {
      const data = await getCmsTeamData(routeConfig[company].variant);
      return (data?.members ?? []).map((member) => ({
        company,
        person: getTeamMemberSlug(member.name),
      }));
    })
  );
  return entries.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company, person } = await params;
  const result = await getMember(company, person);
  if (!result) return {};
  const canonical = `${siteBaseUrl}/${company}/team/${person}`;
  const description = `${result.member.name} – ${result.member.role} bei ${result.companyTitle}.`;
  return {
    title: result.member.name,
    description,
    alternates: { canonical },
    openGraph: { title: result.member.name, description, url: canonical, siteName: "Grünewald Gruppe", locale: "de_DE", type: "profile" },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { company, person } = await params;
  const result = await getMember(company, person);
  if (!result) notFound();
  return <TeamMemberDetailPage {...result.member} department={result.department} />;
}
