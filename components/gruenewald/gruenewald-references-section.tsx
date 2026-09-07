"use client";

import Image from "next/image";
import { getOptimizedReferenceSrc } from "@/lib/reference-image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SectionShell } from "@/components/section-shell";
import { MobileSnapGallery } from "@/components/mobile-snap-gallery";
import { InteractiveScrollbar } from "@/components/interactive-scrollbar";
import { getReferencePath, references } from "@/data/site-architecture";
import { pushUrlWithoutScroll } from "@/lib/preserve-scroll-url";

type GruenewaldReferenceCategory =
  | "Außengestaltung"
  | "Badsanierung"
  | "Haus- & Wohnsanierung";

type GruenewaldReferenceImage = {
  src: string;
  alt: string;
};

type GruenewaldReference = {
  title: string;
  category: GruenewaldReferenceCategory;
  cover: GruenewaldReferenceImage;
  images: GruenewaldReferenceImage[];
};

const referenceFilters: Array<"Alle" | GruenewaldReferenceCategory> = [
  "Alle",
  "Außengestaltung",
  "Badsanierung",
  "Haus- & Wohnsanierung",
];

const INITIAL_VISIBLE_REFERENCE_COUNT = 6;

const gruenewaldReferenceCategoryPaths: Partial<
  Record<GruenewaldReferenceCategory, string>
> = {
  Außengestaltung: "/gruenewaldgmbh/referenzen/aussengestaltung",
  Badsanierung: "/gruenewaldgmbh/referenzen/badsanierung",
  "Haus- & Wohnsanierung": "/gruenewaldgmbh/referenzen/haus-wohnsanierung",
};

function getReferencePathForProject(project: GruenewaldReference) {
  const reference = references.find((entry) =>
    entry.images.some((referenceImage) => referenceImage.src === project.cover.src)
  );

  return reference ? getReferencePath(reference) : null;
}

