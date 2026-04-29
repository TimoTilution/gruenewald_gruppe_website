import { SectionShell } from "@/components/section-shell";

export function HomeContactSection() {
  return (
    <SectionShell id="kontakt">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Kontakt
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Der Bereich für Ansprechpartner, Kontaktwege und nächste Schritte.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-100/80">
          Hier können im nächsten Schritt Kontaktinformationen, Formulare,
          Standorte oder direkte Ansprechpartner der Gruppe eingebunden werden.
        </p>
      </section>
    </SectionShell>
  );
}
