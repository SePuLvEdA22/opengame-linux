import { describe, expect, it } from "vitest";
import { buildLaunchCommand, buildSetupScript, getGuidedProfile } from "./profiles";

describe("profiles RF-06/07", () => {
  it("expone proton recomendado + pasos", () => {
    const p = getGuidedProfile(1)!;
    expect(p.protonRecomendado).toBe("GE-Proton 8-26");
    expect(p.pasos.length).toBe(3);
  });
  it("combina env base + tweaks", () => {
    const cmd = buildLaunchCommand("DXVK_ASYNC=1 %command%", ["WINE_FULLSCREEN_FSR=1"]);
    expect(cmd).toContain("DXVK_ASYNC=1");
    expect(cmd).toContain("%command%");
  });
  it("script .sh menciona juego y proton", () => {
    const p = getGuidedProfile(7)!;
    const sh = buildSetupScript(p, p.protonRecomendado, "WINE_FULLSCREEN_FSR=1 %command%");
    expect(sh).toMatch(/Fall Guys/);
    expect(sh).toMatch(/Proton/);
  });
});
