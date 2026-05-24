import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Encore brand palette mirrored
        navy: "#0A1F44",
        "navy-deep": "#051026",
        "navy-mid": "#0F2956",
        sky: "#0f3d91",
        red: "#B22234",
        "red-bright": "#dc2f42",
        amber: "#FFB000",
        "amber-bright": "#FFC638",
        "amber-deep": "#d69100",
        ink: "#101828",
        "ink-soft": "#1a2332",
      },
    },
  },
  plugins: [],
};
export default config;
