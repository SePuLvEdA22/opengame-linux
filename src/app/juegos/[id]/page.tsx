import { notFound } from "next/navigation";
import { SiteHeader, StatusBadge } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";
import { getGameById } from "@/lib/search";

export const revalidate = 3600;

export default async function Ficha({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGameById(Number(id));
  if (!game) notFound();
  return (
    <>
      <SiteHeader active="buscador" />
      <main id="contenido" className="pt-16">
        <section className="border-b border-outline bg-[#0d1117]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="font-mono text-xs text-slate-500">BASE DE DATOS / {game.genero.toUpperCase()} / APPID: {game.steamAppid ?? "—"}</p>
            <h1 className="text-3xl font-bold text-white mt-2">{game.nombre}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <StatusBadge estado={game.estado} />
              <span className="font-mono text-xs text-slate-400 border border-outline rounded px-2 py-0.5">{game.protonVersion}</span>
              <span className="font-mono text-xs text-slate-400 border border-outline rounded px-2 py-0.5">Actualizado: {game.fechaVerificacion}</span>
            </div>
            {game.estado === "no_funciona" ? (
              <p className="text-sm text-rose-200 bg-rose-950/30 border border-rose-800/40 rounded-lg p-4 mt-4">{game.causaFallo}</p>
            ) : (
              <p className="text-sm text-slate-400 mt-4 max-w-2xl">{game.fpsEstimado}. {game.fpsDetalle} {game.reportes} reportes verificados ({game.exitoPct}% éxito).</p>
            )}
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 steel-card rounded-lg p-5">
            <h2 className="font-semibold text-white">Guía rápida en 3 pasos</h2>
            <ol className="text-xs text-slate-400 mt-3 space-y-2 list-decimal list-inside">
              <li>Forzar <span className="font-mono text-primary">{game.protonVersion}</span> en Propiedades → Compatibilidad.</li>
              <li>Pegar en parámetros: <code className="font-mono text-primary break-all">{game.envVars || "(nativo, sin parámetros)"}</code></li>
              <li>Ajustes in-game: DirectX 11, MSAA OFF, FXAA ON (equipos 4–8 GB).</li>
            </ol>
            {game.envVars && (
              <div className="mt-3">
                <CopyButton text={game.envVars} />
              </div>
            )}
          </div>
          <aside className="steel-card rounded-lg p-5">
            <h2 className="font-semibold text-sm text-white">Telemetría</h2>
            <dl className="text-xs font-mono text-slate-400 mt-2 space-y-1">
              <div className="flex justify-between"><dt>Anti-cheat</dt><dd className="text-slate-200">{game.anticheat ?? "—"}</dd></div>
              <div className="flex justify-between"><dt>DRM</dt><dd className="text-slate-200">{game.drm ?? "—"}</dd></div>
              <div className="flex justify-between"><dt>RAM mín.</dt><dd className="text-slate-200">{game.reqMinRamGb} GB</dd></div>
              <div className="flex justify-between"><dt>Launcher</dt><dd className="text-slate-200">{game.launcher.join(", ")}</dd></div>
            </dl>
          </aside>
        </div>
      </main>
    </>
  );
}
