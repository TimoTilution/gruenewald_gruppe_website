export const tilutionReferenceDescriptions = {
  Alle:
    "Ausgewählte Projekte zeigen unsere Erfahrung im anspruchsvollen Objektbau – von dauerhaft belastbaren Nassbereichen bis zu präzise ausgeführten Gewerbe- und Fassadenflächen.",
  "Schwimmbäder & Thermen":
    "Unsere Schwimmbad- und Thermenreferenzen zeigen technisch sichere Lösungen für dauerhaft beanspruchte Nassbereiche, komplexe Abdichtungen und rutschhemmende keramische Beläge.",
  "Hotels & Wellness":
    "In Hotels und Wellnessbereichen verbinden wir hochwertige Oberflächen mit zuverlässiger Abdichtung, sicherer Rutschhemmung und einer präzisen Ausführung bis ins Detail.",
  "Öffentliche Einrichtungen":
    "Diese Projekte zeigen robuste, pflegeleichte und sicher nutzbare Flächen für Schulen, Hochschulen, Verwaltungen und weitere stark frequentierte öffentliche Gebäude.",
  "Kliniken & Pflegebereiche":
    "Unsere Referenzen aus Kliniken und Pflegebereichen stehen für hygienische, widerstandsfähige Oberflächen, barrierearme Übergänge und dauerhaft sichere Details.",
  Großküchen:
    "In Großküchen realisieren wir belastbare Boden- und Wandflächen mit sicherer Entwässerung, rutschhemmenden Oberflächen und widerstandsfähigen Fugenlösungen.",
  "Retail & Gewerbeflächen":
    "Unsere Retail- und Gewerbeprojekte zeigen präzise ausgeführte Großflächen, die hoher täglicher Nutzung standhalten und dauerhaft hochwertig wirken.",
  Wohnungsbau:
    "Im Wohnungsbau verbinden wir effiziente Abläufe und wiederholbare Details mit einer verlässlich hohen Qualität bei Bädern, Fluren und weiteren Wohnbereichen.",
  Fassaden:
    "Unsere Fassadenreferenzen zeigen langlebige und witterungsbeständige Lösungen mit Klinker, Riemchen, Keramik und Feinsteinzeug – technisch sicher und architektonisch abgestimmt.",
} as const;

export const gruenewaldReferenceDescriptions = {
  Alle:
    "Ausgewählte Arbeiten der Grünewald GmbH zeigen individuelle Lösungen für Außenbereiche, Bäder sowie Haus- und Wohnsanierungen – von der ersten Idee bis zur hochwertigen Umsetzung.",
  Außengestaltung:
    "Unsere Referenzen zur Außengestaltung zeigen langlebige Terrassen, Wege, Einfahrten, Mauern und Poolbereiche, die funktionale Anforderungen mit einer stimmigen Gestaltung verbinden.",
  Badsanierung:
    "Diese Badsanierungen zeigen, wie durch klare Planung, sichere Abdichtung und präzise ausgeführte Details moderne und dauerhaft komfortable Räume entstehen.",
  "Haus- & Wohnsanierung":
    "Unsere Sanierungsprojekte verbinden abgestimmte Gewerke, hochwertige Oberflächen und eine verlässliche Ausführung zu Wohnräumen, die langfristig überzeugen.",
} as const;

export const groupReferenceDescription =
  "Ausgewählte Projekte aus den Unternehmen der Grünewald Gruppe zeigen gebündelte Kompetenz in Objektbau, Sanierung und nachhaltigen Gebäudelösungen.";

export const clayReferenceDescription =
  "Ausgewählte Projekte zeigen, wie Clay Construction natürliche Lehmbaustoffe mit moderner Heiz- und Kühltechnik zu leistungsfähigen Klimadecken verbindet.";

const descriptionsByCompanyAndSlug: Record<string, string> = {
  "tilution/schwimmbaeder-thermen": tilutionReferenceDescriptions["Schwimmbäder & Thermen"],
  "tilution/hotels-wellness": tilutionReferenceDescriptions["Hotels & Wellness"],
  "tilution/oeffentliche-einrichtungen": tilutionReferenceDescriptions["Öffentliche Einrichtungen"],
  "tilution/kliniken-pflegebereiche": tilutionReferenceDescriptions["Kliniken & Pflegebereiche"],
  "tilution/grosskuechen": tilutionReferenceDescriptions.Großküchen,
  "tilution/retail-gewerbeflaechen": tilutionReferenceDescriptions["Retail & Gewerbeflächen"],
  "tilution/wohnungsbau": tilutionReferenceDescriptions.Wohnungsbau,
  "tilution/fassaden": tilutionReferenceDescriptions.Fassaden,
  "gruenewald/aussengestaltung": gruenewaldReferenceDescriptions.Außengestaltung,
  "gruenewald/badsanierung": gruenewaldReferenceDescriptions.Badsanierung,
  "gruenewald/haus-wohnsanierung": gruenewaldReferenceDescriptions["Haus- & Wohnsanierung"],
};

export function getReferenceCategoryDescription(
  company: string,
  categorySlug: string,
) {
  return descriptionsByCompanyAndSlug[`${company}/${categorySlug}`];
}
