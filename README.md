# OpenGame Linux — MVP

Plataforma que centraliza compatibilidad de juegos Windows en Linux para PCs de bajos recursos (4–16 GB RAM, GPU baja/integrada). No porta juegos: diagnostica puntos de fallo (anti-cheat, DRM, drivers, dependencias) sobre Wine/Proton.

## Stack (costo $0)
Next.js 15 App Router + TS + Tailwind (Silent Steel) en Vercel Hobby. API Route Handlers Node.js + Zod. Neon Postgres + Drizzle + pg_trgm. Auth.js. Rate-limit propio. Vitest.

## Desarrollo
```bash
cp .env.example .env   # pon DATABASE_URL Neon
npm install
npm run dev            # http://localhost:3000
npm test               # Vitest motor reglas
npm run build
npm run db:seed        # 30 juegos (dry-run sin DB)
sh cli-diagnostic/opengame-detect.sh
```

## Despliegue Vercel
1. Push a GitHub → Import en Vercel → framework Next.js.
2. Marketplace → Neon Postgres → `DATABASE_URL` auto.
3. Env vars: `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_APP_URL`.
4. Deploy automático + previews por rama.

## Límites free tier vs esperado
| Servicio | Límite Hobby/Free | Esperado MVP | Mitigación |
|----------|-------------------|--------------|------------|
| Vercel bandwidth | 100 GB/mes | <5 GB (páginas ligeras, ISR) | ISR catálogo, sin imágenes pesadas |
| Vercel Functions | 100 h/mes, 10 s timeout | búsquedas <500 ms | consultas indexadas, paginación |
| Neon storage | 3 GB | <50 MB (30 juegos + reportes) | seed mínimo, sin blobs |
| Neon compute | cold start ~500 ms | aceptable | calentar DB antes de demo |
| Auth/rate-limit | propio $0 | 60 req/min IP | tabla `rate_limits` |

## Checklist sustentación
- [ ] Calentar Neon (visitar `/api/health` 2 min antes)
- [ ] Seed cargado (`npm run db:seed`)
- [ ] Demo CLI en vivo + pegar JSON en `/diagnostico`
- [ ] Mostrar semáforo verde/amarillo/rojo + fecha actualización
- [ ] Login demo user/moderator, promover reporte → “Solución verificada”
- [ ] Trazabilidad RF→código abierta

## Pendientes y roadmap web
Estado: MVP Fase 0-6 funcional con fallback estático (sin Neon conectado).

Crítico (deploy real):
- [ ] Vercel import + Neon Marketplace + `DATABASE_URL` + migrate + seed real
- [ ] Auth.js real (GitHub/Google) + `users.role`; proteger POST reports y PATCH promote
- [ ] Persistir `user_reports`, `report_votes`, `hardware_profiles` en Neon (hoy memoria)
- [ ] Rate-limit tabla `rate_limits` en prod (hoy memoria 60/min IP)
- [ ] Página `/cuenta` (perfil equipo guardado + mis reportes + rol)

Agrandar web (en curso):
- [x] Ficha con soluciones verificadas + CTA a guía/diagnóstico
- [x] Diagnóstico → recomienda distro + link a guía con `gameId`
- [x] Comunidad con botón moderator (demo `x-role`) + filtro GPU + paginación
- [x] Guía con selector 30 juegos + tweaks + `.sh` descargable
- [ ] Comparador Windows vs Linux en ficha + telemetría FPS
- [ ] Import CSV/JSON documentado + Steam API metadatos
- [ ] Tests integración handlers + Lighthouse/WCAG AA
