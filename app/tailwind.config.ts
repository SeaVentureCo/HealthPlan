import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0e0f0e",
        surface: "#151614",
        card: "#1c1e1b",
        text: {
          DEFAULT: "#f0ede8",
          muted: "#8a8880",
          subtle: "#55534f",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          strong: "rgba(255,255,255,0.12)",
        },
        green: {
          DEFAULT: "#7db87a",
          bg: "rgba(125,184,122,0.1)",
          edge: "rgba(125,184,122,0.25)",
        },
        amber: {
          DEFAULT: "#d4a84b",
          bg: "rgba(212,168,75,0.1)",
          edge: "rgba(212,168,75,0.2)",
        },
        coral: {
          DEFAULT: "#d47a5a",
          bg: "rgba(212,122,90,0.1)",
          edge: "rgba(212,122,90,0.2)",
        },
        blue: {
          DEFAULT: "#6a9fd8",
          bg: "rgba(106,159,216,0.1)",
        },
        purple: {
          DEFAULT: "#9b87cc",
          bg: "rgba(155,135,204,0.1)",
        },
        pink: {
          DEFAULT: "#c47a9a",
          bg: "rgba(196,122,154,0.1)",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
