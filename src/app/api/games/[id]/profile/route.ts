import { fail, ok } from "@/lib/api-response";
import { buildLaunchCommand, buildSetupScript, getGuidedProfile } from "@/lib/profiles";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getGuidedProfile(Number(id));
  if (!p) return fail("Juego no encontrado", 404);
  const cmd = buildLaunchCommand(p.envBase, []);
  const script = buildSetupScript(p, p.protonRecomendado, cmd);
  return ok(
    { ...p, launchCommand: cmd, setupScript: script },
    { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=60" } }
  );
}
