import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const Fruits = (props: Omit<React.ComponentProps<typeof Select.Root>, 'children'>) => (
    <Select.Root {...props}>
        <Select.Trigger>choose</Select.Trigger>
        <Select.Content>
            <Select.Item value="apple">Apple</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="orange">Orange</Select.Item>
        </Select.Content>
    </Select.Root>
);

describe('Select regressions', () => {
    test('arrow keys work after pointer-opening a select that already has a value', async() => {
        // In browsers, pointer-opening leaves focus on the list container while the selected
        // option is highlighted; Arrow keys used to keep resetting to that same option.
        const user = userEvent.setup();
        render(<Fruits defaultValue="apple" />);
        const trigger = screen.getByRole('combobox');

        await user.click(trigger);
        screen.getByRole('listbox').focus();
        await user.keyboard('{ArrowDown}');
        await waitFor(() => expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('data-active', 'true'));
        await user.keyboard('{ArrowDown}{Enter}');

        await waitFor(() => expect(trigger).toHaveTextContent('Orange'));
    });

    test('Enter on the list container selects the highlighted option', async() => {
        const user = userEvent.setup();
        render(<Fruits defaultValue="banana" />);
        const trigger = screen.getByRole('combobox');

        await user.click(trigger);
        screen.getByRole('listbox').focus();
        await user.keyboard('{Enter}');

        await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'closed'));
        expect(trigger).toHaveTextContent('Banana');
    });

    test('option ids are unique across instances that share values', () => {
        render(
            <>
                <Fruits defaultValue="apple" defaultOpen />
                <Fruits defaultValue="apple" defaultOpen />
            </>
        );
        const ids = Array.from(document.querySelectorAll('[role="option"]')).map((option) => option.id);
        expect(ids).toHaveLength(6);
        expect(new Set(ids).size).toBe(ids.length);
        ids.forEach((id) => expect(id).not.toBe('apple'));
    });

    test('submits the default value without the listbox ever opening', () => {
        render(
            <form data-testid="form">
                <Fruits name="fruit" defaultValue="banana" />
            </form>
        );
        expect(new FormData(screen.getByTestId('form') as HTMLFormElement).get('fruit')).toBe('banana');
    });

    test('required blocks submission until a value is chosen, and reset restores the default', async() => {
        const user = userEvent.setup();
        render(
            <form data-testid="form">
                <Fruits name="fruit" required />
            </form>
        );
        const form = screen.getByTestId('form') as HTMLFormElement;
        expect(form.checkValidity()).toBe(false);

        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'Banana' }));
        expect(form.checkValidity()).toBe(true);
        expect(new FormData(form).get('fruit')).toBe('banana');

        act(() => {
            fireEvent.reset(form);
        });
        expect(new FormData(form).get('fruit')).toBe('');
    });

    test('supports controlled open state via open/onOpenChange', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();
        const Controlled = () => {
            const [open, setOpen] = React.useState(false);
            return <Fruits open={open} onOpenChange={(next) => { onOpenChange(next); setOpen(next); }} />;
        };
        render(<Controlled />);

        await user.click(screen.getByRole('combobox'));
        expect(onOpenChange).toHaveBeenLastCalledWith(true);
        expect(screen.getByRole('listbox')).toBeInTheDocument();

        await user.click(screen.getByRole('option', { name: 'Apple' }));
        expect(onOpenChange).toHaveBeenLastCalledWith(false);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('root disabled prevents opening and marks the trigger disabled', async() => {
        const user = userEvent.setup();
        render(<Fruits disabled defaultValue="apple" />);
        const trigger = screen.getByRole('combobox');
        expect(trigger).toBeDisabled();
        await user.click(trigger);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    test('trigger exposes data-placeholder only while no value is selected', async() => {
        const user = userEvent.setup();
        render(<Fruits />);
        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveAttribute('data-placeholder');

        await user.click(trigger);
        await user.click(screen.getByRole('option', { name: 'Apple' }));
        expect(trigger).not.toHaveAttribute('data-placeholder');
    });

    test('consumer className is merged with the generated class', () => {
        render(
            <Select.Root customRootClass="acme">
                <Select.Trigger className="mine">choose</Select.Trigger>
                <Select.Content><Select.Item value="a">A</Select.Item></Select.Content>
            </Select.Root>
        );
        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveClass('mine');
        expect(trigger).toHaveClass('acme-select-trigger');
    });
});

describe('Select label before first open', () => {
    test('trigger shows the item label for defaultValue without opening the list', () => {
        render(
            <Select.Root defaultValue="sv">
                <Select.Trigger>choose</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="react"><Select.Indicator />React</Select.Item>
                            <Select.Item value="sv"><Select.Indicator />Svelte</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(screen.getByRole('combobox')).toHaveTextContent('Svelte');
    });

    test('an explicit label prop wins, and unknown values fall back to the raw value', () => {
        const { rerender } = render(
            <Select.Root value="sv" onValueChange={() => {}}>
                <Select.Trigger>choose</Select.Trigger>
                <Select.Content>
                    <Select.Item value="sv" label="Svelte (compiler)">Svelte</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(screen.getByRole('combobox')).toHaveTextContent('Svelte (compiler)');

        rerender(
            <Select.Root value="custom" onValueChange={() => {}}>
                <Select.Trigger>choose</Select.Trigger>
                <Select.Content>
                    <Select.Item value="sv">Svelte</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(screen.getByRole('combobox')).toHaveTextContent('custom');
    });
});
