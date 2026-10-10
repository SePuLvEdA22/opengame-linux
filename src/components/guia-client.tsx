"use client";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { buildLaunchCommand, buildSetupScript, getGuidedProfile } from "@/lib/profiles";
import { CATALOG } from "@/lib/games-data";

export function GuiaClient({ initialId }: { initialId: number }) {
  const [gameId, setGameId] = useState(initialId);
  const [proton, setProton] = useState<string | null>(null);
  const [tweaks, setTweaks] = useState<string[]>(["fsr", "cap"]);
  const profile = useMemo(() => getGuidedProfile(gameId)!, [gameId]);
  const activeProton = proton ?? profile.protonRecomendado;
  const extra = profile.tweaks.filter((t) => tweaks.includes(t.id)).map((t) => t.env);
  const cmd = buildLaunchCommand(profile.envBase, extra.filter((e) => !profile.envBase.includes(e)));
  const script = buildSetupScript(profile, activeProton, cmd);

  function download() {
    const blob = new Blob([script], { type: "text/x-shellscript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `opengame-${profile.juego.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.sh`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 flex flex-col gap-4">
        <div className="steel-card rounded-xl p-5">
          <label htmlFor="guia-juego" className="font-mono text-[11px] text-slate-500">JUEGO</label>
          <select id="guia-juego" value={gameId} onChange={(e) => { setGameId(Number(e.target.value)); setProton(null); }}
            className="mt-1 w-full h-10 rounded bg-background border border-outline px-3 text-sm">
            {CATALOG.map((g) => <option key={g.id} value={g.id}>{g.nombre} — {g.protonVersion}</option>)}
          </select>
        </div>
        <fieldset className="steel-card rounded-xl p-5">
          <legend className="font-semibold text-white px-1">Motor de compatibilidad (Paso 3/5)</legend>
          <div className="flex flex-col gap-2 mt-2">
            {profile.opciones.map((o) => (
              <label key={o.version} className="flex gap-3 p-3 rounded-xl bg-background border border-outline cursor-pointer text-xs">
                <input type="radio" name="proton" checked={activeProton === o.version} onChange={() => setProton(o.version)} className="mt-1 accent-[#58a6ff]" />
                <span><strong className="text-white">{o.version}</strong> {o.recomendada && <em className="text-emerald-400 not-italic font-mono">[Recomendado]</em>}<br /><span className="text-slate-400">{o.nota}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="steel-card rounded-xl p-5">
          <legend className="font-semibold text-white px-1">Aceleración hardware humilde</legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
            {profile.tweaks.map((t) => (
              <label key={t.id} className="bg-background border border-outline rounded-xl p-3 text-xs cursor-pointer">
                <span className="flex justify-between"><strong>{t.nombre}</strong>
                  <input type="checkbox" checked={tweaks.includes(t.id)} onChange={() => setTweaks(tweaks.includes(t.id) ? tweaks.filter((x) => x !== t.id) : [...tweaks, t.id])} className="accent-[#58a6ff]" />
                </span>
                <span className="text-slate-400 font-mono">{t.env}</span><br /><span className="text-emerald-400 font-mono">{t.ganancia}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <aside className="lg:col-span-4 steel-card rounded-xl p-5 h-fit lg:sticky lg:top-20">
        <p className="font-mono text-[11px] text-slate-500">PERFIL GENERADO</p>
        <h2 className="font-semibold text-white">{profile.juego}</h2>
        <p className="font-mono text-xs text-primary">{profile.launcher} · {activeProton}</p>
        <pre className="mt-3 font-mono text-xs text-emerald-300 bg-background border border-outline rounded-lg p-3 break-all whitespace-pre-wrap">{cmd}</pre>
        <div className="flex gap-2 mt-3">
          <CopyButton text={cmd} />
          <button onClick={download} className="px-3 py-1.5 rounded bg-primary text-[#0d1117] font-semibold text-xs">Descargar .sh</button>
        </div>
        <ol className="text-xs text-slate-400 mt-4 space-y-1 list-decimal list-inside">
          {profile.pasos.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
        <p className="font-mono text-[11px] text-slate-500 mt-3">100% reversible · sin terminal obligatorio</p>
      </aside>
    </div>
  );
}
