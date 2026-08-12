"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";

type ReferenceCategory =
  | "Schwimmbäder & Thermen"
  | "Hotels & Wellness"
  | "Öffentliche Einrichtungen"
  | "Kliniken & Pflegebereiche"
  | "Großküchen"
  | "Retail & Gewerbeflächen"
  | "Wohnungsbau"
  | "Fassaden";

type ReferenceImage = {
  src: string;
  alt: string;
  hoverText?: string;
  isSvg?: boolean;
  category?: ReferenceCategory;
};

const referenceFilterOptions: Array<"Alle" | ReferenceCategory> = [
  "Alle",
  "Schwimmbäder & Thermen",
  "Hotels & Wellness",
  "Öffentliche Einrichtungen",
  "Kliniken & Pflegebereiche",
  "Großküchen",
  "Retail & Gewerbeflächen",
  "Wohnungsbau",
  "Fassaden",
];

const project: {
  title: string;
  description: string;
  previewImages: ReferenceImage[];
  images: ReferenceImage[];
} = {
  title: "Sprudelhof Therme, Bad Nauheim",
  description:
    "Die Sanierung der historischen Sprudelhof Therme in Bad Nauheim verbindet eindrucksvoll Tradition und Moderne. Bei diesem außergewöhnlichen Projekt treffen denkmalgeschützte Architektur, hochwertige Materialien und modernste Bauanforderungen aufeinander. Für uns war die Mitwirkung an einem der bekanntesten Thermenprojekte Deutschlands eine besondere Aufgabe - geprägt von Präzision, handwerklichem Anspruch und der Herausforderung, historische Substanz mit zeitgemäßem Komfort zu vereinen.",
  previewImages: [
    {
      src: "/references/rheingau-bad-geisenheim/title-images/rheingau-bad-title-01.png",
      hoverText: "Rheingau-Bad, Geisenheim | öffentlich | Tilution GmbH",
      alt: "Außenansicht des Rheingau-Bads in Geisenheim bei Nacht",
      category: "Schwimmbäder & Thermen",
    },
    {
      src: "/references/freibad-duderstadt/title-images/freibad-duderstadt-title-01.png",
      hoverText: "Freibad Duderstadt | öffentlich | Tilution GmbH",
      alt: "Luftaufnahme des Freibads Duderstadt",
      category: "Schwimmbäder & Thermen",
    },
    {
      src: "/references/badeparadies-eiswiese-goettingen/title-images/badeparadies-eiswiese-title-01.png",
      hoverText:
        "Badeparadies Eiswiese, Göttingen | öffentlich | Tilution GmbH",
      alt: "Luftaufnahme des Badeparadieses Eiswiese in Göttingen",
      category: "Schwimmbäder & Thermen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg",
      hoverText: "Sprudelhof Therme, Bad Nauheim | öffentlich | Tilution GmbH",
      alt: "Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
      category: "Schwimmbäder & Thermen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/fraunhofer-iff-title.png",
      hoverText: "Fraunhofer Institut, Kassel | öffentlich | Tilution GmbH",
      alt: "Außenansicht des Fraunhofer IFF Gebäudes",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/heart-brain-universitaet-goettingen/title-images/heart-brain-title-01.png",
      hoverText:
        "Heart & Brain Universität Göttingen | öffentlich | Tilution GmbH",
      alt: "Außenansicht der Heart & Brain Universität Göttingen",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/leibniz-universitaet-hannover/title-images/leibniz-universitaet-hannover-title-01.jpg",
      hoverText: "Leibniz Universität Hannover | öffentlich | Tilution GmbH",
      alt: "Außenansicht der Leibniz Universität Hannover",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/kita-ritterburg-wolfhagen/title-images/kita-ritterburg-title-01.png",
      hoverText: "Kita Ritterburg, Wolfhagen | öffentlich | Tilution GmbH",
      alt: "Außenansicht der Kita Ritterburg in Wolfhagen",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-03.png",
      hoverText: "Dom Hotel, Köln | gewerblich | Tilution GmbH",
      alt: "Außenansicht eines Referenzprojekts am Kölner Dom",
      category: "Hotels & Wellness",
    },
    {
      src: "/references/fischers-hotel-kassel/title-images/fischers-hotel-title-01.png",
      hoverText: "Fischer's Hotel, Kassel | gewerblich | Tilution GmbH",
      alt: "Außenansicht von Fischer's Hotel in Kassel",
      category: "Hotels & Wellness",
    },
    {
      src: "/references/josef-schwarz-schule/title-images/josef-schwarz-schule-title-01.png",
      hoverText: "Josef-Schwarz-Schule, Heilbronn | gewerblich | Clay Construction",
      alt: "Außenansicht der Josef-Schwarz-Schule in Heilbronn",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/vevio-hotel-events-spiesen-elversberg/title-images/vevio-title-01.png",
      hoverText: "Vevio - Hotel & Events, Spiesen-Elversberg | gewerblich | Clay Construction",
      alt: "Außenansicht von Vevio - Hotel & Events in Spiesen-Elversberg",
      category: "Hotels & Wellness",
    },
    {
      src: "/references/pionierkaserne-ulm/title-images/pionierkaserne-ulm-title-01.png",
      hoverText: "Pionierkaserne, Ulm | öffentlich | Clay Construction",
      alt: "Außenansicht der Pionierkaserne in Ulm",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/markthaus-telfs/title-images/markthaus-telfs-title-01.png",
      hoverText: "Markthaus Telfs, Telfs | gewerblich | Clay Construction",
      alt: "Außenansicht des Markthauses Telfs",
      category: "Retail & Gewerbeflächen",
    },
    {
      src: "/references/fh-muenster/title-images/fh-muenster-title-01.png",
      hoverText: "FH Münster, Münster | öffentlich | Clay Construction",
      alt: "Außenansicht der FH Münster",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-06.png",
      hoverText: "Friedensschule, Köln | gewerblich | Tilution GmbH",
      alt: "Außenansicht eines modernen Büro- und Verwaltungsgebäudes",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-07.jpg",
      hoverText: "Stadthalle, Göttingen | öffentlich | Tilution GmbH",
      alt: "Außenansicht der Stadthalle Göttingen",
      category: "Öffentliche Einrichtungen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/bmw-frontlayer-cover.png",
      hoverText: "BMW Autohaus, Göttingen | gewerblich | Tilution GmbH",
      alt: "Außenansicht eines BMW Autohauses in Göttingen",
      category: "Retail & Gewerbeflächen",
    },
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-09.jpg",
      hoverText: "Feuerwehr, Duderstadt | gewerblich | Tilution GmbH",
      alt: "Visualisierung des Feuerwehrzentrums Duderstadt",
      category: "Öffentliche Einrichtungen",
    },
  ],
  images: [
    {
      src: "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-01.svg",
      alt: "Titelbild der Sprudelhof Therme Bad Nauheim",
      isSvg: true,
    },
    {
      src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-02.jpg",
      alt: "Mosaikbereich der Sprudelhof Therme Bad Nauheim",
    },
    {
      src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-03.png",
      alt: "Panoramasauna der Sprudelhof Therme Bad Nauheim",
    },
    {
      src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-04.jpg",
      alt: "Gangbereich im Badehaus 2 der Sprudelhof Therme Bad Nauheim",
    },
    {
      src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-05.jpg",
      alt: "Beckenbereich der Sprudelhof Therme Bad Nauheim",
    },
    {
      src: "/references/sprudelhof-therme/overlay/sprudelhof-therme-overlay-06.jpg",
      alt: "Kleukens Lounge der Sprudelhof Therme Bad Nauheim",
    },
  ],
};

