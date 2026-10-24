import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';

const Languages = (props: Omit<React.ComponentProps<typeof Combobox.Root>, 'children'>) => (
    <Combobox.Root multiple {...props}>
        <Combobox.Trigger>Languages</Combobox.Trigger>
        <Combobox.Chips />
        <Combobox.Content>
            <Combobox.Search aria-label="Search languages" />
            <Combobox.Item value="ts">TypeScript</Combobox.Item>
            <Combobox.Item value="go">Go</Combobox.Item>
            <Combobox.Item value="rs">Rust</Combobox.Item>
        </Combobox.Content>
    </Combobox.Root>
);

describe('Combobox multiple', () => {
    test('picks several values from the search and shows them as chips', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Languages onValueChange={onValueChange} />);
        await user.click(screen.getAllByRole('combobox')[0]);

        await user.click(screen.getByRole('option', { name: 'Go' }));
        await user.click(screen.getByRole('option', { name: 'Rust' }));
        expect(onValueChange).toHaveBeenLastCalledWith(['go', 'rs']);

        const chips = screen.getAllByRole('listitem');
        expect(chips.map((chip) => chip.textContent)).toEqual(['Go', 'Rust']);
    });

    test('a chip remove button deselects its value', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Languages defaultValue={['ts', 'go']} onValueChange={onValueChange} />);
        await user.click(screen.getByRole('button', { name: 'Remove TypeScript' }));
        expect(onValueChange).toHaveBeenLastCalledWith(['go']);
        expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });

    test('Backspace in an empty search removes the last chip', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Languages defaultValue={['ts', 'go']} onValueChange={onValueChange} />);
        await user.click(screen.getAllByRole('combobox')[0]);
        screen.getByRole('combobox', { name: 'Search languages' }).focus();
        await user.keyboard('{Backspace}');
        expect(onValueChange).toHaveBeenLastCalledWith(['ts']);
    });

    test('Enter in the search toggles the highlighted option', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Languages onValueChange={onValueChange} />);
        await user.click(screen.getAllByRole('combobox')[0]);
        screen.getByRole('combobox', { name: 'Search languages' }).focus();
        await user.keyboard('ru{Enter}');
        await waitFor(() => expect(onValueChange).toHaveBeenLastCalledWith(['rs']));
    });

    test('chips render nothing with no selection and accept custom rendering', () => {
        const { unmount } = render(<Languages />);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        unmount();
        render(
            <Combobox.Root multiple defaultValue={['go']}>
                <Combobox.Trigger>Pick</Combobox.Trigger>
                <Combobox.Chips>{({ label }) => <em>{label}!</em>}</Combobox.Chips>
                <Combobox.Content>
                    <Combobox.Item value="go">Go</Combobox.Item>
                </Combobox.Content>
            </Combobox.Root>
        );
        expect(screen.getByRole('listitem')).toHaveTextContent('Go!');
    });
});
