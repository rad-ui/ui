import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// #2322 and #2323: a Select and a dialog used from inside a drawer stack on top of it, instead of
// being hidden and inert behind it.
test('a Select inside a drawer can be picked with the mouse', async({ page }) => {
    await gotoManagerStory(page, 'components-drawer--with-select-and-dialog');
    const preview = storyPreviewFrame(page);
    await preview.getByRole('button', { name: 'Team settings' }).click();
    await preview.getByRole('combobox', { name: 'Plan' }).click();
    const pro = preview.getByRole('option', { name: 'Pro' });
    await expect(pro).toBeVisible();
    await pro.click();
    await expect(preview.getByTestId('drawer-status')).toContainText('Plan: pro');
});

test('a dialog opened from a drawer is readable, clickable, and leaves the drawer open', async({ page }) => {
    await gotoManagerStory(page, 'components-drawer--with-select-and-dialog');
    const preview = storyPreviewFrame(page);
    await preview.getByRole('button', { name: 'Team settings' }).click();
    const opener = preview.getByRole('button', { name: 'Pause posting' });
    await opener.click();
    const dialog = preview.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    await expect(preview.locator('[aria-hidden="true"]').filter({ has: dialog })).toHaveCount(0);

    await preview.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).toHaveCount(0);
    await expect(preview.getByTestId('drawer-status')).toBeVisible();
    await expect(opener).toBeFocused();

    await opener.click();
    await preview.getByRole('button', { name: 'Pause', exact: true }).click();
    await expect(preview.getByTestId('drawer-status')).toContainText('Posting paused');
});
