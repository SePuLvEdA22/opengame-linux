import { z } from "zod";
import { fail, ok } from "@/lib/api-response";
import { searchGames } from "@/lib/search";

const querySchema = z.object({
  q: z.string().max(120).optional(),
  estado: z.enum(["funciona", "funciona_con_ajustes", "no_funciona", "desconocido"]).optional(),
  launcher: z.string().max(40).optional(),
  page: z.coerce.number().int().min(1).max(100).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) return fail("Parámetros inválidos", 400, parsed.error.flatten());
  const result = searchGames(parsed.data);
  return ok(result, { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=60" } });
}
