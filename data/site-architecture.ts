export type CompanySlug =
  | "tilution"
  | "gruenewald"
  | "clay-construction"
  | "verwaltung"
  | "hrw";

export type ServiceEntry = {
  slug: string;
  title: string;
  description: string;
  company: CompanySlug;
};

export type ReferenceEntry = {
  slug: string;
  title: string;
  company: CompanySlug;
  categorySlug?: string;
  categoryTitle?: string;
  description: string;
  images: Array<{ src: string; alt: string; isSvg?: boolean }>;
};

export type TeamMemberEntry = {
  slug: string;
  name: string;
  company: CompanySlug;
  departmentSlug: string;
  departmentTitle: string;
  role: string;
  imageSrc?: string;
};

export const siteBaseUrl = "https://www.gruenewald-gruppe.de";

export const companies: Record<
  CompanySlug,
  { title: string; basePath: string; description: string }
> = {
  tilution: {
    title: "Tilution GmbH",
    basePath: "/tilution",
    description:
      "Fliesenarbeiten fuer anspruchsvolle gewerbliche und oeffentliche Bauvorhaben.",
  },
  gruenewald: {
    title: "Gruenewald GmbH",
    basePath: "/gruenewald",
    description:
      "Hochwertige Fliesenarbeiten, Sanierungen und Ausbauten fuer private Bauvorhaben.",
  },
  "clay-construction": {
    title: "Clay Construction",
    basePath: "/clay-construction",
    description:
      "Klimadecken und Lehmbau-Systeme fuer nachhaltige moderne Gebaeude.",
  },
  verwaltung: {
    title: "Gruenewald Verwaltung",
    basePath: "/verwaltung",
    description:
      "Zentrale Organisation, Steuerung und Verwaltungsleistungen der Gruenewald Gruppe.",
  },
  hrw: {
    title: "HRW GmbH",
    basePath: "/hrw",
    description:
      "Personalkapazitaeten und Fachkraefte fuer zuverlaessige Projektablaeufe.",
  },
};

export const groupPages = [
  {
    path: "/karte",
    title: "Deutschlandkarte",
    eyebrow: "Karte",
    description:
      "Der Standort der Gruenewald Gruppe in Scheden - zentral in Deutschland und deutschlandweit fuer Projekte erreichbar.",
  },
  {
    path: "/leistungen",
    title: "Leistungen der Gruenewald Gruppe",
    eyebrow: "Leistungen",
    description:
      "Die operativen und unterstuetzenden Bereiche der Gruenewald Gruppe im Ueberblick.",
  },
  {
    path: "/referenzen",
    title: "Referenzen der Gruenewald Gruppe",
    eyebrow: "Referenzen",
    description:
      "Ausgewaehlte Projekte aus unterschiedlichen Bereichen der Gruenewald Gruppe.",
  },
  {
    path: "/innovationen",
    title: "Innovationen der Gruenewald Gruppe",
    eyebrow: "Innovationen",
    description:
      "Digitale Werkzeuge und moderne Technik fuer praezisere Planung und sicherere Bauablaeufe.",
  },
  {
    path: "/karriere",
    title: "Karriere bei der Gruenewald Gruppe",
    eyebrow: "Karriere",
    description:
      "Einstieg, Entwicklung und Perspektiven innerhalb der Gruenewald Gruppe.",
  },
  {
    path: "/kontakt",
    title: "Kontakt zur Gruenewald Gruppe",
    eyebrow: "Kontakt",
    description:
      "Der richtige Ansprechpartner fuer Ihr Projekt innerhalb der Gruenewald Gruppe.",
  },
] as const;

