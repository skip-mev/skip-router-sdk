// @ts-check

const { devDependencies } = require("./package.json");

/**
 * @type {import("prettier").Config}
 * @see https://prettier.io/docs/en/configuration
 */
const prettierConfig = {
  endOfLine: "auto",
  plugins: Object.keys(devDependencies).filter((dep) => {
    return dep.startsWith("prettier-plugin-");
  }),
  semi: true,
  singleAttributePerLine: true,
  singleQuote: false,
  trailingComma: "all",
};

module.exports = prettierConfig;
