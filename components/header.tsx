"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, DoorOpen } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useLayoutEffect, useRef, useState } from "react";
import { getLegalReturnPath, readStoredLegalReturnPath } from "@/lib/legal-return-path";
import { getOptimizedLogoSrc } from "@/lib/logo-image";
import { pushUrlState } from "@/lib/preserve-scroll-url";
import { normalizeSitePathname, withBasePath } from "@/lib/site-path";

const defaultSecondaryNavigation = [
  { href: "/", sectionId: "hero", label: "Start" },
  { href: "/karte", sectionId: "gruppe", label: "Gruppe" },
  { href: "/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/referenzen", sectionId: "referenzen", label: "Referenzen" },
  { href: "/innovationen", sectionId: "innovationen", label: "Innovationen" },
  { href: "/team", sectionId: "team", label: "Team" },
  { href: "/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

const tilutionSecondaryNavigation = [
  { href: "/tilution", sectionId: "hero", label: "Start" },
  { href: "/tilution/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/tilution/einblicke", sectionId: "gruppe", label: "Einblicke" },
  { href: "/tilution/referenzen", sectionId: "referenzen", label: "Referenzen" },
  { href: "/tilution/innovationen", sectionId: "innovationen", label: "Innovationen" },
  { href: "/tilution/team", sectionId: "team", label: "Team" },
  { href: "/tilution/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/tilution/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

const gruenewaldSecondaryNavigation = [
  { href: "/gruenewaldgmbh", sectionId: "hero", label: "Start" },
  { href: "/gruenewaldgmbh/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/gruenewaldgmbh/einblicke", sectionId: "gruppe", label: "Einblicke" },
  { href: "/gruenewaldgmbh/referenzen", sectionId: "referenzen", label: "Referenzen" },
  { href: "/gruenewaldgmbh/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/gruenewaldgmbh/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

const claySecondaryNavigation = [
  { href: "/clay-construction", sectionId: "hero", label: "Start" },
  { href: "/clay-construction/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/clay-construction/system-ausfuehrung", sectionId: "gruppe", label: "System & Ausführung" },
  { href: "/clay-construction/referenzen", sectionId: "referenzen", label: "Referenzen" },
  { href: "/clay-construction/team", sectionId: "team", label: "Team" },
  { href: "/clay-construction/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/clay-construction/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

const verwaltungSecondaryNavigation = [
  { href: "/verwaltung", sectionId: "hero", label: "Start" },
  { href: "/verwaltung/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/verwaltung/team", sectionId: "team", label: "Team" },
  { href: "/verwaltung/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/verwaltung/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

const hrwSecondaryNavigation = [
  { href: "/hrw", sectionId: "hero", label: "Start" },
  { href: "/hrw/leistungen", sectionId: "leistungen", label: "Leistungen" },
  { href: "/hrw/warum-hrw", sectionId: "warum-hrw", label: "Warum HRW" },
  { href: "/hrw/karriere", sectionId: "karriere", label: "Karriere" },
  { href: "/hrw/kontakt", sectionId: "kontakt", label: "Kontakt" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isCurrentPath(pathname: string, basePath: string) {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

const pageBranding = {
  gruenewald: {
    logoSrc: "/logos/companies/gruenewald.svg",
    logoAlt: "Grünewald planen bauen leben Logo",
    logoAriaLabel: "Grünewald planen bauen leben",
    logoHref: "/gruenewaldgmbh",
    navClassName: "bg-[#009CA6]",
    logoClassName: {
      compact: "h-10 w-[min(54vw,13rem)] sm:h-14 sm:w-[min(58vw,22rem)] lg:h-16 lg:w-[min(50vw,28rem)]",
      expanded: "h-24 w-[min(82vw,28rem)] sm:h-24 sm:w-[min(64vw,30rem)] lg:h-36 lg:w-[min(56vw,42rem)]",
    },
    logoSize: { width: 567, height: 340 },
  },
  tilution: {
    logoSrc: "/logos/companies/tilution-header.svg",
    logoAlt: "Tilution Logo",
    logoAriaLabel: "Tilution",
    logoHref: "/tilution",
    navClassName: "bg-[#ec6602]",
    logoClassName: {
      compact: "h-10 w-[min(54vw,13rem)] sm:h-14 sm:w-[min(58vw,22rem)] lg:h-16 lg:w-[min(50vw,28rem)]",
      expanded: "h-24 w-[min(82vw,28rem)] sm:h-24 sm:w-[min(64vw,30rem)] lg:h-36 lg:w-[min(56vw,42rem)]",
    },
    logoSize: {
      width: 1920,
      height: 1080,
    },
  },
  clay: {
    logoSrc: "/logos/companies/clay-construction.svg",
    logoAlt: "Clay Construction Logo",
    logoAriaLabel: "Clay Construction",
    logoHref: "/clay-construction",
    navClassName: "bg-[#cd203b]",
    logoClassName: {
      compact: "h-10 w-[min(54vw,13rem)] sm:h-14 sm:w-[min(58vw,22rem)] lg:h-16 lg:w-[min(50vw,28rem)]",
      expanded: "h-24 w-[min(82vw,28rem)] sm:h-24 sm:w-[min(64vw,30rem)] lg:h-36 lg:w-[min(56vw,42rem)]",
    },
    logoSize: {
      width: 1920,
      height: 1080,
    },
  },
  verwaltung: {
    logoSrc: "/logos/companies/verwaltung.svg",
    logoAlt: "Grünewald Verwaltung Logo",
    logoAriaLabel: "Grünewald Verwaltung",
    logoHref: "/verwaltung",
    navClassName: "bg-[#5658af]",
    logoClassName: {
      compact: "h-10 w-[min(54vw,13rem)] sm:h-14 sm:w-[min(58vw,22rem)] lg:h-16 lg:w-[min(50vw,28rem)]",
      expanded: "h-24 w-[min(82vw,28rem)] sm:h-24 sm:w-[min(64vw,30rem)] lg:h-36 lg:w-[min(56vw,42rem)]",
    },
    logoSize: { width: 567, height: 340 },
  },
  hrw: {
    logoSrc: "/logos/companies/hrw.svg",
    logoAlt: "HRW Logo",
    logoAriaLabel: "HRW",
    logoHref: "/hrw",
    navClassName: "bg-[#f68712]",
    logoClassName: {
      compact: "h-10 w-[min(54vw,13rem)] sm:h-14 sm:w-[min(58vw,22rem)] lg:h-16 lg:w-[min(50vw,28rem)]",
      expanded: "h-24 w-[min(82vw,28rem)] sm:h-24 sm:w-[min(64vw,30rem)] lg:h-36 lg:w-[min(56vw,42rem)]",
    },
    logoSize: { width: 605, height: 227 },
  },
};

type SecondaryTriggerElement = HTMLAnchorElement | HTMLButtonElement;

export function Header() {
  const rawPathname = usePathname();
  const pathname = normalizeSitePathname(rawPathname);
  const activeBranding =
    isCurrentPath(pathname, "/gruenewaldgmbh")
      ? pageBranding.gruenewald
      : isCurrentPath(pathname, "/tilution")
      ? pageBranding.tilution
      : isCurrentPath(pathname, "/clay-construction")
        ? pageBranding.clay
        : isCurrentPath(pathname, "/verwaltung")
          ? pageBranding.verwaltung
          : isCurrentPath(pathname, "/hrw")
            ? pageBranding.hrw
      : null;
  const activeLogoHref = activeBranding?.logoHref ?? "/";
  const isLegalPage = pathname === "/datenschutz" || pathname === "/impressum";

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== activeLogoHref) return;

    event.preventDefault();
    window.history.replaceState(null, "", rawPathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const isVerwaltungPage = pathname === "/verwaltung" || pathname === "/hrw";
  const isLocalOnepager = pathname === "/" || pathname === activeLogoHref;
  const showSecondaryNavigation = !isLegalPage;
  const secondaryNavigation = isCurrentPath(pathname, "/hrw")
    ? hrwSecondaryNavigation
    : isCurrentPath(pathname, "/verwaltung")
    ? verwaltungSecondaryNavigation
    : isCurrentPath(pathname, "/clay-construction")
      ? claySecondaryNavigation
    : isCurrentPath(pathname, "/gruenewaldgmbh")
      ? gruenewaldSecondaryNavigation
    : activeBranding
      ? tilutionSecondaryNavigation
      : defaultSecondaryNavigation;
  const router = useRouter();
  const handleLegalBack = () => {
    const queryReturnPath = new URLSearchParams(window.location.search).get("zurueck");
    const returnPath =
      (queryReturnPath ? getLegalReturnPath(queryReturnPath) : null) ??
      readStoredLegalReturnPath() ??
      getLegalReturnPath(document.referrer ? new URL(document.referrer).pathname : "/");

    router.push(returnPath);
  };
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompact, setIsCompact] = useState(false);
  const [secondaryIndicator, setSecondaryIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [secondaryScrollHint, setSecondaryScrollHint] = useState({
    left: false,
    right: false,
  });
  const headerRef = useRef<HTMLElement | null>(null);
  const secondaryNavRef = useRef<HTMLDivElement | null>(null);
  const secondaryItemRefs = useRef<Record<string, SecondaryTriggerElement | null>>(
    {}
  );
  const sectionClickLockRef = useRef<number | null>(null);
  const activeNavigationItem =
    secondaryNavigation.find((item) => pathname === item.href) ??
    secondaryNavigation
      .filter((item) => item.href !== "/" && pathname.startsWith(`${item.href}/`))
      .sort((first, second) => second.href.length - first.href.length)[0];
  const visibleActiveSection =
    isLocalOnepager ? activeSection : activeNavigationItem?.sectionId ?? "hero";

  const isSectionClickLocked = () =>
    sectionClickLockRef.current !== null &&
    Date.now() < sectionClickLockRef.current;

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isLocalOnepager) {
      return;
    }

    const sectionIds = secondaryNavigation.map((item) => item.sectionId);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateFromHash = () => {
      if (isSectionClickLocked()) {
        return;
      }

      setActiveSection("hero");
    };

    const updateFromScrollPosition = () => {
      if (isSectionClickLocked()) {
        return;
      }

      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 8) {
        setActiveSection(sectionIds[sectionIds.length - 1] ?? "hero");
        return;
      }

      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const activationLine = headerHeight + Math.min(window.innerHeight * 0.22, 160);
      let currentSection = sectionIds[0] ?? "hero";

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection(currentSection);
    };

    updateFromHash();
    updateFromScrollPosition();

    let animationFrameId: number | null = null;
    const scheduleScrollUpdate = () => {
      if (animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(() => {
        animationFrameId = null;
        updateFromScrollPosition();
      });
    };

    window.addEventListener("scroll", scheduleScrollUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleScrollUpdate);

    return () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", scheduleScrollUpdate);
    };
  }, [isLocalOnepager, pathname, secondaryNavigation]);

  useLayoutEffect(() => {
    const updateSecondaryIndicator = () => {
      const navElement = secondaryNavRef.current;
      const activeElement = secondaryItemRefs.current[visibleActiveSection];

      if (!navElement || !activeElement) {
        setSecondaryIndicator((current) => ({ ...current, opacity: 0 }));
        return;
      }

      const navRect = navElement.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      setSecondaryIndicator({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    updateSecondaryIndicator();
    window.addEventListener("resize", updateSecondaryIndicator);

    return () => {
      window.removeEventListener("resize", updateSecondaryIndicator);
    };
  }, [visibleActiveSection, isCompact, pathname, secondaryNavigation.length]);

  useLayoutEffect(() => {
    const navElement = secondaryNavRef.current;

    if (!navElement) {
      return;
    }

    const updateSecondaryScrollHint = () => {
      const maxScrollLeft = navElement.scrollWidth - navElement.clientWidth;
      const isAtStart = navElement.scrollLeft <= 4;

      setSecondaryScrollHint({
        left: !isAtStart && maxScrollLeft > 4,
        right: isAtStart && maxScrollLeft > 4,
      });
    };

    updateSecondaryScrollHint();
    navElement.addEventListener("scroll", updateSecondaryScrollHint, {
      passive: true,
    });
    window.addEventListener("resize", updateSecondaryScrollHint);

    return () => {
      navElement.removeEventListener("scroll", updateSecondaryScrollHint);
      window.removeEventListener("resize", updateSecondaryScrollHint);
    };
  }, [pathname, secondaryNavigation.length]);

  const handleSectionClick = (
    event: MouseEvent<SecondaryTriggerElement>,
    sectionId: string,
    href: string
  ) => {
    sectionClickLockRef.current = Date.now() + 900;
    setActiveSection(sectionId);

    if (!isLocalOnepager) {
      return;
    }

    event.preventDefault();

    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      router.push(href);
      return;
    }

    const headerOffset = headerRef.current?.offsetHeight ?? 0;
    const targetTop =
      targetSection.getBoundingClientRect().top +
      window.scrollY -
      headerOffset -
      16;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
    pushUrlState(href);
  };

  const handleSecondaryNavScroll = (direction: "left" | "right") => {
    const navElement = secondaryNavRef.current;

    if (!navElement) {
      return;
    }

    navElement.scrollTo({
      left:
        direction === "right"
          ? navElement.scrollWidth - navElement.clientWidth
          : 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 isolate w-full"
      style={{ zIndex: 2147483000 }}
    >
      <div className="relative w-full">
        <div
          className="relative overflow-hidden bg-stone"
          style={{ zIndex: 2147483001 }}
        >
          <div
            className="relative border-b border-forest-900/10 px-3 sm:px-6 lg:px-8"
            style={{ zIndex: 2147483002 }}
          >
            <div
              className={cn(
                "relative overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isCompact ? "h-12 sm:h-20" : "h-28 sm:h-[8.75rem] lg:h-[13rem]"
              )}
            >
              {isLegalPage ? (
                <button
                  type="button"
                  onClick={handleLegalBack}
                  className={cn(
                    "absolute left-0 top-1/2 z-10 inline-flex min-h-7 -translate-y-1/2 items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold shadow-[0_10px_22px_rgba(24,41,86,0.1)] backdrop-blur-md transition-colors duration-200 sm:min-h-8 sm:gap-2 sm:px-4 sm:py-2 sm:text-base",
                    "border border-[#182956] bg-[#182956] text-white hover:bg-[#101d3f]"
                  )}
                  aria-label="Zur vorherigen Unternehmensseite zurückkehren"
                >
                  <ArrowLeft className="h-4 w-4 stroke-[2.15] sm:h-5 sm:w-5" />
                  <span>Zurück</span>
                </button>
              ) : activeBranding ? (
                <Link
                  href="/"
                  className={cn(
                    "absolute left-0 top-1/2 z-10 inline-flex min-h-7 -translate-y-1/2 items-center gap-1.5 rounded-full px-2 py-1 text-xs font-semibold shadow-[0_10px_22px_rgba(24,41,86,0.1)] backdrop-blur-md transition-colors duration-200 sm:min-h-8 sm:gap-2 sm:px-4 sm:py-2 sm:text-base",
                    "border border-[#182956] bg-[#182956] text-white hover:bg-[#101d3f]"
                  )}
                  aria-label="Zur Gruppenseite wechseln"
                >
                  <DoorOpen className="h-4 w-4 stroke-[2.15] sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">zur Grünewald-Gruppe</span>
                </Link>
              ) : null}
              <Link
                href={activeLogoHref}
                onClick={handleLogoClick}
                aria-label={activeBranding?.logoAriaLabel ?? "Grünewald Gruppe"}
                className={cn(
                  "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-[height,max-width,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "transition-[height,width,max-width,transform] will-change-[height,width,transform]",
                  activeBranding
                    ? isCompact
                      ? activeBranding.logoClassName.compact
                      : activeBranding.logoClassName.expanded
                    : "h-auto"
                )}
              >
                <Image
                  src={getOptimizedLogoSrc(activeBranding?.logoSrc ?? "/logos/gruenewald-gruppe-logo.svg")}
                  alt={activeBranding?.logoAlt ?? "Grünewald Gruppe Logo"}
                  width={activeBranding?.logoSize.width ?? 540}
                  height={activeBranding?.logoSize.height ?? 110}
                  className={cn(
                    "will-change-transform transition-[height,width,max-width,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    activeBranding
                      ? "h-full w-full object-contain"
                      : isCompact
                        ? "h-auto w-[6.65rem] sm:w-[10rem] lg:w-[18rem]"
                      : "header-default-logo h-auto"
                  )}
                  priority
                />
              </Link>
            </div>
          </div>

          {showSecondaryNavigation ? (
            <div
              className={cn(
                "relative px-1.5 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-8",
                activeBranding?.navClassName ?? "bg-forest-800"
              )}
              style={{ zIndex: 2147483002 }}
            >
              <nav
                aria-label="Onepager"
                className={cn(
                  "relative flex items-center gap-1 overflow-x-auto py-1.5 pr-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-visible sm:py-4 sm:pr-0",
                  secondaryScrollHint.left ? "pl-7 sm:pl-0" : "pl-0"
                )}
                ref={secondaryNavRef}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute bottom-2 hidden h-[2px] rounded-full transition-all duration-300 ease-in-out sm:block",
                    ""
                  )}
                  style={{
                    left: `${secondaryIndicator.left}px`,
                    width: `${secondaryIndicator.width}px`,
                    opacity: secondaryIndicator.opacity,
                    backgroundColor: "#ffffff",
                  }}
                />
                {secondaryNavigation.map((item) => {
                  const sectionId = item.sectionId;
                  const isActive = visibleActiveSection === sectionId;
                  const itemClassName = cn(
                    "flex min-h-8 shrink-0 items-center justify-center rounded-full px-2 py-1 text-center text-[0.94rem] leading-tight text-white transition-colors duration-200 hover:text-white sm:min-h-0 sm:w-auto sm:px-3 sm:py-2 sm:text-[1.25rem] lg:text-[1.42rem] xl:text-[1.5rem]",
                    isActive
                      ? "font-bold underline decoration-2 underline-offset-[0.55rem] sm:no-underline"
                      : "font-semibold text-white/88"
                  );

                  if (isLocalOnepager) {
                    return (
                      <button
                        key={item.href}
                        ref={(element) => {
                          secondaryItemRefs.current[sectionId] = element;
                        }}
                        type="button"
                        aria-current={isActive ? "location" : undefined}
                        onClick={(event) => handleSectionClick(event, sectionId, item.href)}
                        className={itemClassName}
                      >
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      ref={(element) => {
                        secondaryItemRefs.current[sectionId] = element;
                      }}
                      href={item.href}
                      className={itemClassName}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              {secondaryScrollHint.left ? (
                <button
                  type="button"
                  aria-label="Vorherige Kategorien anzeigen"
                  className={cn(
                    "absolute left-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full shadow-[0_8px_18px_rgba(32,36,43,0.12)] backdrop-blur-md transition-colors duration-200 sm:hidden",
                    isVerwaltungPage
                      ? "bg-white/16 text-white hover:bg-white/24"
                      : "bg-white/16 text-white hover:bg-white/24"
                  )}
                  onClick={() => handleSecondaryNavScroll("left")}
                >
                  <ArrowLeft className="h-3.5 w-3.5 stroke-[2.4]" />
                </button>
              ) : null}
              {secondaryScrollHint.right ? (
                <button
                  type="button"
                  aria-label="Weitere Kategorien anzeigen"
                  className={cn(
                    "absolute right-1.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full shadow-[0_8px_18px_rgba(32,36,43,0.12)] backdrop-blur-md transition-colors duration-200 sm:hidden",
                    isVerwaltungPage
                      ? "bg-white/16 text-white hover:bg-white/24"
                      : "bg-white/16 text-white hover:bg-white/24"
                  )}
                  onClick={() => handleSecondaryNavScroll("right")}
                >
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.4]" />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

      </div>
    </header>
  );
}

