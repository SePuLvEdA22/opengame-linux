// Motor de reglas puro y testeable — RF-04/05 (TDD, sin I/O ni dependencias)
// Compara equipo vs requisitos del juego → semáforo verde/amarillo/rojo + explicación.
import { z } from "zod";

export const hardwareSchema = z.object({
  cpu: z.string().optional(),
  gpu: z.string().optional(),
  ramGb: z.number().min(1).max(128),
  vulkan: z.string().optional(),
  driver: z.string().optional(),
});

export const gameReqSchema = z.object({
  reqMinRamGb: z.number().optional(),
  reqVulkan: z.string().optional(),
  anticheatBloqueante: z.boolean().optional().default(false),
});

export type Semaforo = "verde" | "amarillo" | "rojo";

export interface Diagnostico {
  semaforo: Semaforo;
  explicacion: string;
  detalles: string[];
  estimadoFps?: string;
}

function vulkanOk(have?: string, need = "1.3"): boolean {
  if (!have) return false;
  const p = (v: string) => v.split(".").map((n) => parseInt(n, 10) || 0);
  const [a1 = 0, b1 = 0] = p(have);
  const [a2 = 0, b2 = 0] = p(need);
  return a1 > a2 || (a1 === a2 && b1 >= b2);
}

export function diagnosticar(
  hw: z.input<typeof hardwareSchema>,
  req: z.input<typeof gameReqSchema>
): Diagnostico {
  const needRamDefault = 8;
  const reqParsed = gameReqSchema.parse(req);
  const detalles: string[] = [];

  if (reqParsed.anticheatBloqueante) {
    return {
      semaforo: "rojo",
      explicacion: "Bloqueado por anti-cheat a nivel kernel (ej. Vanguard). No intentes emularlo: riesgo de ban.",
      detalles: ["anticheat kernel Ring-0 incompatible con Wine/Proton"],
    };
  }

  const needRam = reqParsed.reqMinRamGb ?? needRamDefault;
  if (hw.ramGb < 4) {
    detalles.push(`RAM ${hw.ramGb} GB por debajo del mínimo funcional (4 GB).`);
  } else if (hw.ramGb < needRam) {
    detalles.push(`RAM ${hw.ramGb} GB menor al requisito ${needRam} GB: usa distro ligera + ZRAM.`);
  } else {
    detalles.push(`RAM ${hw.ramGb} GB suficiente (req. ${needRam} GB).`);
  }

  const vkNeed = reqParsed.reqVulkan ?? "1.3";
  const vk = vulkanOk(hw.vulkan, vkNeed);
  detalles.push(
    vk
      ? `Vulkan ${hw.vulkan} compatible (req. ${vkNeed}): DXVK/VKD3D OK.`
      : `Vulkan ${hw.vulkan ?? "desconocido"} insuficiente (req. ${vkNeed}): usa DXVK legacy u OpenGL.`
  );

  if (hw.ramGb < 4 || !vk) {
    return {
      semaforo: "rojo",
      explicacion: "Equipo por debajo del mínimo: actualiza driver/distro ligera o juega títulos nativos livianos.",
      detalles,
    };
  }
  if (hw.ramGb < needRam || !hw.vulkan) {
    return {
      semaforo: "amarillo",
      explicacion: "Funciona con ajustes: Proton-GE recomendado + FSR + distro ligera.",
      detalles,
      estimadoFps: "30–60 FPS con ajustes",
    };
  }
  return {
    semaforo: "verde",
    explicacion: "Apto: instala y juega. Rendimiento igual o superior a Windows en este rango.",
    detalles,
    estimadoFps: "50–90 FPS",
  };
}
