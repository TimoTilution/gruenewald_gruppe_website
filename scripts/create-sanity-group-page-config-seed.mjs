import fs from "node:fs";
import path from "node:path";

const outputFile = path.join(
  process.cwd(),
  ".sanity-seed",
  "group-page-config-document.json",
);

const doc = {
  _id: "groupPageConfig.main",
  _type: "groupPageConfig",
  title: "Gruppenseite Konfiguration",
  heroCards: [
    {
      _key: "tilution",
      label: "Geschäftskunde",
      href: "/tilution",
      logoPath: "/logos/companies/tilution.svg",
    },
    {
      _key: "gruenewald",
      label: "Privatkunde",
      href: "/gruenewaldgmbh",
      logoPath: "/logos/companies/gruenewald.svg",
    },
    {
      _key: "clay",
      label: "Klimadecken",
      href: "/clay-construction",
      logoPath: "/logos/companies/clay-construction.svg",
    },
  ],
  aboutEyebrow: "Grünewald Gruppe",
  aboutTitle: "Eine Gruppe. Klare Spezialisten. Bundesweit im Einsatz.",
  aboutText:
    "Die Grünewald Gruppe bündelt spezialisierte Unternehmen für private, gewerbliche und öffentliche Bauprojekte - mit klaren Strukturen, kurzen Wegen und hoher Ausführungsqualität.",
  uspEyebrow: "Mehr als nur Handwerk",
  uspCards: [
    {
      _key: "craft",
      icon: "hardHat",
      title: "Leidenschaftliche Handwerker",
      description:
        "Unsere Projekte leben von Menschen, die ihr Handwerk verstehen. Mit erfahrenen Fachkräften, technischem Know-how und einem hohen Qualitätsanspruch finden wir auch für anspruchsvolle Aufgaben die passende Lösung. Dabei verbinden wir langjährige Erfahrung mit modernen Verfahren und einem Blick fürs Detail - von der Planung bis zur fachgerechten Umsetzung.",
    },
    {
      _key: "tools",
      icon: "wrench",
      title: "Moderne Werkzeuge & Technik",
      description:
        "Gute Arbeit braucht die richtige Ausstattung. Deshalb setzen wir auf professionelle Werkzeuge, moderne Maschinen und zeitgemäße Verarbeitungstechniken. Das ermöglicht uns, präzise, effizient und zuverlässig zu arbeiten - auch bei komplexen Anforderungen, besonderen Formaten oder technisch anspruchsvollen Projekten.",
    },
    {
      _key: "materials",
      icon: "swatchBook",
      title: "Auswahl der besten Materialien",
      description:
        "Wir denken nicht vom Produkt, sondern vom Projekt aus. Dank unseres breiten Hersteller- und Lieferantennetzwerks können wir nahezu jedes benötigte Produkt beschaffen und unterschiedliche Systeme miteinander vergleichen. So empfehlen wir nicht das, was gerade verfügbar ist, sondern das, was technisch und wirtschaftlich am besten zum jeweiligen Projekt passt.",
    },
  ],
  highlights: [
    {
      _key: "family",
      title: "Familiengeführt",
      description: "Gewachsene Unternehmensgruppe im Bau- und Ausbaugewerbe.",
    },
    {
      _key: "nationwide",
      title: "Bundesweit aktiv",
      description: "Zentrale in Scheden, Projekte in ganz Deutschland.",
    },
    {
      _key: "teams",
      title: "Spezialisierte Teams",
      description:
        "Klare Zuständigkeiten für private, gewerbliche und öffentliche Bauprojekte.",
    },
  ],
  referencesEyebrow: "Referenzen",
  referencesTitle: "Projekte aus unterschiedlichen Bereichen",
  referencesText:
    "Gebündelte Kompetenz der Grünewald Gruppe - von der Planung bis zur Umsetzung",
  showReferenceToggleOnDesktop: true,
  isVisible: true,
};

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify([doc], null, 2));
console.log(`Wrote Sanity group page config document to ${outputFile}`);
