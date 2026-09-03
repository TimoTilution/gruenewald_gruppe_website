export type Imprint = {
  slug: string;
  company: string;
  address: string[];
  representedBy: string[];
  contact: string[];
  registerCourt: string;
  registerNumber: string;
  vatId: string;
};

export const imprints: Imprint[] = [
  {
    slug: "/tilution",
    company: "Tilution GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@tilution.de"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 207024",
    vatId: "DE360489880",
  },
  {
    slug: "/gruenewaldgmbh",
    company: "Grünewald GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@gruenewaldgmbh.de"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 206939",
    vatId: "DE358950208",
  },
  {
    slug: "/clay-construction",
    company: "Clay Construction GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@clay-construction.com"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 207084",
    vatId: "DE362095278",
  },
  {
    slug: "/hrw",
    company: "HRW GmbH",
    address: ["Karl-Kochstraße 5", "49080 Osnabrück"],
    representedBy: ["Norbert Bartholomäus"],
    contact: ["Telefon: 0151/72226537", "E-Mail: bartholomaeus@hrw-gmbh.com"],
    registerCourt: "Amtsgericht Osnabrück",
    registerNumber: "HRB 219343",
    vatId: "DE359281612",
  },
  {
    slug: "/verwaltung",
    company: "Grünewald Verwaltung GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: [
      "Telefon: +49 5546 608",
      "E-Mail: info@verwaltung-gruenewald.de",
    ],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 207021",
    vatId: "DE360489871",
  },
];
