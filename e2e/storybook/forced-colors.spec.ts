import { test, expect, type Locator } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// #1806: in forced-colours mode (Windows High Contrast) the browser drops box-shadows and replaces
// author colours, so the theme's focus rings and state fills need system-colour fallbacks.

const bg = (locator: Locator) => locator.evaluate((el) => getComputedStyle(el).backgroundColor);
const canvas = (locator: Locator) => locator.evaluate((el) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = 'Canvas';
    el.ownerDocument.body.appendChild(probe);
    const value = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return value;
});

test.describe('forced-colors: active', () => {
    test.beforeEach(async({ page }) => {
        await page.emulateMedia({ forcedColors: 'active' });
    });

    test('keyboard focus shows an outline', async({ page }) => {
        await gotoManagerStory(page, 'components-dialog--default');
        const preview = storyPreviewFrame(page);
        await expect(preview.locator('.rad-ui-dialog-trigger').first()).toBeVisible();
        const trigger = preview.locator('.rad-ui-dialog-trigger').first();
        // Focus by keyboard so :focus-visible applies: focus the element before it, then Tab.
        await trigger.evaluate((el) => {
            const before = document.createElement('button');
            before.textContent = 'before';
            el.before(before);
            before.focus();
        });
        await page.keyboard.press('Tab');
        await expect(trigger).toBeFocused();
        await expect(trigger).toHaveCSS('outline-style', 'solid');
    });

    test('a checked Switch keeps a visible thumb and track', async({ page }) => {
        await gotoManagerStory(page, 'components-switch--checked');
        const preview = storyPreviewFrame(page);
        const track = preview.locator('.rad-ui-switch[data-state="checked"]').first();
        const thumb = track.locator('.rad-ui-switch-indicator');
        const page_ = await canvas(track);
        expect(await bg(track)).not.toBe(page_);
        expect(await bg(thumb)).not.toBe(await bg(track));
    });

    test('a Slider keeps its range and thumb', async({ page }) => {
        await gotoManagerStory(page, 'components-slider--basic');
        const preview = storyPreviewFrame(page);
        const range = preview.locator('.rad-ui-slider-range').first();
        const thumb = preview.locator('.rad-ui-slider-thumb').first();
        const page_ = await canvas(range);
        expect(await bg(range)).not.toBe(page_);
        expect(await bg(thumb)).not.toBe(page_);
    });
});
