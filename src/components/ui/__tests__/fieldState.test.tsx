import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Field from '../Field/Field';
import Checkbox from '../Checkbox/Checkbox';
import Switch from '../Switch/Switch';
import Select from '../Select/Select';
import NumberField from '../NumberField/NumberField';

// Every Rad UI control inside Field.Root reports focus, blur and edits, so the
// field's data-focused, data-touched, data-dirty and data-filled follow it.

const root = (container: HTMLElement) => container.querySelector<HTMLElement>('[data-slot="field-root"]')!;

describe('Field state from Rad UI controls', () => {
    test('Field.Control: filled follows the text', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <Field.Root name="email"><Field.Label>Email</Field.Label><Field.Control /></Field.Root>
        );
        const field = root(container);
        expect(field).not.toHaveAttribute('data-filled');
        await user.type(screen.getByLabelText('Email'), 'a');
        expect(field).toHaveAttribute('data-filled');
        expect(screen.getByLabelText('Email')).toHaveAttribute('data-filled');
        await user.clear(screen.getByLabelText('Email'));
        expect(field).not.toHaveAttribute('data-filled');
    });

    test('Field.Control with a default value starts filled', () => {
        const { container } = render(<Field.Root><Field.Control defaultValue="x" aria-label="X" /></Field.Root>);
        expect(root(container)).toHaveAttribute('data-filled');
    });

    test('Checkbox: focus, touched, dirty and filled', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <Field.Root name="terms"><Checkbox.Root aria-label="Terms"><Checkbox.Indicator /></Checkbox.Root></Field.Root>
        );
        const field = root(container);
        const box = screen.getByRole('checkbox', { name: 'Terms' });

        act(() => box.focus());
        expect(field).toHaveAttribute('data-focused');
        expect(box).toHaveAttribute('data-focused');

        await user.click(box);
        expect(field).toHaveAttribute('data-dirty');
        expect(field).toHaveAttribute('data-filled');

        act(() => box.blur());
        expect(field).not.toHaveAttribute('data-focused');
        expect(field).toHaveAttribute('data-touched');

        // Back to the starting value: no longer dirty.
        await user.click(box);
        expect(field).not.toHaveAttribute('data-dirty');
        expect(field).not.toHaveAttribute('data-filled');
    });

    test('Switch: checked fills the field', async() => {
        const user = userEvent.setup();
        const { container } = render(<Field.Root><Switch.Root aria-label="Wifi" defaultChecked><Switch.Thumb /></Switch.Root></Field.Root>);
        const field = root(container);
        expect(field).toHaveAttribute('data-filled');
        await user.click(screen.getByRole('switch', { name: 'Wifi' }));
        expect(field).not.toHaveAttribute('data-filled');
        expect(field).toHaveAttribute('data-dirty');
        expect(screen.getByRole('switch')).toHaveAttribute('data-dirty');
    });

    test('Select: picking an option fills and dirties the field; the trigger carries the state', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <Field.Root name="fruit">
                <Field.Label>Fruit</Field.Label>
                <Select.Root>
                    <Select.Trigger><Select.Value placeholder="Pick" /></Select.Trigger>
                    <Select.Portal>
                        <Select.Content>
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
            </Field.Root>
        );
        const field = root(container);
        expect(field).not.toHaveAttribute('data-filled');
        await user.click(screen.getByRole('combobox'));
        await user.click(await screen.findByRole('option', { name: 'Apple' }));
        expect(field).toHaveAttribute('data-filled');
        expect(field).toHaveAttribute('data-dirty');
        expect(screen.getByRole('combobox')).toHaveAttribute('data-filled');
    });

    test('NumberField: moving between input and buttons does not touch the field', () => {
        const { container } = render(
            <Field.Root name="qty">
                <NumberField.Root>
                    <NumberField.Decrement>-</NumberField.Decrement>
                    <NumberField.Input aria-label="Qty" />
                    <NumberField.Increment>+</NumberField.Increment>
                </NumberField.Root>
            </Field.Root>
        );
        const field = root(container);
        const input = screen.getByLabelText('Qty');
        const plus = screen.getByText('+');

        act(() => input.focus());
        expect(field).toHaveAttribute('data-focused');
        fireEvent.blur(input, { relatedTarget: plus });
        fireEvent.focus(plus);
        expect(field).not.toHaveAttribute('data-touched');

        fireEvent.click(plus);
        expect(field).toHaveAttribute('data-filled');
        expect(field).toHaveAttribute('data-dirty');
        expect(input).toHaveAttribute('data-dirty');

        fireEvent.blur(plus, { relatedTarget: document.body });
        expect(field).toHaveAttribute('data-touched');
    });

    test('a form reset clears dirty and re-reads filled', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <form>
                <Field.Root name="name"><Field.Control aria-label="Name" /></Field.Root>
                <button type="reset">Reset</button>
            </form>
        );
        const field = root(container);
        await user.type(screen.getByLabelText('Name'), 'Ada');
        expect(field).toHaveAttribute('data-dirty');
        await user.click(screen.getByText('Reset'));
        await act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });
        expect(field).not.toHaveAttribute('data-dirty');
        expect(field).not.toHaveAttribute('data-filled');
    });
});
