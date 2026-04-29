import { SectionShell } from "@/components/section-shell";

export function HomeCareerSection() {
  return (
    <SectionShell id="karriere">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Karriere
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Einstiegsmöglichkeiten für Talente und Fachkräfte.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-100/80">
          Die Sektion kann künftig Stellenangebote, Benefits, Kulturthemen und
          Einblicke in die Arbeit innerhalb der Grünewald Gruppe aufnehmen.
        </p>
      </section>
    </SectionShell>
  );
}
