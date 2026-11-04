import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../Slider';
import { getThumbBounds } from '../utils/sliderMath';

// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

const Range = (props: Partial<React.ComponentProps<typeof Slider.Root>>) => (
    <Slider.Root defaultValue={[40, 60]} step={5} minStepsBetweenValues={2} data-testid="root" {...props}>
        <Slider.Track>
            <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} data-testid="thumb-0" />
        <Slider.Thumb index={1} data-testid="thumb-1" />
    </Slider.Root>
);

describe('Slider minStepsBetweenValues', () => {
    test('keyboard stops a thumb that many steps short of its neighbour', () => {
        render(<Range />);
        const lower = screen.getByTestId('thumb-0');
        fireEvent.keyDown(lower, { key: 'ArrowRight' });
        fireEvent.keyDown(lower, { key: 'ArrowRight' });
        expect(lower).toHaveAttribute('aria-valuenow', '50');
        fireEvent.keyDown(lower, { key: 'ArrowRight' });
        expect(lower).toHaveAttribute('aria-valuenow', '50');

        const upper = screen.getByTestId('thumb-1');
        fireEvent.keyDown(upper, { key: 'Home' });
        expect(upper).toHaveAttribute('aria-valuenow', '60');
    });

    test('dragging keeps the gap', () => {
        const onValueChange = jest.fn();
        render(<Range onValueChange={onValueChange} />);
        const root = screen.getByTestId('root');
        root.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0, width: 100, height: 10, bottom: 10, right: 100, x: 0, y: 0, toJSON: () => {} }));
        fireEvent.pointerDown(screen.getByTestId('thumb-0'), { clientX: 40, button: 0 });
        fireEvent.pointerMove(document, { clientX: 95 });
        fireEvent.pointerUp(document);
        expect(onValueChange).toHaveBeenLastCalledWith([50, 60]);
    });

    test('defaults to letting thumbs meet', () => {
        render(<Range minStepsBetweenValues={undefined} />);
        const lower = screen.getByTestId('thumb-0');
        fireEvent.keyDown(lower, { key: 'End' });
        expect(lower).toHaveAttribute('aria-valuenow', '60');
    });

    test('bounds never pull a thumb that already sits inside the gap', () => {
        expect(getThumbBounds([50, 52], 0, 0, 100, 10)).toEqual({ lower: 0, upper: 50 });
        expect(getThumbBounds([50, 52], 1, 0, 100, 10)).toEqual({ lower: 52, upper: 100 });
    });
});

test('the Slider shorthand forwards minStepsBetweenValues', () => {
    render(<Slider defaultValue={[40, 60]} step={5} minStepsBetweenValues={2} aria-label="Range" />);
    const [lower] = screen.getAllByRole('slider');
    fireEvent.keyDown(lower, { key: 'End' });
    expect(lower).toHaveAttribute('aria-valuenow', '50');
});
