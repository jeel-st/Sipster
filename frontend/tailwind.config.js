/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./app/(tabs).{js,jsx,ts,tsx}",
            "./app/components/*.{js,jsx,ts,tsx}",
            "./app/components/events/*.{js,jsx,ts,tsx}",
            "./app/components/friends/*.{js,jsx,ts,tsx}",
            "./app/components/games/*.{js,jsx,ts,tsx}",
            "./app/components/layout/*.{js,jsx,ts,tsx}",
            "./app/components/profile/*.{js,jsx,ts,tsx}",
            "./app/components/skeletons/*.{js,jsx,ts,tsx}",
            "./app/components/image/*.{js,jsx,ts,tsx}",
            "./app/components/home/*.{js,jsx,ts,tsx}",
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