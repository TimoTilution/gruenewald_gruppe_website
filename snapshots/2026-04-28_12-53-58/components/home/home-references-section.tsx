"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionShell } from "@/components/section-shell";

const project = {
  title: "Sprudelhof Therme, Bad Nauheim",
  description: "Test",
  previewImages: [
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg",
      alt: "Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-02.svg",
      alt: "Weiteres Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-03.svg",
      alt: "Weiteres Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-04.svg",
      alt: "Weiteres Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-05.svg",
      alt: "Weiteres Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
  ],
  images: [
    {
      src: "/references/sprudelhof-therme/sprudelhof-therme-aussenansicht.svg",
      alt: "Außenansicht der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/sprudelhof-therme-01.jpg",
      alt: "Innenansicht der Sprudelhof Therme mit Mosaikbereich",
    },
    {
      src: "/references/sprudelhof-therme/sprudelhof-therme-02.png",
      alt: "Saunabereich der Sprudelhof Therme",
    },
    {
      src: "/references/sprudelhof-therme/sprudelhof-therme-03.jpg",
      alt: "Gangbereich im Badehaus der Sprudelhof Therme",
    },
    {
      src: "/references/sprudelhof-therme/sprudelhof-therme-04.jpg",
      alt: "Beckenbereich der Sprudelhof Therme",
    },
  ],
};

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-forest-900/80 text-xl text-white transition hover:bg-forest-800"
      aria-label={direction === "prev" ? "Vorheriges Bild" : "Nächstes Bild"}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );
}

export function HomeReferencesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeImage = project.images[activeImageIndex];

  const openGallery = (index: number) => {
    setActiveImageIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const showPrevious = () => {
    setActiveImageIndex((current) =>
      current === 0 ? project.images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveImageIndex((current) =>
      current === project.images.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("reference-gallery-open");
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("reference-gallery-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <SectionShell id="referenzen">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <div className="max-w-3xl">
          <p className="section-eyebrow">
            Referenzen
          </p>
          <h2 className="section-heading">
            Projekte aus unterschiedlichen Bereichen
          </h2>
          <p className="section-subline">
            Gebündelte Kompetenz der Grünewald Gruppe – von der Planung bis zur
            Umsetzung
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {project.previewImages.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openGallery(0)}
              className="liquid-card group block aspect-[4/3] w-full text-left lg:aspect-[16/11]"
              aria-label={`Projektgalerie öffnen: ${project.title}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized={image.isSvg}
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/90 via-forest-900/70 to-transparent px-6 py-5 opacity-0 transition duration-300 group-hover:opacity-100">
                <p className="mt-2 text-lg text-white">{project.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-[2147483100] bg-forest-900/92 backdrop-blur-md">
          <button
            type="button"
            onClick={closeGallery}
            className="fixed right-3 top-3 z-[2147483110] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-forest-900 text-2xl font-semibold leading-none text-white shadow-soft transition hover:bg-forest-700 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="Galerie schließen"
          >
            X
          </button>

          <div className="flex h-full items-center justify-center px-4 py-8 lg:px-10">
            <div className="liquid-card-dark relative grid w-full max-w-[118rem] items-center gap-6 overflow-visible p-4 lg:grid-cols-[minmax(0,1.42fr)_14rem] lg:gap-8 lg:p-6">
              <div className="flex flex-col justify-center gap-4">
                <div className="relative flex items-center justify-center overflow-visible rounded-[1.5rem]">
                  <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
                    <ArrowButton direction="prev" onClick={showPrevious} />
                  </div>

                  <div className="relative left-1/2 aspect-video w-[118%] max-w-none -translate-x-1/2 overflow-hidden rounded-[1.5rem] bg-forest-900/70 lg:w-[135%] xl:w-[145%]">
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      unoptimized={activeImage.isSvg}
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                    <ArrowButton direction="next" onClick={showNext} />
                  </div>
                </div>

                <div className="liquid-card-dark rounded-[1.25rem] px-5 py-4">
                  <p className="text-sm font-semibold tracking-[0.18em] text-forest-100/65">
                    Beschreibung
                  </p>
                  <p className="mt-2 text-base leading-7 text-forest-100/82">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center lg:translate-x-20 lg:py-6 xl:translate-x-28">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-5">
                  {project.images.map((image, index) => {
                    const isActive = index === activeImageIndex;

                    return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`overflow-hidden rounded-[1rem] border transition ${
                          isActive
                            ? "border-white/60 ring-2 ring-white/20"
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <div className="relative aspect-video w-full bg-forest-900/60">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            unoptimized={image.isSvg}
                            className="object-cover"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}
