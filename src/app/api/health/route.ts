import { ok } from "@/lib/api-response";

export async function GET() {
  return ok({ status: "ok", fase: 0, time: new Date().toISOString() });
}
