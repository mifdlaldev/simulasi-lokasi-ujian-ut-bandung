export const appCopy = {
  title: "Simulasi Pemilihan Lokasi Ujian UT Bandung",
  eyebrow: "Universitas Terbuka Bandung",
  subtitle:
    "Pilih wilayah, lokasi sekolah, dan tinjau detail pelaksanaan ujian melalui alur simulasi bertahap.",
  prototypeDisclaimer:
    "Data wilayah, sekolah, tanggal, kuota, alamat, foto, dan peta pada prototype ini adalah data dummy/contoh untuk kebutuhan simulasi. Data resmi dapat diganti ketika tersedia.",
  identityIntro:
    "Lengkapi identitas mahasiswa sebelum memilih wilayah dan lokasi ujian.",
  regionIntro:
    "Cari kabupaten atau kota dalam wilayah kerja UT Bandung untuk menampilkan lokasi ujian yang tersedia.",
  locationIntro:
    "Pilih sekolah lokasi ujian yang sesuai berdasarkan tanggal pelaksanaan, kuota ruang, dan alamat.",
  detailIntro:
    "Periksa foto, alamat lengkap, peta, jadwal, dan kuota ruang sebelum melanjutkan.",
  reviewIntro:
    "Tinjau kembali seluruh data pilihan Anda sebelum melakukan konfirmasi final simulasi.",
  acknowledgement:
    "Saya menyatakan data yang dipilih pada simulasi ini sudah sesuai untuk kebutuhan prototype.",
  successTitle: "Konfirmasi Simulasi Berhasil",
  successDescription:
    "Pilihan lokasi ujian telah dikonfirmasi dalam mode simulasi. Konfirmasi ini belum terhubung ke sistem resmi UT.",
};

export const stepLabels = {
  identity: "Identitas",
  region: "Wilayah",
  location: "Lokasi Ujian",
  detail: "Detail Sekolah",
  review: "Konfirmasi",
  success: "Selesai",
};

export const wizardCopy = {
  back: "Kembali",
  next: "Lanjutkan",
  frameEyebrow: "Wizard Pemilihan Lokasi",
  skipToContent: "Lewati ke isi wizard",
  requiredSrOnly: " wajib diisi",
};

export const stepperCopy = {
  navLabel: "Tahapan pemilihan lokasi ujian",
  statusCurrent: "Sedang berlangsung",
  statusCompleted: "Selesai",
  statusUpcoming: "Berikutnya",
  stateCurrent: "langkah aktif",
  stateCompleted: "sudah selesai",
  stateUpcoming: "belum dimulai",
};

export const summaryCopy = {
  ariaLabel: "Ringkasan pilihan simulasi",
  title: "Ringkasan Pilihan",
  statusTitle: "Status Simulasi",
  student: "Mahasiswa",
  programStudy: "Program Studi",
  contact: "Kontak",
  region: "Wilayah",
  school: "Sekolah",
  date: "Tanggal",
  studentFallback: "Nama belum diisi",
  programStudyFallback: "Belum memilih program studi",
  contactFallback: "Belum ada kontak",
  regionFallback: "Belum memilih wilayah",
  schoolFallback: "Belum memilih sekolah",
  scheduleFallback: "Menunggu pilihan lokasi",
  footnote:
    "Ringkasan ini bersifat informatif dan mengikuti data lokal wizard tanpa mengubah pilihan.",
};

export const mobileHeaderCopy = {
  stepLabel: (current: number, total: number) =>
    `Langkah ${current} dari ${total}`,
  summaryToggle: "Lihat ringkasan pilihan",
};

