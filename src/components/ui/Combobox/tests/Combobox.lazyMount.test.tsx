import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

describe('Combobox lazy mount', () => {
    test('does not mount listbox content until opened', () => {
        render(
            <Combobox.Root>
                <Combobox.Trigger>Choose</Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content data-testid="combobox-content">
                        <Combobox.Group>
                            <Combobox.Item value="apple">Apple</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        expect(screen.queryByTestId('combobox-content')).not.toBeInTheDocument();
    });

    test('mounts content after trigger opens the listbox', async() => {
        const user = userEvent.setup();

        render(
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
        );

        await user.click(screen.getByText('Choose'));
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });
});
