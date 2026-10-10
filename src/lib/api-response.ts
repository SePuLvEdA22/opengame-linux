import { NextResponse } from "next/server";

export function ok<T>(data: T, init?: { status?: number; headers?: HeadersInit }) {
  return NextResponse.json({ ok: true, data }, { status: init?.status ?? 200, headers: init?.headers });
}

export function fail(message: string, status = 400, details?: unknown) {
  console.error(`[api] ${status} ${message}`, details ?? "");
  return NextResponse.json({ ok: false, error: message }, { status });
}
