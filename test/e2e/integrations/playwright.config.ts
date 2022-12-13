import {PlaywrightTestConfig, devices} from '@playwright/test';

const config: PlaywrightTestConfig = {
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    use: {
        trace: 'on-first-retry',
        screenshot: "only-on-failure",
        ignoreHTTPSErrors: true,
        viewport: { width: 1920, height: 1080 }
    },
    webServer: {
        command: 'npm start',
        port: 3000,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
      },
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']}
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']}
        },
        {
            name: 'webkit',
            use: {...devices['Desktop Safari']}
        }
    ]
};
export default config;
