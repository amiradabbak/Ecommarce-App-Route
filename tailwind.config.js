/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        'sm': '600px',
        'md': '720px',
        'lg': '960px',
        'xl': '1220px',
        '2xl': '1380px',
      }
    }
    , extend: {
      colors: {
        Success: "#0aad0a",
        "light-white": "#f0f3f2",
        "rating-color": "#ffc908"
      },
      fontFamily: {
        cairo: `Cairo Variable`
      }
    },
  },
  plugins: [],
}

