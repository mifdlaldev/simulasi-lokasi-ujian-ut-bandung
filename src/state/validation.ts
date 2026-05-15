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

export function validateStudentIdentity(
  identity: StudentIdentity,
): StudentIdentityErrors {
  const errors: StudentIdentityErrors = {};

  if (!hasText(identity.nim)) {
    errors.nim = "NIM wajib diisi.";
  }

  if (!hasText(identity.name)) {
    errors.name = "Nama mahasiswa wajib diisi.";
  }

  if (!hasText(identity.programStudy)) {
    errors.programStudy = "Program studi wajib diisi.";
  }

  if (!hasText(identity.email) && !hasText(identity.phone)) {
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
