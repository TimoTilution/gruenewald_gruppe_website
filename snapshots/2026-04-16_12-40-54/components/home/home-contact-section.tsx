import Link from "next/link";
import {
  AirVent,
  ArrowRight,
  Building2,
  House,
  type LucideIcon,
} from "lucide-react";
import { CompanyMap } from "@/components/company-map";
import { SectionShell } from "@/components/section-shell";

type ContactCard = {
  href: string;
  title: string;
  text: string;
  buttonLabel: string;
  icon: LucideIcon;
  accentColor: string;
};

const contactCards: ContactCard[] = [
  {
    href: "/tilution",
    title: "Großprojekte & Gewerbebau",
    text: "Für gewerbliche und öffentliche Bauvorhaben – von der Planung bis zur Umsetzung.",
    buttonLabel: "Zu Tilution",
    icon: Building2,
    accentColor: "#e96b1d",
  },
  {
    href: "/gruenewald",
    title: "Privatkunden & Wohnen",
    text: "Individuelle Lösungen für Bad, Wohnen und hochwertige Innenräume.",
    buttonLabel: "Zur Grünewald GmbH",
    icon: House,
    accentColor: "#3cabe2",
  },
  {
    href: "/clay-construction",
    title: "Klimadecken & Lehmbauysteme",
    text: "Innovative Heiz- und Kühlsysteme für nachhaltige Gebäude.",
    buttonLabel: "Zu Clay Construction",
    icon: AirVent,
    accentColor: "#cd203b",
  },
];

function PrimaryButton({ label }: { label: string }) {
  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-2.5 self-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
        "border border-forest-900/15 text-white",
        "bg-[radial-gradient(circle_at_18%_35%,rgba(86,112,188,0.38)_0%,rgba(86,112,188,0)_32%),linear-gradient(90deg,rgba(24,41,86,0.98)_0%,rgba(24,41,86,0.88)_44%,rgba(24,41,86,0.68)_100%)]",
        "shadow-[0_12px_28px_rgba(24,41,86,0.18)]",
        "group-hover:border-forest-900/25 group-hover:bg-[radial-gradient(circle_at_18%_35%,rgba(108,138,221,0.46)_0%,rgba(108,138,221,0)_34%),linear-gradient(90deg,rgba(24,41,86,1)_0%,rgba(24,41,86,0.92)_46%,rgba(24,41,86,0.76)_100%)] group-hover:shadow-[0_16px_34px_rgba(24,41,86,0.26)]",
      ].join(" ")}
    >
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 stroke-[2.25] transition-transform duration-300 group-hover:translate-x-0.5" />
    </span>
  );
}

function ContactCardLink({
  href,
  title,
  text,
  buttonLabel,
  icon: Icon,
  accentColor,
}: ContactCard) {
  return (
    <Link
      href={href}
      className={[
        "group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white p-7 text-ink",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_58px_rgba(7,18,48,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-forest-800",
        "shadow-[0_18px_40px_rgba(7,18,48,0.1)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-20 w-20 [clip-path:polygon(0_0,100%_0,0_100%)]"
        style={{
          backgroundImage: `radial-gradient(circle at 18% 35%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 32%), linear-gradient(90deg, ${accentColor} 0%, ${accentColor}DD 45%, ${accentColor}99 100%)`,
        }}
      />

      <div className="flex flex-col items-center text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-forest-800 transition-colors duration-300 group-hover:border-slate-300 group-hover:bg-slate-100">
          <Icon className="h-[1.875rem] w-[1.875rem] stroke-[1.85]" />
        </span>
      </div>

      <div className="mt-6 flex-1 text-center">
        <h3 className="whitespace-nowrap text-[1.06rem] font-semibold leading-[1.2] tracking-[-0.015em] text-ink sm:text-[1.12rem] xl:text-[1.16rem]">
          {title}
        </h3>
        <p className="mt-4 text-[0.98rem] leading-7 text-forest-800/78">
          {text}
        </p>
      </div>

      <PrimaryButton label={buttonLabel} />
    </Link>
  );
}

export function HomeContactSection() {
  return (
    <SectionShell id="kontakt">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Kontakt
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Der richtige Ansprechpartner für Ihr Projekt
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-forest-100/80 sm:text-lg">
            Wählen Sie den Bereich, der zu Ihrem Vorhaben passt – wir bringen
            Sie direkt zum passenden Ansprechpartner.
          </p>
        </header>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => (
            <li key={card.href}>
              <ContactCardLink {...card} />
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-[1.9rem] border border-white/10 bg-forest-900/18 p-6 sm:p-8">
          <p className="max-w-3xl text-base leading-8 text-forest-100/82 sm:text-lg">
            Nicht sicher, wo Sie richtig sind? Schreiben Sie uns einfach – wir
            leiten Ihre Anfrage intern weiter.
          </p>

          <form className="mt-6 grid gap-5" action="#">
            <div className="grid gap-5 lg:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white">Name</span>
                <input
                  type="text"
                  name="name"
                  className="rounded-[1.15rem] border border-white/12 bg-white px-4 py-3 text-forest-900 outline-none transition focus:border-forest-900/30 focus:ring-2 focus:ring-white/40"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-white">
                  E-Mail-Adresse
                </span>
                <input
                  type="email"
                  name="email"
                  className="rounded-[1.15rem] border border-white/12 bg-white px-4 py-3 text-forest-900 outline-none transition focus:border-forest-900/30 focus:ring-2 focus:ring-white/40"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-white">Nachricht</span>
              <textarea
                name="message"
                rows={6}
                className="rounded-[1.15rem] border border-white/12 bg-white px-4 py-3 text-forest-900 outline-none transition focus:border-forest-900/30 focus:ring-2 focus:ring-white/40"
              />
            </label>

            <button type="submit" className="group w-fit">
              <PrimaryButton label="Absenden" />
            </button>
          </form>
        </div>

        <div className="mt-10">
          <CompanyMap
            center={[51.1657, 10.4515]}
            markerPosition={[51.4568, 9.6912]}
            zoom={6}
            titleLines={["Grünewald Gruppe -", "Die Mitte Deutschlands"]}
            addressLines={["Quantzstraße 67,", "37127 Scheden", "05546 - 608"]}
            note="Zentrale der Grünewald Gruppe in Scheden - Deutschlandweit für Sie tätig"
          />
        </div>
      </section>
    </SectionShell>
  );
}
