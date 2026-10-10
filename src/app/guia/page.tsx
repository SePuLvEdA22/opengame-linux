import { SiteHeader } from "@/components/ui";
import { GuiaClient } from "@/components/guia-client";

export const metadata = { title: "Configuración guiada Proton — OpenGame Linux" };

export default async function GuiaPage({ searchParams }: { searchParams: Promise<{ gameId?: string }> }) {
  const sp = await searchParams;
  const initialId = Math.max(1, Math.min(30, parseInt(sp.gameId ?? "1", 10) || 1));
  return (
    <>
      <SiteHeader active="guia" />
      <main id="contenido" className="pt-16 max-w-7xl mx-auto px-4 py-8">
        <p className="font-mono text-xs text-emerald-400">● SISTEMA DE CONFIGURACIÓN AUTOMÁTICA</p>
        <h1 className="text-2xl font-semibold text-white mt-1">Asistente de Configuración Wine &amp; Proton</h1>
        <div className="mt-6"><GuiaClient initialId={initialId} /></div>
      </main>
    </>
  );
}
