import { SiteHeader, GameCard, StatusBadge } from "@/components/ui";
import { searchGames } from "@/lib/search";
import { CATALOG } from "@/lib/games-data";
import Link from "next/link";

export const revalidate = 3600; // RNF-02: ISR catálogo

const FAQS = [
  {
    q: "¿Pierdo mis juegos o mis partidas si me paso a Linux?",
    a: "No. Tus cuentas de Steam, Epic y GOG siguen iguales y tus compras se conservan. Las partidas guardadas en la nube (Steam Cloud) se sincronizan solas entre Windows y Linux.",
  },
  {
    q: "¿Qué significa «Con 1 ajuste»?",
    a: "Que el juego funciona copiando un texto corto que te damos listo en las propiedades del juego. Son 2 minutos con guía paso a paso, sin instalar nada raro.",
  },
  {
    q: "¿Por qué Valorant, LoL o Fortnite salen como «No funciona»?",
    a: "Sus creadores los bloquean a propósito con un candado antipiratería que no admite Linux. No hay truco seguro: intentar saltarlo puede costarte la cuenta.",
  },
  {
    q: "¿Mi PC de 4 u 8 GB de memoria sirve?",
    a: "Sí para la mayoría del catálogo. Cada ficha te dice cuánta memoria pide el juego y qué versión ligera de Linux le conviene a tu equipo.",
  },
  {
    q: "¿Necesito saber usar la terminal?",
    a: "No. Todo se hace con clics y botones de copiar. La terminal solo aparece como opción avanzada para comprobar controladores.",
  },
  {
    q: "¿Cuánto cuesta usar OpenGame Linux?",
    a: "Nada. La plataforma, las guías y los programas que recomienda son gratuitos y de código abierto.",
  },
];

export default function Home() {
  const top = searchGames({ limit: 4 });
  const okCount = CATALOG.filter((g) => g.estado === "funciona").length;
  const tweakCount = CATALOG.filter((g) => g.estado === "funciona_con_ajustes").length;
  return (
    <>
      <SiteHeader active="buscador" />
      <main id="contenido">
        <section className="pt-10 pb-10 px-4 border-b border-surface-container-high text-center">
          <p className="inline-flex px-3 py-1 rounded-full bg-surface-container border border-outline text-xs font-mono text-slate-300 mb-6">
            Optimizado para laptops antiguas, iGPUs y 4–8 GB RAM
          </p>
          <h1 className="font-semibold text-3xl sm:text-5xl tracking-tight text-white mb-4 text-balance max-w-[680px] mx-auto">
            ¿Tu juego de Windows corre en <span className="text-primary">Linux</span>?
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 text-pretty">
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
              <Link href="/buscar?estado=funciona" className="px-2.5 py-1 rounded-md bg-surface-container-high text-slate-200 border border-outline">Funciona sin tocar nada</Link>
              <Link href="/buscar?estado=funciona_con_ajustes" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Con 1 ajuste</Link>
              <Link href="/buscar?launcher=Steam" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Steam</Link>
              <Link href="/buscar?launcher=Epic" className="px-2.5 py-1 rounded-md bg-surface-container text-slate-400 border border-outline">Epic Games</Link>
            </div>
          </form>
          <p className="text-xs font-mono text-slate-500 mt-4">
            {CATALOG.length} juegos revisados · {okCount} funcionan sin tocar nada · {tweakCount} con 1 ajuste · 100% gratis
          </p>
        </section>

        <section aria-label="Simbología de compatibilidad" className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="funciona" /><p className="text-xs text-slate-400 mt-2">Instalas y juegas, como en Windows. Sin tocar nada raro.</p></div>
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="funciona_con_ajustes" /><p className="text-xs text-slate-400 mt-2">Funciona copiando un ajuste que te damos listo para pegar.</p></div>
          <div className="steel-card rounded-xl p-5"><StatusBadge estado="no_funciona" /><p className="text-xs text-slate-400 mt-2">El creador lo bloquea en Linux. Mejor no insistir: hay riesgo de baneo.</p></div>
        </section>

        <section aria-label="Juegos populares" className="max-w-7xl mx-auto px-4 pb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {top.items.map((g) => <GameCard key={g.id} game={g} />)}
        </section>

        <section aria-label="Preguntas frecuentes" className="max-w-3xl mx-auto px-4 pb-12">
          <h2 className="font-semibold text-xl text-white text-center">Preguntas de quien migra por primera vez</h2>
          <div className="mt-4 space-y-2">
            {FAQS.map((f) => (
              <details key={f.q} className="steel-card rounded-xl px-4 py-3 group">
                <summary className="text-sm font-medium text-white cursor-pointer list-none flex justify-between gap-3">
                  {f.q}
                  <span aria-hidden className="shrink-0 group-open:rotate-180 transition-transform"><svg viewBox="0 0 16 16" className="h-4 w-4 text-primary"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                </summary>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed text-pretty">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-label="Buscar de nuevo" className="border-t border-surface-container-high">
          <div className="max-w-2xl mx-auto px-4 py-10 text-center">
            <h2 className="font-semibold text-xl text-white">Busca tu juego y sal de dudas</h2>
            <p className="text-sm text-slate-400 mt-1 mb-5">Te decimos si funciona, con qué ajuste y si tu PC lo aguanta.</p>
            <Link href="/buscar" className="inline-block px-6 py-2.5 bg-primary text-[#0d1117] font-semibold text-sm rounded-lg">
              Ir al buscador
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t border-outline bg-surface-container-lowest py-6 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 OpenGame Linux · MIT</p>
        <p className="mt-2 flex justify-center gap-4">
          <Link href="/privacidad" className="hover:text-slate-300">Privacidad</Link>
          <Link href="/terminos" className="hover:text-slate-300">Términos</Link>
          <Link href="/buscar" className="hover:text-slate-300">Buscador</Link>
        </p>
      </footer>
    </>
  );
}
