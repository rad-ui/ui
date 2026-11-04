import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import ContextMenu from '../ContextMenu';

const Example = () => (
    <ContextMenu.Root>
        <ContextMenu.Trigger>Hold here</ContextMenu.Trigger>
        <ContextMenu.Content>
            <ContextMenu.Item>Copy</ContextMenu.Item>
        </ContextMenu.Content>
    </ContextMenu.Root>
);

// jsdom has no PointerEvent (setupTests aliases MouseEvent), so fireEvent would drop `pointerType`.
if (typeof window.PointerEvent === 'undefined' || (window.PointerEvent as unknown) === MouseEvent) {
    class PointerEventPolyfill extends MouseEvent {
        pointerType: string;
        constructor(type: string, init: PointerEventInit = {}) {
            super(type, init);
            this.pointerType = init.pointerType ?? '';
        }
    }
    (window as unknown as { PointerEvent: unknown }).PointerEvent = PointerEventPolyfill;
}

const touch = { pointerType: 'touch', clientX: 40, clientY: 60 };

describe('ContextMenu long press', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('opens after holding a touch still for 500ms', () => {
        render(<Example />);
        const trigger = screen.getByText('Hold here');
        fireEvent.pointerDown(trigger, touch);
        act(() => { jest.advanceTimersByTime(400); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(150); });
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('stays open when the finger lifts and a click follows', () => {
        render(<Example />);
        const trigger = screen.getByText('Hold here');
        fireEvent.pointerDown(trigger, touch);
        act(() => { jest.advanceTimersByTime(550); });
        fireEvent.pointerUp(trigger, touch);
        fireEvent.click(trigger);
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('lifting early cancels the long press', () => {
        render(<Example />);
        const trigger = screen.getByText('Hold here');
        fireEvent.pointerDown(trigger, touch);
        act(() => { jest.advanceTimersByTime(200); });
        fireEvent.pointerUp(trigger, touch);
        act(() => { jest.advanceTimersByTime(500); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('moving the finger cancels the long press so the page can scroll', () => {
        render(<Example />);
        const trigger = screen.getByText('Hold here');
        fireEvent.pointerDown(trigger, touch);
        fireEvent.pointerMove(trigger, { ...touch, clientY: 90 });
        act(() => { jest.advanceTimersByTime(600); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    test('mouse presses never start a long press', () => {
        render(<Example />);
        const trigger = screen.getByText('Hold here');
        fireEvent.pointerDown(trigger, { ...touch, pointerType: 'mouse' });
        act(() => { jest.advanceTimersByTime(600); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});
