/** @type {import("tailwindcss").Config} */
const { map } = require("./packages");

const primary = "hsla(208, 100%, 43%, 1)";
const secondary = "hsla(190, 81%, 42%, 1)";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{css,ts,tsx}",
    ...map("web/components", ["./index.html", "./src/**/*.{css,ts,tsx}"]),
    ...map("web/app", ["./index.html", "./src/**/*.{css,ts,tsx}"])
  ],
  safelist: [
    {
      pattern: /bg|text|border|rounded/,
      variants: ["lg", "hover", "focus", "lg:hover"]
    }
  ],
  theme: {
    extend: {
      colors: {
        white: "hsla(0, 100%, 100%, 1)", // #ffffff
        black: "#000",
        /* Gray colors */
        "gray-lighter": "#f7f7f7",
        "gray-lighter-active": "hsla(0, 0%, 92%, 1)",
        "gray-light": "#d4d1d1",
        "gray-medium": "#a8a0a0",
        "gray-dark": "#998e8e",
        "gray-darker": "#504747",

        primary: {
          DEFAULT: primary,
          50: "hsla(208, 100%, 91%, 1)",
          100: "hsla(208, 100%, 83%, 1)",
          200: "hsla(208, 100%, 75%, 1)",
          300: "hsla(208, 100%, 67%, 1)",
          400: "hsla(208, 100%, 59%, 1)",
          500: "hsla(208, 100%, 51%, 1)",
          600: primary,
          700: "hsla(208, 100%, 35%, 1)",
          800: "hsla(208, 100%, 27%, 1)",
          900: "hsla(208, 100%, 19%, 1)"
        },

        "primary-active": secondary,

        secondary: {
          DEFAULT: secondary,
          50: "hsla(190, 81%, 90%, 1)",
          100: "hsla(190, 81%, 82%, 1)",
          200: "hsla(190, 81%, 74%, 1)",
          300: "hsla(190, 81%, 66%, 1)",
          400: "hsla(190, 81%, 58%, 1)",
          500: "hsla(190, 81%, 50%, 1)",
          600: secondary,
          700: "hsla(190, 81%, 34%, 1)",
          800: "hsla(190, 81%, 28%, 1)",
          900: "hsla(190, 81%, 20%, 1)"
        }
      },
      spacing: {
        7.5: "1.875rem", // 30px
        15: "3.75rem", // 60px
        22: "5.5rem", // 88px
        25: "6.25rem", // 100px
        26: "6.5rem", // 104px
        30: "8.5rem", // 136px
        68: "17rem" // 272px
      },
      fontSize: {
        micro: [".5rem", { lineHeight: "1rem" }], // 8px
        xxs: [".625rem", { lineHeight: "1rem" }] // 10px
      },
      fontWeight: {
        hairline: 100
      },
      borderWith: {
        1: "1px",
        5: "5px"
      }
    }
  },
  plugins: []
};
