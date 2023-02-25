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
      screens: {
        sm: '440px',
        md: '568px',
        lg: '824px',
        xl: '1080px',
        '2xl': '1336px',
      },
    }
  },
  plugins: [],
}