const fraunhoferOverlayImages = [
  {
    src: "/references/fraunhofer/overlay/fraunhofer-overlay-01.jpg",
    alt: "Innenansicht des Fraunhofer Instituts mit Sitzbereich",
  },
  {
    src: "/references/fraunhofer/overlay/fraunhofer-overlay-02.jpg",
    alt: "Treppenhaus im Fraunhofer Institut",
  },
  {
    src: "/references/fraunhofer/overlay/fraunhofer-overlay-03.jpg",
    alt: "Holztreppe im Eingangsbereich des Fraunhofer Instituts",
  },
  {
    src: "/references/fraunhofer/overlay/fraunhofer-overlay-04.jpg",
    alt: "Blick in das Atrium des Fraunhofer Instituts",
  },
  {
    src: "/references/fraunhofer/overlay/fraunhofer-overlay-05.jpg",
    alt: "Sanitärbereich im Fraunhofer Institut",
  },
];

const domHotelOverlayImages = [
  {
    src: "/references/dom-hotel/overlay/dom-hotel-overlay-01.png",
    alt: "Badezimmer im Dom Hotel Köln",
  },
  {
    src: "/references/dom-hotel/overlay/dom-hotel-overlay-02.png",
    alt: "Badewannenbereich im Dom Hotel Köln",
  },
];

