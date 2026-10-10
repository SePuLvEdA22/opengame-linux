# Arquitectura OpenGame Linux (MVP $0)

```mermaid
graph TD
  U[Browser RSC] --> MW[middleware rate-limit 60/min IP]
  U --> H[/buscar /juegos-id /diagnostico /guia /comunidad /adopcion/]
  U --> API[Route Handlers: games, diagnostics, reports, distros, cli, health]
  API --> Z[Zod]
  API --> MEM[(Fallback estático 30 juegos)]
  API --> DB[(Neon PG + Drizzle + pg_trgm en prod)]
  CLI[opengame-detect.sh] -->|JSON| U
  LIB[rules-engine + search + profiles + reports puros]
```

Decisiones sustentación:
- RSC + ISR (3600 catálogo, 86400 distros) → mínimo JS, Hobby OK.
- pg_trgm `games_nombre_trgm_idx` en prod; fallback ranking local para demo/tests.
- Route Handlers por dominio → trazabilidad RF 1:1.
- Rate-limit memoria MVP, tabla `rate_limits` en prod (sin Upstash).
- Auth.js stub Fase 0, `x-role: moderator` demo; prod `users.role`.
- Sin scraping: seed propio + Steam API pública.
