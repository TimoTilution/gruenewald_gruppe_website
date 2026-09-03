"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";
import { pushUrlState, pushUrlWithoutScroll } from "@/lib/preserve-scroll-url";

type ServiceArea = {
  title: string;
  attributes: [string, string, string];
  image: string;
  overlay: {
    top: string;
    bottom: string;
  };
};

type GruenewaldServiceDetail = {
  title: string;
  image: string;
  alt: string;
  paragraphs: string[];
  lead?: string;
  closing?: string;
  highlights?: string[];
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

const gruenewaldServiceDetails: Record<string, GruenewaldServiceDetail> = {
  "Außengestaltung": {
    title: "Außengestaltung",
    image: "/images/gruenewald-aussengestaltung-terrasse.png",
    alt: "Modern gestaltete Terrasse mit Sitzbereich und Garten",
    paragraphs: [
      "Wir verstehen Ihren Außenbereich als Verlängerung Ihres Lebensstils. Deshalb verbinden wir funktionale, ästhetische Lösungen mit langfristiger Haltbarkeit – für Ihren Wohlfühlort unter freiem Himmel.",
      "Ob gemütliches Refugium oder geselliger Treffpunkt: Mit vielfältigen Materialien und Stilen gestalten wir Ihren Lieblingsplatz – modern und minimalistisch oder rustikal und naturnah.",
    ],
  },
  "Badsanierung": {
    title: "Badsanierung",
    image: "/about-bathroom.png",
    alt: "Modern saniertes Badezimmer mit hochwertiger Ausstattung",
    paragraphs: [
      "Ihr Bad soll funktional sein und zugleich Ihren persönlichen Stil widerspiegeln. Wir verwandeln Ihr altes Badezimmer in einen Ort der Erholung – modern-minimalistisch oder klassisch-zeitlos.",
      "Dabei verbinden wir ansprechende Ästhetik mit einer attraktiven Wertsteigerung Ihrer Immobilie. Retro-Fliesen, platzsparende Nischen, raffinierte LED-Beleuchtung oder die Dusche vor Ihrem Lieblingsfoto – you name it, wir machen’s möglich.",
    ],
  },
  "Haus- & Wohnsanierung": {
    title: "Haus- & Wohnsanierung",
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
    title: "Generalunternehmer",
    image: "/images/gruenewald/generalunternehmer-overlay.png",
    alt: "Schlüsselübergabe nach erfolgreicher Sanierung",
    paragraphs: [
      "Alles aus einer Hand: Ob Altbausanierung, energetische Modernisierung oder Ausbau nach individuellen Wünschen – wir bieten umfassende Leistungen rund um Umbau, Sanierung und Modernisierung.",
      "Als Generalunternehmer koordinieren wir alle Gewerke effizient und sorgen für einen reibungslosen Ablauf. So erhalten Sie maßgeschneiderte Lösungen mit einem zentralen Ansprechpartner.",
    ],
  },
};

const gruenewaldServiceSubcategories: Record<string, GruenewaldServiceDetail[]> = {
  "Außengestaltung": [
    {
      title: "Balkone & Terrassen",
      image: "/images/gruenewald/aussengestaltung-balkone-terrassen.png",
      alt: "Hochwertig gestalteter Balkon mit Sitzbereich und Stadtblick",
      lead: "Draußen zuhause.",
      paragraphs: [
        "Wir gestalten Balkone und Terrassen als echte Erweiterung Ihres Wohnraums – funktional, hochwertig und passend zu Ihrem persönlichen Stil.",
        "Mit langlebigen Materialien, durchdachten Details und einer Gestaltung, die zu Ihrem Zuhause passt, schaffen wir Außenbereiche zum Entspannen, Genießen und Zusammensein.",
      ],
      closing: "Für mehr Wohngefühl unter freiem Himmel.",
    },
    {
      title: "Treppen & Pflasterarbeiten",
      image: "/images/gruenewald/aussengestaltung-treppen-pflasterarbeiten.png",
      alt: "Außentreppe aus Stein neben einer Natursteinmauer",
      lead: "Wege, die Eindruck machen.",
      paragraphs: [
        "Treppen, Wege und Pflasterflächen prägen den ersten Eindruck Ihres Zuhauses – deshalb verbinden wir Funktion, Gestaltung und Langlebigkeit zu einem stimmigen Gesamtbild.",
        "Ob elegante Steintreppe, klar geführter Gartenweg oder hochwertig gepflasterte Fläche: Wir schaffen Außenbereiche, die praktisch sind und dauerhaft gut aussehen.",
      ],
      closing: "Für einen Auftritt, der schon vor der Haustür beginnt.",
    },
    {
      title: "Gärten & Außenanlagen",
      image: "/images/gruenewald/aussengestaltung-gaerten-aussenanlagen.png",
      alt: "Bepflanzte Gartenanlage mit Natursteinweg und Stützmauern",
      lead: "Freiraum, der zu Ihnen passt.",
      paragraphs: [
        "Wir gestalten Gärten und Außenanlagen so, dass sie zu Ihrem Zuhause, Ihrem Stil und Ihrer Nutzung passen – vom einladenden Vorgarten bis zum großzügigen Rückzugsort.",
        "Ob modern, natürlich, geradlinig oder verspielt: Mit einer durchdachten Gestaltung schaffen wir Außenbereiche, die Atmosphäre, Funktion und Wertigkeit miteinander verbinden.",
      ],
      closing: "Für einen Garten, der mehr ist als nur Grünfläche.",
    },
    {
      title: "Pools & Saunen",
      image: "/images/gruenewald/aussengestaltung-pools-saunen.png",
      alt: "Poolanlage während des Baus und nach der Fertigstellung",
      lead: "Wellness unter freiem Himmel.",
      paragraphs: [
        "Ob Pool oder Außensauna – wir schaffen private Rückzugsorte, die Entspannung, Gestaltung und hochwertige Ausführung miteinander verbinden.",
        "Mit langlebigen Materialien, durchdachter Planung und handwerklicher Präzision entstehen Außenbereiche, die nicht nur gut aussehen, sondern Ihnen dauerhaft Freude bereiten.",
      ],
      closing: "Für Erholung, die direkt vor Ihrer Tür beginnt.",
    },
  ],
  "Badsanierung": [
    {
      title: "Modernisierung",
      image: "/images/gruenewald/badsanierung-modernisierung.png",
      alt: "Modernisiertes helles Badezimmer mit integrierter Holzsauna",
      lead: "Aus alt wird genau Ihr Bad.",
      paragraphs: [
        "Wir modernisieren Ihr Badezimmer technisch, funktional und gestalterisch – passend zu Ihren Wünschen und Ihrem Zuhause.",
        "Ob neue Fliesen, moderne Beleuchtung, clevere Stauraumlösungen oder eine komplett neue Raumwirkung: Wir machen aus Ihrem bestehenden Bad einen Ort, an dem Sie sich wieder gerne aufhalten.",
      ],
      closing: "Durchdacht geplant. Hochwertig umgesetzt. Ganz nach Ihrem Stil.",
    },
    {
      title: "Wanne zu Dusche",
      image: "/images/gruenewald/badsanierung-wanne-zu-dusche.png",
      alt: "Modernes Badezimmer mit großzügiger bodengleicher Dusche",
      lead: "Mehr Platz. Mehr Komfort. Weniger Hürden.",
      paragraphs: [
        "Wir ersetzen Ihre bestehende Badewanne durch eine moderne Dusche – komfortabel, platzsparend und passend zu Ihrem Badezimmer.",
        "Ob großzügige Walk-in-Dusche oder kompakte Lösung für kleinere Räume: Wir schaffen einen Duschbereich, der den Alltag einfacher macht und Ihr Bad gleichzeitig moderner wirken lässt.",
      ],
      closing: "Bequem einsteigen. Besser nutzen. Neu wohlfühlen.",
    },
    {
      title: "Barrierefreier Umbau",
      image: "/images/gruenewald/badsanierung-barrierefreier-umbau.png",
      alt: "Barrierefreies Badezimmer mit Haltegriffen und Sitzbadewanne",
      lead: "Komfort, der mitdenkt.",
      paragraphs: [
        "Wir gestalten Ihr Badezimmer so, dass es sicher, komfortabel und langfristig gut nutzbar bleibt – ohne dabei auf modernes Design zu verzichten.",
        "Bodengleiche Duschen, rutschhemmende Oberflächen, durchdachte Bewegungsflächen sowie passende Halte- und Sitzlösungen sorgen für mehr Sicherheit und Selbstständigkeit im Alltag.",
      ],
      closing: "Heute komfortabel. Morgen genauso gut.",
    },
    {
      title: "Raumlösungen: Mini-Bäder",
      image: "/images/gruenewald/badsanierung-mini-baeder.png",
      alt: "Platzsparend eingerichtetes modernes Mini-Bad",
      lead: "Kleiner Raum. Große Möglichkeiten.",
      paragraphs: [
        "Auch auf wenigen Quadratmetern lässt sich ein vollwertiges und komfortables Badezimmer realisieren.",
        "Mit cleverer Raumaufteilung, platzsparenden Sanitärobjekten und durchdachten Stauraumlösungen nutzen wir jeden Zentimeter sinnvoll – ohne dass Funktion oder Gestaltung zu kurz kommen.",
      ],
      closing: "So wird aus wenig Fläche ein Bad, das sich nach mehr anfühlt.",
    },
    {
      title: "Sauna & Schwimmbad",
      image: "/images/gruenewald/badsanierung-sauna-schwimmbad.png",
      alt: "Private Sauna mit angrenzendem modernem Duschbereich",
      lead: "Wellness, die zu Hause beginnt.",
      paragraphs: [
        "Ob private Sauna oder eigener Indoorpool – wir schaffen Rückzugsorte, die Entspannung, Komfort und hochwertige Gestaltung miteinander verbinden.",
        "Von der Planung bis zur Umsetzung entwickeln wir individuelle Lösungen, die zu Ihrem Zuhause, Ihren Wünschen und den räumlichen Gegebenheiten passen.",
      ],
      closing: "Für mehr Erholung. Mehr Komfort. Mehr Zuhause.",
    },
  ],
  "Haus- & Wohnsanierung": [
    {
      title: "Malerarbeiten & Bodenbeläge",
      image: "/images/gruenewald/wohnsanierung-malerarbeiten-bodenbelaege.png",
      alt: "Fachgerechtes Verlegen großformatiger dunkler Bodenfliesen",
      lead: "Neue Oberflächen. Neues Wohngefühl.",
      paragraphs: [
        "Ob Wände, Decken oder Böden – wir verleihen Ihren Räumen mit hochwertigen Materialien und sauberer Ausführung ein neues Erscheinungsbild.",
        "Von klassischen Maler- und Putzarbeiten bis zu Parkett, Designvinyl, Fliesen oder Naturstein: Wir schaffen Oberflächen, die zu Ihrem Zuhause passen und Funktion, Qualität und Gestaltung miteinander verbinden.",
      ],
      closing: "Für Räume, die sich wieder richtig nach Zuhause anfühlen.",
    },
    {
      title: "Energetische Sanierung",
      image: "/images/gruenewald/wohnsanierung-energetische-sanierung.png",
      alt: "Energieausweis vor einem modernisierten Wohnhaus",
      lead: "Weniger Energieverbrauch. Mehr Wohnkomfort.",
      paragraphs: [
        "Wir verbessern die Energieeffizienz Ihres Zuhauses mit passenden Lösungen für Dämmung sowie moderne Heiz- und Kühlsysteme.",
        "Ob Innen- oder Außendämmung, ökologische Dämmstoffe oder Wärmedämmverbundsysteme: Wir entwickeln Maßnahmen passend zu Ihrem Gebäude und Sanierungsfahrplan.",
      ],
      closing: "Für ein Zuhause, das effizienter, komfortabler und zukunftsfähiger wird.",
    },
    {
      title: "Lehm & Fachwerk",
      image: "/images/gruenewald/wohnsanierung-lehmbau-fachwerksanierung.png",
      alt: "Traditioneller Lehmbaustoff mit natürlichen Pflanzenfasern",
      lead: "Tradition bewahren. Substanz erhalten.",
      paragraphs: [
        "Wir sanieren Fachwerkhäuser mit Sorgfalt, Erfahrung und einem Gespür für historische Bausubstanz – auch unter Berücksichtigung von Denkmalschutzauflagen.",
        "Mit natürlichen Baustoffen wie Lehm, fachgerechter Instandsetzung und passenden Lösungen für Gefache, Balken, Fenster, Türen und Böden verbinden wir traditionelles Handwerk mit zeitgemäßem Wohnkomfort.",
      ],
      closing: "Für Gebäude mit Geschichte – und eine Zukunft, die dazu passt.",
    },
  ],
};

const emptyServiceSubcategories: GruenewaldServiceDetail[] = [];

const gruenewaldServiceSlugs: Record<string, string> = {
  "Außengestaltung": "aussengestaltung",
  "Badsanierung": "badsanierung",
  "Haus- & Wohnsanierung": "haus-wohnsanierung",
  "Generalunternehmer": "generalunternehmer",
};

const gruenewaldServiceDetailSlugs: Record<string, Record<string, string>> = {
  "Außengestaltung": {
    "Balkone & Terrassen": "balkone-terrassen",
    "Treppen & Pflasterarbeiten": "treppen-pflasterarbeiten",
    "Gärten & Außenanlagen": "gaerten-aussenanlagen",
    "Pools & Saunen": "pools-saunen",
  },
  "Badsanierung": {
    "Modernisierung": "modernisierung",
    "Wanne zu Dusche": "wanne-zu-dusche",
    "Barrierefreier Umbau": "barrierefreier-umbau",
    "Raumlösungen: Mini-Bäder": "raumloesungen-mini-baeder",
    "Sauna & Schwimmbad": "sauna-schwimmbad",
  },
  "Haus- & Wohnsanierung": {
    "Malerarbeiten & Bodenbeläge": "malerarbeiten-bodenbelaege",
    "Energetische Sanierung": "energetische-sanierung",
    "Lehm & Fachwerk": "lehm-fachwerk",
  },
};

function getGruenewaldServicePath(title: string, detailTitle?: string) {
  const serviceSlug = gruenewaldServiceSlugs[title];
  if (!serviceSlug) return "/gruenewaldgmbh/leistungen";

  const detailSlug = detailTitle
    ? gruenewaldServiceDetailSlugs[title]?.[detailTitle]
    : undefined;

  return detailSlug
    ? `/gruenewaldgmbh/leistungen/${serviceSlug}/${detailSlug}`
    : `/gruenewaldgmbh/leistungen/${serviceSlug}`;
}

function ServiceCard({ area, onOpen }: { area: ServiceArea; onOpen?: () => void }) {
  const card = (
    <article className="tilution-service-card group">
      <Image
        src={getOptimizedSiteImageSrc(area.image)}
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
  const [activeServiceDetailIndex, setActiveServiceDetailIndex] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const activeServiceSequence = activeServiceTitle
    ? [
        gruenewaldServiceDetails[activeServiceTitle],
        ...(gruenewaldServiceSubcategories[activeServiceTitle] ?? emptyServiceSubcategories),
      ].filter((detail): detail is GruenewaldServiceDetail => Boolean(detail))
    : emptyServiceSubcategories;
  const activeServiceDetails = activeServiceSequence[activeServiceDetailIndex];
  const contactPath = isGruenewald ? "/gruenewaldgmbh/kontakt" : "/tilution/kontakt";

  const scrollToContact = () => {
    const targetSection = document.getElementById("kontakt");
    if (!targetSection) return;

    const headerOffset = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const targetTop =
      targetSection.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });
    pushUrlState(contactPath);
  };

  const openService = (title: string) => {
    setActiveServiceTitle(title);
    setActiveServiceDetailIndex(0);
    pushUrlWithoutScroll(getGruenewaldServicePath(title));
  };

  const closeService = () => {
    setActiveServiceTitle(null);
    setActiveServiceDetailIndex(0);
    if (isGruenewald) {
      pushUrlWithoutScroll("/gruenewaldgmbh/leistungen");
    }
  };

  const switchServiceDetail = (direction: -1 | 1) => {
    setActiveServiceDetailIndex((current) => {
      const nextIndex = current + direction;
      if (nextIndex < 0 || nextIndex >= activeServiceSequence.length) {
        return current;
      }

      const nextDetail = activeServiceSequence[nextIndex];
      if (activeServiceTitle && nextDetail) {
        pushUrlWithoutScroll(
          getGruenewaldServicePath(
            activeServiceTitle,
            nextIndex > 0 ? nextDetail.title : undefined
          )
        );
      }

      return nextIndex;
    });
  };

  useEffect(() => {
    if (!activeServiceDetails) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("site-overlay-open");
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeService();
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("site-overlay-open");
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
          {areas.map((area, index) => (
            <div
              key={area.title}
              className={`${index >= 4 && !showAllServices ? "mobile-service-hidden" : ""}${isGruenewald && area.title === "Generalunternehmer" ? " gruenewald-service-grid-item--wide" : ""}`.trim() || undefined}
            >
              <ServiceCard
                area={area}
                onOpen={isGruenewald && gruenewaldServiceDetails[area.title] ? () => openService(area.title) : undefined}
              />
            </div>
          ))}
        </div>

        {areas.length > 4 ? (
          <button
            type="button"
            className="mobile-services-toggle"
            aria-expanded={showAllServices}
            onClick={() => setShowAllServices((current) => !current)}
          >
            <span>{showAllServices ? "Weniger Leistungen anzeigen" : `${areas.length - 4} weitere Leistungen anzeigen`}</span>
            {showAllServices ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
          </button>
        ) : null}

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

          {!isVerwaltung ? (
            <button
              type="button"
              onClick={scrollToContact}
              className="tilution-services-cta__button"
            >
              <span>Projekt anfragen</span>
              <ArrowRight className="tilution-services-cta__button-icon" />
            </button>
          ) : null}
        </div>
      </section>

      {activeServiceTitle && activeServiceDetails ? createPortal((
        <div
          className="gruenewald-service-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeService();
          }}
        >
          <div className="gruenewald-service-modal__panel">
            <button
              type="button"
              className="gruenewald-service-modal__close"
              onClick={closeService}
              aria-label="Detailansicht schließen"
              autoFocus
            >
              <X aria-hidden="true" />
            </button>

            {activeServiceDetailIndex > 0 ? (
              <button
                type="button"
                className="gruenewald-service-modal__nav gruenewald-service-modal__nav--previous"
                onClick={() => switchServiceDetail(-1)}
                aria-label="Vorherigen Inhalt anzeigen"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            ) : null}
            {activeServiceDetailIndex < activeServiceSequence.length - 1 ? (
              <button
                type="button"
                className="gruenewald-service-modal__nav gruenewald-service-modal__nav--next"
                onClick={() => switchServiceDetail(1)}
                aria-label="Nächste Unterkategorie anzeigen"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            ) : null}

            <div className="gruenewald-service-modal__image-wrap">
              <Image
                src={getOptimizedSiteImageSrc(activeServiceDetails.image)}
                alt={activeServiceDetails.alt}
                fill
                className={`gruenewald-service-modal__image${activeServiceTitle === "Generalunternehmer" ? " gruenewald-service-modal__image--generalunternehmer" : ""}`}
                sizes="(min-width: 900px) 58vw, 100vw"
                priority
              />
            </div>

            <div className={`gruenewald-service-modal__content${activeServiceDetails.highlights ? " gruenewald-service-modal__content--with-highlights" : ""}`}>
              {activeServiceDetailIndex > 0 ? (
                <p className="gruenewald-service-modal__eyebrow">
                  {activeServiceTitle}
                </p>
              ) : null}
              <h2 id="service-modal-title">
                {activeServiceDetails.title}
              </h2>
              {activeServiceDetails.lead ? (
                <p className="gruenewald-service-modal__statement">
                  {activeServiceDetails.lead}
                </p>
              ) : null}
              {activeServiceDetails.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {activeServiceDetails.closing ? (
                <p className="gruenewald-service-modal__statement gruenewald-service-modal__statement--closing">
                  {activeServiceDetails.closing}
                </p>
              ) : null}
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
