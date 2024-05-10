/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#D1D1D6',
        ghost: '#E0E8EE',
        dull: '#303233',
        primary: "#B9E6FF" // #4B5560 is
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}

