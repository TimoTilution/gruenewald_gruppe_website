import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamMemberDetailPage } from "@/components/team-member-detail-page";
import { siteBaseUrl } from "@/data/site-architecture";
import { getCmsTeamData } from "@/lib/sanity/team";
import { getTeamMemberSlug } from "@/lib/team-member-path";

type PageProps = { params: Promise<{ person: string }> };

async function getMember(person: string) {
  const data = await getCmsTeamData("group");
  const member = data?.members.find((entry) => getTeamMemberSlug(entry.name) === person);
  if (!member) return null;
  const department = data?.categories.find((entry) => entry.id === member.categoryId)?.label ?? "Team";
  return { member, department };
}

export async function generateStaticParams() {
  const data = await getCmsTeamData("group");
  return (data?.members ?? []).map((member) => ({ person: getTeamMemberSlug(member.name) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { person } = await params;
  const result = await getMember(person);
  if (!result) return {};
  const canonical = `${siteBaseUrl}/team/${person}`;
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
  if (!result) notFound();
  return <TeamMemberDetailPage {...result.member} department={result.department} />;
}
