import js from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  js.configs.recommended,
  {
    files: ['cli/**/*.js', 'agent-library/**/*.js'],
    plugins: {
      jsdoc
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly'
      }
    },
    rules: {
      // Code quality
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // CLI tools need console
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-duplicate-imports': 'error',
      
      // Best practices
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-return-await': 'error',
      'require-await': 'error',
      
      // Style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      
      // JSDoc requirements
      'jsdoc/require-jsdoc': ['error', {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: false,
          FunctionExpression: false
        },
        contexts: [
          'ExportDefaultDeclaration > FunctionDeclaration',
          'ExportNamedDeclaration > FunctionDeclaration'
        ]
      }],
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/valid-types': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error'
    }
  },
  {
    // Ignore patterns
    ignores: [
      'node_modules/**',
      'cli/node_modules/**',
      'cli/templates/**',
      '**/*.min.js'
    ]
  }
];
