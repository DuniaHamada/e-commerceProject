/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'cursive'],
      },
      colors: {
        'rise': 'rgb(138 30 68)', 
        'brun': '#a8a29e', 
      },
    },
  },
  plugins: [],
};
