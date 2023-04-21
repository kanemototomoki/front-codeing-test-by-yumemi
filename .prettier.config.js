module.exports = {
  arrowParens: 'always',
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  importOrder: [
    '^(react(.*)/(.*)$)|^react$',
    '<THIRD_PARTY_TS_TYPES>',
    '<THIRD_PARTY_MODULES>',
    '^types$',
    '^@/(.*)$',
    '^[./]',
  ],
  // pnpm doesn't support plugin autoloading
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation
  plugins: [require('prettier-plugin-tailwindcss')],
};
