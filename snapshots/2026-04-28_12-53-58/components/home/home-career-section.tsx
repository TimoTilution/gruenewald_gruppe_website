import { SectionShell } from "@/components/section-shell";

export function HomeCareerSection() {
  return (
    <SectionShell id="karriere">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <p className="section-eyebrow">Karriere</p>
        <h2 className="section-heading">
          Einstiegsmöglichkeiten für Talente und Fachkräfte.
        </h2>
        <p className="section-subline">
          Die Sektion kann künftig Stellenangebote, Benefits, Kulturthemen und
          Einblicke in die Arbeit innerhalb der Grünewald Gruppe aufnehmen.
        </p>
      </section>
    </SectionShell>
  );
}
