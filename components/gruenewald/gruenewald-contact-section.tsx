import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";

const contactLinkClassName =
  "group flex min-h-[4.9rem] min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[#272425] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#009CA6]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009CA6] focus-visible:ring-offset-2 sm:gap-3.5 sm:px-5 lg:min-h-0 lg:h-full lg:px-5 lg:py-4";

const contactValueClassName =
  "mt-1 block whitespace-nowrap text-[0.9rem] font-semibold leading-snug tracking-[-0.025em] sm:text-base xl:text-[1.0625rem]";

const contactLabelClassName =
  "block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-[0.8125rem]";

export function GruenewaldContactSection() {
  return (
    <SectionShell id="kontakt">
      <section className="section-card relative isolate overflow-hidden px-6 py-10 sm:px-9 lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] bg-gradient-to-b from-transparent via-slate-50/70 to-transparent md:block"
        />

        <p className="section-eyebrow relative z-10">Kontakt</p>
        <h2 className="section-heading">Direkt und persönlich erreichbar.</h2>

        <div className="relative z-10 mt-10 grid md:grid-cols-[minmax(0,1.7fr)_minmax(15rem,1fr)]">
          <article aria-labelledby="myroslava-name" className="min-w-0 md:pr-8 lg:pr-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#009CA6]">
              Ihre erste Ansprechpartnerin
            </p>

            <div className="mt-5 grid min-w-0 items-start gap-0 sm:gap-7 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-0">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[13.5rem] overflow-hidden rounded-[1.75rem] bg-slate-100 md:max-w-[10.5rem] lg:mx-0 lg:max-w-[13.5rem]">
                <Image
                  src={getOptimizedSiteImageSrc("/images/gruenewald/myroslava-golovach.png")}
                  alt="Myroslava Golovach, Backoffice Managerin"
                  fill
                  sizes="(min-width: 1024px) 216px, (min-width: 768px) 168px, calc(100vw - 88px)"
                  className="object-cover object-center"
                />
              </div>

              <div className="mx-auto w-full max-w-[15rem] text-center lg:col-start-1 lg:row-start-2 lg:mx-0 lg:text-left">
                <h3
                  id="myroslava-name"
                  className="mt-3 whitespace-nowrap text-2xl font-semibold tracking-[-0.02em] text-[#272425] sm:mt-5"
                >
                  Myroslava Golovach
                </h3>
                <p className="mt-1 text-base font-semibold text-[#009CA6]">Backoffice Managerin</p>
              </div>

              <address className="mt-7 grid min-w-0 gap-3 not-italic lg:col-start-2 lg:row-start-1 lg:mt-0 lg:h-full lg:grid-rows-2">
                  <a
                    href="mailto:golovach@gruenewaldgmbh.de"
                    aria-label="E-Mail an Myroslava Golovach senden"
                    className={contactLinkClassName}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#009CA6] transition-colors group-hover:border-[#009CA6]/30 group-hover:bg-[#009CA6]/5 sm:h-11 sm:w-11">
                      <Mail aria-hidden="true" className="h-5 w-5 stroke-[2]" />
                    </span>
                    <span className="min-w-0">
                      <span className={contactLabelClassName}>
                        E-Mail
                      </span>
                      <span className={contactValueClassName}>
                        golovach@gruenewaldgmbh.de
                      </span>
                    </span>
                  </a>

                  <a
                    href="tel:+4915114493597"
                    aria-label="Myroslava Golovach unter 01511 4493597 anrufen"
                    className={contactLinkClassName}
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-[#009CA6] transition-colors group-hover:border-[#009CA6]/30 group-hover:bg-[#009CA6]/5 sm:h-11 sm:w-11">
                      <Phone aria-hidden="true" className="h-5 w-5 stroke-[2]" />
                    </span>
                    <span className="min-w-0">
                      <span className={contactLabelClassName}>
                        Mobil
                      </span>
                      <span className={contactValueClassName}>01511 4493597</span>
                    </span>
                  </a>
              </address>
            </div>
          </article>

          <aside
            aria-labelledby="sven-name"
            className="flex min-w-0 flex-col border-t border-slate-200 bg-gradient-to-b from-transparent via-slate-50/70 to-transparent px-0 pb-7 pt-7 sm:px-6 md:border-l md:border-t-0 md:bg-none md:pl-8 md:pt-0 lg:pl-10"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#009CA6]">
              Projektleitung vor Ort
            </p>

            <div className="relative mx-auto mt-5 aspect-[4/5] w-full max-w-[13.5rem] overflow-hidden rounded-[1.75rem] bg-slate-100 md:mx-0 md:max-w-[10.5rem] lg:max-w-[13.5rem]">
              <Image
                src={getOptimizedSiteImageSrc("/images/gruenewald/sven-schulze.png")}
                alt="Sven Schulze, Projekt- und Bauleiter"
                fill
                sizes="(min-width: 1024px) 216px, (min-width: 768px) 220px, calc(100vw - 88px)"
                className="object-cover object-center"
              />
            </div>

            <h3 id="sven-name" className="mt-3 text-center text-2xl font-semibold text-[#272425] sm:mt-5 md:text-left">
              Sven Schulze
            </h3>
            <p className="mt-1 text-center text-base font-semibold text-[#009CA6] md:text-left">Projekt- &amp; Bauleiter</p>
          </aside>
        </div>
      </section>
    </SectionShell>
  );
}
