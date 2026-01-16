import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../Slider';

// Polyfill PointerEvent for jsdom
// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

describe('Slider Range Support', () => {
    it('renders two thumbs when value is an array', () => {
        render(
            <Slider.Root defaultValue={[20, 80]}>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0} data-testid="thumb-0" />
                <Slider.Thumb index={1} data-testid="thumb-1" />
            </Slider.Root>
        );

        const thumb0 = screen.getByTestId('thumb-0');
        const thumb1 = screen.getByTestId('thumb-1');

        expect(thumb0).toHaveAttribute('aria-valuenow', '20');
        expect(thumb1).toHaveAttribute('aria-valuenow', '80');
    });

    it('updates the nearest thumb on track click', () => {
        const onValueChange = jest.fn();
        const { getByTestId } = render(
            <Slider.Root defaultValue={[20, 80]} onValueChange={onValueChange} data-testid="slider-root">
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumb index={0} data-testid="thumb-0" />
                <Slider.Thumb index={1} data-testid="thumb-1" />
            </Slider.Root>
        );

        const root = getByTestId('slider-root');
        root.getBoundingClientRect = jest.fn(() => ({
            left: 0,
            top: 0,
            width: 100,
            height: 10,
            bottom: 10,
            right: 100,
            x: 0,
            y: 0,
            toJSON: () => {}
        } as DOMRect));

        // Click near 10
        fireEvent.pointerDown(root, { clientX: 10 });
        expect(onValueChange).toHaveBeenCalledWith([10, 80]);

        // Click near 90 (closer to 80 than 10)
        fireEvent.pointerDown(root, { clientX: 90 });
        expect(onValueChange).toHaveBeenCalledWith([10, 90]);
    });

    it('renders range between two thumbs', () => {
        const { container } = render(
            <Slider.Root defaultValue={[25, 75]}>
                <Slider.Track>
                    <Slider.Range data-testid="range" />
                </Slider.Track>
                <Slider.Thumb index={0} />
                <Slider.Thumb index={1} />
            </Slider.Root>
        );

        const range = screen.getByTestId('range');
        expect(range.style.left).toBe('25%');
        expect(range.style.width).toBe('50%');
    });
});
