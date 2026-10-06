import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Popover from '../Popover';

const rect = (top: number, left: number, width: number, height: number) => ({
    top, left, width, height, x: left, y: top, right: left + width, bottom: top + height, toJSON: () => ({})
}) as DOMRect;

describe('Popover resolved placement', () => {
    test('data-side reflects the flipped side when there is no room on the requested side', async() => {
        const original = HTMLElement.prototype.getBoundingClientRect;
        HTMLElement.prototype.getBoundingClientRect = function() {
            if (this.getAttribute('data-testid') === 'trigger') return rect(window.innerHeight - 30, 100, 80, 24);
            if (this.getAttribute('data-testid') === 'content') return rect(0, 0, 200, 150);
            return original.call(this);
        };
        Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, get() { return this.getAttribute('data-testid') === 'content' ? 200 : 0; } });
        Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, get() { return this.getAttribute('data-testid') === 'content' ? 150 : 0; } });

        try {
            render(
                <Popover.Root defaultOpen>
                    <Popover.Trigger data-testid="trigger">Open</Popover.Trigger>
                    <Popover.Content data-testid="content" side="bottom">Body</Popover.Content>
                </Popover.Root>
            );

            const content = await screen.findByTestId('content');
            await waitFor(() => expect(content).toHaveAttribute('data-side', 'top'));
            expect(content).toHaveAttribute('data-align', 'center');
        } finally {
            HTMLElement.prototype.getBoundingClientRect = original;
            delete (HTMLElement.prototype as any).offsetWidth;
            delete (HTMLElement.prototype as any).offsetHeight;
        }
    });

    test('data-side/data-align reflect requested placement when it fits', async() => {
        render(
            <Popover.Root defaultOpen>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content data-testid="content" side="right" align="start" avoidCollisions={false}>Body</Popover.Content>
            </Popover.Root>
        );
        const content = await screen.findByTestId('content');
        await waitFor(() => expect(content).toHaveAttribute('data-side', 'right'));
        expect(content).toHaveAttribute('data-align', 'start');
    });
});
