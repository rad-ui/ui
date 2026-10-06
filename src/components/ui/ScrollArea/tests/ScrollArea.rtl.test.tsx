import React from 'react';
import { render } from '@testing-library/react';
import ScrollArea from '../ScrollArea';
import { clampScrollLeft, getHorizontalScrollRange } from '../utils/track';

// jsdom has no layout (and doesn't inherit `direction` in computed style),
// so the scroll math is tested directly; ancestor `dir` is verified in a browser. Browsers report
// RTL scrollLeft from 0 at the inline start (right edge) down to -extent.
const viewport = (dir: 'ltr' | 'rtl', scrollWidth = 500, clientWidth = 200) => {
    const el = document.createElement('div');
    el.style.direction = dir;
    Object.defineProperty(el, 'scrollWidth', { value: scrollWidth });
    Object.defineProperty(el, 'clientWidth', { value: clientWidth });
    document.body.appendChild(el);
    return el;
};

describe('ScrollArea horizontal scrolling in RTL', () => {
    afterEach(() => { document.body.innerHTML = ''; });

    test('LTR range is 0 to extent', () => {
        expect(getHorizontalScrollRange(viewport('ltr'))).toEqual({ min: 0, max: 300, rtl: false });
    });

    test('RTL range is -extent to 0', () => {
        expect(getHorizontalScrollRange(viewport('rtl'))).toEqual({ min: -300, max: 0, rtl: true });
    });

    test('clamping keeps RTL scroll positions negative instead of pinning them to 0', () => {
        const el = viewport('rtl');
        expect(clampScrollLeft(el, -120)).toBe(-120);
        expect(clampScrollLeft(el, -999)).toBe(-300);
        expect(clampScrollLeft(el, 50)).toBe(0);
    });

    // The horizontal thumb gets a physical `left` offset. In an RTL flex track
    // it would start at the right edge and the offset would push it off the track.
    test('the horizontal track always lays out left-to-right; the vertical one inherits', () => {
        const { container } = render(
            <div dir="rtl">
                <ScrollArea.Root type="always">
                    <ScrollArea.Viewport><div style={{ width: 900 }}>content</div></ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                    <ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        );
        const horizontal = container.querySelector('[data-orientation="horizontal"]:not(.rad-ui-scroll-area-thumb)') as HTMLElement;
        const vertical = container.querySelector('[data-orientation="vertical"]:not(.rad-ui-scroll-area-thumb)') as HTMLElement;
        expect(horizontal.style.direction).toBe('ltr');
        expect(vertical.style.direction).toBe('');
    });
});
