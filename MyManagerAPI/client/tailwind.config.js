/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend:
    {
      colors: {
        'selective': "#FCBA04",
        'maroon': "#400913",
        'forrest': "#012619",
        'lite-forrest': "#143B2D",
        'soot': "#44474A",
        'liteSoot': "#C7CFD9",
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
