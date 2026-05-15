import type { ExamLocation } from "../../types/location";

export interface LocationCardProps {
  location: ExamLocation;
  onSelect: (locationId: string) => void;
  selected: boolean;
}

export function LocationCard({ location, onSelect, selected }: LocationCardProps) {
  return (
    <button
      aria-pressed={selected}
      className={[
        "group flex h-full flex-col rounded-[1.5rem] border p-5 text-left transition duration-200 focus-visible:shadow-[var(--ut-focus-ring)]",
        selected
          ? "border-[var(--ut-blue)] bg-[var(--ut-blue)] text-white shadow-[var(--ut-shadow-card)]"
          : "border-[var(--ut-border)] bg-white text-[var(--ut-ink)] hover:-translate-y-0.5 hover:border-[var(--ut-blue)] hover:shadow-[var(--ut-shadow-card)]",
      ].join(" ")}
      onClick={() => onSelect(location.id)}
      type="button"
    >
      <span
        className={[
          "w-fit rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]",
          selected ? "bg-white/16 text-[var(--ut-yellow)]" : "bg-[var(--ut-yellow)] text-[var(--ut-blue-deep)]",
        ].join(" ")}
      >
        {selected ? "Lokasi dipilih" : "Tersedia"}
      </span>
      <span className="mt-4 block text-xl font-bold tracking-tight">{location.schoolName}</span>
      <span className={selected ? "mt-2 text-sm leading-6 text-white/82" : "mt-2 text-sm leading-6 text-[var(--ut-muted)]"}>
        {location.address}
      </span>
      <span className="mt-5 grid gap-3 sm:grid-cols-2">
        <span className={selected ? "rounded-2xl bg-white/12 p-3" : "rounded-2xl bg-[var(--ut-blue-soft)] p-3"}>
          <span className={selected ? "block text-xs text-white/70" : "block text-xs text-[var(--ut-muted)]"}>
            Tanggal Ujian
          </span>
          <span className="mt-1 block text-sm font-semibold">{location.examDate}</span>
        </span>
        <span className={selected ? "rounded-2xl bg-white/12 p-3" : "rounded-2xl bg-[var(--ut-yellow-soft)] p-3"}>
          <span className={selected ? "block text-xs text-white/70" : "block text-xs text-[var(--ut-muted)]"}>
            Kuota Ruang
          </span>
          <span className="mt-1 block text-sm font-semibold">{location.availableRooms} ruang tersedia</span>
        </span>
      </span>
    </button>
  );
}
