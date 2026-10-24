import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../Autocomplete';

const Cities = (props: Partial<React.ComponentProps<typeof Autocomplete.Root>>) => (
    <Autocomplete.Root {...props}>
        <Autocomplete.Input aria-label="City" />
        <Autocomplete.Content>
            <Autocomplete.Item value="Amsterdam">Amsterdam</Autocomplete.Item>
            <Autocomplete.Item value="Athens">Athens</Autocomplete.Item>
            <Autocomplete.Item value="Berlin">Berlin</Autocomplete.Item>
        </Autocomplete.Content>
    </Autocomplete.Root>
);

describe('Autocomplete', () => {
    test('typing opens filtered suggestions and keeps focus in the input', async() => {
        const user = userEvent.setup();
        render(<Cities />);
        const input = screen.getByRole('combobox', { name: 'City' });
        expect(input).toHaveAttribute('aria-autocomplete', 'list');
        expect(input).toHaveAttribute('aria-expanded', 'false');

        await user.type(input, 'at');
        expect(input).toHaveAttribute('aria-expanded', 'true');
        await waitFor(() => expect(input).toHaveFocus());
        expect(screen.getByRole('option', { name: 'Athens' })).toBeVisible();
        expect(screen.queryByRole('option', { name: 'Berlin' })).not.toBeInTheDocument();
        expect(input).toHaveValue('at');
    });

    test('free text is the value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Cities onValueChange={onValueChange} />);
        await user.type(screen.getByRole('combobox', { name: 'City' }), 'Zurich');
        expect(onValueChange).toHaveBeenLastCalledWith('Zurich');
    });

    test('Enter picks the highlighted suggestion and closes', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Cities onValueChange={onValueChange} />);
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'ber');
        await waitFor(() => expect(input).toHaveAttribute('aria-activedescendant'));
        await user.keyboard('{Enter}');
        expect(onValueChange).toHaveBeenLastCalledWith('Berlin');
        expect(input).toHaveValue('Berlin');
        expect(input).toHaveAttribute('aria-expanded', 'false');
    });

    test('ArrowDown moves the highlight through visible suggestions', async() => {
        const user = userEvent.setup();
        render(<Cities />);
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'a');
        await waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(screen.getByRole('option', { name: 'Amsterdam' }).id));
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(screen.getByRole('option', { name: 'Athens' }).id));
        await user.keyboard('{Enter}');
        expect(input).toHaveValue('Athens');
    });

    test('clicking a suggestion fills the input', async() => {
        const user = userEvent.setup();
        render(<Cities />);
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'a');
        await user.click(screen.getByRole('option', { name: 'Amsterdam' }));
        expect(input).toHaveValue('Amsterdam');
    });

    test('Escape closes the suggestions and keeps the text', async() => {
        const user = userEvent.setup();
        render(<Cities />);
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'be');
        await user.keyboard('{Escape}');
        expect(input).toHaveAttribute('aria-expanded', 'false');
        expect(input).toHaveValue('be');
    });

    test('clicking the input does not toggle the list closed', async() => {
        const user = userEvent.setup();
        render(<Cities />);
        const input = screen.getByRole('combobox', { name: 'City' });
        await user.type(input, 'a');
        await user.click(input);
        expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    test('controlled value drives the input', () => {
        const { rerender } = render(<Cities value="Ath" onValueChange={() => {}} />);
        expect(screen.getByRole('combobox', { name: 'City' })).toHaveValue('Ath');
        rerender(<Cities value="Athens" onValueChange={() => {}} />);
        expect(screen.getByRole('combobox', { name: 'City' })).toHaveValue('Athens');
    });

    test('disabled input cannot be used', () => {
        render(<Cities disabled />);
        expect(screen.getByRole('combobox', { name: 'City' })).toBeDisabled();
    });
});
