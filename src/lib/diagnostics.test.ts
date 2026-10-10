import { describe, expect, it } from "vitest";
import { estimarDesdeWindows, matrizParaHardware, parseCliJson } from "./diagnostics";

describe("diagnostics RF-04/05", () => {
  it("parsea JSON del CLI", () => {
    const hw = parseCliJson('{"cpu":"i5-4590","gpu":"GTX 1050","ramGb":8,"vulkan":"1.3"}');
    expect(hw.ramGb).toBe(8);
    expect(hw.gpu).toBe("GTX 1050");
  });
  it("rechaza JSON inválido o sin ram", () => {
    expect(() => parseCliJson("no-json")).toThrow(/JSON inválido/);
    expect(() => parseCliJson('{"cpu":"x"}')).toThrow(/ramGb/);
  });
  it("estimación Windows aclara precisión menor", () => {
    const hw = estimarDesdeWindows("ANGLE (Intel UHD)", 8);
    expect(hw.ramGb).toBe(8);
    expect(hw.vulkan).toBe("desconocido");
    expect(hw.distro).toMatch(/Windows/);
  });
  it("matriz devuelve semáforo por juego", () => {
    const m = matrizParaHardware({ cpu: "i5", gpu: "GTX 1050", ramGb: 8, driver: "535", vulkan: "1.3", distro: "Mint" });
    expect(m.length).toBe(5);
    expect(m[0].semaforo).toMatch(/verde|amarillo|rojo/);
  });
});
