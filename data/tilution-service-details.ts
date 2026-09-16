export type TilutionServiceDetail = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  lead: string;
  paragraphs: [string, string];
  closing: string;
  highlights?: string[];
};

export const tilutionServiceDetails: TilutionServiceDetail[] = [
  {
    slug: "schwimmbaeder-thermen",
    title: "Schwimmbäder & Thermen",
    image: "/images/tilution/schwimmbad-ki-bild.png",
    alt: "Keramische Beläge in einem modernen Schwimmbad",
    lead: "Technik, die dauerhaft funktioniert.",
    paragraphs: [
      "Wir realisieren keramische Beläge für Schwimmbäder und Thermen – von Untergrundvorbereitung und Gefälleausbildung über fachgerechte Abdichtung bis zur sicheren Verlegung.",
      "Dabei berücksichtigen wir Rutschhemmung, Beckenköpfe, Rinnen, Treppen, Fugen, Einbauteile und dauerhaft stark beanspruchte Nassbereiche.",
    ],
    closing: "Für Schwimmbadlösungen, die technisch sicher, langlebig und präzise ausgeführt sind.",
  },
  {
    slug: "hotels-wellness",
    title: "Hotels & Wellness",
    image: "/images/tilution/hotel-ki-bild.png",
    alt: "Hochwertiger Pool- und Wellnessbereich eines Hotels",
    lead: "Hochwertige Flächen. Präzise ausgeführt.",
    paragraphs: [
      "Wir realisieren Fliesen- und Plattenarbeiten für Hotels und Wellnessbereiche – von Zimmerbädern und Fluren bis zu Spa-, Sauna- und Nassbereichen.",
      "Dabei achten wir auf hochwertige Oberflächen, sichere Abdichtung, Rutschhemmung, belastbare Fugen und eine saubere Ausführung bis ins Detail.",
    ],
    closing: "Für Räume, die Komfort, Design und Funktion dauerhaft verbinden.",
  },
  {
    slug: "oeffentliche-einrichtungen",
    title: "Öffentliche Einrichtungen",
    image: "/images/tilution/oeffentliche-einrichtungen-ki-bild.png",
    alt: "Robuste Flächen in einer modernen öffentlichen Einrichtung",
    lead: "Funktionalität für stark genutzte Bereiche.",
    paragraphs: [
      "Wir realisieren langlebige Fliesen- und Plattenflächen für Schulen, Universitäten, Verwaltungsgebäude und weitere öffentliche Einrichtungen.",
      "Dabei berücksichtigen wir Rutschhemmung, barrierearme Details, Blindleitsysteme, hohe Beanspruchung sowie pflegeleichte und robuste Oberflächen.",
    ],
    closing: "Für öffentliche Räume, die sicher, belastbar und dauerhaft nutzbar bleiben.",
  },
  {
    slug: "kliniken-pflegebereiche",
    title: "Kliniken & Pflegebereiche",
    image: "/images/tilution/klinik-ki-bild.png",
    alt: "Hygienischer Flur in einer modernen Klinik",
    lead: "Hygiene trifft Belastbarkeit.",
    paragraphs: [
      "In Kliniken und Pflegeeinrichtungen sind hygienische, sichere und widerstandsfähige Oberflächen unverzichtbar.",
      "Wir realisieren Fliesen- und Plattenarbeiten mit rutschhemmenden Belägen, barrierearmen Übergängen, leicht zu reinigenden Oberflächen und langlebigen Fugenlösungen.",
    ],
    closing: "Für Bereiche, in denen Hygiene, Sicherheit und Funktion täglich zählen.",
  },
  {
    slug: "grosskuechen",
    title: "Großküchen",
    image: "/images/tilution/grosskueche-ki-bild.png",
    alt: "Belastbare Boden- und Wandflächen in einer Großküche",
    lead: "Gemacht für höchste Beanspruchung.",
    paragraphs: [
      "Großküchen stellen besondere Anforderungen an Boden- und Wandflächen. Wir realisieren robuste Beläge mit Gefälleausbildung, Abläufen, Hohlkehlen und chemisch belastbaren Fugen.",
      "Rutschhemmung, Hygiene, Temperaturbeständigkeit und eine dauerhaft sichere Entwässerung werden von Beginn an mitgedacht.",
    ],
    closing: "Für Küchenflächen, die auch unter Dauerbelastung zuverlässig funktionieren.",
  },
  {
    slug: "retail-grossflaechen",
    title: "Retail & Großflächen",
    image: "/images/tilution/retail-ki-bild.png",
    alt: "Großflächiger moderner Verkaufsraum mit präzisem Bodenbelag",
    lead: "Große Flächen. Hohe Präzision.",
    paragraphs: [
      "Wir realisieren belastbare Bodenflächen für Verkaufsräume, Autohäuser, Märkte und weitere großflächige Gewerbeobjekte.",
      "Von großformatigen Fliesen über Rüttelboden bis zur präzisen Ebenheit achten wir auf hohe Belastbarkeit, saubere Raster, effiziente Ausführung und ein dauerhaft hochwertiges Erscheinungsbild.",
    ],
    closing: "Für Flächen, die auch bei hoher Nutzung überzeugen.",
  },
  {
    slug: "wohnungsbau",
    title: "Wohnungsbau",
    image: "/images/tilution/wohngebaeude-ki-bild.png",
    alt: "Hochwertig ausgeführter Fliesenbelag in einem Wohngebäude",
    lead: "Effizient geplant. Sauber umgesetzt.",
    paragraphs: [
      "Im Wohnungsbau verbinden wir wirtschaftliche Ausführung mit verlässlicher Qualität. Wir realisieren Serienbäder, Treppenhäuser, Flure und weitere Wohnbereiche mit abgestimmten Fliesen- und Plattenbelägen.",
      "Klare Abläufe, standardisierte Details und eine effiziente Logistik ermöglichen auch bei großen Stückzahlen eine gleichbleibend hohe Ausführungsqualität.",
    ],
    closing: "Für Wohnungsbau, der wirtschaftlich bleibt und dauerhaft überzeugt.",
  },
  {
    slug: "fassaden",
    title: "Fassaden",
    image: "/images/tilution/fassaden-ki-bild.png",
    alt: "Hochwertige langlebige Keramikfassade eines modernen Gebäudes",
    lead: "Gestaltung, die Bestand hat.",
    paragraphs: [
      "Wir realisieren hochwertige Fassaden mit Klinker, Riemchen, Keramik und Feinsteinzeug – langlebig, witterungsbeständig und abgestimmt auf die Architektur des Gebäudes.",
      "Von der Untergrundvorbereitung über Befestigung und Verlegung bis zu Anschlüssen und Detailausbildungen achten wir auf eine technisch sichere und präzise Ausführung.",
    ],
    closing: "Für Fassaden, die schützen, gestalten und dauerhaft wirken.",
  },
];

export const tilutionServiceDetailsByTitle = Object.fromEntries(
  tilutionServiceDetails.map((detail) => [detail.title, detail]),
) as Record<string, TilutionServiceDetail>;

export const tilutionServiceDetailsBySlug = Object.fromEntries(
  tilutionServiceDetails.map((detail) => [detail.slug, detail]),
) as Record<string, TilutionServiceDetail>;
