import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import Select from '../Select';

describe('Select full behavior', () => {
    test('keyboard navigation and selection with data-state', async() => {
        render(
            <Select.Root>
                <Select.Trigger>choose</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="banana">Banana</Select.Item>
                            <Select.Item value="orange">Orange</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = screen.getByText('choose');
        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        await userEvent.click(trigger);
        expect(trigger).toHaveAttribute('data-state', 'open');
        expect(trigger).toHaveAttribute('aria-expanded', 'true');

        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');
        const options = screen.getAllByRole('option');
        expect(options[1]).toHaveAttribute('data-active', 'true');

        await userEvent.keyboard('{Enter}');
        await waitFor(() => expect(trigger).toHaveAttribute('data-state', 'closed'));
        expect(trigger).toHaveTextContent('banana');
    });

    test('form submit includes value and disabled options not selectable', async() => {
        let submittedValue: FormDataEntryValue | null = null;
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            submittedValue = new FormData(e.currentTarget).get('fruit');
        };

        render(
            <form onSubmit={handleSubmit}>
                <Select.Root name="fruit">
                    <Select.Trigger>trigger</Select.Trigger>
                    <Select.Portal>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="apple">Apple</Select.Item>
                                <Select.Item value="banana" disabled>Banana</Select.Item>
                                <Select.Item value="orange">Orange</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
                <button type="submit">submit</button>
            </form>
        );

        const trigger = screen.getByText('trigger');
        await userEvent.click(trigger);
        await userEvent.click(screen.getByText('Banana'));
        expect(trigger).toHaveTextContent('trigger');
        await userEvent.click(screen.getByText('Apple'));
        expect(trigger).toHaveTextContent('apple');
        await userEvent.click(screen.getByText('submit'));
        expect(submittedValue).toBe('apple');
    });

    test('controlled and uncontrolled values work', async() => {
        function Controlled() {
            const [value, setValue] = React.useState('apple');
            return (
                <Select.Root value={value} onValueChange={setValue}>
                    <Select.Trigger />
                    <Select.Portal>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="apple">Apple</Select.Item>
                                <Select.Item value="orange">Orange</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            );
        }

        const { unmount } = render(<Controlled />);
        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('apple');
        await userEvent.click(trigger);
        await userEvent.click(screen.getByText('Orange'));
        expect(trigger).toHaveTextContent('orange');
        unmount();
        render(
            <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="apple">Apple</Select.Item>
                            <Select.Item value="grape">Grape</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
        const trigger2 = screen.getByRole('combobox');
        expect(trigger2).toHaveTextContent('apple');
        await userEvent.click(trigger2);
        await userEvent.click(screen.getByText('Grape'));
        expect(trigger2).toHaveTextContent('grape');
    });

    test('portal container renders and focus returns to trigger', async() => {
        const container = document.createElement('div');
        document.body.appendChild(container);
        render(
            <Select.Root>
                <Select.Trigger>open</Select.Trigger>
                <Select.Portal container={container}>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="one">One</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = screen.getByText('open');
        await userEvent.click(trigger);
        expect(container.querySelector('[role="listbox"]')).toBeTruthy();
        await userEvent.click(screen.getByText('One'));
        expect(document.activeElement).toBe(trigger);
    });

    test('axe: no violations and aria attributes set', async() => {
        const { container } = render(
            <div>
                <label id="label">Label</label>
                <Select.Root>
                    <Select.Trigger aria-labelledby="label">choose</Select.Trigger>
                    <Select.Portal>
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="apple">Apple</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </div>
        );

        const trigger = screen.getByText('choose');
        await userEvent.click(trigger);
        const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
        expect(results.violations).toHaveLength(0);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        expect(trigger).toHaveAttribute('aria-labelledby', 'label');
    });

    test('asChild trigger preserves semantics', async() => {
        const childRef = React.createRef<HTMLSpanElement>();
        render(
            <Select.Root>
                <Select.Trigger asChild ref={childRef as unknown as React.Ref<HTMLButtonElement>}>
                    <span>inner</span>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="a">A</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );

        const trigger = screen.getByText('inner');
        expect(trigger.tagName).toBe('SPAN');
        await userEvent.click(trigger);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(childRef.current).toBe(trigger);
    });

    test('disabled trigger does not open', async() => {
        render(
            <Select.Root>
                <Select.Trigger disabled>disabled</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Group>
                            <Select.Item value="x">X</Select.Item>
                        </Select.Group>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
        const trigger = screen.getByText('disabled');
        await userEvent.click(trigger);
        expect(screen.queryByRole('listbox')).toBeNull();
    });
});
