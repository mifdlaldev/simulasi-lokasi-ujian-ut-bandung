import { describe, expect, it } from "vitest";

import { canContinueFromStep } from "./validation";
import type { WizardState } from "../types/wizard";

function makeState(overrides: Partial<WizardState> = {}): WizardState {
  return {
    currentStep: "identity",
    identity: {
      nim: "042123456",
      name: "Budi Santoso",
      programStudy: "Manajemen (S1)",
      email: "budi.santoso@gmail.com",
      phone: "081234567890",
    },
    selectedRegionId: "",
    selectedLocationId: "",
    acknowledgementAccepted: false,
    ...overrides,
  };
}

describe("canContinueFromStep - identitas", () => {
  it("lolos dengan identitas valid", () => {
    const result = canContinueFromStep(makeState(), "identity");
    expect(result.canContinue).toBe(true);
    expect(result.identityErrors).toEqual({});
  });

  it("menolak NIM kosong", () => {
    const state = makeState({ identity: { ...makeState().identity, nim: "" } });
    expect(canContinueFromStep(state, "identity").identityErrors.nim).toContain(
      "wajib",
    );
  });

  it("menolak NIM berisi huruf", () => {
    const state = makeState({
      identity: { ...makeState().identity, nim: "04212345A" },
    });
    expect(canContinueFromStep(state, "identity").identityErrors.nim).toContain(
      "angka",
    );
  });

  it("menolak NIM bukan 9 digit", () => {
    const short = makeState({
      identity: { ...makeState().identity, nim: "04212345" },
    });
    const long = makeState({
      identity: { ...makeState().identity, nim: "0421234567" },
    });
    expect(canContinueFromStep(short, "identity").identityErrors.nim).toContain(
      "9 digit",
    );
    expect(canContinueFromStep(long, "identity").identityErrors.nim).toContain(
      "9 digit",
    );
  });

  it("menolak nama kosong", () => {
    const state = makeState({
      identity: { ...makeState().identity, name: "   " },
    });
    expect(canContinueFromStep(state, "identity").identityErrors.name).toContain(
      "wajib",
    );
  });

  it("menolak program studi kosong", () => {
    const state = makeState({
      identity: { ...makeState().identity, programStudy: "" },
    });
    expect(
      canContinueFromStep(state, "identity").identityErrors.programStudy,
    ).toContain("wajib");
  });

  it("menolak email non-Gmail", () => {
    const state = makeState({
      identity: { ...makeState().identity, email: "budi@yahoo.com" },
    });
    expect(canContinueFromStep(state, "identity").identityErrors.email).toContain(
      "Gmail",
    );
  });

  it("menolak saat email dan HP kosong", () => {
    const state = makeState({
      identity: { ...makeState().identity, email: "", phone: "" },
    });
    const errors = canContinueFromStep(state, "identity").identityErrors;
    expect(errors.email).toContain("kontak");
    expect(errors.phone).toContain("kontak");
  });

  it("menolak HP berisi huruf", () => {
    const state = makeState({
      identity: { ...makeState().identity, phone: "0812ABCD" },
    });
    expect(canContinueFromStep(state, "identity").identityErrors.phone).toContain(
      "angka",
    );
  });

  it("menolak HP lebih dari 12 digit", () => {
    const state = makeState({
      identity: { ...makeState().identity, phone: "0812345678901" },
    });
    expect(canContinueFromStep(state, "identity").identityErrors.phone).toContain(
      "maksimal",
    );
  });
});

describe("canContinueFromStep - navigasi step", () => {
  it("menolak step region tanpa wilayah dipilih", () => {
    expect(canContinueFromStep(makeState(), "region").canContinue).toBe(false);
  });

  it("menolak step location tanpa lokasi dipilih", () => {
    const state = makeState({ selectedRegionId: "kota-bandung" });
    expect(canContinueFromStep(state, "location").canContinue).toBe(false);
  });

  it("menolak step detail tanpa lokasi dipilih", () => {
    const state = makeState({ selectedRegionId: "kota-bandung" });
    expect(canContinueFromStep(state, "detail").canContinue).toBe(false);
  });

  it("menolak step review tanpa acknowledgement", () => {
    const state = makeState({
      selectedRegionId: "kota-bandung",
      selectedLocationId: "sman-3-bandung",
    });
    expect(canContinueFromStep(state, "review").canContinue).toBe(false);
  });

  it("lolos step review dengan acknowledgement", () => {
    const state = makeState({
      selectedRegionId: "kota-bandung",
      selectedLocationId: "sman-3-bandung",
      acknowledgementAccepted: true,
    });
    expect(canContinueFromStep(state, "review").canContinue).toBe(true);
  });
});

describe("canContinueFromStep - kuota", () => {
  it("menolak step location saat seluruh wilayah penuh", () => {
    // kabupaten-sumedang: satu-satunya lokasi (sman-1-sumedang) availableRooms = 0
    const state = makeState({ selectedRegionId: "kabupaten-sumedang" });
    const result = canContinueFromStep(state, "location");
    expect(result.canContinue).toBe(false);
    expect(result.stepError).toContain("penuh");
  });

  it("menolak saat lokasi terpilih sudah penuh", () => {
    const state = makeState({
      selectedRegionId: "kabupaten-sumedang",
      selectedLocationId: "sman-1-sumedang",
    });
    const result = canContinueFromStep(state, "detail");
    expect(result.canContinue).toBe(false);
    expect(result.stepError).toContain("penuh");
  });
});
