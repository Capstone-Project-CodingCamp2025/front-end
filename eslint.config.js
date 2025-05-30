import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  
  {
    ignores: ['dist', 'build', 'node_modules'], 
  },

  
  {
    files: ['**/*.{js,jsx}'], 
    languageOptions: {
      ecmaVersion: 'latest', 
      sourceType: 'module',  
      globals: {
        ...globals.browser, 
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true, 
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect', 
      },
    },
    rules: {
     
      ...js.configs.recommended.rules,

      
      ...reactPlugin.configs['jsx-runtime'].rules, // <--- PERUBAHAN KUNCI DI SINI

      
      ...reactHooks.configs.recommended.rules,

      
      ...jsxA11y.configs.recommended.rules,

      
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // Nonaktifkan jika tidak menggunakan prop-types
      // 'react/react-in-jsx-scope': 'off', 
    },
  },

  
  eslintConfigPrettier,
];