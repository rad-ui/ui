import React from 'react';
import { render, screen } from '@testing-library/react';

import Progress from '../Progress';

const ProgressComp = ({ value = 0, maxValue = 100, minValue = 0 }: { value?: number | null, maxValue?: number, minValue?: number }) => {
    return (
        <Progress.Root value={value} maxValue={maxValue} minValue={minValue}>
            <Progress.Indicator />
        </Progress.Root>
    );
};

describe('Progress', () => {
    test('renders progress bar', () => {
        render(<ProgressComp />);
        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars[0]).toBeInTheDocument();
    });

    test('renders progress bar with clamped value', () => {
        const { rerender } = render(<ProgressComp value={110} maxValue={100} minValue={0} />);
        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars[0]).toHaveAttribute('aria-valuenow', '110'); // Root doesn't clamp, indicator does

        rerender(<ProgressComp value={100} maxValue={100} minValue={0} />);
        const updatedProgressBars = screen.getAllByRole('progressbar');
        expect(updatedProgressBars[0]).toHaveAttribute('aria-valuenow', '100');
    });

    test('renders progress bar when minValue is greater than maxValue', () => {
        render(<ProgressComp minValue={100} maxValue={0} />);
        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars[0]).toHaveAttribute('aria-valuenow', '0');
    });

    test('binds value to progress bar', () => {
        const { rerender } = render(<ProgressComp value={100} maxValue={100} minValue={0} />);
        const progressBars = screen.getAllByRole('progressbar');
        expect(progressBars[0]).toHaveAttribute('aria-valuenow', '100');

        rerender(<ProgressComp value={2} maxValue={100} minValue={0} />);
        const updatedProgressBars = screen.getAllByRole('progressbar');
        expect(updatedProgressBars[0]).toHaveAttribute('aria-valuenow', '2');
    });

    describe('Data Attributes', () => {
        describe('ProgressRoot data attributes', () => {
            test('renders with correct data-state when loading', () => {
                render(<ProgressComp value={50} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0]; // First progressbar is the root
                expect(root).toHaveAttribute('data-state', 'loading');
            });

            test('renders with correct data-state when complete', () => {
                render(<ProgressComp value={100} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'complete');
            });

            test('renders with correct data-state when indeterminate (value is null)', () => {
                render(<ProgressComp value={null} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'indeterminate');
            });

            test('renders with correct data-value', () => {
                render(<ProgressComp value={75} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-value', '75');
            });

            test('renders with correct data-max', () => {
                render(<ProgressComp value={50} maxValue={200} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-max', '200');
            });

            test('renders with correct data-min', () => {
                render(<ProgressComp value={50} maxValue={100} minValue={10} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-min', '10');
            });

            test('renders with correct data attributes for custom range', () => {
                render(<ProgressComp value={25} maxValue={50} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'loading');
                expect(root).toHaveAttribute('data-value', '25');
                expect(root).toHaveAttribute('data-max', '50');
                expect(root).toHaveAttribute('data-min', '0');
            });
        });

        describe('ProgressIndicator data attributes', () => {
            test('indicator renders with correct data-state when loading', () => {
                render(<ProgressComp value={50} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1]; // Second progressbar is the indicator
                expect(indicator).toHaveAttribute('data-state', 'loading');
            });

            test('indicator renders with correct data-state when complete', () => {
                render(<ProgressComp value={100} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-state', 'complete'); // Indicator now shows actual state
            });

            test('indicator renders with correct data-state when indeterminate', () => {
                render(<ProgressComp value={null} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-state', 'indeterminate'); // Indicator now shows actual state
            });

            test('indicator renders with correct data-value (bounded)', () => {
                render(<ProgressComp value={75} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-value', '75');
            });

            test('indicator renders with bounded data-value when value exceeds max', () => {
                render(<ProgressComp value={150} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-value', '100'); // Bounded to maxValue
            });

            test('indicator renders with bounded data-value when value below min', () => {
                render(<ProgressComp value={-10} maxValue={100} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-value', '0'); // Bounded to minValue
            });

            test('indicator renders with correct data-max', () => {
                render(<ProgressComp value={50} maxValue={200} minValue={0} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-max', '200');
            });

            test('indicator renders with correct data-min', () => {
                render(<ProgressComp value={50} maxValue={100} minValue={10} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-min', '10');
            });

            test('indicator renders with all correct data attributes', () => {
                render(<ProgressComp value={30} maxValue={60} minValue={10} />);
                const progressBars = screen.getAllByRole('progressbar');
                const indicator = progressBars[1];
                expect(indicator).toHaveAttribute('data-state', 'loading');
                expect(indicator).toHaveAttribute('data-value', '30');
                expect(indicator).toHaveAttribute('data-max', '60');
                expect(indicator).toHaveAttribute('data-min', '10');
            });
        });

        describe('State transitions', () => {
            test('transitions from loading to complete state', () => {
                const { rerender } = render(<ProgressComp value={50} maxValue={100} minValue={0} />);
                let progressBars = screen.getAllByRole('progressbar');
                let root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'loading');

                rerender(<ProgressComp value={100} maxValue={100} minValue={0} />);
                progressBars = screen.getAllByRole('progressbar');
                root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'complete');
            });

            test('transitions from complete to loading state', () => {
                const { rerender } = render(<ProgressComp value={100} maxValue={100} minValue={0} />);
                let progressBars = screen.getAllByRole('progressbar');
                let root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'complete');

                rerender(<ProgressComp value={80} maxValue={100} minValue={0} />);
                progressBars = screen.getAllByRole('progressbar');
                root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'loading');
            });

            test('transitions to indeterminate state when value is null', () => {
                const { rerender } = render(<ProgressComp value={50} maxValue={100} minValue={0} />);
                let progressBars = screen.getAllByRole('progressbar');
                let root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'loading');

                rerender(<ProgressComp value={null} maxValue={100} minValue={0} />);
                progressBars = screen.getAllByRole('progressbar');
                root = progressBars[0];
                expect(root).toHaveAttribute('data-state', 'indeterminate');
            });
        });
    });

    // TODO: Add color test after supporting color prop
    // test('renders progress bar with correct color', () => {
    //     render(<ProgressComp color='blue' />);
    //     expect(screen.getByRole('progressbar')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    // });
});
