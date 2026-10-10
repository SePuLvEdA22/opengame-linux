import { describe, expect, it } from "vitest";
import { searchGames, getGameById } from "./search";

describe("searchGames RF-01 + RNF-04", () => {
  it("resultado inmediato por nombre exacto", () => {
    const r = searchGames({ q: "Grand Theft Auto V" });
    expect(r.total).toBeGreaterThanOrEqual(1);
    expect(r.items[0].nombre).toBe("Grand Theft Auto V");
  });
  it("tolera alias gta v y cs2", () => {
    expect(searchGames({ q: "gta v" }).items[0].nombre).toContain("Grand Theft Auto");
    const cs = searchGames({ q: "counter" });
    expect(cs.items[0].nombre).toBe("Counter-Strike 2");
  });
  it("filtra por estado semáforo", () => {
    const r = searchGames({ estado: "no_funciona" });
    expect(r.total).toBeGreaterThan(0);
    expect(r.items.every((g) => g.estado === "no_funciona")).toBe(true);
  });
  it("filtra por launcher", () => {
    const r = searchGames({ launcher: "riot" });
    expect(r.items.every((g) => g.launcher.some((l) => l.toLowerCase().includes("riot")))).toBe(true);
  });
  it("pagina todas las listas", () => {
    const p1 = searchGames({ page: 1, limit: 5 });
    const p2 = searchGames({ page: 2, limit: 5 });
    expect(p1.items.length).toBe(5);
    expect(p1.totalPages).toBe(6);
    expect(p1.items[0].id).not.toBe(p2.items[0].id);
  });
  it("ficha expone causa y proton", () => {
    const g = getGameById(2)!;
    expect(g.causaFallo).toMatch(/Ring-0/);
    expect(g.protonVersion).toBe("N/A");
  });
});
