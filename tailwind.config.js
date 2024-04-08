/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}",
            "./app/(tabs).{js,jsx,ts,tsx}",
            "./app/components/*.{js,jsx,ts,tsx}",
					  "./app/routes/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

