import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '../Drawer';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('Drawer controlled switch', () => {
    beforeEach(() => mockMatchMedia());

    const drawer = (rootProps: Partial<React.ComponentProps<typeof Drawer.Root>>) => (
        <Theme>
            <Drawer.Root {...rootProps}>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Content data-testid="drawer-content">Drawer body</Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </Theme>
    );

    test('switches from uncontrolled defaultOpen to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(drawer({ defaultOpen: true }));

        expect(screen.getByTestId('drawer-content')).toHaveAttribute('data-state', 'open');

        rerender(drawer({ open: false, onOpenChange }));

        await waitFor(() => {
            expect(screen.getByTestId('drawer-content')).toHaveAttribute('data-state', 'closed');
        });

        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled open to uncontrolled defaultOpen', async() => {
        const { rerender } = render(drawer({ defaultOpen: true }));

        expect(screen.getByTestId('drawer-content')).toHaveAttribute('data-state', 'open');

        rerender(drawer({ open: false }));
        await waitFor(() => {
            expect(screen.getByTestId('drawer-content')).toHaveAttribute('data-state', 'closed');
        });

        rerender(drawer({ defaultOpen: true }));
        await waitFor(() => {
            expect(screen.getByTestId('drawer-content')).toHaveAttribute('data-state', 'open');
        });
    });
});
