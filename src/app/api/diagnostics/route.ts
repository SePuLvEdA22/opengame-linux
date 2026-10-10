import { z } from "zod";
import { fail, ok } from "@/lib/api-response";
import { cliJsonSchema, matrizParaHardware } from "@/lib/diagnostics";
import { diagnosticar } from "@/lib/rules-engine";
import { getGameById } from "@/lib/search";

const bodySchema = z.object({
  hardware: cliJsonSchema,
  gameId: z.number().int().min(1).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Cuerpo JSON inválido", 400);
  }
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return fail("Hardware inválido: se requiere ramGb y formato CLI", 400, parsed.error.flatten());
  const { hardware, gameId } = parsed.data;

  if (gameId) {
    const g = getGameById(gameId);
    if (!g) return fail("Juego no encontrado", 404);
    const d = diagnosticar(
      { ramGb: hardware.ramGb, vulkan: hardware.vulkan === "desconocido" ? undefined : hardware.vulkan, gpu: hardware.gpu },
      { reqMinRamGb: g.reqMinRamGb, reqVulkan: "1.3", anticheatBloqueante: g.estado === "no_funciona" }
    );
    return ok({ hardware, juego: g.nombre, ...d });
  }
  return ok({ hardware, matriz: matrizParaHardware(hardware) });
}
