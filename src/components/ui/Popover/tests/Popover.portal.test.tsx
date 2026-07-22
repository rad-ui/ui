import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';
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

describe('Popover primitive portal', () => {
    beforeEach(() => mockMatchMedia());

    test('portals content into Theme portal root', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>Portaled popover</Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]') as HTMLElement;
        expect(portalRoot).toBeTruthy();

        await user.click(screen.getByText('Open'));
        await waitFor(() => {
            expect(portalRoot).toContainElement(screen.getByText('Portaled popover'));
        });
    });
});
