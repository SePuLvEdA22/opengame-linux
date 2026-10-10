# Trazabilidad RF/RNF → implementación (sustentación Politécnico Grancolombiano)

| ID | Requerimiento | Implementación | Estado |
|----|---------------|----------------|--------|
| RF-01 | Buscador inmediato | `GET /api/games?q=` + pg_trgm + ISR | Fase 1 |
| RF-02/03 | Estado + causa + soluciones verificadas | `compatibility_status` + `solutions(estado)` + ficha | Fase 1 |
| RF-04 | CLI diagnóstico | `cli-diagnostic/opengame-detect.sh` (lspci, vulkaninfo, meminfo) | Fase 0 OK |
| RF-05 | Motor reglas semáforo | `src/lib/rules-engine.ts` + Vitest | Fase 0 OK |
| RF-06/07 | Config guiada + copiar + .sh | `proton_profiles` + `GET /api/games/[id]/profile` | Fase 3 |
| RF-08/10 | Reportes votar + promover a verificada | `user_reports`, `report_votes`, rol moderator | Fase 4 |
| RF-09 | Guía adopción + distro liviana | `linux_distros` + página estática | Fase 5 |
| RNF-01/09 | Lenguaje simple, WCAG AA, teclado | skip-link, focus-visible, labels, contraste Silent Steel | Fase 0 OK |
| RNF-02 | Ligero, RSC, ISR, mínimo JS | Server Components, sin animaciones pesadas | Transversal |
| RNF-04 | Paginación | `?page=&limit=` en todas listas | Fase 1+ |
| RNF-06 | Seguridad | Zod, middleware rate-limit, Auth.js roles, parametrizadas (Drizzle) | Fase 0 OK |
| RNF-07/08/10 | Modular + probado + fecha actualización | `updated_at`, `fecha_verificacion`, Vitest | Fase 0 OK |

Decisiones para sustentar:
1. Next.js App Router + RSC → menos JS cliente, ISR gratis en Vercel Hobby.
2. Neon + Drizzle + pg_trgm → búsqueda tolerante (`gta v` encuentra `Grand Theft Auto V`) sin Elastic pagado.
3. Route Handlers por dominio (games, diagnostics, guides, reports, auth) → trazabilidad 1:1 con RF.
4. Motor reglas puro TS → testeable sin DB, explicable en 2 min.
5. Rate-limit en PG/middleware → $0, sin Upstash.
6. Sin scraping: seed propio + Steam API pública documentada.
