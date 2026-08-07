import { examLocations, examRegions } from "../data/examLocations";
import type { StudentIdentity } from "../types/location";
import type {
  StudentIdentityErrors,
  WizardState,
  WizardStep,
  WizardValidationResult,
} from "../types/wizard";

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function validateStudentIdentity(
  identity: StudentIdentity,
): StudentIdentityErrors {
  const errors: StudentIdentityErrors = {};
  const nim = identity.nim.trim();
  const email = identity.email.trim();
  const phone = identity.phone.trim();

  if (!nim) {
    errors.nim = "NIM wajib diisi.";
  } else if (!/^\d+$/.test(nim)) {
    errors.nim = "NIM hanya boleh berisi angka.";
  } else if (nim.length !== 9) {
    errors.nim = "NIM harus terdiri dari 9 digit angka.";
  }

  if (!hasText(identity.name)) {
    errors.name = "Nama mahasiswa wajib diisi.";
  }

  if (!hasText(identity.programStudy)) {
    errors.programStudy = "Program studi wajib diisi.";
  }

  if (phone && !/^\d+$/.test(phone)) {
    errors.phone = "Nomor HP hanya boleh berisi angka.";
  } else if (phone.length > 12) {
    errors.phone = "Nomor HP maksimal 12 digit.";
  }

  if (email && !/^[^\s@]+@gmail\.com$/i.test(email)) {
    errors.email = "Email harus menggunakan alamat Gmail, contoh nama@gmail.com.";
  }

  if (!email && !phone) {
    errors.email = "Isi email atau nomor HP sebagai kontak.";
    errors.phone = "Isi nomor HP atau email sebagai kontak.";
  }

  return errors;
}

export function canContinueFromStep(
  state: WizardState,
  step: WizardStep = state.currentStep,
): WizardValidationResult {
  const identityErrors = validateStudentIdentity(state.identity);
  const hasIdentityErrors = Object.keys(identityErrors).length > 0;

  if (step === "identity" && hasIdentityErrors) {
    return {
      canContinue: false,
      identityErrors,
      stepError: "Lengkapi identitas mahasiswa terlebih dahulu.",
    };
  }

  if (step === "region" && !hasText(state.selectedRegionId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: "Pilih kabupaten/kota wilayah ujian terlebih dahulu.",
    };
  }

  if ((step === "location" || step === "detail") && hasText(state.selectedRegionId)) {
    const selectedRegion = examRegions.find((region) => region.id === state.selectedRegionId);
    const regionLocations = examLocations.filter(
      (location) => location.regionId === state.selectedRegionId,
    );
    const availableRooms = regionLocations.reduce(
      (total, location) => total + location.availableRooms,
      0,
    );

    if (regionLocations.length > 0 && availableRooms === 0) {
      return {
        canContinue: false,
        identityErrors: {},
        stepError: `Semua lokasi ujian di ${selectedRegion?.name ?? "wilayah ini"} sudah penuh. Silakan pilih wilayah terdekat lain.`,
      };
    }

    const selectedLocation = examLocations.find(
      (location) => location.id === state.selectedLocationId,
    );

    if (selectedLocation && selectedLocation.availableRooms <= 0) {
      return {
        canContinue: false,
        identityErrors: {},
        stepError: "Lokasi ujian yang dipilih sudah penuh. Silakan pilih lokasi lain.",
      };
    }
  }

  if (step === "location" && !hasText(state.selectedLocationId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: "Pilih sekolah lokasi ujian terlebih dahulu.",
    };
  }

  if (step === "detail" && !hasText(state.selectedLocationId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: "Detail lokasi membutuhkan pilihan sekolah ujian.",
    };
  }

  if (step === "review" && !state.acknowledgementAccepted) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: "Centang pernyataan sebelum konfirmasi final.",
    };
  }

  return {
    canContinue: true,
    identityErrors: hasIdentityErrors ? identityErrors : {},
    stepError: "",
  };
}