// Neue GmbH-Referenzen werden hier mit Cover und Galeriebildern ergänzt.
const gruenewaldReferences: GruenewaldReference[] = [
  {
    title: "Sanierung Terrasse & Eingangsbereich",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/hauseingang-steinteppich/cover.png",
      alt: "Neu gestalteter Hauseingang mit hellem Steinteppich und dunklen Stufen",
    },
    images: [
      {
        src: "/references/gruenewald/hauseingang-steinteppich/ansicht-02.png",
        alt: "Seitliche Zuwegung mit hellem Steinteppich entlang des Hauses",
      },
      {
        src: "/references/gruenewald/hauseingang-steinteppich/ansicht-03.png",
        alt: "Steinteppichfläche mit Sitzbank und Pflanzkübeln",
      },
      {
        src: "/references/gruenewald/hauseingang-steinteppich/detail-04.png",
        alt: "Detailansicht der dunkel eingefassten Stufe im Außenbereich",
      },
      {
        src: "/references/gruenewald/hauseingang-steinteppich/detail-05.png",
        alt: "Detail des Übergangs zwischen Steinteppich und bestehender Natursteinstufe",
      },
      {
        src: "/references/gruenewald/hauseingang-steinteppich/detail-06.png",
        alt: "Nahaufnahme von Marmorkies und Abschlussprofil des Steinteppichs",
      },
    ],
  },
  {
    title: "Mauer mit Naturstein veredelt",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/natursteinmauer/cover.png",
      alt: "Mit Naturstein veredelte Gartenmauer mit Holztor",
    },
    images: [
      {
        src: "/references/gruenewald/natursteinmauer/ansicht-02.png",
        alt: "Natursteinmauer vor einem bepflanzten Garten",
      },
      {
        src: "/references/gruenewald/natursteinmauer/ansicht-03.png",
        alt: "Außenansicht der mit Naturstein verkleideten Mauer",
      },
      {
        src: "/references/gruenewald/natursteinmauer/ansicht-04.png",
        alt: "Gesamtansicht der Natursteinmauer mit Holztor",
      },
    ],
  },
  {
    title: "Sanierung Eingangsbereich und Mauer",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/eingangsbereich-mauer/cover.png",
      alt: "Sanierte Grundstücksmauer und Eingangsbereich eines Wohnhauses",
    },
    images: [
      {
        src: "/references/gruenewald/eingangsbereich-mauer/ansicht-02.png",
        alt: "Neu gefliester Weg im Eingangsbereich",
      },
      {
        src: "/references/gruenewald/eingangsbereich-mauer/ansicht-03.png",
        alt: "Sanierter Weg zwischen Mauerpfeilern und Hauseingang",
      },
      {
        src: "/references/gruenewald/eingangsbereich-mauer/ansicht-04.png",
        alt: "Detailansicht der sanierten Grundstücksmauer",
      },
    ],
  },
  {
    title: "Sanierung Terrasse - Mauersteine Anthrazit",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/cover.png",
      alt: "Sanierte Terrasse mit heller Fläche und dunkler Einfassungsmauer",
    },
    images: [
      {
        src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/ansicht-02.png",
        alt: "Terrasse mit heller Oberfläche und dunkler Mauer",
      },
      {
        src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/ansicht-03.png",
        alt: "Seitliche Ansicht der sanierten Terrasse",
      },
      {
        src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/ansicht-04.png",
        alt: "Dunkle Pflastereinfassung im Gartenbereich",
      },
      {
        src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/ansicht-05.png",
        alt: "Sanierter Eingangsbereich mit heller Oberfläche und dunkler Einfassung",
      },
      {
        src: "/references/gruenewald/terrasse-eingang-dunkle-mauer/ansicht-06.png",
        alt: "Gesamtansicht des sanierten Eingangsbereichs",
      },
    ],
  },
  {
    title: "Pflasterarbeiten & Terrasse",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/pflasterarbeiten-terrasse/cover.png",
      alt: "Gepflasterte Terrasse mit Überdachung an einem Wohnhaus",
    },
    images: [
      {
        src: "/references/gruenewald/pflasterarbeiten-terrasse/ansicht-02.png",
        alt: "Gepflasterte Zufahrt und Wege vor einem Wohnhaus",
      },
      {
        src: "/references/gruenewald/pflasterarbeiten-terrasse/ansicht-03.png",
        alt: "Terrasse und gepflasterter Weg entlang eines Wohnhauses",
      },
      {
        src: "/references/gruenewald/pflasterarbeiten-terrasse/ansicht-04.png",
        alt: "Detail der Pflasterfläche mit Entwässerungsrinne",
      },
    ],
  },
  {
    title: "Poolbau & Gartengestaltung",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/poolbau-gartengestaltung/cover.jpg",
      alt: "Pool mit heller Umrandung und moderner Gartengestaltung",
    },
    images: [
      {
        src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-02.jpg",
        alt: "Überdachte Terrasse mit Blick auf Pool und Garten",
      },
      {
        src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-03.jpg",
        alt: "Detail der hellen Poolumrandung in Holzoptik",
      },
      {
        src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-04.jpg",
        alt: "Blick von der Terrasse auf Pool und Gartenbepflanzung",
      },
      {
        src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-05.jpg",
        alt: "Lavendel und immergrüne Bepflanzung am Poolbereich",
      },
    ],
  },
  {
    title: "Pflasterarbeiten & Einfahrt",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/pflasterarbeiten-einfahrt/cover.jpg",
      alt: "Gepflasterte Einfahrt mit bepflanzter Böschung und Entwässerungsrinne",
    },
    images: [
      {
        src: "/references/gruenewald/pflasterarbeiten-einfahrt/ansicht-02.jpg",
        alt: "Bepflanzte Böschung entlang der Einfahrt",
      },
      {
        src: "/references/gruenewald/pflasterarbeiten-einfahrt/ansicht-03.jpg",
        alt: "Gepflasterter Weg zwischen Wohnhaus und Garten",
      },
      {
        src: "/references/gruenewald/pflasterarbeiten-einfahrt/ansicht-04.jpg",
        alt: "Gepflasterter Eingangsbereich vor einem modernen Wohnhaus",
      },
      {
        src: "/references/gruenewald/pflasterarbeiten-einfahrt/ansicht-05.jpg",
        alt: "Detail der Entwässerungsrinne an der Pflasterfläche",
      },
    ],
  },
  {
    title: "Terrassenbau",
    category: "Außengestaltung",
    cover: {
      src: "/references/gruenewald/poolbau-gartengestaltung/ansicht-02.jpg",
      alt: "Überdachte Terrasse mit großformatigen Platten und Blick in den Garten",
    },
    images: [
      {
        src: "/references/gruenewald/terrassenbau/ansicht-02.png",
        alt: "Großformatige Terrassenplatten vor einer Gartenbepflanzung",
      },
      {
        src: "/references/gruenewald/terrassenbau/ansicht-03.png",
        alt: "Weitläufige Terrasse entlang eines modernen Wohnhauses",
      },
      {
        src: "/references/gruenewald/terrassenbau/ansicht-04.png",
        alt: "Detailansicht der großformatigen Terrassenplatten",
      },
    ],
  },
  {
    title: "Komplettsanierung Badezimmer mit Dachschräge",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-dachschraege/cover.png",
      alt: "Komplett saniertes Badezimmer mit Dachschräge, Badewanne und Dusche",
    },
    images: [
      {
        src: "/references/gruenewald/bad-dachschraege/ansicht-02.png",
        alt: "Panoramaansicht des Badezimmers mit Dusche und beleuchteten Wandnischen",
      },
    ],
  },
  {
    title: "Komplettsanierung Badezimmer mit Steinwaschbecken",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-steinwaschbecken/cover.png",
      alt: "Saniertes Badezimmer mit Holzwaschtisch und Steinwaschbecken",
    },
    images: [
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-02.png",
        alt: "Detail des beleuchteten Waschtischunterschranks aus Holz",
      },
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-03.png",
        alt: "Badewanne mit dunkler Wandverkleidung und Ablage",
      },
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-04.png",
        alt: "Detail der Badewanne und Armatur",
      },
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-05.png",
        alt: "Wandhängendes WC vor dunkler Wandverkleidung",
      },
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-06.png",
        alt: "Doppelwaschtisch mit zwei Steinwaschbecken",
      },
      {
        src: "/references/gruenewald/bad-steinwaschbecken/ansicht-07.png",
        alt: "Badewanne und Duschabtrennung unter der Dachschräge",
      },
    ],
  },
  {
    title: "Komplettsanierung Badezimmer - ebenerdige Dusche",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-ebenerdige-dusche/cover.png",
      alt: "Komplett saniertes Badezimmer mit ebenerdiger Dusche",
    },
    images: [
      {
        src: "/references/gruenewald/bad-ebenerdige-dusche/ansicht-02.png",
        alt: "Panoramaansicht der ebenerdigen Dusche",
      },
      {
        src: "/references/gruenewald/bad-ebenerdige-dusche/ansicht-03.png",
        alt: "Waschtisch mit Spiegel und beleuchteten Wandnischen",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer mit Walk-In Duschkabine",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-walk-in-duschkabine/cover.png",
      alt: "Saniertes Badezimmer mit Walk-In Duschkabine",
    },
    images: [
      {
        src: "/references/gruenewald/bad-walk-in-duschkabine/ansicht-02.png",
        alt: "WC-Bereich des sanierten Badezimmers",
      },
      {
        src: "/references/gruenewald/bad-walk-in-duschkabine/ansicht-03.png",
        alt: "Walk-In Dusche mit Glasabtrennung und Regendusche",
      },
      {
        src: "/references/gruenewald/bad-walk-in-duschkabine/ansicht-04.png",
        alt: "WC mit halbhoher Wandverkleidung",
      },
      {
        src: "/references/gruenewald/bad-walk-in-duschkabine/ansicht-05.png",
        alt: "Doppelwaschtisch und Handtuchheizkörper",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer Vintagefliesen",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-vintagefliesen/cover.png",
      alt: "Sanierte Dusche mit gemusterten Vintagefliesen",
    },
    images: [
      {
        src: "/references/gruenewald/bad-vintagefliesen/ansicht-02.png",
        alt: "Badezimmer mit Vintage-Bodenfliesen und Metrofliesen",
      },
      {
        src: "/references/gruenewald/bad-vintagefliesen/ansicht-03.png",
        alt: "Dusche mit Vintagefliesen und Wandnische",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer rote Mosaikbordüre",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-rote-mosaikborduere/cover.png",
      alt: "Saniertes Badezimmer mit roter Mosaikbordüre",
    },
    images: [
      {
        src: "/references/gruenewald/bad-rote-mosaikborduere/ansicht-02.png",
        alt: "Waschtisch und WC mit roter Mosaikbordüre",
      },
      {
        src: "/references/gruenewald/bad-rote-mosaikborduere/ansicht-03.png",
        alt: "Badezimmer mit Badewanne und Wandnischen",
      },
      {
        src: "/references/gruenewald/bad-rote-mosaikborduere/ansicht-04.png",
        alt: "Wandnischen und Fenster über der Badewanne",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer - grifflose Einbaumodule",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-grifflose-einbaumodule/cover.png",
      alt: "Sanierte Dusche mit schwarzen Armaturen und grifflosen Einbaumodulen",
    },
    images: [
      {
        src: "/references/gruenewald/bad-grifflose-einbaumodule/ansicht-02.png",
        alt: "WC-Bereich mit grifflosen Einbaumodulen",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer - Dusche mit Glastrennwand",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-dusche-glastrennwand/cover.png",
      alt: "Sanierte bodengleiche Dusche mit transparenter Glastrennwand",
    },
    images: [
      {
        src: "/references/gruenewald/bad-dusche-glastrennwand/ansicht-02.png",
        alt: "Badezimmer mit großflächiger Dusche und Glastrennwand",
      },
      {
        src: "/references/gruenewald/bad-dusche-glastrennwand/ansicht-03.png",
        alt: "Waschtisch und WC im sanierten Badezimmer",
      },
      {
        src: "/references/gruenewald/bad-dusche-glastrennwand/ansicht-04.png",
        alt: "Fenster in der gefliesten Dusche",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer mit Sauna",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-mit-sauna/cover.png",
      alt: "Saniertes Badezimmer mit freistehender Badewanne und Ornamentfliesen",
    },
    images: [
      {
        src: "/references/gruenewald/bad-mit-sauna/ansicht-02.png",
        alt: "Waschbecken und freistehende Badewanne im sanierten Badezimmer",
      },
      {
        src: "/references/gruenewald/bad-mit-sauna/ansicht-03.png",
        alt: "Modernes Badezimmer mit integrierter Sauna und großer Dusche",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer mit TV",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-mit-tv/cover.png",
      alt: "Saniertes Badezimmer mit Badewanne und integriertem TV",
    },
    images: [
      {
        src: "/references/gruenewald/bad-mit-tv/ansicht-02.png",
        alt: "Waschtisch vor einer grünen Motivwand",
      },
      {
        src: "/references/gruenewald/bad-mit-tv/ansicht-03.png",
        alt: "Dusche mit schwarzen Armaturen und dunkler Trennwand",
      },
      {
        src: "/references/gruenewald/bad-mit-tv/ansicht-04.png",
        alt: "Dunkle Trennwand zwischen Dusche und WC",
      },
      {
        src: "/references/gruenewald/bad-mit-tv/ansicht-05.png",
        alt: "Badewanne mit gegenüberliegendem TV",
      },
      {
        src: "/references/gruenewald/bad-mit-tv/ansicht-06.png",
        alt: "WC vor einer dunklen Holzverkleidung",
      },
    ],
  },
  {
    title: "Sanierung Toiletten Unigebäude",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/toiletten-unigebaeude/cover.png",
      alt: "Sanierter Toilettenraum mit Aufsatzwaschbecken und beleuchtetem Spiegel",
    },
    images: [
      {
        src: "/references/gruenewald/toiletten-unigebaeude/ansicht-02.png",
        alt: "Sanierter Toilettenraum mit Dusche, WC und Aufsatzwaschbecken",
      },
      {
        src: "/references/gruenewald/toiletten-unigebaeude/ansicht-03.png",
        alt: "Glastür mit Holzrahmen im sanierten Toilettenraum",
      },
    ],
  },
  {
    title: "Sanierung Badezimmer",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-sanierung-badezimmer/cover.png",
      alt: "Saniertes Badezimmer mit Badewanne, Holzwaschtisch und WC",
    },
    images: [
      {
        src: "/references/gruenewald/bad-sanierung-badezimmer/ansicht-02.png",
        alt: "Badewanne und Waschtisch im sanierten Badezimmer",
      },
    ],
  },
  {
    title: "Sanierung Wasserschaden Badezimmer",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-wasserschaden/cover.png",
      alt: "Sanierter Duschboden mit Linienablauf",
    },
    images: [
      {
        src: "/references/gruenewald/bad-wasserschaden/ansicht-02.png",
        alt: "Sanierte Dusche mit Glaskabine und Linienablauf",
      },
      {
        src: "/references/gruenewald/bad-wasserschaden/ansicht-03.png",
        alt: "Duscharmatur im sanierten Badezimmer",
      },
    ],
  },
  {
    title: "Badsanierung Fußbodenheizung",
    category: "Badsanierung",
    cover: {
      src: "/references/gruenewald/bad-fussbodenheizung/cover.png",
      alt: "Saniertes Badezimmer mit Badewanne und großformatigen Fliesen",
    },
    images: [
      {
        src: "/references/gruenewald/bad-fussbodenheizung/ansicht-02.png",
        alt: "Geflieste Dusche im sanierten Badezimmer",
      },
      {
        src: "/references/gruenewald/bad-fussbodenheizung/ansicht-03.png",
        alt: "Gefliester Badezimmerboden unter einer Dachschräge",
      },
    ],
  },
  {
    title: "Komplette Wohnungssanierung",
    category: "Haus- & Wohnsanierung",
    cover: {
      src: "/references/gruenewald/komplette-wohnungssanierung/cover.png",
      alt: "Komplett sanierter Wohnbereich mit neuem Boden und weißen Wänden",
    },
    images: [
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-02.png",
        alt: "Sanierter Balkon mit Fliesen in Holzoptik",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-03.png",
        alt: "Wohnraum mit großer Balkontür und neuem Boden",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-04.png",
        alt: "Sanierter Raum unter einer Dachschräge",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-05.png",
        alt: "Großer sanierter Wohnbereich mit neuem Boden",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-06.png",
        alt: "Geflieste Dusche mit beleuchteter Wandnische",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-07.png",
        alt: "Sanierter Eingangsbereich mit neuem Boden",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-08.png",
        alt: "Gefliester Bereich unter einer Dachschräge",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-09.png",
        alt: "Doppelwaschtisch mit Holzplatte und beleuchtetem Spiegel",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-10.png",
        alt: "Badewanne unter Dachfenster mit beleuchteten Wandnischen",
      },
      {
        src: "/references/gruenewald/komplette-wohnungssanierung/ansicht-11.png",
        alt: "Saniertes Badezimmer mit Doppelwaschtisch und Badewanne",
      },
    ],
  },
  {
    title: "Wohnungssanierung",
    category: "Haus- & Wohnsanierung",
    cover: {
      src: "/references/gruenewald/wohnungssanierung/cover.png",
      alt: "Sanierter Wohnraum mit neuem Boden und weißen Wänden",
    },
    images: [
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-02.png",
        alt: "Saniertes Badezimmer mit Waschtisch und WC",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-03.png",
        alt: "Heller sanierter Wohnraum mit Zugang zum Balkon",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-04.png",
        alt: "Sanierter Balkon mit grauen Bodenfliesen",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-05.png",
        alt: "Detailansicht der grauen Balkonfliesen",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-06.png",
        alt: "Sanierter Flur mit neuem Boden und weißen Türen",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-07.png",
        alt: "Geflieste Dusche mit Glasabtrennung",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-08.png",
        alt: "Waschtisch mit beleuchtetem Spiegel im sanierten Badezimmer",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-09.png",
        alt: "Beleuchtete Wandnische im sanierten Badezimmer",
      },
      {
        src: "/references/gruenewald/wohnungssanierung/ansicht-10.png",
        alt: "Sanierter Raum mit neuem Boden und Fenster",
      },
    ],
  },
];

