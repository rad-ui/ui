import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// #1807, #1805: with the system's reduce-motion setting, the theme's motion tokens collapse so
// transitions and enter/exit animations finish at once; activity indicators slow down or stop.
test.describe('prefers-reduced-motion: reduce', () => {
    // The context-level `reducedMotion` option doesn't reach Storybook's preview frame; emulateMedia does.
    test.beforeEach(async({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' });
    });

    test('motion tokens collapse and a Dialog still opens and closes', async({ page }) => {
        await gotoManagerStory(page, 'components-dialog--default');
        const preview = storyPreviewFrame(page);
        const normal = await preview.locator('html').evaluate((el) => getComputedStyle(el).getPropertyValue('--rad-ui-motion-duration-normal').trim());
        expect(normal).toBe('0.01ms');

        await preview.locator('.rad-ui-dialog-trigger').first().click();
        const content = preview.locator('.rad-ui-dialog-content');
        await expect(content).toHaveAttribute('data-state', 'open');
        const duration = await content.evaluate((el) => parseFloat(getComputedStyle(el).animationDuration) || 0);
        expect(duration).toBeLessThan(0.01);
        await page.keyboard.press('Escape');
        await expect(content).toHaveCount(0, { timeout: 1_000 });
    });

    test('an indeterminate Progress keeps a slow pace instead of flickering', async({ page }) => {
        await gotoManagerStory(page, 'components-progress--indeterminate');
        const indicator = storyPreviewFrame(page).locator('.rad-ui-progress-indicator').first();
        const seconds = await indicator.evaluate((el) => parseFloat(getComputedStyle(el).animationDuration));
        // 2.7s under reduced motion; without it the loop is 1.08s.
        expect(seconds).toBeGreaterThanOrEqual(2);
    });

    test('a Skeleton stops pulsing', async({ page }) => {
        await gotoManagerStory(page, 'components-skeleton--all');
        const skeleton = storyPreviewFrame(page).locator('.rad-ui-skeleton').first();
        await expect(skeleton).toHaveCSS('animation-name', 'none');
    });
});

test('without the setting, motion tokens keep their durations', async({ page }) => {
    await gotoManagerStory(page, 'components-dialog--default');
    const normal = await storyPreviewFrame(page).locator('html').evaluate((el) => getComputedStyle(el).getPropertyValue('--rad-ui-motion-duration-normal').trim());
    expect(normal).toBe('180ms');
});
