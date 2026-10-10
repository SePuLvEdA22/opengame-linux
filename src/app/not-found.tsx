import Link from "next/link";
import { SiteHeader } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="max-w-xl mx-auto px-4 py-16 text-center">
        <p className="font-mono text-xs text-primary">Error 404</p>
        <h1 className="text-2xl font-semibold text-white mt-2 text-balance">Esta partida no existe en este mapa</h1>
        <p className="text-sm text-slate-400 mt-2 text-pretty">La página que buscas se movió o nunca existió. Vuelve al inicio o busca tu juego.</p>
        <div className="flex justify-center gap-2 mt-6">
          <Link href="/" className="px-4 py-2 rounded-lg bg-primary text-[#0d1117] font-semibold text-xs">Volver al inicio</Link>
          <Link href="/buscar" className="px-4 py-2 rounded-lg bg-surface-container-high border border-outline text-xs">Ir al buscador</Link>
        </div>
      </main>
    </>
  );
}
