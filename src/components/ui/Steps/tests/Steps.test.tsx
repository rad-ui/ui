import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from '../Steps';

describe('Steps Component', () => {
    it('sets correct data-state based on currentStep', () => {
        const { rerender } = render(
            <Steps.Root value={1} onValueChange={() => {}}>
                <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );

        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'active');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'inactive');

        rerender(
            <Steps.Root value={2} onValueChange={() => {}}>
                <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );

        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'active');
    });

    it('supports customRootClass', () => {
        render(
            <Steps.Root customRootClass="custom-steps" data-testid="steps-root">
                <Steps.Item value={0}>Step 0</Steps.Item>
            </Steps.Root>
        );
        expect(screen.getByTestId('steps-root')).toHaveClass('custom-steps-steps');
    });
});
