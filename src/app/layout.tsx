import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenGame Linux — ¿Tu juego de Windows corre en Linux?",
  description:
    "Centraliza compatibilidad de juegos Windows en Linux para PCs de bajos recursos. Diagnóstico, Proton recomendado y guías paso a paso.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="bg-background text-[#e6edf3] min-h-screen antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-surface-container-high focus:px-3 focus:py-2 focus:rounded"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
