"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function MobileRevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    if (!mobile.matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const containers = [...document.querySelectorAll<HTMLElement>("main .content-shell > section")];
    containers.forEach((container, index) => {
      if (index === 0) {
        container.classList.add("mobile-reveal", "mobile-reveal--visible");
      } else {
        container.classList.add("mobile-reveal");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("mobile-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6%", threshold: 0.06 },
    );

    let readyFrame = 0;
    const initialFrame = window.requestAnimationFrame(() => {
      readyFrame = window.requestAnimationFrame(() => {
        containers.forEach((container) => container.classList.add("mobile-reveal--ready"));
        containers.slice(1).forEach((container) => observer.observe(container));
      });
    });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.cancelAnimationFrame(readyFrame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
