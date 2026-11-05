import { test, expect } from '@playwright/test';

import { gotoManagerStory, storyPreviewFrame } from './utils';

// #2321: the trigger's link look (underline, text colour, font size) stays on its own span;
// a Button passed with asChild keeps the Button's styles.
test('HoverCard.Trigger asChild leaves a Button looking like a Button', async({ page }) => {
    await gotoManagerStory(page, 'components-hovercard--as-child-button');
    const preview = storyPreviewFrame(page);

    const link = preview.locator('span.rad-ui-hover-card-trigger');
    await expect(link).toHaveCSS('text-decoration-line', 'underline');

    const button = preview.getByRole('button', { name: 'Approve' });
    await expect(button).toHaveClass(/rad-ui-hover-card-trigger/);
    await expect(button).not.toHaveCSS('text-decoration-line', 'underline');
    const plain = await button.evaluate((el) => {
        const twin = document.createElement('button');
        twin.className = [...el.classList].filter((c) => !c.includes('hover-card')).join(' ');
        for (const a of el.getAttributeNames()) if (a.startsWith('data-') && a !== 'data-slot') twin.setAttribute(a, el.getAttribute(a)!);
        twin.textContent = el.textContent;
        el.parentElement!.appendChild(twin);
        const [a, b] = [getComputedStyle(el), getComputedStyle(twin)];
        const same = ['color', 'font-size', 'background-color'].every((k) => a.getPropertyValue(k) === b.getPropertyValue(k));
        twin.remove();
        return same;
    });
    expect(plain).toBe(true);
});
