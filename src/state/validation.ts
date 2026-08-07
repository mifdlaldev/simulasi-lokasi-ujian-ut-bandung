import { validationCopy } from "../content/copy";
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
    errors.nim = validationCopy.nimRequired;
  } else if (!/^\d+$/.test(nim)) {
    errors.nim = validationCopy.nimDigitsOnly;
  } else if (nim.length !== 9) {
    errors.nim = validationCopy.nimLength;
  }

  if (!hasText(identity.name)) {
    errors.name = validationCopy.nameRequired;
  }

  if (!hasText(identity.programStudy)) {
    errors.programStudy = validationCopy.programStudyRequired;
  }

  if (phone && !/^\d+$/.test(phone)) {
    errors.phone = validationCopy.phoneDigitsOnly;
  } else if (phone.length > 12) {
    errors.phone = validationCopy.phoneMaxLength;
  }

  if (email && !/^[^\s@]+@gmail\.com$/i.test(email)) {
    errors.email = validationCopy.emailInvalid;
  }

  if (!email && !phone) {
    errors.email = validationCopy.contactRequiredEmail;
    errors.phone = validationCopy.contactRequiredPhone;
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
      stepError: validationCopy.identityIncomplete,
    };
  }

  if (step === "region" && !hasText(state.selectedRegionId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: validationCopy.regionRequired,
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
        stepError: validationCopy.regionFull(selectedRegion?.name ?? "wilayah ini"),
      };
    }

    const selectedLocation = examLocations.find(
      (location) => location.id === state.selectedLocationId,
    );

    if (selectedLocation && selectedLocation.availableRooms <= 0) {
      return {
        canContinue: false,
        identityErrors: {},
        stepError: validationCopy.selectedLocationFull,
      };
    }
  }

  if (step === "location" && !hasText(state.selectedLocationId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: validationCopy.locationRequired,
    };
  }

  if (step === "detail" && !hasText(state.selectedLocationId)) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: validationCopy.detailRequiresLocation,
    };
  }

  if (step === "review" && !state.acknowledgementAccepted) {
    return {
      canContinue: false,
      identityErrors: {},
      stepError: validationCopy.acknowledgementRequired,
    };
  }

  return {
    canContinue: true,
    identityErrors: hasIdentityErrors ? identityErrors : {},
    stepError: "",
  };
}
