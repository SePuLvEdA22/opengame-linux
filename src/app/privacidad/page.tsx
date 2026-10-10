import { SiteHeader } from "@/components/ui";

export const metadata = { title: "Privacidad" };

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-white">Privacidad</h1>
        <div className="text-sm text-slate-400 mt-3 space-y-3 leading-relaxed">
          <p>OpenGame Linux no usa rastreadores. El diagnóstico del equipo se procesa en tu navegador o en memoria del servidor y no se guarda salvo que crees una cuenta.</p>
          <p>Si creas una cuenta, guardamos tu correo, tu perfil de equipo y tus reportes solo para mostrarte contenido útil. Puedes pedir la eliminación escribiendo al equipo del proyecto.</p>
          <p>Los reportes publicados son visibles para toda la comunidad junto al nombre de autor que elijas.</p>
        </div>
      </main>
    </>
  );
}
