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

export type ServiceDetailEntry = ServiceEntry & {
  parentSlug?: string;
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
      "Fliesenarbeiten für anspruchsvolle gewerbliche und öffentliche Bauvorhaben.",
  },
  gruenewald: {
    title: "Gruenewald GmbH",
    basePath: "/gruenewaldgmbh",
    description:
      "Hochwertige Fliesenarbeiten, Sanierungen und Ausbauten fuer private Bauvorhaben.",
  },
  "clay-construction": {
    title: "Clay Construction",
    basePath: "/clay-construction",
    description:
      "Klimadecken und Lehmbau-Systeme für nachhaltige moderne Gebäude.",
  },
  verwaltung: {
    title: "Gruenewald Verwaltung",
    basePath: "/verwaltung",
    description:
      "Zentrale Organisation, Steuerung und Verwaltungsleistungen der Grünewald Gruppe.",
  },
  hrw: {
    title: "HRW GmbH",
    basePath: "/hrw",
    description:
      "Personalkapazitäten und Fachkräfte für zuverlässige Projektabläufe.",
  },
};

export const groupPages = [
  {
    path: "/karte",
    title: "Deutschlandkarte",
    eyebrow: "Karte",
    description:
      "Der Standort der Grünewald Gruppe in Scheden - zentral in Deutschland und deutschlandweit für Projekte erreichbar.",
  },
  {
    path: "/leistungen",
    title: "Leistungen der Gruenewald Gruppe",
    eyebrow: "Leistungen",
    description:
      "Die operativen und unterstützenden Bereiche der Grünewald Gruppe im Überblick.",
  },
  {
    path: "/referenzen",
    title: "Referenzen der Gruenewald Gruppe",
    eyebrow: "Referenzen",
    description:
      "Ausgewählte Projekte aus unterschiedlichen Bereichen der Grünewald Gruppe.",
  },
  {
    path: "/innovationen",
    title: "Innovationen der Gruenewald Gruppe",
    eyebrow: "Innovationen",
    description:
      "Digitale Werkzeuge und moderne Technik für präzisere Planung und sicherere Bauabläufe.",
  },
  {
    path: "/team",
    title: "Team der Gruenewald Gruppe",
    eyebrow: "Team",
    description:
      "Ansprechpartnerinnen und Ansprechpartner der Grünewald Gruppe nach Bereichen.",
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
      "Der richtige Ansprechpartner für Ihr Projekt innerhalb der Grünewald Gruppe.",
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
  ["gruenewald", "karriere", "Karriere", "Karriere bei der Gruenewald GmbH"],
  ["gruenewald", "kontakt", "Kontakt", "Kontakt zur Gruenewald GmbH"],
  ["clay-construction", "leistungen", "Leistungen", "Leistungen von Clay Construction"],
  ["clay-construction", "system-ausfuehrung", "System & Ausfuehrung", "System und Ausfuehrung bei Clay Construction"],
  ["clay-construction", "referenzen", "Referenzen", "Referenzen von Clay Construction"],
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
  { company: "gruenewald", slug: "aussengestaltung", title: "Aussengestaltung", description: "Terrassen, Wege und Außenbereiche hochwertig geplant und umgesetzt." },
  { company: "gruenewald", slug: "badsanierung", title: "Badsanierung", description: "Komplette Badmodernisierung mit klarer Planung und präziser Ausführung." },
  { company: "gruenewald", slug: "haus-wohnsanierung", title: "Haus- & Wohnsanierung", description: "Sanierungen und Modernisierungen für private Wohnräume." },
  { company: "gruenewald", slug: "generalunternehmer", title: "Generalunternehmer", description: "Koordination mehrerer Gewerke mit einem zentralen Ansprechpartner." },
];

export const serviceDetails: ServiceDetailEntry[] = [
  { company: "gruenewald", parentSlug: "aussengestaltung", slug: "balkone-terrassen", title: "Balkone & Terrassen", description: "Balkone und Terrassen hochwertig gestalten und langlebig umsetzen." },
  { company: "gruenewald", parentSlug: "aussengestaltung", slug: "treppen-pflasterarbeiten", title: "Treppen & Pflasterarbeiten", description: "Treppen, Wege und Pflasterflächen funktional und gestalterisch sauber ausführen." },
  { company: "gruenewald", parentSlug: "aussengestaltung", slug: "gaerten-aussenanlagen", title: "Gaerten & Aussenanlagen", description: "Aussenanlagen passend zu Haus, Nutzung und Gestaltungsanspruch entwickeln." },
  { company: "gruenewald", parentSlug: "aussengestaltung", slug: "pools-saunen", title: "Pools & Saunen", description: "Private Wellnessbereiche im Aussenraum hochwertig planen und realisieren." },
  { company: "gruenewald", parentSlug: "badsanierung", slug: "modernisierung", title: "Modernisierung", description: "Bestehende Badezimmer technisch, funktional und gestalterisch modernisieren." },
  { company: "gruenewald", parentSlug: "badsanierung", slug: "wanne-zu-dusche", title: "Wanne zu Dusche", description: "Badewannen durch komfortable, moderne Duschbereiche ersetzen." },
  { company: "gruenewald", parentSlug: "badsanierung", slug: "barrierefreier-umbau", title: "Barrierefreier Umbau", description: "Badezimmer sicher, komfortabel und langfristig nutzbar gestalten." },
  { company: "gruenewald", parentSlug: "badsanierung", slug: "raumloesungen-mini-baeder", title: "Raumloesungen: Mini-Baeder", description: "Kleine Badezimmer mit klarer Planung effizient und hochwertig nutzen." },
  { company: "gruenewald", parentSlug: "badsanierung", slug: "sauna-schwimmbad", title: "Sauna & Schwimmbad", description: "Private Wellnessbereiche im Innenraum individuell und hochwertig umsetzen." },
  { company: "gruenewald", parentSlug: "haus-wohnsanierung", slug: "malerarbeiten-bodenbelaege", title: "Malerarbeiten & Bodenbelaege", description: "Wand-, Decken- und Bodenoberflächen hochwertig erneuern." },
  { company: "gruenewald", parentSlug: "haus-wohnsanierung", slug: "energetische-sanierung", title: "Energetische Sanierung", description: "Gebäude effizienter, komfortabler und zukunftsfähiger sanieren." },
  { company: "gruenewald", parentSlug: "haus-wohnsanierung", slug: "lehm-fachwerk", title: "Lehm & Fachwerk", description: "Historische Bausubstanz mit passenden Materialien fachgerecht erhalten." },
];

export const references: ReferenceEntry[] = [
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "rheingau-bad-geisenheim",
    title: "Rheingau-Bad, Geisenheim",
    description: "Das Rheingau-Bad in Geisenheim wurde umfassend saniert und technisch wie gestalterisch neu aufgestellt. Neue Edelstahlbecken, moderne Flächen und ein frisches Farbkonzept geben dem traditionsreichen Hallenbad ein neues Gesicht. Mit Tilution waren wir an den Fliesenarbeiten und angrenzenden Gewerken beteiligt und haben dazu beigetragen, das Bad langfristig hochwertig, funktional und zukunftsfähig aufzustellen.",
    images: [{ src: "/references/rheingau-bad-geisenheim/title-images/rheingau-bad-title-01.png", alt: "Aussenansicht des Rheingau-Bads in Geisenheim" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "freibad-duderstadt",
    title: "Freibad Duderstadt",
    description: "Das Freibad Duderstadt ist seit den 1970er-Jahren ein fester Bestandteil des Freizeit- und Schwimmangebots in unserer Region. Im Zuge umfangreicher Sanierungsmaßnahmen wurden unter anderem Beckenbereiche, Beckenköpfe und Zugänge modernisiert, um das Bad langfristig zu erhalten und technisch zukunftsfähig aufzustellen. Mit Tilution haben wir unsere Erfahrung im Schwimmbadbau eingebracht und zur hochwertigen Umsetzung beigetragen.",
    images: [{ src: "/references/freibad-duderstadt/title-images/freibad-duderstadt-title-01.png", alt: "Luftaufnahme des Freibads Duderstadt" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "badeparadies-eiswiese-goettingen",
    title: "Badeparadies Eiswiese, Goettingen",
    description: "Das Badeparadies Eiswiese in Göttingen zählt seit vielen Jahren zu den bedeutendsten Freizeit- und Erlebnisbädern in unserer Region. Auf mehreren tausend Quadratmetern vereint es Schwimm-, Erlebnis-, Sole- und Saunabereiche und stellt entsprechend hohe Anforderungen an Material, Ausführung und Dauerhaftigkeit. Mit Tilution haben wir die Fliesen- und Plattenarbeiten umgesetzt und unsere Erfahrung im anspruchsvollen Schwimmbadbau eingebracht.",
    images: [{ src: "/references/badeparadies-eiswiese-goettingen/title-images/badeparadies-eiswiese-title-01.png", alt: "Luftaufnahme des Badeparadieses Eiswiese in Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "schwimmbaeder-thermen",
    categoryTitle: "Schwimmbaeder & Thermen",
    slug: "sprudelhof-therme-bad-nauheim",
    title: "Sprudelhof Therme, Bad Nauheim",
    description:
      "Die Sprudelhof Therme Bad Nauheim verbindet die traditionsreiche Badekultur der Stadt mit moderner Architektur und hochwertigem Thermenkomfort. In unmittelbarer Nähe zum historischen Jugendstilensemble entstand ein anspruchsvolles Projekt mit besonderem gestalterischem Anspruch. Mit der Tilution und unseren Fliesen- und Betonwerksteinarbeiten haben wir dazu beigetragen, Geschichte, Qualität und modernes Handwerk miteinander zu verbinden.",
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
    description: "Das Althoff Dom Hotel in Köln zählt zu den traditionsreichsten Grandhotels Deutschlands und liegt unmittelbar am Kölner Dom. Im Zuge der umfassenden Sanierung entsteht ein Haus, das historische Substanz mit modernem 5-Sterne-Luxus verbindet. Mit Tilution wirken wir an der hochwertigen Ausführung der Badezimmer mit und tragen dazu bei, den besonderen Qualitätsanspruch des Hotels bis ins Detail umzusetzen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-03.png", alt: "Aussenansicht eines Referenzprojekts am Koelner Dom" }],
  },
  {
    company: "tilution",
    categorySlug: "hotels-wellness",
    categoryTitle: "Hotels & Wellness",
    slug: "fischers-hotel-kassel",
    title: "Fischer's Hotel, Kassel",
    description: "Im Fischer's Hotel Kassel treffen Erholung, hochwertiges Design und anspruchsvolle Wellnessbereiche aufeinander. Besonders das Hotelschwimmbad und der Wellnessbereich stellen hohe Anforderungen an Material, Detailausbildung und dauerhaft sichere Oberflächen. Mit Tilution haben wir die hochwertige Ausführung der Pool- und Spa-Bereiche übernommen und so zur besonderen Atmosphäre und Funktionalität des Wellnessbereichs beigetragen.",
    images: [{ src: "/references/fischers-hotel-kassel/title-images/fischers-hotel-title-01.png", alt: "Aussenansicht von Fischer's Hotel in Kassel" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "fraunhofer-institut-kassel",
    title: "Fraunhofer Institut, Kassel",
    description: "Das Fraunhofer-Institut in Kassel steht für Forschung, Innovation und technische Präzision. Entsprechend hoch waren die Anforderungen an Architektur und Ausführung. Mit Tilution haben wir die Fliesen- und Plattenarbeiten umgesetzt und dazu beigetragen, den modernen, funktionalen Charakter des Gebäudes auch handwerklich hochwertig abzubilden - präzise, langlebig und bis ins Detail sauber ausgeführt.",
    images: [{ src: "/references/sprudelhof-therme/title-images/fraunhofer-iff-title.png", alt: "Aussenansicht des Fraunhofer IFF Gebaeudes" }],
  },
  {
    company: "tilution",
    categorySlug: "grosskuechen",
    categoryTitle: "Großküchen",
    slug: "rathaus-vellmar",
    title: "Rathaus Vellmar",
    description: "Beim Rathaus Vellmar standen in der Großküche vor allem Hygiene, Belastbarkeit und dauerhaft sichere Oberflächen im Mittelpunkt. Gerade in professionell genutzten Küchen müssen Böden und Wandflächen täglicher Beanspruchung, Feuchtigkeit und intensiver Reinigung zuverlässig standhalten. Mit Tilution haben wir die keramischen Oberflächen der Großküche umgesetzt und so Funktionalität, Langlebigkeit und eine saubere Ausführung miteinander verbunden.",
    images: [
      { src: "/references/rathaus-vellmar/title-images/rathaus-vellmar-title-01.png", alt: "Außenansicht des Rathauses Vellmar" },
      { src: "/references/rathaus-vellmar/overlay/rathaus-vellmar-overlay-02.png", alt: "Großküche im Rathaus Vellmar" },
      { src: "/references/rathaus-vellmar/overlay/rathaus-vellmar-overlay-03.png", alt: "Arbeitsbereich der Großküche im Rathaus Vellmar" },
    ],
  },
  {
    company: "tilution",
    categorySlug: "grosskuechen",
    categoryTitle: "Großküchen",
    slug: "fraunhofer-institut-kassel-grosskueche",
    title: "Fraunhofer-Institut Kassel",
    description: "Beim Fraunhofer-Institut in Kassel treffen Forschung, Innovation und höchste funktionale Anforderungen aufeinander. Auch die Großküche musste entsprechend robust, hygienisch und dauerhaft belastbar ausgeführt werden. Mit Tilution haben wir die keramischen Oberflächen in diesem sensiblen Bereich umgesetzt und so dazu beigetragen, Hygiene, Funktionalität und langlebige Qualität miteinander zu verbinden.",
    images: [
      { src: "/references/fraunhofer-institut-kassel-grosskueche/title-images/fraunhofer-institut-kassel-grosskueche-title-01.png", alt: "Außenansicht des Fraunhofer-Instituts in Kassel" },
      { src: "/references/fraunhofer-institut-kassel-grosskueche/overlay/fraunhofer-institut-kassel-grosskueche-overlay-02.png", alt: "Ausgabebereich der Großküche im Fraunhofer-Institut Kassel" },
      { src: "/references/fraunhofer-institut-kassel-grosskueche/overlay/fraunhofer-institut-kassel-grosskueche-overlay-03.png", alt: "Flurbereich der Großküche im Fraunhofer-Institut Kassel" },
      { src: "/references/fraunhofer-institut-kassel-grosskueche/overlay/fraunhofer-institut-kassel-grosskueche-overlay-04.png", alt: "Bodenflächen der Großküche im Fraunhofer-Institut Kassel" },
    ],
  },
  {
    company: "tilution",
    categorySlug: "kliniken-pflegebereiche",
    categoryTitle: "Kliniken & Pflegebereiche",
    slug: "heart-brain-universitaet-goettingen",
    title: "Heart & Brain Universitaet Goettingen",
    description: "Das Heart & Brain Center Göttingen ist ein deutschlandweit einzigartiges Forschungszentrum, in dem Herz-Kreislauf-Medizin und Neurowissenschaften erstmals in einer gemeinsamen Infrastruktur zusammengeführt werden. Der rund 38 Millionen Euro teure Neubau steht für Spitzenforschung, modernste Technik und interdisziplinäre Zusammenarbeit. Mit Tilution haben wir die Fliesen- und Plattenarbeiten umgesetzt und zur hochwertigen Ausführung dieses besonderen Forschungsbaus beigetragen.",
    images: [{ src: "/references/heart-brain-universitaet-goettingen/title-images/heart-brain-title-01.png", alt: "Aussenansicht der Heart & Brain Universitaet Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "leibniz-universitaet-hannover",
    title: "Leibniz Universitaet Hannover",
    description: "Mit SCALE an der Leibniz Universität Hannover entstand ein moderner Forschungs- und Hochschulbau, der für Innovation, Wissenschaft und interdisziplinäre Zusammenarbeit steht. Entsprechend hoch waren die Anforderungen an Funktionalität und Ausführungsqualität. Mit Tilution haben wir die Fliesen- und Plattenarbeiten umgesetzt und damit zur hochwertigen und langlebigen Gestaltung des Gebäudes beigetragen.",
    images: [{ src: "/references/leibniz-universitaet-hannover/title-images/leibniz-universitaet-hannover-title-01.jpg", alt: "Aussenansicht der Leibniz Universitaet Hannover" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "kita-ritterburg-wolfhagen",
    title: "Kita Ritterburg, Wolfhagen",
    description: "Die Kita Ritterburg in Wolfhagen zeigt, wie aus historischer Bausubstanz ein moderner Ort für die nächste Generation entstehen kann. Das ehemals sanierungsbedürftige Gebäude wurde umfassend erneuert und zu einer zeitgemäßen Kindertagesstätte umgebaut, ohne seinen besonderen Charakter zu verlieren. Mit unseren Fliesenarbeiten innerhalb der Tilution haben wir dazu beigetragen, Geschichte, Qualität und moderne Nutzung miteinander zu verbinden.",
    images: [{ src: "/references/kita-ritterburg-wolfhagen/title-images/kita-ritterburg-title-01.png", alt: "Aussenansicht der Kita Ritterburg in Wolfhagen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "friedensschule-koeln",
    title: "Friedensschule, Koeln",
    description: "Bei der Friedensschule Köln standen neben einer hochwertigen und langlebigen Ausführung vor allem die besonderen Anforderungen eines öffentlichen Bildungsgebäudes im Fokus. Dazu gehören auch Lösungen, die Orientierung und Barrierefreiheit im Alltag unterstützen. Mit Tilution haben wir unter anderem taktile Blindenleitsysteme umgesetzt und so dazu beigetragen, Funktionalität, Sicherheit und inklusive Nutzung mit einer sauberen gestalterischen Ausführung zu verbinden.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-06.png", alt: "Aussenansicht eines modernen Schul- und Verwaltungsgebaeudes" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "stadthalle-goettingen",
    title: "Stadthalle, Goettingen",
    description: "Bei der Stadthalle Göttingen treffen repräsentative Architektur, hohe Besucherfrequenz und die besonderen Anforderungen eines öffentlichen Veranstaltungsgebäudes aufeinander. Im Fokus unserer Arbeiten standen vor allem die Treppenanlagen und Sanitärbereiche, bei denen Präzision, Belastbarkeit und eine hochwertige Optik gleichermaßen gefragt sind. Mit Tilution haben wir dazu beigetragen, stark frequentierte Bereiche funktional, langlebig und gestalterisch überzeugend umzusetzen.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-07.jpg", alt: "Aussenansicht der Stadthalle Goettingen" }],
  },
  {
    company: "tilution",
    categorySlug: "oeffentliche-einrichtungen",
    categoryTitle: "Oeffentliche Einrichtungen",
    slug: "feuerwehr-duderstadt",
    title: "Feuerwehr, Duderstadt",
    description: "Bei der Feuerwehr Duderstadt standen vor allem extreme Belastbarkeit und eine dauerhaft sichere Ausführung im Mittelpunkt. Die Bodenflächen müssen dem Gewicht schwerer Einsatzfahrzeuge sowie der täglichen intensiven Nutzung zuverlässig standhalten. Mit Tilution haben wir einen hochbelastbaren Rüttelboden umgesetzt, der speziell für diese Anforderungen ausgelegt ist und Robustheit, Langlebigkeit und Funktionalität miteinander verbindet.",
    images: [{ src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-09.jpg", alt: "Visualisierung des Feuerwehrzentrums Duderstadt" }],
  },
  {
    company: "tilution",
    categorySlug: "fassaden",
    categoryTitle: "Fassaden",
    slug: "polizeirevier-kassel-ost",
    title: "Polizeirevier Kassel-Ost",
    description: "Beim Polizeirevier Kassel-Ost standen eine robuste Ausführung, langlebige Materialien und ein klares architektonisches Erscheinungsbild im Mittelpunkt. Mit Tilution haben wir dort Klinkerarbeiten ausgeführt und damit zu einer widerstandsfähigen, pflegeleichten und dauerhaft hochwertigen Oberfläche beigetragen. Gerade bei einem öffentlichen Gebäude mit hoher täglicher Nutzung verbinden sich hier Funktionalität und gestalterischer Anspruch auf besondere Weise.",
    images: [
      { src: "/references/polizeirevier-kassel-ost/title-images/polizeirevier-kassel-ost-title-01.png", alt: "Visualisierung des Polizeireviers Kassel-Ost mit heller Fassade und dunklem Klinkersockel" },
      { src: "/references/polizeirevier-kassel-ost/overlay/polizeirevier-kassel-ost-overlay-02.png", alt: "Seitliche Fassadenansicht des Polizeireviers Kassel-Ost mit dunklem Klinker und hellen Oberflächen" },
      { src: "/references/polizeirevier-kassel-ost/overlay/polizeirevier-kassel-ost-overlay-03.png", alt: "Detailansicht der Klinkerfassade am Polizeirevier Kassel-Ost" },
    ],
  },
  {
    company: "tilution",
    categorySlug: "wohnungsbau",
    categoryTitle: "Wohnungsbau",
    slug: "quartier-im-reitstall-goettingen",
    title: "Quartier im Reitstall, Goettingen",
    description: "Beim Quartier im Reitstall in Göttingen entstand moderner Wohnraum mit einem hohen Anspruch an Qualität, Funktionalität und dauerhafte Wertigkeit. Besonders in den Badezimmern kam es auf präzise Ausführung, hochwertige Oberflächen und belastbare Details an. Mit Tilution haben wir die keramischen Flächen umgesetzt und damit dazu beigetragen, zeitgemäßen Wohnkomfort mit einer langlebigen und gestalterisch hochwertigen Ausführung zu verbinden.",
    images: [
      { src: "/references/quartier-im-reitstall-goettingen/title-images/quartier-im-reitstall-title-01.png", alt: "Außenansicht des Quartiers im Reitstall in Göttingen" },
      { src: "/references/quartier-im-reitstall-goettingen/overlay/quartier-im-reitstall-overlay-02.png", alt: "Modernes Badezimmer im Quartier im Reitstall mit großformatigen grauen Fliesen" },
      { src: "/references/quartier-im-reitstall-goettingen/overlay/quartier-im-reitstall-overlay-03.png", alt: "Waschtisch und WC-Bereich im Quartier im Reitstall mit keramischen Wand- und Bodenflächen" },
      { src: "/references/quartier-im-reitstall-goettingen/overlay/quartier-im-reitstall-overlay-04.png", alt: "Flurbereich im Quartier im Reitstall mit hellen Wänden und grauem Bodenbelag" },
    ],
  },
  {
    company: "tilution",
    categorySlug: "retail-gewerbeflaechen",
    categoryTitle: "Retail & Gewerbeflaechen",
    slug: "bmw-autohaus-goettingen",
    title: "BMW Autohaus, Goettingen",
    description: "Beim BMW Autohaus Göttingen standen nicht nur eine hochwertige Optik, sondern auch besonders hohe technische Anforderungen im Fokus. Die großflächig geflieste Ausstellungsfläche muss dauerhaft hohen Belastungen durch Fahrzeuge standhalten und gleichzeitig dem repräsentativen Anspruch der Marke gerecht werden. Mit Tilution haben wir robuste, präzise ausgeführte Bodenflächen geschaffen, die Design, Belastbarkeit und Langlebigkeit miteinander verbinden.",
    images: [{ src: "/references/sprudelhof-therme/title-images/bmw-frontlayer-cover.png", alt: "Aussenansicht eines BMW Autohauses in Goettingen" }],
  },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "sanierung-terrasse-eingangsbereich", title: "Sanierung Terrasse & Eingangsbereich", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/hauseingang-steinteppich/cover.png", alt: "Neu gestalteter Hauseingang mit Steinteppich" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "mauer-mit-naturstein-veredelt", title: "Mauer mit Naturstein veredelt", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/natursteinmauer/cover.png", alt: "Mit Naturstein veredelte Gartenmauer" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "sanierung-eingangsbereich-mauer", title: "Sanierung Eingangsbereich und Mauer", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/eingangsbereich-mauer/cover.png", alt: "Sanierte Grundstuecksmauer und Eingangsbereich" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "pflasterarbeiten-terrasse", title: "Pflasterarbeiten & Terrasse", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/pflasterarbeiten-terrasse/cover.png", alt: "Gepflasterte Terrasse an einem Wohnhaus" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "poolbau-gartengestaltung", title: "Poolbau & Gartengestaltung", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/poolbau-gartengestaltung/cover.jpg", alt: "Pool mit moderner Gartengestaltung" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "pflasterarbeiten-einfahrt", title: "Pflasterarbeiten & Einfahrt", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/pflasterarbeiten-einfahrt/cover.jpg", alt: "Gepflasterte Einfahrt mit Entwaesserungsrinne" }] },
  { company: "gruenewald", categorySlug: "aussengestaltung", categoryTitle: "Aussengestaltung", slug: "terrassenbau", title: "Terrassenbau", description: "Referenzprojekt der Grünewald GmbH im Bereich Außengestaltung.", images: [{ src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-02.jpg", alt: "Ueberdachte Terrasse mit Blick in den Garten" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-dachschraege", title: "Komplettsanierung Badezimmer mit Dachschraege", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-dachschraege/cover.png", alt: "Komplett saniertes Badezimmer mit Dachschraege" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-steinwaschbecken", title: "Komplettsanierung Badezimmer mit Steinwaschbecken", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-steinwaschbecken/cover.png", alt: "Saniertes Badezimmer mit Steinwaschbecken" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "komplettsanierung-badezimmer-ebenerdige-dusche", title: "Komplettsanierung Badezimmer - ebenerdige Dusche", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-ebenerdige-dusche/cover.png", alt: "Komplett saniertes Badezimmer mit ebenerdiger Dusche" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-walk-in-duschkabine", title: "Sanierung Badezimmer mit Walk-In Duschkabine", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-walk-in-duschkabine/cover.png", alt: "Saniertes Badezimmer mit Walk-In Duschkabine" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-vintagefliesen", title: "Sanierung Badezimmer Vintagefliesen", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-vintagefliesen/cover.png", alt: "Sanierte Dusche mit Vintagefliesen" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-rote-mosaikborduere", title: "Sanierung Badezimmer rote Mosaikborduere", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-rote-mosaikborduere/cover.png", alt: "Saniertes Badezimmer mit roter Mosaikborduere" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-grifflose-einbaumodule", title: "Sanierung Badezimmer - grifflose Einbaumodule", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-grifflose-einbaumodule/cover.png", alt: "Sanierte Dusche mit grifflosen Einbaumodulen" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-dusche-glastrennwand", title: "Sanierung Badezimmer - Dusche mit Glastrennwand", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-dusche-glastrennwand/cover.png", alt: "Sanierte bodengleiche Dusche mit Glastrennwand" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-mit-sauna", title: "Sanierung Badezimmer mit Sauna", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-mit-sauna/cover.png", alt: "Saniertes Badezimmer mit Sauna" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer-mit-tv", title: "Sanierung Badezimmer mit TV", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-mit-tv/cover.png", alt: "Saniertes Badezimmer mit integriertem TV" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-toiletten-unigebaeude", title: "Sanierung Toiletten Unigebaeude", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/toiletten-unigebaeude/cover.png", alt: "Sanierter Toilettenraum" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-badezimmer", title: "Sanierung Badezimmer", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-sanierung-badezimmer/cover.png", alt: "Saniertes Badezimmer mit Badewanne" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "sanierung-wasserschaden-badezimmer", title: "Sanierung Wasserschaden Badezimmer", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-wasserschaden/cover.png", alt: "Sanierter Duschboden mit Linienablauf" }] },
  { company: "gruenewald", categorySlug: "badsanierung", categoryTitle: "Badsanierung", slug: "badsanierung-fussbodenheizung", title: "Badsanierung Fussbodenheizung", description: "Referenzprojekt der Grünewald GmbH im Bereich Badsanierung.", images: [{ src: "/references/gruenewald/bad-fussbodenheizung/cover.png", alt: "Saniertes Badezimmer mit Fussbodenheizung" }] },
  { company: "gruenewald", categorySlug: "haus-wohnsanierung", categoryTitle: "Haus- & Wohnsanierung", slug: "komplette-wohnungssanierung", title: "Komplette Wohnungssanierung", description: "Referenzprojekt der Grünewald GmbH im Bereich Haus- und Wohnsanierung.", images: [{ src: "/references/gruenewald/komplette-wohnungssanierung/cover.png", alt: "Komplett sanierter Wohnbereich" }] },
  { company: "gruenewald", categorySlug: "haus-wohnsanierung", categoryTitle: "Haus- & Wohnsanierung", slug: "wohnungssanierung", title: "Wohnungssanierung", description: "Referenzprojekt der Grünewald GmbH im Bereich Haus- und Wohnsanierung.", images: [{ src: "/references/gruenewald/wohnungssanierung/cover.png", alt: "Sanierter Wohnraum mit neuem Boden" }] },
  { company: "clay-construction", slug: "josef-schwarz-schule-heilbronn", title: "Josef-Schwarz-Schule, Heilbronn", description: "Die Josef-Schwarz-Schule in Heilbronn zählt zu den modernsten Schulbauprojekten Deutschlands. Offene Lernwelten, nachhaltige Materialien und ein zukunftsweisendes Gebäudekonzept prägen den Neubau. Mit Clay Construction haben wir die Lehm-Klimadecken umgesetzt und damit zu einem natürlichen, energieeffizienten Raumklima beigetragen - passend zum nachhaltigen Anspruch des gesamten Projekts.", images: [{ src: "/references/josef-schwarz-schule/title-images/josef-schwarz-schule-title-01.png", alt: "Aussenansicht der Josef-Schwarz-Schule in Heilbronn" }] },
  { company: "clay-construction", slug: "vevio-hotel-events-spiesen-elversberg", title: "Vevio - Hotel & Events, Spiesen-Elversberg", description: "Beim Vevio Hotel Elversberg verbindet sich moderner Hotelkomfort mit einem ganzheitlichen Anspruch an Gestaltung, Nachhaltigkeit und Raumklima. Gerade in den Gäste- und Aufenthaltsbereichen spielen Behaglichkeit und eine angenehme Temperatur eine zentrale Rolle. Mit Clay Construction haben wir die Lehm-Klimadecken umgesetzt und damit zu einem natürlichen, energieeffizienten und besonders komfortablen Raumklima beigetragen.", images: [{ src: "/references/vevio-hotel-events-spiesen-elversberg/title-images/vevio-title-01.png", alt: "Aussenansicht von Vevio Hotel & Events" }] },
  { company: "clay-construction", slug: "pionierkaserne-ulm", title: "Pionierkaserne, Ulm", description: "Bei der Pionierkaserne Ulm trifft historische Bausubstanz auf moderne Gebäudetechnik. Die bestehenden Gebäude prägen seit Jahrzehnten den Standort und stellen bei ihrer heutigen Nutzung besondere Anforderungen an Sanierung, Komfort und Energieeffizienz. Mit Clay Construction haben wir Lehm-Klimadecken umgesetzt und so dazu beigetragen, den Charakter des Bestands zu bewahren und gleichzeitig zeitgemäßen Raumkomfort zu schaffen.", images: [{ src: "/references/pionierkaserne-ulm/title-images/pionierkaserne-ulm-title-01.png", alt: "Aussenansicht der Pionierkaserne in Ulm" }] },
  { company: "clay-construction", slug: "markthaus-telfs", title: "Markthaus Telfs", description: "Beim Markthaus Telfs verbinden sich zeitgemäße Architektur, natürliche Materialien und ein hoher Anspruch an Aufenthaltsqualität. Gerade in einem lebendigen Gebäude mit wechselnden Nutzungen spielt ein ausgeglichenes Raumklima eine zentrale Rolle. Mit Clay Construction haben wir Lehm-Klimadecken umgesetzt und damit eine moderne Gebäudetechnik mit natürlichen Baustoffen verbunden - für angenehme Temperaturen, hohe Behaglichkeit und ein nachhaltiges Raumgefühl.", images: [{ src: "/references/markthaus-telfs/title-images/markthaus-telfs-title-01.png", alt: "Aussenansicht des Markthauses Telfs" }] },
  { company: "clay-construction", slug: "fh-muenster", title: "FH Muenster", description: "An der FH Münster trifft moderne Hochschularchitektur auf den Anspruch, Lern- und Arbeitsräume dauerhaft komfortabel und energieeffizient zu gestalten. Gerade in intensiv genutzten Bildungsgebäuden spielt ein ausgeglichenes Raumklima eine wichtige Rolle. Mit Clay Construction haben wir Lehm-Klimadecken umgesetzt und so natürliche Materialien mit moderner Heiz- und Kühltechnik verbunden - für angenehme Temperaturen und hohe Aufenthaltsqualität.", images: [{ src: "/references/fh-muenster/title-images/fh-muenster-title-01.png", alt: "Aussenansicht der FH Muenster" }] },
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

  return `${getCompanyPath(reference.company)}/referenzen/${reference.categorySlug}/${reference.slug}`;
}

export function getTeamMemberPath(member: TeamMemberEntry) {
  return `${getCompanyPath(member.company)}/team/${member.departmentSlug}/${member.slug}`;
}

export function getCompanyPath(company: CompanySlug) {
  return companies[company].basePath;
}

export function getCompanySlugFromPathSegment(value: string): CompanySlug | null {
  const match = (Object.keys(companies) as CompanySlug[]).find(
    (company) => companies[company].basePath === `/${value}`
  );

  return match ?? null;
}

export function getAllSeoPaths() {
  const paths = new Set<string>();

  groupPages.forEach((page) => paths.add(page.path));
  companySectionPages.forEach(([company, section]) =>
    paths.add(`${getCompanyPath(company)}/${section}`)
  );
  services.forEach((service) =>
    paths.add(`${getCompanyPath(service.company)}/leistungen/${service.slug}`)
  );
  serviceDetails.forEach((service) => {
    if (!service.parentSlug) return;
    paths.add(`${getCompanyPath(service.company)}/leistungen/${service.parentSlug}/${service.slug}`);
  });
  paths.add("/tilution/referenzen/fassaden");

  uniqueBy(
    references.filter(
      (reference) =>
        reference.company !== "clay-construction" && reference.categorySlug
    ),
    (reference) => `${reference.company}/${reference.categorySlug}`
  ).forEach((reference) => {
    paths.add(`${getCompanyPath(reference.company)}/referenzen/${reference.categorySlug}`);
  });
  references.forEach((reference) => paths.add(getReferencePath(reference)));

  uniqueBy(
    teamMembers,
    (member) => `${member.company}/${member.departmentSlug}`
  ).forEach((member) => {
    paths.add(`${getCompanyPath(member.company)}/team/${member.departmentSlug}`);
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
