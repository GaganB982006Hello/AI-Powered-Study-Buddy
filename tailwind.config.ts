import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        card: "var(--card)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};
export default config;
