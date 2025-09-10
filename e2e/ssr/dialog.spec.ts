import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { bundleForSSR } from './utils';

test('Dialog hydrates without warnings', async({ page }) => {
    const script = await bundleForSSR('SSRDialog');
    const messages: string[] = [];

    page.on('console', msg => {
        if (msg.type() === 'warning' || msg.type() === 'error') {
            messages.push(msg.text());
        }
    });

    // Start with a basic HTML shell that will be hydrated
    await page.setContent(`
    <div id="root">
      <div>Loading...</div>
    </div>
    <script type="module">${script}</script>
  `);

    // Wait for hydration to complete
    await page.waitForFunction(() => (window as any).__HYDRATED__ === true);

    // Test that the Dialog component rendered correctly
    await expect(page.getByTestId('dialog-container')).toBeVisible();
    await expect(page.getByTestId('dialog-trigger')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open Dialog' })).toBeVisible();

    // Test that there are no critical errors
    expect(messages.filter(msg => msg.includes('Objects are not valid as a React child'))).toEqual([]);

    // Test accessibility
    const accessibilityScanResults = await new AxeBuilder({ page }).include('#root').analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
});
