import { test, expect, request } from '@playwright/test';

import { gotoManagerStory, managerStoryUrl, storyPreviewFrame } from './utils';

type StoryIndexV5 = {
    v: number;
    entries: Record<string, { type?: string; id: string; title?: string; name?: string }>;
};

function storyIdsFromIndex(parsed: StoryIndexV5): string[] {
    return Object.entries(parsed.entries)
        .filter(([, e]) => e.type === 'story')
        .map(([, e]) => e.id);
}

test.describe('Storybook static smoke', () => {
    test('index.json lists stories', async({ baseURL }) => {
        const ctx = await request.newContext({ baseURL });
        const res = await ctx.get('/index.json');
        expect(res.ok()).toBeTruthy();
        const data = (await res.json()) as StoryIndexV5;
        expect(data.v).toBeGreaterThanOrEqual(4);
        const ids = storyIdsFromIndex(data);
        expect(ids.length).toBeGreaterThan(10);
        await ctx.dispose();
    });

    const spotIds = [
        'components-accordion--all',
        'primitives-collapsible--default',
        'utils-rovingfocusgroup--vertical'
    ];

    for (const id of spotIds) {
        test(`spot-check iframe: ${id}`, async({ page }) => {
            const fatal: string[] = [];
            page.on('pageerror', (err) => fatal.push(err.message));
            await gotoManagerStory(page, id);
            await expect.poll(() => fatal.length, { timeout: 10_000 }).toBe(0);
            const preview = storyPreviewFrame(page);
            await preview.locator('body').waitFor({ state: 'attached' });
        });
    }

    test('all story iframes load without uncaught page errors', async({ page, baseURL }) => {
        test.setTimeout(900_000);

        const ctx = await request.newContext({ baseURL });
        const res = await ctx.get('/index.json');
        expect(res.ok()).toBeTruthy();
        const data = (await res.json()) as StoryIndexV5;
        const allIds = storyIdsFromIndex(data);
        await ctx.dispose();

        const fatal: string[] = [];
        page.on('pageerror', (err) => fatal.push(`${err.message} @ ${page.url()}`));

        for (const storyId of allIds) {
            await page.goto(managerStoryUrl(storyId), {
                waitUntil: 'load',
                timeout: 120_000
            });
        }

        expect(fatal, fatal.join('\n')).toEqual([]);
    });
});
