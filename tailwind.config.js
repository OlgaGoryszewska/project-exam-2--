/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-blue": "#44468A",
        "rav-mango": "#EAA123",
        "dark-coconut": "#70493C",
        "pink-silk": "#F9EDF0",
        "light-gray":"#CACACA"
      },
      fontFamily: {
        unica: ["Unica One", "cursive"],
        roboto: ["Roboto", "sans-serif"],
      },
      maxHeight: {
        800: "864px",
      },
    },
  },
  plugins: [],
};
