/** @type {import('tailwindcss').Config} */

export default {
  content: [
     "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js',
],
  theme: {
    colors: {
      "1":"#f4f3f3",
      "2":"dfdfdf",
      "3":"#bfd8d5",
      "4":"#b1bed5",
      "fav":"#3f3cbb"
    },
    extend: {

    },
  },
  plugins: [ require('flowbite/plugin'),require('tailwind-scrollbar')],
}

