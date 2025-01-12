/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
    fontFamily: {
      comfortaa:['Comfortaa', 'sans serif']
    },
  },
  plugins: [],
}

