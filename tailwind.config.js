/** @type {import('tailwindcss').Config} */

import radUIColors from "./styles/jsTokens/base.tokens.js"

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors:{
        gray:{
          50: 'var(--rad-ui-color-gray-50)',
          100: 'var(--rad-ui-color-gray-100)',
          200: 'var(--rad-ui-color-gray-200)',
          300: 'var(--rad-ui-color-gray-300)',
          400: 'var(--rad-ui-color-gray-400)',
          500: 'var(--rad-ui-color-gray-500)',
          600: 'var(--rad-ui-color-gray-600)',
          700: 'var(--rad-ui-color-gray-700)',
          800: 'var(--rad-ui-color-gray-800)',
          900: 'var(--rad-ui-color-gray-900)',
          950: 'var(--rad-ui-color-gray-950)',
          1000: 'var(--rad-ui-color-gray-1000)',
        }
      }
    },
  },
  plugins: [],
}

