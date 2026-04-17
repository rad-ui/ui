import type { Config } from "tailwindcss";

const config: Config = {
  presets:[
    require("@radui/ui/themes/tailwind-presets/default.js")
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx"
  ],
 
  theme: {
    // colors:{
    //   // white: "#fff",
    //   // black: "#000",
    //   // transparent: "transparent",
    // },
    extend: {
     
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
