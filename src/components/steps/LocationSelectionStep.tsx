import { useMemo } from "react";

import type { ExamLocation } from "../../types/location";
import { LocationCard } from "../location/LocationCard";

export interface LocationSelectionStepProps {
  locations: ExamLocation[];
  onSelectLocation: (locationId: string) => void;
  selectedLocationId: string;
  selectedRegionId: string;
}

export function LocationSelectionStep({
  locations,
  onSelectLocation,
  selectedLocationId,
  selectedRegionId,
}: LocationSelectionStepProps) {
  const filteredLocations = useMemo(
    () => locations.filter((location) => location.regionId === selectedRegionId),
    [locations, selectedRegionId],
  );

  if (!selectedRegionId) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        Pilih kabupaten/kota terlebih dahulu untuk melihat daftar sekolah lokasi ujian.
      </p>
    );
  }

  if (filteredLocations.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        Belum ada lokasi ujian dummy untuk wilayah yang dipilih.
      </p>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {filteredLocations.map((location) => (
        <LocationCard
          key={location.id}
          location={location}
          onSelect={onSelectLocation}
          selected={location.id === selectedLocationId}
        />
      ))}
    </div>
  );
}
