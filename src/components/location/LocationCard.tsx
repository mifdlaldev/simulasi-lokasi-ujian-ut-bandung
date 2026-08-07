import type { ExamLocation } from "../../types/location";
import { locationCardCopy } from "../../content/copy";
import { getEstimatedSeatCount } from "../../utils/quota";

export interface LocationCardProps {
  location: ExamLocation;
  onSelect: (locationId: string) => void;
  selected: boolean;
}

export function LocationCard({ location, onSelect, selected }: LocationCardProps) {
  const hasQuota = location.availableRooms > 0;
  const estimatedSeatCount = getEstimatedSeatCount(location.availableRooms);

  return (
    <button
      aria-pressed={selected}
      disabled={!hasQuota}
      className={[
        "group flex h-full flex-col rounded-[1.5rem] border p-5 text-left transition duration-200 focus-visible:shadow-[var(--ut-focus-ring)] disabled:cursor-not-allowed",
        selected && hasQuota
          ? "border-[var(--ut-blue)] bg-[var(--ut-blue)] text-white shadow-[var(--ut-shadow-card)]"
          : hasQuota
            ? "border-[var(--ut-border)] bg-white text-[var(--ut-ink)] hover:-translate-y-0.5 hover:border-[var(--ut-blue)] hover:shadow-[var(--ut-shadow-card)]"
            : "border-[var(--ut-border)] bg-white text-[var(--ut-muted)] opacity-78",
      ].join(" ")}
      onClick={() => onSelect(location.id)}
      type="button"
    >
      <span
        className={[
          "w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
          selected && hasQuota
            ? "bg-white/16 text-[var(--ut-yellow)]"
            : hasQuota
              ? "bg-[var(--ut-yellow)] text-[var(--ut-blue-deep)]"
              : "bg-red-50 text-[var(--ut-danger)]",
        ].join(" ")}
      >
        {selected ? locationCardCopy.selected : hasQuota ? locationCardCopy.available : locationCardCopy.quotaFull}
      </span>
      <span className="mt-4 block text-xl font-bold tracking-tight">{location.schoolName}</span>
      <span className={selected ? "mt-2 text-sm leading-6 text-white/82" : "mt-2 text-sm leading-6 text-[var(--ut-muted)]"}>
        {location.address}
      </span>
      <span className="mt-5 grid gap-3 sm:grid-cols-2">
        <span className={selected ? "rounded-2xl bg-white/12 p-3" : "rounded-2xl bg-[var(--ut-blue-soft)] p-3"}>
          <span className={selected ? "block text-xs text-white/70" : "block text-xs text-[var(--ut-muted)]"}>
            {locationCardCopy.examDate}
          </span>
          <span className="mt-1 block text-sm font-semibold">{location.examDate}</span>
          <span className={selected ? "mt-1 block text-xs font-semibold text-white/78" : "mt-1 block text-xs font-semibold text-[var(--ut-blue)]"}>
            {location.examTime}
          </span>
        </span>
        <span className={selected ? "rounded-2xl bg-white/12 p-3" : hasQuota ? "rounded-2xl bg-[var(--ut-yellow-soft)] p-3" : "rounded-2xl bg-red-50 p-3"}>
          <span className={selected ? "block text-xs text-white/70" : "block text-xs text-[var(--ut-muted)]"}>
            {locationCardCopy.quota}
          </span>
          <span className="mt-1 block text-sm font-semibold">
            {hasQuota ? locationCardCopy.rooms(location.availableRooms) : locationCardCopy.quotaFull}
          </span>
          {hasQuota ? (
            <span className={selected ? "mt-1 block text-xs font-semibold text-white/78" : "mt-1 block text-xs font-semibold text-[var(--ut-blue)]"}>
              {locationCardCopy.seats(estimatedSeatCount)}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}
