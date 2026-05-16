export interface ProgramStudy {
  id: string;
  name: string;
}

export interface ProgramStudyGroup {
  facultyCode: string;
  facultyName: string;
  programs: ProgramStudy[];
}

// Data lokal prototype dinormalisasi dari sumber resmi UT Pusat/Fakultas/SPs.
// Setiap nama prodi memuat jenjang agar mudah dibedakan di selector.
export const programStudyGroups: ProgramStudyGroup[] = [
  {
    facultyCode: "FKIP",
    facultyName: "Fakultas Keguruan dan Ilmu Pendidikan",
    programs: [
      {
        id: "fkip-pendidikan-bahasa-sastra-indonesia-s1",
        name: "Pendidikan Bahasa dan Sastra Indonesia (S1)",
      },
      {
        id: "fkip-pendidikan-bahasa-inggris-s1",
        name: "Pendidikan Bahasa Inggris (S1)",
      },
      { id: "fkip-pendidikan-biologi-s1", name: "Pendidikan Biologi (S1)" },
      { id: "fkip-pendidikan-fisika-s1", name: "Pendidikan Fisika (S1)" },
      { id: "fkip-pendidikan-kimia-s1", name: "Pendidikan Kimia (S1)" },
      {
        id: "fkip-pendidikan-matematika-s1",
        name: "Pendidikan Matematika (S1)",
      },
      { id: "fkip-pendidikan-ekonomi-s1", name: "Pendidikan Ekonomi (S1)" },
      {
        id: "fkip-ppkn-s1",
        name: "Pendidikan Pancasila dan Kewarganegaraan (S1)",
      },
      {
        id: "fkip-teknologi-pendidikan-s1",
        name: "Teknologi Pendidikan (S1)",
      },
      {
        id: "fkip-pgsd-s1",
        name: "Pendidikan Guru Sekolah Dasar (PGSD) (S1)",
      },
      {
        id: "fkip-pgpaud-s1",
        name: "Pendidikan Guru Pendidikan Anak Usia Dini (PGPAUD) (S1)",
      },
      {
        id: "fkip-pendidikan-agama-islam-s1",
        name: "Pendidikan Agama Islam (PAI) (S1)",
      },
    ],
  },
  {
    facultyCode: "FEB",
    facultyName: "Fakultas Ekonomi dan Bisnis",
    programs: [
      { id: "feb-manajemen-s1", name: "Manajemen (S1)" },
      { id: "feb-ekonomi-pembangunan-s1", name: "Ekonomi Pembangunan (S1)" },
      { id: "feb-ekonomi-syariah-s1", name: "Ekonomi Syariah (S1)" },
      { id: "feb-akuntansi-s1", name: "Akuntansi (S1)" },
      {
        id: "feb-akuntansi-keuangan-publik-s1",
        name: "Akuntansi Keuangan Publik (S1)",
      },
      { id: "feb-pariwisata-s1", name: "Pariwisata (S1)" },
      { id: "feb-kewirausahaan-s1", name: "Kewirausahaan (S1)" },
    ],
  },
  {
    facultyCode: "FST",
    facultyName: "Fakultas Sains dan Teknologi",
    programs: [
      { id: "fst-statistika-s1", name: "Statistika (S1)" },
      { id: "fst-matematika-s1", name: "Matematika (S1)" },
      { id: "fst-biologi-s1", name: "Biologi (S1)" },
      { id: "fst-teknologi-pangan-s1", name: "Teknologi Pangan (S1)" },
      { id: "fst-agribisnis-s1", name: "Agribisnis (S1)" },
      {
        id: "fst-perencanaan-wilayah-kota-s1",
        name: "Perencanaan Wilayah dan Kota (S1)",
      },
      { id: "fst-sistem-informasi-s1", name: "Sistem Informasi (S1)" },
      { id: "fst-sains-data-s1", name: "Sains Data (S1)" },
    ],
  },
  {
    facultyCode: "FHISIP",
    facultyName: "Fakultas Hukum, Ilmu Sosial, dan Ilmu Politik",
    programs: [
      { id: "fhisip-perpajakan-d3", name: "Perpajakan (D3)" },
      { id: "fhisip-kearsipan-d4", name: "Kearsipan (D4)" },
      { id: "fhisip-administrasi-publik-s1", name: "Administrasi Publik (S1)" },
      { id: "fhisip-administrasi-bisnis-s1", name: "Administrasi Bisnis (S1)" },
      { id: "fhisip-ilmu-pemerintahan-s1", name: "Ilmu Pemerintahan (S1)" },
      { id: "fhisip-ilmu-komunikasi-s1", name: "Ilmu Komunikasi (S1)" },
      {
        id: "fhisip-ilmu-perpustakaan-s1",
        name: "Ilmu Perpustakaan (S1)",
      },
      { id: "fhisip-sosiologi-s1", name: "Sosiologi (S1)" },
      { id: "fhisip-sastra-inggris-s1", name: "Sastra Inggris (S1)" },
      { id: "fhisip-ilmu-hukum-s1", name: "Ilmu Hukum (S1)" },
      { id: "fhisip-perpajakan-s1", name: "Perpajakan (S1)" },
    ],
  },
  {
    facultyCode: "SPs",
    facultyName: "Sekolah Pascasarjana",
    programs: [
      { id: "sps-magister-manajemen-s2", name: "Magister Manajemen (S2)" },
      {
        id: "sps-magister-ilmu-administrasi-publik-s2",
        name: "Magister Ilmu Administrasi Publik bidang minat Administrasi Publik (S2)",
      },
      {
        id: "sps-magister-pendidikan-bahasa-inggris-s2",
        name: "Magister Pendidikan Bahasa Inggris (S2)",
      },
      {
        id: "sps-magister-pendidikan-matematika-s2",
        name: "Magister Pendidikan Matematika (S2)",
      },
      {
        id: "sps-magister-pendidikan-dasar-s2",
        name: "Magister Pendidikan Dasar (S2)",
      },
      {
        id: "sps-magister-pendidikan-anak-usia-dini-s2",
        name: "Magister Pendidikan Anak Usia Dini (S2)",
      },
      {
        id: "sps-magister-manajemen-perikanan-s2",
        name: "Magister Manajemen Perikanan (S2)",
      },
      {
        id: "sps-magister-studi-lingkungan-s2",
        name: "Magister Studi Lingkungan (S2)",
      },
      { id: "sps-magister-hukum-s2", name: "Magister Hukum (S2)" },
      {
        id: "sps-magister-teknologi-pendidikan-s2",
        name: "Magister Teknologi Pendidikan (S2)",
      },
      {
        id: "sps-doktor-administrasi-publik-s3",
        name: "Doktor Administrasi Publik (S3)",
      },
      {
        id: "sps-doktor-ilmu-manajemen-s3",
        name: "Doktor Ilmu Manajemen (S3)",
      },
    ],
  },
];
