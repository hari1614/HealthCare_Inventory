/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
      'primary': '#3238f2',
      'sea': '#2fa4e7',
      'title':'#00578b',
      'title2':'#80af3b',
      'hover1': '#1e7bb8',
      'hover2':'#4b5563',
      'table1': '#fff5',
    
      },

      boxShadow: {
        'custom': '0px 3px 5px rgba(0, 0, 0, 0.1), 0px 2px 20px rgba(0, 0, 0, 0.08)'
      },

      fontFamily : {
        'display':['Popins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

