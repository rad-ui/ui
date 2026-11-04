import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Slider from '../Slider';

// @ts-ignore
if (typeof window !== 'undefined' && !window.PointerEvent) window.PointerEvent = MouseEvent;

const RtlSlider = (props: Partial<React.ComponentProps<typeof Slider.Root>>) => (
    <Slider.Root defaultValue={30} style={{ direction: 'rtl' }} data-testid="root" {...props}>
        <Slider.Track>
            <Slider.Range data-testid="range" />
        </Slider.Track>
        <Slider.Thumb data-testid="thumb" />
    </Slider.Root>
);

describe('Slider right-to-left layout', () => {
    test('thumb and range mirror so they line up from the right edge', () => {
        render(<RtlSlider />);
        expect(screen.getByTestId('thumb').style.left).toBe('calc(70% - 10px)');
        expect(screen.getByTestId('range').style.marginLeft).toBe('70%');
        expect(screen.getByTestId('range').style.width).toBe('30%');
    });

    test('a range of two thumbs fills between them, mirrored', () => {
        render(
            <Slider.Root defaultValue={[20, 60]} style={{ direction: 'rtl' }}>
                <Slider.Track>
                    <Slider.Range data-testid="range" />
                </Slider.Track>
                <Slider.Thumb index={0} data-testid="thumb-0" />
                <Slider.Thumb index={1} data-testid="thumb-1" />
            </Slider.Root>
        );
        expect(screen.getByTestId('range').style.marginLeft).toBe('40%');
        expect(screen.getByTestId('range').style.width).toBe('40%');
        expect(screen.getByTestId('thumb-0').style.left).toBe('calc(80% - 10px)');
    });

    test('pointer position is measured from the right edge', () => {
        const onValueChange = jest.fn();
        render(<RtlSlider onValueChange={onValueChange} />);
        const root = screen.getByTestId('root');
        root.getBoundingClientRect = jest.fn(() => ({ left: 0, top: 0, width: 100, height: 10, bottom: 10, right: 100, x: 0, y: 0, toJSON: () => {} }));
        fireEvent.pointerDown(root, { clientX: 10, button: 0 });
        fireEvent.pointerUp(document);
        expect(onValueChange).toHaveBeenLastCalledWith(90);
    });

    test('ArrowLeft increases the value, moving the thumb left', () => {
        render(<RtlSlider />);
        const thumb = screen.getByTestId('thumb');
        fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
        expect(thumb).toHaveAttribute('aria-valuenow', '31');
        expect(thumb.style.left).toBe('calc(69% - 10px)');
    });

    test('marks mirror too', () => {
        render(
            <Slider.Root defaultValue={0} step={50} showStepMarks style={{ direction: 'rtl' }}>
                <Slider.Track><Slider.Range /></Slider.Track>
                <Slider.Marks />
                <Slider.Thumb />
            </Slider.Root>
        );
        expect(screen.getByTestId('mark-0').style.left).toBe('100%');
        expect(screen.getByTestId('mark-100').style.left).toBe('0%');
    });
});

test('right-to-left with edge alignment mirrors first, then insets', () => {
    render(
        <Slider.Root defaultValue={25} thumbAlignment="edge" style={{ direction: 'rtl' }}>
            <Slider.Track>
                <Slider.Range data-testid="edge-range" />
            </Slider.Track>
            <Slider.Thumb data-testid="edge-thumb" />
        </Slider.Root>
    );
    expect(screen.getByTestId('edge-thumb').style.left).toBe('calc(75% - var(--rad-slider-thumb-size, 20px) * 0.75)');
    expect(screen.getByTestId('edge-range').style.marginLeft).toBe('calc(75% + var(--rad-slider-thumb-size, 20px) * -0.25)');
});
