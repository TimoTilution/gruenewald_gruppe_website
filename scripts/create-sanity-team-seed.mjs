import fs from "node:fs";
import path from "node:path";

const outputFile = path.join(process.cwd(), ".sanity-seed", "team-documents.json");
const ndjsonOutputFile = path.join(process.cwd(), ".sanity-seed", "team-documents.ndjson");

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getMemberSlug(member) {
  if (!member.imageSrc) return slugify(member.name);

  const fileName = member.imageSrc.split("/").pop() || "";
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  return withoutExtension.replace(/^team-/, "");
}

function ref(id) {
  return {
    _type: "reference",
    _ref: id,
  };
}

const companies = [
  { slug: "tilution", title: "Tilution GmbH", sortOrder: 1 },
  { slug: "gruenewald", title: "Gruenewald GmbH", sortOrder: 2 },
  { slug: "clay-construction", title: "Clay Construction", sortOrder: 3 },
  { slug: "verwaltung", title: "Gruenewald Verwaltung", sortOrder: 4 },
  { slug: "hrw", title: "HRW GmbH", sortOrder: 5 },
];

const departments = [
  { company: "tilution", slug: "geschaeftsfuehrung", title: "Geschäftsführung", sortOrder: 1 },
  { company: "tilution", slug: "vertrieb", title: "Vertrieb", sortOrder: 2 },
  { company: "tilution", slug: "produktion", title: "Produktion", sortOrder: 3 },
  { company: "tilution", slug: "marketing", title: "Marketing", sortOrder: 4 },
  { company: "tilution", slug: "zentrale-dienste", title: "Zentrale Dienste", sortOrder: 5 },
  { company: "verwaltung", slug: "kaufmaennische-leitung", title: "Kaufmännische Leitung", sortOrder: 1 },
  { company: "verwaltung", slug: "kreditorenbuchhaltung", title: "Kreditorenbuchhaltung", sortOrder: 2 },
  { company: "verwaltung", slug: "debitorenbuchhaltung", title: "Debitorenbuchhaltung", sortOrder: 3 },
  { company: "verwaltung", slug: "it", title: "IT", sortOrder: 4 },
  { company: "verwaltung", slug: "personalwesen", title: "Personalwesen", sortOrder: 5 },
  { company: "hrw", slug: "fachkraefteverwaltung", title: "Fachkräfteverwaltung", sortOrder: 1 },
  { company: "clay-construction", slug: "geschaeftsfuehrung", title: "Geschäftsführung", sortOrder: 1 },
];

