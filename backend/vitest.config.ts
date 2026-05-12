import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
      include: ["src/modules/**/*.service.ts", "src/modules/**/*.validation.ts"],
    },
    // Setiap test file mendapat timeout 10 detik
    testTimeout: 10000,
    // Jalankan test secara sequential untuk menghindari race condition pada mock
    sequence: {
      concurrent: false,
    },
  },
})
