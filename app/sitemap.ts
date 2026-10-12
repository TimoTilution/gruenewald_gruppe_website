import type { MetadataRoute } from "next";
import {
  getAllSeoPaths,
  getTeamMemberPath,
  siteBaseUrl,
  teamMembers,
} from "@/data/site-architecture";
import { withTrailingSlash } from "@/lib/site-path";
import { getCmsTeamData } from "@/lib/sanity/team";
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
  const cmsTeamPaths = [
    ...(groupTeam?.members ?? []).map(
      (member) => `/team/${getTeamMemberSlug(member.name)}`,
    ),
    ...(tilutionTeam?.members ?? []).map(
      (member) => `/tilution/team/${getTeamMemberSlug(member.name)}`,
    ),
    ...(clayTeam?.members ?? []).map(
      (member) => `/clay-construction/team/${getTeamMemberSlug(member.name)}`,
    ),
    ...(verwaltungTeam?.members ?? []).map(
      (member) => `/verwaltung/team/${getTeamMemberSlug(member.name)}`,
    ),
  ];

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
    ...getAllSeoPaths()
      .filter((path) => !legacyTeamDetailPaths.has(path))
      .map((path) => ({
      url: `${siteBaseUrl}${withTrailingSlash(path)}`,
      changeFrequency: "monthly" as const,
      priority: path.split("/").length > 4 ? 0.55 : 0.7,
    })),
    ...cmsTeamPaths.map((path) => ({
      url: `${siteBaseUrl}${withTrailingSlash(path)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}