const members = [
  { company: "tilution", department: "geschaeftsfuehrung", name: "Jan Grünewald", degree: "Dipl. Bau-Ing.", role: "Geschäftsführung", imageSrc: "/images/team/jan-gruenewald.png" },
  { company: "tilution", department: "geschaeftsfuehrung", name: "Melanie Montua", role: "Assistenz der Geschäftsführung", imageSrc: "/images/team/melanie-montua.png", email: "montua@tilution.de", phone: "0170 9160495" },
  { company: "tilution", department: "vertrieb", name: "Jürgen Gatzemeier", role: "Vertriebsleiter", imageSrc: "/images/team/juergen-gatzemeier.png", email: "gatzemeier@tilution.de", phone: "0151 54909563" },
  { company: "tilution", department: "vertrieb", name: "Rainer Wienken", degree: "Dipl.-Ing.", role: "Vertrieb", imageSrc: "/images/team/rainer-wienken.png" },
  { company: "tilution", department: "vertrieb", name: "Peter Rüngeling", role: "Kalkulator", imageSrc: "/images/team/peter-ruengeling.png" },
  { company: "tilution", department: "vertrieb", name: "Khadem Rahimi", role: "Kalkulator", imageSrc: "/images/team/khadem-rahimi.png" },
  { company: "tilution", department: "produktion", name: "Qendrim Jashari", role: "Produktionsleiter / Projektleiter", imageSrc: "/images/team/qendrim-jashari.png" },
  { company: "tilution", department: "produktion", name: "Christoph Stolze", role: "Projektleiter / Technischer Leiter", imageSrc: "/images/team/christoph-stolze.png" },
  { company: "tilution", department: "produktion", name: "Henriikka Schierle", role: "Projektleiterin", imageSrc: "/images/team/henriikka-schierle.png" },
  { company: "tilution", department: "produktion", name: "Norman Sommerfeld", role: "Projektleiter", imageSrc: "/images/team/norman-sommerfeld.png" },
  { company: "tilution", department: "produktion", name: "Rüdiger Müller", role: "Bauleiter", imageSrc: "/images/team/ruediger-mueller.png" },
  { company: "tilution", department: "produktion", name: "Jens Cullmann", role: "Bauleiter", imageSrc: "/images/team/jens-cullmann.png" },
  { company: "tilution", department: "produktion", name: "Michael Giese", role: "Bauleiter", imageSrc: "/images/team/michael-giese.png" },
  { company: "tilution", department: "produktion", name: "Sven Kapke", role: "Bauleiter", imageSrc: "/images/team/sven-kapke.png" },
  { company: "tilution", department: "produktion", name: "Pia Schnittker", degree: "B.A. Architektur", role: "Bauleiterin", imageSrc: "/images/team/pia-schnittker.png" },
  { company: "tilution", department: "produktion", name: "Adam Kerkeh", role: "Projektleiter Service", imageSrc: "/images/team/adam-kerkeh.png" },
  { company: "tilution", department: "produktion", name: "Helen Faß", role: "Projektleiterin", imageSrc: "/images/team/helen-fass.png" },
  { company: "tilution", department: "produktion", name: "Annie Dinh", role: "Projektleiterin", imageSrc: "/images/team/annie-dinh.png" },
  { company: "tilution", department: "produktion", name: "Alicia Berndt", role: "Assistenz der Projektleitung", imageSrc: "/images/team/alicia-berndt.png" },
  { company: "tilution", department: "produktion", name: "Denise Maier", role: "Assistenz der Projektleitung", imageSrc: "/images/team/denise-maier.png" },
  { company: "tilution", department: "produktion", name: "Leon Schmidt", role: "Assistenz der Projektleitung", imageSrc: "/images/team/leon-schmidt.png" },
  { company: "tilution", department: "produktion", name: "Nadine Bihler", role: "Assistenz der Projektleitung", imageSrc: "/images/team/nadine-bihler.png" },
  { company: "tilution", department: "produktion", name: "Corinna Flacht", role: "Assistenz der Projektleitung", imageSrc: "/images/team/corinna-flacht.png" },
  { company: "tilution", department: "marketing", name: "Alissia Wilke", role: "Managerin für Marketing", imageSrc: "/images/team/alissia-wilke.png" },
  { company: "tilution", department: "marketing", name: "Timo Scharf", role: "Manager für Marketing & Unternehmensprozesse", imageSrc: "/images/team/timo-scharf.png" },
  { company: "tilution", department: "zentrale-dienste", name: "Eric Dreyer", role: "Assistenz der Leitung Fuhrpark, Maschinen, F&E", imageSrc: "/images/team/eric-dreyer.png" },
  { company: "verwaltung", department: "kaufmaennische-leitung", name: "Alexandra Fieseler", role: "Kaufmännische Leitung", imageSrc: "/images/verwaltung/team-alexandra-fieseler.png" },
  { company: "verwaltung", department: "kaufmaennische-leitung", name: "Mirco Müller", role: "Kaufmännische Leitung", imageSrc: "/images/verwaltung/team-mirco-mueller.png" },
  { company: "verwaltung", department: "kreditorenbuchhaltung", name: "Birgit Peters", role: "Kreditorenbereich & Immobilienverwaltung", imageSrc: "/images/verwaltung/team-birgit-peters.png" },
  { company: "verwaltung", department: "debitorenbuchhaltung", name: "Simone Seibert", role: "Debitorenbereich, Bürgschaftswesen & Rechtsfälle", imageSrc: "/images/verwaltung/team-simone-seibert.png" },
  { company: "verwaltung", department: "debitorenbuchhaltung", name: "Anke Rode", role: "Debitorenbuchhaltung", imageSrc: "/images/verwaltung/team-anke-rode.png" },
  { company: "verwaltung", department: "it", name: "Shqiprim Salihu", role: "Sachbearbeiter IT", imageSrc: "/images/verwaltung/team-shqiprim-salihu.png" },
  { company: "verwaltung", department: "personalwesen", name: "Brigitte Marx", role: "Lohnbuchhaltung", imageSrc: "/images/verwaltung/team-brigitte-marx.png" },
  { company: "verwaltung", department: "personalwesen", name: "Theresa Janke", role: "Auszubildende", imageSrc: "/images/verwaltung/team-theresa-janke.png" },
  { company: "hrw", department: "fachkraefteverwaltung", name: "Norbert Bartholomäus", role: "Geschäftsführer der HRW GmbH", imageSrc: "/images/hrw/norbert-bartholomaeus.png" },
  { company: "clay-construction", department: "geschaeftsfuehrung", name: "Jan Grünewald", degree: "Dipl. Bau-Ing.", role: "Geschäftsführung", imageSrc: "/images/team/jan-gruenewald.png" },
];

const docs = [
  ...companies.map((company) => ({
    _id: `company.${company.slug}`,
    _type: "company",
    title: company.title,
    slug: { _type: "slug", current: company.slug },
    isVisible: true,
    sortOrder: company.sortOrder,
  })),
  ...departments.map((department) => ({
    _id: `teamDepartment.${department.company}.${department.slug}`,
    _type: "teamDepartment",
    title: department.title,
    slug: { _type: "slug", current: department.slug },
    company: ref(`company.${department.company}`),
    isVisible: true,
    sortOrder: department.sortOrder,
  })),
  ...members.map((member, index) => {
    const slug = getMemberSlug(member);
    return {
      _id: `teamMember.${member.company}.${slug}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      degree: member.degree,
      email: member.email,
      phone: member.phone,
      company: ref(`company.${member.company}`),
      department: ref(`teamDepartment.${member.company}.${member.department}`),
      imageAlt: `${member.name}, ${member.role}`,
      legacyImagePath: member.imageSrc,
      isVisible: true,
      sortOrder: index + 1,
    };
  }),
];

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(docs, null, 2));
fs.writeFileSync(ndjsonOutputFile, docs.map((doc) => JSON.stringify(doc)).join("\n"));
console.log(`Wrote ${docs.length} Sanity team documents to ${outputFile}`);
console.log(`Wrote ${docs.length} Sanity team documents to ${ndjsonOutputFile}`);
