import type { ExamLocation } from "../../types/location";
import { MapPreview } from "../location/MapPreview";

export interface LocationDetailStepProps {
  location: ExamLocation | null;
}

export function LocationDetailStep({ location }: LocationDetailStepProps) {
  if (!location) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--ut-border-strong)] bg-white px-5 py-6 text-[var(--ut-muted)]">
        Pilih sekolah lokasi ujian terlebih dahulu untuk melihat detail alamat, foto, dan peta.
      </p>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <figure className="overflow-hidden rounded-[1.75rem] border border-[var(--ut-border)] bg-white shadow-[var(--ut-shadow-card)]">
        <img
          alt={`Foto ilustrasi ${location.schoolName}`}
          className="h-72 w-full object-cover"
          src={location.photoUrl}
        />
        <figcaption className="border-t border-[var(--ut-border)] px-5 py-4 text-sm text-[var(--ut-muted)]">
          Foto placeholder untuk kebutuhan prototype lokasi ujian.
        </figcaption>
      </figure>

      <div className="space-y-5">
        <section className="rounded-[1.75rem] border border-[var(--ut-border)] bg-white p-5 shadow-[0_14px_32px_rgba(16,32,51,0.08)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
            Detail Sekolah
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--ut-blue-deep)]">{location.schoolName}</h3>
          <p className="mt-3 text-base leading-7 text-[var(--ut-muted)]">{location.description}</p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ut-blue-soft)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">
                Tanggal Ujian
              </dt>
              <dd className="mt-1 font-bold text-[var(--ut-blue-deep)]">{location.examDate}</dd>
            </div>
            <div className="rounded-2xl bg-[var(--ut-yellow-soft)] p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">
                Kuota Ruang
              </dt>
              <dd className="mt-1 font-bold text-[var(--ut-blue-deep)]">
                {location.availableRooms} ruang tersedia
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-[1.75rem] border border-[var(--ut-border)] bg-white p-5 shadow-[0_14px_32px_rgba(16,32,51,0.08)]">
          <h3 className="text-lg font-bold text-[var(--ut-blue-deep)]">Alamat Lengkap</h3>
          <p className="mt-2 text-base leading-7 text-[var(--ut-muted)]">{location.address}</p>
        </section>

        <MapPreview label={location.schoolName} mapUrl={location.mapUrl} />
      </div>
    </div>
  );
}
