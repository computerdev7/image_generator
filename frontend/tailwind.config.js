/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        'inner-box' : 'inset 0 2px 4px 2px rgb(60 60 60)'
      },
      colors : {
        'lightGray' : '#333333',
        'darkGray' : '#262626'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

