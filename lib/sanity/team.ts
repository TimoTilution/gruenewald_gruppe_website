import { sanityClient } from "@/lib/sanity/client";
import { urlForSanityImage } from "@/lib/sanity/image";
import { visibleTeamMembersQuery } from "@/lib/sanity/queries";

type CompanySlug =
  | "tilution"
  | "gruenewald"
  | "clay-construction"
  | "verwaltung"
  | "hrw";

export type CmsTeamCategory = {
  id: string;
  label: string;
};

export type CmsTeamMember = {
  name: string;
  degree?: string;
  role: string;
  categoryId: string;
  imageSrc?: string;
  imagePosition?: string;
  email?: string;
  phone?: string;
};

export type CmsTeamData = {
  categories: CmsTeamCategory[];
  members: CmsTeamMember[];
};

type SanityTeamMember = {
  _id: string;
  name?: string;
  role?: string;
  degree?: string;
  email?: string;
  phone?: string;
  sortOrder?: number;
  imageAlt?: string;
  photo?: unknown;
  legacyImagePath?: string;
  company?: {
    title?: string;
    slug?: CompanySlug;
    sortOrder?: number;
  };
  department?: {
    title?: string;
    slug?: string;
    sortOrder?: number;
  };
};

const groupCompanySlugs = new Set<CompanySlug>([
  "tilution",
  "gruenewald",
  "clay-construction",
  "verwaltung",
  "hrw",
]);

const companySlugsByVariant = {
  tilution: new Set<CompanySlug>(["tilution"]),
  clay: new Set<CompanySlug>(["clay-construction"]),
  group: groupCompanySlugs,
  verwaltung: new Set<CompanySlug>(["verwaltung"]),
} satisfies Record<"tilution" | "clay" | "group" | "verwaltung", Set<CompanySlug>>;

function cleanText(value?: string) {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function getImageSrc(member: SanityTeamMember) {
  if (member.photo) {
    return urlForSanityImage(member.photo).width(900).quality(88).url();
  }

  return cleanText(member.legacyImagePath);
}

function bySortAndLabel(
  left: { sortOrder?: number; label?: string; name?: string },
  right: { sortOrder?: number; label?: string; name?: string },
) {
  const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return (left.label ?? left.name ?? "").localeCompare(
    right.label ?? right.name ?? "",
    "de",
  );
}

export async function getCmsTeamData(
  variant: "tilution" | "clay" | "group" | "verwaltung",
): Promise<CmsTeamData | null> {
  try {
    const companySlugs = companySlugsByVariant[variant];
    const sanityMembers = await sanityClient.fetch<SanityTeamMember[]>(
      visibleTeamMembersQuery,
      {},
      { next: { revalidate: 60 } },
    );

    const relevantMembers = sanityMembers.filter((member) => {
      const companySlug = member.company?.slug;
      return Boolean(
        companySlug &&
          companySlugs.has(companySlug) &&
          cleanText(member.name) &&
          cleanText(member.role) &&
          cleanText(member.department?.slug),
      );
    });

    if (relevantMembers.length === 0) {
      return null;
    }

    const categoryMap = new Map<
      string,
      CmsTeamCategory & { sortOrder?: number }
    >();

    relevantMembers.forEach((member) => {
      const departmentSlug = member.department?.slug;
      const departmentTitle = cleanText(member.department?.title);
      if (!departmentSlug || !departmentTitle) return;

      const existingCategory = categoryMap.get(departmentSlug);
      const sortOrder = member.department?.sortOrder;

      if (!existingCategory) {
        categoryMap.set(departmentSlug, {
          id: departmentSlug,
          label: departmentTitle,
          sortOrder,
        });
        return;
      }

      if (
        sortOrder !== undefined &&
        (existingCategory.sortOrder === undefined ||
          sortOrder < existingCategory.sortOrder)
      ) {
        existingCategory.sortOrder = sortOrder;
      }
    });

    const categories = Array.from(categoryMap.values())
      .sort(bySortAndLabel)
      .map(({ id, label }) => ({ id, label }));

    const members = relevantMembers
      .sort((left, right) => bySortAndLabel(left, right))
      .map<CmsTeamMember>((member) => ({
        name: cleanText(member.name) ?? "",
        degree: cleanText(member.degree),
        role: cleanText(member.role) ?? "",
        categoryId: member.department?.slug ?? "",
        imageSrc: getImageSrc(member),
        email: cleanText(member.email),
        phone: cleanText(member.phone),
      }));

    return { categories, members };
  } catch (error) {
    console.warn("Sanity team data could not be loaded.", error);
    return null;
  }
}