const josefSchwarzSchuleOverlayImages = [
  {
    src: "/images/clay/clay-hero-lehmklimasystem.png",
    alt: "Rohbaudecke mit installiertem Lehmklimasystem in der Josef-Schwarz-Schule",
  },
  {
    src: "/references/josef-schwarz-schule/overlay/jss-overlay-01.png",
    alt: "Treppenbereich der Josef-Schwarz-Schule in Heilbronn",
  },
  {
    src: "/references/josef-schwarz-schule/overlay/jss-overlay-02.png",
    alt: "Offener Hallenbereich der Josef-Schwarz-Schule in Heilbronn",
  },
  {
    src: "/references/josef-schwarz-schule/overlay/jss-overlay-03.png",
    alt: "Ess- und Aufenthaltsbereich der Josef-Schwarz-Schule in Heilbronn",
  },
  {
    src: "/references/josef-schwarz-schule/overlay/jss-overlay-04.png",
    alt: "Lern- und Aufenthaltsbereich der Josef-Schwarz-Schule in Heilbronn",
  },
];

const vevioHotelOverlayImages = [
  {
    src: "/references/vevio-hotel-events-spiesen-elversberg/overlay/vevio-overlay-01.png",
    alt: "Rohbaudecke im Vevio Hotel & Events in Spiesen-Elversberg",
  },
  {
    src: "/references/vevio-hotel-events-spiesen-elversberg/overlay/vevio-overlay-02.png",
    alt: "Lehmklimasystem an der Decke im Vevio Hotel & Events in Spiesen-Elversberg",
  },
  {
    src: "/references/vevio-hotel-events-spiesen-elversberg/overlay/vevio-overlay-03.jpg",
    alt: "Hotelzimmer im Vevio Hotel & Events in Spiesen-Elversberg",
  },
  {
    src: "/references/vevio-hotel-events-spiesen-elversberg/overlay/vevio-overlay-04.png",
    alt: "Empfangs- und Aufenthaltsbereich im Vevio Hotel & Events in Spiesen-Elversberg",
  },
];

const friedenschuleOverlayImages = [
  {
    src: "/references/friedenschule/overlay/friedenschule-overlay-01.jpg",
    alt: "Empfangsbereich der Friedensschule in Köln",
  },
  {
    src: "/references/friedenschule/overlay/friedenschule-overlay-02.jpg",
    alt: "Treppenhaus der Friedensschule in Köln",
  },
  {
    src: "/references/friedenschule/overlay/friedenschule-overlay-03.jpg",
    alt: "Bodenleitsystem der Friedensschule in Köln",
  },
  {
    src: "/references/friedenschule/overlay/friedenschule-overlay-04.jpg",
    alt: "Flurbereich der Friedensschule in Köln",
  },
];

const stadthalleOverlayImages = [
  {
    src: "/references/stadthalle/overlay/stadthalle-overlay-01.jpg",
    alt: "Waschbereich der Stadthalle Göttingen",
  },
  {
    src: "/references/stadthalle/overlay/stadthalle-overlay-02.jpg",
    alt: "Sanitärdetail der Stadthalle Göttingen",
  },
  {
    src: "/references/stadthalle/overlay/stadthalle-overlay-03.jpg",
    alt: "Treppenbereich der Stadthalle Göttingen",
  },
];

