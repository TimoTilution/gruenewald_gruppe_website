type ImprintEntry = {
  company: string;
  address: string[];
  representedBy: string[];
  contact: string[];
  registerCourt: string;
  registerNumber: string;
  vatId: string;
};

const imprintEntries: ImprintEntry[] = [
  {
    company: "Tilution GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@tilution.de"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 207024",
    vatId: "DE360489880",
  },
  {
    company: "Grünewald GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@gruenewaldgmbh.de"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 206939",
    vatId: "DE358950208",
  },
  {
    company: "Clay Construction GmbH",
    address: ["Quantzstraße 67", "37127 Scheden"],
    representedBy: ["Jan Grünewald"],
    contact: ["Telefon: +49 5546 608", "E-Mail: info@clay-construction.com"],
    registerCourt: "Amtsgericht Göttingen",
    registerNumber: "HRB 207084",
    vatId: "DE362095278",
  },
  {
    company: "HRW GmbH",
    address: ["Karl-Kochstraße 5", "49080 Osnabrück"],
    representedBy: ["Nobert Bartholomäus"],
    contact: ["Telefon: 0151/72226537", "E-Mail: bartholomaeus@hrw-gmbh.com"],
    registerCourt: "Amtsgericht Osnabrück",
    registerNumber: "HRB 219343",
    vatId: "DE359281612",
  },
  {
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

function ImprintCard({
  company,
  address,
  representedBy,
  contact,
  registerCourt,
  registerNumber,
  vatId,
}: ImprintEntry) {
  return (
    <article className="liquid-card-dark h-full rounded-[1.75rem] p-6 sm:p-7">
      <h3 className="text-xl font-semibold text-white">{company}</h3>

      <div className="mt-5 space-y-5 text-sm leading-7 text-forest-100/88">
        <div>
          {address.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Vertreten durch:</p>
          {representedBy.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Kontakt:</p>
          {contact.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <p className="font-semibold text-white">Registereintrag:</p>
          <p>Eintragung im Handelsregister.</p>
          <p>Registergericht: {registerCourt}</p>
          <p>Registernummer: {registerNumber}</p>
        </div>

        <div>
          <p className="font-semibold text-white">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
          </p>
          <p>{vatId}</p>
        </div>
      </div>
    </article>
  );
}

export function Footer() {
  return (
    <footer className="w-full">
      <div className="w-full py-12 sm:py-14">
        <header className="px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Impressum
          </p>
        </header>

        <div className="mt-6 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-5">
          {imprintEntries.map((entry) => (
            <ImprintCard key={entry.company} {...entry} />
          ))}
        </div>
      </div>
    </footer>
  );
}