export function GruenewaldReferencesSection() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof referenceFilters)[number]>("Alle");
  const [selectedProject, setSelectedProject] =
    useState<GruenewaldReference | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllReferences, setShowAllReferences] = useState(false);
  const referenceFilterRef = useRef<HTMLDivElement | null>(null);
  const referencePreviewRef = useRef<HTMLDivElement | null>(null);

  const visibleProjects =
    activeFilter === "Alle"
      ? gruenewaldReferences
      : gruenewaldReferences.filter(
          (reference) => reference.category === activeFilter
        );
  const canToggleReferences =
    visibleProjects.length > INITIAL_VISIBLE_REFERENCE_COUNT;
  const displayedProjects = visibleProjects;
  const galleryImages = selectedProject
    ? [
        selectedProject.cover,
        ...selectedProject.images.filter(
          (image) => image.src !== selectedProject.cover.src
        ),
      ]
    : [];
  const activeImage = galleryImages[activeImageIndex];

  const closeGallery = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
    pushUrlWithoutScroll("/gruenewaldgmbh/referenzen");
  };

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft" && galleryImages.length > 1) {
        showPreviousImage();
      }
      if (event.key === "ArrowRight" && galleryImages.length > 1) {
        showNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, galleryImages.length]);

  useEffect(() => {
    setShowAllReferences(false);
  }, [activeFilter]);

  return (
    <SectionShell id="referenzen">
      <section className="section-card px-6 py-10 sm:px-9 lg:p-12">
        <div className="w-full">
          <p className="section-eyebrow">Referenzen</p>
          <h2 className="section-heading">Projekte für Ihr Zuhause</h2>
          <p className="section-subline !max-w-none">
            Ausgewählte Arbeiten der Grünewald GmbH – von der ersten Idee bis
            zur hochwertigen Umsetzung.
          </p>
        </div>

        <div className="relative mt-8">
          <div
            ref={referenceFilterRef}
            className="reference-mobile-scrollbar flex items-center gap-2.5 overflow-x-auto pb-3 scroll-smooth sm:flex-wrap sm:overflow-visible sm:pb-0 sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
            aria-label="Referenzen nach Leistung filtern"
          >
            {referenceFilters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={(event) => {
                    setActiveFilter(filter);
                    pushUrlWithoutScroll(
                      filter === "Alle"
                        ? "/gruenewaldgmbh/referenzen"
                        : gruenewaldReferenceCategoryPaths[filter] ??
                            "/gruenewaldgmbh/referenzen",
                      event.currentTarget
                    );
                  }}
                  className={[
                    "flex min-h-10 shrink-0 items-center justify-center rounded-full border px-4 py-2 text-center text-sm font-semibold transition-all duration-300 sm:min-h-0 sm:w-auto",
                    isActive
                      ? "border-[#009ca6] bg-[#009ca6] text-white shadow-[0_12px_28px_rgba(0,156,166,0.24)]"
                      : "border-slate-200 bg-white text-slate-600 hover:border-[#009ca6]/45 hover:bg-[#e8f7f8] hover:text-[#007f87]",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          <InteractiveScrollbar
            scrollRef={referenceFilterRef}
            ariaLabel="Position in den Referenzkategorien"
          />
        </div>

        {visibleProjects.length > 0 ? (
          <>
            <div
              ref={referencePreviewRef}
              className="reference-preview-scroll mt-10 flex gap-5 overflow-x-scroll pb-4 scroll-smooth sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 xl:grid-cols-3"
            >
            {displayedProjects.map((reference, displayedIndex) => (
              <button
                key={reference.cover.src}
                type="button"
                onClick={() => {
                  const referencePath = getReferencePathForProject(reference);
                  setSelectedProject(reference);
                  setActiveImageIndex(0);
                  if (referencePath) {
                    pushUrlWithoutScroll(referencePath);
                  }
                }}
                className={`reference-card liquid-card group block w-[82vw] shrink-0 overflow-hidden text-left sm:w-full${canToggleReferences && !showAllReferences && displayedIndex >= INITIAL_VISIBLE_REFERENCE_COUNT ? " sm:hidden" : ""}`}
                aria-label={`Projektgalerie öffnen: ${reference.title}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[16/11]">
                  <Image
                    src={getOptimizedReferenceSrc(reference.cover.src)}
                    alt={reference.cover.alt}
                    fill
                    loading="lazy"
                    quality={68}
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 92vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#182956]/95 via-[#182956]/70 to-transparent px-5 pb-5 pt-14 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {reference.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">
                      {reference.title}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
            </div>
            <InteractiveScrollbar
              scrollRef={referencePreviewRef}
              ariaLabel="Position in den Referenzen"
            />
          </>
        ) : (
          <div className="mt-10 rounded-[1.25rem] border border-[#009ca6]/20 bg-[#e8f7f8] px-5 py-5">
            <p className="text-sm font-semibold text-[#182956]">
              Referenzen für „{activeFilter}“ werden hier ergänzt.
            </p>
          </div>
        )}

        {canToggleReferences ? (
          <div className="gruenewald-references-toggle mt-10 justify-center">
            <button
              type="button"
              onClick={() => setShowAllReferences((current) => !current)}
              className="show-more-primary-button liquid-card group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-1 sm:px-7 sm:py-4 sm:text-base"
            >
              {showAllReferences ? "Weniger anzeigen" : "Mehr anzeigen"}
            </button>
          </div>
        ) : null}
      </section>

      {selectedProject && activeImage ? createPortal((
        <div
          className="reference-gallery-overlay fixed inset-0 z-[2147483600] grid place-items-center overflow-hidden p-0 sm:overflow-y-auto sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gruenewald-reference-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div className="reference-gallery-panel relative w-[calc(100%_-_1.5rem)] max-w-[110rem] justify-self-center overflow-visible sm:grid sm:w-full sm:max-h-[calc(100vh-3rem)] lg:w-[calc(100%_-_8rem)] lg:grid-cols-[minmax(0,1fr)_12rem] lg:gap-6 lg:p-4 xl:w-[calc(100%_-_10rem)]">
            <button
              type="button"
              onClick={closeGallery}
              className="reference-gallery-close absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full border border-[#009ca6]/25 bg-white/95 text-[#182956] shadow-lg transition hover:bg-[#009ca6] hover:text-white lg:-right-16 lg:-top-14"
              aria-label="Projektgalerie schließen"
              autoFocus
            >
              <X className="h-5 w-5" />
            </button>

            <MobileSnapGallery
              images={galleryImages}
              activeIndex={activeImageIndex}
              onActiveIndexChange={setActiveImageIndex}
              intro={{
                eyebrow: selectedProject.category,
                title: selectedProject.title,
              }}
            />
            <div className="reference-gallery-image relative hidden h-[76vh] min-h-[18rem] w-full overflow-hidden rounded-[1.25rem] sm:block">
              <div className="absolute left-4 top-4 z-10 max-w-[calc(100%-8rem)] rounded-xl bg-[#071426]/75 px-4 py-3 text-white backdrop-blur-md sm:left-5 sm:top-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#62d4da]">
                  {selectedProject.category}
                </p>
                <h2
                  id="gruenewald-reference-title"
                  className="mt-1 text-lg font-semibold leading-tight sm:text-xl"
                >
                  {selectedProject.title}
                </h2>
              </div>
              <Image
                src={getOptimizedReferenceSrc(activeImage.src)}
                alt={activeImage.alt}
                fill
                priority
                quality={76}
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="object-contain"
              />
              {galleryImages.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#009ca6]/95 text-white shadow-lg"
                    aria-label="Vorheriges Projektbild"
                  >
                    <ChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-[#009ca6]/95 text-white shadow-lg"
                    aria-label="Nächstes Projektbild"
                  >
                    <ChevronRight />
                  </button>
                </>
              ) : null}
            </div>

            {galleryImages.length > 1 ? (
                <div className="hidden shrink-0 justify-start gap-2 overflow-x-auto bg-transparent p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex sm:p-4 lg:max-h-[76vh] lg:flex-col lg:justify-center lg:overflow-y-auto lg:p-0 lg:translate-x-16 xl:translate-x-20">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image.src}-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 sm:h-16 sm:w-24 lg:aspect-video lg:h-auto lg:w-full ${
                        index === activeImageIndex
                          ? "border-[#009ca6]"
                          : "border-transparent"
                      }`}
                      aria-label={`Projektbild ${index + 1} anzeigen`}
                    >
                      <Image
                        src={getOptimizedReferenceSrc(image.src)}
                        alt=""
                        fill
                        sizes="6rem"
                        className="object-cover"
                      />
                    </button>
                  ))}
          </div>
        ) : null}

          </div>
        </div>
      ), document.body) : null}
    </SectionShell>
  );
}
