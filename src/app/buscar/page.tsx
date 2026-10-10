import { SiteHeader, GameCard } from "@/components/ui";
import { searchGames } from "@/lib/search";
import Link from "next/link";

interface Props { searchParams: Promise<{ q?: string; estado?: string; launcher?: string; page?: string }> }

export default async function Buscar({ searchParams }: Props) {
  const sp = await searchParams;
  const estado = ["funciona", "funciona_con_ajustes", "no_funciona", "desconocido"].includes(sp.estado ?? "")
    ? (sp.estado as "funciona" | "funciona_con_ajustes" | "no_funciona" | "desconocido")
    : undefined;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const result = searchGames({ q: sp.q, estado, launcher: sp.launcher, page, limit: 12 });
  const qs = (p: number) => {
    const u = new URLSearchParams();
    if (sp.q) u.set("q", sp.q);
    if (estado) u.set("estado", estado);
    if (sp.launcher) u.set("launcher", sp.launcher);
    u.set("page", String(p));
    return `/buscar?${u.toString()}`;
  };
  return (
    <>
      <SiteHeader active="buscador" />
      <main id="contenido" className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-white">
          {sp.q ? <>Resultados para “{sp.q}” ({result.total})</> : <>Catálogo ({result.total} juegos)</>}
        </h1>
        <p className="text-xs text-slate-400 font-mono mt-1">Paginación RNF-04 · {result.totalPages} páginas</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {result.items.map((g) => <GameCard key={g.id} game={g} />)}
        </div>
        {result.items.length === 0 && <p className="text-sm text-slate-400 mt-8">Sin resultados. Prueba “GTA V”, “CS2” o “Apex”.</p>}
        <nav aria-label="Paginación" className="flex items-center gap-2 mt-8 text-sm">
          {result.page > 1 && <Link className="px-3 py-1.5 rounded border border-outline bg-surface-container" href={qs(result.page - 1)}>← Anterior</Link>}
          <span className="font-mono text-xs text-slate-400">Página {result.page} / {result.totalPages}</span>
          {result.page < result.totalPages && <Link className="px-3 py-1.5 rounded border border-outline bg-surface-container" href={qs(result.page + 1)}>Siguiente →</Link>}
        </nav>
      </main>
    </>
  );
}
