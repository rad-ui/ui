import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Popover from '../Popover';

const Example = (props: Partial<React.ComponentProps<typeof Popover.Root>>) => (
    <Popover.Root {...props}>
        <Popover.Trigger>Profile</Popover.Trigger>
        <Popover.Portal>
            <Popover.Content>Card</Popover.Content>
        </Popover.Portal>
    </Popover.Root>
);

describe('Popover openOnHover', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('opens after the pointer rests on the trigger', () => {
        render(<Example openOnHover hoverOpenDelay={200} />);
        fireEvent.mouseEnter(screen.getByText('Profile'));
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.queryByText('Card')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(150); });
        expect(screen.getByText('Card')).toBeInTheDocument();
    });

    test('hovering does nothing without openOnHover', () => {
        render(<Example />);
        fireEvent.mouseEnter(screen.getByText('Profile'));
        act(() => { jest.advanceTimersByTime(1000); });
        expect(screen.queryByText('Card')).not.toBeInTheDocument();
    });

    test('clicking still opens it', () => {
        render(<Example openOnHover />);
        fireEvent.click(screen.getByText('Profile'));
        act(() => { jest.advanceTimersByTime(10); });
        expect(screen.getByText('Card')).toBeInTheDocument();
    });
});
