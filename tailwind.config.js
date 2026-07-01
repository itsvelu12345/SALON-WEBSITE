/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#0A0A0A',
          surface: '#121212',
          accent: '#181215', // bordeaux/charcoal depth
          ivory: '#F5F2EC',
          muted: '#A3A3A3',
          gold: {
            DEFAULT: '#C9A24B',
            light: '#D9B76A',
            dark: '#8C6A2E',
          }
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.3em',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
