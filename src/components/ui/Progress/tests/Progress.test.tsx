import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

const ProgressComp = ({ value = 0, maxValue = 100, minValue = 0 }: { value?: number, maxValue?: number, minValue?: number }) => {
    return (
        <Progress.Root value={value} maxValue={maxValue} minValue={minValue}>
            <Progress.Indicator />
        </Progress.Root>
    );
};

describe('Progress', () => {
    test('renders progress bar', () => {
        render(<ProgressComp />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders progress bar with clamped value', () => {
        const { rerender } = render(<ProgressComp value={110} maxValue={100} minValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

        rerender(<ProgressComp value={100} maxValue={100} minValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    test('renders progress bar when minValue is greater than maxValue', () => {
        render(<ProgressComp minValue={100} maxValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    test('binds value to progress bar', () => {
        const { rerender } = render(<ProgressComp value={100} maxValue={100} minValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');

        rerender(<ProgressComp value={2} maxValue={100} minValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
    });

    // TODO: Add color test after supporting color prop
    // test('renders progress bar with correct color', () => {
    //     render(<ProgressComp color='blue' />);
    //     expect(screen.getByRole('progressbar')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    // });
});
