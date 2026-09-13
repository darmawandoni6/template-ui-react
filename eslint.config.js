import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['templates/**', 'node_modules/**', '.next/**', 'coverage/**', 'dist/**', 'build/**']),
  {
    files: ['bin/**/*.js', 'scripts/**/*.js', 'utils/**/*.js', '*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
]);
