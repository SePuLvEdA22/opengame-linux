import { fail, ok } from "@/lib/api-response";
import { voteReport } from "@/lib/reports";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = voteReport(Number(id));
  if (!r) return fail("Reporte no encontrado", 404);
  return ok({ id: r.id, votos: r.votos });
}
