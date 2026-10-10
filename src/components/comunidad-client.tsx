"use client";
import { useState } from "react";
import { REPORTS } from "@/lib/reports";
import { CATALOG } from "@/lib/games-data";

export function ComunidadClient() {
  const [filter, setFilter] = useState("");
  const [items, setItems] = useState(REPORTS);
  const [form, setForm] = useState({ autor: "", gpu: "", fps: "50", texto: "" });
  const [msg, setMsg] = useState("");
  const [isMod, setIsMod] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);

  async function votar(id: number) {
    const r = await fetch(`/api/reports/${id}/vote`, { method: "POST" });
    if (r.ok) setItems(items.map((x) => (x.id === id ? { ...x, votos: x.votos + 1 } : x)));
  }

  async function promover(id: number) {
    const r = await fetch(`/api/reports/${id}/promote`, { method: "PATCH", headers: { "x-role": "moderator" } });
    if (r.ok) setItems(items.map((x) => (x.id === id ? { ...x, estado: "verificada" as const } : x)));
  }

  async function crear(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.autor.trim().length < 2) errs.autor = "Escribe tu nombre (mínimo 2 letras).";
    if (form.gpu.trim().length < 2) errs.gpu = "Indica tu tarjeta gráfica, ej. GTX 750 Ti 2GB.";
    const fps = Number(form.fps);
    if (!Number.isFinite(fps) || fps < 0 || fps > 500) errs.fps = "FPS entre 0 y 500.";
    if (form.texto.trim().length < 10) errs.texto = "Cuéntanos un poco más (mínimo 10 caracteres).";
    setFieldErrors(errs);
    setFormError("");
    setMsg("");
    if (Object.keys(errs).length > 0) {
      setFormError("Revisa los campos marcados antes de publicar.");
      return;
    }
    setSending(true);
    try {
      const r = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: 1, autor: form.autor.trim(), gpu: form.gpu.trim(), ramGb: 8, fps, texto: form.texto.trim() }),
      });
      const j = await r.json();
      if (j.ok) {
        setItems([j.data, ...items]);
        setMsg("Publicado como pendiente de revisión. Un moderator lo verificará.");
        setForm({ autor: "", gpu: "", fps: "50", texto: "" });
      } else setFormError(j.error ?? "No se pudo publicar. Inténtalo de nuevo.");
    } catch {
      setFormError("Sin conexión con el servidor. Revisa tu internet e inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  const shown = items.filter((x) => !filter || x.gpu.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs" role="group" aria-label="Filtrar por GPU">
        {["", "750", "1050", "rx", "intel"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded border ${filter === f ? "bg-surface-container-high text-white border-primary" : "bg-surface-container text-slate-400 border-outline"}`}>
            {f || "Todas las GPUs"}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1 text-slate-400">
          <input type="checkbox" checked={isMod} onChange={(e) => setIsMod(e.target.checked)} className="accent-[#58a6ff]" /> Vista moderator (demo)
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {shown.map((r) => {
          const g = CATALOG.find((x) => x.id === r.gameId);
          return (
            <article key={r.id} className="steel-card rounded-lg p-5">
              <div className="flex justify-between gap-2">
                <p className="font-medium text-sm text-white">{r.autor} <span className="font-mono text-xs text-slate-500">· {g?.nombre}</span></p>
                <span className={`font-mono text-xs px-2 py-0.5 rounded border ${r.estado === "verificada" ? "text-emerald-400 border-emerald-800/40 bg-emerald-950/50" : "text-amber-300 border-amber-800/40"}`}>
                  {r.estado === "verificada" ? "✓ Solución verificada" : r.estado}
                </span>
              </div>
              <p className="font-mono text-xs text-primary mt-1">GPU: {r.gpu} · {r.fps} FPS</p>
              <p className="text-xs text-slate-400 bg-background border border-outline rounded p-3 mt-2">“{r.texto}”</p>
              <div className="flex justify-between items-center mt-3 font-mono text-xs text-slate-500">
                <span>{r.fecha}</span>
                <span className="flex gap-1">
                  <button onClick={() => votar(r.id)} className="px-2.5 py-1 rounded bg-surface-container-high border border-outline" aria-label={`Marcar útil reporte de ${r.autor}`}>
                    Útil ({r.votos})
                  </button>
                  {isMod && r.estado !== "verificada" && (
                    <button onClick={() => promover(r.id)} className="px-2.5 py-1 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                      Verificar
                    </button>
                  )}
                </span>
              </div>
            </article>
          );
        })}
      </div>
      <form onSubmit={crear} noValidate className="steel-card rounded-lg p-5 mt-6 max-w-xl" aria-describedby="reporte-ayuda">
        <h2 className="font-semibold text-white text-sm">Enviar reporte (requiere cuenta en prod)</h2>
        <p id="reporte-ayuda" className="text-xs text-slate-500 mt-1">Cuéntanos tu caso con tu GPU real: ayuda a quien tenga un equipo parecido.</p>
        {formError && <p role="alert" className="text-xs text-rose-300 bg-rose-950/30 border border-rose-800/40 rounded p-2 mt-3">{formError}</p>}
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <label>GPU
            <input value={form.gpu} onChange={(e) => setForm({ ...form, gpu: e.target.value })} placeholder="GTX 750 Ti 2GB" aria-invalid={!!fieldErrors.gpu} aria-describedby={fieldErrors.gpu ? "err-gpu" : undefined} className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" />
            {fieldErrors.gpu && <span id="err-gpu" role="alert" className="text-rose-300">{fieldErrors.gpu}</span>}
          </label>
          <label>FPS
            <input type="number" min={0} max={500} value={form.fps} onChange={(e) => setForm({ ...form, fps: e.target.value })} aria-invalid={!!fieldErrors.fps} aria-describedby={fieldErrors.fps ? "err-fps" : undefined} className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" />
            {fieldErrors.fps && <span id="err-fps" role="alert" className="text-rose-300">{fieldErrors.fps}</span>}
          </label>
        </div>
        <label className="block text-xs mt-2">Autor
          <input value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} aria-invalid={!!fieldErrors.autor} aria-describedby={fieldErrors.autor ? "err-autor" : undefined} className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" />
          {fieldErrors.autor && <span id="err-autor" role="alert" className="text-rose-300">{fieldErrors.autor}</span>}
        </label>
        <label className="block text-xs mt-2">Comentario (mínimo 10 caracteres)
          <textarea value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} rows={3} aria-invalid={!!fieldErrors.texto} aria-describedby={fieldErrors.texto ? "err-texto" : undefined} className="mt-1 w-full rounded bg-background border border-outline p-2" />
          {fieldErrors.texto && <span id="err-texto" role="alert" className="text-rose-300">{fieldErrors.texto}</span>}
        </label>
        <button disabled={sending} className="mt-3 px-4 py-2 rounded bg-primary text-[#0d1117] font-semibold text-xs disabled:opacity-60" type="submit">{sending ? "Publicando…" : "Publicar reporte"}</button>
        {msg && <p role="status" className="text-xs text-emerald-400 mt-2">{msg}</p>}
      </form>
    </div>
  );
}
