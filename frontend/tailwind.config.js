/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./index.html", "./App.jsx"],
  theme: {
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
    extend: {
      screens: {
        'mobile': '0px',      
        'tablet': '640px',    
        'laptop': '1024px',  
        'desktop': '1280px',  
        'extra-large': '1536px'},
        
      colors: {
        "primary-background": "#F8FAF9",
        "light-green": "#C2EBC2",
        "mid-green": "#56C856",
        "dark-greenn": "#37A937",
        "dark-green": "#008000",
        light: "white",
        dark: "black",
        "mid-green": "#66BB66",
      },
    },
  },
  plugins: [],
};
