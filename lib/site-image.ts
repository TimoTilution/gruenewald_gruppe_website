import { withBasePath } from "@/lib/site-path";

const optimizedRootImages = new Set([
  "/about-floor.png",
  "/about-bathroom.png",
  "/about-ceiling.png",
  "/deutschland-karte.png",
  "/hero-start.jpg",
]);

export function getOptimizedSiteImageSrc(src: string) {
  if (optimizedRootImages.has(src)) {
    return withBasePath(`/images-optimized/root${src}.webp`);
  }

  if (!src.startsWith("/images/") || !/\.(?:jpe?g|png)$/i.test(src)) {
    return withBasePath(src);
  }

  return withBasePath(`${src.replace("/images/", "/images-optimized/")}.webp`);
}
