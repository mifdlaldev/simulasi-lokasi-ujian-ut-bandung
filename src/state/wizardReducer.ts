import type { StudentIdentity } from "../types/location";
import type { WizardAction, WizardState, WizardStep } from "../types/wizard";

export const wizardSteps: WizardStep[] = [
  "identity",
  "region",
  "location",
  "detail",
  "review",
  "success",
];

const initialStudentIdentity: StudentIdentity = {
  nim: "",
  name: "",
  programStudy: "",
  email: "",
  phone: "",
};

export const initialWizardState: WizardState = {
  currentStep: "identity",
  identity: initialStudentIdentity,
  selectedRegionId: "",
  selectedLocationId: "",
  acknowledgementAccepted: false,
};

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "SET_IDENTITY":
      return { ...state, identity: action.identity };
    case "SET_REGION":
      return {
        ...state,
        selectedRegionId: action.regionId,
        selectedLocationId: "",
      };
    case "SET_LOCATION":
      return { ...state, selectedLocationId: action.locationId };
    case "SET_ACKNOWLEDGEMENT":
      return { ...state, acknowledgementAccepted: action.accepted };
    case "CONFIRM_FINAL":
      return {
        ...state,
        currentStep: "success",
      };
    case "RESET":
      return initialWizardState;
  }
}

export function getNextStep(currentStep: WizardStep): WizardStep {
  const currentIndex = wizardSteps.indexOf(currentStep);
  return wizardSteps[Math.min(currentIndex + 1, wizardSteps.length - 1)];
}

export function getPreviousStep(currentStep: WizardStep): WizardStep {
  const currentIndex = wizardSteps.indexOf(currentStep);
  return wizardSteps[Math.max(currentIndex - 1, 0)];
}
