/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy for the shell, electric orange for action, mint for "live / ok".
        pit: { 950: '#0b1020', 900: '#111833', 800: '#1a2447', 700: '#25306a', 100: '#e8ecff' },
        spark: { 500: '#ff7a1a', 400: '#ff9a4d', 100: '#ffe8d6' },
        mint: { 500: '#22c99a', 100: '#d9f7ec' },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
    },
  },
  plugins: [],
}
