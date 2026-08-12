"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
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
    title: "Wohnungsbau",
    attributes: ["Serienbäder", "Treppenhäuser", "Wirtschaftliche Beläge"],
    image: "/images/tilution/wohngebaeude-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--7",
      bottom: "tilution-service-card__fade-bottom--7",
    },
  },
  {
    title: "Fassaden",
    attributes: ["Klinker", "Riemchen", "Keramik- und Feinsteinzeug"],
    image: "/images/tilution/fassaden-ki-bild.png",
    overlay: {
      top: "tilution-service-card__fade-top--8",
      bottom: "tilution-service-card__fade-bottom--8",
    },
  },
];

const gruenewaldServiceAreas: ServiceArea[] = [
  {
    title: "Außengestaltung",
    attributes: ["Terrassen", "Wege", "Außenbereiche"],
    image: "/images/gruenewald-aussengestaltung-terrasse.png",
    overlay: { top: "tilution-service-card__fade-top--1", bottom: "tilution-service-card__fade-bottom--1" },
  },
  {
    title: "Badsanierung",
    attributes: ["Planung", "Modernisierung", "Ausführung"],
    image: "/about-bathroom.png",
    overlay: { top: "tilution-service-card__fade-top--2", bottom: "tilution-service-card__fade-bottom--2" },
  },
  {
    title: "Haus- & Wohnsanierung",
    attributes: ["Umbau", "Modernisierung", "Werterhalt"],
    image: "/images/gruenewald-haus-wohnsanierung.png",
    overlay: { top: "tilution-service-card__fade-top--3", bottom: "tilution-service-card__fade-bottom--3" },
  },
  {
    title: "Generalunternehmer",
    attributes: ["Planung", "Koordination", "Realisierung"],
    image: "/images/gruenewald/generalunternehmer.png",
    overlay: { top: "tilution-service-card__fade-top--4", bottom: "tilution-service-card__fade-bottom--4" },
  },
];

const verwaltungServiceAreas: ServiceArea[] = [
  { title: "Finanzbuchhaltung", attributes: ["Zahlen", "Abschlüsse", "Controlling"], image: "/images/verwaltung/leistung-finanzbuchhaltung.png", overlay: { top: "tilution-service-card__fade-top--1", bottom: "tilution-service-card__fade-bottom--1" } },
  { title: "Debitorenbuchhaltung", attributes: ["Forderungen", "Bürgschaften", "Rechtsfälle"], image: "/images/verwaltung/leistung-debitorenbuchhaltung.png", overlay: { top: "tilution-service-card__fade-top--2", bottom: "tilution-service-card__fade-bottom--2" } },
  { title: "Kreditorenbuchhaltung", attributes: ["Verbindlichkeiten", "Zahlungsverkehr", "Immobilienverwaltung"], image: "/images/verwaltung/leistung-kreditorenbuchhaltung.png", overlay: { top: "tilution-service-card__fade-top--6", bottom: "tilution-service-card__fade-bottom--6" } },
  { title: "Personalwesen", attributes: ["Mitarbeitende", "Organisation", "Entwicklung"], image: "/images/verwaltung/leistung-personalwesen.png", overlay: { top: "tilution-service-card__fade-top--3", bottom: "tilution-service-card__fade-bottom--3" } },
  { title: "IT", attributes: ["Systeme", "Support", "Infrastruktur"], image: "/images/verwaltung/leistung-it.png", overlay: { top: "tilution-service-card__fade-top--4", bottom: "tilution-service-card__fade-bottom--4" } },
  { title: "Allgemeine Verwaltungsaufgaben", attributes: ["Koordination", "Service", "Administration"], image: "/images/verwaltung/leistung-allgemeine-verwaltung.png", overlay: { top: "tilution-service-card__fade-top--5", bottom: "tilution-service-card__fade-bottom--5" } },
];

