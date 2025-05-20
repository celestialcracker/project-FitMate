/**
 * ESLint Configuration for FitMate
 * 
 * This file configures ESLint for the FitMate project, providing code quality
 * and style enforcement. It uses the new flat config format introduced in ESLint 8.21.0.
 * 
 * The configuration includes:
 * - TypeScript support via typescript-eslint
 * - React Hooks rules for proper hook usage
 * - React Refresh rules for development hot reloading
 * - Browser globals for web development
 * - Recommended rules from ESLint and TypeScript
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
