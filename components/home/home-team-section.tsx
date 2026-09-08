"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Copy, ExternalLink, Mail, Phone, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";

const initialVisibleMobileTeamMemberCount = 2;
const initialVisibleDesktopTeamMemberCount = 4;

type TeamCategory = {
  id: string;
  label: string;
};

type TeamMember = {
  name: string;
  degree?: string;
  role: string;
  categoryId: string;
  imageSrc?: string;
  imagePosition?: string;
  email?: string;
  phone?: string;
};

type ContactAction = {
  memberName: string;
  type: "email" | "phone";
  value: string;
  href: string;
};

const teamCategories: TeamCategory[] = [
  { id: "geschaeftsfuehrung", label: "Geschäftsführung" },
  { id: "vertrieb", label: "Vertrieb" },
  { id: "produktion", label: "Produktion" },
  { id: "marketing", label: "Marketing" },
  { id: "zentrale-dienste", label: "Zentrale Dienste" },
];

const groupTeamCategories: TeamCategory[] = [
  ...teamCategories,
  { id: "verwaltung", label: "Verwaltung" },
  { id: "fachkraefteverwaltung", label: "Fachkräfteverwaltung" },
];

const teamMembers: TeamMember[] = [
  {
    name: "Jan Grünewald",
    degree: "Dipl. Bau-Ing.",
    role: "Geschäftsführung",
    categoryId: "geschaeftsfuehrung",
    imageSrc: "/images/team/jan-gruenewald.png",
  },
  {
    name: "Melanie Montua",
    role: "Assistenz der Geschäftsführung",
    categoryId: "geschaeftsfuehrung",
    imageSrc: "/images/team/melanie-montua.png",
  },
  {
    name: "Jürgen Gatzemeier",
    role: "Vertriebsleiter",
    categoryId: "vertrieb",
    imageSrc: "/images/team/juergen-gatzemeier.png",
    email: "gatzemeier@tilution.de",
    phone: "0151 54909563",
  },
  {
    name: "Rainer Wienken",
    degree: "Dipl.-Ing.",
    role: "Vertrieb",
    categoryId: "vertrieb",
    imageSrc: "/images/team/rainer-wienken.png",
  },
  {
    name: "Peter Rüngeling",
    role: "Kalkulator",
    categoryId: "vertrieb",
    imageSrc: "/images/team/peter-ruengeling.png",
  },
  {
    name: "Khadem Rahimi",
    role: "Kalkulator",
    categoryId: "vertrieb",
    imageSrc: "/images/team/khadem-rahimi.png",
  },
  {
    name: "Qendrim Jashari",
    role: "Produktionsleiter / Projektleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/qendrim-jashari.png",
  },
  {
    name: "Christoph Stolze",
    role: "Projektleiter / Technischer Leiter",
    categoryId: "produktion",
    imageSrc: "/images/team/christoph-stolze.png",
  },
  {
    name: "Henriikka Schierle",
    role: "Projektleiterin",
    categoryId: "produktion",
    imageSrc: "/images/team/henriikka-schierle.png",
  },
  {
    name: "Norman Sommerfeld",
    role: "Projektleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/norman-sommerfeld.png",
  },
  {
    name: "Rüdiger Müller",
    role: "Bauleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/ruediger-mueller.png",
  },
  {
    name: "Jens Cullmann",
    role: "Bauleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/jens-cullmann.png",
  },
  {
    name: "Michael Giese",
    role: "Bauleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/michael-giese.png",
  },
  {
    name: "Sven Kapke",
    role: "Bauleiter",
    categoryId: "produktion",
    imageSrc: "/images/team/sven-kapke.png",
  },
  {
    name: "Pia Schnittker",
    degree: "B.A. Architektur",
    role: "Bauleiterin",
    categoryId: "produktion",
    imageSrc: "/images/team/pia-schnittker.png",
  },
  {
    name: "Adam Kerkeh",
    role: "Projektleiter Service",
    categoryId: "produktion",
    imageSrc: "/images/team/adam-kerkeh.png",
  },
  {
    name: "Helen Faß",
    role: "Projektleiterin",
    categoryId: "produktion",
    imageSrc: "/images/team/helen-fass.png",
  },
  {
    name: "Annie Dinh",
    role: "Projektleiterin",
    categoryId: "produktion",
    imageSrc: "/images/team/annie-dinh.png",
  },
  {
    name: "Alicia Berndt",
    role: "Assistenz der Projektleitung",
    categoryId: "produktion",
    imageSrc: "/images/team/alicia-berndt.png",
  },
  {
    name: "Denise Maier",
    role: "Assistenz der Projektleitung",
    categoryId: "produktion",
    imageSrc: "/images/team/denise-maier.png",
  },
  {
    name: "Leon Schmidt",
    role: "Assistenz der Projektleitung",
    categoryId: "produktion",
    imageSrc: "/images/team/leon-schmidt.png",
  },
  {
    name: "Nadine Bihler",
    role: "Assistenz der Projektleitung",
    categoryId: "produktion",
    imageSrc: "/images/team/nadine-bihler.png",
  },
  {
    name: "Corinna Flacht",
    role: "Assistenz der Projektleitung",
    categoryId: "produktion",
    imageSrc: "/images/team/corinna-flacht.png",
  },
  {
    name: "Alissia Wilke",
    role: "Managerin für Marketing",
    categoryId: "marketing",
    imageSrc: "/images/team/alissia-wilke.png",
  },
  {
    name: "Timo Scharf",
    role: "Manager für Marketing & Unternehmensprozesse",
    categoryId: "marketing",
    imageSrc: "/images/team/timo-scharf.png",
  },
  {
    name: "Eric Dreyer",
    role: "Assistenz der Leitung Fuhrpark, Maschinen, F&E",
    categoryId: "zentrale-dienste",
    imageSrc: "/images/team/eric-dreyer.png",
  },
];

