import type { ExamLocation, ExamRegion, StudentIdentity } from "../../types/location";

export interface SelectionSummaryProps {
  identity?: StudentIdentity;
  location: ExamLocation | null;
  region: ExamRegion | null;
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--ut-border)] bg-white px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ut-muted)]">{label}</dt>
      <dd className="mt-1 break-words text-sm font-semibold text-[var(--ut-blue-deep)]">{value}</dd>
    </div>
  );
}

export function SelectionSummary({ identity, location, region }: SelectionSummaryProps) {
  const contact = identity?.email || identity?.phone || "Belum ada kontak";
  const examSchedule = location
    ? `${location.examDate} · ${location.examTime}`
    : "Menunggu pilihan lokasi";

  return (
    <section aria-label="Ringkasan pilihan simulasi" className="rounded-[2rem] border border-[var(--ut-border)] bg-white p-4 shadow-[var(--ut-shadow-card)] sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ut-blue)]">
        Ringkasan Pilihan
      </p>
      <h2 className="mt-2 text-xl font-bold text-[var(--ut-blue-deep)]">Status Simulasi</h2>
      <dl className="mt-5 grid gap-3">
        <SummaryItem label="Mahasiswa" value={identity?.name || "Nama belum diisi"} />
        <SummaryItem label="Program Studi" value={identity?.programStudy || "Belum memilih program studi"} />
        <SummaryItem label="Kontak" value={contact} />
        <SummaryItem label="Wilayah" value={region?.name || "Belum memilih wilayah"} />
        <SummaryItem label="Sekolah" value={location?.schoolName || "Belum memilih sekolah"} />
        <SummaryItem label="Tanggal" value={examSchedule} />
      </dl>
      <p className="mt-5 rounded-2xl bg-[var(--ut-blue-soft)] px-4 py-3 text-sm leading-6 text-[var(--ut-blue-deep)]">
        Ringkasan ini bersifat informatif dan mengikuti data lokal wizard tanpa mengubah pilihan.
      </p>
    </section>
  );
}
