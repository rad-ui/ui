import React from 'react';
import { render, screen } from '@testing-library/react';
import Steps from '../Steps';

describe('Steps controlled switch', () => {
    const steps = (rootProps: React.ComponentProps<typeof Steps.Root>) => (
        <Steps.Root {...rootProps}>
            <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
            <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
            <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
        </Steps.Root>
    );

    test('switches from uncontrolled defaultValue to controlled value', () => {
        const onValueChange = jest.fn();

        const { rerender } = render(steps({ defaultValue: 1 }));

        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'active');

        rerender(steps({ value: 2, onValueChange }));

        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'active');
        expect(onValueChange).not.toHaveBeenCalled();
    });

    test('switches from controlled value to uncontrolled defaultValue', () => {
        const { rerender } = render(steps({ value: 2 }));

        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'active');

        rerender(steps({ defaultValue: 0 }));

        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'active');
    });
});
