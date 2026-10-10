// Comparador Windows vs Linux — puro y testeable. Estimación explicable para sustentación.
import type { CatalogGame } from "./games-data";

export interface Comparator {
  linuxFps: number;
  windowsFps: number;
  linuxRamFreeGb: number;
  windowsRamFreeGb: number;
  latencySavingMs: number;
  conclusion: string;
}

function midFps(s: string): number {
  const m = s.match(/(\d+)\s*[-–]\s*(\d+)/);
  if (m) return Math.round((parseInt(m[1], 10) + parseInt(m[2], 10)) / 2);
  const single = s.match(/(\d+)\s*FPS/);
  if (single) return parseInt(single[1], 10);
  return 45;
}

export function buildComparator(game: CatalogGame): Comparator | null {
  if (game.estado === "no_funciona") return null;
  const linuxFps = midFps(game.fpsEstimado);
  const windowsFps = Math.max(20, Math.round(linuxFps * 0.7));
  const totalRam = Math.max(8, game.reqMinRamGb);
  return {
    linuxFps,
    windowsFps,
    linuxRamFreeGb: Math.round((totalRam - 0.9) * 10) / 10,
    windowsRamFreeGb: Math.round((totalRam - 4.2) * 10) / 10,
    latencySavingMs: 14,
    conclusion: "Menor overhead de telemetría Windows: frametimes hasta 14 ms más estables en Linux con mismo hardware.",
  };
}
