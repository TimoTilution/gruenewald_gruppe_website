"use client";

import { useMemo } from "react";
import L, { type DivIcon } from "leaflet";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";

type CompanyMapClientProps = {
  center: [number, number];
  markerPosition?: [number, number];
  zoom?: number;
  titleLines: string[];
  addressLines: string[];
  note?: string;
};

export function CompanyMapClient({
  center,
  markerPosition,
  zoom = 16,
  titleLines,
  addressLines,
  note,
}: CompanyMapClientProps) {
  const markerIcon = useMemo<DivIcon>(
    () =>
      L.divIcon({
        className: "gruenewald-map-marker",
        html: `
          <div class="gruenewald-map-marker__core">
            <span class="gruenewald-map-marker__dot"></span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    []
  );

  return (
    <div className="relative overflow-hidden rounded-[1.9rem] border border-white/12 bg-[#dfe6f2] shadow-[0_24px_58px_rgba(7,18,48,0.18)]">
      <div className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[30rem] xl:h-[34rem]">
        <MapContainer
          center={center}
          zoom={zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging
          doubleClickZoom={false}
          className="h-full w-full"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={markerPosition ?? center} icon={markerIcon} />
        </MapContainer>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest-900/14 to-transparent" />

      <div className="pointer-events-none absolute bottom-4 left-4 z-[500] w-[16rem] rounded-[1.35rem] border border-white/55 bg-white/92 p-4 shadow-[0_18px_36px_rgba(7,18,48,0.14)] backdrop-blur-sm sm:bottom-5 sm:left-5 sm:w-[18rem] sm:p-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-forest-900">
          Standort
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-[1.3] text-forest-900 sm:text-[1.15rem]">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>
        <div className="mt-4 text-sm font-semibold leading-6 text-forest-900">
          {addressLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        {note ? (
          <p className="mt-4 text-sm leading-6 text-forest-900">{note}</p>
        ) : null}
      </div>
    </div>
  );
}
