import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Autocomplete from '../Autocomplete';
import Combobox from '~/components/ui/Combobox/Combobox';

describe('Empty state', () => {
    test('Autocomplete.Empty shows when nothing matches, outside the listbox', async() => {
        const user = userEvent.setup();
        render(
            <Autocomplete.Root>
                <Autocomplete.Input aria-label="Fruit" />
                <Autocomplete.Content>
                    <Autocomplete.Item value="Apple">Apple</Autocomplete.Item>
                    <Autocomplete.Empty>No fruit found</Autocomplete.Empty>
                </Autocomplete.Content>
            </Autocomplete.Root>
        );
        const input = screen.getByRole('combobox');
        await user.type(input, 'ap');
        expect(screen.queryByText('No fruit found')).not.toBeInTheDocument();
        await user.type(input, 'z');
        const empty = screen.getByRole('status');
        expect(empty).toHaveTextContent('No fruit found');
        expect(screen.getByRole('listbox')).not.toContainElement(empty);

        const results = await axe.run(document.body, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('Combobox.Empty shows when the search matches nothing', async() => {
        const user = userEvent.setup();
        render(
            <Combobox.Root>
                <Combobox.Trigger>Pick</Combobox.Trigger>
                <Combobox.Content>
                    <Combobox.Search aria-label="Search" />
                    <Combobox.Item value="go">Go</Combobox.Item>
                    <Combobox.Empty>Nothing found</Combobox.Empty>
                </Combobox.Content>
            </Combobox.Root>
        );
        await user.click(screen.getAllByRole('combobox')[0]);
        screen.getByRole('combobox', { name: 'Search' }).focus();
        await user.keyboard('xyz');
        expect(screen.getByRole('status')).toHaveTextContent('Nothing found');
    });
});
