/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eef2f9",
          100: "#dbe4f2",
          200: "#bacbe7",
          300: "#8faad8",
          400: "#5f84c5",
          500: "#3d65ad",
          600: "#2d4f90",
          700: "#223d72",
          800: "#1b315d",
          900: "#182956",
        },
        sand: "#dbe4f2",
        stone: "#F5F7FA",
        ink: "#182956",
        porcelain: "#E5E7EB",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 41, 86, 0.12)",
        premium: "0 28px 80px rgba(7, 18, 48, 0.22)",
        card: "0 24px 70px rgba(7, 18, 48, 0.16)",
        lift: "0 34px 90px rgba(7, 18, 48, 0.22)",
      },
    },
  },
  plugins: [],
};
