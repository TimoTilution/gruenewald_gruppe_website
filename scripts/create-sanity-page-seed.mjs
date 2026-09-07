import fs from "node:fs";
import path from "node:path";

const outputFile = path.join(process.cwd(), ".sanity-seed", "page-documents.json");

const pages = [
  {
    key: "gruenewald-gruppe",
    title: "Grünewald Gruppe",
    eyebrow: "Grünewald Gruppe",
    heroTitle: "Handwerk mit Anspruch. Lösungen mit Zukunft.",
    heroText:
      "Die Grünewald Gruppe bündelt spezialisierte Unternehmen für private, gewerbliche und öffentliche Bauprojekte - mit klaren Strukturen, kurzen Wegen und hoher Ausführungsqualität.",
    primaryCtaLabel: "Geschäftskunde",
    primaryCtaHref: "/tilution",
    secondaryCtaLabel: "Privatkunde",
    secondaryCtaHref: "/gruenewaldgmbh",
    introTitle: "Eine Gruppe. Klare Spezialisten. Bundesweit im Einsatz.",
    introText:
      "Die Grünewald Gruppe bündelt spezialisierte Unternehmen für private, gewerbliche und öffentliche Bauprojekte - mit klaren Strukturen, kurzen Wegen und hoher Ausführungsqualität.",
    legacyHeroImagePath: "/hero-start.jpg",
    heroImageAlt: "Startbild der Grünewald Gruppe",
    sortOrder: 1,
  },
  {
    key: "tilution",
    title: "Tilution GmbH",
    eyebrow: "Tilution",
    heroTitle: "Ihr Partner für Fliesenarbeiten bei anspruchsvollen Großprojekten.",
    heroText:
      "Als Fachbetrieb im Objektbau realisieren wir Fliesen- und Plattenarbeiten für Schwimmbäder, Hotels, Kliniken, Großküchen, öffentliche Einrichtungen und gewerbliche Bauprojekte.",
    introTitle: "Einblicke in Tilution",
    introText: "Projektvideos, Referenzen und Fachbereiche der Tilution GmbH.",
    legacyHeroImagePath: "/hero-start.jpg",
    heroImageAlt: "Hero-Bild Tilution GmbH",
    sortOrder: 2,
  },
  {
    key: "gruenewald-gmbh",
    title: "Grünewald GmbH",
    eyebrow: "Grünewald - planen bauen leben",
    heroTitle: "Planen, bauen und leben - mit Qualität bis ins Detail.",
    heroText:
      "Wir begleiten private Bauvorhaben von der ersten Idee bis zur hochwertigen Ausführung - persönlich, verlässlich und mit einem klaren Blick für Materialien, Funktion und Gestaltung.",
    introTitle: "Einblicke in die Grünewald GmbH",
    introText: "Projektvideo, private Referenzen und Ansprechpartner der Grünewald GmbH.",
    legacyHeroImagePath: "/images/gruenewald-hero-badezimmer.png",
    heroImageAlt: "Hero-Bild Grünewald GmbH",
    sortOrder: 3,
  },
  {
    key: "clay-construction",
    title: "Clay Construction",
    eyebrow: "Clay Construction",
    heroTitle: "Klimadecken und Lehmbau für moderne, gesunde Gebäude.",
    heroText:
      "Als spezialisierter Montagepartner realisieren wir patentierte ArgillaTherm Lehmklimasysteme für Neubau, Sanierung und anspruchsvolle Innenräume.",
    introTitle: "Natürliche Baustoffe und technische Raumklimasysteme.",
    introText:
      "Clay Construction entwickelt Ausbaukonzepte, die Energieeffizienz, Wohlbefinden und ökologische Materialien zusammenbringen.",
    legacyHeroImagePath: "/images/clay/clay-hero-lehmklimasystem.png",
    heroImageAlt: "Hero-Bild Clay Construction",
    sortOrder: 4,
  },
  {
    key: "verwaltung",
    title: "Verwaltung",
    eyebrow: "Verwaltung",
    heroTitle: "Zentrale Steuerung für die gesamte Gruppe.",
    heroText:
      "Die Verwaltungsseite bildet die organisatorische Ebene ab und eignet sich für Servicebereiche, interne Funktionen und gruppenweite Informationen.",
    introTitle: "Menschen, die unsere Verwaltung möglich machen.",
    introText: "Zentrale Dienste und Verwaltung der Grünewald Gruppe.",
    legacyHeroImagePath: "/images/verwaltung/verwaltung-hero.png",
    heroImageAlt: "Hero-Bild Verwaltung",
    sortOrder: 5,
  },
  {
    key: "hrw",
    title: "HRW GmbH",
    eyebrow: "HRW",
    heroTitle: "Die Personalkraft hinter der Grünewald Gruppe.",
    heroText:
      "Die HRW GmbH ist der exklusive Personaldienstleister für die Unternehmen der Grünewald Gruppe.",
    introTitle: "Spezialisierte Leistungen unter eigener Marke.",
    introText: "Fachkräfteverwaltung und personelle Kapazitäten für zuverlässige Projektabläufe.",
    legacyHeroImagePath: "/images/hrw/hrw-hero.png",
    heroImageAlt: "Hero-Bild HRW GmbH",
    sortOrder: 6,
  },
];

const docs = pages.map((page) => ({
  _id: `websitePage.${page.key}`,
  _type: "websitePage",
  pageKey: page.key,
  title: page.title,
  eyebrow: page.eyebrow,
  heroTitle: page.heroTitle,
  heroText: page.heroText,
  primaryCtaLabel: page.primaryCtaLabel,
  primaryCtaHref: page.primaryCtaHref,
  secondaryCtaLabel: page.secondaryCtaLabel,
  secondaryCtaHref: page.secondaryCtaHref,
  introTitle: page.introTitle,
  introText: page.introText,
  legacyHeroImagePath: page.legacyHeroImagePath,
  heroImageAlt: page.heroImageAlt,
  isVisible: true,
  sortOrder: page.sortOrder,
}));

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(docs, null, 2));
console.log(`Wrote ${docs.length} Sanity page documents to ${outputFile}`);
