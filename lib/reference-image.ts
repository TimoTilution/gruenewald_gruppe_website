import { withBasePath } from "@/lib/site-path";

export function getOptimizedReferenceSrc(src: string) {
  const optimizedSprudelhofCover =
    "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg";
  if (src === optimizedSprudelhofCover) {
    return withBasePath("/references-optimized/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg.webp");
  }
  if (!src.startsWith("/references/") || !/\.(?:jpe?g|png)$/i.test(src)) return withBasePath(src);
  return withBasePath(`${src.replace("/references/", "/references-optimized/")}.webp`);
}
