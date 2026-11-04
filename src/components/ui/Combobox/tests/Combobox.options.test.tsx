import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from '../Combobox';
import Select from '../../Select/Select';
import { createFilter } from '~/core/utils/filter';

const List = (props: Record<string, unknown>) => (
    <Combobox.Root {...props}>
        <Combobox.Trigger data-testid="trigger" />
        <Combobox.Content>
            <Combobox.Search data-testid="search" />
            <Combobox.Item value="cafe">Café</Combobox.Item>
            <Combobox.Item value="apple">Apple</Combobox.Item>
            <Combobox.Item value="apricot">Apricot</Combobox.Item>
            <Combobox.Item value="avocado">Avocado</Combobox.Item>
        </Combobox.Content>
    </Combobox.Root>
);

const open = () => fireEvent.click(screen.getByTestId('trigger'));
const type = (text: string) => fireEvent.change(screen.getByTestId('search'), { target: { value: text } });

describe('createFilter', () => {
    test('is case and accent insensitive', () => {
        const { contains, startsWith, endsWith } = createFilter();
        expect(contains('Café au lait', 'CAFE')).toBe(true);
        expect(startsWith('Éclair', 'ecl')).toBe(true);
        expect(endsWith('Crème brûlée', 'BRULEE')).toBe(true);
        expect(contains('Tea', 'coffee')).toBe(false);
    });

    test('ignoreAccents: false keeps accents significant', () => {
        expect(createFilter({ ignoreAccents: false }).contains('Café', 'cafe')).toBe(false);
    });
});

describe('Combobox filtering options', () => {
    test('the default filter ignores accents', () => {
        render(<List />);
        open();
        type('cafe');
        expect(screen.getByText('Café')).toBeVisible();
        expect(screen.getByText('Apple')).not.toBeVisible();
    });

    test('a custom filter decides what shows', () => {
        render(<List filter={(label: string, query: string) => label.toLowerCase().startsWith(query.toLowerCase())} />);
        open();
        type('a');
        expect(screen.getByText('Apple')).toBeVisible();
        expect(screen.getByText('Café')).not.toBeVisible();
    });

    test('filter={null} shows everything', () => {
        render(<List filter={null} />);
        open();
        type('zzz');
        expect(screen.getByText('Apple')).toBeVisible();
        expect(screen.getByText('Café')).toBeVisible();
    });

    test('limit caps the number of matches shown', () => {
        render(<List limit={2} />);
        open();
        type('a');
        const visible = ['Café', 'Apple', 'Apricot', 'Avocado'].filter(text => {
            try {
                expect(screen.getByText(text)).toBeVisible();
                return true;
            } catch {
                return false;
            }
        });
        expect(visible).toHaveLength(2);
    });
});

describe('Select form and state options', () => {
    test('readOnly keeps the list closed and marks the trigger', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root readOnly defaultValue="a">
                <Select.Trigger data-testid="trigger"><Select.Value /></Select.Trigger>
                <Select.Content><Select.Item value="a">A</Select.Item><Select.Item value="b">B</Select.Item></Select.Content>
            </Select.Root>
        );
        const trigger = screen.getByTestId('trigger');
        await user.click(trigger);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(trigger).toHaveAttribute('aria-readonly', 'true');
        trigger.focus();
        await user.keyboard('b');
        expect(trigger).toHaveTextContent('A');
    });

    test('form and inputRef reach the hidden control', () => {
        const ref = React.createRef<HTMLSelectElement>();
        render(
            <>
                <form id="outside" />
                <Select.Root name="fruit" form="outside" inputRef={ref} defaultValue="a">
                    <Select.Trigger><Select.Value /></Select.Trigger>
                    <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
                </Select.Root>
            </>
        );
        expect(ref.current).toBeInstanceOf(HTMLSelectElement);
        expect(ref.current).toHaveAttribute('form', 'outside');
        const form = document.getElementById('outside') as HTMLFormElement;
        expect(new FormData(form).get('fruit')).toBe('a');
    });

    test('onItemHighlighted reports the highlighted value', async() => {
        const user = userEvent.setup();
        const onItemHighlighted = jest.fn();
        render(
            <Select.Root onItemHighlighted={onItemHighlighted} defaultOpen>
                <Select.Trigger data-testid="trigger"><Select.Value placeholder="Pick" /></Select.Trigger>
                <Select.Content><Select.Item value="a">A</Select.Item><Select.Item value="b">B</Select.Item></Select.Content>
            </Select.Root>
        );
        await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
        screen.getAllByRole('option')[0].focus();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(onItemHighlighted).toHaveBeenLastCalledWith('b', { index: 1 }));
    });

    test('loop wraps from the last option to the first', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root loop defaultOpen>
                <Select.Trigger><Select.Value placeholder="Pick" /></Select.Trigger>
                <Select.Content><Select.Item value="a">A</Select.Item><Select.Item value="b">B</Select.Item></Select.Content>
            </Select.Root>
        );
        await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument());
        const options = screen.getAllByRole('option');
        options[1].focus();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(options[0]).toHaveFocus());
    });
});

describe('Combobox.Status', () => {
    const WithStatus = ({ children }: { children?: React.ComponentProps<typeof Combobox.Status>['children'] }) => (
        <Combobox.Root>
            <Combobox.Trigger data-testid="trigger" />
            <Combobox.Content>
                <Combobox.Search data-testid="search" />
                <Combobox.Status data-testid="status">{children}</Combobox.Status>
                <Combobox.Item value="apple">Apple</Combobox.Item>
                <Combobox.Item value="apricot">Apricot</Combobox.Item>
                <Combobox.Item value="pear">Pear</Combobox.Item>
            </Combobox.Content>
        </Combobox.Root>
    );

    test('announces the match count as the user types, outside the listbox', () => {
        render(<WithStatus />);
        open();
        const status = screen.getByTestId('status');
        expect(status).toHaveAttribute('role', 'status');
        expect(status).toHaveTextContent('');
        type('ap');
        expect(status).toHaveTextContent('2 results');
        type('pea');
        expect(status).toHaveTextContent('1 result');
        expect(status.closest('[role="listbox"]')).toBeNull();
    });

    test('a function words the message', () => {
        render(<WithStatus>{({ count, query }) => `${count} for “${query}”`}</WithStatus>);
        open();
        type('zz');
        expect(screen.getByTestId('status')).toHaveTextContent('0 for “zz”');
    });
});
