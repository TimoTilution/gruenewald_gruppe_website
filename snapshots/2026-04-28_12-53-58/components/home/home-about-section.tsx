import Image from "next/image";
import { SectionShell } from "@/components/section-shell";

export function HomeAboutSection() {
  return (
    <SectionShell id="ueber-uns">
      <section className="section-card relative overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
        <div className="relative z-20 lg:grid lg:grid-cols-[minmax(0,13cm)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="max-w-2xl lg:w-[13cm] lg:max-w-[13cm]">
            <p className="section-eyebrow">Über uns</p>
            <h2 className="section-heading">
              Die richtige Lösung für jede Projektanforderung
            </h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-forest-100/78">
              <p>
                Die Grünewald Gruppe ist ein familiengeführter
                Unternehmensverbund im Bau- und Ausbaugewerbe.
              </p>
              <p>
                Aus einem klassischen Fliesenlegerbetrieb entstanden, vereinen
                wir heute spezialisierte Unternehmen für private Bauvorhaben,
                gewerbliche Großprojekte und innovative Systemlösungen.
              </p>
              <p>
                Klare Strukturen und fokussierte Kompetenzen ermöglichen es
                uns, jedes Projekt passgenau und auf höchstem Niveau
                umzusetzen.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 h-[22rem] min-w-0 lg:mt-0 lg:h-full lg:min-h-[28rem] lg:self-stretch">
            <Image
              src="/deutschland-karte.png"
              alt="Deutschlandkarte"
              fill
              className="object-contain object-right"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>
    </SectionShell>
  );
}
