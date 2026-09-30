import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { withTrailingSlash } from "@/lib/site-path";
import { ArrowRight } from "lucide-react";
import { ClayServicesSection } from "@/components/clay/clay-services-section";
import { GruenewaldContactSection } from "@/components/gruenewald/gruenewald-contact-section";
import { GruenewaldReferencesSection } from "@/components/gruenewald/gruenewald-references-section";
import { HomeAboutSection } from "@/components/home/home-about-section";
import { HomeCareerSection } from "@/components/home/home-career-section";
import { HomeContactSection } from "@/components/home/home-contact-section";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeInnovationsSection } from "@/components/home/home-innovations-section";
import { HomeReferencesSection } from "@/components/home/home-references-section";
import { HomeServicesSection } from "@/components/home/home-services-section";
import { HomeTeamSection } from "@/components/home/home-team-section";
import { HrwContactSection, HrwHeroSection, HrwServicesSection, HrwWhySection } from "@/components/hrw/hrw-page-sections";
import { PageHero } from "@/components/page-hero";
import { ScrollToRouteSection } from "@/components/scroll-to-route-section";
import { SectionShell } from "@/components/section-shell";
import { TilutionServicesSection } from "@/components/tilution/tilution-services-section";
import {
  tilutionServiceDetailsBySlug,
  type TilutionServiceDetail,
} from "@/data/tilution-service-details";
import { getOptimizedReferenceSrc } from "@/lib/reference-image";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";
import { getCmsTeamData } from "@/lib/sanity/team";
import {
  companies,
  type CompanySlug,
  companySectionPages,
  getAllSeoPaths,
  getCompanySlugFromPathSegment,
  getReferencePath,
  getTeamMemberPath,
  groupPages,
  references,
  serviceDetails,
  services,
  siteBaseUrl,
  teamMembers,
} from "@/data/site-architecture";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

type RouteContent = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  render: () => ReactNode;
};

function normalizePath(slug: string[]) {
  return `/${slug.join("/")}`;
}

function DetailGrid({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SectionShell>
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <div data-reveal-stagger className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
      </section>
    </SectionShell>
  );
}

