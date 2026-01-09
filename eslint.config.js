import js from '@eslint/js';
import importX from 'eslint-plugin-import-x';
import solid from 'eslint-plugin-solid/configs/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  },
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import-x': importX,
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Import grouping
      'import-x/order': [
        'error',
        {
          groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '{solid-js,solid-js/**}',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // This ensures type imports are separate from value imports
      'import-x/no-duplicates': ['error', { 'prefer-inline': false }],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports', // Enforces `import type {...}` for types
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './example/tsconfig.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
  globalIgnores([
    '**/*.log',
    '**/.DS_Store',
    '**/.vscode/settings.json',
    '**/.history',
    '**/.yarn',
    '**/bazel-*',
    '**/bazel-bin',
    '**/bazel-out',
    '**/bazel-qwik',
    '**/bazel-testlogs',
    '**/dist',
    '**/dist-dev',
    '**/lib',
    '**/lib-types',
    '**/etc',
    '**/external',
    '**/node_modules',
    '**/temp',
    '**/tsc-out',
    '**/tsdoc-metadata.json',
    '**/target',
    '**/output',
    '**/rollup.config.js',
    '**/build',
    '**/.cache',
    '**/.vscode',
    '**/.rollup.cache',
    '**/dist',
    '**/tsconfig.tsbuildinfo',
    '**/vite.config.ts',
    '**/*.spec.tsx',
    '**/*.spec.ts',
    '**/.netlify',
    '**/pnpm-lock.yaml',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/server',
    '**/postcss.config.js',
    '**/prettier.config.js',
    '**/tailwind.config.js',
    '**/typedoc.js',
  ]),
]);
