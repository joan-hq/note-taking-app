/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        "primary-color": colors.cyan["700"],
        "primary-hover": colors.cyan["900"],
        "warning-color": colors.red["600"],
      },
    },
  },
  plugins: [],
};
