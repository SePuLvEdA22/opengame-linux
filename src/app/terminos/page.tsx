import { SiteHeader } from "@/components/ui";

export const metadata = { title: "Términos" };

export default function TerminosPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-white">Términos de uso</h1>
        <div className="text-sm text-slate-400 mt-3 space-y-3 leading-relaxed">
          <p>La información de compatibilidad es orientativa y la aporta la comunidad: un juego marcado como funcional puede variar según tu equipo y controladores.</p>
          <p>No intentes saltarte bloqueos de anti-cheat: puedes perder tu cuenta del juego. Cuando un juego sale como «No funciona», te sugerimos alternativas que sí corren en Linux.</p>
          <p>Al publicar un reporte confirmas que es tu experiencia real. El equipo de moderación puede editar o retirar contenido falso o incompleto.</p>
        </div>
      </main>
    </>
  );
}
