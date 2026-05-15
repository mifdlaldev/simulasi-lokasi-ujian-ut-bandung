import { useMemo, useReducer, useState } from "react";

import { AppShell } from "./components/layout/AppShell";
import { MobileStepHeader } from "./components/layout/MobileStepHeader";
import { SelectionSummary } from "./components/layout/SelectionSummary";
import { WizardFrame } from "./components/layout/WizardFrame";
import { Button } from "./components/ui/Button";
import { LocationDetailStep } from "./components/steps/LocationDetailStep";
import { LocationSelectionStep } from "./components/steps/LocationSelectionStep";
import { RegionSearchStep } from "./components/steps/RegionSearchStep";
import { ReviewConfirmationStep } from "./components/steps/ReviewConfirmationStep";
import { StudentIdentityStep } from "./components/steps/StudentIdentityStep";
import { SuccessStep } from "./components/steps/SuccessStep";
import { appCopy, stepLabels } from "./content/copy";
import { examLocations, examRegions } from "./data/examLocations";
import {
  getNextStep,
  getPreviousStep,
  initialWizardState,
  wizardReducer,
  wizardSteps,
} from "./state/wizardReducer";
import { canContinueFromStep } from "./state/validation";
import type { WizardStep } from "./types/wizard";

const stepDescriptions: Record<WizardStep, string> = {
  identity: appCopy.identityIntro,
  region: appCopy.regionIntro,
  location: appCopy.locationIntro,
  detail: appCopy.detailIntro,
  review: appCopy.reviewIntro,
  success: appCopy.successDescription,
};

export default function App() {
  const [state, dispatch] = useReducer(wizardReducer, initialWizardState);
  const [attemptedStep, setAttemptedStep] = useState<WizardStep | null>(null);

  const currentStepIndex = wizardSteps.indexOf(state.currentStep);
  const selectedRegion = useMemo(
    () => examRegions.find((region) => region.id === state.selectedRegionId) ?? null,
    [state.selectedRegionId],
  );
  const selectedLocation = useMemo(
    () =>
      examLocations.find((location) => location.id === state.selectedLocationId) ?? null,
    [state.selectedLocationId],
  );
  const stepperItems = useMemo(
    () => wizardSteps.map((step) => ({ id: step, label: stepLabels[step] })),
    [],
  );
  const validation = canContinueFromStep(state);
  const showErrors = attemptedStep === state.currentStep && !validation.canContinue;

  function goToPreviousStep() {
    setAttemptedStep(null);
    dispatch({ type: "SET_STEP", step: getPreviousStep(state.currentStep) });
  }

  function goToNextStep() {
    const nextValidation = canContinueFromStep(state);

    if (!nextValidation.canContinue) {
      setAttemptedStep(state.currentStep);
      return;
    }

    setAttemptedStep(null);
    dispatch({ type: "SET_STEP", step: getNextStep(state.currentStep) });
  }

  const summary = (
    <SelectionSummary
      identity={state.identity}
      location={selectedLocation}
      region={selectedRegion}
    />
  );
  const mobileHeader = (
    <MobileStepHeader
      currentStepIndex={currentStepIndex + 1}
      currentStepLabel={stepLabels[state.currentStep]}
      summary={summary}
      totalSteps={wizardSteps.length}
    />
  );
  const isFirstStep = state.currentStep === "identity";
  const isReviewStep = state.currentStep === "review";
  const isSuccessStep = state.currentStep === "success";

  function renderStep() {
    switch (state.currentStep) {
      case "identity":
        return (
          <StudentIdentityStep
            errors={showErrors ? validation.identityErrors : {}}
            onChange={(identity) => dispatch({ type: "SET_IDENTITY", identity })}
            value={state.identity}
          />
        );
      case "region":
        return (
          <RegionSearchStep
            onSelectRegion={(regionId) => {
              setAttemptedStep(null);
              dispatch({ type: "SET_REGION", regionId });
            }}
            error={showErrors ? validation.stepError : ""}
            regions={examRegions}
            selectedRegionId={state.selectedRegionId}
          />
        );
      case "location":
        return (
          <LocationSelectionStep
            error={showErrors ? validation.stepError : ""}
            locations={examLocations}
            onSelectLocation={(locationId) => {
              setAttemptedStep(null);
              dispatch({ type: "SET_LOCATION", locationId });
            }}
            selectedLocationId={state.selectedLocationId}
            selectedRegionId={state.selectedRegionId}
          />
        );
      case "detail":
        return <LocationDetailStep location={selectedLocation} />;
      case "review":
        return (
          <ReviewConfirmationStep
            acknowledgementAccepted={state.acknowledgementAccepted}
            identity={state.identity}
            location={selectedLocation}
            onAcknowledgementChange={(accepted) => {
              setAttemptedStep(null);
              dispatch({ type: "SET_ACKNOWLEDGEMENT", accepted });
            }}
            onConfirm={() => {
              const reviewValidation = canContinueFromStep(state, "review");

              if (!reviewValidation.canContinue) {
                setAttemptedStep("review");
                return;
              }

              setAttemptedStep(null);
              dispatch({ type: "CONFIRM_FINAL" });
            }}
            region={selectedRegion}
          />
        );
      case "success":
        return (
          <SuccessStep
            onReset={() => dispatch({ type: "RESET" })}
            selectedSchoolName={selectedLocation?.schoolName}
          />
        );
    }
  }

  const footer = isSuccessStep ? null : (
    <>
      {!isFirstStep ? (
        <Button onClick={goToPreviousStep} variant="secondary">
          Kembali
        </Button>
      ) : null}
      {!isReviewStep ? <Button onClick={goToNextStep}>Lanjutkan</Button> : null}
    </>
  );

  return (
    <AppShell currentStepId={state.currentStep} steps={stepperItems} summary={summary}>
      <WizardFrame
        description={<p>{stepDescriptions[state.currentStep]}</p>}
        footer={footer}
        mobileHeader={mobileHeader}
        title={stepLabels[state.currentStep]}
      >
        {renderStep()}
      </WizardFrame>
    </AppShell>
  );
}
