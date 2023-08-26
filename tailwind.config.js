/** @type {import('tailwindcss').Config} */



import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#35393f",
                primary: {...colors.slate, DEFAULT: colors.slate[800]},
                secondary: {...colors.teal, DEFAULT: colors.teal[500]},
                tertiary: {...colors.pink, DEFAULT: colors.pink[500]},
                textGray: "#b3b3b3",
                textGray2: "#a3a3a3",
                textGray3: "#737373",
            },
        },
    },
    plugins: [],
  }