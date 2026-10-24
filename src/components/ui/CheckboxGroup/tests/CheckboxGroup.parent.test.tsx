import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxGroup from '../CheckboxGroup';

const TOPPINGS = ['cheese', 'olives', 'basil'];

const Toppings = (props: Partial<React.ComponentProps<typeof CheckboxGroup.Root>>) => (
    <CheckboxGroup.Root allValues={TOPPINGS} name="toppings" {...props}>
        <CheckboxGroup.Label>
            <CheckboxGroup.Trigger parent aria-label="All toppings"><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>
            All toppings
        </CheckboxGroup.Label>
        {TOPPINGS.map((topping) => (
            <CheckboxGroup.Label key={topping}>
                <CheckboxGroup.Trigger value={topping} aria-label={topping}><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>
                {topping}
            </CheckboxGroup.Label>
        ))}
    </CheckboxGroup.Root>
);

describe('CheckboxGroup parent checkbox', () => {
    test('is mixed when some items are checked and checked when all are', async() => {
        const user = userEvent.setup();
        render(<Toppings defaultValue={['cheese']} />);
        const all = screen.getByRole('checkbox', { name: 'All toppings' });
        expect(all).toHaveAttribute('aria-checked', 'mixed');
        expect(all).toHaveAttribute('data-state', 'indeterminate');

        await user.click(screen.getByRole('checkbox', { name: 'olives' }));
        await user.click(screen.getByRole('checkbox', { name: 'basil' }));
        expect(all).toHaveAttribute('aria-checked', 'true');
    });

    test('checks every item, then clears them all', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Toppings onValueChange={onValueChange} />);
        const all = screen.getByRole('checkbox', { name: 'All toppings' });
        expect(all).toHaveAttribute('aria-checked', 'false');

        await user.click(all);
        expect(onValueChange).toHaveBeenLastCalledWith(['cheese', 'olives', 'basil']);
        TOPPINGS.forEach((topping) => expect(screen.getByRole('checkbox', { name: topping })).toHaveAttribute('aria-checked', 'true'));

        await user.click(all);
        expect(onValueChange).toHaveBeenLastCalledWith([]);
    });

    test('a mixed parent checks the rest', async() => {
        const user = userEvent.setup();
        const onValueChange = jest.fn();
        render(<Toppings defaultValue={['basil']} onValueChange={onValueChange} />);
        await user.click(screen.getByRole('checkbox', { name: 'All toppings' }));
        expect(onValueChange.mock.calls.at(-1)[0].sort()).toEqual(['basil', 'cheese', 'olives']);
    });

    test('the parent submits nothing of its own', () => {
        const { container } = render(<form><Toppings defaultValue={['cheese']} /></form>);
        const data = new FormData(container.querySelector('form') as HTMLFormElement);
        expect(data.getAll('toppings')).toEqual(['cheese']);
    });
});
