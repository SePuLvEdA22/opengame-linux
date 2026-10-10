// Reportes comunidad RF-08/10 — validación + flujo moderación.
// Store en memoria para MVP $0 (Neon en prod usa user_reports/report_votes/solutions).
import { z } from "zod";

export const reportSchema = z.object({
  gameId: z.number().int().min(1).max(30),
  autor: z.string().min(2).max(40),
  gpu: z.string().min(2).max(80),
  ramGb: z.coerce.number().min(2).max(128),
  fps: z.coerce.number().int().min(0).max(500),
  texto: z.string().min(10).max(800),
});

export interface Report extends z.infer<typeof reportSchema> {
  id: number;
  votos: number;
  estado: "pendiente" | "aprobado" | "verificada";
  fecha: string;
}

let seq = 3;
export const REPORTS: Report[] = [
  { id: 1, gameId: 1, autor: "Carlos_Gamer99", gpu: "Nvidia GTX 750 Ti (2GB)", ramGb: 8, fps: 52, texto: "Corre más fluido que en Windows 10. Con DXVK_ASYNC desaparecieron los micro-parones. 10/10.", votos: 342, estado: "aprobado", fecha: "Hace 3 días" },
  { id: 2, gameId: 1, autor: "TuxPlayer_AR", gpu: "AMD Radeon RX 560 (4GB)", ramGb: 16, fps: 60, texto: "Heroic + GE-Proton 8-26 a la primera. Online con BattlEye perfecto.", votos: 189, estado: "verificada", fecha: "Hace 1 semana" },
];

export function listReports(gpuFilter?: string, page = 1, limit = 10) {
  const f = (gpuFilter ?? "").toLowerCase();
  const items = REPORTS.filter((r) => !f || r.gpu.toLowerCase().includes(f));
  const totalPages = Math.max(1, Math.ceil(items.length / limit));
  const safe = Math.min(Math.max(1, page), totalPages);
  return { items: items.slice((safe - 1) * limit, safe * limit), total: items.length, page: safe, totalPages };
}

export function createReport(input: z.infer<typeof reportSchema>): Report {
  const parsed = reportSchema.parse(input);
  const r: Report = { ...parsed, id: seq++, votos: 0, estado: "pendiente", fecha: "Ahora mismo" };
  REPORTS.unshift(r);
  return r;
}

export function voteReport(id: number): Report | undefined {
  const r = REPORTS.find((x) => x.id === id);
  if (r) r.votos += 1;
  return r;
}

// RNF-07: solo moderator promueve pendiente/aprobado → verificada
export function promoteReport(id: number, role?: string): Report | undefined {
  if (role !== "moderator") throw new Error("Solo moderator puede verificar");
  const r = REPORTS.find((x) => x.id === id);
  if (r) r.estado = "verificada";
  return r;
}

export function verifiedSolutions(gameId: number): Report[] {
  return REPORTS.filter((r) => r.gameId === gameId && r.estado === "verificada");
}