function LinkCard({
  href,
  title,
  description,
  image,
}: {
  href: string;
  title: string;
  description: string;
  image?: { src: string; alt: string; isSvg?: boolean };
}) {
  return (
    <Link
      href={href}
      className="liquid-card group flex h-full flex-col overflow-hidden text-white transition-transform duration-300 hover:-translate-y-1"
    >
      {image ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={getOptimizedReferenceSrc(image.src)}
            alt={image.alt}
            fill
            unoptimized={image.isSvg}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-2xl font-semibold leading-tight">{title}</h2>
        <p className="mt-4 flex-1 text-base leading-7 text-forest-100/82">
          {description}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Mehr erfahren <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

function ProjectPage({
  title,
  eyebrow,
  description,
  images,
}: {
  title: string;
  eyebrow: string;
  description: string;
  images: Array<{ src: string; alt: string; isSvg?: boolean; objectPosition?: string }>;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <SectionShell>
        <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
          <div data-reveal-stagger className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            {images.map((image, index) => (
              <div
                key={image.src}
                className={[
                  "relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/8",
                  index === 0 ? "aspect-video lg:row-span-2" : "aspect-video",
                ].join(" ")}
              >
                <Image
                  src={getOptimizedReferenceSrc(image.src)}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  unoptimized={image.isSvg}
                  className="object-cover"
                  style={{ objectPosition: image.objectPosition ?? "center" }}
                  sizes={index === 0 ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 28vw, 100vw"}
                />
              </div>
            ))}
          </div>
        </section>
      </SectionShell>
    </>
  );
}

function TilutionServiceDetailPage({ detail }: { detail: TilutionServiceDetail }) {
  return (
    <>
      <PageHero
        eyebrow="Leistung"
        title={detail.title}
        description={detail.lead}
      />
      <SectionShell>
        <section className="section-card grid gap-8 px-6 py-8 sm:px-9 lg:grid-cols-[minmax(20rem,1fr)_minmax(20rem,0.9fr)] lg:p-12">
          <div className="relative min-h-[20rem] overflow-hidden rounded-[1.5rem] border border-white/15 sm:min-h-[28rem]">
            <Image
              src={getOptimizedSiteImageSrc(detail.image)}
              alt={detail.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center text-white">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              {detail.lead}
            </h2>
            <p className="mt-6 text-base leading-8 text-white/82">
              {detail.paragraphs[0]}
            </p>
            <p className="mt-4 text-base leading-8 text-white/82">
              {detail.paragraphs[1]}
            </p>
            <p className="mt-6 text-lg font-semibold leading-8 text-white">
              {detail.closing}
            </p>
          </div>
        </section>
      </SectionShell>
    </>
  );
}

async function GroupOnePager({ sectionId }: { sectionId: string }) {
  const teamData = await getCmsTeamData("group");

  return (
    <div className="group-theme contents">
      <ScrollToRouteSection sectionId={sectionId} />
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeServicesSection />
      <HomeReferencesSection />
      <HomeInnovationsSection />
      <HomeTeamSection variant="group" teamData={teamData} />
      <HomeCareerSection />
      <HomeContactSection />
    </div>
  );
}

async function CompanyOnePager({
  company,
  sectionId,
}: {
  company: CompanySlug;
  sectionId: string;
}) {
  if (company === "tilution") {
    const teamData = await getCmsTeamData("tilution");
    return (
      <div className="tilution-theme contents">
        <ScrollToRouteSection sectionId={sectionId} />
        <HomeHeroSection variant="tilution" />
        <TilutionServicesSection />
        <HomeAboutSection />
        <HomeReferencesSection />
        <HomeInnovationsSection />
        <HomeTeamSection variant="tilution" teamData={teamData} />
        <HomeCareerSection />
        <HomeContactSection />
      </div>
    );
  }

  if (company === "gruenewald") {
    return (
      <div className="tilution-theme gruenewald-theme contents">
        <ScrollToRouteSection sectionId={sectionId} />
        <HomeHeroSection variant="gruenewald" />
        <TilutionServicesSection variant="gruenewald" />
        <HomeAboutSection />
        <GruenewaldReferencesSection />
        <HomeCareerSection />
        <GruenewaldContactSection />
      </div>
    );
  }

  if (company === "clay-construction") {
    const teamData = await getCmsTeamData("clay");
    return (
      <div className="clay-theme contents">
        <ScrollToRouteSection sectionId={sectionId} />
        <HomeHeroSection variant="clay" />
        <ClayServicesSection />
        <HomeAboutSection />
        <HomeReferencesSection />
        <HomeTeamSection variant="clay" teamData={teamData} />
        <HomeCareerSection />
        <HomeContactSection />
      </div>
    );
  }

  if (company === "verwaltung") {
    const teamData = await getCmsTeamData("verwaltung");
    return (
      <div className="verwaltung-theme contents">
        <ScrollToRouteSection sectionId={sectionId} />
        <HomeHeroSection variant="verwaltung" />
        <TilutionServicesSection variant="verwaltung" />
        <HomeTeamSection variant="verwaltung" teamData={teamData} />
        <HomeCareerSection />
        <HomeContactSection />
      </div>
    );
  }

  return (
    <div className="verwaltung-theme hrw-theme contents">
      <ScrollToRouteSection sectionId={sectionId} />
      <HrwHeroSection />
      <HrwServicesSection />
      <HrwWhySection />
      <HomeCareerSection />
      <HrwContactSection />
    </div>
  );
}

function getGroupRoute(path: string): RouteContent | null {
  const page = groupPages.find((entry) => entry.path === path);
  if (!page) return null;

  return {
    path,
    title: page.title,
    eyebrow: page.eyebrow,
    description: page.description,
    render: () => (
      <GroupOnePager sectionId={path === "/karte" ? "gruppe" : path.slice(1)} />
    ),
  };
}

function getCompanySectionRoute(path: string, slug: string[]): RouteContent | null {
  const [companySegment, section] = slug;
  const company = getCompanySlugFromPathSegment(companySegment);
  const entry = companySectionPages.find(
    ([entryCompany, entrySection]) =>
      entryCompany === company && entrySection === section
  );

  if (!entry || !company) return null;

  const companyInfo = companies[company];
  const [, , eyebrow, title] = entry;
  const description = `${title} - ${companyInfo.description}`;

  return {
    path,
    title,
    eyebrow,
    description,
    render: () => (
      <CompanyOnePager
        company={company}
        sectionId={
          section === "einblicke" || section === "system-ausfuehrung"
            ? "gruppe"
            : section
        }
      />
    ),
  };
}

function getReferenceRoute(path: string, slug: string[]): RouteContent | null {
  const [companySegment, section, categoryOrProject, projectSlug] = slug;
  const company = getCompanySlugFromPathSegment(companySegment);
  if (!company || section !== "referenzen") return null;

  if (company === "clay-construction" && categoryOrProject) {
    const project = references.find(
      (entry) => entry.company === company && entry.slug === categoryOrProject
    );
    if (!project) return null;

    return {
      path,
      title: project.title,
      eyebrow: "Referenz",
      description: project.description,
      render: () => (
        <ProjectPage
          title={project.title}
          eyebrow="Referenz"
          description={project.description}
          images={project.images}
        />
      ),
    };
  }

  if (!categoryOrProject) return null;

  const categoryEntries = references.filter(
    (entry) => entry.company === company && entry.categorySlug === categoryOrProject
  );
  if (categoryEntries.length === 0) return null;

  if (projectSlug) {
    const project = categoryEntries.find((entry) => entry.slug === projectSlug);
    if (!project) return null;

    return {
      path,
      title: project.title,
      eyebrow: project.categoryTitle ?? "Referenz",
      description: project.description,
      render: () => (
        <ProjectPage
          title={project.title}
          eyebrow={project.categoryTitle ?? "Referenz"}
          description={project.description}
          images={project.images}
        />
      ),
    };
  }

  const categoryTitle = categoryEntries[0]?.categoryTitle ?? "Referenzen";
  return {
    path,
    title: `${categoryTitle} - Referenzen`,
    eyebrow: "Referenzen",
    description: `Ausgewaehlte Referenzen im Bereich ${categoryTitle}.`,
    render: () => (
      <>
        <PageHero
          eyebrow="Referenzen"
          title={`${categoryTitle} - Referenzen`}
          description={`Ausgewaehlte Bauvorhaben und Projektbeispiele im Bereich ${categoryTitle}.`}
        />
        <DetailGrid>
          {categoryEntries.map((entry) => (
            <LinkCard
              key={entry.slug}
              href={getReferencePath(entry)}
              title={entry.title}
              description={entry.description}
              image={entry.images[0]}
            />
          ))}
        </DetailGrid>
      </>
    ),
  };
}

function getTeamRoute(path: string, slug: string[]): RouteContent | null {
  const [companySegment, section, departmentSlug, personSlug] = slug;
  const company = getCompanySlugFromPathSegment(companySegment);
  if (!company || section !== "team" || !departmentSlug) return null;

  const departmentMembers = teamMembers.filter(
    (member) => member.company === company && member.departmentSlug === departmentSlug
  );
  if (departmentMembers.length === 0) return null;

  if (personSlug) {
    const member = departmentMembers.find((entry) => entry.slug === personSlug);
    if (!member) return null;

    return {
      path,
      title: member.name,
      eyebrow: member.departmentTitle,
      description: `${member.name} - ${member.role} bei ${companies[company].title}.`,
      render: () => (
        <ProjectPage
          title={member.name}
          eyebrow={member.departmentTitle}
          description={`${member.role} bei ${companies[company].title}.`}
          images={
            member.imageSrc
              ? [{ src: member.imageSrc, alt: `${member.name}, ${member.role}` }]
              : []
          }
        />
      ),
    };
  }

  const departmentTitle = departmentMembers[0]?.departmentTitle ?? "Team";
  return {
    path,
    title: `${departmentTitle} - Team`,
    eyebrow: "Team",
    description: `Ansprechpartnerinnen und Ansprechpartner im Bereich ${departmentTitle}.`,
    render: () => (
      <>
        <PageHero
          eyebrow="Team"
          title={`${departmentTitle} - Team`}
          description={`Die passenden Ansprechpartnerinnen und Ansprechpartner im Bereich ${departmentTitle}.`}
        />
        <DetailGrid>
          {departmentMembers.map((member) => (
            <LinkCard
              key={member.slug}
              href={getTeamMemberPath(member)}
              title={member.name}
              description={member.role}
              image={member.imageSrc ? { src: member.imageSrc, alt: `${member.name}, ${member.role}` } : undefined}
            />
          ))}
        </DetailGrid>
      </>
    ),
  };
}

function getServiceRoute(path: string, slug: string[]): RouteContent | null {
  const [companySegment, section, serviceSlug, serviceDetailSlug] = slug;
  const company = getCompanySlugFromPathSegment(companySegment);
  if (
    (company !== "gruenewald" && company !== "tilution") ||
    section !== "leistungen" ||
    !serviceSlug
  ) return null;

  const service = services.find(
    (entry) => entry.company === company && entry.slug === serviceSlug
  );
  if (!service) return null;

  if (company === "tilution") {
    if (serviceDetailSlug) return null;
    const detail = tilutionServiceDetailsBySlug[serviceSlug];
    if (!detail) return null;

    return {
      path,
      title: service.title,
      eyebrow: "Leistung",
      description: service.description,
      render: () => <TilutionServiceDetailPage detail={detail} />,
    };
  }

  if (serviceDetailSlug) {
    const serviceDetail = serviceDetails.find(
      (entry) =>
        entry.company === "gruenewald" &&
        entry.parentSlug === service.slug &&
        entry.slug === serviceDetailSlug
    );
    if (!serviceDetail) return null;

    return {
      path,
      title: serviceDetail.title,
      eyebrow: service.title,
      description: serviceDetail.description,
      render: () => (
        <PageHero
          eyebrow={service.title}
          title={serviceDetail.title}
          description={serviceDetail.description}
        />
      ),
    };
  }

  return {
    path,
    title: service.title,
    eyebrow: "Leistung",
    description: service.description,
    render: () => (
      <PageHero
        eyebrow="Leistung"
        title={service.title}
        description={service.description}
      />
    ),
  };
}

function resolveRoute(slug: string[]): RouteContent | null {
  const path = normalizePath(slug);

  return (
    getGroupRoute(path) ??
    getServiceRoute(path, slug) ??
    getReferenceRoute(path, slug) ??
    getTeamRoute(path, slug) ??
    getCompanySectionRoute(path, slug)
  );
}

export function generateStaticParams() {
  return getAllSeoPaths().map((path) => ({
    slug: path.split("/").filter(Boolean),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = resolveRoute(slug);

  if (!route) {
    return {};
  }

  const canonical = `${siteBaseUrl}${withTrailingSlash(route.path)}`;

  return {
    title: route.title,
    description: route.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: canonical,
      siteName: "Gruenewald Gruppe",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function SeoRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const route = resolveRoute(slug);

  if (!route) {
    notFound();
  }

  return route.render();
}
