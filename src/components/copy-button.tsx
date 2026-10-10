"use client";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 2000);
        } catch {
          setDone(false);
        }
      }}
      className="px-3 py-1.5 rounded bg-surface-container-high border border-outline text-xs font-mono"
      aria-live="polite"
    >
      {done ? "¡Copiado!" : "Copiar comando"}
    </button>
  );
}
