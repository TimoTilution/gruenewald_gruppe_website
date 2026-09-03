"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLegalHref, writeStoredLegalReturnPath } from "@/lib/legal-return-path";
import { normalizeSitePathname } from "@/lib/site-path";

export function Footer() {
  const pathname = normalizeSitePathname(usePathname());
  const isLegalPage = pathname === "/datenschutz" || pathname === "/impressum";

  const rememberLegalReturnPath = () => {
    if (isLegalPage) {
      return;
    }

    writeStoredLegalReturnPath(window.location.pathname);
  };

  return (
    <footer
      className="w-full border-t border-white/10"
      style={{ backgroundColor: "#182956" }}
    >
      <div className="flex w-full flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-white/72">
          © Grünewald Gruppe
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white">
          <Link
            href={getLegalHref("/datenschutz", pathname)}
            onClick={rememberLegalReturnPath}
            aria-current={pathname === "/datenschutz" ? "page" : undefined}
            className="rounded-full border border-white/16 bg-white/[0.06] px-4 py-2 transition-colors duration-200 hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Datenschutz
          </Link>
          <Link
            href={getLegalHref("/impressum", pathname)}
            onClick={rememberLegalReturnPath}
            aria-current={pathname === "/impressum" ? "page" : undefined}
            className="rounded-full border border-white/16 bg-white/[0.06] px-4 py-2 transition-colors duration-200 hover:bg-white/[0.12] focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  );
}
