import { SiteHeader } from "@/components/ui";
import { DISTROS } from "@/lib/distros";

export const revalidate = 86400;

export default function AdopcionPage() {
  return (
    <>
      <SiteHeader active="migra" />
      <main id="contenido" className="pt-16 max-w-7xl mx-auto px-4 py-8">
        <p className="font-mono text-xs text-primary">Guía de adopción · Dual-boot o instalación limpia</p>
        <h1 className="text-2xl font-semibold text-white mt-1">Migra sin perder tu biblioteca</h1>
        <p className="text-sm text-slate-400 max-w-3xl mt-2">
          Steam, Epic (Heroic) y GOG conservan tu cuenta. Steam Cloud sincroniza partidas entre Windows y Linux. Regla: 2–4 GB → Lubuntu, 4–8 GB → Mint XFCE, 8 GB + Nvidia → Bazzite.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {DISTROS.map((d) => (
            <article key={d.id} className="steel-card rounded-xl p-5">
              <h2 className="font-semibold text-white">{d.nombre} <span className="font-mono text-xs text-primary">{d.edicion}</span></h2>
              <p className="text-xs text-slate-400 mt-2">{d.descripcion}</p>
              <p className="font-mono text-[11px] text-emerald-400 mt-2">{d.driverNota} · Mín. {d.ramMinGb} GB</p>
            </article>
          ))}
        </div>
        <ol className="text-sm text-slate-300 mt-6 space-y-2 list-decimal list-inside max-w-3xl">
          <li>Copia de seguridad + crea USB con Ventoy (sin terminal).</li>
          <li>Arranca USB → “Probar sin instalar” → verifica Wi-Fi y Vulkan (<code className="font-mono text-primary">vulkaninfo --summary</code>).</li>
          <li>Instala junto a Windows (dual-boot) o reemplaza. Marca “instalar controladores privativos”.</li>
          <li>En Linux: instala Steam/Heroic → fuerza Proton recomendado desde esta web → juega.</li>
        </ol>
      </main>
    </>
  );
}
