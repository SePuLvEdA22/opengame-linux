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
    const r = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId: 1, autor: form.autor, gpu: form.gpu, ramGb: 8, fps: Number(form.fps), texto: form.texto }),
    });
    const j = await r.json();
    if (j.ok) {
      setItems([j.data, ...items]);
      setMsg("Publicado como pendiente de revisión. Un moderator lo verificará.");
      setForm({ autor: "", gpu: "", fps: "50", texto: "" });
    } else setMsg(j.error ?? "Error");
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
                    👍 Útil ({r.votos})
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
      <form onSubmit={crear} className="steel-card rounded-lg p-5 mt-6 max-w-xl">
        <h2 className="font-semibold text-white text-sm">Enviar reporte (requiere cuenta en prod)</h2>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <label>GPU<input required value={form.gpu} onChange={(e) => setForm({ ...form, gpu: e.target.value })} placeholder="GTX 750 Ti 2GB" className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" /></label>
          <label>FPS<input required type="number" value={form.fps} onChange={(e) => setForm({ ...form, fps: e.target.value })} className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" /></label>
        </div>
        <label className="block text-xs mt-2">Autor<input required value={form.autor} onChange={(e) => setForm({ ...form, autor: e.target.value })} className="mt-1 w-full h-9 rounded bg-background border border-outline px-2" /></label>
        <label className="block text-xs mt-2">Comentario<textarea required value={form.texto} onChange={(e) => setForm({ ...form, texto: e.target.value })} rows={3} className="mt-1 w-full rounded bg-background border border-outline p-2" /></label>
        <button className="mt-3 px-4 py-2 rounded bg-primary text-[#0d1117] font-semibold text-xs" type="submit">Publicar reporte</button>
        {msg && <p role="status" className="text-xs text-emerald-400 mt-2">{msg}</p>}
      </form>
    </div>
  );
}
