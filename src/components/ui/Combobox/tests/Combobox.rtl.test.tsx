import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';
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

describe('Combobox RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('opens listbox in rtl layout', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <Combobox.Root>
                        <Combobox.Trigger>choose</Combobox.Trigger>
                        <Combobox.Portal>
                            <Combobox.Content>
                                <Combobox.Item value="apple">Apple</Combobox.Item>
                            </Combobox.Content>
                        </Combobox.Portal>
                    </Combobox.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await user.click(trigger);
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });
});
