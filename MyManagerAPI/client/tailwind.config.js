/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend:
    {
      colors: {
        'selective': "#FCBA04",
        'maroon': "#D9910D",
        'forrest': "#0E1A59",
        'lite-forrest': "#122173",
        'soot': "#44474A",
        'liteSoot': "#16288C",
        'lite-maroon': "#5A1C28"

      },

      fontFamily: {
        ArtDecoBold: ['Fascinate Inline, cursive'],
        metro: ['Limelight, cursive'],
        techno: ['Titillium Web, sans-serif']
      },

    },

  },
  plugins: [],
}
