import Link from "next/link";

export default function NotFound() {
  return (
    <section className="content-shell flex min-h-[50vh] items-center py-16 sm:py-20">
      <div className="section-card mx-auto max-w-3xl px-6 py-12 text-center sm:px-10 sm:py-16">
        <p className="section-eyebrow justify-center">Nicht gefunden</p>
        <h1 className="section-heading">Diese Seite existiert nicht mehr.</h1>
        <p className="section-subline mx-auto max-w-2xl">
          Bitte gehen Sie zurück zur Grünewald Gruppe und wählen Sie den
          passenden Unternehmensbereich erneut aus.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/14"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
}
