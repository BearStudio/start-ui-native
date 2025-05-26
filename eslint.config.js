// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    env: {
      es6: true,
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:sonarjs/recommended',
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['warn', 50],
      'sonarjs/prefer-immediate-return': 'warn',
    },
    overrides: [
      {
        files: [
          '*.stories.tsx',
          './src/locales/**/*',
          './src/theme/components/**/*.ts',
        ],
        rules: {
          'import/no-anonymous-default-export': 'off',
        },
      },
    ],
    ignorePatterns: ['node_modules/', 'android/'],
    ignores: ['dist/*'],
  },
]);
