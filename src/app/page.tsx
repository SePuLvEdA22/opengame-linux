import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-outline">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high border border-outline font-mono text-primary">
              {">_"}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-white">
                OpenGame<span className="text-primary">Linux</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Tu biblioteca de Windows, optimizada para Linux
              </span>
            </div>
          </div>
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1 text-xs">
            <Link className="px-3 py-1.5 rounded-md text-white bg-surface-container-high border border-outline" href="/">
              Buscador
            </Link>
            <Link className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-surface-container" href="/diagnostico">
              Diagnóstico PC
            </Link>
            <Link className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-surface-container" href="/guia">
              Guía Proton
            </Link>
            <Link className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-surface-container" href="/comunidad">
              Comunidad
            </Link>
            <Link className="px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-surface-container" href="/adopcion">
              Migración
            </Link>
          </nav>
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-surface-container-high hover:bg-[#30363d] border border-outline"
          >
            Escanear mi PC
          </Link>
        </div>
      </header>

      <main id="contenido" className="pt-16">
        <section className="pt-12 pb-10 px-4 border-b border-surface-container-high text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline text-xs font-mono text-slate-300 mb-6">
            Optimizado para laptops antiguas, iGPUs y 4–8 GB RAM
          </p>
          <h1 className="font-semibold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            ¿Tu juego de Windows corre en <span className="text-primary">Linux</span>?
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8">
            Descúbrelo en segundos antes de migrar. Fase 0: fundación lista. Buscador, diagnóstico y guías llegan en Fase 1–5.
          </p>
          <form action="/buscar" method="get" className="w-full max-w-2xl mx-auto bg-surface-container border border-outline p-2 rounded-xl flex gap-2">
            <label htmlFor="q" className="sr-only">
              Buscar juego
            </label>
            <input
              id="q"
              name="q"
              className="flex-1 h-11 px-4 bg-background text-white placeholder-slate-500 text-sm rounded-lg border border-outline focus:border-primary focus:outline-none"
              placeholder="Escribe un juego (ej: GTA V, Valorant, CS2)…"
              autoComplete="off"
            />
            <button className="h-11 px-5 bg-primary hover:brightness-110 text-[#0d1117] font-semibold text-sm rounded-lg" type="submit">
              Buscar
            </button>
          </form>
        </section>

        <section aria-label="Estados de compatibilidad" className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "VERDE: PLUG & PLAY", d: "Clic en Jugar y corre. Sin terminal.", c: "text-emerald-400 border-emerald-800/40 bg-emerald-950/50" },
            { t: "AMARILLO: TWEAK FÁCIL", d: "Proton-GE o parámetro pegable.", c: "text-amber-300 border-amber-800/40 bg-amber-950/50" },
            { t: "ROJO: BLOQUEADO", d: "Anti-cheat kernel (Vanguard). No forzar.", c: "text-rose-300 border-rose-800/40 bg-rose-950/50" },
          ].map((s) => (
            <div key={s.t} className="steel-card rounded-xl p-5">
              <span className={`font-mono text-[11px] px-2.5 py-0.5 rounded-md border ${s.c}`}>{s.t}</span>
              <p className="text-xs text-slate-400 mt-3">{s.d}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-outline bg-surface-container-lowest py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 OpenGame Linux · MIT · Fase 0 — fundación
      </footer>
    </>
  );
}
