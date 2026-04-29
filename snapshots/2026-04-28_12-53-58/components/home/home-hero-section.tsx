import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

const heroActions = [
  {
    href: "/tilution",
    label: "Geschäftskunde",
    panelClassName: "",
    logoSrc: "/logos/companies/tilution.svg",
    logoWidth: 220,
    logoClassName:
      "absolute left-1/2 bottom-[-1.75rem] h-40 w-auto -translate-x-1/2 sm:bottom-[-2.25rem] sm:h-48",
  },
  {
    href: "/gruenewald",
    label: "Privatkunde",
    panelClassName: "",
    logoSrc: "/logos/companies/gruenewald.svg",
    logoWidth: 180,
    logoClassName:
      "absolute bottom-4 left-1/2 h-24 w-auto -translate-x-1/2 sm:bottom-5 sm:h-[7.2rem]",
  },
  {
    href: "/clay-construction",
    label: "Klimadecken",
    panelClassName: "",
    logoSrc: "/logos/companies/clay-construction.svg",
    logoWidth: 240,
    logoClassName:
      "absolute bottom-[-6px] left-1/2 h-28 w-auto -translate-x-1/2 sm:bottom-[-4px] sm:h-[8.4rem]",
  },
];

function HeroButton({ label }: { label: string }) {
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

export function HomeHeroSection() {
  return (
    <SectionShell id="hero">
      <section
        className="overflow-hidden rounded-[2.75rem] border border-white/10 px-6 py-12 text-porcelain shadow-premium sm:px-9 lg:px-14 lg:py-20"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(14, 25, 55, 0.52) 0%, rgba(24, 41, 86, 0.44) 42%, rgba(14, 25, 55, 0.7) 100%), url('/hero-start.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl">
          <p className="section-eyebrow">Grünewald Gruppe</p>
          <h1 className="mt-6 max-w-[24ch] text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Spezialisierte Lösungen für anspruchsvolle Bauprojekte.
          </h1>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {heroActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`liquid-card group flex flex-col px-6 py-5 text-center text-ink ${action.panelClassName}`}
            >
              <div className="relative min-h-[8rem] overflow-hidden sm:min-h-[9rem]">
                <Image
                  src={action.logoSrc}
                  alt={`${action.label} Logo`}
                  width={action.logoWidth}
                  height={48}
                  className={action.logoClassName}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <HeroButton label={action.label} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SectionShell>
  );
}