const bmwOverlayImages = [
  {
    src: "/references/bmw/overlay/bmw-overlay-02.png",
    alt: "Showroom des BMW Autohauses Göttingen",
  },
  {
    src: "/references/bmw/overlay/bmw-overlay-03.png",
    alt: "Blick über den Ausstellungsbereich des BMW Autohauses Göttingen",
  },
  {
    src: "/references/bmw/overlay/bmw-overlay-04.jpg",
    alt: "Lounge-Bereich im BMW Autohaus Göttingen",
  },
  {
    src: "/references/bmw/overlay/bmw-overlay-01.jpg",
    alt: "Besprechungsbereich im BMW Autohaus Göttingen",
  },
];

const rheingauBadOverlayImages = [
  {
    src: "/references/rheingau-bad-geisenheim/overlay/rheingau-bad-overlay-02.png",
    alt: "Sprungbecken im Rheingau-Bad Geisenheim",
  },
  {
    src: "/references/rheingau-bad-geisenheim/overlay/rheingau-bad-overlay-03.png",
    alt: "Ruhebereich im Rheingau-Bad Geisenheim",
  },
  {
    src: "/references/rheingau-bad-geisenheim/overlay/rheingau-bad-overlay-04.png",
    alt: "Ruhebereich im Rheingau-Bad Geisenheim",
  },
];

const freibadDuderstadtOverlayImages = [
  {
    src: "/references/freibad-duderstadt/overlay/freibad-duderstadt-overlay-02.png",
    alt: "Luftaufnahme des Freibads Duderstadt",
  },
  {
    src: "/references/freibad-duderstadt/overlay/freibad-duderstadt-overlay-03.png",
    alt: "Schwimmbecken im Freibad Duderstadt",
  },
  {
    src: "/references/freibad-duderstadt/overlay/freibad-duderstadt-overlay-04.png",
    alt: "Kinderbecken im Freibad Duderstadt",
  },
  {
    src: "/references/freibad-duderstadt/overlay/freibad-duderstadt-overlay-05.png",
    alt: "Beckeneinstieg im Freibad Duderstadt",
  },
];

const fischersHotelOverlayImages = [
  {
    src: "/references/fischers-hotel-kassel/overlay/fischers-hotel-overlay-02.png",
    alt: "Poolbereich im Fischer's Hotel Kassel",
  },
  {
    src: "/references/fischers-hotel-kassel/overlay/fischers-hotel-overlay-03.png",
    alt: "Wellnessbereich im Fischer's Hotel Kassel",
  },
  {
    src: "/references/fischers-hotel-kassel/overlay/fischers-hotel-overlay-04.png",
    alt: "Saunabereich im Fischer's Hotel Kassel",
  },
  {
    src: "/references/fischers-hotel-kassel/overlay/fischers-hotel-overlay-05.png",
    alt: "Innenpool im Fischer's Hotel Kassel",
  },
];

const heartBrainOverlayImages = [
  {
    src: "/references/heart-brain-universitaet-goettingen/overlay/heart-brain-overlay-02.png",
    alt: "Sanitärbereich der Heart & Brain Universität Göttingen",
  },
  {
    src: "/references/heart-brain-universitaet-goettingen/overlay/heart-brain-overlay-03.png",
    alt: "Duschbereich der Heart & Brain Universität Göttingen",
  },
  {
    src: "/references/heart-brain-universitaet-goettingen/overlay/heart-brain-overlay-04.png",
    alt: "Barrierearmer Sanitärbereich der Heart & Brain Universität Göttingen",
  },
];

const leibnizUniversitaetOverlayImages = [
  {
    src: "/references/leibniz-universitaet-hannover/overlay/leibniz-universitaet-hannover-overlay-02.png",
    alt: "Waschbereich der Leibniz Universität Hannover",
  },
  {
    src: "/references/leibniz-universitaet-hannover/overlay/leibniz-universitaet-hannover-overlay-03.png",
    alt: "Sanitärbereich der Leibniz Universität Hannover",
  },
  {
    src: "/references/leibniz-universitaet-hannover/overlay/leibniz-universitaet-hannover-overlay-04.png",
    alt: "Treppenbereich der Leibniz Universität Hannover",
  },
];

