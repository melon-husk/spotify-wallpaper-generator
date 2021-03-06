module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.js", "*.html", "./src/helpers/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "x-sm": "330px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
