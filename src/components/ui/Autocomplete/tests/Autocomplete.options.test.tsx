import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../Autocomplete';

const Cities = (props: Partial<React.ComponentProps<typeof Autocomplete.Root>>) => (
    <Autocomplete.Root {...props}>
        <Autocomplete.Input aria-label="City" name="city" />
        <Autocomplete.Content>
            <Autocomplete.Item value="Amsterdam">Amsterdam</Autocomplete.Item>
            <Autocomplete.Item value="Athens">Athens</Autocomplete.Item>
            <Autocomplete.Item value="Berlin">Berlin</Autocomplete.Item>
        </Autocomplete.Content>
    </Autocomplete.Root>
);

const input = () => screen.getByRole('combobox', { name: 'City' });

describe('Autocomplete options', () => {
    test('without autoHighlight, Enter keeps the typed text', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Cities onValueChange={onValueChange} />);
        await user.type(input(), 'ber');
        expect(input()).not.toHaveAttribute('aria-activedescendant');
        await user.keyboard('{Enter}');
        expect(input()).toHaveValue('ber');
        expect(onValueChange).toHaveBeenLastCalledWith('ber');
    });

    test('autoHighlight="always" highlights on open with no text', async() => {
        const user = userEvent.setup();
        render(<Cities autoHighlight="always" openOnInputClick />);
        await user.click(input());
        await waitFor(() => expect(input().getAttribute('aria-activedescendant')).toBe(screen.getByRole('option', { name: 'Amsterdam' }).id));
    });

    test('openOnInputClick opens the list on click', async() => {
        const user = userEvent.setup();
        const { unmount } = render(<Cities />);
        await user.click(input());
        expect(input()).toHaveAttribute('aria-expanded', 'false');
        unmount();
        render(<Cities openOnInputClick />);
        await user.click(input());
        expect(input()).toHaveAttribute('aria-expanded', 'true');
    });

    test('mode="both" previews the highlighted suggestion in the input', async() => {
        const user = userEvent.setup();
        render(<Cities mode="both" />);
        await user.type(input(), 'a');
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(input()).toHaveValue('Amsterdam'));
        expect(screen.queryByRole('option', { name: 'Berlin' })).not.toBeInTheDocument();
    });

    test('mode="none" does not filter', async() => {
        const user = userEvent.setup();
        render(<Cities mode="none" />);
        await user.type(input(), 'zzz');
        expect(screen.getByRole('option', { name: 'Berlin' })).toBeVisible();
    });

    test('submitOnItemClick submits the form with the picked text', async() => {
        const user = userEvent.setup();
        const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            return new FormData(event.currentTarget).get('city');
        });
        render(<form onSubmit={onSubmit}><Cities submitOnItemClick /></form>);
        await user.type(input(), 'ath');
        await user.click(screen.getByRole('option', { name: 'Athens' }));
        await waitFor(() => expect(onSubmit).toHaveBeenCalled());
        expect(onSubmit.mock.results[0].value).toBe('Athens');
    });
});
