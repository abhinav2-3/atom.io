/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        p_Blue: "#1F2833",
        p_black: "#0B0C10",
        p_text: "#FAED26",
        s_blue: "#17252A",
      },
    },
  },
  plugins: [],
};
