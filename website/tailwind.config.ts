import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Verdana']
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        goldenOrange:"#ff9800",
        goldenOrangeHover:"#faa331",
        darkGray: "#333",
        lighterGray: "#888",
        gold:"#FFD700",
        offWhite:"#ededed",
        offWhiteHover:"#cacaca",
        buttonGray:"#0a0a0a",
        buttonDarkBorder: "#252525",
        buttonDarkHover:""

      },
    },
  },
  plugins: [],
};
export default config;
