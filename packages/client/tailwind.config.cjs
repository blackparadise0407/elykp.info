/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.svelte', './src/routes/**/*.svelte'],
  theme: {
    fontFamily: {
      "body": ["Inter"],
      "display": ["Poppins",]
    },
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    }
  },
  plugins: [],
  darkMode: 'class',
}
