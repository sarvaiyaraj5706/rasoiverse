/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EADBC8',
          400: '#DFC8AC',
          500: '#CFB08C',
        },
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#EA580C',
          600: '#C2410C',
          700: '#9A3412',
          800: '#7C2D12',
          900: '#431407',
        },
        cardamom: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
        },
        terracotta: {
          50: '#FFF5F2',
          100: '#FFE6E0',
          500: '#E2583E',
          600: '#C94027',
          700: '#A92F1A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(130, 80, 40, 0.06), 0 2px 6px -1px rgba(130, 80, 40, 0.04)',
        'soft-hover': '0 12px 30px -4px rgba(130, 80, 40, 0.12), 0 4px 12px -2px rgba(130, 80, 40, 0.06)',
      }
    },
  },
  plugins: [],
}
