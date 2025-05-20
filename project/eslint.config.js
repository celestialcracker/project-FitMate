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

// Import ESLint plugins and configurations
import js from '@eslint/js';                    // Core ESLint rules
import globals from 'globals';                  // Global variables definitions
import reactHooks from 'eslint-plugin-react-hooks';    // React Hooks rules
import reactRefresh from 'eslint-plugin-react-refresh'; // React Refresh rules
import tseslint from 'typescript-eslint';       // TypeScript ESLint integration

// Export the ESLint configuration
export default tseslint.config(
  // Ignore build output directory
  { ignores: ['dist'] },
  
  // Main configuration object
  {
    // Extend recommended configurations
    extends: [
      js.configs.recommended,           // ESLint recommended rules
      ...tseslint.configs.recommended,  // TypeScript recommended rules
    ],
    
    // Apply to TypeScript and TSX files
    files: ['**/*.{ts,tsx}'],
    
    // Language-specific options
    languageOptions: {
      ecmaVersion: 2020,               // Use modern JavaScript features
      globals: globals.browser,        // Include browser globals
    },
    
    // Configure plugins
    plugins: {
      'react-hooks': reactHooks,       // React Hooks plugin
      'react-refresh': reactRefresh,   // React Refresh plugin
    },
    
    // Customize rules
    rules: {
      // Include recommended React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh rules for development
      'react-refresh/only-export-components': [
        'warn',                        // Warning level
        { allowConstantExport: true }, // Allow constant exports
      ],
    },
  }
);
