import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#18181B",
        accent: {
          DEFAULT: "#1D9E75",
          hover: "#157A59",
        },
        foreground: "#F0Fdf4", // Light greenish-white for text
        muted: "#84A59D",
      },
      fontFamily: {
        sans: ["var(--font-anime)"],
        mono: ["var(--font-geist-mono)"],
      },
      animation: {
        "blob-spin": "blob-spin 10s infinite alternate",
        "pulse-glow": "pulse-glow 3s infinite",
      },
      keyframes: {
        "blob-spin": {
          "0%": { transform: "scale(1) translate(0px, 0px)" },
          "33%": { transform: "scale(1.1) translate(30px, -50px)" },
          "66%": { transform: "scale(0.9) translate(-20px, 20px)" },
          "100%": { transform: "scale(1) translate(0px, 0px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8", filter: "blur(20px)" },
          "50%": { opacity: "0.4", filter: "blur(30px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
