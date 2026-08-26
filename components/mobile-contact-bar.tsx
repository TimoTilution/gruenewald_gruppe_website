"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { normalizeSitePathname } from "@/lib/site-path";

const companyRoutes = new Set([
  "/tilution",
  "/gruenewald",
  "/clay-construction",
]);

export function MobileContactBar() {
  const pathname = normalizeSitePathname(usePathname());
  const [isNearContact, setIsNearContact] = useState(false);

  useEffect(() => {
    const targets = [document.getElementById("kontakt"), document.querySelector("footer")].filter(
      (target): target is HTMLElement => target instanceof HTMLElement,
    );
    const observer = new IntersectionObserver(
      (entries) => setIsNearContact(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "120px 0px 120px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  if (!companyRoutes.has(pathname)) return null;

  return (
    <Link
      href="#kontakt"
      className={`mobile-contact-bar${isNearContact ? " mobile-contact-bar--hidden" : ""}`}
      aria-label="Zum Kontaktbereich"
    >
      <span>Projekt anfragen</span>
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}
