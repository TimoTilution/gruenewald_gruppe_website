import { SectionShell } from "@/components/section-shell";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <SectionShell>
      <section className="section-card px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
        <p className="text-xs uppercase tracking-[0.28em] text-forest-100/75">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-forest-100/80">
          {description}
        </p>
      </section>
    </SectionShell>
  );
}
