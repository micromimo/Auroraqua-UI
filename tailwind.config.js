/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        glass: {
          50: 'rgba(255,255,255,0.1)',
          100: 'rgba(255,255,255,0.15)',
          200: 'rgba(255,255,255,0.25)',
          300: 'rgba(255,255,255,0.35)',
          400: 'rgba(255,255,255,0.5)',
          500: 'rgba(255,255,255,0.6)',
          600: 'rgba(255,255,255,0.7)',
          700: 'rgba(255,255,255,0.8)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}