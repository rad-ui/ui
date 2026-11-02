import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxGroup from '../CheckboxGroup';

const Fruits = (props: { onKeyDown?: (event: React.KeyboardEvent) => void }) => (
    <CheckboxGroup.Root defaultValue={[]} name="fruit">
        {['apple', 'pear', 'plum'].map((fruit) => (
            <CheckboxGroup.Label key={fruit}>
                <CheckboxGroup.Trigger value={fruit} onKeyDown={props.onKeyDown}>
                    <CheckboxGroup.Indicator />
                </CheckboxGroup.Trigger>
                {fruit}
            </CheckboxGroup.Label>
        ))}
    </CheckboxGroup.Root>
);

describe('CheckboxGroup keyboard', () => {
    test('Space toggles an item and Enter does not', async() => {
        const user = userEvent.setup();
        render(<Fruits />);
        const [apple] = screen.getAllByRole('checkbox');

        await user.tab();
        expect(apple).toHaveFocus();
        await user.keyboard('{Enter}');
        expect(apple).toHaveAttribute('aria-checked', 'false');
        await user.keyboard(' ');
        expect(apple).toHaveAttribute('aria-checked', 'true');
    });

    test('a consumer onKeyDown runs without breaking arrow-key navigation', async() => {
        const user = userEvent.setup();
        const onKeyDown = jest.fn();
        render(<Fruits onKeyDown={onKeyDown} />);
        const [apple, pear] = screen.getAllByRole('checkbox');

        await user.tab();
        expect(apple).toHaveFocus();
        await user.keyboard('{ArrowDown}');
        expect(pear).toHaveFocus();
        expect(onKeyDown).toHaveBeenCalled();
    });
});
