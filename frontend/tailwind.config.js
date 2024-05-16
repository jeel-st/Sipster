/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./app/(tabs).{js,jsx,ts,tsx}",
            "./app/components/*.{js,jsx,ts,tsx}",
            "./app/components/**/*.{js,jsx,ts,tsx}",
            "./app/routes/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#242424",
        secondary: "#343434",
        yellow: "#DFFA54",
        white: "#FFFFFF",
        black: "#000000",
        purple: "#C0C1FF"
      }
    },
  },
  plugins: [],
}