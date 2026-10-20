import type { MetadataRoute } from "next";
import {
  getIndexableSeoPaths,
  getTeamMemberPath,
  siteBaseUrl,
  teamMembers,
} from "@/data/site-architecture";
import { withTrailingSlash } from "@/lib/site-path";
import { getCmsTeamData, type CmsTeamMember } from "@/lib/sanity/team";
import { getTeamMemberSlug } from "@/lib/team-member-path";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const legacyTeamDetailPaths = new Set(teamMembers.map(getTeamMemberPath));
  const [groupTeam, tilutionTeam, clayTeam, verwaltungTeam] = await Promise.all([
    getCmsTeamData("group"),
    getCmsTeamData("tilution"),
    getCmsTeamData("clay"),
    getCmsTeamData("verwaltung"),
  ]);
  const companyTeams = [
    { basePath: "/tilution", members: tilutionTeam?.members ?? [] },
    { basePath: "/clay-construction", members: clayTeam?.members ?? [] },
    { basePath: "/verwaltung", members: verwaltungTeam?.members ?? [] },
  ];
  const companyPathsByPerson = new Map<string, string[]>();
  const updatedAtByPerson = new Map<string, Date>();

  const registerUpdatedAt = (name: string, updatedAt?: string) => {
    if (!updatedAt) return;
    const date = new Date(updatedAt);
    if (Number.isNaN(date.getTime())) return;
    const slug = getTeamMemberSlug(name);
    const current = updatedAtByPerson.get(slug);
    if (!current || date > current) updatedAtByPerson.set(slug, date);
  };

  (groupTeam?.members ?? []).forEach((member) =>
    registerUpdatedAt(member.name, member.updatedAt),
  );

  companyTeams.forEach(({ basePath, members }) => {
    members.forEach((member) => {
      const slug = getTeamMemberSlug(member.name);
      registerUpdatedAt(member.name, member.updatedAt);
      const paths = companyPathsByPerson.get(slug) ?? [];
      paths.push(`${basePath}/team/${slug}`);
      companyPathsByPerson.set(slug, paths);
    });
  });

  // A person assigned to exactly one company is indexed there. People working
  // across multiple companies use the group profile as their single main URL.
  const cmsTeamPaths = [
    ...(groupTeam?.members ?? []).flatMap((member) => {
      const slug = getTeamMemberSlug(member.name);
      const companyPaths = companyPathsByPerson.get(slug) ?? [];
      return companyPaths.length === 1 ? [] : [`/team/${slug}`];
    }),
    ...Array.from(companyPathsByPerson.entries()).flatMap(([slug, paths]) =>
      paths.length === 1 ? paths : [],
    ),
  ];

  const latestTeamUpdate = (members: CmsTeamMember[]) => {
    const dates = members
      .map((member) => member.updatedAt && new Date(member.updatedAt))
      .filter((date): date is Date => Boolean(date && !Number.isNaN(date.getTime())));
    return dates.length > 0
      ? new Date(Math.max(...dates.map((date) => date.getTime())))
      : undefined;
  };

  const teamOverviewUpdates = new Map<string, Date | undefined>([
    ["/team", latestTeamUpdate(groupTeam?.members ?? [])],
    ["/tilution/team", latestTeamUpdate(tilutionTeam?.members ?? [])],
    ["/clay-construction/team", latestTeamUpdate(clayTeam?.members ?? [])],
    ["/verwaltung/team", latestTeamUpdate(verwaltungTeam?.members ?? [])],
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteBaseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteBaseUrl}/tilution/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/gruenewaldgmbh/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/clay-construction/`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteBaseUrl}/hrw/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/verwaltung/`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteBaseUrl}/datenschutz/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteBaseUrl}/impressum/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...getIndexableSeoPaths()
      .filter((path) => !legacyTeamDetailPaths.has(path))
      .map((path) => ({
      url: `${siteBaseUrl}${withTrailingSlash(path)}`,
      changeFrequency: "weekly" as const,
      priority: path.split("/").length > 4 ? 0.55 : 0.7,
      ...(teamOverviewUpdates.get(path)
        ? { lastModified: teamOverviewUpdates.get(path) }
        : {}),
    })),
    ...cmsTeamPaths.map((path) => ({
      url: `${siteBaseUrl}${withTrailingSlash(path)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      ...(updatedAtByPerson.get(path.split("/").filter(Boolean).at(-1) ?? "")
        ? {
            lastModified: updatedAtByPerson.get(
              path.split("/").filter(Boolean).at(-1) ?? "",
            ),
          }
        : {}),
    })),
  ];

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
