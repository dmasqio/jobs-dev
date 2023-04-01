/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './dist/**/*.{html,ts}', './docs/**/*.{html,ts}', './node_modules/flowbite/**/*.js', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('postcss-import',),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    ]
}