const verwaltungTeamCategories: TeamCategory[] = [
  { id: "kaufmaennische-leitung", label: "Kaufmännische Leitung" },
  { id: "kreditorenbuchhaltung", label: "Kreditorenbuchhaltung" },
  { id: "debitorenbuchhaltung", label: "Debitorenbuchhaltung" },
  { id: "it", label: "IT" },
  { id: "personalwesen", label: "Personalwesen" },
];

const verwaltungTeamMembers: TeamMember[] = [
  { name: "Alexandra Fieseler", role: "Kaufmännische Leitung", categoryId: "kaufmaennische-leitung", imageSrc: "/images/verwaltung/team-alexandra-fieseler.png" },
  { name: "Mirco Müller", role: "Kaufmännische Leitung", categoryId: "kaufmaennische-leitung", imageSrc: "/images/verwaltung/team-mirco-mueller.png" },
  { name: "Birgit Peters", role: "Kreditorenbereich & Immobilienverwaltung", categoryId: "kreditorenbuchhaltung", imageSrc: "/images/verwaltung/team-birgit-peters.png" },
  { name: "Simone Seibert", role: "Debitorenbereich, Bürgschaftswesen & Rechtsfälle", categoryId: "debitorenbuchhaltung", imageSrc: "/images/verwaltung/team-simone-seibert.png" },
  { name: "Anke Rode", role: "Debitorenbuchhaltung", categoryId: "debitorenbuchhaltung", imageSrc: "/images/verwaltung/team-anke-rode.png", imagePosition: "center top" },
  { name: "Shqiprim Salihu", role: "Sachbearbeiter IT", categoryId: "it", imageSrc: "/images/verwaltung/team-shqiprim-salihu.png" },
  { name: "Brigitte Marx", role: "Lohnbuchhaltung", categoryId: "personalwesen", imageSrc: "/images/verwaltung/team-brigitte-marx.png" },
  { name: "Theresa Janke", role: "Auszubildende", categoryId: "personalwesen", imageSrc: "/images/verwaltung/team-theresa-janke.png" },
];

const groupTeamMembers: TeamMember[] = [
  ...teamMembers,
  ...verwaltungTeamMembers.map((member) => ({
    ...member,
    categoryId: "verwaltung",
  })),
  {
    name: "Norbert Bartholomäus",
    role: "Ansprechpartner der HRW GmbH",
    categoryId: "fachkraefteverwaltung",
    imageSrc: "/images/hrw/norbert-bartholomaeus.png",
  },
];

function getPhoneHref(phone?: string) {
  if (!phone) return "";

  const normalizedPhone = phone.replace(/[^\d+]/g, "");
  return normalizedPhone.startsWith("+")
    ? `tel:${normalizedPhone}`
    : `tel:+49${normalizedPhone.replace(/^0/, "")}`;
}

