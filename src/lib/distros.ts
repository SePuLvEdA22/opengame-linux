// Distros livianas RF-09 — recomendación por RAM/GPU, contenido estático auditable.
export interface Distro {
  id: string;
  nombre: string;
  edicion: string;
  ramMinGb: number;
  descripcion: string;
  driverNota: string;
}

export const DISTROS: Distro[] = [
  { id: "mint-xfce", nombre: "Linux Mint", edicion: "XFCE (LTS)", ramMinGb: 4, descripcion: "650 MB en reposo. Gestor de drivers NVIDIA 535 en 1 clic.", driverNota: "NVIDIA 535 preconfigurado" },
  { id: "bazzite", nombre: "Bazzite Gaming", edicion: "Nvidia Edition", ramMinGb: 8, descripcion: "Fedora inmutable. GameMode + Proton-GE + Steam listos.", driverNota: "NVidia integrado" },
  { id: "lubuntu", nombre: "Lubuntu", edicion: "LXQt", ramMinGb: 2, descripcion: "Para 2–4 GB RAM / Intel HD 4000. Runner OpenGL/DXVK legacy.", driverNota: "Mesa ligero" },
];

export function recomendarDistro(ramGb: number, gpu: string): Distro {
  const g = gpu.toLowerCase();
  if (ramGb <= 4 || g.includes("intel hd") || g.includes("uhd 600")) return DISTROS[2];
  const discreta = g.includes("nvidia") || g.includes("geforce") || g.includes("gtx") || g.includes("rtx") || g.includes("rx") || g.includes("radeon");
  if (ramGb >= 8 && discreta) return DISTROS[1];
  return DISTROS[0];
}
