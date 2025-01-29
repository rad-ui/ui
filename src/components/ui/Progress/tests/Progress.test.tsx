import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

describe('Progress', () => {
    test('renders progress bar', () => {
        render(<Progress value={0} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders progress bar with clamped value', () => {
        const { rerender } = render(<Progress value={-6} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

        rerender(<Progress value={496} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    test('renders progress bar when minValue is greater than maxValue', () => {
        render(<Progress value={3} minValue={5} maxValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    test('binds value to progress bar', () => {
        const { rerender } = render(<Progress value={1} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');

        rerender(<Progress value={2} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
    });

    test('renders progress bar with correct color', () => {
        render(<Progress value={2} color='blue' />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('data-accent-color', 'blue');
    });
});
