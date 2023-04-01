/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './dist/**/*.{html,ts}', './docs/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-import',),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
    ]
}