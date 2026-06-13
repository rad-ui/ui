import { expect, type Page } from '@playwright/test';

/**
 * Open the **manager** with a story path (static build does not initialize the preview when
 * `iframe.html` is loaded in isolation).
 *
 * Use the site root — `serve` (and the static manager) redirect `/index.html?…` → `/` and **drop the query**,
 * so the preview iframe stays at `id=*` and shows “No Preview”.
 */
export function managerStoryUrl(storyId: string): string {
    return `/?path=/story/${encodeURIComponent(storyId)}`;
}

/**
 * Story canvas inside the manager (not addon iframes).
 * @see https://storybook.js.org/docs/configure/integration#preview-iframe
 */
export function storyPreviewFrame(page: Page) {
    return page.frameLocator('#storybook-preview-iframe');
}

/**
 * Navigate to a story and wait until the preview iframe leaves the static “No Preview” shell.
 * Retries once. Prefers `frameLocator` + expectations over `iframe.contentDocument` (often null / flaky in CI).
 */
export async function gotoManagerStory(page: Page, storyId: string): Promise<void> {
    const url = managerStoryUrl(storyId);
    const preview = storyPreviewFrame(page);

    for (let attempt = 0; attempt < 2; attempt++) {
        await page.goto(url, { waitUntil: 'load', timeout: 120_000 });
        await page.locator('#storybook-preview-iframe').waitFor({ state: 'attached' });
        try {
            await expect(preview.getByRole('heading', { name: 'No Preview' })).toHaveCount(0, { timeout: 60_000 });
            return;
        } catch {
            if (attempt === 1) {
                throw new Error(`Storybook preview stayed on "No Preview" for ${storyId}`);
            }
        }
    }
}

/**
 * Wait until the preview iframe document contains exactly `minCount` matches for `selector`.
 */
export async function waitForPreviewDom(
    page: Page,
    selector: string,
    minCount = 1,
    timeout = 120_000
): Promise<void> {
    const preview = storyPreviewFrame(page);
    await expect(preview.locator(selector)).toHaveCount(minCount, { timeout });
}
