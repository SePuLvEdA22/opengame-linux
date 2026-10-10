-- OpenGame Linux — migración inicial (Neon Postgres, free tier)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
-- Tablas creadas por Drizzle (ver db/schema.ts). Índice trigram para RF-01:
-- CREATE INDEX IF NOT EXISTS games_nombre_trgm_idx ON games USING gin (nombre gin_trgm_ops);
