import { SectionShell } from "@/components/section-shell";

export function HomeReferencesSection() {
  return (
    <SectionShell id="referenzen">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Referenzen
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Platzhalter für Projekte, Fallstudien und Unternehmensbeispiele.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-100/80">
          Dieser Bereich ist vorbereitet, um später Referenzprojekte,
          Kennzahlen oder Erfolgsgeschichten der Gruppe übersichtlich
          darzustellen.
        </p>
      </section>
    </SectionShell>
  );
}
