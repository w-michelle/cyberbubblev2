/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "hsl(126, 20%, 56%, 1)",
        red: "hsl(360, 66%, 57%, 1)",
        white: "hsla(0, 5%, 95%, 1)",
        glass: "hsl(0,0%,45%,0.2)",
        glass2: "hsl(0,0%,21%,0.17)",
        darker: "hsl(69, 9%, 15%)",
        grey: "hsl(213, 5%, 39%)",
        darkgrey: "rgba(255, 255, 255, 0.05)",
        lightgrey: "hsl(0, 0%, 64%, 0.22)",
        black: "hsl(225, 6%, 13%)",
        black2: "hsla(0, 0%, 13%, 1)",
        darkblue: "hsla(225, 28%, 14%, 1)",
        greyBlue: "#3d5257",
      },
      boxShadow: {
        custom: "0px 8px 15px 1px #121212;",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "base", // only generate global styles
      strategy: "class", // only generate classes
    }),
  ],
};
