"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import {
  tilutionServiceDetails,
  tilutionServiceDetailsByTitle,
} from "@/data/tilution-service-details";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";
import { pushUrlState, pushUrlWithoutScroll } from "@/lib/preserve-scroll-url";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { withTrailingSlash } from "@/lib/site-path";
import { getReferencePath, references } from "@/data/site-architecture";
import { getOptimizedReferenceSrc } from "@/lib/reference-image";

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
    title: "Retail & Großflächen",
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

const tilutionReferenceCategoryByService: Record<string, string> = {
  "Schwimmbäder & Thermen": "schwimmbaeder-thermen",
  "Hotels & Wellness": "hotels-wellness",
  "Öffentliche Einrichtungen": "oeffentliche-einrichtungen",
  "Kliniken & Pflegebereiche": "kliniken-pflegebereiche",
  "Großküchen": "grosskuechen",
  "Retail & Großflächen": "retail-gewerbeflaechen",
  Wohnungsbau: "wohnungsbau",
  Fassaden: "fassaden",
};

const gruenewaldReferenceCategoryByService: Record<string, string> = {
  "Außengestaltung": "aussengestaltung",
  "Badsanierung": "badsanierung",
  "Haus- & Wohnsanierung": "haus-wohnsanierung",
};

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
      "Wir gestalten Terrassen, Wege, Treppen und Außenanlagen, die Funktion, Ästhetik und dauerhafte Qualität verbinden.",
      "Mit passenden Materialien und präziser Ausführung entsteht Ihr persönlicher Lieblingsplatz im Freien.",
    ],
  },
  "Badsanierung": {
    title: "Badsanierung",
    image: "/about-bathroom.png",
    alt: "Modern saniertes Badezimmer mit hochwertiger Ausstattung",
    paragraphs: [
      "Wir realisieren komplette Badsanierungen mit sicherer Abdichtung, modernen Fliesen und durchdachter Raumplanung.",
      "Bodengleiche Duschen und präzise Details schaffen ein Bad mit dauerhaftem Komfort und persönlichem Stil.",
    ],
  },
  "Haus- & Wohnsanierung": {
    title: "Haus- & Wohnsanierung",
    image: "/images/gruenewald-haus-wohnsanierung.png",
    alt: "Hochwertig sanierter Wohn- und Essbereich",
    paragraphs: [
      "Wir realisieren Haus- und Wohnsanierungen – von Innenausbau und Bodenbelägen bis zu energetischen Maßnahmen.",
      "Abgestimmte Materialien und saubere Abläufe schaffen mehr Wohnkomfort, Energieeffizienz und Werterhalt.",
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
        "Wir gestalten Balkone und Terrassen als hochwertige, wetterbeständige Erweiterung Ihres Wohnraums.",
        "Fachgerechter Terrassenbau und langlebige Beläge schaffen Platz zum Entspannen und Zusammensein.",
      ],
      closing: "Für mehr Wohngefühl unter freiem Himmel.",
    },
    {
      title: "Treppen & Pflasterarbeiten",
      image: "/images/gruenewald/aussengestaltung-treppen-pflasterarbeiten.png",
      alt: "Außentreppe aus Stein neben einer Natursteinmauer",
      lead: "Wege, die Eindruck machen.",
      paragraphs: [
        "Treppen, Gartenwege und Pflasterarbeiten verbinden Funktion und Gestaltung zu einem stimmigen Gesamtbild.",
        "Wir realisieren belastbare Außenflächen, die sicher nutzbar sind und dauerhaft hochwertig wirken.",
      ],
      closing: "Für einen Auftritt, der schon vor der Haustür beginnt.",
    },
    {
      title: "Gärten & Außenanlagen",
      image: "/images/gruenewald/aussengestaltung-gaerten-aussenanlagen.png",
      alt: "Bepflanzte Gartenanlage mit Natursteinweg und Stützmauern",
      lead: "Freiraum, der zu Ihnen passt.",
      paragraphs: [
        "Wir planen Gärten und Außenanlagen passend zu Ihrem Zuhause, Ihrem Stil und der gewünschten Nutzung.",
        "Wege, Pflanzflächen und Einfassungen verbinden Atmosphäre und Funktion zu einem harmonischen Außenbereich.",
      ],
      closing: "Für einen Garten, der mehr ist als nur Grünfläche.",
    },
    {
      title: "Pools & Saunen",
      image: "/images/gruenewald/aussengestaltung-pools-saunen.png",
      alt: "Poolanlage während des Baus und nach der Fertigstellung",
      lead: "Wellness unter freiem Himmel.",
      paragraphs: [
        "Mit individuellem Poolbau und Außensaunen schaffen wir private Rückzugsorte für Entspannung und Komfort.",
        "Sichere Abdichtung, langlebige Materialien und präzise Ausführung gewährleisten dauerhaft hohe Qualität.",
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
        "Wir modernisieren Ihr Badezimmer technisch, funktional und gestalterisch passend zu Ihrem Zuhause.",
        "Neue Fliesen, Beleuchtung und Stauraumlösungen schaffen mehr Komfort und eine klare Raumwirkung.",
      ],
      closing: "Durchdacht geplant. Hochwertig umgesetzt. Ganz nach Ihrem Stil.",
    },
    {
      title: "Wanne zu Dusche",
      image: "/images/gruenewald/badsanierung-wanne-zu-dusche.png",
      alt: "Modernes Badezimmer mit großzügiger bodengleicher Dusche",
      lead: "Mehr Platz. Mehr Komfort. Weniger Hürden.",
      paragraphs: [
        "Wir ersetzen Ihre Badewanne fachgerecht durch eine moderne, komfortable und platzsparende Dusche.",
        "Ob Walk-in- oder bodengleiche Dusche: Die neue Lösung erleichtert den Alltag und wertet Ihr Bad auf.",
      ],
      closing: "Bequem einsteigen. Besser nutzen. Neu wohlfühlen.",
    },
    {
      title: "Barrierefreier Umbau",
      image: "/images/gruenewald/badsanierung-barrierefreier-umbau.png",
      alt: "Barrierefreies Badezimmer mit Haltegriffen und Sitzbadewanne",
      lead: "Komfort, der mitdenkt.",
      paragraphs: [
        "Wir gestalten barrierefreie Badezimmer sicher, komfortabel und langfristig nutzbar – mit modernem Design.",
        "Bodengleiche Duschen, rutschhemmende Fliesen und Haltegriffe schaffen mehr Selbstständigkeit im Alltag.",
      ],
      closing: "Heute komfortabel. Morgen genauso gut.",
    },
    {
      title: "Raumlösungen: Mini-Bäder",
      image: "/images/gruenewald/badsanierung-mini-baeder.png",
      alt: "Platzsparend eingerichtetes modernes Mini-Bad",
      lead: "Kleiner Raum. Große Möglichkeiten.",
      paragraphs: [
        "Auch auf wenigen Quadratmetern realisieren wir eine vollständige und komfortable Badsanierung.",
        "Clevere Raumplanung, kompakte Sanitärobjekte und Stauraum nutzen jeden Zentimeter des Mini-Bads sinnvoll.",
      ],
      closing: "So wird aus wenig Fläche ein Bad, das sich nach mehr anfühlt.",
    },
    {
      title: "Sauna & Schwimmbad",
      image: "/images/gruenewald/badsanierung-sauna-schwimmbad.png",
      alt: "Private Sauna mit angrenzendem modernem Duschbereich",
      lead: "Wellness, die zu Hause beginnt.",
      paragraphs: [
        "Mit privater Sauna oder Indoorpool schaffen wir hochwertige Rückzugsorte für Entspannung und Komfort.",
        "Von Abdichtung und Fliesen bis zur Ausstattung entsteht eine Lösung passend zu Ihrem Zuhause.",
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
        "Wir erneuern Wände, Decken und Böden mit hochwertigen Materialien und fachgerechter Ausführung.",
        "Maler- und Putzarbeiten sowie Parkett, Designvinyl, Fliesen und Naturstein verbinden Qualität und Gestaltung.",
      ],
      closing: "Für Räume, die sich wieder richtig nach Zuhause anfühlen.",
    },
    {
      title: "Energetische Sanierung",
      image: "/images/gruenewald/wohnsanierung-energetische-sanierung.png",
      alt: "Energieausweis vor einem modernisierten Wohnhaus",
      lead: "Weniger Energieverbrauch. Mehr Wohnkomfort.",
      paragraphs: [
        "Wir verbessern die Energieeffizienz Ihres Hauses mit Innen-, Außen- oder ökologischen Dämmungen.",
        "Alle Maßnahmen orientieren sich an der Bausubstanz, Ihren Zielen und dem individuellen Sanierungsfahrplan.",
      ],
      closing: "Für ein Zuhause, das effizienter, komfortabler und zukunftsfähiger wird.",
    },
    {
      title: "Lehm & Fachwerk",
      image: "/images/gruenewald/wohnsanierung-lehmbau-fachwerksanierung.png",
      alt: "Traditioneller Lehmbaustoff mit natürlichen Pflanzenfasern",
      lead: "Tradition bewahren. Substanz erhalten.",
      paragraphs: [
        "Wir sanieren Fachwerkhäuser sorgfältig und unter Beachtung der historischen Bausubstanz und des Denkmalschutzes.",
        "Lehm und natürliche Baustoffe verbinden fachgerechte Fachwerksanierung mit modernem Wohnkomfort.",
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

function getGruenewaldServiceFromPath(pathname: string) {
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);
  if (segments[0] !== "gruenewaldgmbh" || segments[1] !== "leistungen") {
    return null;
  }

  const serviceTitle = Object.entries(gruenewaldServiceSlugs).find(
    ([, slug]) => slug === segments[2],
  )?.[0];
  if (!serviceTitle) return null;

  const detailTitle = segments[3]
    ? Object.entries(gruenewaldServiceDetailSlugs[serviceTitle] ?? {}).find(
        ([, slug]) => slug === segments[3],
      )?.[0]
    : undefined;
  const detailIndex = detailTitle
    ? (gruenewaldServiceSubcategories[serviceTitle] ?? []).findIndex(
        (detail) => detail.title === detailTitle,
      ) + 1
    : 0;

  return {
    title: serviceTitle,
    detailIndex: Math.max(detailIndex, 0),
  };
}

function getTilutionServicePath(title: string) {
  const serviceSlug = tilutionServiceDetailsByTitle[title]?.slug;
  return serviceSlug
    ? `/tilution/leistungen/${serviceSlug}`
    : "/tilution/leistungen";
}

function ServiceCard({
  area,
  href,
  onOpen,
  referenceHref,
  onReferenceOpen,
}: {
  area: ServiceArea;
  href?: string;
  onOpen?: () => void;
  referenceHref?: string;
  onReferenceOpen?: () => void;
}) {
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

  const detailCard = onOpen && href ? (
    <a
      href={withTrailingSlash(href)}
      className={`tilution-service-card-button${area.title === "Generalunternehmer" ? " tilution-service-card-button--wide" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        onOpen();
      }}
      aria-label={`${area.title} im Detail ansehen`}
    >
      {card}
    </a>
  ) : card;

  if (!referenceHref || !onReferenceOpen) return detailCard;

  return (
    <div className="tilution-service-card-shell">
      {detailCard}
      <a
        href={withTrailingSlash(referenceHref)}
        className="tilution-service-card-reference-cta"
        onClick={(event) => {
          event.preventDefault();
          onReferenceOpen();
        }}
        aria-label={`Referenzen für ${area.title} ansehen`}
      >
        <span>Referenzen ansehen</span>
        <ArrowRight aria-hidden="true" size={17} strokeWidth={2.2} />
      </a>
    </div>
  );
}

export function TilutionServicesSection({
  variant = "tilution",
  combinedWithProjects = false,
}: {
  variant?: "tilution" | "gruenewald" | "verwaltung";
  combinedWithProjects?: boolean;
}) {
  const isGruenewald = variant === "gruenewald";
  const isVerwaltung = variant === "verwaltung";
  const areas = isGruenewald ? gruenewaldServiceAreas : isVerwaltung ? verwaltungServiceAreas : serviceAreas;
  const [activeServiceTitle, setActiveServiceTitle] = useState<string | null>(null);
  const [activeServiceDetailIndex, setActiveServiceDetailIndex] = useState(0);
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedCombinedService, setSelectedCombinedService] = useState(serviceAreas[0].title);
  const [showAllCombinedProjects, setShowAllCombinedProjects] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const activeServiceMap = isGruenewald ? gruenewaldServiceDetails : tilutionServiceDetailsByTitle;
  const activeServiceSequence = activeServiceTitle
    ? isGruenewald
      ? [
          activeServiceMap[activeServiceTitle],
          ...(gruenewaldServiceSubcategories[activeServiceTitle] ?? emptyServiceSubcategories),
        ].filter((detail): detail is GruenewaldServiceDetail => Boolean(detail))
      : tilutionServiceDetails
    : emptyServiceSubcategories;
  const activeServiceDetails = activeServiceSequence[activeServiceDetailIndex];
  const contactPath = isGruenewald ? "/gruenewaldgmbh/kontakt" : "/tilution/kontakt";
  const selectedCombinedArea = serviceAreas.find(
    (area) => area.title === selectedCombinedService,
  ) ?? serviceAreas[0];
  const selectedCombinedDetail = tilutionServiceDetailsByTitle[selectedCombinedArea.title];
  const selectedCombinedCategory = tilutionReferenceCategoryByService[selectedCombinedArea.title];
  const selectedCombinedReferences = references.filter(
    (reference) =>
      reference.company === "tilution" &&
      reference.categorySlug === selectedCombinedCategory,
  );

  const selectCombinedService = (title: string) => {
    setSelectedCombinedService(title);
    setShowAllCombinedProjects(false);
    trackAnalyticsEvent("service_select", {
      section: "services_projects",
      item_id: tilutionServiceDetailsByTitle[title]?.slug ?? title,
      item_category: "commercial",
    });
  };

  const openCombinedReference = (path: string) => {
    window.dispatchEvent(
      new CustomEvent("tilution:reference-open", { detail: { path } }),
    );
  };

  useEffect(() => {
    if (isVerwaltung) return;

    const pathname = window.location.pathname.replace(/\/+$/, "");
    if (isGruenewald) {
      const serviceState = getGruenewaldServiceFromPath(pathname);
      if (!serviceState) return;

      setActiveServiceTitle(serviceState.title);
      setActiveServiceDetailIndex(serviceState.detailIndex);
      return;
    }

    const detailIndex = tilutionServiceDetails.findIndex(
      (detail) => pathname === `/tilution/leistungen/${detail.slug}`,
    );
    if (detailIndex < 0) return;

    setActiveServiceTitle(tilutionServiceDetails[detailIndex].title);
    setActiveServiceDetailIndex(detailIndex);
    if (combinedWithProjects) {
      window.dispatchEvent(
        new CustomEvent("tilution:service-selected", {
          detail: { title: tilutionServiceDetails[detailIndex].title },
        }),
      );
    }
  }, [combinedWithProjects, isGruenewald, isVerwaltung]);

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

  const openReferences = (title: string) => {
    const category = isGruenewald
      ? gruenewaldReferenceCategoryByService[title]
      : tilutionReferenceCategoryByService[title];
    if (!category) return;

    trackAnalyticsEvent("reference_category_select", {
      section: "services",
      item_id: category,
      item_category: isGruenewald ? "private" : "commercial",
      interaction_method: "service_card_cta",
    });
    window.dispatchEvent(
      new CustomEvent(
        isGruenewald ? "gruenewald:service-selected" : "tilution:service-selected",
        { detail: { title } },
      ),
    );

    const targetSection = document.getElementById("referenzen");
    if (targetSection) {
      const headerOffset =
        document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      const targetTop =
        targetSection.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
    }
    pushUrlState(
      isGruenewald
        ? `/gruenewaldgmbh/referenzen/${category}`
        : `/tilution/referenzen/${category}`,
    );
  };

  const openReferencesFromOverlay = () => {
    const title = isGruenewald
      ? activeServiceTitle
      : activeServiceDetails?.title ?? activeServiceTitle;
    if (!title) return;

    setActiveServiceTitle(null);
    setActiveServiceDetailIndex(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => openReferences(title));
    });
  };

  const openService = (title: string) => {
    trackAnalyticsEvent("service_open", {
      section: "services",
      item_id: title,
      item_category: isGruenewald ? "private" : "commercial",
    });
    setActiveServiceTitle(title);
    if (!isGruenewald && !isVerwaltung && combinedWithProjects) {
      window.dispatchEvent(
        new CustomEvent("tilution:service-selected", { detail: { title } }),
      );
    }
    setActiveServiceDetailIndex(
      isGruenewald
        ? 0
        : Math.max(tilutionServiceDetails.findIndex((detail) => detail.title === title), 0)
    );
    pushUrlWithoutScroll(
      isGruenewald ? getGruenewaldServicePath(title) : getTilutionServicePath(title)
    );
  };

  const closeService = () => {
    trackAnalyticsEvent("service_close", {
      section: "services",
      item_id: activeServiceDetails?.title ?? activeServiceTitle ?? undefined,
    });
    setActiveServiceTitle(null);
    setActiveServiceDetailIndex(0);
    if (isGruenewald) {
      pushUrlWithoutScroll("/gruenewaldgmbh/leistungen");
    } else if (!isVerwaltung) {
      pushUrlWithoutScroll("/tilution/leistungen");
    }
  };

  const switchServiceDetail = (
    direction: -1 | 1,
    interactionMethod: "arrow" | "swipe" | "keyboard" = "arrow",
  ) => {
    setActiveServiceDetailIndex((current) => {
      const nextIndex = current + direction;
      if (nextIndex < 0 || nextIndex >= activeServiceSequence.length) {
        return current;
      }

      const nextDetail = activeServiceSequence[nextIndex];
      if (activeServiceTitle && nextDetail) {
        trackAnalyticsEvent("service_navigate", {
          section: "services",
          item_id: nextDetail.title,
          item_category: activeServiceTitle,
          interaction_method: interactionMethod,
          navigation_direction: direction < 0 ? "previous" : "next",
        });
        if (isGruenewald) {
          pushUrlWithoutScroll(
            getGruenewaldServicePath(
              activeServiceTitle,
              nextIndex > 0 ? nextDetail.title : undefined
            )
          );
        } else {
          setActiveServiceTitle(nextDetail.title);
          pushUrlWithoutScroll(getTilutionServicePath(nextDetail.title));
        }
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
      } else if (!isGruenewald && event.key === "ArrowLeft") {
        switchServiceDetail(-1, "keyboard");
      } else if (!isGruenewald && event.key === "ArrowRight") {
        switchServiceDetail(1, "keyboard");
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
    <SectionShell
      id="leistungen"
      outerClassName={combinedWithProjects ? "tilution-combined-services-shell" : undefined}
    >
      <section className={`tilution-services-section${combinedWithProjects && !isGruenewald && !isVerwaltung ? " tilution-services-section--combined" : ""}`}>
        {combinedWithProjects && !isGruenewald && !isVerwaltung ? (
          <div className="tilution-combined-experience">
            <span id="referenzen" className="tilution-combined-experience__anchor" aria-hidden="true" />
            <header className="tilution-combined-experience__header">
              <div>
                <p className="tilution-services-eyebrow">Leistungen &amp; Projekte</p>
                <h2 className="tilution-services-heading">Kompetenz, die sich sehen lässt.</h2>
                <p className="tilution-services-subline">
                  Entdecken Sie unsere Leistungen im Objektbau und ausgewählte Projekte, in denen wir unsere Kompetenz unter Beweis stellen.
                </p>
              </div>
              <div className="tilution-combined-experience__counter" aria-label={`${areas.findIndex((area) => area.title === selectedCombinedArea.title) + 1} von ${areas.length}`}>
                <strong>{String(areas.findIndex((area) => area.title === selectedCombinedArea.title) + 1).padStart(2, "0")}</strong>
                <span />
                <span>{String(areas.length).padStart(2, "0")}</span>
              </div>
            </header>

            <div className="tilution-combined-tabs" role="tablist" aria-label="Leistungsbereiche">
              {areas.map((area) => (
                <button
                  key={area.title}
                  type="button"
                  role="tab"
                  aria-selected={area.title === selectedCombinedArea.title}
                  onClick={() => selectCombinedService(area.title)}
                >
                  {area.title}
                </button>
              ))}
            </div>

            <div className="tilution-combined-stage" key={selectedCombinedArea.title}>
              <article className="tilution-combined-copy">
                <div className="tilution-combined-copy__intro">
                  <p className="tilution-combined-copy__number">
                    {String(areas.findIndex((area) => area.title === selectedCombinedArea.title) + 1).padStart(2, "0")}
                  </p>
                  <h3>
                    {selectedCombinedArea.title.includes(" & ") ? (
                      <>
                        <span>{selectedCombinedArea.title.split(" & ")[0]}</span>
                        <span>&amp; {selectedCombinedArea.title.split(" & ").slice(1).join(" & ")}</span>
                      </>
                    ) : selectedCombinedArea.title}
                  </h3>
                  <p className="tilution-combined-copy__lead">{selectedCombinedDetail?.lead}</p>
                </div>
                <div className="tilution-combined-copy__details">
                  <p className="tilution-combined-copy__body">{selectedCombinedDetail?.paragraphs[0]}</p>
                  <ul>
                    {selectedCombinedArea.attributes.map((attribute) => (
                      <li key={attribute}>{attribute}</li>
                    ))}
                  </ul>
                  <a
                    href={withTrailingSlash(getTilutionServicePath(selectedCombinedArea.title))}
                    onClick={(event) => {
                      event.preventDefault();
                      openService(selectedCombinedArea.title);
                    }}
                    className="tilution-combined-copy__cta"
                  >
                    <span>Leistung im Detail</span>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </article>

              <div className="tilution-combined-projects-area">
                <div className="tilution-combined-projects-area__heading">
                  <p>Passende Projekte</p>
                  <span>{selectedCombinedReferences.length} {selectedCombinedReferences.length === 1 ? "Referenz" : "Referenzen"}</span>
                </div>

                {selectedCombinedReferences.length ? (
                  <div className="tilution-combined-project-grid">
                    {selectedCombinedReferences.slice(0, 2).map((reference, index) => {
                      const path = getReferencePath(reference);
                      const titleParts = reference.title.split(",");
                      const place = titleParts.length > 1
                        ? titleParts[titleParts.length - 1].trim()
                        : "Referenzprojekt";
                      return (
                        <a
                          key={reference.slug}
                          href={withTrailingSlash(path)}
                          className={`tilution-combined-project-card tilution-combined-project-card--${index === 0 ? "large" : "small"}`}
                          onClick={(event) => {
                            event.preventDefault();
                            openCombinedReference(path);
                          }}
                        >
                          <Image
                            src={getOptimizedReferenceSrc(reference.images[0].src)}
                            alt={reference.images[0].alt}
                            fill
                            unoptimized={reference.images[0].isSvg}
                            sizes={index === 0 ? "(max-width: 767px) 90vw, 38vw" : "(max-width: 767px) 90vw, 24vw"}
                            className="object-cover"
                          />
                          <span className="tilution-combined-project-card__shade" />
                          <span className="tilution-combined-project-card__copy">
                            <small>{place}</small>
                            <strong>{titleParts[0]}</strong>
                            <ArrowUpRight aria-hidden="true" />
                          </span>
                        </a>
                      );
                    })}
                    <button
                      type="button"
                      className="tilution-combined-project-card tilution-combined-project-card--all"
                      onClick={() => {
                        setShowAllCombinedProjects((current) => !current);
                        trackAnalyticsEvent("content_toggle", {
                          section: "references",
                          item_id: showAllCombinedProjects ? "collapse" : "expand",
                          item_category: selectedCombinedCategory,
                        });
                      }}
                      aria-expanded={showAllCombinedProjects}
                    >
                      <span>
                        <small>Projektübersicht</small>
                        <strong>{showAllCombinedProjects ? "Weniger Projekte" : "Alle Projekte"}</strong>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <div className="tilution-combined-projects-empty">
                    Für diesen Leistungsbereich sind aktuell noch keine Referenzen hinterlegt.
                  </div>
                )}
              </div>
            </div>

            {showAllCombinedProjects && selectedCombinedReferences.length ? (
              <div className="tilution-combined-all-projects">
                {selectedCombinedReferences.map((reference) => {
                  const path = getReferencePath(reference);
                  return (
                    <a
                      key={reference.slug}
                      href={withTrailingSlash(path)}
                      onClick={(event) => {
                        event.preventDefault();
                        openCombinedReference(path);
                      }}
                    >
                      <span className="tilution-combined-all-projects__image">
                        <Image
                          src={getOptimizedReferenceSrc(reference.images[0].src)}
                          alt={reference.images[0].alt}
                          fill
                          unoptimized={reference.images[0].isSvg}
                          sizes="(max-width: 639px) 82vw, (max-width: 1023px) 44vw, 28vw"
                          className="object-cover"
                        />
                      </span>
                      <strong>{reference.title}</strong>
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            ) : null}
          </div>
        ) : null}

        <header className="tilution-services-header">
          <p className="tilution-services-eyebrow">
            {combinedWithProjects && !isGruenewald && !isVerwaltung
              ? "Leistungen & Projekte"
              : "Leistungen"}
          </p>
          <h2 className="tilution-services-heading">
            {isGruenewald
              ? "Leistungen für Ihr Zuhause"
              : isVerwaltung
                ? "Leistungen"
                : combinedWithProjects
                  ? "Kompetenz, die sich sehen lässt"
                  : "Leistungen im Objektbau"}
          </h2>
          {!isVerwaltung ? <p className={`tilution-services-subline${isGruenewald ? " tilution-services-subline--single-line" : ""}`}>
            {isGruenewald
              ? "Persönliche Planung und hochwertige Ausführung für private Bau- und Sanierungsprojekte."
              : combinedWithProjects
                ? "Wählen Sie eine Leistung und entdecken Sie direkt die passenden ausgeführten Projekte."
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
                href={
                  activeServiceMap[area.title]
                    ? isGruenewald
                      ? getGruenewaldServicePath(area.title)
                      : getTilutionServicePath(area.title)
                    : undefined
                }
                onOpen={activeServiceMap[area.title] ? () => openService(area.title) : undefined}
                referenceHref={
                  isGruenewald && gruenewaldReferenceCategoryByService[area.title]
                    ? `/gruenewaldgmbh/referenzen/${gruenewaldReferenceCategoryByService[area.title]}`
                    : !isGruenewald && !isVerwaltung
                      ? `/tilution/referenzen/${tilutionReferenceCategoryByService[area.title]}`
                      : undefined
                }
                onReferenceOpen={
                  !isVerwaltung &&
                  (!isGruenewald || Boolean(gruenewaldReferenceCategoryByService[area.title]))
                    ? () => openReferences(area.title)
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        {areas.length > 4 ? (
          <button
            type="button"
            className="mobile-services-toggle"
            data-analytics-event="content_toggle"
            data-analytics-section="services"
            data-analytics-item={showAllServices ? "collapse" : "expand"}
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
              data-analytics-event="project_inquiry_click"
              data-analytics-section="services"
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
          className={`gruenewald-service-modal service-swipe-modal${!isGruenewald ? " tilution-service-modal" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeService();
          }}
        >
          <div
            className="gruenewald-service-modal__panel"
            onPointerDown={(event) => {
              touchStart.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              if (!touchStart.current) return;
              const deltaX = event.clientX - touchStart.current.x;
              const deltaY = event.clientY - touchStart.current.y;
              touchStart.current = null;
              if (Math.abs(deltaX) < 55 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) return;
              switchServiceDetail(deltaX < 0 ? 1 : -1, "swipe");
            }}
          >
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
                onClick={() => switchServiceDetail(-1, "arrow")}
                aria-label="Vorherigen Inhalt anzeigen"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
            ) : null}
            {activeServiceDetailIndex < activeServiceSequence.length - 1 ? (
              <button
                type="button"
                className="gruenewald-service-modal__nav gruenewald-service-modal__nav--next"
                onClick={() => switchServiceDetail(1, "arrow")}
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
              {isGruenewald && activeServiceDetailIndex > 0 ? (
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
              {!isVerwaltung &&
              (!isGruenewald || Boolean(activeServiceTitle && gruenewaldReferenceCategoryByService[activeServiceTitle])) ? (
                <button
                  type="button"
                  className="tilution-service-modal__references-button"
                  onClick={openReferencesFromOverlay}
                >
                  <span>Referenzen ansehen</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              ) : null}
            </div>

            {activeServiceSequence.length > 1 ? (
              <div
                className="service-modal__mobile-progress"
                aria-label={`Leistung ${activeServiceDetailIndex + 1} von ${activeServiceSequence.length}`}
              >
                <span>{activeServiceDetailIndex + 1} / {activeServiceSequence.length}</span>
                <div
                  aria-hidden="true"
                  style={{ gridTemplateColumns: `repeat(${activeServiceSequence.length}, minmax(0, 1fr))` }}
                >
                  {activeServiceSequence.map((detail, index) => (
                    <i
                      key={detail.title}
                      className={index === activeServiceDetailIndex ? "is-active" : undefined}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ), document.body) : null}
    </SectionShell>
  );
}
