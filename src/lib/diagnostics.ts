// Utilidades diagnóstico RF-04/05 — parseo CLI JSON + estimación Windows (precisión menor).
import { z } from "zod";
import { CATALOG } from "./games-data";
import { diagnosticar } from "./rules-engine";

export const cliJsonSchema = z.object({
  cpu: z.string().min(1).max(200).optional().default("desconocida"),
  gpu: z.string().min(1).max(200).optional().default("desconocida"),
  ramGb: z.coerce.number().min(0.5).max(128),
  driver: z.string().max(80).optional().default("desconocido"),
  vulkan: z.string().max(20).optional().default("desconocido"),
  distro: z.string().max(80).optional().default("desconocida"),
  kernel: z.string().max(40).optional(),
});

export type CliHardware = z.infer<typeof cliJsonSchema>;

export function parseCliJson(raw: string): CliHardware {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error("JSON inválido. Pega la salida exacta de opengame-detect.sh");
  }
  const parsed = cliJsonSchema.safeParse(json);
  if (!parsed.success) throw new Error("JSON incompleto: se requiere al menos ramGb (ej. {\"ramGb\":8})");
  return parsed.data;
}

// Windows: solo WebGL renderer + navigator.deviceMemory → precisión menor (aviso obligatorio)
export function estimarDesdeWindows(webglRenderer: string, deviceMemoryGb?: number): CliHardware {
  const ram = deviceMemoryGb && deviceMemoryGb >= 1 ? Math.min(32, deviceMemoryGb) : 8;
  return {
    cpu: "estimada (Windows)",
    gpu: webglRenderer || "estimada (WebGL)",
    ramGb: ram,
    driver: "estimado",
    vulkan: "desconocido",
    distro: "Windows (estimación)",
  };
}

export function matrizParaHardware(hw: CliHardware) {
  return CATALOG.slice(0, 5).map((g) => {
    const bloqueante = g.estado === "no_funciona";
    const d = diagnosticar(
      { ramGb: hw.ramGb, vulkan: hw.vulkan === "desconocido" ? undefined : hw.vulkan },
      { reqMinRamGb: g.reqMinRamGb, reqVulkan: "1.3", anticheatBloqueante: bloqueante }
    );
    return { gameId: g.id, nombre: g.nombre, proton: g.protonVersion, fps: g.fpsEstimado, ...d };
  });
}
