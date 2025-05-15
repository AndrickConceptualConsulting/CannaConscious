/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14ff9e',
        accent: '#a042f4',
        dark: '#0f172a',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.3)',
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.4)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.3)',
        },
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow-lg': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
      });
    },
  ],
};