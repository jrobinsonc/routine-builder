const path = require('node:path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  '*.{js,ts,tsx}': buildEslintCommand,
  '*.{ts,tsx}': () => 'yarn run check-types',
  '*.{json,md,css}': 'prettier --write',
};
