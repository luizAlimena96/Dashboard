import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false, // Changed to false to avoid race conditions with backend
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Run tests serially to avoid port conflicts
  reporter: 'html',
  
  // Global setup that includes teardown
  globalSetup: './e2e/test-utils.ts',
  
  use: {
    baseURL: 'http://localhost:3000', // Frontend port
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    // Configure API base URL for backend requests
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  
  // Configure different projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Add more browsers if needed
  ],
  
  // Web server for development
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      // Point frontend to test backend
      NEXT_PUBLIC_API_URL: 'http://localhost:3001',
      NODE_ENV: 'test',
    },
  },
});
