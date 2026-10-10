import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting simple por IP en memoria (MVP). En producción con Neon usar tabla rate_limits.
// RNF-06: sin servicios de pago.
const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 60;
const WINDOW_MS = 60_000;

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/")) return NextResponse.next();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now > cur.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return NextResponse.next();
  }
  cur.count += 1;
  if (cur.count > LIMIT) {
    return NextResponse.json({ ok: false, error: "Demasiadas solicitudes. Intenta en 1 min." }, { status: 429 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/api/:path*"] };
