import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Tooltip from '../Tooltip';

const rect = (left: number, top: number, width: number, height: number) => ({
    left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON: () => {}
}) as DOMRect;

describe('Tooltip trackCursorAxis', () => {
    let spy: jest.SpyInstance;
    beforeAll(() => {
        Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
        Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });
    });
    afterAll(() => {
        delete (document.documentElement as any).clientHeight;
        delete (document.documentElement as any).clientWidth;
    });
    beforeEach(() => {
        // The trigger spans 100–500px across, 400–440px down.
        spy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function(this: Element) {
            if (this.textContent === 'Chart' && this.tagName === 'BUTTON') return rect(100, 400, 400, 40);
            return rect(0, 0, 0, 0);
        });
    });
    afterEach(() => { spy.mockRestore(); });

    const renderTooltip = (axis?: 'none' | 'x' | 'y' | 'both') => render(
        <Tooltip.Root trackCursorAxis={axis}>
            <Tooltip.Trigger>Chart</Tooltip.Trigger>
            <Tooltip.Content data-testid="tip" showArrow={false}>Value</Tooltip.Content>
        </Tooltip.Root>
    );

    const translate = () => {
        const match = /translate\((-?[\d.]+)px, (-?[\d.]+)px\)/.exec(screen.getByTestId('tip').style.transform);
        return match ? [Number(match[1]), Number(match[2])] : null;
    };

    test('x: follows the pointer across, stays above the trigger', async() => {
        renderTooltip('x');
        const trigger = screen.getByText('Chart');
        fireEvent.mouseEnter(trigger, { clientX: 250, clientY: 420 });
        fireEvent.mouseMove(trigger, { clientX: 250, clientY: 420 });
        await waitFor(() => expect(translate()?.[0]).toBe(250));
        expect(translate()?.[1]).toBe(395); // 400 - 5px offset
        fireEvent.mouseMove(trigger, { clientX: 320, clientY: 430 });
        await waitFor(() => expect(translate()?.[0]).toBe(320));
        expect(translate()?.[1]).toBe(395);
    });

    test('both: sits just above the pointer', async() => {
        renderTooltip('both');
        const trigger = screen.getByText('Chart');
        fireEvent.mouseEnter(trigger, { clientX: 200, clientY: 420 });
        fireEvent.mouseMove(trigger, { clientX: 200, clientY: 420 });
        await waitFor(() => expect(translate()).toEqual([200, 415]));
    });

    test('none (default): anchors to the trigger centre', async() => {
        renderTooltip();
        const trigger = screen.getByText('Chart');
        fireEvent.mouseEnter(trigger, { clientX: 150, clientY: 420 });
        fireEvent.mouseMove(trigger, { clientX: 150, clientY: 420 });
        await waitFor(() => expect(translate()).toEqual([300, 395]));
    });

    test('tracking closes when the pointer leaves the trigger', async() => {
        renderTooltip('x');
        const trigger = screen.getByText('Chart');
        fireEvent.mouseEnter(trigger, { clientX: 150, clientY: 420 });
        expect(screen.getByText('Value')).toBeInTheDocument();
        act(() => { fireEvent.mouseLeave(trigger, { clientX: 150, clientY: 460 }); });
        await waitFor(() => expect(screen.queryByText('Value')).not.toBeInTheDocument());
    });
});