const gruenewaldServiceDetails: Record<string, { image: string; alt: string; paragraphs: string[]; highlights?: string[] }> = {
  "Außengestaltung": {
    image: "/images/gruenewald-aussengestaltung-terrasse.png",
    alt: "Modern gestaltete Terrasse mit Sitzbereich und Garten",
    paragraphs: [
      "Wir verstehen Ihren Außenbereich als Verlängerung Ihres Lebensstils. Deshalb verbinden wir funktionale, ästhetische Lösungen mit langfristiger Haltbarkeit – für Ihren Wohlfühlort unter freiem Himmel.",
      "Ob gemütliches Refugium oder geselliger Treffpunkt: Mit vielfältigen Materialien und Stilen gestalten wir Ihren Lieblingsplatz – modern und minimalistisch oder rustikal und naturnah.",
    ],
  },
  "Badsanierung": {
    image: "/about-bathroom.png",
    alt: "Modern saniertes Badezimmer mit hochwertiger Ausstattung",
    paragraphs: [
      "Ihr Bad soll funktional sein und zugleich Ihren persönlichen Stil widerspiegeln. Wir verwandeln Ihr altes Badezimmer in einen Ort der Erholung – modern-minimalistisch oder klassisch-zeitlos.",
      "Dabei verbinden wir ansprechende Ästhetik mit einer attraktiven Wertsteigerung Ihrer Immobilie. Retro-Fliesen, platzsparende Nischen, raffinierte LED-Beleuchtung oder die Dusche vor Ihrem Lieblingsfoto – you name it, wir machen’s möglich.",
    ],
  },
  "Haus- & Wohnsanierung": {
    image: "/images/gruenewald-haus-wohnsanierung.png",
    alt: "Hochwertig sanierter Wohn- und Essbereich",
    paragraphs: [
      "Nachhaltige Energiesanierung aus einer Hand – von Dämmung und Abdichtung bis zu effizienter Heiz- und Lüftungstechnik. Passende Fenster und Bodenbeläge verbinden Energieeffizienz mit Ihrem Stil: für weniger Heizkosten und mehr Wohnkomfort.",
    ],
    highlights: [
      "Fassade & Innenbereich",
      "Decke & Wand",
      "Streichen & Beschichten",
      "Verputzen & Verkleiden",
      "Fliese, Designvinyl, Lehm, Parkett & Naturstein",
    ],
  },
  "Generalunternehmer": {
    image: "/images/gruenewald/generalunternehmer-overlay.png",
    alt: "Schlüsselübergabe nach erfolgreicher Sanierung",
    paragraphs: [
      "Alles aus einer Hand: Ob Altbausanierung, energetische Modernisierung oder Ausbau nach individuellen Wünschen – wir bieten umfassende Leistungen rund um Umbau, Sanierung und Modernisierung.",
      "Als Generalunternehmer koordinieren wir alle Gewerke effizient und sorgen für einen reibungslosen Ablauf. So erhalten Sie maßgeschneiderte Lösungen mit einem zentralen Ansprechpartner.",
    ],
  },
};

