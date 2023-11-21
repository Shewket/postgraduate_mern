/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFF0',
        "light-white": "rgba(255, 255, 255, 0.18)",
        "light-Emerald": "#d1fae5",
        "md-Cyan": "#06b6d4"
      }
    },
  },
  plugins: [],
}

