/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        multistore_blue: {
          DEFAULT: "#336eb2",
        },
        multistore_blue_green: {
          DEFAULT: "#4a9f99",
        },
        multistore_green: {
          DEFAULT: "#26863C",
        },
        multistore_gray: {
          DEFAULT: "#D8E1E0",
        },
      },
      screens: {
        xs: "300px",
        ...defaultTheme.screens,
      },
      animation: {
        blob: "blob 5s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
};
