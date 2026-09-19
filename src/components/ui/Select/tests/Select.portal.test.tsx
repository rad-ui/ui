import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';
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

describe('Select portal', () => {
    beforeEach(() => mockMatchMedia());

    test('portals listbox into Theme portal root', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Select.Root>
                    <Select.Trigger />
                    <Select.Portal>
                        <Select.Content>
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]') as HTMLElement;
        expect(portalRoot).toBeTruthy();

        await user.click(screen.getByRole('combobox'));
        expect(portalRoot).toContainElement(screen.getByText('Apple'));
    });
});