export const identityStepCopy = {
  nim: {
    label: "NIM",
    helper: "Masukkan NIM 9 digit sesuai data akademik UT.",
    placeholder: "Contoh: 042123456",
  },
  name: {
    label: "Nama Mahasiswa",
    helper: "Gunakan nama lengkap untuk memudahkan pengecekan simulasi.",
    placeholder: "Nama lengkap",
  },
  programStudy: {
    label: "Program Studi",
    searchPlaceholder: "Cari Manajemen, PGSD, Sistem Informasi...",
    helper:
      "Ketik nama program studi/fakultas, atau buka fakultas untuk melihat daftar prodi.",
    ariaResults: "Hasil pencarian program studi berdasarkan fakultas",
  },
  email: {
    label: "Email",
    helper: "Masukkan alamat Gmail aktif.",
    placeholder: "nama@gmail.com",
  },
  phone: {
    label: "Nomor Telepon / HP",
    helper: "Masukkan nomor HP aktif, maksimal 12 digit.",
    placeholder: "081234567890",
  },
  selectedPrefix: "Program terpilih:",
  expand: "Buka",
  collapse: "Tutup",
  selectedLabel: "Terpilih",
  selectPrompt: (facultyCode: string) => `Pilih ${facultyCode}`,
  prodiCount: (count: number) => `${count} prodi`,
  statusFound: (count: number) => `${count} program studi ditemukan.`,
  statusNone:
    "Tidak ada program studi yang cocok dengan kata kunci tersebut.",
  statusFaculties: (count: number) =>
    `${count} fakultas tersedia. Buka fakultas untuk melihat program studi.`,
  emptyResults:
    "Program studi tidak ditemukan. Coba kata kunci lain seperti Manajemen, PGSD, Sistem Informasi, atau FKIP.",
};

export const regionStepCopy = {
  label: "Cari Kabupaten/Kota",
  ariaLabel: "Cari kabupaten atau kota lokasi ujian",
  placeholder: "Ketik Bandung, Cimahi, Garut...",
  helper: "Pilih satu wilayah untuk menampilkan sekolah lokasi ujian yang tersedia.",
  selectedPrefix: "Wilayah terpilih:",
  ariaResults: "Hasil pencarian wilayah",
  availability: (locationCount: number, availableRooms: number) =>
    `${locationCount} lokasi ujian · ${availableRooms} ruang tersedia`,
  available: "Tersedia",
  quotaFull: "Kuota penuh",
  choose: "Pilih",
  chosen: "Terpilih",
  emptyResults:
    "Wilayah tidak ditemukan. Coba kata kunci lain seperti Bandung, Cimahi, Sumedang, atau Garut.",
};

export const locationStepCopy = {
  fallbackRegionName: "wilayah yang dipilih",
  noRegion:
    "Pilih kabupaten/kota terlebih dahulu untuk melihat daftar sekolah lokasi ujian.",
  noLocations: "Belum ada lokasi ujian dummy untuk wilayah yang dipilih.",
  availability: (
    regionName: string,
    locationCount: number,
    roomCount: number,
    seatCount: number,
  ) =>
    `${regionName} memiliki ${locationCount} lokasi, ${roomCount} ruang, dan ±${seatCount} kursi tersedia.`,
  quotaFull: (regionName: string) =>
    `Kuota penuh. Semua lokasi ujian di ${regionName} sudah penuh. Silakan kembali dan pilih wilayah terdekat lain.`,
};

export const locationCardCopy = {
  selected: "Lokasi dipilih",
  available: "Tersedia",
  quotaFull: "Kuota penuh",
  examDate: "Tanggal Ujian",
  quota: "Kuota",
  rooms: (count: number) => `${count} ruang`,
  seats: (count: number) => `±${count} kursi tersedia`,
};

export const detailStepCopy = {
  empty:
    "Pilih sekolah lokasi ujian terlebih dahulu untuk melihat detail alamat, foto, dan peta.",
  sectionTitle: "Detail Sekolah",
  examDate: "Tanggal Ujian",
  quota: "Kuota Ruang",
  roomsAvailable: (count: number) => `${count} ruang tersedia`,
  addressTitle: "Alamat Lengkap",
  photoCaption:
    "Foto contoh sekolah untuk kebutuhan prototype lokasi ujian.",
  previewTitle: (schoolName: string) => `Preview foto ${schoolName}`,
  close: "Tutup",
  mainPhotoAria: (schoolName: string) =>
    `Lihat preview besar foto utama ${schoolName}`,
  mainPhotoAlt: (schoolName: string) => `Foto contoh ${schoolName}`,
  galleryPhotoAria: (index: number, schoolName: string) =>
    `Lihat preview besar foto pendukung ${index + 1} ${schoolName}`,
  galleryPhotoAlt: (index: number, schoolName: string) =>
    `Foto pendukung ${index + 1} ${schoolName}`,
  previewAlt: (schoolName: string) => `Preview besar ${schoolName}`,
  prevAria: "Lihat foto sebelumnya",
  nextAria: "Lihat foto berikutnya",
};