const badeparadiesEiswieseOverlayImages = [
  {
    src: "/references/badeparadies-eiswiese-goettingen/overlay/badeparadies-eiswiese-overlay-02.png",
    alt: "Selbstbedienungsbereich im Badeparadies Eiswiese Göttingen",
  },
  {
    src: "/references/badeparadies-eiswiese-goettingen/overlay/badeparadies-eiswiese-overlay-03.png",
    alt: "Wellnessbereich im Badeparadies Eiswiese Göttingen",
  },
  {
    src: "/references/badeparadies-eiswiese-goettingen/overlay/badeparadies-eiswiese-overlay-04.png",
    alt: "Ruhebereich im Badeparadies Eiswiese Göttingen",
  },
];

const kitaRitterburgOverlayImages = [
  {
    src: "/references/kita-ritterburg-wolfhagen/overlay/kita-ritterburg-overlay-02.png",
    alt: "Sanitär- und Pflegebereich der Kita Ritterburg Wolfhagen",
  },
  {
    src: "/references/kita-ritterburg-wolfhagen/overlay/kita-ritterburg-overlay-03.png",
    alt: "Kinderbad der Kita Ritterburg Wolfhagen",
  },
  {
    src: "/references/kita-ritterburg-wolfhagen/overlay/kita-ritterburg-overlay-04.png",
    alt: "Eingangsbereich der Kita Ritterburg Wolfhagen",
  },
];

