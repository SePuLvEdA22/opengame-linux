import { describe, expect, it } from "vitest";
import { buildComparator } from "./comparator";
import { CATALOG } from "./games-data";

describe("comparator Win vs Linux", () => {
  it("GTA V: Linux supera a Windows y ahorra RAM", () => {
    const g = CATALOG.find((x) => x.id === 1)!;
    const c = buildComparator(g)!;
    expect(c.linuxFps).toBeGreaterThan(c.windowsFps);
    expect(c.linuxRamFreeGb).toBeGreaterThan(c.windowsRamFreeGb);
    expect(c.latencySavingMs).toBe(14);
  });
  it("bloqueados retornan null", () => {
    const g = CATALOG.find((x) => x.id === 2)!;
    expect(buildComparator(g)).toBeNull();
  });
});
