/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx', './index.html', './App.jsx'],
  theme: {
    fontFamily: {
      outfit: ['Outfit', 'sans-serif'],
    },
    extend: {
      screens: {
        '2md': '960px',
      },
      colors: {
        primary: '#C2EBC2',
        secondaryText: '#6B7280',
        mainText: '#111928',
        BgFooter: '#C2EBC2',
        gradientPurple: '#6327C9',
        gradientSkyBlue: '#21ABDB',
        darkBlue: '#213C84',
        darkPrimary: '#fdfdfd',
        grey: '#626B83',
        // --------------------
        "primary-background": "#F8FAF9",
        redd:'#008000',
        "light-green":'#C2EBC2',
        "dark-green" : "#008000",
        "light": "white",
        "dark": "black",
        "mid-green": "#66BB66"
      },
    },
  },
  plugins: [],
}
