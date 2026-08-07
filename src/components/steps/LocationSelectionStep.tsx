import { useMemo } from "react";

import { locationStepCopy } from "../../content/copy";
import type { ExamLocation } from "../../types/location";
import { getEstimatedSeatCount } from "../../utils/quota";
import { LocationCard } from "../location/LocationCard";

export interface LocationSelectionStepProps {
  error?: string;
  locations: ExamLocation[];
  onSelectLocation: (locationId: string) => void;
  selectedLocationId: string;
  selectedRegionId: string;
  selectedRegionName?: string;
}

export function LocationSelectionStep({
  error,
  locations,
  onSelectLocation,
  selectedLocationId,
  selectedRegionId,
  selectedRegionName = locationStepCopy.fallbackRegionName,
}: LocationSelectionStepProps) {
  const filteredLocations = useMemo(
    () => locations.filter((location) => location.regionId === selectedRegionId),
    [locations, selectedRegionId],
  );
  const availableLocationCount = filteredLocations.filter(
    (location) => location.availableRooms > 0,
  ).length;
  const availableRoomCount = filteredLocations.reduce(
    (total, location) => total + location.availableRooms,
    0,
  );
  const estimatedSeatCount = getEstimatedSeatCount(availableRoomCount);

  if (!selectedRegionId) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        {locationStepCopy.noRegion}
      </p>
    );
  }

  if (filteredLocations.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        {locationStepCopy.noLocations}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {availableRoomCount > 0 ? (
        <div className="rounded-2xl border border-[var(--ut-blue)] bg-[var(--ut-blue-soft)] px-4 py-3 text-sm leading-6 text-[var(--ut-blue-deep)]">
          {locationStepCopy.availability(selectedRegionName, availableLocationCount, availableRoomCount, estimatedSeatCount)}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--ut-danger)] bg-red-50 px-4 py-3 text-sm leading-6 text-[var(--ut-danger)]" role="status">
          {locationStepCopy.quotaFull(selectedRegionName)}
        </div>
      )}
      {error ? (
        <p className="rounded-2xl border border-[var(--ut-danger)] bg-red-50 px-4 py-3 text-sm font-semibold text-[var(--ut-danger)]" role="alert">
          {error}
        </p>
      ) : null}
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
    </div>
  );
}
