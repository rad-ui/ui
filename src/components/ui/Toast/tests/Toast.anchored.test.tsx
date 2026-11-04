import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Toaster, ToastState, toast } from '../Toast';

const rect = (x: number, y: number, width: number, height: number) => ({
    x, y, left: x, top: y, width, height, right: x + width, bottom: y + height, toJSON: () => ({})
}) as DOMRect;

const settle = () => act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });

describe('Anchored toasts', () => {
    afterEach(() => {
        act(() => ToastState.dismissAll());
    });

    test('show beside the anchor instead of in the stack', async() => {
        render(<><button>Copy</button><Toaster /></>);
        const button = screen.getByText('Copy');
        button.getBoundingClientRect = () => rect(200, 100, 60, 30);
        act(() => { toast('Copied', { anchor: button, side: 'top', sideOffset: 10, timeout: 60_000 }); });
        act(() => { toast('Saved', { timeout: 60_000 }); });
        await settle();

        const copied = screen.getByText('Copied').closest<HTMLElement>('[data-toast-id]')!;
        expect(copied).toHaveAttribute('data-anchored');
        expect(copied).toHaveAttribute('role', 'status');
        expect(copied).toHaveAttribute('data-side', 'top');
        expect(copied.style.position).toBe('fixed');
        // 100px anchor top - 10px sideOffset (jsdom gives the toast no height).
        expect(copied.style.top).toBe('90px');

        // The stacked toast is alone in the stack, so it is the front toast.
        const saved = screen.getByText('Saved').closest<HTMLElement>('[data-toast-id]')!;
        expect(saved).toHaveAttribute('data-front');
        expect(screen.getByRole('region', { name: 'Notifications' })).not.toContainElement(copied);
    });

    test('close on their timer and on Escape', async() => {
        jest.useFakeTimers();
        try {
            render(<><button>Copy</button><Toaster /></>);
            const button = screen.getByText('Copy');
            act(() => { toast('Copied', { anchor: button, timeout: 1000 }); });
            act(() => { jest.advanceTimersByTime(0); });
            expect(screen.getByText('Copied')).toBeInTheDocument();
            act(() => { jest.advanceTimersByTime(1100); });
            await act(async() => { jest.runOnlyPendingTimers(); });
            expect(screen.queryByText('Copied')).not.toBeInTheDocument();

            act(() => { toast('Again', { anchor: button, timeout: 60_000 }); });
            act(() => { jest.advanceTimersByTime(0); });
            fireEvent.keyDown(screen.getByText('Again'), { key: 'Escape' });
            await act(async() => { jest.runOnlyPendingTimers(); });
            expect(screen.queryByText('Again')).not.toBeInTheDocument();
        } finally {
            jest.useRealTimers();
        }
    });

    test('close(id) and onClose work as for stacked toasts', async() => {
        const onClose = jest.fn();
        render(<><button>Copy</button><Toaster /></>);
        let id = '';
        act(() => { id = toast('Copied', { anchor: screen.getByText('Copy'), timeout: 60_000, onClose }); });
        await settle();
        act(() => ToastState.dismiss(id));
        await waitFor(() => expect(screen.queryByText('Copied')).not.toBeInTheDocument());
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
