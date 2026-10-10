import { fail, ok } from "@/lib/api-response";
import { getGameById } from "@/lib/search";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isInteger(num) || num < 1) return fail("ID inválido", 400);
  const game = getGameById(num);
  if (!game) return fail("Juego no encontrado", 404);
  // RNF-07/10: solo soluciones verificadas + fecha actualización expuestas aquí (Fase 4 amplía reportes)
  return ok(
    { ...game, solucionesVerificadas: [], ultimaActualizacion: game.fechaVerificacion },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=60" } }
  );
}
