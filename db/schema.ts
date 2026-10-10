import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// Enum estados semáforo — RF-01/02/03 + RNF-07 (solo verificadas se muestran como tal)
export const compatEstado = pgEnum("compat_estado", [
  "funciona",
  "funciona_con_ajustes",
  "no_funciona",
  "desconocido",
]);

export const userRole = pgEnum("user_role", ["user", "moderator"]);
export const solutionEstado = pgEnum("solution_estado", ["pendiente", "verificada", "rechazada"]);
export const reportEstado = pgEnum("report_estado", ["pendiente", "aprobado", "rechazado"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 120 }),
  role: userRole("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const games = pgTable(
  "games",
  {
    id: serial("id").primaryKey(),
    steamAppid: integer("steam_appid").unique(),
    nombre: varchar("nombre", { length: 200 }).notNull(),
    launcher: text("launcher").array().notNull().default([]),
    anticheat: varchar("anticheat", { length: 120 }),
    drm: varchar("drm", { length: 120 }),
    reqMinCpu: varchar("req_min_cpu", { length: 160 }),
    reqMinGpu: varchar("req_min_gpu", { length: 160 }),
    reqMinRamGb: integer("req_min_ram_gb"),
    reqVulkan: varchar("req_vulkan", { length: 20 }).default("1.3"),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    // pg_trgm se crea en migración SQL: CREATE EXTENSION pg_trgm; CREATE INDEX ... USING gin (nombre gin_trgm_ops)
    uniqueIndex("games_nombre_uidx").on(t.nombre),
  ]
);

export const compatibilityStatus = pgTable("compatibility_status", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
  estado: compatEstado("estado").notNull().default("desconocido"),
  causaFallo: text("causa_fallo"),
  fechaVerificacion: timestamp("fecha_verificacion").notNull().defaultNow(),
});

export const protonProfiles = pgTable("proton_profiles", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
  protonVersion: varchar("proton_version", { length: 60 }).notNull(),
  envVars: text("env_vars").notNull().default(""),
  dependencias: text("dependencias").array().notNull().default([]),
  pasos: jsonb("pasos").notNull().default([]),
  perfTweaks: jsonb("perf_tweaks").notNull().default({}),
});

export const solutions = pgTable("solutions", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
  autorId: text("autor_id").references(() => users.id),
  texto: text("texto").notNull(),
  estado: solutionEstado("estado").notNull().default("pendiente"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const hardwareProfiles = pgTable("hardware_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  cpu: varchar("cpu", { length: 160 }),
  gpu: varchar("gpu", { length: 160 }),
  ramGb: integer("ram_gb"),
  driver: varchar("driver", { length: 80 }),
  vulkan: varchar("vulkan", { length: 20 }),
  distro: varchar("distro", { length: 80 }),
  rawJson: jsonb("raw_json"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userReports = pgTable("user_reports", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  gameId: integer("game_id").notNull().references(() => games.id, { onDelete: "cascade" }),
  hardwareId: integer("hardware_id").references(() => hardwareProfiles.id),
  resultado: compatEstado("resultado").notNull(),
  fps: integer("fps"),
  notas: text("notas"),
  estadoRevision: reportEstado("estado_revision").notNull().default("pendiente"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const reportVotes = pgTable("report_votes", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id").notNull().references(() => userReports.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  util: boolean("util").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const linuxDistros = pgTable("linux_distros", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 80 }).notNull().unique(),
  ligera: boolean("ligera").notNull().default(true),
  reqMinRamGb: integer("req_min_ram_gb"),
  guiaUrl: text("guia_url"),
  notas: text("notas"),
});

// Rate limiting simple por IP (RNF-06) — sin Upstash
export const rateLimits = pgTable("rate_limits", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull(),
  windowStart: timestamp("window_start").notNull().defaultNow(),
  count: integer("count").notNull().default(1),
});
