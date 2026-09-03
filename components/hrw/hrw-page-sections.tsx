import Image from "next/image";
import { Bath, Check, CookingPot, FileCheck2, Grid2X2, Mail, Medal, Phone, UsersRound, Waves } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";
import { withBasePath } from "@/lib/site-path";

const services = [
  { title: "Fliesenverlegung", text: "Hochwertige Fliesenarbeiten für Eingangsbereiche, Treppenhäuser, Flure und mehr – langlebig, individuell und belastbar.", icon: Grid2X2 },
  { title: "Gastronomie- und Großküchenbereiche", text: "Spezialisierte Verlegung robuster, hygienischer Fliesenbeläge, die höchsten Ansprüchen in Küchen- und Gastronomiebereichen genügen.", icon: CookingPot },
  { title: "Sanitär- und WC-Anlagen", text: "Planung, Gestaltung und Umsetzung moderner WC- und Sanitäranlagen gemäß aktueller Normen und Standards.", icon: Bath },
  { title: "Wellness- und Schwimmbadbereiche", text: "Fachgerechte Fliesen- und Abdichtungsarbeiten für Sauna-, Spa- und Schwimmbadlandschaften.", icon: Waves },
];

const reasons = [
  { title: "Erfahrung und Verlässlichkeit", text: "Fundiertes Know-how aus zahlreichen erfolgreich abgeschlossenen Großprojekten.", icon: Medal },
  { title: "Flexible Kapazitäten", text: "Unser großer Mitarbeiterpool ermöglicht bedarfsgerechte Teams – auch für umfangreiche Bauvorhaben.", icon: UsersRound },
  { title: "Werkvertrag-Expertise", text: "Klare Strukturen und transparente Abläufe sorgen für eine reibungslose Zusammenarbeit.", icon: FileCheck2 },
];

