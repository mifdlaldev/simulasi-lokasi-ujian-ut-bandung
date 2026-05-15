import type { StudentIdentity } from "./location";

export type WizardStep =
  | "identity"
  | "region"
  | "location"
  | "detail"
  | "review"
  | "success";

export interface WizardState {
  currentStep: WizardStep;
  identity: StudentIdentity;
  selectedRegionId: string;
  selectedLocationId: string;
  acknowledgementAccepted: boolean;
  finalConfirmed: boolean;
}

export type WizardAction =
  | { type: "SET_STEP"; step: WizardStep }
  | { type: "SET_IDENTITY"; identity: StudentIdentity }
  | { type: "SET_REGION"; regionId: string }
  | { type: "SET_LOCATION"; locationId: string }
  | { type: "SET_ACKNOWLEDGEMENT"; accepted: boolean }
  | { type: "CONFIRM_FINAL" }
  | { type: "RESET" };

export type StudentIdentityErrors = Partial<Record<keyof StudentIdentity, string>>;

export interface WizardValidationResult {
  canContinue: boolean;
  identityErrors: StudentIdentityErrors;
  stepError: string;
}
