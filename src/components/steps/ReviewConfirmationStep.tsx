import { useEffect, useState } from "react";
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
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (!confirmationModalOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setConfirmationModalOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [confirmationModalOpen]);

  function handleFinalConfirm() {
    setConfirmationModalOpen(false);
    onConfirm();
  }

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

      <Button className="w-full" disabled={!acknowledgementAccepted} onClick={() => setConfirmationModalOpen(true)}>
        Konfirmasi Final Simulasi
      </Button>

      {confirmationModalOpen ? (
        <div
          aria-describedby="final-confirmation-description"
          aria-labelledby="final-confirmation-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(3,22,50,0.78)] p-4 backdrop-blur-sm"
          onClick={() => setConfirmationModalOpen(false)}
          role="dialog"
        >
          <section
            className="w-full max-w-xl rounded-[2rem] border border-white/30 bg-white p-6 shadow-[0_28px_90px_rgba(0,0,0,0.32)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
              Konfirmasi Akhir
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[var(--ut-blue-deep)]" id="final-confirmation-title">
              Pastikan pilihan simulasi sudah sesuai
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ut-muted)]" id="final-confirmation-description">
              Anda akan menyelesaikan simulasi pemilihan lokasi ujian dengan sekolah, wilayah,
              tanggal, kuota, alamat, foto, dan peta yang sudah ditinjau. Data ini masih bersifat
              dummy untuk kebutuhan prototype.
            </p>

            <dl className="mt-5 grid gap-3 rounded-[1.5rem] bg-[var(--ut-blue-soft)] p-4 text-sm text-[var(--ut-blue-deep)]">
              <div>
                <dt className="font-semibold">Sekolah</dt>
                <dd>{location?.schoolName ?? "Belum memilih sekolah"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Tanggal Ujian</dt>
                <dd>{location ? `${location.examDate} · ${location.examTime}` : "Belum memilih jadwal"}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="rounded-full border border-[var(--ut-border-strong)] bg-white px-5 py-3 text-sm font-bold text-[var(--ut-blue-deep)] transition hover:border-[var(--ut-blue)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={() => setConfirmationModalOpen(false)}
                type="button"
              >
                Periksa Kembali
              </button>
              <button
                className="rounded-full bg-[var(--ut-blue)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(0,80,158,0.22)] transition hover:bg-[var(--ut-blue-deep)] focus-visible:shadow-[var(--ut-focus-ring)]"
                onClick={handleFinalConfirm}
                type="button"
              >
                Ya, Konfirmasi Sekarang
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
