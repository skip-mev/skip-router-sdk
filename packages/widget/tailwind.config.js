/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: "skip-",
  corePlugins: {
    preflight: false,
  },
};
