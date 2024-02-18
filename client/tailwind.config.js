// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      backgroundColor: {
        'custom-gradient': 'linear-gradient(180deg, #BE8200 0%, #FEF098 47.4%, #EFD261 100%)',
      },
      boxShadow: {
        'custom': '0px 4px 40px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
