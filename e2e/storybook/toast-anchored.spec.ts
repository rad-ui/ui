import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// An anchored toast shows next to the button that raised it, outside the stack, then closes on its timer.
test('anchored toast appears beside its button and closes', async({ page }) => {
    await gotoManagerStory(page, 'components-toast--anchored');
    const preview = storyPreviewFrame(page);
    const button = preview.getByRole('button', { name: 'Copy link' });

    await button.click();
    const toast = preview.locator('[data-anchored]', { hasText: 'Copied' });
    await expect(toast).toBeVisible();
    await expect(toast).toHaveAttribute('data-side', 'top');

    const buttonBox = await button.boundingBox();
    const toastBox = await toast.boundingBox();
    expect(buttonBox && toastBox).toBeTruthy();
    // Above the button, about 8px away, centered on it.
    expect(toastBox!.y + toastBox!.height).toBeLessThanOrEqual(buttonBox!.y);
    expect(buttonBox!.y - (toastBox!.y + toastBox!.height)).toBeLessThan(16);
    const center = (box: { x: number; width: number }) => box.x + box.width / 2;
    expect(Math.abs(center(toastBox!) - center(buttonBox!))).toBeLessThan(2);
    await page.screenshot({ path: test.info().outputPath('toast-anchored.png') });

    await expect(toast).toHaveCount(0, { timeout: 4_000 });
});
