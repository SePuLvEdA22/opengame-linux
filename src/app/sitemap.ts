import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/games-data";

const BASE = "https://opengame-linux.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/buscar", "/diagnostico", "/guia", "/comunidad", "/adopcion", "/cuenta"].map((r) => ({
    url: `${BASE}${r || "/"}`,
    lastModified: new Date(),
  }));
  const games = CATALOG.map((g) => ({
    url: `${BASE}/juegos/${g.id}`,
    lastModified: new Date(g.fechaVerificacion),
  }));
  return [...staticRoutes, ...games];
}
