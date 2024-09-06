/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F59E0B',
        text: { DEFAULT: '#374151', light: '#ABABAB' },
      },
    },
  },
  plugins: [],
}
