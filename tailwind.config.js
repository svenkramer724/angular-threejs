/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,scss,ts}","./node_modules/ng-tw/**/*"],
  theme: {

    extend: {
      colors: {
        primary: '#6D278E',
      },
      backgroundImage: {
        hero: "url('assets/imgs/bghero.svg')",
        token: "url('assets/imgs/bgtoken.svg')",
        footer: "url('assets/imgs/bglines.svg')",
      },
    },
  },
  plugins: [],
}

