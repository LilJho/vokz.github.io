/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "3xl": "1537px",
      },
      colors: {
        primary: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#F0F2FD",
          300: "#CDD2F7",
          400: "#AAB2F2",
          500: "#8693EC",
          600: "#6373E7",
          700: "#3247E0",
          800: "#1D30BD",
          900: "#16248C",
          950: "#121E74",
        },
        secondary: {
          50: "#BBC8CD",
          100: "#AFBEC4",
          200: "#97ABB3",
          300: "#8098A2",
          400: "#698590",
          500: "#586F78",
          600: "#475961",
          700: "#354449",
          800: "#242E32",
          900: "#13181A",
          950: "#07090A",
        },
        danger: {
          50: "#FFFFFF",
          100: "#FDEDF0",
          200: "#FAC8D2",
          300: "#F6A2B4",
          400: "#F27D96",
          500: "#EF5878",
          600: "#EB335A",
          700: "#D1153D",
          800: "#9E102E",
          900: "#6B0B1F",
          950: "#520818",
        },
        accent: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#E1F7FD",
          300: "#BBEDFA",
          400: "#95E2F7",
          500: "#6FD8F4",
          600: "#49CEF1",
          700: "#15C0ED",
          800: "#0E97BB",
          900: "#0A6D87",
          950: "#08586D",
        },
        warning: {
          50: "#FFFFFF",
          100: "#FFFAF8",
          200: "#FCDBD2",
          300: "#FABDAC",
          400: "#F79E86",
          500: "#F5805F",
          600: "#F26139",
          700: "#E43D0F",
          800: "#AF2F0C",
          900: "#7B2108",
          950: "#601A06",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