function ServiceCard({ area, onOpen }: { area: ServiceArea; onOpen?: () => void }) {
  const card = (
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
        <h3 className={`tilution-service-card__title${area.title === "Allgemeine Verwaltungsaufgaben" ? " tilution-service-card__title--long" : ""}${area.title === "Generalunternehmer" ? " tilution-service-card__title--single-line" : ""}`}>
          {area.title === "Allgemeine Verwaltungsaufgaben" ? (
            <>Allgemeine<br /><span>Verwaltungsaufgaben</span></>
          ) : area.title}
        </h3>

        <p className={`tilution-service-card__attributes${area.title === "Badsanierung" ? " tilution-service-card__attributes--bathroom" : ""}${area.title === "Generalunternehmer" ? " tilution-service-card__attributes--single-line" : ""}`}>
          {area.title === "Badsanierung" ? (
            <>
              <span className="tilution-service-card__attributes-line">
                <span>Planung</span>
                <span className="tilution-service-card__separator" aria-hidden="true">|</span>
                <span>Modernisierung</span>
              </span>
              <span className="tilution-service-card__attributes-line">Ausführung</span>
            </>
          ) : area.attributes.map((attribute, index) => (
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

  return onOpen ? (
    <button
      type="button"
      className={`tilution-service-card-button${area.title === "Generalunternehmer" ? " tilution-service-card-button--wide" : ""}`}
      onClick={onOpen}
      aria-label={`${area.title} im Detail ansehen`}
    >
      {card}
    </button>
  ) : card;
}

export function TilutionServicesSection({ variant = "tilution" }: { variant?: "tilution" | "gruenewald" | "verwaltung" }) {
  const isGruenewald = variant === "gruenewald";
  const isVerwaltung = variant === "verwaltung";
  const areas = isGruenewald ? gruenewaldServiceAreas : isVerwaltung ? verwaltungServiceAreas : serviceAreas;
  const [activeServiceTitle, setActiveServiceTitle] = useState<string | null>(null);
  const activeServiceDetails = activeServiceTitle ? gruenewaldServiceDetails[activeServiceTitle] : undefined;
  const activeServiceIndex = activeServiceTitle
    ? gruenewaldServiceAreas.findIndex((area) => area.title === activeServiceTitle)
    : -1;

  const switchService = (direction: -1 | 1) => {
    const nextArea = gruenewaldServiceAreas[activeServiceIndex + direction];
    if (nextArea && gruenewaldServiceDetails[nextArea.title]) {
      setActiveServiceTitle(nextArea.title);
    }
  };

  useEffect(() => {
    if (!activeServiceDetails) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveServiceTitle(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeServiceDetails]);

  return (
    <SectionShell id="leistungen">
      <section className="tilution-services-section">
        <header className="tilution-services-header">
          <p className="tilution-services-eyebrow">Leistungen</p>
          <h2 className="tilution-services-heading">
            {isGruenewald ? "Leistungen für Ihr Zuhause" : isVerwaltung ? "Leistungen" : "Leistungen im Objektbau"}
          </h2>
          {!isVerwaltung ? <p className={`tilution-services-subline${isGruenewald ? " tilution-services-subline--single-line" : ""}`}>
            {isGruenewald
              ? "Persönliche Planung und hochwertige Ausführung für private Bau- und Sanierungsprojekte."
              : "Technische Fliesen- und Plattenarbeiten für anspruchsvolle Großprojekte."}
          </p> : null}
        </header>

        <div className={`tilution-services-grid${isGruenewald ? " gruenewald-services-grid" : ""}${isVerwaltung ? " verwaltung-services-grid" : ""}`}>
          {areas.map((area) => (
            <ServiceCard
              key={area.title}
              area={area}
              onOpen={isGruenewald && gruenewaldServiceDetails[area.title] ? () => setActiveServiceTitle(area.title) : undefined}
            />
          ))}
        </div>

        <div className="tilution-services-cta">
          <div>
            <h3 className="tilution-services-cta__title">
              {isGruenewald
                ? "Sie planen ein neues Bad oder möchten Ihr Zuhause modernisieren?"
                : isVerwaltung
                  ? "Sie haben Fragen zu unseren zentralen Verwaltungsbereichen?"
                : "Sie planen ein Großprojekt mit anspruchsvollen Fliesenarbeiten?"}
            </h3>
            <p className="tilution-services-cta__text">
              {isGruenewald
                ? "Sprechen Sie mit uns über Ihre Ideen – wir begleiten Sie von der Beratung bis zur fertigen Umsetzung."
                : isVerwaltung
                  ? "Sprechen Sie uns an – wir leiten Ihr Anliegen direkt an die richtige Ansprechperson weiter."
                : "Sprechen Sie uns frühzeitig an – wir unterstützen bei technischen Details, Materialauswahl und Ausführung."}
            </p>
          </div>

          <Link href="#kontakt" className="tilution-services-cta__button">
            <span>{isVerwaltung ? "Kontakt aufnehmen" : "Projekt anfragen"}</span>
            <ArrowRight className="tilution-services-cta__button-icon" />
          </Link>
        </div>
      </section>

      {activeServiceTitle && activeServiceDetails ? createPortal((
        <div
          className="gruenewald-service-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveServiceTitle(null);
          }}
        >
          <div className="gruenewald-service-modal__panel">
            <button
              type="button"
              className="gruenewald-service-modal__close"
              onClick={() => setActiveServiceTitle(null)}
              aria-label="Detailansicht schließen"
              autoFocus
            >
              <X aria-hidden="true" />
            </button>

            {activeServiceIndex > 0 ? (
              <button
                type="button"
                className="gruenewald-service-modal__nav gruenewald-service-modal__nav--previous"
                onClick={() => switchService(-1)}
                aria-label="Vorherige Leistung"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            ) : null}
            {activeServiceIndex < gruenewaldServiceAreas.length - 1 ? (
              <button
                type="button"
                className="gruenewald-service-modal__nav gruenewald-service-modal__nav--next"
                onClick={() => switchService(1)}
                aria-label="Nächste Leistung"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            ) : null}

            <div className="gruenewald-service-modal__image-wrap">
              <Image
                src={activeServiceDetails.image}
                alt={activeServiceDetails.alt}
                fill
                className="gruenewald-service-modal__image"
                sizes="(min-width: 900px) 58vw, 100vw"
                priority
              />
            </div>

            <div className={`gruenewald-service-modal__content${activeServiceDetails.highlights ? " gruenewald-service-modal__content--with-highlights" : ""}`}>
              <p className="gruenewald-service-modal__eyebrow">Leistung</p>
              <h2 id="service-modal-title">
                {activeServiceTitle}
              </h2>
              {activeServiceDetails.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {activeServiceDetails.highlights ? (
                <ul className="gruenewald-service-modal__highlights">
                  {activeServiceDetails.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      ), document.body) : null}
    </SectionShell>
  );
}
