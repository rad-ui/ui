import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

describe('Progress', () => {
    test('renders component', () => {
        render(<Progress value={0} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('renders component with clamped value', () => {
        const { rerender } = render(<Progress value={-6} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

        rerender(<Progress value={496} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
    });

    test('renders component when minValue is greater than maxValue', () => {
        render(<Progress value={3} minValue={5} maxValue={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
    });

    test('binds value to component', () => {
        const { rerender } = render(<Progress value={1} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');

        rerender(<Progress value={2} minValue={0} maxValue={100} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
    });
});
