import Link from "next/link";

const customerLogos = [
  "Industrie & Produktion",
  "Planungsbüros",
  "Generalunternehmer",
  "Projektentwickler",
];

const targetGroups = [
  {
    title: "Geschäftskunden mit komplexen Anforderungen",
    description:
      "Tilution richtet sich an Unternehmen, die verlässliche digitale und operative Strukturen für Wachstum, Projekte und Prozesse benötigen.",
  },
  {
    title: "Entscheider mit Fokus auf Wirkung",
    description:
      "Die Angebote sind auf Geschäftsführer, Bereichsleiter und Projektverantwortliche zugeschnitten, die klare Ergebnisse statt reiner Maßnahmen erwarten.",
  },
  {
    title: "Langfristige B2B-Partnerschaften",
    description:
      "Im Mittelpunkt stehen belastbare Zusammenarbeit, kurze Entscheidungswege und Lösungen, die im Alltag von Unternehmen tatsächlich funktionieren.",
  },
];

const services = [
  "Digitale Lösungsansätze für Geschäftsprozesse",
  "Beratung und Strukturierung komplexer Vorhaben",
  "Projektbegleitung mit Fokus auf Umsetzung",
  "Schnittstellen zwischen Technik, Betrieb und Kommunikation",
  "Individuelle Konzepte für anspruchsvolle B2B-Anforderungen",
  "Begleitung von Veränderungs- und Wachstumsprozessen",
];

const references = [
  {
    title: "Mittelstand",
    text: "Begleitung von Unternehmen bei der Weiterentwicklung interner Abläufe und digitaler Strukturen.",
  },
  {
    title: "Bau- und Projektumfeld",
    text: "Unterstützung bei der Koordination komplexer Leistungsbereiche und Prozessketten.",
  },
  {
    title: "Technische Dienstleistungen",
    text: "Entwicklung klarer Angebots- und Kommunikationsstrukturen für erklärungsbedürftige Leistungen.",
  },
];

export default function TilutionPage() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-[2.25rem] bg-forest-900 px-8 py-14 text-white shadow-soft lg:px-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-forest-100/75">
              Tilution
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              B2B-Lösungen für Unternehmen mit Anspruch an Klarheit und Umsetzung.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-forest-100/80">
              Tilution steht für einen fokussierten, geschäftsorientierten
              Auftritt. Die Seite richtet sich an Unternehmen, die verlässliche
              Leistungen, strukturierte Prozesse und partnerschaftliche
              Zusammenarbeit erwarten.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-forest-100/70">
              B2B-Fokus
            </p>
            <p className="mt-4 text-2xl font-semibold">
              Für Geschäftskunden mit komplexen Projekten.
            </p>
            <p className="mt-4 text-sm leading-7 text-forest-100/75">
              Klare Leistungen, belastbare Prozesse und Lösungen, die im
              Unternehmensalltag Bestand haben.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-forest-800 p-8 text-white shadow-soft lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
              Unsere Kunden
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Zusammenarbeit mit professionellen Auftraggebern und Entscheidungsträgern.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {customerLogos.map((customer) => (
              <div
                key={customer}
                className="rounded-2xl border border-white/10 bg-forest-700 px-5 py-4 text-sm font-medium text-forest-100/90"
              >
                {customer}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-forest-800 p-8 text-white shadow-soft lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Kurzprofil
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white">
          Tilution verbindet unternehmerisches Denken mit umsetzungsstarken Lösungen.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-100/80">
          Der Bereich ist auf professionelle Geschäftsbeziehungen ausgerichtet
          und schafft einen klaren Einstieg für B2B-Kunden. Statt allgemeiner
          Imagekommunikation steht hier die konkrete Relevanz für Unternehmen im
          Mittelpunkt: nachvollziehbar, strukturiert und wirkungsorientiert.
        </p>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-forest-800 p-8 text-white shadow-soft lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Zielgruppen
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white">
          Tilution spricht Unternehmen an, die verlässliche B2B-Partner suchen.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {targetGroups.map((group) => (
            <article
              key={group.title}
            className="rounded-[1.75rem] border border-white/10 bg-forest-700 p-7"
            >
              <h3 className="text-xl font-semibold text-white">{group.title}</h3>
              <p className="mt-4 text-sm leading-7 text-forest-100/80">
                {group.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-forest-900/10 bg-forest-900 px-8 py-10 text-white shadow-soft lg:px-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Leistungen
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold">
          Leistungsmodule für Unternehmen mit klaren Zielen.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-5 text-sm leading-7 text-forest-100/85"
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-forest-800 p-8 text-white shadow-soft lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Referenzen
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white">
          Einsatzfelder und Projektkontexte mit hoher B2B-Relevanz.
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {references.map((reference) => (
            <article
              key={reference.title}
            className="rounded-[1.75rem] border border-white/10 bg-forest-700 p-7"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-forest-100/75">
                Referenzfeld
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">
                {reference.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-forest-100/80">
                {reference.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-forest-800 p-8 text-white shadow-soft lg:p-10">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          Call-to-Action
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold text-white">
          Lassen Sie uns über Ihre Anforderungen im B2B-Umfeld sprechen.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-forest-100/80">
          Tilution bietet einen strukturierten Einstieg für Unternehmen, die
          einen belastbaren Partner für Lösungen, Prozesse und Umsetzung suchen.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/verwaltung"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink hover:bg-forest-100"
          >
            Kontakt aufnehmen
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-white/40"
          >
            Zur Grünewald Gruppe
          </Link>
        </div>
      </section>
    </div>
  );
}
