"use client";
import { useState } from "react";
import { estimarDesdeWindows } from "@/lib/diagnostics";

type MatrizItem = { gameId: number; nombre: string; semaforo: string; explicacion: string; fps: string };

function webglRenderer(): string {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return "";
    const dbg = gl.getExtension("WEBGL_debug_renderer_info") as { UNMASKED_RENDERER_WEBGL?: number } | null;
    const param = dbg?.UNMASKED_RENDERER_WEBGL ?? gl.RENDERER;
    return String(gl.getParameter(param));
  } catch {
    return "";
  }
}

export function DiagnosticoClient() {
  const [jsonText, setJsonText] = useState('{"cpu":"Intel i5-4590","gpu":"GTX 1050 2GB","ramGb":8,"driver":"535","vulkan":"1.3","distro":"Mint 21.3"}');
  const [manual, setManual] = useState({ gpu: "NVIDIA GTX 1050 (2GB)", ramGb: "8" });
  const [matriz, setMatriz] = useState<MatrizItem[] | null>(null);
  const [error, setError] = useState("");
  const [nota, setNota] = useState("");
  const [loading, setLoading] = useState(false);

  async function enviar(hardware: unknown) {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/diagnostics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hardware }),
      });
      const j = await r.json();
      if (!j.ok) throw new Error(j.error ?? "Error");
      setMatriz(j.data.matriz);
      setNota(hardware && typeof hardware === "object" && "distro" in (hardware as object) && (hardware as { distro: string }).distro.includes("Windows") ? "Estimación Windows (WebGL + memoria aproximada): precisión menor. Para exactitud usa el script en Linux." : "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="steel-card rounded-xl p-5">
        <p className="font-mono text-[11px] text-emerald-400 border border-emerald-800/40 rounded px-2 py-0.5 inline-block">Recomendado · 1.84 MB · Sin root · 100% local</p>
        <h2 className="font-semibold text-white mt-2">1. Detector automático</h2>
        <div className="flex gap-2 mt-3">
          <a href="/api/cli/download" className="px-4 py-2 rounded-lg bg-primary text-[#0d1117] font-semibold text-xs">Descargar OpenGame-Detect.sh</a>
        </div>
        <p className="font-mono text-[11px] text-slate-500 mt-2">Ejecuta: <code className="text-slate-300">sh OpenGame-Detect.sh</code> y pega el JSON:</p>
        <label htmlFor="cli-json" className="sr-only">Pegar JSON del detector</label>
        <textarea id="cli-json" rows={5} value={jsonText} onChange={(e) => setJsonText(e.target.value)}
          className="w-full mt-2 font-mono text-xs bg-background border border-outline rounded-lg p-3 text-emerald-300" />
        <div className="flex gap-2 mt-2">
          <button onClick={() => { try { enviar(JSON.parse(jsonText)); } catch { setError("JSON inválido"); } }} disabled={loading}
            className="px-4 py-2 rounded-lg bg-surface-container-high border border-outline text-xs font-medium">
            {loading ? "Analizando…" : "Analizar mi JSON"}
          </button>
          <label className="px-4 py-2 rounded-lg bg-surface-container border border-outline text-xs cursor-pointer">
            Subir .json
            <input type="file" accept=".json,application/json" className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) setJsonText(await f.text());
              }} />
          </label>
        </div>
      </div>

      <div className="steel-card rounded-xl p-5">
        <p className="font-mono text-[11px] text-slate-400 border border-outline rounded px-2 py-0.5 inline-block">Modo offline · Manual</p>
        <h2 className="font-semibold text-white mt-2">2. Selección manual / Windows</h2>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <label className="flex flex-col gap-1">GPU
            <select value={manual.gpu} onChange={(e) => setManual({ ...manual, gpu: e.target.value })}
              className="h-9 rounded bg-background px-2 border border-outline">
              <option>NVIDIA GTX 1050 (2GB)</option>
              <option>AMD Radeon RX 570 (4GB)</option>
              <option>Intel Iris Xe Graphics</option>
              <option>NVIDIA GTX 750 Ti (2GB)</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">RAM (GB)
            <select value={manual.ramGb} onChange={(e) => setManual({ ...manual, ramGb: e.target.value })}
              className="h-9 rounded bg-background px-2 border border-outline">
              <option>4</option><option>8</option><option>12</option><option>16</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <button onClick={() => enviar({ cpu: "manual", gpu: manual.gpu, ramGb: Number(manual.ramGb), vulkan: "1.3", driver: "mesa", distro: "manual" })}
            className="px-4 py-2 rounded-lg bg-surface-container-high border border-outline text-xs">Recalcular matriz</button>
          <button onClick={() => {
            const r = webglRenderer();
            const dm = typeof navigator !== "undefined" ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory : undefined;
            enviar(estimarDesdeWindows(r, dm));
          }} className="px-4 py-2 rounded-lg bg-surface-container border border-outline text-xs">Estimar este PC (Windows)</button>
        </div>
        {error && <p role="alert" className="text-xs text-rose-300 mt-3">{error}</p>}
        {nota && <p className="text-[11px] text-amber-300 mt-3">{nota}</p>}
      </div>

      {matriz && (
        <div className="lg:col-span-2 steel-card rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[640px]">
            <caption className="text-left p-4 font-semibold text-white">Matriz de rendimiento estimado — 5 títulos auditados</caption>
            <thead><tr className="text-slate-500 font-mono">
              <th className="p-3">Juego</th><th className="p-3">Semáforo</th><th className="p-3">FPS</th><th className="p-3">Explicación</th><th className="p-3">Guía</th>
            </tr></thead>
            <tbody>
              {matriz.map((m) => (
                <tr key={m.gameId} className="border-t border-outline">
                  <td className="p-3 text-white">{m.nombre}</td>
                  <td className="p-3 font-mono">{m.semaforo === "verde" ? "🟢 Verde" : m.semaforo === "amarillo" ? "🟡 Amarillo" : "🔴 Rojo"}</td>
                  <td className="p-3 font-mono">{m.fps}</td>
                  <td className="p-3 text-slate-400">{m.explicacion}</td>
                  <td className="p-3"><a href={`/guia?gameId=${m.gameId}`} className="text-primary hover:underline">Configurar →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="p-4 text-[11px] font-mono text-slate-500">¿Equipo justo? Mira <a href="/adopcion" className="text-primary">distros livianas recomendadas</a> (Mint XFCE 4–8 GB, Bazzite 8 GB+, Lubuntu 2–4 GB).</p>
        </div>
      )}
    </div>
  );
}
