import { useMemo, useState } from "react";

import type { ExamLocation, ExamRegion } from "../../types/location";

export interface RegionSearchStepProps {
  error?: string;
  locations: ExamLocation[];
  onSelectRegion: (regionId: string) => void;
  regions: ExamRegion[];
  selectedRegionId: string;
}

export function RegionSearchStep({
  error,
  locations,
  onSelectRegion,
  regions,
  selectedRegionId,
}: RegionSearchStepProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("id-ID");
  const selectedRegion = regions.find((region) => region.id === selectedRegionId) ?? null;

  const filteredRegions = useMemo(() => {
    if (!normalizedQuery) {
      return regions;
    }

    return regions.filter((region) =>
      region.name.toLocaleLowerCase("id-ID").includes(normalizedQuery),
    );
  }, [normalizedQuery, regions]);

  const regionAvailability = useMemo(() => {
    return regions.reduce<Record<string, { locationCount: number; availableRooms: number }>>(
      (availability, region) => {
        const regionLocations = locations.filter((location) => location.regionId === region.id);

        availability[region.id] = {
          availableRooms: regionLocations.reduce(
            (total, location) => total + location.availableRooms,
            0,
          ),
          locationCount: regionLocations.length,
        };

        return availability;
      },
      {},
    );
  }, [locations, regions]);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-[var(--ut-blue-deep)]" htmlFor="region-search">
          Cari Kabupaten/Kota
        </label>
        <input
          aria-label="Cari kabupaten atau kota lokasi ujian"
          className="mt-2 w-full rounded-2xl border border-[var(--ut-border-strong)] bg-white px-4 py-3 text-base text-[var(--ut-ink)] placeholder:text-[var(--ut-muted)] focus:border-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]"
          id="region-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ketik Bandung, Cimahi, Garut..."
          type="search"
          value={query}
        />
        <p className="mt-2 text-sm leading-6 text-[var(--ut-muted)]">
          Pilih satu wilayah untuk menampilkan sekolah lokasi ujian yang tersedia.
        </p>
        {error ? (
          <p className="mt-2 text-sm font-medium leading-6 text-[var(--ut-danger)]" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      {selectedRegion ? (
        <div className="rounded-2xl border border-[var(--ut-blue)] bg-[var(--ut-blue-soft)] px-4 py-3 text-sm text-[var(--ut-blue-deep)]">
          Wilayah terpilih: <strong>{selectedRegion.name}</strong>
        </div>
      ) : null}

      <div className="grid gap-3" aria-label="Hasil pencarian wilayah">
        {filteredRegions.length > 0 ? (
          filteredRegions.map((region) => {
            const selected = region.id === selectedRegionId;
            const availability = regionAvailability[region.id] ?? {
              availableRooms: 0,
              locationCount: 0,
            };
            const hasQuota = availability.availableRooms > 0;

            return (
              <button
                aria-pressed={selected}
                className={[
                  "flex min-h-20 items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:shadow-[var(--ut-focus-ring)]",
                  selected
                    ? "border-[var(--ut-blue)] bg-[var(--ut-blue)] text-white"
                    : "border-[var(--ut-border)] bg-white text-[var(--ut-ink)] hover:border-[var(--ut-blue)] hover:bg-[var(--ut-blue-soft)]",
                ].join(" ")}
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                type="button"
              >
                <span className="min-w-0">
                  <span className="block font-semibold">{region.name}</span>
                  <span className={selected ? "mt-1 block text-sm text-white/80" : "mt-1 block text-sm text-[var(--ut-muted)]"}>
                    {availability.locationCount} lokasi ujian · {hasQuota ? `${availability.availableRooms} ruang tersedia` : "Kuota penuh"}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-bold",
                      hasQuota
                        ? selected
                          ? "bg-white/16 text-[var(--ut-yellow)]"
                          : "bg-[var(--ut-blue-soft)] text-[var(--ut-blue)]"
                        : selected
                          ? "bg-white/16 text-white"
                          : "bg-red-50 text-[var(--ut-danger)]",
                    ].join(" ")}
                  >
                    {hasQuota ? "Tersedia" : "Kuota penuh"}
                  </span>
                  <span className={selected ? "text-white/80" : "text-[var(--ut-muted)]"}>
                    {selected ? "Terpilih" : "Pilih"}
                  </span>
                </span>
              </button>
            );
          })
        ) : (
          <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-4 py-5 text-sm text-[var(--ut-muted)]">
            Wilayah tidak ditemukan. Coba kata kunci lain seperti Bandung, Cimahi, Sumedang, atau Garut.
          </p>
        )}
      </div>
    </div>
  );
}
