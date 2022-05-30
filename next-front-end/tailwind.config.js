module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#725AC1',
          light: '#8a6de8'
        }
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
