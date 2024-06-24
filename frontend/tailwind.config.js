/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./app/(tabs)/*.{js,jsx,ts,tsx}",
            "./app/components/*.{js,jsx,ts,tsx}",
            "./app/components/**/*.{js,jsx,ts,tsx}",
            "./app/routes/*.{js,jsx,ts,tsx}",
            "./app/*.{js,jsx,ts,tsx}",
            "./app/games/*.{js,jsx,ts,tsx}",
            "./app/games/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: "#1A1B16",
        secondary: "#272727",
        tertiary: "#CDCDCD",
        yellow: "#DFFA54",
        white: "#FFFFFF",
        black: "#000000",
        purple: "#C0C1FF"
      },
      scale: {
        '25': '0.1',
        '50': '0.50',
        '75': '0.75',
        '90': '0.90',
        '95': '0.95',
        '100': '1',
        '105': '1.05',
        '110': '1.10',
        '125': '1.25',
        '150': '1.50',
        '200': '2',
      },
    },
  },
  plugins: [],
}