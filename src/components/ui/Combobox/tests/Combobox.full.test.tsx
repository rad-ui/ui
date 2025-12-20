import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import Combobox from '../Combobox';

describe('Combobox full behavior', () => {
    test('keyboard navigation and Comboboxion with data-state', async() => {
        render(
            <Combobox.Root>
                <Combobox.Trigger>choose</Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="apple">Apple</Combobox.Item>
                            <Combobox.Item value="banana">Banana</Combobox.Item>
                            <Combobox.Item value="orange">Orange</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
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
                <Combobox.Root name="fruit">
                    <Combobox.Trigger>trigger</Combobox.Trigger>
                    <Combobox.Portal>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="apple">Apple</Combobox.Item>
                                <Combobox.Item value="banana" disabled>Banana</Combobox.Item>
                                <Combobox.Item value="orange">Orange</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
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
                <Combobox.Root value={value} onValueChange={setValue}>
                    <Combobox.Trigger />
                    <Combobox.Portal>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="apple">Apple</Combobox.Item>
                                <Combobox.Item value="orange">Orange</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
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
            <Combobox.Root defaultValue="apple">
                <Combobox.Trigger />
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="apple">Apple</Combobox.Item>
                            <Combobox.Item value="grape">Grape</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
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
            <Combobox.Root>
                <Combobox.Trigger>open</Combobox.Trigger>
                <Combobox.Portal container={container}>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="one">One</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
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
                <Combobox.Root>
                    <Combobox.Trigger aria-labelledby="label">choose</Combobox.Trigger>
                    <Combobox.Portal>
                        <Combobox.Content>
                            <Combobox.Group>
                                <Combobox.Item value="apple">Apple</Combobox.Item>
                            </Combobox.Group>
                        </Combobox.Content>
                    </Combobox.Portal>
                </Combobox.Root>
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
            <Combobox.Root>
                <Combobox.Trigger asChild ref={childRef as unknown as React.Ref<HTMLButtonElement>}>
                    <span>inner</span>
                </Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="a">A</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );

        const trigger = screen.getByText('inner');
        expect(trigger.tagName).toBe('SPAN');
        await userEvent.click(trigger);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(childRef.current).toBe(trigger);
    });

    test('disabled trigger does not open', async() => {
        render(
            <Combobox.Root>
                <Combobox.Trigger disabled>disabled</Combobox.Trigger>
                <Combobox.Portal>
                    <Combobox.Content>
                        <Combobox.Group>
                            <Combobox.Item value="x">X</Combobox.Item>
                        </Combobox.Group>
                    </Combobox.Content>
                </Combobox.Portal>
            </Combobox.Root>
        );
        const trigger = screen.getByText('disabled');
        await userEvent.click(trigger);
        expect(screen.queryByRole('listbox')).toBeNull();
    });
});
