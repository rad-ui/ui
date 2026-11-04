import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// #2290: closing keeps Dialog.Content and Dialog.Overlay mounted with data-state="closed" until the theme's
// closing transition finishes, then removes them.
test('Dialog plays its closing transition before unmounting', async({ page }) => {
    await gotoManagerStory(page, 'components-dialog--default');
    const preview = storyPreviewFrame(page);

    await preview.locator('.rad-ui-dialog-trigger').first().click();
    const content = preview.locator('.rad-ui-dialog-content');
    await expect(content).toHaveAttribute('data-state', 'open');

    await page.keyboard.press('Escape');

    // Still in the DOM, closing.
    await expect(content).toHaveAttribute('data-state', 'closed');
    await expect(preview.locator('.rad-ui-dialog-overlay')).toHaveAttribute('data-state', 'closed');

    // Gone once the transition has run.
    await expect(content).toHaveCount(0, { timeout: 2_000 });
    await expect(preview.locator('.rad-ui-dialog-overlay')).toHaveCount(0);
    await expect(preview.locator('.rad-ui-dialog-trigger').first()).toBeFocused();
});

test('Popover plays its exit animation before unmounting', async({ page }) => {
    await gotoManagerStory(page, 'components-popover--default');
    const preview = storyPreviewFrame(page);
    const trigger = preview.getByRole('button', { name: 'Adjust dimensions' });

    await trigger.click();
    const content = preview.locator('.rad-ui-popover-content');
    await expect(content).toHaveAttribute('data-state', 'open');

    await page.keyboard.press('Escape');

    await expect(content).toHaveAttribute('data-state', 'closed');
    await expect(content).toHaveCount(0, { timeout: 2_000 });
    await expect(trigger).toBeFocused();
});

test('Tooltip fades out before unmounting', async({ page }) => {
    await gotoManagerStory(page, 'components-tooltip--basic');
    const preview = storyPreviewFrame(page);
    const trigger = preview.getByRole('button', { name: 'Hover' });

    await trigger.focus();
    const content = preview.locator('[data-slot="tooltip-content"]');
    await expect(content).toHaveAttribute('data-state', 'open');

    await page.keyboard.press('Escape');
    await expect(content).toHaveAttribute('data-state', 'closed');
    await expect(content).toHaveCount(0, { timeout: 2_000 });
});
