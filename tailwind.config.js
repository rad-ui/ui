/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors:{
        gray:{
          50: 'var(--gray50)',
          100: 'var(--gray100)',
          200: 'var(--gray200)',
          300: 'var(--gray300)',
          400: 'var(--gray400)',
          500: 'var(--gray500)',
          600: 'var(--gray600)',
          700: 'var(--gray700)',
          800: 'var(--gray800)',
          900: 'var(--gray900)',
          950: 'var(--gray950)',
          1000: 'var(--gray1000)',
        }
      }
    },
  },
  plugins: [],
}

