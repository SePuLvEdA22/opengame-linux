import { SiteHeader, GameCard, StatusBadge } from "@/components/ui";
import { searchGames } from "@/lib/search";
import Link from "next/link";

export const revalidate = 3600; // RNF-02: ISR catálogo

export default function Home() {
  const top = searchGames({ limit: 4 });
  return (
    <>
      <SiteHeader active="buscador" />
      <main id="contenido">
        <div className="w-full bg-surface-container-lowest border-b border-surface-container-high py-2 px-4">
          <p className="max-w-7xl mx-auto text-xs font-mono text-slate-400">
            <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
            Base de datos en tiempo real · Último reporte: hace 2 min
          </p>
        </div>
        <section className="pt-12 pb-10 px-4 border-b border-surface-container-high text-center">
          <p className="inline-flex px-3 py-1 rounded-full bg-surface-container border border-outline text-xs font-mono text-slate-300 mb-6">
            Optimizado para laptops antiguas, iGPUs y 4–8 GB RAM
          </p>
          <h1 className="font-semibold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            ¿Tu juego de Windows corre en <span className="text-primary">Linux</span>?
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
            Descúbrelo en segundos antes de migrar. Estado, causa del fallo y soluciones verificadas.
          </p>
          <form action="/buscar" method="get" role="search" className="w-full max-w-2xl mx-auto bg-surface-container border border-outline p-2 rounded-xl">
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="q" className="sr-only">Buscar juego</label>
              <input id="q" name="q" autoComplete="off" placeholder="Escribe un juego (ej: GTA V, Valorant, CS2)…"
                className="flex-1 h-11 px-4 bg-background text-white placeholder-slate-500 text-sm rounded-lg border border-outline focus:border-primary focus:outline-none" />
              <button className="h-11 px-5 bg-primary text-[#0d1117] font-semibold text-sm rounded-lg" type="submit">Buscar Compatibilidad</button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2.5 border-t border-surface-container-high text-xs">
              <span className="text-slate-500 font-mono mr-1">Filtros:</span>
              <Link href="/buscar?estado=funciona" className="px-2.5 py-1 rounded-md bg-surface-container-high text-slate-200 border border-outline">100% Plug &amp; Play</Link>
              <Link href="/buscar?estado=funciona_con_ajustes" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Con Ajustes</Link>
              <Link href="/buscar?launcher=Steam" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Steam</Link>
              <Link href="/buscar?launcher=Epic" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Epic Games</Link>
            </div>
          </form>
        </section>

        <section aria-label="Simbología de compatibilidad" className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="funciona" /><p className="text-xs text-slate-400 mt-2">Clic en Jugar y corre. Sin terminal.</p></div>
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="funciona_con_ajustes" /><p className="text-xs text-slate-400 mt-2">Proton-GE o parámetro pegable.</p></div>
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="no_funciona" /><p className="text-xs text-slate-400 mt-2">Anti-cheat kernel. No forzar.</p></div>
        </section>

        <section aria-label="Juegos populares" className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {top.items.map((g) => <GameCard key={g.id} game={g} />)}
        </section>
      </main>
      <footer className="border-t border-outline bg-surface-container-lowest py-6 text-center text-xs text-slate-500 font-mono">© 2026 OpenGame Linux · MIT</footer>
    </>
  );
}
