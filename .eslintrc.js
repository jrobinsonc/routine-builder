const baseRules = {
  // By default, Prettier issues are shown as errors, which
  // doesn't make sense for styling rules.
  'prettier/prettier': 'warn',

  // These rules are configured as errors or disabled, but they are more
  // like warnings as they do not cause any major issues.
  'no-alert': 'warn',
  'no-console': 'warn',
  'no-continue': 'warn',
  'no-debugger': 'warn',
  'no-else-return': 'warn',
  'no-empty-function': 'warn',
  'no-empty-pattern': 'warn',
  'no-empty': 'warn',
  'no-implied-eval': 'warn',
  'no-param-reassign': 'warn',
  'no-shadow': 'warn',
  'no-unreachable': 'warn',
  'no-unused-vars': 'warn',
  'no-var': 'warn',
  'no-warning-comments': 'warn',
  'one-var': 'warn',
  'prefer-const': 'warn',
  'require-await': 'warn',
  'vars-on-top': 'warn',
  eqeqeq: 'warn',
  semi: 'warn',
  'no-magic-numbers': [
    'warn',
    {
      ignore: [0, 1],
    },
  ],
};

module.exports = {
  root: true,

  // Configuration for JavaScript files
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'next/core-web-vitals', // This is not needed for Node files but is needed to avoid a warning in Next.js build: "The Next.js plugin was not detected in your ESLint configuration."
    'plugin:prettier/recommended',
  ],
  rules: {
    ...baseRules,
  },

  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:tailwindcss/recommended',
        'airbnb',
        'airbnb/hooks',
        'airbnb-typescript',
        'next/core-web-vitals',
        'plugin:prettier/recommended',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        ...baseRules,

        // These rules are disabled because are handled by TS rules.
        'no-implied-eval': 'off',
        'require-await': 'off',
        'no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-empty-function': 'off',

        // These rules are configured as errors or disabled, but they are more
        // like warnings as they do not cause any major issues.
        '@typescript-eslint/strict-boolean-expressions': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/no-floating-promises': [
          'warn',
          { ignoreIIFE: true },
        ],
        '@typescript-eslint/no-for-in-array': 'warn',
        '@typescript-eslint/no-implied-eval': 'warn',
        '@typescript-eslint/no-misused-promises': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/require-await': 'warn',
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/restrict-template-expressions': 'warn',
        '@typescript-eslint/unbound-method': 'warn',
        '@typescript-eslint/no-use-before-define': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/consistent-type-exports': 'warn',
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-confusing-void-expression': [
          'warn',
          {
            ignoreArrowShorthand: true,
            ignoreVoidOperator: false,
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': 'warn',
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/typedef': [
          'warn',
          {
            arrayDestructuring: true,
            objectDestructuring: true,
            arrowParameter: true,
            memberVariableDeclaration: true,
            parameter: true,
            propertyDeclaration: true,
            variableDeclaration: true,
            variableDeclarationIgnoreFunction: true,
          },
        ],
      },
    },
  ],
};
