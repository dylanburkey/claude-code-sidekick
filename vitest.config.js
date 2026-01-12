import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'cli/templates/**',
        '**/*.config.js',
        '**/dist/**',
        '**/coverage/**',
        '**/.{husky,github}/**',
      ],
    },
    include: ['cli/src/**/*.{test,spec}.js'],
    exclude: ['node_modules', 'cli/node_modules', 'cli/templates'],
  },
});
