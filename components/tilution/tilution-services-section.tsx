import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

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
    title: "Schwimmbäder & Thermen",
    attributes: ["Abdichtung", "Gefälle", "Rutschhemmung"],
    image: "/images/tilution/schwimmbad-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--1",
      bottom: "tilution-service-card__fade-bottom--1",
    },
  },
  {
    title: "Hotels & Wellness",
    attributes: ["Zimmerbäder", "Flure", "Wellnessbereiche"],
    image: "/images/tilution/hotel-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--2",
      bottom: "tilution-service-card__fade-bottom--2",
    },
  },
  {
    title: "Öffentliche Einrichtungen",
    attributes: ["Blindleitsysteme", "Barrierearme Details", "Rutschhemmung"],
    image: "/images/tilution/oeffentliche-einrichtungen-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--3",
      bottom: "tilution-service-card__fade-bottom--3",
    },
  },
  {
    title: "Kliniken & Pflegebereiche",
    attributes: ["Hygiene", "Barrierearmut", "Belastbarkeit"],
    image: "/images/tilution/klinik-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--4",
      bottom: "tilution-service-card__fade-bottom--4",
    },
  },
  {
    title: "Großküchen",
    attributes: ["Hohlkehlen", "Abläufe", "Chemische Belastbarkeit"],
    image: "/images/tilution/grosskueche-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--5",
      bottom: "tilution-service-card__fade-bottom--5",
    },
  },
  {
    title: "Retail & Gewerbeflächen",
    attributes: ["Großformate", "Rüttelboden", "Ebenheit"],
    image: "/images/tilution/retail-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--6",
      bottom: "tilution-service-card__fade-bottom--6",
    },
  },
  {
    title: "Wohnungsbau & Großprojekte",
    attributes: ["Serienbäder", "Treppenhäuser", "Wirtschaftliche Beläge"],
    image: "/images/tilution/wohngebaeude-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--7",
      bottom: "tilution-service-card__fade-bottom--7",
    },
  },
  {
    title: "Sonder- & Designflächen",
    attributes: ["Mosaik", "Dekorfliesen", "Materialkombinationen"],
    image: "/images/tilution/sonderflaechen-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--8",
      bottom: "tilution-service-card__fade-bottom--8",
    },
  },
];

function ServiceCard({ area }: { area: ServiceArea }) {
  return (
    <article className="tilution-service-card group">
      <Image
        src={area.image}
        alt={`${area.title} Platzhalterbild`}
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

export function TilutionServicesSection() {
  return (
    <SectionShell id="leistungen">
      <section className="tilution-services-section">
        <header className="tilution-services-header">
          <p className="tilution-services-eyebrow">Leistungen</p>
          <h2 className="tilution-services-heading">
            Leistungen im Objektbau
          </h2>
          <p className="tilution-services-subline">
            Technische Fliesen- und Plattenarbeiten für anspruchsvolle
            Großprojekte.
          </p>
        </header>

        <div className="tilution-services-grid">
          {serviceAreas.map((area) => (
            <ServiceCard key={area.title} area={area} />
          ))}
        </div>

        <div className="tilution-services-cta">
          <div>
            <h3 className="tilution-services-cta__title">
              Sie planen ein Großprojekt mit anspruchsvollen Fliesenarbeiten?
            </h3>
            <p className="tilution-services-cta__text">
              Sprechen Sie uns frühzeitig an – wir unterstützen bei technischen
              Details, Materialauswahl und Ausführung.
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
