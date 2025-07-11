/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Chillax', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        progressGreen: {
          "0%": { width: "5%" },
          "100%": { width: "100%", backgroundColor: "#00FF00" },
        },
        progressRed: {
          "0%": { width: "5%" },
          "100%": { width: "100%", backgroundColor: "#FF0000" },
        },
      },
      animation: {
        progressGreen: "progressGreen 1s linear forwards",
        progressRed: "progressRed 1s linear  forwards"
      },
      colors: {
        primary: "#282C34",
        secondary: "#5BC0EB",
        tertiary: "#D4D6B9",
      },
    },
  },
  plugins: [],
};
