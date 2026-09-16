import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionShell } from "@/components/section-shell";
import { getOptimizedSiteImageSrc } from "@/lib/site-image";

type TeamMemberDetailPageProps = {
  name: string;
  role: string;
  department: string;
  imageSrc?: string;
  email?: string;
  phone?: string;
};

function getPhoneHref(phone: string) {
  const normalizedPhone = phone.replace(/[^\d+]/g, "");
  return normalizedPhone.startsWith("+")
    ? `tel:${normalizedPhone}`
    : `tel:+49${normalizedPhone.replace(/^0/, "")}`;
}

export function TeamMemberDetailPage({
  name,
  role,
  department,
  imageSrc,
  email,
  phone,
}: TeamMemberDetailPageProps) {
  return (
    <>
      <PageHero eyebrow={department} title={name} description={role} />
      <SectionShell>
        <section className="section-card grid gap-6 px-6 py-8 sm:px-9 lg:grid-cols-[minmax(16rem,28rem)_1fr] lg:p-12">
          {imageSrc ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/15">
              <Image
                src={getOptimizedSiteImageSrc(imageSrc)}
                alt={`${name}, ${role}`}
                fill
                unoptimized
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-100/72">
              {department}
            </p>
            <h2 className="mt-4 text-3xl font-semibold">{name}</h2>
            <p className="mt-3 text-lg text-white/82">{role}</p>
            {email || phone ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {email ? (
                  <a href={`mailto:${email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-ink">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    E-Mail schreiben
                  </a>
                ) : null}
                {phone ? (
                  <a href={getPhoneHref(phone)} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 py-3 font-semibold text-white">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Direkt anrufen
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      </SectionShell>
    </>
  );
}
