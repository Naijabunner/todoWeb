/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./components/**", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4880FF",
        shadow: "#B9B9B9",
        alternateText:"#747474"
      },
    },
  },
  plugins: [],
};

