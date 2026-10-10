import Link from "next/link";
import type { CompatEstado } from "@/lib/games-data";

const MAP: Record<CompatEstado, { label: string; cls: string }> = {
  funciona: { label: "PLATINO / JUGABLE", cls: "bg-emerald-950/50 text-emerald-400 border-emerald-800/40" },
  funciona_con_ajustes: { label: "TWEAK FÁCIL", cls: "bg-amber-950/50 text-amber-300 border-amber-800/40" },
  no_funciona: { label: "BLOQUEADO", cls: "bg-rose-950/50 text-rose-300 border-rose-800/40" },
  desconocido: { label: "DESCONOCIDO", cls: "bg-surface-container-high text-slate-400 border-outline" },
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
      <span aria-current="page" className="px-3 py-1.5 rounded-md text-xs font-medium text-white bg-surface-container-high border border-outline">
        {label}
      </span>
    ) : (
      <Link className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white hover:bg-surface-container" href={href}>
        {label}
      </Link>
    );
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-outline">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span aria-hidden className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-high border border-outline font-mono text-primary">{">_"}</span>
          <span className="font-semibold text-sm text-white">OpenGame<span className="text-primary">Linux</span></span>
        </Link>
        <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
          {link("/", "Buscador", "buscador")}
          {link("/diagnostico", "Diagnóstico PC", "diag")}
          {link("/guia", "Guía Proton", "guia")}
          {link("/comunidad", "Comunidad", "comu")}
          {link("/adopcion", "Migración", "migra")}
        </nav>
        <Link href="/diagnostico" className="px-3.5 py-1.5 rounded-md text-xs font-medium text-white bg-surface-container-high border border-outline">
          Escanear mi PC
        </Link>
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
