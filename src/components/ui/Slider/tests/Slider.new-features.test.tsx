import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Slider from '../Slider';

// Polyfill PointerEvent for jsdom
// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

describe('Slider new features', () => {
    test('vertical orientation works correctly', async() => {
        const user = userEvent.setup();
        render(
            <Slider.Root defaultValue={50} orientation="vertical" min={0} max={100}>
                <Slider.Track style={{ height: '200px' }}>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        expect(thumb).toHaveAttribute('aria-orientation', 'vertical');
        expect(thumb).toHaveAttribute('aria-valuenow', '50');

        // Test keyboard navigation in vertical mode
        thumb.focus();
        await user.keyboard('{ArrowUp}');
        expect(thumb).toHaveAttribute('aria-valuenow', '51');
        await user.keyboard('{ArrowDown}');
        expect(thumb).toHaveAttribute('aria-valuenow', '50');
    });

    test('step handling in pointer interactions', () => {
        render(
            <Slider.Root defaultValue={0} min={0} max={100} step={10} data-testid="root">
                <Slider.Track style={{ width: '100px' }}>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        const root = screen.getByTestId('root');
        root.getBoundingClientRect = () => ({ left: 0, width: 100, top: 0, height: 10, right: 100, bottom: 10, x: 0, y: 0, toJSON: () => {} });

        // Click at 25% should snap to nearest step (30)
        fireEvent.pointerDown(root, { clientX: 25 });
        expect(thumb).toHaveAttribute('aria-valuenow', '30');

        // Click at 35% should snap to nearest step (40)
        fireEvent.pointerDown(root, { clientX: 35 });
        expect(thumb).toHaveAttribute('aria-valuenow', '40');
    });

    test('Page Up/Down keyboard navigation', async() => {
        const user = userEvent.setup();
        render(
            <Slider.Root defaultValue={50} step={5} pageStepMultiplier={4} min={0} max={100}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        thumb.focus();

        // Page Up should increase by step * pageStepMultiplier (5 * 4 = 20)
        await user.keyboard('{PageUp}');
        expect(thumb).toHaveAttribute('aria-valuenow', '70');

        // Page Down should decrease by step * pageStepMultiplier
        await user.keyboard('{PageDown}');
        expect(thumb).toHaveAttribute('aria-valuenow', '50');
    });

    test('ARIA labels are properly applied', () => {
        render(
            <Slider.Root defaultValue={30} min={0} max={100}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb aria-label="Volume control" />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        expect(thumb).toHaveAttribute('aria-label', 'Volume control');
        expect(thumb).toHaveAttribute('aria-orientation', 'horizontal');
    });

    test('disabled state has proper attributes', () => {
        render(
            <Slider.Root defaultValue={50} disabled={true} data-testid="root">
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        const root = screen.getByTestId('root');

        expect(thumb).toHaveAttribute('tabindex', '-1');
        expect(thumb).toHaveAttribute('data-disabled', 'true');
        expect(root).toHaveAttribute('data-disabled', 'true');
    });

    test('step marks component renders when enabled', () => {
        render(
            <Slider.Root defaultValue={50} min={0} max={100} step={25} showStepMarks={true}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                    <Slider.Marks />
                </Slider.Track>
            </Slider.Root>
        );

        // Should have step marks at 0, 25, 50, 75, 100
        expect(screen.getByTestId('mark-0')).toBeInTheDocument();
        expect(screen.getByTestId('mark-25')).toBeInTheDocument();
        expect(screen.getByTestId('mark-50')).toBeInTheDocument();
        expect(screen.getByTestId('mark-75')).toBeInTheDocument();
        expect(screen.getByTestId('mark-100')).toBeInTheDocument();
    });

    test('step marks component does not render when disabled', () => {
        render(
            <Slider.Root defaultValue={50} min={0} max={100} step={25} showStepMarks={false}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                    <Slider.Marks />
                </Slider.Track>
            </Slider.Root>
        );

        // Should not have any step marks
        expect(screen.queryByTestId('mark-0')).not.toBeInTheDocument();
        expect(screen.queryByTestId('mark-25')).not.toBeInTheDocument();
    });

    test('division by zero protection', () => {
        render(
            <Slider.Root defaultValue={0} min={0} max={0}>
                <Slider.Track>
                    <Slider.Range>
                        <Slider.Thumb />
                    </Slider.Range>
                </Slider.Track>
            </Slider.Root>
        );
        const thumb = screen.getByRole('slider');
        expect(thumb).toHaveAttribute('aria-valuenow', '0');
        // Should not crash and should render properly
        expect(thumb).toBeInTheDocument();
    });
});
