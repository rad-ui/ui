import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';
import Autocomplete from '~/components/ui/Autocomplete/Autocomplete';

describe('Clear part', () => {
    test('Combobox.Clear clears the selection and refocuses the trigger', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(
            <Combobox.Root defaultValue="go" onValueChange={onValueChange}>
                <Combobox.Trigger>Language</Combobox.Trigger>
                <Combobox.Clear />
                <Combobox.Content>
                    <Combobox.Item value="go">Go</Combobox.Item>
                </Combobox.Content>
            </Combobox.Root>
        );
        const clear = screen.getByRole('button', { name: 'Clear' });
        await user.click(clear);
        expect(onValueChange).toHaveBeenLastCalledWith('');
        expect(screen.getAllByRole('combobox')[0]).toHaveFocus();
        expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
    });

    test('Autocomplete.Clear empties the input', async() => {
        const user = userEvent.setup();
        render(
            <Autocomplete.Root>
                <Autocomplete.Input aria-label="City" />
                <Autocomplete.Clear />
                <Autocomplete.Content>
                    <Autocomplete.Item value="Paris">Paris</Autocomplete.Item>
                </Autocomplete.Content>
            </Autocomplete.Root>
        );
        expect(screen.queryByRole('button', { name: 'Clear' })).not.toBeInTheDocument();
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'Par');
        await user.click(screen.getByRole('button', { name: 'Clear' }));
        expect(input).toHaveValue('');
        expect(input).toHaveFocus();
    });
});
