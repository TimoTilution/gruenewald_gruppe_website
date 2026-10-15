import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { TeamMemberDetailPage } from "@/components/team-member-detail-page";
import { siteBaseUrl } from "@/data/site-architecture";
import { getCmsTeamData } from "@/lib/sanity/team";
import { getTeamMemberSlug } from "@/lib/team-member-path";
import { withTrailingSlash } from "@/lib/site-path";
import { getCanonicalTeamProfilePath } from "@/lib/team-canonical";
import { StructuredData } from "@/components/structured-data";
import { createProfilePageSchema } from "@/lib/structured-data";
import type { CompanySlug } from "@/data/site-architecture";

type CompanyRoute = "tilution" | "clay-construction" | "verwaltung";

const routeConfig = {
  tilution: { variant: "tilution", title: "Tilution GmbH", company: "tilution" },
  "clay-construction": { variant: "clay", title: "Clay Construction", company: "clay-construction" },
  verwaltung: { variant: "verwaltung", title: "Grünewald Verwaltung", company: "verwaltung" },
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

async function isDepartment(company: string, person: string) {
  const config = routeConfig[company as CompanyRoute];
  if (!config) return false;
  const data = await getCmsTeamData(config.variant);
  return (data?.categories ?? []).some((category) => category.id === person);
}

export async function generateStaticParams() {
  const entries = await Promise.all(
    (Object.keys(routeConfig) as CompanyRoute[]).map(async (company) => {
      const data = await getCmsTeamData(routeConfig[company].variant);
      return (data?.members ?? []).map((member) => ({
        company,
        person: getTeamMemberSlug(member.name),
      })).concat((data?.categories ?? []).map((category) => ({
        company,
        person: category.id,
      })));
    })
  );
  return entries.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { company, person } = await params;
  const result = await getMember(company, person);
  if (!result) {
    if (await isDepartment(company, person)) {
      const canonical = `${siteBaseUrl}${withTrailingSlash(`/${company}/team`)}`;
      return {
        title: "Team",
        alternates: { canonical },
        robots: { index: false, follow: true },
      };
    }
    return {};
  }
  const canonicalPath = await getCanonicalTeamProfilePath(person);
  const canonical = `${siteBaseUrl}${withTrailingSlash(canonicalPath)}`;
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
  if (!result) {
    if (await isDepartment(company, person)) {
      permanentRedirect(withTrailingSlash(`/${company}/team`));
    }
    notFound();
  }
  const canonicalPath = await getCanonicalTeamProfilePath(person);
  const schemaCompany = canonicalPath.startsWith("/team/")
    ? undefined
    : (routeConfig[company as CompanyRoute].company as CompanySlug);

  return (
    <>
      <StructuredData
        data={createProfilePageSchema({
          canonicalPath,
          name: result.member.name,
          role: result.member.role,
          company: schemaCompany,
          imageSrc: result.member.imageSrc,
        })}
      />
      <TeamMemberDetailPage {...result.member} department={result.department} />
    </>
  );
}
