"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Aparición suave al entrar en viewport (IntersectionObserver, una sola vez).
// Easing con peso físico; sin movimiento si el usuario prefiere reducirlo (ver globals.css).
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal${visible ? " reveal-visible" : ""}${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

// Frase destacada: cada palabra enciende por orden al entrar en pantalla.
export function TaglineReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  let i = 0;
  return (
    <div ref={ref} className="max-w-[680px] mx-auto text-center" aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <p key={li} className="text-4xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
          {line.split(" ").map((w) => {
            const d = (i += 1) * 70;
            return (
              <span
                key={`${li}-${w}-${d}`}
                style={{ transitionDelay: `${d}ms` }}
                className={`inline-block mr-[0.25em] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${visible ? "opacity-100" : "opacity-25"}`}
              >
                {w}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
