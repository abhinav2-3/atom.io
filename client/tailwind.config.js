/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        p_Blue: "#5263EE",
        p_black: "#0E1A27",
        p_yellow: "#C2F750V",
        s_blue: "#3545D6",
      },
    },
  },
  plugins: [],
};
