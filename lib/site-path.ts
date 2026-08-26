export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (!basePath || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }

  return `${basePath}${path}`;
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
