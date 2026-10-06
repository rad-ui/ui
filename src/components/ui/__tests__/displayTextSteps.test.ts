import fs from 'node:fs';
import path from 'node:path';

/**
 * Clarity text-step guard for the display/typography components.
 *
 * Measured against the generated accent scales, only these foreground steps
 * reach WCAG AA (4.5:1) across the palette:
 * - 950 / 1000 on page, panel, and 200-step surfaces;
 * - 50 on a 950 solid fill.
 * The 800 and 900 steps fail for many scales (gray 900 on the page is 3.9:1,
 * sky 800 behind light text is 1.5:1), so they must not be used for text, and
 * a light (50) foreground must sit on the 950 step rather than 800.
 */
const COMPONENTS = [
    'Avatar/_avatar-base.clarity.scss',
    'AvatarGroup/avatar-group.clarity.scss',
    'Badge/badge.clarity.scss',
    'BlockQuote/blockquote.clarity.scss',
    'Button/button.clarity.scss',
    'Callout/callout.clarity.scss',
    'Card/card.clarity.scss',
    'Code/code.clarity.scss',
    'DataList/data-list.clarity.scss',
    'Link/link.clarity.scss',
    'Quote/quote.clarity.scss',
    'Separator/separator.clarity.scss',
    'Table/table.clarity.scss'
];

const read = (file: string) => fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8');

/** Innermost `{ ... }` blocks: the declarations that apply together. */
const declarationBlocks = (source: string) => source.match(/\{[^{}]*\}/g) ?? [];

describe('Clarity text steps (display components)', () => {
    test.each(COMPONENTS)('%s only uses readable accent steps for text', (file) => {
        const textSteps = [...read(file).matchAll(/(?:^|[\s;{])color:\s*var\(--rad-ui-color-accent-(\d+)\)/g)].map(match => match[1]);
        expect(textSteps.filter(step => !['50', '950', '1000'].includes(step))).toEqual([]);
    });

    test.each(COMPONENTS)('%s pairs light (50) text only with a 950 solid fill', (file) => {
        for (const block of declarationBlocks(read(file))) {
            if (!/(?:^|[\s;{])color:\s*var\(--rad-ui-color-accent-50\)/.test(block)) continue;
            expect(block).toMatch(/background-color:\s*var\(--rad-ui-(color-accent-950|button-solid-background)\)/);
        }
    });

    test.each([
        'BlockQuote/blockquote.clarity.scss',
        'Callout/callout.clarity.scss'
    ])('%s soft variants do not use the page-background step', (file) => {
        const source = read(file);
        const softBlocks = source.split(/&\[data-variant="soft"\]/).slice(1).map(chunk => chunk.slice(0, chunk.indexOf('}')));
        for (const block of softBlocks) {
            expect(block).not.toMatch(/background-color:\s*var\(--rad-ui-color-accent-50\)/);
        }
    });
});
