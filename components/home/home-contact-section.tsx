"use client";

import { Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { SectionShell } from "@/components/section-shell";

export function HomeContactSection() {
  const pathname = usePathname();
  const isHrwPage = pathname === "/hrw";
  const isVerwaltungPage = pathname === "/verwaltung";
  const email =
    isHrwPage
      ? "bartholomaeus@hrw-gmbh.com"
      : isVerwaltungPage
      ? "info@verwaltung-gruenewald.de"
      : pathname === "/clay-construction"
      ? "info@clay-construction.de"
      : "info@tilution.de";
  const phoneHref = isHrwPage ? "tel:+4915172226537" : "tel:+495546608";
  const phoneLabel = isHrwPage ? "0151 / 72226537" : "05546 - 608";

  return (
    <SectionShell id="kontakt">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <header className="w-full">
          <p className="section-eyebrow">Kontakt</p>
          <h2 className="section-heading">
            {isVerwaltungPage
              ? "Sprechen Sie uns an"
              : "Sprechen Sie uns zu Ihrem Projekt an"}
          </h2>
          <p className="section-subline !max-w-none">
            Wir freuen uns auf Ihre Anfrage und melden uns schnellstmöglich bei
            Ihnen zurück.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <a
            href={phoneHref}
            className="liquid-card group flex items-center gap-4 px-5 py-4 text-white transition-transform duration-300 hover:-translate-y-1 sm:px-5 sm:py-5"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
              <Phone className="h-5 w-5 stroke-[2]" />
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-forest-100/72">
                Telefon
              </span>
              <span className="mt-1 block text-lg font-semibold leading-tight text-white">
                {phoneLabel}
              </span>
            </span>
          </a>

          <a
            href={`mailto:${email}`}
            className="liquid-card group flex items-center gap-4 px-5 py-4 text-white transition-transform duration-300 hover:-translate-y-1 sm:px-5 sm:py-5"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
              <Mail className="h-5 w-5 stroke-[2]" />
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-forest-100/72">
                E-Mail
              </span>
              <span className="mt-1 block text-lg font-semibold leading-tight text-white">
                {email}
              </span>
            </span>
          </a>
        </div>

      </section>
    </SectionShell>
  );
}
