import { withBasePath } from "@/lib/site-path";

export function getOptimizedLogoSrc(src: string) {
  if (!src.startsWith("/logos/") || !/\.(?:svg|jpe?g|png)$/i.test(src)) {
    return withBasePath(src);
  }

  return withBasePath(`${src.replace("/logos/", "/logos-optimized/")}.webp`);
}
