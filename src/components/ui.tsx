import Link from "next/link";
import type { CompatEstado } from "@/lib/games-data";

const MAP: Record<CompatEstado, { label: string; cls: string }> = {
  funciona: { label: "Funciona", cls: "bg-emerald-950/50 text-emerald-400 border-emerald-800/40" },
  funciona_con_ajustes: { label: "Con 1 ajuste", cls: "bg-amber-950/50 text-amber-300 border-amber-800/40" },
  no_funciona: { label: "No funciona", cls: "bg-rose-950/50 text-rose-300 border-rose-800/40" },
  desconocido: { label: "Sin datos", cls: "bg-surface-container-high text-slate-400 border-outline" },
};

export function StatusBadge({ estado }: { estado: CompatEstado }) {
  const m = MAP[estado];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border ${m.cls}`}>
      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current" />
      {m.label}
    </span>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  const link = (href: string, label: string, key: string) =>
    active === key ? (
      <span aria-current="page" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-surface-container-high border border-outline">
        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary" />
        {label}
      </span>
    ) : (
      <Link className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-surface-container border border-transparent hover:border-outline transition-colors" href={href}>
        {label}
      </Link>
    );
  return (
    <header className="sticky top-0 z-50 mb-3 bg-background/90 backdrop-blur-md border-b border-outline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-16 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="OpenGame Linux inicio">
            <span aria-hidden className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface-container-high border border-outline font-mono text-sm text-primary">▸_</span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-sm text-white">OpenGame<span className="text-primary">Linux</span>
                <span className="ml-2 font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-container text-slate-400 border border-outline align-middle">v2.4</span>
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">Tu biblioteca de Windows, optimizada para Linux</span>
            </span>
          </Link>
          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1 bg-surface-container-lowest/60 border border-outline rounded-xl p-1">
            {link("/", "Buscador", "buscador")}
            {link("/diagnostico", "Diagnóstico PC", "diag")}
            {link("/guia", "Guía Proton", "guia")}
            {link("/comunidad", "Comunidad", "comu")}
            {link("/adopcion", "Migración", "migra")}
            {link("/cuenta", "Cuenta", "cuenta")}
          </nav>
          <span className="flex items-center gap-2 shrink-0">
            <span className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-slate-400 border border-outline rounded-lg px-2.5 py-1.5 bg-surface-container">
              <span className="text-slate-200">VK 1.3</span><span aria-hidden className="text-slate-600">/</span><span className="text-slate-200">GE-Proton 9</span>
            </span>
            <Link href="/diagnostico" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#0d1117] bg-primary hover:brightness-110 transition">
              Escanear mi PC
            </Link>
          </span>
        </div>
        <nav aria-label="Principal móvil" className="lg:hidden flex gap-1 overflow-x-auto pb-3 -mx-1 px-1">
          {link("/", "Buscador", "buscador")}
          {link("/diagnostico", "Diagnóstico", "diag")}
          {link("/guia", "Guía", "guia")}
          {link("/comunidad", "Comunidad", "comu")}
          {link("/adopcion", "Migración", "migra")}
          {link("/cuenta", "Cuenta", "cuenta")}
        </nav>
      </div>
    </header>
  );
}

export function GameCard({ game }: { game: import("@/lib/games-data").CatalogGame }) {
  return (
    <article className="steel-card rounded-xl p-5 flex flex-col justify-between gap-3">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-base text-white">
            <Link href={`/juegos/${game.id}`} className="hover:text-primary focus-visible:outline-primary">
              {game.nombre}
            </Link>
          </h3>
          <StatusBadge estado={game.estado} />
        </div>
        <p className="text-xs text-slate-400 font-mono mb-3">{game.launcher.join(" · ")} — {game.protonVersion}</p>
        <p className="text-xs text-slate-400 bg-background border border-outline rounded-lg p-3">
          {game.estado === "no_funciona" ? game.causaFallo : `${game.fpsEstimado}. ${game.fpsDetalle}`}
        </p>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-outline text-xs">
        <span className="text-slate-500 font-mono">{game.reportes} reportes · {game.exitoPct}% éxito</span>
        <Link href={`/juegos/${game.id}`} className="text-primary hover:brightness-125 font-medium">
          Ver ficha →
        </Link>
      </div>
    </article>
  );
}
