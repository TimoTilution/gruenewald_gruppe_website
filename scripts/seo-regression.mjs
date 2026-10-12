import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
const origin = "https://www.gruenewald-gruppe.de";
const routes = [
  "/",
  "/tilution/",
  "/tilution/leistungen/",
  "/tilution/leistungen/hotels-wellness/",
  "/referenzen/",
  "/tilution/referenzen/hotels-wellness/dom-hotel-koeln/",
  "/tilution/team/",
  "/tilution/team/jan-gruenewald/",
  "/karriere/",
];

function htmlPath(pathname) {
  return pathname === "/"
    ? join(outDir, "index.html")
    : join(outDir, pathname.slice(1), "index.html");
}

function attribute(html, expression, label, route) {
  const value = html.match(expression)?.[1];
  assert.ok(value, `${route}: ${label} fehlt`);
  return value;
}

assert.ok(existsSync(outDir), "out/ fehlt; zuerst npm run build ausführen");
const sitemap = readFileSync(join(outDir, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, "Sitemap enthält doppelte URLs");

for (const route of routes) {
  const file = htmlPath(route);
  assert.ok(existsSync(file), `${route}: keine statisch erzeugte HTML-Datei`);
  const html = readFileSync(file, "utf8");
  const robots = attribute(html, /<meta name="robots" content="([^"]+)"/, "Robots-Meta", route);
  const canonical = attribute(html, /<link rel="canonical" href="([^"]+)"/, "Canonical", route);
  attribute(html, /<title>([^<]+)<\/title>/, "Title", route);
  attribute(html, /<meta name="description" content="([^"]+)"/, "Description", route);
  assert.ok(!robots.toLowerCase().includes("noindex"), `${route}: enthält noindex`);
  assert.equal(canonical, `${origin}${route}`, `${route}: falsches Canonical`);
  assert.ok(sitemapUrls.includes(canonical), `${route}: fehlt in Sitemap`);
}

for (const url of sitemapUrls) {
  const pathname = new URL(url).pathname;
  assert.ok(existsSync(htmlPath(pathname)), `${pathname}: Sitemap-URL hat keine HTML-Datei`);
}

const allHtml = routes.map((route) => readFileSync(htmlPath(route), "utf8")).join("\n");
assert.match(allHtml, /href="\/tilution\/leistungen\/hotels-wellness\/"/, "Leistungsdetail ist nicht crawlbar verlinkt");
assert.match(allHtml, /href="\/tilution\/team\/jan-gruenewald\/"/, "Personendetail ist nicht crawlbar verlinkt");
assert.match(allHtml, /href="\/referenzen\/sprudelhof-therme-bad-nauheim\/"/, "Gruppenreferenz ist nicht crawlbar verlinkt");

const robotsTxt = readFileSync(join(outDir, "robots.txt"), "utf8");
assert.match(robotsTxt, /User-Agent: \*/i);
assert.match(robotsTxt, /Allow: \//i);
assert.match(robotsTxt, new RegExp(`Sitemap: ${origin.replaceAll(".", "\\.")}\/sitemap\\.xml`, "i"));

console.log(`SEO regression passed: ${routes.length} Seitentypen, ${sitemapUrls.length} Sitemap-URLs.`);
