import { fail, ok } from "@/lib/api-response";
import { promoteReport } from "@/lib/reports";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  // Demo: rol por header x-role. Prod: auth() + users.role === moderator.
  const role = req.headers.get("x-role") ?? "user";
  const { id } = await params;
  try {
    const r = promoteReport(Number(id), role);
    if (!r) return fail("Reporte no encontrado", 404);
    return ok({ id: r.id, estado: r.estado });
  } catch {
    return fail("Solo moderator puede verificar", 403);
  }
}
