import { mapCopy } from "../../content/copy";

export interface MapPreviewProps {
  address: string;
  label: string;
  latitude: number;
  longitude: number;
  mapUrl: string;
}

function createOpenStreetMapEmbedUrl(latitude: number, longitude: number): string {
  const latitudeDelta = 0.006;
  const longitudeDelta = 0.008;
  const bbox = [
    longitude - longitudeDelta,
    latitude - latitudeDelta,
    longitude + longitudeDelta,
    latitude + latitudeDelta,
  ].join(",");

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
}

export function MapPreview({ address, label, latitude, longitude, mapUrl }: MapPreviewProps) {
  const openStreetMapEmbedUrl = createOpenStreetMapEmbedUrl(latitude, longitude);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--ut-border)] bg-white shadow-[0_14px_32px_rgba(16,32,51,0.08)]">
      <iframe
        className="h-72 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={openStreetMapEmbedUrl}
        title={mapCopy.iframeTitle(label)}
      />
      <div className="border-t border-[var(--ut-border)] p-5">
        <div className="rounded-[1.25rem] border border-[var(--ut-border)] bg-[var(--ut-surface)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
            {mapCopy.title}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[var(--ut-blue-deep)]">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ut-muted)]">
            {mapCopy.note}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--ut-blue-deep)]">{address}</p>
          <div className="mt-4">
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[var(--ut-border-strong)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ut-blue)] no-underline transition-colors duration-200 hover:border-[var(--ut-blue)] hover:bg-[var(--ut-blue-soft)] focus-visible:shadow-[var(--ut-focus-ring)]"
              href={mapUrl}
              rel="noreferrer"
              target="_blank"
            >
              {mapCopy.openInGoogleMaps}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
