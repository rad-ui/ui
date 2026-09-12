import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Theme from '~/components/ui/Theme/Theme';
import Combobox from '~/components/ui/Combobox/Combobox';

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

describe('Combobox primitive portal', () => {
    beforeEach(() => mockMatchMedia());

    test('portals listbox into Theme portal root', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Combobox.Root>
                    <Combobox.Trigger>Choose</Combobox.Trigger>
                    <Combobox.Portal>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="apple">Apple</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]') as HTMLElement;
        expect(portalRoot).toBeTruthy();

        await user.click(screen.getByText('Choose'));
        await waitFor(() => {
            expect(portalRoot).toContainElement(screen.getByText('Apple'));
        });
    });
});
