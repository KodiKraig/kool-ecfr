import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        lightBlue: "#1c3e75",
        primary: "#1159d1",
        background: "#0b1c38",
      },
    },
  },
  plugins: [],
} satisfies Config;
