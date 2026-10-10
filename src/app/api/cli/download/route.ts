import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const p = path.join(process.cwd(), "cli-diagnostic", "opengame-detect.sh");
  const sh = await readFile(p, "utf8");
  return new Response(sh, {
    headers: {
      "Content-Type": "text/x-shellscript; charset=utf-8",
      "Content-Disposition": 'attachment; filename="OpenGame-Detect.sh"',
      "Cache-Control": "s-maxage=86400",
    },
  });
}
