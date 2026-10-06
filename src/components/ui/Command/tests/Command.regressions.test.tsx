import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Command from '../Command';

describe('Command regressions', () => {
    test('the input points aria-activedescendant at the active option', async() => {
        const user = userEvent.setup();
        render(
            <Command.Root>
                <Command.Input aria-label="Search" />
                <Command.List>
                    <Command.Item value="home">Home</Command.Item>
                    <Command.Item value="inbox">Inbox</Command.Item>
                </Command.List>
            </Command.Root>
        );
        const input = screen.getByRole('combobox');
        await user.click(input);
        await user.keyboard('{ArrowDown}');

        const inbox = screen.getByRole('option', { name: 'Inbox' });
        expect(inbox.id).not.toBe('');
        expect(input).toHaveAttribute('aria-activedescendant', inbox.id);
    });

    test('options are not individual tab stops', async() => {
        const user = userEvent.setup();
        render(
            <>
                <Command.Root>
                    <Command.Input aria-label="Search" />
                    <Command.List>
                        <Command.Item value="home">Home</Command.Item>
                        <Command.Item value="inbox">Inbox</Command.Item>
                    </Command.List>
                </Command.Root>
                <button>after</button>
            </>
        );
        await user.tab();
        expect(screen.getByRole('combobox')).toHaveFocus();
        await user.tab();
        expect(screen.getByRole('button', { name: 'after' })).toHaveFocus();
    });

    test('a controlled Command.Input value drives filtering', async() => {
        const user = userEvent.setup();
        const Controlled = () => {
            const [query, setQuery] = React.useState('');
            return (
                <Command.Root>
                    <Command.Input aria-label="Search" value={query} onValueChange={setQuery} />
                    <Command.List>
                        <Command.Empty>No results</Command.Empty>
                        <Command.Item value="home">Home</Command.Item>
                        <Command.Item value="inbox">Inbox</Command.Item>
                    </Command.List>
                </Command.Root>
            );
        };
        render(<Controlled />);
        await user.type(screen.getByRole('combobox'), 'inb');

        expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual(['Inbox']);
    });

    test('separators stay put when the parent re-renders with new onSelect callbacks', async() => {
        const user = userEvent.setup();
        const Palette = () => {
            const [count, setCount] = React.useState(0);
            return (
                <Command.Root>
                    <Command.Input aria-label="Search" />
                    <Command.List>
                        <Command.Item value="one" onSelect={() => setCount(count + 1)}>One</Command.Item>
                        <Command.Separator />
                        <Command.Item value="two" onSelect={() => setCount(count + 1)}>Two {count}</Command.Item>
                    </Command.List>
                </Command.Root>
            );
        };
        render(<Palette />);
        expect(document.querySelector('[data-slot="command-separator"]')).toBeInTheDocument();

        await user.click(screen.getByRole('option', { name: 'One' }));
        await user.click(screen.getByRole('option', { name: /Two/ }));

        expect(screen.getByRole('option', { name: 'Two 2' })).toBeInTheDocument();
        expect(document.querySelector('[data-slot="command-separator"]')).toBeInTheDocument();
    });

    test('items without a value filter by their rendered text', async() => {
        const user = userEvent.setup();
        render(
            <Command.Root>
                <Command.Input aria-label="Search" />
                <Command.List>
                    <Command.Item><span>Open</span> <span>settings</span></Command.Item>
                    <Command.Item><span>Inbox</span></Command.Item>
                </Command.List>
            </Command.Root>
        );
        await user.type(screen.getByRole('combobox'), 'sett');
        expect(screen.getAllByRole('option')).toHaveLength(1);
        expect(screen.getByRole('option')).toHaveTextContent('Open settings');
    });
});

describe('Command.Empty live region', () => {
    test('a persistent polite status region receives the message when results run out', async() => {
        const user = userEvent.setup();
        render(
            <Command.Root>
                <Command.Input aria-label="Search" />
                <Command.List>
                    <Command.Empty>No results found.</Command.Empty>
                    <Command.Item value="home">Home</Command.Item>
                </Command.List>
            </Command.Root>
        );
        const status = screen.getByRole('status');
        expect(status).toHaveAttribute('aria-live', 'polite');
        expect(status).toBeEmptyDOMElement();
        // The announcer must not live inside the listbox (role="status" is not a valid listbox child).
        expect(screen.getByRole('listbox')).not.toContainElement(status);

        await user.type(screen.getByRole('combobox'), 'zzz');

        expect(screen.getByRole('status')).toBe(status);
        expect(status).toHaveTextContent('No results found.');
    });
});
