import Link from "next/link";

const links = [
  { href: "/tilution", label: "Tilution" },
  { href: "/gruenewald", label: "Grünewald" },
  { href: "/clay-construction", label: "Clay Construction" },
  { href: "/hrw", label: "HRW" },
  { href: "/verwaltung", label: "Verwaltung" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-forest-900">
      <div className="content-shell py-12">
        <div className="section-card grid gap-10 p-8 lg:grid-cols-[1.3fr_1fr] lg:p-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
              Grünewald Gruppe
            </p>
            <h2 className="max-w-xl text-2xl font-semibold text-white">
              Starke Unternehmen unter einem gemeinsamen Dach.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-forest-100/80">
              Eine klare, hochwertige Webpräsenz als Grundlage für weitere
              Inhalte, Kontaktpunkte und Markenauftritte der Gruppe.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="grid gap-3 text-sm text-forest-100/85"
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
