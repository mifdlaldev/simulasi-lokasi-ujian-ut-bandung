import { appCopy } from "../../content/copy";
import type { ExamLocation, ExamRegion, StudentIdentity } from "../../types/location";
import { Button } from "../ui/Button";

export interface ReviewConfirmationStepProps {
  acknowledgementAccepted: boolean;
  identity: StudentIdentity;
  location: ExamLocation | null;
  onAcknowledgementChange: (accepted: boolean) => void;
  onConfirm: () => void;
  region: ExamRegion | null;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-[var(--ut-blue-deep)]">{value || "Belum diisi"}</dd>
    </div>
  );
}

export function ReviewConfirmationStep({
  acknowledgementAccepted,
  identity,
  location,
  onAcknowledgementChange,
  onConfirm,
  region,
}: ReviewConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-2">
        <SummaryRow label="NIM" value={identity.nim} />
        <SummaryRow label="Nama Mahasiswa" value={identity.name} />
        <SummaryRow label="Program Studi" value={identity.programStudy} />
        <SummaryRow label="Kontak" value={identity.email || identity.phone} />
        <SummaryRow label="Wilayah" value={region?.name ?? ""} />
        <SummaryRow label="Sekolah Lokasi Ujian" value={location?.schoolName ?? ""} />
        <SummaryRow label="Tanggal Ujian" value={location?.examDate ?? ""} />
        <SummaryRow
          label="Kuota Ruang"
          value={location ? `${location.availableRooms} ruang tersedia` : ""}
        />
      </dl>

      <section className="rounded-[1.5rem] border border-[var(--ut-border)] bg-[var(--ut-surface)] p-5">
        <h3 className="text-lg font-bold text-[var(--ut-blue-deep)]">Alamat Lokasi</h3>
        <p className="mt-2 text-base leading-7 text-[var(--ut-muted)]">
          {location?.address ?? "Belum ada sekolah lokasi ujian yang dipilih."}
        </p>
      </section>

      <label className="flex gap-3 rounded-[1.5rem] border border-[var(--ut-border-strong)] bg-white p-4 text-sm leading-6 text-[var(--ut-ink)]">
        <input
          checked={acknowledgementAccepted}
          className="mt-1 size-5 shrink-0 accent-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]"
          onChange={(event) => onAcknowledgementChange(event.target.checked)}
          type="checkbox"
        />
        <span>{appCopy.acknowledgement}</span>
      </label>
      {!acknowledgementAccepted ? (
        <p className="-mt-3 text-sm font-medium leading-6 text-[var(--ut-danger)]">
          Centang pernyataan untuk mengaktifkan tombol konfirmasi final.
        </p>
      ) : null}

      <div className="rounded-[1.5rem] border border-[var(--ut-yellow)] bg-[var(--ut-yellow-soft)] p-4 text-sm leading-6 text-[var(--ut-blue-deep)]">
        {appCopy.prototypeDisclaimer}
      </div>

      <Button disabled={!acknowledgementAccepted} onClick={onConfirm}>
        Konfirmasi Final Simulasi
      </Button>
    </div>
  );
}
