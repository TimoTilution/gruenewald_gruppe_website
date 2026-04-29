import Link from "next/link";
import { SectionShell } from "@/components/section-shell";

const contactCards = [
  {
    href: "/tilution",
    title: "Großprojekte & Gewerbebau",
    text: "Fliesenarbeiten für gewerbliche und öffentliche Bauvorhaben – von der Planung bis zur Umsetzung.",
    buttonLabel: "Zu Tilution",
  },
  {
    href: "/gruenewald",
    title: "Privatkunden & Wohnen",
    text: "Individuelle Lösungen für Bad, Wohnen und hochwertige Innenausbauten.",
    buttonLabel: "Zur Grünewald GmbH",
  },
  {
    href: "/clay-construction",
    title: "Klimadecken & Lehmbausysteme",
    text: "Innovative Heiz- und Kühlsysteme für nachhaltige und moderne Gebäude.",
    buttonLabel: "Zu Clay Construction",
  },
];

export function HomeContactSection() {
  return (
    <SectionShell id="kontakt">
      <section className="section-card px-6 py-8 sm:px-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
            Kontakt
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Der richtige Ansprechpartner für Ihr Projekt
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-forest-100/80 sm:text-lg">
            Wählen Sie den Bereich, der zu Ihrem Vorhaben passt – wir bringen
            Sie direkt zum passenden Ansprechpartner
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {contactCards.map((card) => (
            <article
              key={card.href}
              className="flex h-full flex-col rounded-[1.75rem] bg-white p-6 text-ink shadow-soft"
            >
              <h3 className="whitespace-nowrap text-[1.12rem] font-semibold leading-tight text-ink sm:text-[1.18rem]">
                {card.title}
              </h3>
              <p className="mt-4 flex-1 text-base leading-7 text-forest-800/80">
                {card.text}
              </p>
              <Link
                href={card.href}
                className="mt-6 inline-flex w-fit items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#ff7f6e_0%,#ffb36b_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(255,149,105,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(255,149,105,0.36)]"
              >
                <span>{card.buttonLabel}</span>
                <span aria-hidden="true" className="text-xl leading-none">
                  &gt;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
