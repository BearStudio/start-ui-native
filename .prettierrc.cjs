// Prettier configuration. Please avoid changing the current configuration.
// But if you do so, please run the `pnpm pretty` command.
/** @type {import("prettier").Options} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  arrowParens: 'always',
  tailwindStylesheet: './src/app.css',
  tailwindFunctions: ['cn', 'tv'],
};

module.exports = config;
