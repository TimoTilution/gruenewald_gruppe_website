export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!basePath || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return `${basePath}${path}`;
}

export function withTrailingSlash(url: string) {
  if (
    !url ||
    url === "/" ||
    url.startsWith("#") ||
    url.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(url)
  ) {
    return url;
  }

  const match = url.match(/^([^?#]*)(.*)$/);
  const pathname = match?.[1] ?? url;
  const suffix = match?.[2] ?? "";

  return `${pathname.endsWith("/") ? pathname : `${pathname}/`}${suffix}`;
}

export function withLegacyRedirectCacheBypass(path: string) {
  const canonicalPath = withTrailingSlash(path);
  const separator = canonicalPath.includes("?") ? "&" : "?";

  return `${canonicalPath}${separator}redirect-fix=20261005`;
}

export function normalizeSitePathname(pathname: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  let normalizedPathname = pathname || "/";

  if (basePath && normalizedPathname.startsWith(basePath)) {
    normalizedPathname = normalizedPathname.slice(basePath.length) || "/";
  }

  if (!normalizedPathname.startsWith("/")) {
    normalizedPathname = `/${normalizedPathname}`;
  }

  if (normalizedPathname.length > 1 && normalizedPathname.endsWith("/")) {
    normalizedPathname = normalizedPathname.slice(0, -1);
  }

  return normalizedPathname;
}
