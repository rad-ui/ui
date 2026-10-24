import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../Slider';

// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

const renderSlider = (props: Partial<React.ComponentProps<typeof Slider.Root>>, thumbs = 1) => render(
    <Slider.Root data-testid="root" {...props}>
        <Slider.Track>
            <Slider.Range data-testid="range" />
        </Slider.Track>
        {Array.from({ length: thumbs }, (_, index) => <Slider.Thumb key={index} index={index} data-testid={`thumb-${index}`} />)}
    </Slider.Root>
);

describe('Slider thumbAlignment', () => {
    test('center (default) keeps the old positioning', () => {
        renderSlider({ defaultValue: 100 });
        expect(screen.getByTestId('thumb-0').style.left).toBe('calc(100% - 10px)');
        expect(screen.getByTestId('range').style.width).toBe('100%');
    });

    test('edge keeps the thumb inside the track at both ends', () => {
        const { unmount } = renderSlider({ defaultValue: 100, thumbAlignment: 'edge' });
        expect(screen.getByTestId('thumb-0').style.left).toBe('calc(100% - var(--rad-slider-thumb-size, 20px) * 1)');
        unmount();
        renderSlider({ defaultValue: 0, thumbAlignment: 'edge' });
        expect(screen.getByTestId('thumb-0').style.left).toBe('calc(0% - var(--rad-slider-thumb-size, 20px) * 0)');
    });

    test('edge: the fill ends at the thumb centre', () => {
        renderSlider({ defaultValue: 25, thumbAlignment: 'edge' });
        const range = screen.getByTestId('range');
        expect(range.style.marginLeft).toBe('0%');
        expect(range.style.width).toBe('calc(calc(25% + var(--rad-slider-thumb-size, 20px) * 0.25) - 0%)');
    });

    test('edge: a two-thumb fill runs between the thumb centres', () => {
        renderSlider({ defaultValue: [20, 80], thumbAlignment: 'edge' }, 2);
        const range = screen.getByTestId('range');
        expect(range.style.marginLeft).toBe('calc(20% + var(--rad-slider-thumb-size, 20px) * 0.3)');
    });

    test('edge: pointer maps across the inset track', () => {
        const onValueChange = jest.fn();
        renderSlider({ defaultValue: 50, thumbAlignment: 'edge', onValueChange });
        const root = screen.getByTestId('root');
        root.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0, width: 120, height: 10, right: 120, bottom: 10, x: 0, y: 0, toJSON: () => {} }));
        Object.defineProperty(screen.getByTestId('thumb-0'), 'offsetWidth', { configurable: true, value: 20 });
        // 10px is the first possible thumb centre: the minimum.
        fireEvent.pointerDown(root, { clientX: 10, button: 0 });
        fireEvent.pointerUp(document);
        expect(onValueChange).toHaveBeenLastCalledWith(0);
        fireEvent.pointerDown(root, { clientX: 60, button: 0 });
        fireEvent.pointerUp(document);
        expect(onValueChange).toHaveBeenLastCalledWith(50);
        fireEvent.pointerDown(root, { clientX: 110, button: 0 });
        fireEvent.pointerUp(document);
        expect(onValueChange).toHaveBeenLastCalledWith(100);
    });
});
