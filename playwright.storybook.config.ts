import { defineConfig, devices } from '@playwright/test';

/**
 * E2E tests against a **static** Storybook build (`storybook-static/`).
 *
 * - Local: `npm run build-storybook && npm run test:storybook:e2e`
 * - CI one-liner: `npm run test:storybook:e2e:ci`
 *
 * Uses `http-server` (not `serve`): `serve` 301-redirects `iframe.html` → `/iframe` and **drops the query**,
 * so the preview never receives `?id=…` and stays on “No Preview”.
 */
export default defineConfig({
    testDir: './e2e/storybook',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: 'list',
    timeout: 120_000,
    use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:6007',
        trace: 'on-first-retry'
    },
    webServer: {
        command: 'npx --yes http-server@14 storybook-static -p 6007 -c-1 -s',
        url: 'http://127.0.0.1:6007',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000
    }
});
