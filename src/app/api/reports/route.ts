import { z } from "zod";
import { fail, ok } from "@/lib/api-response";
import { createReport, listReports, reportSchema } from "@/lib/reports";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const gpu = url.searchParams.get("gpu") ?? undefined;
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  return ok(listReports(gpu, page, 10));
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("JSON inválido", 400);
  }
  const parsed = reportSchema.safeParse(json);
  if (!parsed.success) return fail("Reporte inválido: autor, GPU, FPS y texto (10+ caracteres)", 400);
  // Nota: en prod requiere sesión (Auth.js). Demo admite autor libre.
  const r = createReport(parsed.data as z.infer<typeof reportSchema>);
  return ok(r, { status: 201 });
}
