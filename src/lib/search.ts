// Búsqueda + filtros + paginación — puro y testeable (RF-01, RNF-04).
// En Neon se usa pg_trgm (gin_trgm_ops); aquí ranking simple case-insensitive para fallback/tests.
import { CATALOG, type CatalogGame, type CompatEstado } from "./games-data";

export interface SearchParams {
  q?: string;
  estado?: CompatEstado;
  launcher?: string;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  items: CatalogGame[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function norm(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function score(game: CatalogGame, query: string): number {
  const n = norm(game.nombre);
  const q = norm(query.trim());
  if (!q) return 1;
  if (n === q) return 100;
  if (n.startsWith(q)) return 50;
  if (n.includes(q)) return 20;
  // tolera "gta v" → "grand theft auto v" (alias manual mínimo)
  const aliases: Record<string, string[]> = {
    "gta": ["grand theft auto"],
    "cs": ["counter-strike"],
    "lol": ["league of legends"],
  };
  for (const [k, vals] of Object.entries(aliases)) {
    if (q.includes(k) && vals.some((v) => n.includes(v))) return 15;
  }
  // match por palabras
  const words = q.split(/\s+/);
  if (words.every((w) => n.includes(w))) return 10;
  return 0;
}

export function searchGames(params: SearchParams): SearchResult {
  const page = Math.max(1, Math.floor(params.page ?? 1));
  const limit = Math.min(50, Math.max(1, Math.floor(params.limit ?? 12)));
  const q = params.q?.trim() ?? "";

  let filtered = CATALOG.filter((g) => {
    if (params.estado && g.estado !== params.estado) return false;
    if (params.launcher && !g.launcher.some((l) => norm(l).includes(norm(params.launcher!)))) return false;
    if (q && score(g, q) === 0) return false;
    return true;
  });

  if (q) {
    filtered = filtered
      .map((g) => ({ g, s: score(g, q) }))
      .sort((a, b) => b.s - a.s || b.g.reportes - a.g.reportes)
      .map((x) => x.g);
  } else {
    filtered = [...filtered].sort((a, b) => b.reportes - a.reportes);
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const items = filtered.slice((safePage - 1) * limit, safePage * limit);
  return { items, total, page: safePage, limit, totalPages };
}

export function getGameById(id: number): CatalogGame | undefined {
  return CATALOG.find((g) => g.id === id);
}