export const mapCopy = {
  title: "Pratinjau Peta",
  iframeTitle: (label: string) => `Pratinjau peta ${label}`,
  note:
    "Pratinjau memakai OpenStreetMap gratis. Koordinat bersifat dummy/prototype dan dapat diganti ketika data lokasi final tersedia.",
  openInGoogleMaps: "Buka di Google Maps",
};

export const reviewStepCopy = {
  rows: {
    nim: "NIM",
    name: "Nama Mahasiswa",
    programStudy: "Program Studi",
    contact: "Kontak",
    region: "Wilayah",
    school: "Sekolah Lokasi Ujian",
    examDate: "Tanggal Ujian",
    quota: "Kuota Ruang",
  },
  valueFallback: "Belum diisi",
  quotaValue: (rooms: number) => `${rooms} ruang tersedia`,
  addressTitle: "Alamat Lokasi",
  noLocationAddress: "Belum ada sekolah lokasi ujian yang dipilih.",
  checkboxHint:
    "Centang pernyataan untuk mengaktifkan tombol konfirmasi final.",
  confirmButton: "Konfirmasi Final Simulasi",
  modalEyebrow: "Konfirmasi Akhir",
  modalTitle: "Pastikan pilihan simulasi sudah sesuai",
  modalDescription:
    "Anda akan menyelesaikan simulasi pemilihan lokasi ujian dengan sekolah, wilayah, tanggal, kuota, alamat, foto, dan peta yang sudah ditinjau. Data ini masih bersifat dummy untuk kebutuhan prototype.",
  modalSchool: "Sekolah",
  modalSchoolFallback: "Belum memilih sekolah",
  modalSchedule: "Tanggal Ujian",
  modalScheduleFallback: "Belum memilih jadwal",
  modalCancel: "Periksa Kembali",
  modalConfirm: "Ya, Konfirmasi Sekarang",
};

export const validationCopy = {
  nimRequired: "NIM wajib diisi.",
  nimDigitsOnly: "NIM hanya boleh berisi angka.",
  nimLength: "NIM harus terdiri dari 9 digit angka.",
  nameRequired: "Nama mahasiswa wajib diisi.",
  programStudyRequired: "Program studi wajib diisi.",
  phoneDigitsOnly: "Nomor HP hanya boleh berisi angka.",
  phoneMaxLength: "Nomor HP maksimal 12 digit.",
  emailInvalid:
    "Email harus menggunakan alamat Gmail, contoh nama@gmail.com.",
  contactRequiredEmail: "Isi email atau nomor HP sebagai kontak.",
  contactRequiredPhone: "Isi nomor HP atau email sebagai kontak.",
  identityIncomplete: "Lengkapi identitas mahasiswa terlebih dahulu.",
  regionRequired: "Pilih kabupaten/kota wilayah ujian terlebih dahulu.",
  regionFull: (regionName: string) =>
    `Semua lokasi ujian di ${regionName} sudah penuh. Silakan pilih wilayah terdekat lain.`,
  selectedLocationFull:
    "Lokasi ujian yang dipilih sudah penuh. Silakan pilih lokasi lain.",
  locationRequired: "Pilih sekolah lokasi ujian terlebih dahulu.",
  detailRequiresLocation: "Detail lokasi membutuhkan pilihan sekolah ujian.",
  acknowledgementRequired:
    "Centang pernyataan sebelum konfirmasi final.",
};

export const successStepCopy = {
  selectedLocationPrefix: "Lokasi yang dipilih:",
  footnote:
    "Simpan ringkasan ini sebagai gambaran alur prototype. Data belum masuk ke sistem resmi Universitas Terbuka.",
  resetButton: "Ulangi Simulasi",
};

