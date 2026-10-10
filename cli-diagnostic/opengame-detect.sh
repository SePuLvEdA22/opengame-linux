#!/usr/bin/env bash
# OpenGame Linux — CLI diagnóstico (RF-04). Sin dependencias pesadas, sin root.
# Uso: sh opengame-detect.sh [--json salida.json]
# Genera JSON con CPU, GPU (lspci), RAM (/proc/meminfo), Vulkan (vulkaninfo), driver, distro.
set -eu
OUT="${1:-}"
if [ "${1:-}" = "--json" ]; then OUT="${2:-}"; fi

cpu="$(grep -m1 'model name' /proc/cpuinfo 2>/dev/null | cut -d: -f2 | xargs 2>/dev/null || true)"
[ -z "$cpu" ] && cpu="$(uname -m)"
mem_kb="$(grep MemTotal /proc/meminfo 2>/dev/null | awk '{print $2}' || true)"
mem_kb="${mem_kb:-0}"
ram_gb="$(awk "BEGIN {printf \"%.1f\", ${mem_kb:-0}/1024/1024}")"
gpu="$(lspci 2>/dev/null | grep -iE 'vga|3d|display' | head -n1 | cut -d: -f3 | xargs 2>/dev/null || true)"
[ -z "$gpu" ] && gpu="desconocida"
driver="$(nvidia-smi --query-gpu=driver_version --format=csv,noheader 2>/dev/null | head -n1 | xargs 2>/dev/null || true)"
[ -z "$driver" ] && driver="mesa/desconocido"
vulkan="$(vulkaninfo --summary 2>/dev/null | grep -iE 'apiVersion' | head -n1 | grep -oE '[0-9]+\.[0-9]+(\.[0-9]+)?' || true)"
[ -z "$vulkan" ] && vulkan="desconocido"
distro="$(grep PRETTY_NAME /etc/os-release 2>/dev/null | cut -d= -f2 | tr -d '\"' || true)"
[ -z "$distro" ] && distro="$(uname -s)"
kernel="$(uname -r)"

json=$(cat <<EOF
{"cpu":"$cpu","gpu":"$gpu","ramGb":$ram_gb,"driver":"$driver","vulkan":"$vulkan","distro":"$distro","kernel":"$kernel"}
EOF
)
if [ -n "$OUT" ]; then echo "$json" > "$OUT"; echo "OK -> $OUT"; else echo "$json"; fi
