"use client";

import { usePathname } from "next/navigation";
import { normalizeSitePathname } from "@/lib/site-path";

type Imprint = {
  slug: string;
  company: string;
  address: string[];
  representedBy: string[];
  contact: string[];
  registerCourt: string;
  registerNumber: string;
  vatId: string;
};

const imprints: Imprint[] = [
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
    slug: "/gruenewald",
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

function FooterCard({
  imprint,
  isSingleCompany = false,
}: {
  imprint: Imprint;
  isSingleCompany?: boolean;
}) {
  return (
    <article className="h-full rounded-[1.75rem] bg-white/8 p-6 shadow-[0_24px_60px_rgba(7,18,48,0.16)] backdrop-blur-md sm:p-7">
      <div
        className={
          isSingleCompany
            ? "grid gap-6 text-sm leading-7 text-white/88 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.9fr_1.35fr_1.15fr]"
            : "flex h-full flex-col gap-5 text-sm leading-7 text-white/88"
        }
      >
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-white">{imprint.company}</h3>
          <p className="mt-1 text-xs font-medium tracking-[0.03em] text-white/68 sm:text-[0.8125rem]">
            Teil der Grünewald-Gruppe
          </p>
          <div className="mt-4">
            {imprint.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-white">Vertreten durch:</p>
          {imprint.representedBy.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-white">Kontakt:</p>
          {imprint.contact.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-white">Registereintrag:</p>
          <p>Eintragung im Handelsregister.</p>
          <p>Registergericht: {imprint.registerCourt}</p>
          <p>Registernummer: {imprint.registerNumber}</p>
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-white">
            Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
          </p>
          <p>{imprint.vatId}</p>
        </div>
      </div>
    </article>
  );
}

export function Footer() {
  const pathname = normalizeSitePathname(usePathname());
  const activeImprint = imprints.find((entry) => entry.slug === pathname);
  const visibleImprints = activeImprint ? [activeImprint] : imprints;
  const isOverview = activeImprint === undefined;

  return (
    <footer
      className="w-full border-t border-white/10"
      style={{ backgroundColor: "#182956" }}
    >
      <div className="w-full px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <header>
          <p className="text-xs uppercase tracking-[0.28em] text-white/72">
            Impressum
          </p>
        </header>

        <div
          className={
            isOverview
              ? "mt-6 grid w-full gap-6 lg:grid-cols-2 xl:grid-cols-5"
              : "mt-6 grid w-full gap-6"
          }
        >
          {visibleImprints.map((imprint) => (
            <FooterCard
              key={imprint.slug}
              imprint={imprint}
              isSingleCompany={!isOverview}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
