import Image from "next/image";
import { SectionShell } from "@/components/section-shell";

const collageImages = [
  {
    src: "/about-floor.png",
    alt: "Großformatiger Bodenbelag in einem modernen Innenraum",
  },
  {
    src: "/about-bathroom.png",
    alt: "Modernes Badezimmer mit hochwertigen Oberflächen",
  },
  {
    src: "/about-ceiling.png",
    alt: "Innenraum mit hochwertiger Deckenlösung und warmem Licht",
  },
];

export function HomeAboutSection() {
  return (
    <SectionShell id="ueber-uns">
      <section className="section-card relative overflow-hidden px-6 py-8 sm:px-8 lg:p-10">
        <div className="relative z-20 max-w-2xl lg:w-[13cm] lg:max-w-[13cm]">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Über uns
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Die richtige Lösung für jede Projektanforderung
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-forest-100/82">
            <p>
              Die Grünewald Gruppe ist ein familiengeführter Unternehmensverbund
              im Bau- und Ausbaugewerbe.
            </p>
            <p>
              Aus einem klassischen Fliesenlegerbetrieb entstanden, vereinen wir
              heute spezialisierte Unternehmen für private Bauvorhaben,
              gewerbliche Großprojekte und innovative Systemlösungen.
            </p>
            <p>
              Klare Strukturen und fokussierte Kompetenzen ermöglichen es uns,
              jedes Projekt passgenau und auf höchstem Niveau umzusetzen.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 lg:hidden">
          {collageImages.map((image) => (
            <div
              key={image.src}
              className="group relative h-40 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 sm:h-56"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 right-0 z-10 hidden lg:flex lg:w-[54rem] lg:items-stretch lg:justify-end lg:gap-4">
          {collageImages.map((image) => (
            <div
              key={image.src}
              className="group relative h-full w-[17.333rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
