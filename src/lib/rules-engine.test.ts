import { describe, expect, it } from "vitest";
import { diagnosticar } from "@/lib/rules-engine";

describe("rules-engine (RF-04/05)", () => {
  it("rojo si anticheat kernel bloqueante", () => {
    const r = diagnosticar({ ramGb: 16, vulkan: "1.3" }, { anticheatBloqueante: true });
    expect(r.semaforo).toBe("rojo");
  });
  it("verde con RAM y Vulkan suficientes", () => {
    const r = diagnosticar({ ramGb: 8, vulkan: "1.3" }, { reqMinRamGb: 8 });
    expect(r.semaforo).toBe("verde");
  });
  it("amarillo con RAM justa", () => {
    const r = diagnosticar({ ramGb: 6, vulkan: "1.3" }, { reqMinRamGb: 8 });
    expect(r.semaforo).toBe("amarillo");
  });
  it("rojo sin Vulkan", () => {
    const r = diagnosticar({ ramGb: 8 }, { reqVulkan: "1.3" });
    expect(r.semaforo).toBe("rojo");
  });
});
