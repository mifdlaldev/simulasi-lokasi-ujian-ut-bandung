export default function App() {
  return (
    <main className="min-h-screen bg-[var(--ut-surface)] px-6 py-10 text-[var(--ut-ink)]">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--ut-border)] bg-white p-8 shadow-[var(--ut-shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--ut-blue)]">
          Universitas Terbuka Bandung
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ut-blue)]">
          Simulasi Pemilihan Lokasi Ujian
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--ut-muted)]">
          Fondasi prototype sudah siap. Alur wizard pemilihan lokasi ujian akan
          mulai dirangkai pada wave berikutnya.
        </p>
      </section>
    </main>
  );
}
