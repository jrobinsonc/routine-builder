const prettierOptions = require('./.prettierrc.js');

module.exports = {
  root: true,

  plugins: ['prettier'],

  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],

  rules: {
    'prettier/prettier': ['warn', prettierOptions],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};
