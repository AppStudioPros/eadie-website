import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0e1422",
        surface: "#141b2d",
        surface2: "#1b2238",
        muted: "#94a3b8",
        light: "#cbd5e1",
        text: "#f1f5f9",
        accent: "#fbbf24",
        accent2: "#f59e0b",
        accent3: "#d97706",
        edge: "#475569",
      },
    },
  },
  plugins: [],
};
export default config;
