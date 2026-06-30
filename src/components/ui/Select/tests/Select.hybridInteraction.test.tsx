import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

describe('Select hybrid interaction', () => {
    beforeEach(() => mockMatchMedia());

    const select = () => (
        <Theme>
            <Select.Root>
                <Select.Trigger>choose</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                        <Select.Item value="orange">Orange</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </Theme>
    );

    test('pointer open then keyboard selection updates the trigger label', async() => {
        const user = userEvent.setup();
        render(select());

        const trigger = screen.getByText('choose');
        await user.click(trigger);
        await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

        await waitFor(() => expect(trigger).toHaveTextContent('Banana'));
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    test('keyboard open then pointer selection updates the trigger label', async() => {
        const user = userEvent.setup();
        render(select());

        const trigger = screen.getByText('choose');
        trigger.focus();
        await user.keyboard('{ArrowDown}');

        await user.click(screen.getByText('Orange'));

        await waitFor(() => expect(trigger).toHaveTextContent('Orange'));
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });
});
