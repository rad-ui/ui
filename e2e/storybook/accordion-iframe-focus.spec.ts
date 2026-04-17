import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame, waitForPreviewDom } from './utils';

test.describe('Accordion Storybook iframe focus', () => {
    test.beforeEach(async({ page }) => {
        await gotoManagerStory(page, 'components-accordion--all');
        await page.locator('#storybook-preview-iframe').waitFor({ state: 'attached' });
        await waitForPreviewDom(page, '.rad-ui-accordion-trigger', 4);
        const preview = storyPreviewFrame(page);
        await preview.locator('.rad-ui-accordion-trigger').first().waitFor({
            state: 'visible',
            timeout: 90_000
        });
    });

    test('roving focus: ArrowDown moves between triggers', async({ page }) => {
        const preview = storyPreviewFrame(page);
        const triggers = preview.locator('.rad-ui-accordion-trigger');
        await expect(triggers).toHaveCount(4);

        await triggers.nth(0).focus();
        await expect(triggers.nth(0)).toBeFocused();

        await triggers.nth(0).press('ArrowDown');
        await expect(triggers.nth(1)).toBeFocused();
        await expect(triggers.nth(1)).toHaveAttribute('tabindex', '0');
    });

    test('Home moves focus to first trigger from third', async({ page }) => {
        const preview = storyPreviewFrame(page);
        const triggers = preview.locator('.rad-ui-accordion-trigger');
        await triggers.nth(2).focus();
        await triggers.nth(2).press('Home');
        await expect(triggers.nth(0)).toBeFocused();
    });

    test('Space toggles aria-expanded on first trigger', async({ page }) => {
        const preview = storyPreviewFrame(page);
        const first = preview.locator('.rad-ui-accordion-trigger').first();
        await first.focus();
        await first.press(' ');
        await expect(first).toHaveAttribute('aria-expanded', 'true');
        await first.press(' ');
        await expect(first).toHaveAttribute('aria-expanded', 'false');
    });
});