export function HrwHeroSection() {
  return (
    <SectionShell id="hero">
      <section className="relative isolate min-h-[34rem] w-[calc(100vw-2.5rem)] max-w-full overflow-hidden rounded-[2.75rem] border border-white/10 px-6 py-12 text-white shadow-premium sm:w-full sm:px-9 lg:min-h-[39rem] lg:px-14 lg:py-20">
        <Image src={getOptimizedSiteImageSrc("/images/hrw/hrw-hero.png")} alt="Handwerker bohrt in eine massive Wand" fill priority sizes="(min-width: 1320px) 1240px, calc(100vw - 40px)" className="-z-20 object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(25,25,25,0.84)_0%,rgba(25,25,25,0.6)_52%,rgba(25,25,25,0.2)_100%)]" />
        <div className="relative z-10 max-w-4xl">
          <p className="section-eyebrow">HRW GmbH</p>
          <h1 className="mt-6 max-w-[18ch] text-4xl font-semibold leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-6xl">Die Personalkraft hinter der Grünewald Gruppe.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/90 sm:text-lg">Die HRW GmbH ist der exklusive Personaldienstleister für die Unternehmen der Grünewald Gruppe. Wir bündeln qualifizierte Fachkräfte, stellen bedarfsgerechte Teams zusammen und schaffen die personellen Kapazitäten für eine zuverlässige Umsetzung anspruchsvoller Bauprojekte.</p>
        </div>
        <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-3">
          {["Exklusiv für die Gruppe", "Flexible Kapazitäten", "Erfahrene Fachkräfte"].map((point) => (
            <div key={point} className="liquid-card-dark flex min-h-20 items-center justify-center gap-3 rounded-[1.35rem] px-5 py-4 text-center text-white">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/20"><Check className="h-4 w-4 stroke-[2.4]" /></span>
              <span className="text-base font-semibold sm:text-lg">{point}</span>
            </div>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}

export function HrwServicesSection() {
  return (
    <SectionShell id="leistungen">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <header className="max-w-4xl"><p className="section-eyebrow">Unsere Leistungen</p><h2 className="section-heading">Professionelles Handwerk auf höchstem Niveau.</h2><p className="section-subline">Wir übernehmen anspruchsvolle Arbeiten im Bau- und Ausbaugewerbe – spezialisiert auf die Umsetzung im Rahmen von Werkverträgen.</p></header>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-[1.75rem] border border-[#f68712]/20 bg-white p-6 shadow-[0_20px_50px_rgba(79,76,77,0.08)]">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff4e8] text-[#f68712]"><Icon className="h-7 w-7 stroke-[1.8]" /></span>
              <h3 className="mt-6 text-xl font-semibold leading-tight text-[#272425]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#6e696b]">{text}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm font-semibold text-[#4f4c4d]">Dabei garantieren wir höchste Präzision und Termintreue – dank erfahrener Projektleiter und engagierter Teams.</p>
      </section>
    </SectionShell>
  );
}

export function HrwWhySection() {
  return (
    <SectionShell id="warum-hrw"><section className="section-card px-6 py-10 sm:px-9 lg:p-12">
      <p className="section-eyebrow">Warum HRW GmbH?</p><h2 className="section-heading">Gemeinsam schaffen wir Werte.</h2>
      <figure className="relative mt-10 overflow-hidden rounded-[1.9rem] border border-[#f68712]/20 bg-[#272425] shadow-[0_24px_60px_rgba(79,76,77,0.16)]">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
          <Image
            src={getOptimizedSiteImageSrc("/images/hrw/hrw-mitarbeiter.png")}
            alt="Das HRW-Team auf einer Baustelle"
            fill
            sizes="(min-width: 1320px) 1144px, calc(100vw - 88px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,19,0.02)_35%,rgba(20,18,19,0.86)_100%)]" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffb45f]">Unser Mitarbeiterpool</p>
            <h3 className="mt-3 max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl lg:text-4xl">
              Ein starkes Team für flexible Projektkapazitäten.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82 sm:text-base sm:leading-7">
              Mit erfahrenen Fachkräften stellen wir bedarfsgerechte Teams zusammen und reagieren flexibel auf die Anforderungen Ihres Projekts.
            </p>
          </figcaption>
        </div>
      </figure>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{reasons.map(({ title, text, icon: Icon }) => (
        <article key={title} className="flex gap-4 rounded-[1.5rem] border border-[#f68712]/15 bg-[#fff4e8] p-5 sm:p-6 md:flex-col">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#f68712] shadow-[0_10px_24px_rgba(246,135,18,0.12)]"><Icon className="h-6 w-6 stroke-[1.9]" /></span>
          <div><h3 className="text-lg font-semibold leading-tight text-[#272425]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6e696b]">{text}</p></div>
        </article>
      ))}</div>
    </section></SectionShell>
  );
}

export function HrwContactSection() {
  return (
    <SectionShell id="kontakt"><section className="section-card px-6 py-10 sm:px-9 lg:p-12">
      <p className="section-eyebrow">Kontakt</p><h2 className="section-heading">Direkt und unkompliziert erreichbar.</h2>
      <div className="mt-10 grid items-center gap-8 md:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-[#fff4e8]"><Image src={getOptimizedSiteImageSrc("/images/hrw/norbert-bartholomaeus.png")} alt="Norbert Bartholomäus" fill sizes="(min-width: 768px) 352px, calc(100vw - 88px)" className="object-cover" /></div>
        <div className="min-w-0"><p className="text-3xl font-semibold text-[#272425]">Norbert Bartholomäus</p><p className="mt-2 text-base font-semibold text-[#f68712]">Ansprechpartner der HRW GmbH</p><p className="mt-6 max-w-xl leading-7 text-[#6e696b]">Kontaktieren Sie uns gern, wenn Sie in unsere Registerkartei aufgenommen werden möchten oder ein Projekt besprechen wollen.</p>
          <div className="mt-7 grid max-w-[34rem] gap-4">
            <a href="tel:+4915172226537" className="liquid-card group flex h-24 min-w-0 items-center gap-4 px-5 py-4 text-white transition-transform duration-300 hover:-translate-y-1">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md"><Phone className="h-5 w-5 stroke-[2]" /></span>
              <span className="min-w-0"><span className="block text-sm font-semibold uppercase tracking-[0.18em] text-forest-100/72">Telefon</span><span className="mt-1 block text-lg font-semibold leading-tight text-white">0151 / 72226537</span></span>
            </a>
            <a href="mailto:bartholomaeus@hrw-gmbh.com" className="liquid-card group flex h-24 min-w-0 items-center gap-4 px-5 py-4 text-white transition-transform duration-300 hover:-translate-y-1">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-white/18 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md"><Mail className="h-5 w-5 stroke-[2]" /></span>
              <span className="min-w-0"><span className="block text-sm font-semibold uppercase tracking-[0.18em] text-forest-100/72">E-Mail</span><span className="mt-1 block break-all text-[0.95rem] font-semibold leading-tight text-white sm:text-base">bartholomaeus@hrw-gmbh.com</span></span>
            </a>
          </div>
        </div>
      </div>
    </section></SectionShell>
  );
}
