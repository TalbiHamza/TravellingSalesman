/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      alegreya: ["Alegreya", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      playfair: ['"Playfair Display"', "sans-serif"],
    },
    extend: {
      colors: {
        vert: "var(--vert)",
        card: "var(--card)",
      },
    },
  },
  plugins: [],
};
