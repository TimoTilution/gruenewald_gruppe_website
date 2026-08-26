"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-scroll-reveal], [data-reveal]";
const STAGGER_SELECTOR = "[data-reveal-stagger]";
const AUTO_STAGGER_SELECTOR = [
  ".section-card",
  ".tilution-services-grid",
  ".reference-preview-scroll",
  ".team-member-grid",
  "[role='tablist']",
  "#kontakt .grid",
].join(", ");
const STAGGER_CHILD_SELECTOR =
  ".liquid-card, .liquid-card-dark, .tilution-service-card, .tilution-service-card-button, .reference-card, .team-member-card";
const DEFAULT_STAGGER_STEP = 100;
const MOBILE_STAGGER_STEP = 60;
const MAX_STAGGER_DELAY = 360;
const MAX_MOBILE_STAGGER_DELAY = 180;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type RevealStyle = CSSProperties & {
  "--reveal-delay"?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      data-reveal
      data-reveal-delay={delay}
      className={cn("scroll-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as RevealStyle}
    >
      {children}
    </div>
  );
}

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    root.classList.add("reveal-ready");
    const mobile = window.matchMedia("(max-width: 639px)");
    const staggerStep = mobile.matches ? MOBILE_STAGGER_STEP : DEFAULT_STAGGER_STEP;
    const maxDelay = mobile.matches ? MAX_MOBILE_STAGGER_DELAY : MAX_STAGGER_DELAY;

    const prepareAutomaticGroups = () => {
      document.querySelectorAll<HTMLElement>(AUTO_STAGGER_SELECTOR).forEach((container) => {
        if (container.dataset.revealSkip === "true") {
          return;
        }

        container.dataset.revealStagger = "";
      });

      document.querySelectorAll<HTMLElement>(".grid").forEach((container) => {
        const hasRevealChildren = Array.from(container.children).some(
          (child) => child instanceof HTMLElement && child.matches(STAGGER_CHILD_SELECTOR),
        );

        if (hasRevealChildren) {
          container.dataset.revealStagger = "";
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    let fallbackFrame = 0;

    const revealVisibleElements = () => {
      fallbackFrame = 0;
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      });
    };

    const scheduleFallbackReveal = () => {
      if (fallbackFrame) {
        return;
      }

      fallbackFrame = window.requestAnimationFrame(revealVisibleElements);
    };

    const prepareStaggerGroups = () => {
      document.querySelectorAll<HTMLElement>(STAGGER_SELECTOR).forEach((container) => {
        Array.from(container.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement) || child.dataset.revealSkip === "true") {
            return;
          }

          child.dataset.reveal = "";
          child.classList.add("scroll-reveal");
          if (!child.dataset.revealDelay) {
            child.dataset.revealDelay = String(Math.min(index * staggerStep, maxDelay));
          }
        });
      });
    };

    const observeElement = (element: HTMLElement) => {
      if (element.dataset.scrollRevealObserved === "true") return;

      element.dataset.scrollRevealObserved = "true";
      element.classList.add("scroll-reveal");
      const delay = Number(element.dataset.revealDelay ?? 0);
      if (Number.isFinite(delay) && delay > 0) {
        element.style.setProperty("--reveal-delay", `${delay}ms`);
      }

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.88) {
        element.classList.add("is-visible");
        return;
      }

      observer.observe(element);
    };

    const observeAll = () => {
      prepareAutomaticGroups();
      prepareStaggerGroups();
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeElement);
      scheduleFallbackReveal();
    };

    observeAll();
    window.addEventListener("scroll", scheduleFallbackReveal, { passive: true });
    window.addEventListener("resize", scheduleFallbackReveal);

    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", scheduleFallbackReveal);
      window.removeEventListener("resize", scheduleFallbackReveal);
      if (fallbackFrame) {
        window.cancelAnimationFrame(fallbackFrame);
      }
    };
  }, [pathname]);

  return null;
}
