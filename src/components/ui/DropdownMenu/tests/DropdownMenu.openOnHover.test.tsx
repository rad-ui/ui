import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DropdownMenu from '../DropdownMenu';

const Example = (props: Partial<React.ComponentProps<typeof DropdownMenu.Root>>) => (
    <DropdownMenu.Root {...props}>
        <DropdownMenu.Trigger>Products</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
            <DropdownMenu.Content>
                <DropdownMenu.Item>Analytics</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
);

describe('DropdownMenu openOnHover', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    test('opens after the pointer rests on the trigger', () => {
        render(<Example openOnHover hoverOpenDelay={150} />);
        fireEvent.mouseEnter(screen.getByText('Products'));
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        act(() => { jest.advanceTimersByTime(100); });
        expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    test('does not open on hover by default', () => {
        render(<Example />);
        fireEvent.mouseEnter(screen.getByText('Products'));
        act(() => { jest.advanceTimersByTime(500); });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});
