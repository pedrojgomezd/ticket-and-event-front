const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/*.js", "./src/components/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color: {
      gray: colors.coolGray,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
