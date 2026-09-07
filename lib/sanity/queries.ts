export const visibleCompaniesQuery = `*[_type == "company" && isVisible != false] | order(sortOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  sortOrder
}`;

export const visibleTeamMembersQuery = `*[_type == "teamMember" && isVisible != false] | order(sortOrder asc, name asc) {
  _id,
  name,
  role,
  degree,
  sortOrder,
  imageAlt,
  photo,
  "company": company->{title, "slug": slug.current},
  "department": department->{title, "slug": slug.current}
}`;

export const visibleReferencesQuery = `*[_type == "projectReference" && isVisible != false] | order(sortOrder asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  location,
  clientType,
  description,
  sortOrder,
  isFeatured,
  coverImage,
  coverImageAlt,
  gallery,
  "company": company->{title, "slug": slug.current},
  "category": category->{title, "slug": slug.current}
}`;

export const visibleWebsitePagesQuery = `*[_type == "websitePage" && isVisible != false] | order(sortOrder asc, title asc) {
  _id,
  pageKey,
  title,
  eyebrow,
  heroTitle,
  heroText,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  introTitle,
  introText,
  heroImage,
  heroImageAlt,
  sortOrder
}`;
