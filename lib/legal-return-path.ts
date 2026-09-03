import { normalizeSitePathname } from "@/lib/site-path";

const companyBasePaths = [
  "/tilution",
  "/gruenewaldgmbh",
  "/clay-construction",
  "/verwaltung",
  "/hrw",
];

export function getLegalReturnPath(pathname: string) {
  const normalizedPathname = normalizeSitePathname(pathname);

  for (const basePath of companyBasePaths) {
    if (
      normalizedPathname === basePath ||
      normalizedPathname.startsWith(`${basePath}/`)
    ) {
      return basePath;
    }
  }

  return "/";
}

export function getLegalHref(legalPath: "/datenschutz" | "/impressum", pathname: string) {
  const normalizedPathname = normalizeSitePathname(pathname);

  if (normalizedPathname === "/datenschutz" || normalizedPathname === "/impressum") {
    return legalPath;
  }

  return `${legalPath}?zurueck=${encodeURIComponent(getLegalReturnPath(pathname))}`;
}

export function readStoredLegalReturnPath() {
  try {
    return (
      window.sessionStorage?.getItem("gruenewaldLegalReturnPath") ??
      window.localStorage?.getItem("gruenewaldLegalReturnPath")
    );
  } catch {
    return null;
  }
}

export function writeStoredLegalReturnPath(pathname: string) {
  const returnPath = getLegalReturnPath(pathname);

  try {
    window.sessionStorage?.setItem("gruenewaldLegalReturnPath", returnPath);
    window.localStorage?.setItem("gruenewaldLegalReturnPath", returnPath);
  } catch {
    // The URL fallback keeps the back button functional when storage is blocked.
  }

  return returnPath;
}
