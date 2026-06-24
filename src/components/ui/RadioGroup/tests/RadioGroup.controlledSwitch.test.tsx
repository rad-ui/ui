import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RadioGroup from '../RadioGroup';

describe('RadioGroup controlled switch', () => {
    const radioGroup = (rootProps: Partial<React.ComponentProps<typeof RadioGroup.Root>>) => (
        <RadioGroup.Root {...rootProps}>
            <RadioGroup.Item value="one" data-testid="one">One</RadioGroup.Item>
            <RadioGroup.Item value="two" data-testid="two">Two</RadioGroup.Item>
        </RadioGroup.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(radioGroup({ defaultValue: 'one' }));

        expect(screen.getByTestId('one')).toHaveAttribute('aria-checked', 'true');

        rerender(radioGroup({ value: 'two', onValueChange }));

        expect(screen.getByTestId('two')).toHaveAttribute('aria-checked', 'true');

        fireEvent.click(screen.getByTestId('one'));
        expect(onValueChange).toHaveBeenCalledWith('one');
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(radioGroup({ defaultValue: 'one' }));

        rerender(radioGroup({ value: 'two' }));
        expect(screen.getByTestId('two')).toHaveAttribute('aria-checked', 'true');

        rerender(radioGroup({ defaultValue: 'one' }));
        expect(screen.getByTestId('one')).toHaveAttribute('aria-checked', 'true');
    });
});
