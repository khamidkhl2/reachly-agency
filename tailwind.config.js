/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Syne"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Fraunces"', '"Instrument Serif"', 'Georgia', 'serif'],
        editorial: ['"Instrument Serif"', '"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        script: ['"Fraunces"', '"Instrument Serif"', 'Georgia', 'serif'],
      },
      colors: {
        periwinkle: {
          DEFAULT: '#3643BA',
          50: '#EEF0FB',
          100: '#DCE0F7',
          500: '#3643BA',
          600: '#2D38A0',
          700: '#252F86',
        },
        cream: {
          50: '#FDFCF9',
          100: '#FAF9F5',
          200: '#F5F4EE',
          300: '#EAE8DE',
          400: '#DCD9CD',
        },
        signal: {
          DEFAULT: '#3643BA',
          hover: '#2D38A0',
        },
      },
    },
  },
  plugins: [],
}
