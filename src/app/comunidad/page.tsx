import { SiteHeader } from "@/components/ui";
import { ComunidadClient } from "@/components/comunidad-client";

export const metadata = { title: "Comunidad — OpenGame Linux" };

export default function ComunidadPage() {
  return (
    <>
      <SiteHeader active="comu" />
      <main id="contenido" className="pt-16 max-w-7xl mx-auto px-4 py-8">
        <p className="font-mono text-xs text-primary">Reportes de rendimiento reales</p>
        <h1 className="text-2xl font-semibold text-white mt-1">Comprobaciones de la Comunidad</h1>
        <p className="text-xs text-slate-400 mt-1">Filtra por GPU. Solo <span className="text-emerald-400">moderator</span> promueve a “Solución verificada” (PATCH con <code className="font-mono">x-role: moderator</code>).</p>
        <div className="mt-6"><ComunidadClient /></div>
      </main>
    </>
  );
}
