import React from 'react';
import { render, screen } from '@testing-library/react';
import Field from '../Field';
import Checkbox from '~/components/ui/Checkbox/Checkbox';
import Switch from '~/components/ui/Switch/Switch';
import Select from '~/components/ui/Select/Select';
import NumberField from '~/components/ui/NumberField/NumberField';

describe('Rad UI controls inside Field', () => {
    test('Checkbox is labelled, described and invalid', () => {
        render(
            <Field.Root invalid>
                <Field.Label>Accept terms</Field.Label>
                <Checkbox.Root><Checkbox.Indicator /></Checkbox.Root>
                <Field.Description>Required to continue.</Field.Description>
            </Field.Root>
        );
        const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
        expect(checkbox).toHaveAccessibleDescription('Required to continue.');
        expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    test('Switch takes the field disabled state', () => {
        render(
            <Field.Root disabled>
                <Field.Label>Notifications</Field.Label>
                <Switch.Root><Switch.Thumb /></Switch.Root>
            </Field.Root>
        );
        expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled();
    });

    test('Select trigger is the labelled control and the root takes the name', () => {
        const { container } = render(
            <form>
                <Field.Root name="fruit">
                    <Field.Label>Fruit</Field.Label>
                    <Select.Root defaultValue="apple">
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Content>
                    </Select.Root>
                    <Field.Description>Pick one.</Field.Description>
                </Field.Root>
            </form>
        );
        const trigger = screen.getByRole('combobox', { name: 'Fruit' });
        expect(trigger).toHaveAccessibleDescription('Pick one.');
        expect(new FormData(container.querySelector('form') as HTMLFormElement).get('fruit')).toBe('apple');
    });

    test('NumberField input takes the id, name and state', () => {
        render(
            <Field.Root name="qty" required invalid>
                <Field.Label>Quantity</Field.Label>
                <NumberField.Root defaultValue={1}>
                    <NumberField.Input />
                </NumberField.Root>
                <Field.Error>Too many</Field.Error>
            </Field.Root>
        );
        const input = screen.getByRole('spinbutton', { name: 'Quantity' });
        expect(input).toHaveAttribute('name', 'qty');
        expect(input).toBeRequired();
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('Too many');
    });

    test('a control’s own props win over the field', () => {
        render(
            <Field.Root disabled>
                <Field.Label>Override</Field.Label>
                <Switch.Root disabled={false}><Switch.Thumb /></Switch.Root>
            </Field.Root>
        );
        expect(screen.getByRole('switch', { name: 'Override' })).not.toBeDisabled();
    });
});
