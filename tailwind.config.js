/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основные цвета (согласно спецификации)
        primary: {
          DEFAULT: '#1E3A5F',
          50: '#EBF2FA',
          100: '#D7E5F5',
          200: '#AFC8EB',
          300: '#87ABE0',
          400: '#5F8ED6',
          500: '#3771CB',
          600: '#1E3A5F',
          700: '#192F4E',
          800: '#14243D',
          900: '#0F192C',
        },
        accent: {
          DEFAULT: '#E6A817',
          50: '#FEF9E7',
          100: '#FDF3CF',
          200: '#FBE79F',
          300: '#F9DB6F',
          400: '#F7CF3F',
          500: '#E6A817',
          600: '#B88612',
          700: '#8A650E',
          800: '#5C4309',
          900: '#2E2205',
        },
        // Уровни партнёров
        tier: {
          standard: '#9CA3AF',
          silver: '#C0C0C0',
          gold: '#FFD700',
          platinum: '#E5E4E2',
          master: '#B9F2FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

