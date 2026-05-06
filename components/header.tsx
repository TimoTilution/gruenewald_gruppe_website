"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useLayoutEffect, useRef, useState } from "react";

const secondaryNavigation = [
  { href: "#hero", label: "Start" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#leistungen", label: "Leistungen" },
  { href: "#referenzen", label: "Referenzen" },
  { href: "#karriere", label: "Karriere" },
  { href: "#kontakt", label: "Kontakt" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SecondaryTriggerElement = HTMLAnchorElement | HTMLButtonElement;

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompact, setIsCompact] = useState(false);
  const [isImprintVisible, setIsImprintVisible] = useState(false);
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);
  const [monogramTop, setMonogramTop] = useState<number | null>(null);
  const [monogramLeft, setMonogramLeft] = useState<number | null>(null);
  const [secondaryIndicator, setSecondaryIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const headerRef = useRef<HTMLElement | null>(null);
  const secondaryNavRef = useRef<HTMLDivElement | null>(null);
  const secondaryItemRefs = useRef<Record<string, SecondaryTriggerElement | null>>(
    {}
  );
  const sectionClickLockRef = useRef<number | null>(null);

  const isSectionClickLocked = () =>
    sectionClickLockRef.current !== null &&
    Date.now() < sectionClickLockRef.current;

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 12);
      setHasScrolledPastTop(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const updateMonogramPosition = () => {
      if (!headerRef.current) {
        return;
      }

      const headerHeight = headerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const freeSpaceHeight = Math.max(viewportHeight - headerHeight, 0);
      const outerFrame =
        headerRef.current.firstElementChild instanceof HTMLElement
          ? headerRef.current.firstElementChild
          : null;
      const containerElement =
        outerFrame?.firstElementChild instanceof HTMLElement
          ? outerFrame.firstElementChild
          : outerFrame;
      const containerRect = containerElement?.getBoundingClientRect() ?? null;

      setMonogramTop(headerHeight + freeSpaceHeight / 2);
      if (containerRect) {
        setMonogramLeft(containerRect.left * 0.96 + 425);
      }
    };

    updateMonogramPosition();
    window.addEventListener("resize", updateMonogramPosition);

    return () => {
      window.removeEventListener("resize", updateMonogramPosition);
    };
  }, [isCompact]);

  useLayoutEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = secondaryNavigation.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateFromHash = () => {
      if (isSectionClickLocked()) {
        return;
      }

      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };

    const updateFromScrollPosition = () => {
      if (isSectionClickLocked()) {
        return;
      }

      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 8) {
        setActiveSection("kontakt");
      }
    };

    updateFromHash();
    updateFromScrollPosition();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isSectionClickLocked()) {
          return;
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-22% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    window.addEventListener("scroll", updateFromScrollPosition, {
      passive: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateFromHash);
      window.removeEventListener("scroll", updateFromScrollPosition);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const updateSecondaryIndicator = () => {
      const navElement = secondaryNavRef.current;
      const activeElement = secondaryItemRefs.current[activeSection];

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
  }, [activeSection, isCompact]);

  useLayoutEffect(() => {
    if (pathname !== "/") {
      setIsImprintVisible(false);
      return;
    }

    const footerElement = document.querySelector("footer");

    if (!(footerElement instanceof HTMLElement)) {
      setIsImprintVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsImprintVisible(entry?.isIntersecting ?? false);
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(footerElement);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const handleSectionClick = (
    event: MouseEvent<SecondaryTriggerElement>,
    sectionId: string
  ) => {
    sectionClickLockRef.current = Date.now() + 900;
    setActiveSection(sectionId);

    if (pathname !== "/") {
      event.preventDefault();
      router.push(`/#${sectionId}`);
      return;
    }

    event.preventDefault();

    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
      return;
    }

    window.history.replaceState(null, "", `/#${sectionId}`);
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
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 isolate w-full pt-2 sm:pt-4"
      style={{ zIndex: 2147483000 }}
    >
      <div className="relative w-full px-2.5 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[1.15rem] border border-white/15 bg-stone shadow-soft sm:rounded-[2rem]"
          style={{ zIndex: 2147483001 }}
        >
          <div
            className="relative border-b border-forest-900/10 px-3 sm:px-6 lg:px-8"
            style={{ zIndex: 2147483002 }}
          >
            <div
              className={cn(
                "relative overflow-hidden transition-[height] duration-300 ease-out",
                isCompact ? "h-12 sm:h-20" : "h-16 sm:h-[8.75rem] lg:h-[13rem]"
              )}
            >
              <Link
                href="/"
                aria-label="Grünewald Gruppe"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Image
                  src="/logos/gruenewald-gruppe-logo.svg"
                  alt="Grünewald Gruppe Logo"
                  width={540}
                  height={110}
                  className={cn(
                    "h-auto transition-all duration-300 ease-out",
                    isCompact
                      ? "w-[6.65rem] sm:w-[10rem] lg:w-[18rem]"
                      : "w-[6.65rem] sm:w-[10rem] lg:w-[36rem]"
                  )}
                  priority
                />
              </Link>
            </div>
          </div>

          <div
            className="relative bg-forest-800 px-1.5 sm:px-6 lg:px-8"
            style={{ zIndex: 2147483002 }}
          >
            <nav
              aria-label="Onepager"
              className="relative grid grid-cols-3 gap-1 py-1.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2 sm:py-4"
              ref={secondaryNavRef}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 hidden h-[3px] rounded-full bg-white transition-all duration-300 ease-in-out sm:block"
                style={{
                  left: `${secondaryIndicator.left}px`,
                  width: `${secondaryIndicator.width}px`,
                  opacity: secondaryIndicator.opacity,
                }}
              />
              {secondaryNavigation.map((item) => {
                const sectionId = item.href.slice(1);
                const isActive = pathname === "/" && activeSection === sectionId;
                const itemClassName = cn(
                  "flex min-h-8 w-full items-center justify-center rounded-full px-1 py-1 text-center text-[1.04rem] leading-tight transition-colors duration-200 sm:min-h-0 sm:w-auto sm:px-4 sm:py-2 sm:text-[1.4rem] lg:text-[1.62rem]",
                  "text-white/90 hover:text-white",
                  isActive ? "font-bold text-white" : "font-semibold"
                );

                if (pathname === "/") {
                  return (
                    <button
                      key={item.href}
                      ref={(element) => {
                        secondaryItemRefs.current[sectionId] = element;
                      }}
                      type="button"
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => handleSectionClick(event, sectionId)}
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
                    href={`/#${sectionId}`}
                    className={itemClassName}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

      </div>

      <Link
        href="/"
        aria-label="Grünewald Gruppe Zusatzlogo"
        className={cn(
          "fixed z-[2147482990] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-all duration-700 ease-out md:flex",
          pathname === "/" &&
          hasScrolledPastTop &&
          !isImprintVisible &&
          monogramTop !== null &&
          monogramLeft !== null
            ? "scale-100 opacity-100"
            : "scale-[0.94] opacity-0"
        )}
        style={
          monogramTop !== null && monogramLeft !== null
            ? { top: `${monogramTop}px`, left: `${monogramLeft}px` }
            : undefined
        }
      >
        <Image
          src="/logos/gruenewald-monogram-white.png"
          alt="Grünewald Gruppe Monogramm"
          width={1536}
          height={1024}
          sizes="(min-width: 1280px) 840px, 660px"
          className="h-auto w-[41.25rem] drop-shadow-[0_20px_44px_rgba(14,25,55,0.24)] xl:w-[52.5rem]"
          priority
        />
      </Link>
    </header>
  );
}
