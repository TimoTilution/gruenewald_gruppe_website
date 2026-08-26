import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { withBasePath } from "@/lib/site-path";

type ServiceArea = {
  title: string;
  attributes: [string, string, string];
  image: string;
  overlay: {
    top: string;
    bottom: string;
  };
};

const serviceAreas: ServiceArea[] = [
  {
    title: "Klimadecken",
    attributes: ["Heizen", "Kühlen", "Wohlfühlklima"],
    image: "/images/clay/clay-service-klimadecken.png",
    overlay: {
      top: "tilution-service-card__fade-top--1",
      bottom: "tilution-service-card__fade-bottom--1",
    },
  },
  {
    title: "Lehmbau & Lehmputz",
    attributes: ["Natürlich", "Feuchteregulierend", "Wohngesund"],
    image: "/images/clay/clay-service-lehmbau-lehmputz.png",
    overlay: {
      top: "tilution-service-card__fade-top--2",
      bottom: "tilution-service-card__fade-bottom--2",
    },
  },
  {
    title: "Sanierung & Ausbau",
    attributes: ["Bestand", "Modernisierung", "Innenausbau"],
    image: "/images/clay/clay-service-sanierung-ausbau.png",
    overlay: {
      top: "tilution-service-card__fade-top--3",
      bottom: "tilution-service-card__fade-bottom--3",
    },
  },
  {
    title: "Systemmontage & Anschlüsse",
    attributes: ["Decke", "Wand", "Einbauten"],
    image: "/images/clay/clay-service-systemmontage-anschluesse.png",
    overlay: {
      top: "tilution-service-card__fade-top--4",
      bottom: "tilution-service-card__fade-bottom--4",
    },
  },
];

function ServiceCard({ area }: { area: ServiceArea }) {
  return (
    <article className="tilution-service-card group">
      <Image
        src={withBasePath(area.image)}
        alt={`${area.title} Beispielbild`}
        fill
        className="tilution-service-card__image"
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div
        className={["tilution-service-card__fade-top", area.overlay.top].join(
          " "
        )}
      />
      <div
        className={[
          "tilution-service-card__fade-bottom",
          area.overlay.bottom,
        ].join(" ")}
      />

      <div className="tilution-service-card__content">
        <h3 className="tilution-service-card__title">{area.title}</h3>

        <p className="tilution-service-card__attributes">
          {area.attributes.map((attribute, index) => (
            <span className="tilution-service-card__attribute" key={attribute}>
              <span>{attribute}</span>
              {index < area.attributes.length - 1 ? (
                <span
                  className="tilution-service-card__separator"
                  aria-hidden="true"
                >
                  |
                </span>
              ) : null}
            </span>
          ))}
        </p>
      </div>
    </article>
  );
}

export function ClayServicesSection() {
  return (
    <SectionShell id="leistungen">
      <section className="tilution-services-section">
        <header className="tilution-services-header">
          <p className="tilution-services-eyebrow">Leistungen</p>
          <h2 className="tilution-services-heading">
            Klimadecken und Lehmbau aus einer Hand
          </h2>
          <p className="tilution-services-subline">
            Nachhaltige Ausbau- und Raumklimasysteme für Neubau, Sanierung und
            anspruchsvolle Objektprojekte.
          </p>
        </header>

        <div className="tilution-services-grid clay-services-grid">
          {serviceAreas.map((area) => (
            <ServiceCard key={area.title} area={area} />
          ))}
        </div>

        <div className="tilution-services-cta">
          <div>
            <h3 className="tilution-services-cta__title">
              Sie planen ein Gebäude mit natürlichem Raumklima?
            </h3>
            <p className="tilution-services-cta__text">
              Wir unterstützen frühzeitig bei Systemauswahl, Schnittstellen und
              sauberer Ausführung im Ausbau.
            </p>
          </div>

          <Link href="#kontakt" className="tilution-services-cta__button">
            <span>Projekt anfragen</span>
            <ArrowRight className="tilution-services-cta__button-icon" />
          </Link>
        </div>
      </section>
    </SectionShell>
  );
}
