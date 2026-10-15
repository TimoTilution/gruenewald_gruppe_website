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

type PageProps = { params: Promise<{ person: string }> };

async function getMember(person: string) {
  const data = await getCmsTeamData("group");
  const member = data?.members.find((entry) => getTeamMemberSlug(entry.name) === person);
  if (!member) return null;
  const department = data?.categories.find((entry) => entry.id === member.categoryId)?.label ?? "Team";
  return { member, department };
}

async function isDepartment(person: string) {
  const data = await getCmsTeamData("group");
  return (data?.categories ?? []).some((category) => category.id === person);
}

export async function generateStaticParams() {
  const data = await getCmsTeamData("group");
  return [
    ...(data?.members ?? []).map((member) => ({
      person: getTeamMemberSlug(member.name),
    })),
    ...(data?.categories ?? []).map((category) => ({ person: category.id })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { person } = await params;
  const result = await getMember(person);
  if (!result) {
    if (await isDepartment(person)) {
      const canonical = `${siteBaseUrl}${withTrailingSlash("/team")}`;
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
  const description = `${result.member.name} – ${result.member.role} bei der Grünewald Gruppe.`;
  return {
    title: result.member.name,
    description,
    alternates: { canonical },
    openGraph: { title: result.member.name, description, url: canonical, siteName: "Grünewald Gruppe", locale: "de_DE", type: "profile" },
  };
}

export default async function GroupTeamMemberPage({ params }: PageProps) {
  const { person } = await params;
  const result = await getMember(person);
  if (!result) {
    if (await isDepartment(person)) {
      permanentRedirect(withTrailingSlash("/team"));
    }
    notFound();
  }
  const canonicalPath = await getCanonicalTeamProfilePath(person);
  const companyByPath: Array<[string, CompanySlug]> = [
    ["/tilution/", "tilution"],
    ["/clay-construction/", "clay-construction"],
    ["/verwaltung/", "verwaltung"],
  ];
  const company = companyByPath.find(([prefix]) =>
    canonicalPath.startsWith(prefix),
  )?.[1];

  return (
    <>
      <StructuredData
        data={createProfilePageSchema({
          canonicalPath,
          name: result.member.name,
          role: result.member.role,
          company,
          imageSrc: result.member.imageSrc,
        })}
      />
      <TeamMemberDetailPage {...result.member} department={result.department} />
    </>
  );
}
