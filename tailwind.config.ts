import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0d1117",
        "surface-container-lowest": "#090d13",
        "surface-container-low": "#131821",
        "surface-container": "#161b22",
        "surface-container-high": "#21262d",
        "surface-container-highest": "#2b3240",
        primary: "#58a6ff",
        "primary-muted": "#388bfd",
        outline: "#30363d",
        success: "#3fb950",
        "success-bright": "#7ee787",
        warning: "#d29922",
        danger: "#f85149",
      },
      fontFamily: {
        sans: ['"Geist"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
