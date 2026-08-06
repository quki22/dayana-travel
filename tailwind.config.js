/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        floating: "0 24px 80px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
};
