import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';
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

describe('HoverCard portal', () => {
    beforeEach(() => mockMatchMedia());

    test('portals content into Theme portal root', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <HoverCard.Root openDelay={0} closeDelay={0}>
                    <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content>Portaled</HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]');
        expect(portalRoot).not.toBeNull();

        await act(async() => {
            await user.hover(screen.getByText('Trigger'));
        });

        await waitFor(() => {
            const content = screen.getByText('Portaled');
            expect(portalRoot?.contains(content)).toBe(true);
        });
    });
});