export const companySectionPages = [
  ["tilution", "leistungen", "Leistungen", "Leistungen von Tilution"],
  ["tilution", "einblicke", "Einblicke", "Einblicke in Tilution"],
  ["tilution", "referenzen", "Referenzen", "Referenzen von Tilution"],
  ["tilution", "innovationen", "Innovationen", "Innovationen bei Tilution"],
  ["tilution", "team", "Team", "Team von Tilution"],
  ["tilution", "karriere", "Karriere", "Karriere bei Tilution"],
  ["tilution", "kontakt", "Kontakt", "Kontakt zu Tilution"],
  ["gruenewald", "leistungen", "Leistungen", "Leistungen der Gruenewald GmbH"],
  ["gruenewald", "einblicke", "Einblicke", "Einblicke in die Gruenewald GmbH"],
  ["gruenewald", "referenzen", "Referenzen", "Referenzen der Gruenewald GmbH"],
  ["gruenewald", "innovationen", "Innovationen", "Innovationen bei der Gruenewald GmbH"],
  ["gruenewald", "karriere", "Karriere", "Karriere bei der Gruenewald GmbH"],
  ["gruenewald", "kontakt", "Kontakt", "Kontakt zur Gruenewald GmbH"],
  ["clay-construction", "leistungen", "Leistungen", "Leistungen von Clay Construction"],
  ["clay-construction", "system-ausfuehrung", "System & Ausfuehrung", "System und Ausfuehrung bei Clay Construction"],
  ["clay-construction", "referenzen", "Referenzen", "Referenzen von Clay Construction"],
  ["clay-construction", "innovationen", "Innovationen", "Innovationen bei Clay Construction"],
  ["clay-construction", "team", "Team", "Team von Clay Construction"],
  ["clay-construction", "karriere", "Karriere", "Karriere bei Clay Construction"],
  ["clay-construction", "kontakt", "Kontakt", "Kontakt zu Clay Construction"],
  ["verwaltung", "leistungen", "Leistungen", "Leistungen der Verwaltung"],
  ["verwaltung", "team", "Team", "Team der Verwaltung"],
  ["verwaltung", "karriere", "Karriere", "Karriere in der Verwaltung"],
  ["verwaltung", "kontakt", "Kontakt", "Kontakt zur Verwaltung"],
  ["hrw", "leistungen", "Leistungen", "Leistungen der HRW GmbH"],
  ["hrw", "warum-hrw", "Warum HRW", "Warum HRW GmbH"],
  ["hrw", "kontakt", "Kontakt", "Kontakt zur HRW GmbH"],
] as const;

export const services: ServiceEntry[] = [
  { company: "gruenewald", slug: "aussengestaltung", title: "Aussengestaltung", description: "Terrassen, Wege und Aussenbereiche hochwertig geplant und umgesetzt." },
  { company: "gruenewald", slug: "badsanierung", title: "Badsanierung", description: "Komplette Badmodernisierung mit klarer Planung und praeziser Ausfuehrung." },
  { company: "gruenewald", slug: "haus-wohnsanierung", title: "Haus- & Wohnsanierung", description: "Sanierungen und Modernisierungen fuer private Wohnraeume." },
  { company: "gruenewald", slug: "generalunternehmer", title: "Generalunternehmer", description: "Koordination mehrerer Gewerke mit einem zentralen Ansprechpartner." },
];

