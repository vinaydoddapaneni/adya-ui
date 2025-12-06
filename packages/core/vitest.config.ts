import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Add coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/test-utils/**',
        '**/__tests__/**',
      ],
    },
    // Enable browser mode for Web Components
    // Temporarily disabled due to version mismatch - using jsdom instead
    // browser: {
    //   enabled: true,
    //   name: 'chrome',
    //   headless: true,
    // },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
