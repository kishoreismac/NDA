/** @type {import('tailwindcss').Config} */
// @ts-nocheck

export default {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070b1a",
          900: "#0b1224",
          800: "#111a33",
          700: "#1a2547",
          600: "#243160",
        },
        indigoglow: "#6366f1",
        accent: "#8b5cf6",
        cyanglow: "#22d3ee",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grad-primary":
          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #22d3ee 100%)",
        "grad-soft":
          "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(34,211,238,0.12))",
        "grid-faint":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99,102,241,0.45)",
        glass: "0 8px 32px 0 rgba(0,0,0,0.4)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
