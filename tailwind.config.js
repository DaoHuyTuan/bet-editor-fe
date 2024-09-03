/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        soleil: ['soleil', 'sans-serif'],
        lorimer: ['lorimer-no-2', 'sans-serif'],
        'lorimer-stencil': ['lorimer-no-2-stencil', 'sans-serif']
      },
      fontWeight: {
        normal: 400,
        bold: 700,
        black: 900
      }
    },
    variants: {
      extend: {
        fontStyle: ['italic']
      }
    }
  },
  plugins: []
}
