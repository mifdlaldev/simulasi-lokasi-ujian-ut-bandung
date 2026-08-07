import { describe, expect, it } from "vitest";

import {
  getNextStep,
  getPreviousStep,
  initialWizardState,
  wizardReducer,
} from "./wizardReducer";
import type { WizardState } from "../types/wizard";

describe("getNextStep / getPreviousStep", () => {
  it("maju satu step", () => {
    expect(getNextStep("identity")).toBe("region");
    expect(getNextStep("review")).toBe("success");
  });

  it("terjaga di step terakhir", () => {
    expect(getNextStep("success")).toBe("success");
  });

  it("mundur satu step", () => {
    expect(getPreviousStep("review")).toBe("detail");
  });

  it("terjaga di step pertama", () => {
    expect(getPreviousStep("identity")).toBe("identity");
  });
});

describe("wizardReducer", () => {
  it("SET_STEP mengubah currentStep", () => {
    const state = wizardReducer(initialWizardState, {
      type: "SET_STEP",
      step: "region",
    });
    expect(state.currentStep).toBe("region");
  });

  it("SET_IDENTITY mengganti identitas", () => {
    const identity = {
      ...initialWizardState.identity,
      nim: "042123456",
    };
    const state = wizardReducer(initialWizardState, {
      type: "SET_IDENTITY",
      identity,
    });
    expect(state.identity).toEqual(identity);
  });

  it("SET_REGION mengatur wilayah dan menghapus lokasi terpilih", () => {
    const withLocation = wizardReducer(initialWizardState, {
      type: "SET_LOCATION",
      locationId: "sman-3-bandung",
    });
    const state = wizardReducer(withLocation, {
      type: "SET_REGION",
      regionId: "kota-bandung",
    });
    expect(state.selectedRegionId).toBe("kota-bandung");
    expect(state.selectedLocationId).toBe("");
  });

  it("SET_LOCATION mengatur lokasi terpilih", () => {
    const state = wizardReducer(initialWizardState, {
      type: "SET_LOCATION",
      locationId: "sman-3-bandung",
    });
    expect(state.selectedLocationId).toBe("sman-3-bandung");
  });

  it("SET_ACKNOWLEDGEMENT mengatur pernyataan", () => {
    const state = wizardReducer(initialWizardState, {
      type: "SET_ACKNOWLEDGEMENT",
      accepted: true,
    });
    expect(state.acknowledgementAccepted).toBe(true);
  });

  it("CONFIRM_FINAL pindah ke success", () => {
    const state = wizardReducer(initialWizardState, {
      type: "CONFIRM_FINAL",
    });
    expect(state.currentStep).toBe("success");
  });

  it("RESET mengembalikan state awal", () => {
    const progressed: WizardState = {
      currentStep: "review",
      identity: {
        nim: "042123456",
        name: "Budi Santoso",
        programStudy: "Manajemen (S1)",
        email: "budi.santoso@gmail.com",
        phone: "081234567890",
      },
      selectedRegionId: "kota-bandung",
      selectedLocationId: "sman-3-bandung",
      acknowledgementAccepted: true,
    };
    const state = wizardReducer(progressed, { type: "RESET" });
    expect(state).toEqual(initialWizardState);
  });
});
