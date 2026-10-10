import { describe, expect, it } from "vitest";
import { createReport, promoteReport, verifiedSolutions, voteReport } from "./reports";

describe("reports RF-08/10 + RNF-07", () => {
  it("crea en pendiente, no verificada directa", () => {
    const r = createReport({ gameId: 3, autor: "Test", gpu: "GTX 1050", ramGb: 8, fps: 65, texto: "Va perfecto en nativo, sin tweaks." });
    expect(r.estado).toBe("pendiente");
    expect(verifiedSolutions(3).some((x) => x.id === r.id)).toBe(false);
  });
  it("votar suma útil", () => {
    const before = verifiedSolutions(1)[0].votos;
    voteReport(verifiedSolutions(1)[0].id);
    expect(verifiedSolutions(1)[0].votos).toBe(before + 1);
  });
  it("promover exige moderator", () => {
    expect(() => promoteReport(1, "user")).toThrow(/moderator/);
    const r = promoteReport(1, "moderator")!;
    expect(r.estado).toBe("verificada");
  });
});
