export interface MapPreviewProps {
  label: string;
  mapUrl: string;
}

export function MapPreview({ label, mapUrl }: MapPreviewProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--ut-border)] bg-[var(--ut-blue-soft)]">
      <div className="relative min-h-56 p-5">
        <div className="absolute inset-0 opacity-70" aria-hidden="true">
          <div className="h-full w-full bg-[linear-gradient(135deg,rgba(3,70,148,0.16)_25%,transparent_25%),linear-gradient(225deg,rgba(3,70,148,0.14)_25%,transparent_25%),linear-gradient(45deg,rgba(255,242,0,0.28)_25%,transparent_25%)] bg-[length:54px_54px]" />
        </div>
        <div className="relative flex min-h-44 flex-col justify-end rounded-[1.25rem] border border-white/70 bg-white/86 p-5 shadow-[0_18px_36px_rgba(3,70,148,0.12)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
            Pratinjau Peta
          </p>
          <h3 className="mt-2 text-xl font-bold text-[var(--ut-blue-deep)]">{label}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--ut-muted)]">
            Tautan peta membuka Google Maps di tab baru tanpa API key atau pengambilan data dinamis.
          </p>
          <a
            className="mt-4 inline-flex w-fit min-h-11 items-center justify-center rounded-full bg-[var(--ut-blue)] px-5 py-2.5 text-sm font-semibold text-white no-underline transition-colors duration-200 hover:bg-[var(--ut-blue-deep)] focus-visible:shadow-[var(--ut-focus-ring)]"
            href={mapUrl}
            rel="noreferrer"
            target="_blank"
          >
            Buka lokasi di peta
          </a>
        </div>
      </div>
    </div>
  );
}
