import React from 'react';
import { render, screen } from '@testing-library/react';
import Meter from '../Meter';

const MeterComp = ({
    value = 50,
    minValue = 0,
    maxValue = 100,
    lowValue,
    highValue,
    optimumValue
}: Partial<React.ComponentProps<typeof Meter.Root>>) => (
    <Meter.Root
        value={value}
        minValue={minValue}
        maxValue={maxValue}
        lowValue={lowValue}
        highValue={highValue}
        optimumValue={optimumValue}
    >
        <Meter.Indicator data-testid="meter-indicator" />
    </Meter.Root>
);

describe('Meter', () => {
    test('renders a meter root', () => {
        render(<MeterComp />);
        expect(screen.getByRole('meter')).toBeInTheDocument();
    });

    test('forwards refs to root and indicator elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const indicatorRef = React.createRef<HTMLDivElement>();

        render(
            <Meter.Root ref={rootRef} value={40}>
                <Meter.Indicator ref={indicatorRef} />
            </Meter.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(indicatorRef.current).toBeInstanceOf(HTMLDivElement);
    });

    test('sets ARIA value attributes', () => {
        render(<MeterComp value={45} minValue={10} maxValue={90} />);
        const meter = screen.getByRole('meter');

        expect(meter).toHaveAttribute('aria-valuenow', '45');
        expect(meter).toHaveAttribute('aria-valuemin', '10');
        expect(meter).toHaveAttribute('aria-valuemax', '90');
    });

    test('uses getValueLabel for aria-valuetext', () => {
        render(
            <Meter.Root
                value={8}
                minValue={0}
                maxValue={10}
                getValueLabel={(value, minValue, maxValue) => `${value - minValue} of ${maxValue - minValue}`}
            >
                <Meter.Indicator />
            </Meter.Root>
        );

        expect(screen.getByRole('meter')).toHaveAttribute('aria-valuetext', '8 of 10');
    });

    test('clamps public value attributes to the configured range', () => {
        render(<MeterComp value={120} maxValue={100} />);
        expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100');
        expect(screen.getByTestId('meter-indicator')).toHaveAttribute('data-value', '100');
    });

    test('exposes threshold data attributes', () => {
        render(<MeterComp value={50} lowValue={25} highValue={75} optimumValue={60} />);
        const meter = screen.getByRole('meter');

        expect(meter).toHaveAttribute('data-low', '25');
        expect(meter).toHaveAttribute('data-high', '75');
        expect(meter).toHaveAttribute('data-optimum', '60');
    });

    test('sets low, normal, high, and optimum data states', () => {
        const { rerender } = render(<MeterComp value={20} lowValue={30} highValue={80} />);
        expect(screen.getByRole('meter')).toHaveAttribute('data-state', 'low');

        rerender(<MeterComp value={50} lowValue={30} highValue={80} />);
        expect(screen.getByRole('meter')).toHaveAttribute('data-state', 'normal');

        rerender(<MeterComp value={90} lowValue={30} highValue={80} />);
        expect(screen.getByRole('meter')).toHaveAttribute('data-state', 'high');

        rerender(<MeterComp value={60} optimumValue={60} />);
        expect(screen.getByRole('meter')).toHaveAttribute('data-state', 'optimum');
    });

    test('supports asChild on root and indicator', () => {
        render(
            <Meter.Root value={50} asChild>
                <section data-testid="meter-root">
                    <Meter.Indicator asChild>
                        <span data-testid="meter-indicator" />
                    </Meter.Indicator>
                </section>
            </Meter.Root>
        );

        expect(screen.getByTestId('meter-root')).toHaveAttribute('role', 'meter');
        expect(screen.getByTestId('meter-indicator')).toHaveAttribute('data-value', '50');
    });
});
