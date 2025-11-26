// vitest.config.ts
import { defineConfig } from "file:///C:/Users/vinay/Downloads/AdyaUI/node_modules/.pnpm/vitest@1.6.1_@types+node@20_38682b9bfe95711c26c48937d121faf3/node_modules/vitest/dist/config.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __vite_injected_original_import_meta_url = "file:///C:/Users/vinay/Downloads/AdyaUI/packages/core/vitest.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vitest_config_default = defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    environmentOptions: {
      jsdom: {
        resources: "usable"
      }
    },
    // Add coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      all: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/*.d.ts",
        "**/test-utils/**",
        "**/__tests__/**"
      ]
    },
    // Enable browser mode for Web Components
    browser: {
      enabled: true,
      name: "chrome",
      headless: true
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHZpbmF5XFxcXERvd25sb2Fkc1xcXFxBZHlhVUlcXFxccGFja2FnZXNcXFxcY29yZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdmluYXlcXFxcRG93bmxvYWRzXFxcXEFkeWFVSVxcXFxwYWNrYWdlc1xcXFxjb3JlXFxcXHZpdGVzdC5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3ZpbmF5L0Rvd25sb2Fkcy9BZHlhVUkvcGFja2FnZXMvY29yZS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKF9fZmlsZW5hbWUpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICB0ZXN0OiB7XHJcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcclxuICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudGVzdC50cyddLFxyXG4gICAgc2V0dXBGaWxlczogWycuL3ZpdGVzdC5zZXR1cC50cyddLFxyXG4gICAgZ2xvYmFsczogdHJ1ZSxcclxuICAgIGVudmlyb25tZW50T3B0aW9uczoge1xyXG4gICAgICBqc2RvbToge1xyXG4gICAgICAgIHJlc291cmNlczogJ3VzYWJsZScsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gQWRkIGNvdmVyYWdlIGNvbmZpZ3VyYXRpb25cclxuICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgIHByb3ZpZGVyOiAndjgnLFxyXG4gICAgICByZXBvcnRlcjogWyd0ZXh0JywgJ2pzb24nLCAnaHRtbCddLFxyXG4gICAgICBhbGw6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoue3RzLHRzeH0nXSxcclxuICAgICAgZXhjbHVkZTogW1xyXG4gICAgICAgICcqKi9ub2RlX21vZHVsZXMvKionLFxyXG4gICAgICAgICcqKi9kaXN0LyoqJyxcclxuICAgICAgICAnKiovKi5kLnRzJyxcclxuICAgICAgICAnKiovdGVzdC11dGlscy8qKicsXHJcbiAgICAgICAgJyoqL19fdGVzdHNfXy8qKicsXHJcbiAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgLy8gRW5hYmxlIGJyb3dzZXIgbW9kZSBmb3IgV2ViIENvbXBvbmVudHNcclxuICAgIGJyb3dzZXI6IHtcclxuICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgbmFtZTogJ2Nocm9tZScsXHJcbiAgICAgIGhlYWRsZXNzOiB0cnVlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlUsU0FBUyxvQkFBb0I7QUFDeFcsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxTQUFTLGVBQWU7QUFGZ0wsSUFBTSwyQ0FBMkM7QUFJbFEsSUFBTSxhQUFhLGNBQWMsd0NBQWU7QUFDaEQsSUFBTSxZQUFZLFFBQVEsVUFBVTtBQUVwQyxJQUFPLHdCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsSUFDSixhQUFhO0FBQUEsSUFDYixTQUFTLENBQUMsa0JBQWtCO0FBQUEsSUFDNUIsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLElBQ2hDLFNBQVM7QUFBQSxJQUNULG9CQUFvQjtBQUFBLE1BQ2xCLE9BQU87QUFBQSxRQUNMLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixVQUFVLENBQUMsUUFBUSxRQUFRLE1BQU07QUFBQSxNQUNqQyxLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsbUJBQW1CO0FBQUEsTUFDN0IsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsV0FBVyxLQUFLO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
