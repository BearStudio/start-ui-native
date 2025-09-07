// https://docs.expo.dev/guides/using-eslint/
let eslintConfig = require('eslint/config');
let expoConfig = require('eslint-config-expo/flat');
let sonarConfig = require('eslint-plugin-sonarjs');
let eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
let defineConfig = eslintConfig.defineConfig;

module.exports = defineConfig([
  eslintConfig.globalIgnores([
    '**/.expo/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/.storybook/**',
  ]),
  expoConfig,
  eslintPluginPrettierRecommended,
  sonarConfig.configs.recommended,
  {
    ignores: ['dist/*', '.expo/**/*', 'node_modules'],

    rules: {
      'react/display-name': 'off',
    },
  },
  {
    // ✅ Disable rule just for storybook entry file
    files: ['app/storybook/**/*'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*'],
    rules: {
      'react-hooks/rules-of-hooks': 'off',
    },
  },
  {
    files: ['src/database/models/**/*'],
    rules: { 'prettier/prettier': 'off' },
  },
  {
    rules: {
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['warn', 50],
      'sonarjs/prefer-immediate-return': 'warn',
      'sonarjs/todo-tag': 'off',
    },
  },
  {
    rules: {
      'sonarjs/redundant-type-aliases': 'off',
    },
    files: ['src/types/**/*'],
  },
]);
