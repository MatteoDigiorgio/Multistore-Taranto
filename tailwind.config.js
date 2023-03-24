/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        multistore_blue: {
          light: "#5AA1CF",
          DEFAULT: "#4E8CB6",
        },
        multistore_green: {
          light: "#26863C",
          DEFAULT: "#265D33",
        },
        multistore_gray: {
          DEFAULT: "#D8E1E0",
        },
      },
      screens: {
        xs: "300px",
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
