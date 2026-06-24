import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

describe('Combobox hybrid interaction', () => {
    const combobox = () => (
        <Combobox.Root>
            <Combobox.Trigger>choose</Combobox.Trigger>
            <Combobox.Portal>
                <Combobox.Content>
                    <Combobox.Group>
                        <Combobox.Item value="apple">Apple</Combobox.Item>
                        <Combobox.Item value="banana">Banana</Combobox.Item>
                        <Combobox.Item value="orange">Orange</Combobox.Item>
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Portal>
        </Combobox.Root>
    );

    test('pointer open then keyboard selection updates the trigger label', async() => {
        const user = userEvent.setup();
        render(combobox());

        const trigger = screen.getByText('choose');
        await user.click(trigger);

        await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

        await waitFor(() => expect(trigger).toHaveTextContent('banana'));
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    test('keyboard open then pointer selection updates the trigger label', async() => {
        const user = userEvent.setup();
        render(combobox());

        const trigger = screen.getByRole('combobox');
        trigger.focus();
        await user.keyboard('{ArrowDown}');

        await user.click(screen.getByText('Orange'));

        await waitFor(() => expect(trigger).toHaveTextContent('orange'));
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });
});
