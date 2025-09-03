import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
        sans: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      colors: {
        "navy-blue-color": "var(--navy-blue-color)",
        "orange-color": "var(--orange-color)",
        "gray-color": "var(--gray-color)",
        "red-color": "var(--red-color)",
      },
    },
  },
  plugins: [],
};

export default config;
