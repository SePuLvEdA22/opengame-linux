import { ok } from "@/lib/api-response";
import { DISTROS } from "@/lib/distros";

export async function GET() {
  return ok(DISTROS, { headers: { "Cache-Control": "s-maxage=86400" } });
}
