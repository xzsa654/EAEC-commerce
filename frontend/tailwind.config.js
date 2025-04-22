import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Kudryashev: ["Kudryashev Display Sans", "sans-serif"],
        default: ["LXGW WenKai Mono TC", "sans-serif"],
        longCang: ["Long Cang", "cursive"],
      },
      fontSize: {
        "clamp-logo": "clamp(2rem, 17vw, 12.5rem)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
