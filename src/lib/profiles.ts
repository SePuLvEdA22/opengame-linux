// Perfiles Proton guiados RF-06/07 — puro y testeable.
import { getGameById } from "./search";

export interface ProtonOption {
  version: string;
  nota: string;
  recomendada: boolean;
}

export interface GuidedProfile {
  gameId: number;
  juego: string;
  launcher: string;
  protonRecomendado: string;
  opciones: ProtonOption[];
  envBase: string;
  dependencias: string[];
  pasos: string[];
  tweaks: { id: string; nombre: string; env: string; ganancia: string }[];
}

export function getGuidedProfile(gameId: number): GuidedProfile | undefined {
  const g = getGameById(gameId);
  if (!g) return undefined;
  const rec = g.protonVersion;
  return {
    gameId: g.id,
    juego: g.nombre,
    launcher: g.launcher[0] ?? "Steam",
    protonRecomendado: rec,
    opciones: [
      { version: rec, nota: "Recomendado para este título (codecs + EAC fixes).", recomendada: true },
      { version: "Proton Experimental", nota: "Últimos parches Valve. Estable general.", recomendada: false },
      { version: "Wine-GE 8-25 (Lutris)", nota: "Prefixes independientes, kernels <5.15.", recomendada: false },
    ],
    envBase: g.envVars,
    dependencias: g.id === 1 ? ["vcrun2019 (Winetricks)", "DirectX Jun2010 Redists"] : ["vcrun2019 (Winetricks)"],
    pasos: [
      `Forzar ${rec} en Propiedades → Compatibilidad.`,
      `Pegar parámetros: ${g.envVars || "(nativo, sin parámetros)"}`,
      "In-game: DirectX 11, MSAA OFF, FXAA ON.",
    ],
    tweaks: [
      { id: "fsr", nombre: "AMD FSR 1.0", env: "WINE_FULLSCREEN_FSR=1", ganancia: "+15-22 FPS" },
      { id: "cap", nombre: "Cap 60 FPS", env: "DXVK_FRAME_RATE=60", ganancia: "frametime 0.1%" },
      { id: "async", nombre: "DXVK Async", env: "DXVK_ASYNC=1", ganancia: "sin stutter" },
    ],
  };
}

export function buildLaunchCommand(base: string, extra: string[]): string {
  const parts = [base, ...extra].filter(Boolean).join(" ").trim();
  return parts.includes("%command%") ? parts : `${parts} %command%`.trim();
}

export function buildSetupScript(p: GuidedProfile, proton: string, envCmd: string): string {
  return `#!/usr/bin/env bash
# OpenGame Linux — perfil 1-clic para ${p.juego}
# Proton: ${proton} | Launcher: ${p.launcher}
set -eu
echo "[1/3] Proton recomendado: ${proton}"
echo "[2/3] Parámetros: ${envCmd}"
echo "[3/3] Dependencias: ${p.dependencias.join(", ")}"
echo "Pega en Steam > Propiedades > Parámetros de lanzamiento:"
echo "${envCmd}"
`;
}
