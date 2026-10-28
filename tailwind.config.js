/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // BIOBUZZ: white pages, honey yellow for action, warm dark ink for text, mint for "ok".
        honey: { 50: '#FFFBEA', 100: '#FFF3C4', 200: '#FDE68A', 300: '#FCD34D', 400: '#F5C400', 500: '#F2B705', 600: '#C98F00', 900: '#5A3E00' },
        ink: { 100: '#F3F0E8', 200: '#E6E1D4', 300: '#B9B3A6', 400: '#8E877A', 500: '#6B655A', 600: '#4B4639', 900: '#1E1A12' },
        mint: { 500: '#1FA97F', 100: '#D9F7EC', 800: '#0F5C45' },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
    },
  },
  plugins: [],
}
