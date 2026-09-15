import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";
import { privacyPolicyHtml } from "@/data/privacy-policy";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf gruenewald-gruppe.de.",
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        description="Informationen zur Verarbeitung personenbezogener Daten auf gruenewald-gruppe.de."
      />

      <SectionShell>
        <article className="mx-auto w-full max-w-5xl rounded-[2rem] border border-white/12 bg-[#182956] p-6 shadow-2xl sm:p-8 lg:p-12">
          <div
            className="privacy-policy"
            dangerouslySetInnerHTML={{ __html: privacyPolicyHtml }}
          />
        </article>
      </SectionShell>
    </>
  );
}
