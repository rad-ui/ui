import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Toaster, ToastState, toast } from '../Toast';

// jsdom has no pointer capture.
beforeAll(() => {
    Element.prototype.setPointerCapture ??= () => {};
});

const item = (text: string) => screen.getByText(text).closest<HTMLElement>('[data-toast-id]')!;

const swipe = (el: HTMLElement, dx: number, dy: number) => {
    fireEvent.pointerDown(el, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(el, { clientX: 100 + dx, clientY: 100 + dy, pointerId: 1 });
    fireEvent.pointerUp(el, { clientX: 100 + dx, clientY: 100 + dy, pointerId: 1 });
};

describe('Toast swipe', () => {
    afterEach(() => {
        ToastState.dismissAll();
    });

    test('by default a bottom toast swipes away downward only', async() => {
        render(<Toaster position="bottom-right" />);
        act(() => { toast('Down', { timeout: 60_000 }); });
        const el = await screen.findByText('Down').then(() => item('Down'));
        expect(el).toHaveAttribute('data-swipe-direction', 'down');

        swipe(el, 200, 0);
        expect(el).not.toHaveAttribute('data-leaving');
        expect(el.style.getPropertyValue('--swipe-x')).toBe('0px');

        swipe(el, 0, 80);
        expect(el).toHaveAttribute('data-swipe-out', 'down');
        await waitFor(() => expect(screen.queryByText('Down')).not.toBeInTheDocument());
    });

    test('a toast can set its own swipe directions', async() => {
        render(<Toaster position="bottom-right" />);
        act(() => { toast('Side', { timeout: 60_000, swipeDirection: ['left', 'right'] }); });
        const el = await screen.findByText('Side').then(() => item('Side'));
        expect(el).toHaveAttribute('data-swipe-direction', 'left right');

        // Downward is no longer a dismiss direction.
        swipe(el, 0, 80);
        expect(el).not.toHaveAttribute('data-leaving');

        swipe(el, -80, 0);
        expect(el).toHaveAttribute('data-swipe-out', 'left');
        expect(el.style.getPropertyValue('--swipe-x')).toMatch(/^-/);
        await waitFor(() => expect(screen.queryByText('Side')).not.toBeInTheDocument());
    });

    test('a short, slow drag springs back', async() => {
        render(<Toaster position="top-center" />);
        act(() => { toast('Stay', { timeout: 60_000, swipeDirection: 'right' }); });
        const el = await screen.findByText('Stay').then(() => item('Stay'));
        const now = Date.now();
        const spy = jest.spyOn(Date, 'now');
        spy.mockReturnValue(now);
        fireEvent.pointerDown(el, { clientX: 0, clientY: 0, pointerId: 1 });
        fireEvent.pointerMove(el, { clientX: 10, clientY: 0, pointerId: 1 });
        spy.mockReturnValue(now + 1000);
        fireEvent.pointerUp(el, { clientX: 10, clientY: 0, pointerId: 1 });
        spy.mockRestore();
        expect(el).not.toHaveAttribute('data-leaving');
        expect(el.style.getPropertyValue('--swipe-x')).toBe('0px');
    });

    test('the provider list applies when a toast sets none', async() => {
        render(<Toaster position="bottom-left" swipeDirections={['left']} />);
        act(() => { toast('Provider', { timeout: 60_000 }); });
        const el = await screen.findByText('Provider').then(() => item('Provider'));
        expect(el).toHaveAttribute('data-swipe-direction', 'left');
        swipe(el, -60, 0);
        expect(el).toHaveAttribute('data-swipe-out', 'left');
    });
});
