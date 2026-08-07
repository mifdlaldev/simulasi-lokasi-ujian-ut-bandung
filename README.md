# Simulasi Pemilihan Lokasi Ujian UT Bandung

Prototype frontend untuk mensimulasikan alur mahasiswa Universitas Terbuka Bandung memilih lokasi ujian. Aplikasi ini memakai data dummy lokal, state React lokal, dan tampilan wizard bertahap.

## Lingkup Prototype

Prototype ini berisi:

- formulir identitas mahasiswa;
- pencarian dan pemilihan kabupaten/kota;
- daftar sekolah lokasi ujian berdasarkan wilayah;
- detail lokasi, tanggal ujian, kuota ruang, alamat, foto placeholder, dan tautan peta;
- review pilihan, pernyataan konfirmasi, dan layar sukses.

Prototype ini **bukan** aplikasi produksi. Tidak ada backend, database, autentikasi, admin panel, mutasi kuota, notifikasi, integrasi data resmi UT, atau pengambilan data langsung dari sistem UT.

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan server development:

```bash
npm run dev
```

Build versi produksi lokal:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview -- --host 127.0.0.1
```

## Data Dummy

Data wilayah dan sekolah lokasi ujian berada di:

```text
src/data/examLocations.ts
```

Untuk mengganti data dummy:

1. Ubah daftar `examRegions` untuk wilayah kabupaten/kota.
2. Ubah daftar `examLocations` untuk sekolah lokasi ujian.
3. Pastikan `regionId` pada setiap lokasi sesuai dengan `id` wilayah.
4. Gunakan `photoUrl` lokal atau URL gambar stabil untuk kebutuhan prototype.
5. Gunakan `mapUrl` berupa tautan peta biasa; tidak diperlukan API key.

## Catatan Testing

Sesuai preferensi awal, project ini tidak menambahkan setup automated testing pada fase development awal. Verifikasi dilakukan lewat build dan smoke check manual/browser. Testing otomatis atau debugging lanjutan bisa ditambahkan nanti jika diminta.

## Pedoman untuk Agen AI

Repo ini memakai **AGENTS.md** sebagai pedoman wajib bagi agen AI (Copilot, Cursor, Claude, OpenCode, dsb.) sebelum mengerjakan kode di repo ini.

**Aturan utama: AI DILARANG HALUSINASI.** Ringkasan:

- Setiap klaim tentang kode/data/fitur wajib berdasar pembacaan file aktual. Dilarang menebak atau mengarang.
- Dilarang mengklaim fitur yang tidak ada di codebase (backend, database, autentikasi, admin panel, mutasi kuota, integrasi resmi UT — semuanya **tidak ada**).
- Dilarang mengklaim build/test lulus tanpa benar-benar menjalankan `npm run build`.
- Dilarang mengarang hasil verifikasi atau catatan evidence.
- Dilarang menambah dependency/integrasi eksternal tanpa konfirmasi user.
- Jika tidak yakin → baca file. Jika tidak ada → nyatakan "tidak ada / tidak ditemukan di codebase".

Baca `AGENTS.md` untuk aturan lengkap, peta struktur, konvensi, dan anti-pattern proyek ini.

## Struktur Penting

- `src/App.tsx` — orkestrasi wizard dan navigasi langkah.
- `src/state/validation.ts` — aturan validasi langkah.
- `src/components/steps/` — komponen tiap langkah wizard.
- `src/components/layout/` — shell, frame, dan ringkasan pilihan.
- `src/components/ui/` — primitive UI bersama.
- `.sisyphus/evidence/` — catatan evidence hasil verifikasi agent.