function TeamMemberContactLinks({
  member,
  onMobileContactClick,
}: {
  member: TeamMember;
  onMobileContactClick?: (contactAction: ContactAction) => void;
}) {
  const hasContact = Boolean(member.email || member.phone);
  const emailAction = member.email
    ? {
        memberName: member.name,
        type: "email" as const,
        value: member.email,
        href: `mailto:${member.email}`,
      }
    : null;
  const phoneAction = member.phone
    ? {
        memberName: member.name,
        type: "phone" as const,
        value: member.phone,
        href: getPhoneHref(member.phone),
      }
    : null;

  return (
    <div
      className={[
        "team-member-contact",
        hasContact ? "team-member-contact--visible" : "team-member-contact--empty",
      ].join(" ")}
      aria-hidden={!hasContact}
    >
      <div className="team-member-contact-icons">
        {emailAction ? (
          <button
            type="button"
            className="team-member-contact-icon"
            onClick={() => onMobileContactClick?.(emailAction)}
            aria-label={`E-Mail-Adresse von ${member.name} öffnen`}
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="team-member-contact-icon-placeholder" />
        )}
        {phoneAction ? (
          <button
            type="button"
            className="team-member-contact-icon"
            onClick={() => onMobileContactClick?.(phoneAction)}
            aria-label={`Telefonnummer von ${member.name} öffnen`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="team-member-contact-icon-placeholder" />
        )}
      </div>

      {emailAction ? (
        <a
          className="team-member-contact-link"
          href={emailAction.href}
          aria-label={`E-Mail an ${member.name} senden`}
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{emailAction.value}</span>
        </a>
      ) : (
        <span className="team-member-contact-placeholder" />
      )}
      {phoneAction ? (
        <a
          className="team-member-contact-link"
          href={phoneAction.href}
          aria-label={`${member.name} telefonisch kontaktieren`}
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{phoneAction.value}</span>
        </a>
      ) : (
        <span className="team-member-contact-placeholder" />
      )}
    </div>
  );
}

function TeamContactOverlay({
  contactAction,
  onClose,
}: {
  contactAction: ContactAction;
  onClose: () => void;
}) {
  const [copyLabel, setCopyLabel] = useState("Kopieren");
  const isEmail = contactAction.type === "email";

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contactAction.value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = contactAction.value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopyLabel("Kopiert");
    } catch {
      setCopyLabel("Bitte manuell kopieren");
    }
  };

  return (
    <div
      className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-end justify-center bg-forest-900/72 px-4 py-5 backdrop-blur-md sm:items-center sm:px-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${isEmail ? "E-Mail-Adresse" : "Telefonnummer"} von ${contactAction.memberName}`}
      onClick={onClose}
    >
      <div
        className="team-contact-overlay-panel mobile-viewport-overlay__panel w-full max-w-[25rem] rounded-[1.75rem] border border-white/18 bg-white p-5 text-ink shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-forest-100/68">
              {isEmail ? "E-Mail" : "Telefon"}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-tight text-ink">
              {contactAction.memberName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-ink"
            aria-label="Kontaktfenster schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-5 break-all rounded-[1rem] bg-slate-100 px-4 py-3 text-base font-semibold text-ink">
          {contactAction.value}
        </p>

        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-forest-900 px-5 py-3 text-sm font-bold text-white"
          >
            <Copy className="h-4 w-4" aria-hidden="true" />
            {copyLabel}
          </button>
          <a
            href={contactAction.href}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-ink"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {isEmail ? "E-Mail schreiben" : "Direkt anrufen"}
          </a>
        </div>
      </div>
    </div>
  );
}

export function HomeTeamSection({ variant = "company" }: { variant?: "company" | "group" | "verwaltung" }) {
  const categories =
    variant === "verwaltung"
      ? verwaltungTeamCategories
      : variant === "group"
        ? groupTeamCategories
        : teamCategories;
  const members =
    variant === "verwaltung"
      ? verwaltungTeamMembers
      : variant === "group"
        ? groupTeamMembers
        : teamMembers;
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeContactAction, setActiveContactAction] =
    useState<ContactAction | null>(null);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId,
  );
  const visibleMembers = useMemo(
    () =>
      members.filter((member) => member.categoryId === activeCategoryId),
    [activeCategoryId, members],
  );
  const displayedMembers = visibleMembers;

  useEffect(() => {
    if (!selectedMember && !activeContactAction) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
        setActiveContactAction(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("site-overlay-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("site-overlay-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMember, activeContactAction]);

  return (
    <SectionShell id="team">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-5xl">
            <p className="section-eyebrow">Team</p>
            <h2 className="section-heading xl:whitespace-nowrap">
              {variant === "verwaltung" ? "Menschen, die unsere Verwaltung möglich machen." : "Menschen, die Projekte führen, planen und möglich machen."}
            </h2>
            <p className="section-subline !max-w-none xl:whitespace-nowrap">
              Wählen Sie einen Bereich, um die passenden Ansprechpartnerinnen
              und Ansprechpartner zu sehen.
            </p>
          </div>

        </div>

        <div
          className="mt-9 flex gap-2 overflow-x-auto pb-2"
          role="tablist"
          aria-label="Teambereiche"
        >
          {categories.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                data-testid={`team-category-${category.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="team-panel"
                onClick={() => {
                  setActiveCategoryId(category.id);
                  setShowAllMembers(false);
                }}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/45 focus:ring-offset-2 focus:ring-offset-forest-900",
                  isActive
                    ? "border-white/35 bg-white text-forest-900 shadow-[0_14px_34px_rgba(7,18,48,0.18)]"
                    : "border-white/15 bg-white/8 text-forest-100/78 hover:border-white/28 hover:bg-white/12 hover:text-white",
                ].join(" ")}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div id="team-panel" className="mt-8" role="tabpanel">
          {visibleMembers.length > 0 ? (
            <div className="team-member-grid">
              {displayedMembers.map((member, memberIndex) => (
                <article
                  key={member.name}
                  className={`liquid-card team-member-card group flex h-full flex-col overflow-hidden p-0 text-left ${
                    !showAllMembers && memberIndex >= initialVisibleMobileTeamMemberCount
                      ? "team-member-card--mobile-collapsed"
                      : ""
                  } ${
                    !showAllMembers && memberIndex >= initialVisibleDesktopTeamMemberCount
                      ? "team-member-card--desktop-collapsed"
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (member.imageSrc) {
                        setSelectedMember(member);
                      }
                    }}
                    className="team-member-main group flex flex-1 flex-col text-left"
                    aria-label={
                      member.imageSrc
                        ? `Großansicht von ${member.name} öffnen`
                        : `${member.name}, ${member.role}`
                    }
                  >
                    <div className="team-member-photo">
                      {member.imageSrc ? (
                        <Image
                          src={getOptimizedSiteImageSrc(member.imageSrc)}
                          alt={`${member.name}, ${member.role}`}
                          fill
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                          style={{ objectPosition: member.imagePosition ?? "center" }}
                          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 50vw"
                        />
                      ) : (
                        <span className="team-member-placeholder" aria-hidden="true">
                          {member.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </span>
                      )}
                    </div>

                    <div className="team-member-meta">
                      <p
                        className={[
                          "team-member-degree",
                          member.degree ? "text-forest-100/62" : "text-transparent",
                        ].join(" ")}
                        aria-hidden={!member.degree}
                      >
                        {member.degree ?? ""}
                      </p>
                      <h3 className="team-member-name">
                        {member.name}
                      </h3>
                      <p className="team-member-role">
                        {member.role}
                      </p>
                    </div>
                  </button>
                  <TeamMemberContactLinks
                    member={member}
                    onMobileContactClick={setActiveContactAction}
                  />
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[1.25rem] border border-white/12 bg-white/8 px-5 py-6 text-sm leading-6 text-forest-100/72">
              Für den Bereich {activeCategory?.label} werden die
              Ansprechpartnerinnen und Ansprechpartner noch ergänzt.
            </div>
          )}

          {visibleMembers.length > initialVisibleMobileTeamMemberCount ? (
            <div className={`mt-10 justify-center ${
              visibleMembers.length > initialVisibleDesktopTeamMemberCount
                ? "flex"
                : "flex sm:hidden"
            }`}>
              <button
                type="button"
                className="show-more-primary-button liquid-card group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1 sm:px-7 sm:py-4 sm:text-base"
                aria-expanded={showAllMembers}
                onClick={() => setShowAllMembers((current) => !current)}
              >
                {showAllMembers ? "Weniger anzeigen" : "Mehr anzeigen"}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {selectedMember ? createPortal((
        <div
          className="mobile-viewport-overlay fixed inset-0 z-[2147483100] flex items-center justify-center bg-forest-900/88 px-4 py-6 backdrop-blur-md sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name} in Großansicht`}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="team-overlay-panel mobile-viewport-overlay__panel relative w-full max-w-[54rem]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="team-overlay-close absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border bg-white/95 transition-colors duration-200"
              aria-label="Großansicht schließen"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-2xl">
              <div className="team-overlay-image relative h-[min(78vh,46rem)] w-full">
                <Image
                  src={selectedMember.imageSrc ? getOptimizedSiteImageSrc(selectedMember.imageSrc) : ""}
                  alt={`${selectedMember.name}, ${selectedMember.role}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="team-overlay-meta border-t px-5 py-4">
                {selectedMember.degree ? (
                  <p className="team-overlay-degree text-xs font-semibold uppercase tracking-[0.22em]">
                    {selectedMember.degree}
                  </p>
                ) : null}
                <h3 className="team-overlay-name mt-1 text-xl font-semibold leading-tight">
                  {selectedMember.name}
                </h3>
                <p className="team-overlay-role mt-1 text-sm font-extrabold">
                  {selectedMember.role}
                </p>
                <TeamMemberContactLinks
                  member={selectedMember}
                  onMobileContactClick={setActiveContactAction}
                />
              </div>
            </div>
          </div>
        </div>
      ), document.body) : null}
      {activeContactAction ? createPortal((
        <TeamContactOverlay
          contactAction={activeContactAction}
          onClose={() => setActiveContactAction(null)}
        />
      ), document.body) : null}
    </SectionShell>
  );
}

