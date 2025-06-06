/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#282C34',
        secondary: '#5BC0EB',
        tertiary: '#D4D6B9',
      }
    },
  },
  plugins: [],
}