export const references: ReferenceEntry[] = [
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "rheingau-bad-geisenheim",
    title: "Rheingau-Bad, Geisenheim",
    description: "Referenzprojekt im Bereich Schwimmbaeder und Thermen.",
    images: [{ src: "/references/rheingau-bad-geisenheim/title-images/rheingau-bad-title-01.png", alt: "Aussenansicht des Rheingau-Bads in Geisenheim" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "freibad-duderstadt",
    title: "Freibad Duderstadt",
    description: "Referenzprojekt im Bereich Schwimmbaeder und Thermen.",
    images: [{ src: "/references/freibad-duderstadt/title-images/freibad-duderstadt-title-01.png", alt: "Luftaufnahme des Freibads Duderstadt" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "badeparadies-eiswiese-goettingen",
    title: "Badeparadies Eiswiese, Goettingen",
    description: "Referenzprojekt im Bereich Schwimmbaeder und Thermen.",
    images: [{ src: "/references/badeparadies-eiswiese-goettingen/title-images/badeparadies-eiswiese-title-01.png", alt: "Luftaufnahme des Badeparadieses Eiswiese in Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "sprudelhof-therme-bad-nauheim",
    title: "Sprudelhof Therme, Bad Nauheim",
    description:
      "Die Sanierung der historischen Sprudelhof Therme verbindet denkmalgeschuetzte Architektur, hochwertige Materialien und moderne Bauanforderungen.",
    images: [
      { src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg", alt: "Titelbild der Sprudelhof Therme Bad Nauheim", isSvg: true },
      { src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-02.jpg", alt: "Mosaikbereich der Sprudelhof Therme Bad Nauheim" },
      { src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-03.png", alt: "Panoramasauna der Sprudelhof Therme Bad Nauheim" },
      { src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-04.jpg", alt: "Gangbereich im Badehaus 2 der Sprudelhof Therme Bad Nauheim" },
      { src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-05.jpg", alt: "Beckenbereich der Sprudelhof Therme Bad Nauheim" },
    ],
  },
  {
    company: "tilution",
    categorySlug: "hotels-wellness",
    categoryTitle: "Hotels & Wellness",
    slug: "dom-hotel-koeln",
    title: "Dom Hotel, Koeln",
    description: "Referenzprojekt im Bereich Hotels und Wellness.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-03.png", alt: "Aussenansicht eines Referenzprojekts am Koelner Dom" }],
  },
  {
    company: "tilution",
    categorySlug: "hotels-wellness",
    categoryTitle: "Hotels & Wellness",
    slug: "fischers-hotel-kassel",
    title: "Fischer's Hotel, Kassel",
    description: "Referenzprojekt im Bereich Hotels und Wellness.",
    images: [{ src: "/references/fischers-hotel-kassel/title-images/fischers-hotel-title-01.png", alt: "Aussenansicht von Fischer's Hotel in Kassel" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "fraunhofer-institut-kassel",
    title: "Fraunhofer Institut, Kassel",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/fraunhofer-iff-title.png", alt: "Aussenansicht des Fraunhofer IFF Gebaeudes" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "heart-brain-universitaet-goettingen",
    title: "Heart & Brain Universitaet Goettingen",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/heart-brain-universitaet-goettingen/title-images/heart-brain-title-01.png", alt: "Aussenansicht der Heart & Brain Universitaet Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "leibniz-universitaet-hannover",
    title: "Leibniz Universitaet Hannover",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/leibniz-universitaet-hannover/title-images/leibniz-universitaet-hannover-title-01.jpg", alt: "Aussenansicht der Leibniz Universitaet Hannover" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "kita-ritterburg-wolfhagen",
    title: "Kita Ritterburg, Wolfhagen",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/kita-ritterburg-wolfhagen/title-images/kita-ritterburg-title-01.png", alt: "Aussenansicht der Kita Ritterburg in Wolfhagen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "friedensschule-koeln",
    title: "Friedensschule, Koeln",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-06.png", alt: "Aussenansicht eines modernen Schul- und Verwaltungsgebaeudes" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "stadthalle-goettingen",
    title: "Stadthalle, Goettingen",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-07.jpg", alt: "Aussenansicht der Stadthalle Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "feuerwehr-duderstadt",
    title: "Feuerwehr, Duderstadt",
    description: "Referenzprojekt fuer oeffentliche Einrichtungen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-09.jpg", alt: "Visualisierung des Feuerwehrzentrums Duderstadt" }],
  },
  {
    company: "tilution",
    categorySlug: "retail-gewerbeflaechen",
    categoryTitle: "Retail & Gewerbeflaechen",
    slug: "bmw-autohaus-goettingen",
    title: "BMW Autohaus, Goettingen",
    description: "Referenzprojekt im Bereich Retail und Gewerbeflaechen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/bmw-frontlayer-cover.png", alt: "Aussenansicht eines BMW Autohauses in Goettingen" }],
  },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "sanierung-terrasse-eingangsbereich", title: "Sanierung Terrasse & Eingangsbereich", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/hauseingang-steinteppich/cover.png", alt: "Neu gestalteter Hauseingang mit Steinteppich" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "mauer-mit-naturstein-veredelt", title: "Mauer mit Naturstein veredelt", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/natursteinmauer/cover.png", alt: "Mit Naturstein veredelte Gartenmauer" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "sanierung-eingangsbereich-mauer", title: "Sanierung Eingangsbereich und Mauer", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/eingangsbereich-mauer/cover.png", alt: "Sanierte Grundstuecksmauer und Eingangsbereich" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "pflasterarbeiten-terrasse", title: "Pflasterarbeiten & Terrasse", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/pflasterarbeiten-terrasse/cover.png", alt: "Gepflasterte Terrasse an einem Wohnhaus" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "poolbau-gartengestaltung", title: "Poolbau & Gartengestaltung", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/poolbau-gartengestaltung/cover.jpg", alt: "Pool mit moderner Gartengestaltung" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "pflasterarbeiten-einfahrt", title: "Pflasterarbeiten & Einfahrt", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/pflasterarbeiten-einfahrt/cover.jpg", alt: "Gepflasterte Einfahrt mit Entwaesserungsrinne" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "terrassenbau", title: "Terrassenbau", description: "Referenzprojekt der Gruenewald GmbH im Bereich Aussengestaltung.", images: [{ src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-02.jpg", alt: "Ueberdachte Terrasse mit Blick in den Garten" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-dachschraege", title: "Komplettsanierung Badezimmer mit Dachschraege", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-dachschraege/cover.png", alt: "Komplett saniertes Badezimmer mit Dachschraege" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-steinwaschbecken", title: "Komplettsanierung Badezimmer mit Steinwaschbecken", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-steinwaschbecken/cover.png", alt: "Saniertes Badezimmer mit Steinwaschbecken" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-ebenerdige-dusche", title: "Komplettsanierung Badezimmer - ebenerdige Dusche", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-ebenerdige-dusche/cover.png", alt: "Komplett saniertes Badezimmer mit ebenerdiger Dusche" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-walk-in-duschkabine", title: "Sanierung Badezimmer mit Walk-In Duschkabine", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-walk-in-duschkabine/cover.png", alt: "Saniertes Badezimmer mit Walk-In Duschkabine" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-vintagefliesen", title: "Sanierung Badezimmer Vintagefliesen", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-vintagefliesen/cover.png", alt: "Sanierte Dusche mit Vintagefliesen" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-rote-mosaikborduere", title: "Sanierung Badezimmer rote Mosaikborduere", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-rote-mosaikborduere/cover.png", alt: "Saniertes Badezimmer mit roter Mosaikborduere" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-grifflose-einbaumodule", title: "Sanierung Badezimmer - grifflose Einbaumodule", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-grifflose-einbaumodule/cover.png", alt: "Sanierte Dusche mit grifflosen Einbaumodulen" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-dusche-glastrennwand", title: "Sanierung Badezimmer - Dusche mit Glastrennwand", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-dusche-glastrennwand/cover.png", alt: "Sanierte bodengleiche Dusche mit Glastrennwand" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-mit-sauna", title: "Sanierung Badezimmer mit Sauna", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-mit-sauna/cover.png", alt: "Saniertes Badezimmer mit Sauna" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-mit-tv", title: "Sanierung Badezimmer mit TV", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-mit-tv/cover.png", alt: "Saniertes Badezimmer mit integriertem TV" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-toiletten-unigebaeude", title: "Sanierung Toiletten Unigebaeude", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/toiletten-unigebaeude/cover.png", alt: "Sanierter Toilettenraum" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer", title: "Sanierung Badezimmer", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-sanierung-badezimmer/cover.png", alt: "Saniertes Badezimmer mit Badewanne" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-wasserschaden-badezimmer", title: "Sanierung Wasserschaden Badezimmer", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-wasserschaden/cover.png", alt: "Sanierter Duschboden mit Linienablauf" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "badsanierung-fussbodenheizung", title: "Badsanierung Fussbodenheizung", description: "Referenzprojekt der Gruenewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-fussbodenheizung/cover.png", alt: "Saniertes Badezimmer mit Fussbodenheizung" }] },
  { company: "gruenewald", categorySlug: "haus-wohnsanierung", categoryTitle: "Haus- & Wohnsanierung", slug: "komplette-wohnungssanierung", title: "Komplette Wohnungssanierung", description: "Referenzprojekt der Gruenewald GmbH im Bereich Haus- und Wohnsanierung.", images: [{ src: "/references/gruenewald/komplette-wohnungssanierung/cover.png", alt: "Komplett sanierter Wohnbereich" }] },
  { company: "gruenewald", categorySlug: "haus-wohnsanierung", categoryTitle: "Haus- & Wohnsanierung", slug: "wohnungssanierung", title: "Wohnungssanierung", description: "Referenzprojekt der Gruenewald GmbH im Bereich Haus- und Wohnsanierung.", images: [{ src: "/references/gruenewald/wohnungssanierung/cover.png", alt: "Sanierter Wohnraum mit neuem Boden" }] },
  { company: "clay-construction", slug: "josef-schwarz-schule-heilbronn", title: "Josef-Schwarz-Schule, Heilbronn", description: "Referenzprojekt von Clay Construction.", images: [{ src: "/references/josef-schwarz-schule/title-images/josef-schwarz-schule-title-01.png", alt: "Aussenansicht der Josef-Schwarz-Schule in Heilbronn" }] },
  { company: "clay-construction", slug: "vevio-hotel-events-spiesen-elversberg", title: "Vevio - Hotel & Events, Spiesen-Elversberg", description: "Referenzprojekt von Clay Construction.", images: [{ src: "/references/vevio-hotel-events-spiesen-elversberg/title-images/vevio-title-01.png", alt: "Aussenansicht von Vevio Hotel & Events" }] },
  { company: "clay-construction", slug: "pionierkaserne-ulm", title: "Pionierkaserne, Ulm", description: "Referenzprojekt von Clay Construction.", images: [{ src: "/references/pionierkaserne-ulm/title-images/pionierkaserne-ulm-title-01.png", alt: "Aussenansicht der Pionierkaserne in Ulm" }] },
  { company: "clay-construction", slug: "markthaus-telfs", title: "Markthaus Telfs", description: "Referenzprojekt von Clay Construction.", images: [{ src: "/references/markthaus-telfs/title-images/markthaus-telfs-title-01.png", alt: "Aussenansicht des Markthauses Telfs" }] },
  { company: "clay-construction", slug: "fh-muenster", title: "FH Muenster", description: "Referenzprojekt von Clay Construction.", images: [{ src: "/references/fh-muenster/title-images/fh-muenster-title-01.png", alt: "Aussenansicht der FH Muenster" }] },
];

export const teamMembers: TeamMemberEntry[] = [
  { company: "tilution", departmentSlug: "geschaeftsfuehrung", departmentTitle: "Geschaeftsfuehrung", slug: "jan-gruenewald", name: "Jan Gruenewald", role: "Geschaeftsfuehrung", imageSrc: "/images/team/jan-gruenewald.png" },
  { company: "tilution", departmentSlug: "geschaeftsfuehrung", departmentTitle: "Geschaeftsfuehrung", slug: "melanie-montua", name: "Melanie Montua", role: "Assistenz der Geschaeftsfuehrung", imageSrc: "/images/team/melanie-montua.png" },
  { company: "tilution", departmentSlug: "vertrieb", departmentTitle: "Vertrieb", slug: "juergen-gatzemeier", name: "Juergen Gatzemeier", role: "Vertriebsleiter", imageSrc: "/images/team/juergen-gatzemeier.png" },
  { company: "tilution", departmentSlug: "produktion", departmentTitle: "Produktion", slug: "qendrim-jashari", name: "Qendrim Jashari", role: "Produktionsleiter/Projektleiter", imageSrc: "/images/team/qendrim-jashari.png" },
  { company: "tilution", departmentSlug: "marketing", departmentTitle: "Marketing", slug: "timo-scharf", name: "Timo Scharf", role: "Manager fuer Marketing & Unternehmensprozesse", imageSrc: "/images/team/timo-scharf.png" },
  { company: "clay-construction", departmentSlug: "geschaeftsfuehrung", departmentTitle: "Geschaeftsfuehrung", slug: "jan-gruenewald", name: "Jan Gruenewald", role: "Geschaeftsfuehrung", imageSrc: "/images/team/jan-gruenewald.png" },
  { company: "verwaltung", departmentSlug: "kaufmaennische-leitung", departmentTitle: "Kaufmaennische Leitung", slug: "alexandra-fieseler", name: "Alexandra Fieseler", role: "Kaufmaennische Leitung", imageSrc: "/images/verwaltung/team-alexandra-fieseler.png" },
  { company: "verwaltung", departmentSlug: "kaufmaennische-leitung", departmentTitle: "Kaufmaennische Leitung", slug: "mirco-mueller", name: "Mirco Mueller", role: "Kaufmaennische Leitung", imageSrc: "/images/verwaltung/team-mirco-mueller.png" },
  { company: "verwaltung", departmentSlug: "kreditorenbuchhaltung", departmentTitle: "Kreditorenbuchhaltung", slug: "birgit-peters", name: "Birgit Peters", role: "Kreditorenbereich & Immobilienverwaltung", imageSrc: "/images/verwaltung/team-birgit-peters.png" },
  { company: "verwaltung", departmentSlug: "debitorenbuchhaltung", departmentTitle: "Debitorenbuchhaltung", slug: "simone-seibert", name: "Simone Seibert", role: "Debitorenbereich, Buergschaftswesen & Rechtsfaelle", imageSrc: "/images/verwaltung/team-simone-seibert.png" },
  { company: "verwaltung", departmentSlug: "it", departmentTitle: "IT", slug: "shqiprim-salihu", name: "Shqiprim Salihu", role: "Sachbearbeiter IT", imageSrc: "/images/verwaltung/team-shqiprim-salihu.png" },
  { company: "verwaltung", departmentSlug: "personalwesen", departmentTitle: "Personalwesen", slug: "brigitte-marx", name: "Brigitte Marx", role: "Lohnbuchhaltung", imageSrc: "/images/verwaltung/team-brigitte-marx.png" },
];

export function getReferencePath(reference: ReferenceEntry) {
  if (reference.company === "clay-construction") {
    return `/clay-construction/referenzen/${reference.slug}`;
  }

  return `/${reference.company}/referenzen/${reference.categorySlug}/${reference.slug}`;
}

export function getTeamMemberPath(member: TeamMemberEntry) {
  return `/${member.company}/team/${member.departmentSlug}/${member.slug}`;
}

export function getAllSeoPaths() {
  const paths = new Set<string>();

  groupPages.forEach((page) => paths.add(page.path));
  companySectionPages.forEach(([company, section]) =>
    paths.add(`/${company}/${section}`)
  );
  services.forEach((service) =>
    paths.add(`/${service.company}/leistungen/${service.slug}`)
  );

  uniqueBy(
    references.filter(
      (reference) =>
        reference.company !== "clay-construction" && reference.categorySlug
    ),
    (reference) => `${reference.company}/${reference.categorySlug}`
  ).forEach((reference) => {
    paths.add(`/${reference.company}/referenzen/${reference.categorySlug}`);
  });
  references.forEach((reference) => paths.add(getReferencePath(reference)));

  uniqueBy(
    teamMembers,
    (member) => `${member.company}/${member.departmentSlug}`
  ).forEach((member) => {
    paths.add(`/${member.company}/team/${member.departmentSlug}`);
  });
  teamMembers.forEach((member) => paths.add(getTeamMemberPath(member)));

  return Array.from(paths).sort();
}

export function uniqueBy<T>(items: T[], getKey: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
