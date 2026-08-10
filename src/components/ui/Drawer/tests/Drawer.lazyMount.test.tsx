import React from 'react';
import { render, screen } from '@testing-library/react';
import Theme from '~/components/ui/Theme/Theme';
import Drawer from '../Drawer';

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

describe('Drawer lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount content until opened', () => {
        render(
            <Theme>
                <Drawer.Root>
                    <Drawer.Trigger>Open</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Content data-testid="drawer-content">Drawer body</Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </Theme>
        );

        expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    });

    test('forceMount keeps content mounted while closed', () => {
        render(
            <Theme>
                <Drawer.Root>
                    <Drawer.Trigger>Open</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Content forceMount data-testid="drawer-content">
                            Drawer body
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </Theme>
        );

        const content = screen.getByTestId('drawer-content');
        expect(content).toBeInTheDocument();
        expect(content).toHaveAttribute('data-state', 'closed');
        expect(content).toHaveAttribute('aria-hidden', 'true');
    });
});
