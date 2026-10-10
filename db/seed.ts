// Seed reproducible — 30 juegos reales, SOLO metadatos propios (sin scraping ProtonDB).
// Fuente legal metadatos: API pública Steam (store.steampowered.com/api/appdetails) + datos manuales.
// Uso: npm run db:seed (requiere DATABASE_URL). Idempotente por nombre.
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { compatibilityStatus, games, protonProfiles } from "./schema";

const sql = neon(process.env.DATABASE_URL ?? "");
const db = drizzle(sql);

type SeedGame = {
  steamAppid: number | null;
  nombre: string;
  launcher: string[];
  anticheat: string | null;
  drm: string | null;
  reqMinRamGb: number;
  estado: "funciona" | "funciona_con_ajustes" | "no_funciona" | "desconocido";
  causa: string | null;
  proton: string;
  env: string;
};

const JUEGOS: SeedGame[] = [
  { steamAppid: 271590, nombre: "Grand Theft Auto V", launcher: ["Steam", "Epic", "Rockstar"], anticheat: "BattlEye", drm: "Rockstar", reqMinRamGb: 8, estado: "funciona", causa: null, proton: "GE-Proton 8-26", env: "DXVK_ASYNC=1 PROTON_ENABLE_NVAPI=0 %command%" },
  { steamAppid: null, nombre: "Valorant", launcher: ["Riot"], anticheat: "Vanguard Ring-0", drm: "Riot", reqMinRamGb: 8, estado: "no_funciona", causa: "Vanguard kernel Ring-0 incompatible con Wine/Proton. Riesgo de ban.", proton: "N/A", env: "" },
  { steamAppid: 730, nombre: "Counter-Strike 2", launcher: ["Steam"], anticheat: "VAC", drm: "Steam", reqMinRamGb: 8, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 1172470, nombre: "Apex Legends", launcher: ["Steam", "EA"], anticheat: "EasyAntiCheat", drm: "EA", reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "Requiere Proton Experimental + EAC runtime.", proton: "Proton Experimental", env: "PROTON_ENABLE_NVAPI=0 %command%" },
  { steamAppid: 1245620, nombre: "Elden Ring", launcher: ["Steam"], anticheat: "EasyAntiCheat", drm: "Steam", reqMinRamGb: 12, estado: "funciona_con_ajustes", causa: "900p + FSR para 4GB VRAM.", proton: "Proton Experimental", env: "VKD3D_CONFIG=dxr %command%" },
  { steamAppid: 292030, nombre: "The Witcher 3", launcher: ["Steam", "GOG"], anticheat: null, drm: null, reqMinRamGb: 8, estado: "funciona", causa: null, proton: "GE-Proton 9-4", env: "%command%" },
  { steamAppid: 1097150, nombre: "Fall Guys", launcher: ["Epic", "Steam"], anticheat: "EasyAntiCheat", drm: "Epic", reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "EAC bridge vía Heroic.", proton: "GE-Proton 8-26", env: "WINE_FULLSCREEN_FSR=1 DXVK_FRAME_RATE=60 %command%" },
  { steamAppid: 227300, nombre: "Euro Truck Simulator 2", launcher: ["Steam"], anticheat: null, drm: null, reqMinRamGb: 4, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 570, nombre: "Dota 2", launcher: ["Steam"], anticheat: "VAC", drm: null, reqMinRamGb: 4, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 440, nombre: "Team Fortress 2", launcher: ["Steam"], anticheat: "VAC", drm: null, reqMinRamGb: 4, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 252950, nombre: "Rocket League", launcher: ["Epic"], anticheat: null, drm: "Epic", reqMinRamGb: 4, estado: "funciona_con_ajustes", causa: "Heroic + Proton-GE.", proton: "GE-Proton 9", env: "%command%" },
  { steamAppid: 1085660, nombre: "Destiny 2", launcher: ["Steam"], anticheat: "BattlEye (bloqueado)", drm: "Steam", reqMinRamGb: 8, estado: "no_funciona", causa: "Bungie bloquea Linux deliberadamente.", proton: "N/A", env: "" },
  { steamAppid: 578080, nombre: "PUBG: Battlegrounds", launcher: ["Steam"], anticheat: "BattlEye (bloqueado)", drm: null, reqMinRamGb: 8, estado: "no_funciona", causa: "Sin soporte EAC/BE en Linux.", proton: "N/A", env: "" },
  { steamAppid: 1938090, nombre: "Call of Duty HQ", launcher: ["Steam", "Battle.net"], anticheat: "Ricochet Ring-0", drm: "Activision", reqMinRamGb: 12, estado: "no_funciona", causa: "Ricochet kernel.", proton: "N/A", env: "" },
  { steamAppid: 236850, nombre: "Europa Universalis IV", launcher: ["Steam"], anticheat: null, drm: null, reqMinRamGb: 4, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 413150, nombre: "Stardew Valley", launcher: ["Steam", "GOG"], anticheat: null, drm: null, reqMinRamGb: 4, estado: "funciona", causa: null, proton: "Nativo Linux", env: "" },
  { steamAppid: 648800, nombre: "Raft", launcher: ["Steam"], anticheat: null, drm: null, reqMinRamGb: 6, estado: "funciona_con_ajustes", causa: "Proton-GE + DXVK async.", proton: "GE-Proton 9", env: "DXVK_ASYNC=1 %command%" },
  { steamAppid: 1174180, nombre: "Red Dead Redemption 2", launcher: ["Steam", "Rockstar"], anticheat: null, drm: "Rockstar", reqMinRamGb: 12, estado: "funciona_con_ajustes", causa: "Rockstar Launcher + Proton-GE.", proton: "GE-Proton 9", env: "%command%" },
  { steamAppid: 1551360, nombre: "Forza Horizon 5", launcher: ["Steam"], anticheat: null, drm: "Xbox", reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "Requiere Proton-GE + MF.", proton: "GE-Proton 9", env: "%command%" },
  { steamAppid: 1593500, nombre: "God of War", launcher: ["Steam"], anticheat: null, drm: "Steam", reqMinRamGb: 8, estado: "funciona", causa: null, proton: "Proton Experimental", env: "%command%" },
  { steamAppid: 1817070, nombre: "Genshin Impact", launcher: ["HoYoverse"], anticheat: "Kernel (bloqueado)", drm: null, reqMinRamGb: 8, estado: "no_funciona", causa: "Anti-cheat kernel bloquea Wine.", proton: "N/A", env: "" },
  { steamAppid: null, nombre: "League of Legends", launcher: ["Riot"], anticheat: "Vanguard Ring-0", drm: "Riot", reqMinRamGb: 8, estado: "no_funciona", causa: "Vanguard desde 2024 bloquea Linux.", proton: "N/A", env: "" },
  { steamAppid: null, nombre: "Fortnite", launcher: ["Epic"], anticheat: "EAC/BattlEye (bloqueado)", drm: "Epic", reqMinRamGb: 8, estado: "no_funciona", causa: "Epic no habilita EAC Linux.", proton: "N/A", env: "" },
  { steamAppid: 359550, nombre: "Rainbow Six Siege", launcher: ["Steam", "Ubisoft"], anticheat: "BattlEye (bloqueado)", drm: "Ubisoft", reqMinRamGb: 8, estado: "no_funciona", causa: "Ubisoft bloquea Proton.", proton: "N/A", env: "" },
  { steamAppid: 594650, nombre: "Hunt: Showdown", launcher: ["Steam"], anticheat: "EasyAntiCheat", drm: null, reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "EAC Proton habilitado.", proton: "Proton Experimental", env: "%command%" },
  { steamAppid: 221100, nombre: "DayZ", launcher: ["Steam"], anticheat: "BattlEye", drm: null, reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "Servidores con BE habilitado varían.", proton: "Proton Experimental", env: "%command%" },
  { steamAppid: 381210, nombre: "Dead by Daylight", launcher: ["Steam", "Epic"], anticheat: "EasyAntiCheat", drm: null, reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "EAC Proton OK.", proton: "Proton Experimental", env: "%command%" },
  { steamAppid: 739630, nombre: "Phasmophobia", launcher: ["Steam"], anticheat: null, drm: null, reqMinRamGb: 8, estado: "funciona", causa: null, proton: "Proton Experimental", env: "%command%" },
  { steamAppid: 1623730, nombre: "Palworld", launcher: ["Steam"], anticheat: null, drm: null, reqMinRamGb: 8, estado: "funciona_con_ajustes", causa: "Proton-GE + FSR en iGPU.", proton: "GE-Proton 9", env: "DXVK_ASYNC=1 %command%" },
  { steamAppid: 1203220, nombre: "Naraka: Bladepoint", launcher: ["Steam", "Epic"], anticheat: "Kernel", drm: null, reqMinRamGb: 8, estado: "no_funciona", causa: "Anti-cheat kernel.", proton: "N/A", env: "" },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log("[seed] DATABASE_URL vacío — modo dry-run. Juegos a insertar:", JUEGOS.length);
    return;
  }
  for (const j of JUEGOS) {
    const [g] = await db
      .insert(games)
      .values({
        steamAppid: j.steamAppid,
        nombre: j.nombre,
        launcher: j.launcher,
        anticheat: j.anticheat,
        drm: j.drm,
        reqMinRamGb: j.reqMinRamGb,
      })
      .onConflictDoNothing()
      .returning();
    if (!g) continue;
    await db.insert(compatibilityStatus).values({ gameId: g.id, estado: j.estado, causaFallo: j.causa });
    await db.insert(protonProfiles).values({
      gameId: g.id,
      protonVersion: j.proton,
      envVars: j.env,
      dependencias: [],
      pasos: [],
      perfTweaks: {},
    });
  }
  console.log(`[seed] OK — ${JUEGOS.length} juegos procesados`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
