import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader, StatusBadge } from "@/components/ui";
import { CopyButton } from "@/components/copy-button";
import { getGameById } from "@/lib/search";
import { verifiedSolutions } from "@/lib/reports";
import { buildComparator } from "@/lib/comparator";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGameById(Number(id));
  if (!game) return { title: "Juego no encontrado" };
  const verdict = game.estado === "funciona" ? "Funciona" : game.estado === "funciona_con_ajustes" ? "Funciona con 1 ajuste" : "No funciona";
  return {
    title: `${game.nombre}: ${verdict} en Linux`,
    description: `${game.fpsEstimado}. Proton ${game.protonVersion}. ${game.reportes} reportes de la comunidad.`,
  };
}

export default async function Ficha({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const game = getGameById(Number(id));
  if (!game) notFound();
  const sols = verifiedSolutions(game.id);
  const comp = buildComparator(game);
  return (
    <>
      <SiteHeader active="buscador" />
      <main id="contenido">
        <section className="border-b border-outline bg-[#0d1117]">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="font-mono text-xs text-slate-500">{game.genero}</p>
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
            <h2 className="font-semibold text-white">Guía rápida en 3 pasos <span className="font-mono text-xs text-slate-500">· ~2 min</span></h2>
            <ol className="text-xs text-slate-400 mt-3 space-y-3 list-none">
              <li className="bg-background border border-outline rounded p-3"><strong className="text-white">1. Forzar {game.protonVersion}</strong><br />Biblioteca → Propiedades → Compatibilidad → “Forzar uso de compatibilidad”.</li>
              <li className="bg-background border border-outline rounded p-3"><strong className="text-white">2. Parámetros Vulkan (quita stutter)</strong><br /><code className="font-mono text-primary break-all">{game.envVars || "(nativo, sin parámetros)"}</code></li>
              <li className="bg-background border border-outline rounded p-3"><strong className="text-white">3. In-game para 4–8 GB</strong>
                <span className="grid grid-cols-3 gap-1 mt-2 font-mono text-xs">
                  <span className="border border-outline rounded p-1">DX11 <em className="text-primary not-italic">DirectX 11</em></span>
                  <span className="border border-outline rounded p-1">MSAA <em className="text-rose-300 not-italic">OFF</em></span>
                  <span className="border border-outline rounded p-1">FXAA <em className="text-emerald-400 not-italic">ON</em></span>
                </span>
              </li>
            </ol>
            {game.envVars && (
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton text={game.envVars} />
                <Link href={`/guia?gameId=${game.id}`} className="px-3 py-1.5 rounded bg-primary text-[#0d1117] font-semibold text-xs">Abrir guía completa</Link>
                <Link href="/diagnostico" className="px-3 py-1.5 rounded bg-surface-container-high border border-outline text-xs">¿Mi PC lo corre?</Link>
              </div>
            )}
          </div>
          <aside className="steel-card rounded-lg p-5">
            <h2 className="font-semibold text-sm text-white">Telemetría banco de pruebas</h2>
            <dl className="mt-3 space-y-2 text-xs">
              <div className="bg-background border border-outline rounded p-2"><dt className="font-mono text-xs text-slate-500">FPS ESTIMADOS</dt><dd className="font-mono text-white">{game.fpsEstimado}</dd><dd className="text-slate-500">{game.fpsDetalle}</dd></div>
              <div className="bg-background border border-outline rounded p-2"><dt className="font-mono text-xs text-slate-500">RUNNER</dt><dd className="font-mono text-primary">{game.protonVersion}</dd></div>
              <div className="bg-background border border-outline rounded p-2"><dt className="font-mono text-xs text-slate-500">ANTI-CHEAT / DRM</dt><dd className="text-white">{game.anticheat ?? "—"} / {game.drm ?? "—"}</dd></div>
              <div className="bg-background border border-outline rounded p-2"><dt className="font-mono text-xs text-slate-500">RAM</dt><dd className="font-mono text-white">{game.reqMinRamGb} GB mín</dd><dd className="text-slate-500">Ideal distro ligera 8 GB</dd></div>
              <div className="bg-background border border-outline rounded p-2"><dt className="font-mono text-xs text-slate-500">FICHA STEAM</dt><dd className="font-mono text-slate-300">{game.steamAppid ?? "Sin ficha (solo launcher externo)"}</dd></div>
            </dl>
          </aside>
        </div>
        {comp && (
          <div className="max-w-7xl mx-auto px-4 pb-4">
            <div className="steel-card rounded-lg p-5">
              <h2 className="font-semibold text-white text-sm">Windows 10 vs Linux en PC modesta ({game.reqMinRamGb} GB)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                <div><p className="font-mono text-emerald-400">Linux + tweaks · {comp.linuxFps} FPS · {comp.linuxRamFreeGb} GB libres</p><div className="h-2 rounded bg-background border border-outline mt-1"><div className="h-full bg-emerald-600 rounded" style={{ width: `${Math.min(100, comp.linuxFps)}%` }} /></div></div>
                <div><p className="font-mono text-slate-500">Windows 10 stock · {comp.windowsFps} FPS · {comp.windowsRamFreeGb} GB libres</p><div className="h-2 rounded bg-background border border-outline mt-1"><div className="h-full bg-slate-600 rounded" style={{ width: `${Math.min(100, comp.windowsFps)}%` }} /></div></div>
              </div>
              <p className="text-xs text-slate-400 mt-3"><strong className="text-white">Conclusión:</strong> {comp.conclusion} (−{comp.latencySavingMs} ms frame-pacing).</p>
            </div>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="steel-card rounded-lg p-5">
            <h2 className="font-semibold text-white text-sm">Soluciones verificadas ({sols.length}) · Actualizado {game.fechaVerificacion}</h2>
            {sols.length === 0 ? (
              <p className="text-xs text-slate-400 mt-2">Aún sin soluciones verificadas. Sé el primero en <Link href="/comunidad" className="text-primary">reportar</Link>.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {sols.map((s) => (
                  <li key={s.id} className="text-xs bg-background border border-outline rounded p-3">
                    <span className="text-emerald-400 font-mono">✓ {s.autor} · {s.gpu} · {s.fps} FPS · {s.votos} útiles</span>
                    <p className="text-slate-400 mt-1">“{s.texto}”</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
