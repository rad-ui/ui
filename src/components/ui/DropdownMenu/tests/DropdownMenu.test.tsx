import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownMenu from '../DropdownMenu';

const originalWarn = console.warn;
const mockWarn = jest.fn();

describe('DropdownMenu', () => {
    beforeEach(() => {
        console.warn = mockWarn;
        mockWarn.mockClear();
    });

    afterEach(() => {
        console.warn = originalWarn;
    });

    it('should warn when used directly and return null', () => {
        const { container } = render(<DropdownMenu />);
        expect(mockWarn).toHaveBeenCalledWith(
            'Direct usage of DropdownMenu is not supported. Please use DropdownMenu.Root, DropdownMenu.Item instead.'
        );
        expect(container.firstChild).toBeNull();
    });

    it('should forward refs correctly', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const itemRef = React.createRef<HTMLButtonElement>();

        render(
            <DropdownMenu.Root ref={rootRef} defaultOpen>
                <DropdownMenu.Trigger ref={triggerRef}>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item ref={itemRef} label="Profile">
                            Profile
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render accessible menu items', () => {
        render(
            <DropdownMenu.Root defaultOpen>
                <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        );

        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(mockWarn).not.toHaveBeenCalled();
    });

    it('should return null when Trigger used outside Root', () => {
        const { container } = render(<DropdownMenu.Trigger>Open</DropdownMenu.Trigger>);
        expect(container.firstChild).toBeNull();
    });
});
