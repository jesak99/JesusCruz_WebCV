/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'arena-light': '#F2E8DC',
        'rojo-logo': '#e24021',
        'terracota-200': '#DF7B68',
        'terracota-300': '#D86450',
        'terracota-500': '#C44536',
        'terracota-600': '#A63D40',
        'terracota-700': '#8C2F36',
        'terra-700': '#8C5E58',
        'terra-900': '#5A3B36',
        'beige': '#F5F0EC',
        sand: {
          50: "#FAF5E9",
          100: '#F5E6CC',
          200: '#E6D2B5',
          300: "#E2C9A3",
          400: "#D3AF7A"
        },
        red: {
          400: "#E75A4C",
          600: '#C0392B',
          700: "#A82828"
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

