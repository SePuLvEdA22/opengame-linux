import { SiteHeader } from "@/components/ui";

export const metadata = { title: "Mi cuenta — OpenGame Linux" };

export default function CuentaPage() {
  return (
    <>
      <SiteHeader active="cuenta" />
      <main id="contenido" className="max-w-7xl mx-auto px-4 py-8">
        <p className="font-mono text-xs text-primary">Cuenta (demo local · prod Auth.js)</p>
        <h1 className="text-2xl font-semibold text-white mt-1">Mi equipo y mis reportes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="steel-card rounded-xl p-5">
            <h2 className="font-semibold text-white text-sm">Perfil de equipo guardado</h2>
            <p className="text-xs text-slate-400 mt-1">Se guarda en este navegador (localStorage). En prod se guarda en Neon `hardware_profiles`.</p>
            <ul className="text-xs font-mono text-slate-300 mt-3 space-y-1">
              <li>Usa <a href="/diagnostico" className="text-primary">Diagnóstico</a> → Analizar → tu matriz queda aquí.</li>
              <li>Recomendación distro: 2–4 GB Lubuntu, 4–8 GB Mint XFCE, 8 GB+ Bazzite.</li>
            </ul>
          </div>
          <div className="steel-card rounded-xl p-5">
            <h2 className="font-semibold text-white text-sm">Rol</h2>
            <p className="text-xs text-slate-400 mt-1">Demo: activa “Vista moderator” en <a href="/comunidad" className="text-primary">Comunidad</a> para verificar reportes. Prod: `users.role = moderator`.</p>
          </div>
        </div>
      </main>
    </>
  );
}
