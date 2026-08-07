# AGENTS.md — Pedoman Agen AI

**Branch:** `develop`
**Commit:** `de00357`
**Terakhir diperbarui:** 2026-08-07

Dokumen ini wajib dibaca agen AI sebelum menyentuh repo ini. Pelanggaran aturan di bawah = hasil kerja ditolak.

---

## 1. ATURAN UTAMA: DILARANG HALUSINASI (TANPA KOMPROMI)

> **Aturan keras, bukan saran.** Agen AI DILARANG mengarang fakta apa pun tentang proyek ini.

1. **Setiap klaim wajib berdasar pembacaan file aktual.** Baca file sebelum bicara. Jangan menebak, mengarang, atau berasumsi dari pola proyek lain.
2. **DILARANG mengarang** file, direktori, fungsi, variabel, komponen, field data, nama prodi, wilayah, sekolah, URL, atau API key yang tidak terbaca di codebase.
3. **DILARANG mengklaim fitur yang tidak ada.** Proyek ini prototype frontend-only. Tidak ada backend, database, autentikasi, admin panel, mutasi kuota, notifikasi, atau integrasi API resmi UT.
4. **DILARANG mengklaim build/test lulus tanpa menjalankan perintah aktual.** Klaim "build sukses" wajib didukung output `npm run build` yang benar-benar dijalankan.
5. **DILARANG mengarang hasil verifikasi** atau menambah catatan ke `.sisyphus/evidence/` tanpa menjalankan verifikasi sungguhan.
6. **DILARANG menambah dependency, package, atau integrasi eksternal** tanpa konfirmasi eksplisit user.
7. **Jika tidak yakin → BACA file.** Jika setelah dibaca tetap tidak ada → nyatakan eksplisit: "tidak ada / tidak ditemukan di codebase".
8. **Sebut path file untuk setiap klaim kode.** Klaim tanpa path = tidak diverifikasi.

Konsekuensi: output yang mengandung halusinasi dianggap gagal dan harus dikerjakan ulang dari nol.

---

## 2. OVERVIEW

Prototype frontend simulasi pemilihan lokasi ujian Universitas Terbuka Bandung.
SPA wizard 6 langkah: React 19 + Vite 7 + TypeScript 5.8 + Tailwind CSS 4. Data dummy statis lokal. Tanpa backend/router/state library eksternal.

## 3. STRUCTURE

```
src/
├── main.tsx              # entry React, render <App/>
├── App.tsx               # orkestrasi wizard: useReducer + switch step + gate validasi
├── components/
│   ├── steps/            # 6 step wizard (StudentIdentity → RegionSearch → LocationSelection → LocationDetail → ReviewConfirmation → Success)
│   ├── layout/           # AppShell, WizardFrame, SelectionSummary, MobileStepHeader
│   ├── location/         # LocationCard, MapPreview
│   └── ui/               # Button, FormField, Stepper
├── content/              # copy.ts (SEMUA teks UI), brand.ts (warna UT)
├── data/                 # examLocations.ts, programStudies.ts (data dummy)
├── state/                # wizardReducer.ts, validation.ts (pure functions)
├── styles/               # theme.css (design tokens)
├── types/                # wizard.ts, location.ts
└── utils/                # quota.ts
```

## 4. WHERE TO LOOK

| Task | Location |
|------|----------|
| Ubah teks UI | `src/content/copy.ts` — jangan hardcode string di komponen |
| Ubah warna/brand | `src/content/brand.ts` — UT blue `#034694`, yellow `#FFF200` |
| Ubah data wilayah/sekolah | `src/data/examLocations.ts` — 6 region, 12 lokasi |
| Ubah data program studi | `src/data/programStudies.ts` — 5 fakultas, 47+ prodi |
| Ubah alur wizard/navigasi | `src/App.tsx` + `src/state/wizardReducer.ts` |
| Ubah aturan validasi | `src/state/validation.ts` — NIM 9 digit, email Gmail |
| Ubah tipe | `src/types/wizard.ts`, `src/types/location.ts` |
| Komponen step | `src/components/steps/` |
| Komponen layout | `src/components/layout/` |
| Primitive UI | `src/components/ui/` |

## 5. CONVENTIONS

- **Copy tersentral**: semua teks UI di `src/content/copy.ts`. String UI baru wajib masuk copy.ts.
- **Komponen presentational**: komponen menerima props, tidak pegang state global sendiri. State via `App.tsx` (`useReducer`).
- **Validasi pure function** di `src/state/validation.ts`, dipanggil sebelum navigasi "Lanjutkan".
- **Bahasa UI**: Indonesia.
- **Aksesibilitas wajib**: `aria-live`, `aria-invalid`, `focus-visible`, navigasi keyboard (lightbox: Esc/panah), `prefers-reduced-motion`, `sr-only`.
- **Tailwind 4**: class inline di JSX, bukan `@apply`.

## 6. ANTI-PATTERNS (PROYEK INI — DILARANG)

- Menambah backend, database, autentikasi, admin panel, mutasi kuota, notifikasi, integrasi data resmi UT. **Di luar scope prototype** (guardrail dari rencana awal).
- Menganggap kuota bisa berubah runtime. Kuota = data statis dummy.
- Klaim `mapUrl` butuh API key. `MapPreview` pakai embed OpenStreetMap tanpa key; `mapUrl` tautan Google Maps biasa.
- Menambah automated test framework tanpa persetujuan user. README "Catatan Testing" menyatakan ini disengaja.
- Menyebut `tsconfig.json`/eslint/CI ada. **Tidak ada di repo.**
- Memperlakukan data dummy sebagai data resmi UT.

## 7. COMMANDS

```bash
npm install                     # install dependency
npm run dev                     # dev server (host 127.0.0.1)
npm run build                   # build produksi — WAJIB dijalankan untuk verifikasi
npm run preview -- --host 127.0.0.1
```

## 8. NOTES / GOTCHAS

- Repo tanpa `tsconfig.json` — type-check via editor/`vite build` (esbuild).
- Tanpa automated test. Verifikasi = `npm run build` + smoke check manual/browser.
- `src/data/examLocations.ts`: `photoUrl` file lokal di `public/`, `mapUrl` tanpa API key, `regionId` harus cocok dengan `id` di `examRegions`.
- Branch aktif: `develop`. Branch `main` tertinggal (tidak up-to-date) — jangan asumsikan `main` = kode terbaru.
- Tanpa license file di repo.
- Catatan verifikasi agent historis: `.sisyphus/evidence/`. Hanya tambahkan evidence hasil verifikasi sungguhan (lihat Aturan Utama #5).
