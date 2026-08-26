"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { getOptimizedReferenceSrc } from "@/lib/reference-image";

type GalleryImage = { src: string; alt: string; isSvg?: boolean };

type MobileGalleryIntro = {
  eyebrow?: string;
  title: string;
};

function FormattedIntroTitle({ title }: { title: string }) {
  const parts = title.split("|").map((part) => part.trim());

  if (parts.length !== 3) {
    return <>{title}</>;
  }

  return (
    <>
      {parts[0]} <span className="font-semibold">|</span> {parts[1]}{" "}
      <span className="font-semibold">|</span>{" "}
      <strong className="font-bold">{parts[2]}</strong>
    </>
  );
}

export function MobileSnapGallery({
  images,
  activeIndex,
  onActiveIndexChange,
  intro,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  intro?: MobileGalleryIntro;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const target = track.children[activeIndex] as HTMLElement | undefined;
    if (target && Math.abs(track.scrollLeft - target.offsetLeft) > 2) {
      track.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
  }, [activeIndex]);

  return (
    <div className="mobile-snap-gallery sm:hidden">
      {activeIndex === 0 && intro ? (
        <div className="mobile-snap-gallery__intro">
          {intro.eyebrow ? (
            <p className="mobile-snap-gallery__intro-eyebrow">
              {intro.eyebrow}
            </p>
          ) : null}
          <p className="mobile-snap-gallery__intro-title">
            <FormattedIntroTitle title={intro.title} />
          </p>
        </div>
      ) : null}
      <div
        ref={trackRef}
        className="mobile-snap-gallery__track"
        onScroll={(event) => {
          const track = event.currentTarget;
          const nextIndex = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
          if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < images.length) {
            onActiveIndexChange(nextIndex);
          }
        }}
      >
        {images.map((image, index) => (
          <div className="mobile-snap-gallery__slide" key={`${image.src}-${index}`}>
            <Image
              src={getOptimizedReferenceSrc(image.src)}
              alt={image.alt}
              fill
              priority={index === 0}
              loading={index <= activeIndex + 1 ? "eager" : "lazy"}
              quality={68}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="mobile-snap-gallery__progress" aria-label={`Bild ${activeIndex + 1} von ${images.length}`}>
        <span style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }} />
      </div>
      <p className="mobile-snap-gallery__count">{activeIndex + 1} / {images.length}</p>
    </div>
  );
}
