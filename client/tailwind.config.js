/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-1": "#ffffff",
        "color-2": "#c0c5c1",
        "color-3": "#7d8491",
        "color-4": "#574b60",
        "color-5": "#3f334d",
      },
      animation: {
        move: "movebg 0.5s ease-in-out",
        close: "outbg 0.5s ease-in-out",
      },
      keyframes: {
        movebg: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        outbg: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
