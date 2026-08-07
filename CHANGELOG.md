# Changelog

Semua perubahan penting pada project ini dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/),
dan versioning mengikuti [Semantic Versioning](https://semver.org/lang/id/).

## [0.2.0] - 2026-08-08

### Ditambahkan

- `AGENTS.md` — pedoman agen AI dengan aturan keras anti-halusinasi.
- `LICENSE` — lisensi Apache-2.0.
- `CHANGELOG.md`, `.nvmrc`, `.gitattributes`.
- `docs/screenshots/` — 6 tangkapan layar alur wizard untuk README.
- README ditulis ulang menjadi dokumentasi profesional (badge, fitur, screenshot, struktur, instalasi, lisensi).

### Diubah

- Tambah `tsconfig.json` + script `npm run typecheck` (`tsc --noEmit`) — type-check kini jadi bagian pipeline, tidak lagi hanya andalkan editor.
- Tambah ESLint (`eslint.config.js`, flat config + typescript-eslint + react-hooks) + script `npm run lint`.
- Tambah unit test Vitest untuk `src/state/validation.ts` dan `src/state/wizardReducer.ts` (28 kasus) + script `npm run test`.
- Tambah CI GitHub Actions (`.github/workflows/ci.yml`): quality gate `npm ci` → typecheck → lint → test → build pada setiap push/PR ke `main`.
- Semua string UI tersentral ke `src/content/copy.ts` (sebelumnya ~70 string tersebar di komponen; kini termasuk pesan validasi di `src/state/validation.ts`).
- Dialog & lightbox dapat focus management (`src/hooks/useDialogFocus.ts`): focus pindah ke dialog saat buka, trap Tab, kembali ke pemicu saat tutup.
- `.gitignore` diperluas; direktori artefak agent (`.omo/`, `.sisyphus/`) di-untrack dari git.
- `src/utils/cx.ts` dan `src/components/ui/SummaryItem.tsx` dijadikan komponen bersama (menghapus duplikasi).
- Data dummy `SMAN 5 Bandung` diperbaiki (alamat/koordinat sebelumnya menyalin SMAN 3 Bandung).

### Dihapus

- Kode mati: `ExamLocationSelection`, field `finalConfirmed`, helper tak terpakai, export tak terpakai di `brand.ts`/`validation.ts`/`wizardReducer.ts`/`examLocations.ts`.
- CSS mati: `--ut-white`, `--ut-success`, `.ut-yellow-accent`, aset `public/school-placeholder.svg`.

## [0.1.0] - 2026-05-16

Versi awal prototype.

### Ditambahkan

- Wizard 6 langkah: identitas mahasiswa, pencarian wilayah, daftar lokasi ujian, detail sekolah, review & konfirmasi, layar sukses.
- Stack: React 19, Vite 7, TypeScript 5.8, Tailwind CSS 4.
- Data dummy: 6 wilayah, 12 lokasi sekolah, 47+ program studi.
- Validasi identitas (NIM 9 digit, email Gmail, nomor HP), kuota ruang statis, galeri foto + lightbox, embed peta OpenStreetMap tanpa API key.
- Aksesibilitas: `aria-live`, `aria-invalid`, navigasi keyboard lightbox, `prefers-reduced-motion`, `sr-only`.
- README awal dengan instruksi menjalankan dan catatan testing.