function getReferenceOverlayImages(
  selectedPreviewImage: ReferenceImage
): ReferenceImage[] {
  switch (selectedPreviewImage.src) {
    case "/references/rheingau-bad-geisenheim/title-images/rheingau-bad-title-01.png":
      return [selectedPreviewImage, ...rheingauBadOverlayImages];
    case "/references/freibad-duderstadt/title-images/freibad-duderstadt-title-01.png":
      return [selectedPreviewImage, ...freibadDuderstadtOverlayImages];
    case "/references/badeparadies-eiswiese-goettingen/title-images/badeparadies-eiswiese-title-01.png":
      return [selectedPreviewImage, ...badeparadiesEiswieseOverlayImages];
    case "/references/kita-ritterburg-wolfhagen/title-images/kita-ritterburg-title-01.png":
      return [selectedPreviewImage, ...kitaRitterburgOverlayImages];
    case "/references/fischers-hotel-kassel/title-images/fischers-hotel-title-01.png":
      return [selectedPreviewImage, ...fischersHotelOverlayImages];
    case "/references/heart-brain-universitaet-goettingen/title-images/heart-brain-title-01.png":
      return [selectedPreviewImage, ...heartBrainOverlayImages];
    case "/references/leibniz-universitaet-hannover/title-images/leibniz-universitaet-hannover-title-01.jpg":
      return [selectedPreviewImage, ...leibnizUniversitaetOverlayImages];
    case "/references/sprudelhof-therme/title-images/fraunhofer-iff-title.png":
      return [selectedPreviewImage, ...fraunhoferOverlayImages];
    case "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-03.png":
      return [selectedPreviewImage, ...domHotelOverlayImages];
    case "/references/josef-schwarz-schule/title-images/josef-schwarz-schule-title-01.png":
      return [selectedPreviewImage, ...josefSchwarzSchuleOverlayImages];
    case "/references/vevio-hotel-events-spiesen-elversberg/title-images/vevio-title-01.png":
      return [selectedPreviewImage, ...vevioHotelOverlayImages];
    case "/references/pionierkaserne-ulm/title-images/pionierkaserne-ulm-title-01.png":
      return [selectedPreviewImage];
    case "/references/markthaus-telfs/title-images/markthaus-telfs-title-01.png":
      return [selectedPreviewImage];
    case "/references/fh-muenster/title-images/fh-muenster-title-01.png":
      return [selectedPreviewImage];
    case "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-06.png":
      return [selectedPreviewImage, ...friedenschuleOverlayImages];
    case "/references/sprudelhof-therme/title-images/sprudelhof-therme-title-07.jpg":
      return [selectedPreviewImage, ...stadthalleOverlayImages];
    case "/references/sprudelhof-therme/title-images/bmw-frontlayer-cover.png":
      return [selectedPreviewImage, ...bmwOverlayImages];
    default:
      return project.images[0]?.src === selectedPreviewImage?.src
        ? project.images
        : [
            selectedPreviewImage,
            ...project.images.filter(
              (image) => image.src !== selectedPreviewImage?.src
            ),
          ];
  }
}

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
  const pathname = usePathname();
  const isTilutionPage = pathname === "/tilution";
  const isClayPage = pathname === "/clay-construction";
  const [isOpen, setIsOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const [activeFilter, setActiveFilter] =
    useState<(typeof referenceFilterOptions)[number]>("Alle");
  const [referenceFilterScrollHint, setReferenceFilterScrollHint] = useState({
    left: false,
    right: false,
  });
  const [centeredReferenceFilterIndex, setCenteredReferenceFilterIndex] =
    useState(0);
  const referenceFilterRef = useRef<HTMLDivElement | null>(null);
  const referenceFilterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedPreviewImage = project.previewImages[selectedPreviewIndex];
  const previewEntries = project.previewImages.map((image, index) => ({
    image,
    index,
  }));
  const visiblePreviewEntries =
    isClayPage
      ? previewEntries.filter((entry) =>
          entry.image.hoverText?.includes("Clay Construction")
        )
      : !isTilutionPage || activeFilter === "Alle"
        ? previewEntries
        : previewEntries.filter((entry) => entry.image.category === activeFilter);
  const overlayImages = getReferenceOverlayImages(selectedPreviewImage);
  const activeImage = overlayImages[activeImageIndex];

  const openGallery = (index: number) => {
    setSelectedPreviewIndex(index);
    setActiveImageIndex(0);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const showPrevious = () => {
    setActiveImageIndex((current) =>
      current === 0 ? overlayImages.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveImageIndex((current) =>
      current === overlayImages.length - 1 ? 0 : current + 1
    );
  };

  const scrollReferenceFilterToIndex = (index: number) => {
    const filterElement = referenceFilterRef.current;
    const filterButton = referenceFilterButtonRefs.current[index];

    if (!filterElement || !filterButton) {
      return;
    }

    const scrollLeft =
      filterButton.offsetLeft -
      (filterElement.clientWidth - filterButton.offsetWidth) / 2;

    filterElement.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  const handleReferenceFilterScroll = (direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? Math.min(centeredReferenceFilterIndex + 1, referenceFilterOptions.length - 1)
        : Math.max(centeredReferenceFilterIndex - 1, 0);

    setCenteredReferenceFilterIndex(nextIndex);
    scrollReferenceFilterToIndex(nextIndex);
  };

  useEffect(() => {
    const filterElement = referenceFilterRef.current;

    if (!isTilutionPage || !filterElement) {
      return;
    }

    const updateReferenceFilterScrollHint = () => {
      const maxScrollLeft =
        filterElement.scrollWidth - filterElement.clientWidth;
      const filterCenter = filterElement.scrollLeft + filterElement.clientWidth / 2;
      const closestIndex = referenceFilterButtonRefs.current.reduce(
        (closest, button, index) => {
          if (!button) {
            return closest;
          }

          const buttonCenter = button.offsetLeft + button.offsetWidth / 2;
          const currentDistance = Math.abs(buttonCenter - filterCenter);

          return currentDistance < closest.distance
            ? { index, distance: currentDistance }
            : closest;
        },
        { index: 0, distance: Number.POSITIVE_INFINITY }
      ).index;

      setCenteredReferenceFilterIndex(closestIndex);

      setReferenceFilterScrollHint({
        left: closestIndex > 0 && maxScrollLeft > 4,
        right:
          closestIndex < referenceFilterOptions.length - 1 && maxScrollLeft > 4,
      });
    };

    updateReferenceFilterScrollHint();
    filterElement.addEventListener("scroll", updateReferenceFilterScrollHint, {
      passive: true,
    });
    window.addEventListener("resize", updateReferenceFilterScrollHint);

    return () => {
      filterElement.removeEventListener(
        "scroll",
        updateReferenceFilterScrollHint
      );
      window.removeEventListener("resize", updateReferenceFilterScrollHint);
    };
  }, [isTilutionPage]);

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

    const previousOverflow = document.body.style.overflow;
    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("reference-gallery-open");
    document.body.classList.add("site-overlay-open");
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("reference-gallery-open");
      document.body.classList.remove("site-overlay-open");
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <SectionShell id="referenzen">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <div className="w-full">
          <p className="section-eyebrow">
            Referenzen
          </p>
          <h2 className="section-heading">
            Projekte aus unterschiedlichen Bereichen
          </h2>
          <p className="section-subline !max-w-none">
            Gebündelte Kompetenz der Grünewald Gruppe - von der Planung bis zur
            Umsetzung
          </p>
        </div>

        {isTilutionPage ? (
          <div className="relative mt-8">
            <div
              ref={referenceFilterRef}
              className={[
                "mx-8 flex snap-x snap-mandatory items-center overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible",
              ].join(" ")}
            >
              {referenceFilterOptions.map((filter, index) => {
                const isActive = filter === activeFilter;

                return (
                  <button
                    key={filter}
                    ref={(element) => {
                      referenceFilterButtonRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => {
                      setActiveFilter(filter);
                      setCenteredReferenceFilterIndex(index);
                      scrollReferenceFilterToIndex(index);
                    }}
                    className={[
                      "flex min-h-10 w-full shrink-0 snap-center items-center justify-center rounded-full border px-4 py-2 text-center text-sm font-semibold transition-all duration-300 sm:min-h-0 sm:w-auto",
                      isActive
                        ? "border-[#ec6602] bg-[#ec6602] text-white shadow-[0_12px_28px_rgba(236,102,2,0.24)]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#ec6602]/45 hover:bg-[#fff4e8] hover:text-[#ec6602]",
                    ].join(" ")}
                    aria-pressed={isActive}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
            {referenceFilterScrollHint.left ? (
              <button
                type="button"
                aria-label="Vorherige Bereiche anzeigen"
                className="absolute left-0 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/16 text-white shadow-[0_8px_18px_rgba(76,31,5,0.16)] backdrop-blur-md transition-colors duration-200 hover:bg-white/24 sm:hidden"
                onClick={() => handleReferenceFilterScroll("left")}
              >
                <ArrowLeft className="h-4 w-4 stroke-[2.4]" />
              </button>
            ) : null}
            {referenceFilterScrollHint.right ? (
              <button
                type="button"
                aria-label="Weitere Bereiche anzeigen"
                className="absolute right-0 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/16 text-white shadow-[0_8px_18px_rgba(76,31,5,0.16)] backdrop-blur-md transition-colors duration-200 hover:bg-white/24 sm:hidden"
                onClick={() => handleReferenceFilterScroll("right")}
              >
                <ArrowRight className="h-4 w-4 stroke-[2.4]" />
              </button>
            ) : null}
            <div
              className="relative mx-8 mt-1.5 h-1 overflow-hidden rounded-full bg-white/14 sm:hidden"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.42)] transition-[left] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${100 / referenceFilterOptions.length}%`,
                  left: `${
                    (centeredReferenceFilterIndex /
                      (referenceFilterOptions.length - 1)) *
                    (100 - 100 / referenceFilterOptions.length)
                  }%`,
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visiblePreviewEntries.map(({ image, index }) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openGallery(index)}
              className="reference-card liquid-card group block w-full text-left"
              aria-label={`Projektgalerie öffnen: ${project.title}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized={image.isSvg}
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-900/90 via-forest-900/70 to-transparent px-6 py-5 opacity-0 transition duration-300 group-hover:opacity-100">
                  <p className="mt-2 text-lg text-white">{image.hoverText}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {visiblePreviewEntries.length === 0 ? (
          <div className="liquid-card-dark mt-8 rounded-[1.25rem] px-5 py-4">
            <p className="text-sm font-semibold text-white">
              Für diesen Leistungsbereich sind aktuell noch keine Referenzen
              hinterlegt.
            </p>
          </div>
        ) : null}
      </section>

      {isOpen ? (
        <div className="fixed inset-0 z-[2147483100] bg-forest-900/92 backdrop-blur-md">
          <button
            type="button"
            onClick={closeGallery}
            className="fixed right-3 top-3 z-[2147483110] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-forest-900 text-2xl font-semibold leading-none text-white shadow-soft transition hover:bg-forest-700 sm:right-6 sm:top-6 sm:h-12 sm:w-12"
            aria-label="Galerie schließen"
          >
            <X className="h-5 w-5" />
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
                  {overlayImages.map((image, index) => {
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
