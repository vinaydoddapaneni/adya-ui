import { defineConfig } from 'vitest/config';

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
  },
});
