import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
      exclude: ['E2E/**', 'node_modules'],
      environment: 'jsdom',
    },
  });
  