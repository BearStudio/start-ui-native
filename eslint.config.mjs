import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import sonarjs from 'eslint-plugin-sonarjs';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules/',
    '**/android/',
    '**/.expo/**',
    '**/.storybook/**/*',
    '**/types/utilities.d.ts',
    '**/*.js',
    '**/*.ts',
    '**/storybook/index.tsx',
  ]),

  {
    name: 'base',
    plugins: { sonarjs },
    extends: compat.extends('plugin:@typescript-eslint/recommended'),

    languageOptions: {
      globals: {},
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['warn', 50],
      'sonarjs/prefer-immediate-return': 'warn',
    },
  },

  {
    files: [
      '**/*.stories.tsx',
      './src/locales/**/*',
      './src/theme/components/**/*.ts',
    ],
    rules: {
      'import/no-anonymous-default-export': 'off',
    },
  },
]);
