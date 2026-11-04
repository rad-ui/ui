import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import ScrollArea from '../ScrollArea/ScrollArea';
import Avatar from '../Avatar/Avatar';
import Slider from '../Slider/Slider';

describe('activity attributes', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('ScrollArea marks scrolling and hovering on the root and scrollbars', () => {
        const { container } = render(
            <ScrollArea.Root type="always" data-testid="area">
                <ScrollArea.Viewport data-testid="viewport">Long</ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
            </ScrollArea.Root>
        );
        const root = screen.getByTestId('area');
        const scrollbar = container.querySelector<HTMLElement>('[data-orientation="vertical"]')!;

        fireEvent.scroll(screen.getByTestId('viewport'));
        expect(root).toHaveAttribute('data-scrolling');
        expect(scrollbar).toHaveAttribute('data-scrolling');
        act(() => { jest.advanceTimersByTime(200); });
        expect(root).not.toHaveAttribute('data-scrolling');

        fireEvent.pointerEnter(root);
        expect(root).toHaveAttribute('data-hovering');
        expect(scrollbar).toHaveAttribute('data-hovering');
        fireEvent.pointerLeave(root);
        expect(root).not.toHaveAttribute('data-hovering');
    });

    test('Avatar root shows the image status', () => {
        const { container } = render(<Avatar.Root><Avatar.Image src="/missing.png" alt="A" /><Avatar.Fallback>A</Avatar.Fallback></Avatar.Root>);
        const root = container.firstElementChild as HTMLElement;
        expect(root).toHaveAttribute('data-loading');
        fireEvent.error(container.querySelector('img')!);
        expect(root).toHaveAttribute('data-error');
        expect(root).not.toHaveAttribute('data-loading');
    });

    test('Slider root is marked while a thumb is dragged', () => {
        const { container } = render(
            <Slider.Root defaultValue={20} aria-label="Volume">
                <Slider.Track><Slider.Range><Slider.Thumb aria-label="Volume" /></Slider.Range></Slider.Track>
            </Slider.Root>
        );
        const root = container.querySelector<HTMLElement>('[data-orientation]')!;
        expect(root).not.toHaveAttribute('data-dragging');
        fireEvent.pointerDown(screen.getByRole('slider'), { clientX: 10, pointerId: 1, button: 0 });
        expect(root).toHaveAttribute('data-dragging');
    });
});
