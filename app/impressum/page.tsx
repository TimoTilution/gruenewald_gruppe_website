import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";
import { imprints, type Imprint } from "@/data/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum der Grünewald Gruppe mit Angaben zu Tilution, Grünewald GmbH, Clay Construction, HRW und Grünewald Verwaltung.",
};

function ImprintCard({ imprint }: { imprint: Imprint }) {
  return (
    <article className="legal-content liquid-card-dark h-full min-w-0 rounded-[1.75rem] p-5 text-white sm:p-7">
      <h2 className="text-balance text-xl font-semibold leading-tight text-white">
        {imprint.company}
      </h2>
      <p className="mt-1 text-sm font-medium text-white/66">
        Teil der Grünewald-Gruppe
      </p>

      <div className="mt-6 space-y-5 text-sm leading-7 text-white/82">
        <div>
          {imprint.address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Vertreten durch:</p>
          {imprint.representedBy.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Kontakt:</p>
          {imprint.contact.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Registereintrag:</p>
          <p>Eintragung im Handelsregister.</p>
          <p>Registergericht: {imprint.registerCourt}</p>
          <p>Registernummer: {imprint.registerNumber}</p>
        </div>

        <div>
          <p className="font-semibold text-white">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
          </p>
          <p>{imprint.vatId}</p>
        </div>
      </div>
    </article>
  );
}

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Impressum"
        title="Impressum der Grünewald Gruppe"
        description="Anbieterkennzeichnung der zur Grünewald Gruppe gehörenden Unternehmen."
      />
      <SectionShell>
        <section className="section-card px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div data-reveal-stagger className="mx-auto grid min-w-0 max-w-5xl gap-5">
            {imprints.map((imprint) => (
              <ImprintCard key={imprint.slug} imprint={imprint} />
            ))}
          </div>
        </section>
      </SectionShell>
    </>
  );
}
