/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        blur:{
          md: 'blur(10px)',
        },
      },
    },
    plugins: [],
  }