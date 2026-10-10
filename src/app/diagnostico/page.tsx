import { SiteHeader } from "@/components/ui";
import { DiagnosticoClient } from "@/components/diagnostico-client";

export const metadata = { title: "Diagnóstico de tu PC — OpenGame Linux" };

export default function DiagnosticoPage() {
  return (
    <>
      <SiteHeader active="diag" />
      <main id="contenido" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <p className="font-mono text-xs text-primary">OpenGame Telemetry Engine · v2.4</p>
        <h1 className="text-2xl font-semibold text-white mt-1">Diagnóstico de Hardware y Compatibilidad</h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          Pega el JSON del script Linux, súbelo, o ingresa datos manualmente. En Windows estimamos solo con WebGL + memoria (precisión menor).
        </p>
        <div className="mt-6">
          <DiagnosticoClient />
        </div>
        <div className="mt-4 rounded-xl bg-surface-container border border-outline p-4 text-xs font-mono text-slate-400">
          Comprobación manual driver Vulkan: <code className="text-primary">vulkaninfo --summary | grep -E &quot;driverName|apiVersion|deviceName&quot;</code>
        </div>
      </main>
    </>
  );
}
