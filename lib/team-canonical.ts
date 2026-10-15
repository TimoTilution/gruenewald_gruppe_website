import { getCmsTeamData } from "@/lib/sanity/team";
import { getTeamMemberSlug } from "@/lib/team-member-path";

const companyTeams = [
  { variant: "tilution" as const, basePath: "/tilution" },
  { variant: "clay" as const, basePath: "/clay-construction" },
  { variant: "verwaltung" as const, basePath: "/verwaltung" },
];

/** Returns the single preferred indexable profile URL for a CMS team member. */
export async function getCanonicalTeamProfilePath(personSlug: string) {
  const [group, ...companies] = await Promise.all([
    getCmsTeamData("group"),
    ...companyTeams.map(({ variant }) => getCmsTeamData(variant)),
  ]);
  const appearsOnGroupPage = (group?.members ?? []).some(
    (member) => getTeamMemberSlug(member.name) === personSlug,
  );
  const companyPaths = companies.flatMap((team, index) =>
    (team?.members ?? []).some(
      (member) => getTeamMemberSlug(member.name) === personSlug,
    )
      ? [`${companyTeams[index].basePath}/team/${personSlug}`]
      : [],
  );

  if (companyPaths.length === 1) return companyPaths[0];
  if (appearsOnGroupPage) return `/team/${personSlug}`;
  return companyPaths[0] ?? `/team/${personSlug}`;
}
