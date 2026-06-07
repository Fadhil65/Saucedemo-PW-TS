import { defineConfig, devices } from '@playwright/test';
  import dotenv from 'dotenv';

  dotenv.config();

  export default defineConfig({
    testDir: './test',
    fullyParallel: true,
    retries: 0,
    timeout: 30_000,

    reporter: [
      ['list'],
      ['html', { open: 'never' }],
      ['allure-playwright', { outputFolder: 'allure-results' }],
    ],

    use: {
      baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'retain-on-failure',
      viewport: null,
      launchOptions: {
        args: ["--start-maximized"],
      }
    },

    projects: [
      {
        name: 'chromium',
        use: { browserName: 'chromium' },
      },
    ],
  });