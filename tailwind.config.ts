import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      blurGrey_50: "#eceff1",
      blurGrey_100: "#cfd8dc",
      blurGrey_200: "#b0bec5",
      blurGrey_300: "#90a4ae",
      blurGrey_400: "#78909c",
      blurGrey_500: "#607d8b",
      blurGrey_600: "#546e7a",
      blurGrey_700: "#455a64",
      blurGrey_800: "#37474f",
      blurGrey_900: "#263238",
    },
  },
  plugins: [],
};
export default config;
