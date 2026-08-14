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

describe('Select lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount listbox content until opened', () => {
        render(
            <Theme>
                <Select.Root>
                    <Select.Trigger />
                    <Select.Portal>
                        <Select.Content data-testid="select-content">
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </Theme>
        );

        expect(screen.queryByTestId('select-content')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the listbox', async() => {
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

        await user.click(screen.getByRole('combobox'));
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });
});
