import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

const Toppings = (props: Omit<React.ComponentProps<typeof Select.Root>, 'children'>) => (
    <Select.Root multiple {...props}>
        <Select.Trigger>Pick toppings</Select.Trigger>
        <Select.Content>
            <Select.Item value="cheese">Cheese</Select.Item>
            <Select.Item value="olives">Olives</Select.Item>
            <Select.Item value="basil">Basil</Select.Item>
        </Select.Content>
    </Select.Root>
);

describe('Select multiple', () => {
    test('toggles values and stays open', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Toppings onValueChange={onValueChange} />);
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');

        await user.click(screen.getByRole('option', { name: 'Cheese' }));
        await user.click(screen.getByRole('option', { name: 'Basil' }));
        expect(onValueChange).toHaveBeenLastCalledWith(['cheese', 'basil']);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Cheese' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('option', { name: 'Olives' })).toHaveAttribute('aria-selected', 'false');

        await user.click(screen.getByRole('option', { name: 'Cheese' }));
        expect(onValueChange).toHaveBeenLastCalledWith(['basil']);
    });

    test('the trigger lists the selected labels', async() => {
        render(<Toppings defaultValue={['olives', 'cheese']} />);
        expect(screen.getByRole('combobox')).toHaveTextContent('Olives, Cheese');
        expect(screen.getByRole('combobox')).not.toHaveAttribute('data-placeholder');
    });

    test('renderValue receives the arrays', () => {
        render(
            <Select.Root multiple defaultValue={['cheese', 'basil']}>
                <Select.Trigger renderValue={(values: string[]) => `${values.length} toppings`}>Pick</Select.Trigger>
                <Select.Content>
                    <Select.Item value="cheese">Cheese</Select.Item>
                    <Select.Item value="basil">Basil</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        expect(screen.getByRole('combobox')).toHaveTextContent('2 toppings');
    });

    test('shows the placeholder with nothing selected', () => {
        render(<Toppings />);
        expect(screen.getByRole('combobox')).toHaveTextContent('Pick toppings');
        expect(screen.getByRole('combobox')).toHaveAttribute('data-placeholder');
    });

    test('Enter toggles the active option from the keyboard', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Toppings onValueChange={onValueChange} />);
        screen.getByRole('combobox').focus();
        await user.keyboard('{Enter}');
        const first = await screen.findByRole('option', { name: 'Cheese' });
        fireEvent.keyDown(first, { key: 'Enter' });
        expect(onValueChange).toHaveBeenLastCalledWith(['cheese']);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    test('controlled value drives the selection', async() => {
        const { rerender } = render(<Toppings value={['basil']} onValueChange={() => {}} />);
        expect(screen.getByRole('combobox')).toHaveTextContent('Basil');
        rerender(<Toppings value={['basil', 'olives']} onValueChange={() => {}} />);
        expect(screen.getByRole('combobox')).toHaveTextContent('Basil, Olives');
    });

    test('submits every selected value under the same name', () => {
        const onSubmit = jest.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
        render(
            <form onSubmit={onSubmit} data-testid="form">
                <Toppings name="toppings" defaultValue={['cheese', 'basil']} />
            </form>
        );
        const data = new FormData(screen.getByTestId('form') as HTMLFormElement);
        expect(data.getAll('toppings')).toEqual(['cheese', 'basil']);
    });

    test('single Select still closes after a pick', async() => {
        const user = userEvent.setup();
        render(
            <Select.Root>
                <Select.Trigger>Pick</Select.Trigger>
                <Select.Content>
                    <Select.Item value="a">A</Select.Item>
                </Select.Content>
            </Select.Root>
        );
        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByRole('option', { name: 'A' }));
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
});
