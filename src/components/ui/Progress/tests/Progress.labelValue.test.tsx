import React from 'react';
import { render, screen } from '@testing-library/react';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Progress from '../Progress';
import Meter from '~/components/ui/Meter/Meter';

describe('Progress and Meter Label and Value', () => {
    test('Progress is named by its Label and shows a percentage', async() => {
        const { container } = render(
            <Progress.Root value={30}>
                <Progress.Label>Uploading</Progress.Label>
                <Progress.Value />
                <Progress.Indicator />
            </Progress.Root>
        );
        const bar = screen.getByRole('progressbar', { name: 'Uploading' });
        expect(bar).toBeInTheDocument();
        expect(screen.getByText('30%')).toHaveAttribute('aria-hidden', 'true');
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('format sets the value text and the Value part', () => {
        render(
            <Progress.Root value={512} maxValue={1024} format={{ style: 'unit', unit: 'megabyte' }} locale="en-US">
                <Progress.Label>Download</Progress.Label>
                <Progress.Value />
                <Progress.Indicator />
            </Progress.Root>
        );
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuetext', '512 MB');
        expect(screen.getByText('512 MB')).toBeInTheDocument();
    });

    test('Value accepts a render function', () => {
        render(
            <Progress.Root value={3} maxValue={10}>
                <Progress.Value>{(_formatted, value) => `${value} of 10 files`}</Progress.Value>
                <Progress.Indicator />
            </Progress.Root>
        );
        expect(screen.getByText('3 of 10 files')).toBeInTheDocument();
    });

    test('Meter gets the same parts', () => {
        render(
            <Meter.Root value={0.72} maxValue={1} format={{ style: 'percent' }} locale="en-US">
                <Meter.Label>Storage used</Meter.Label>
                <Meter.Value />
                <Meter.Indicator />
            </Meter.Root>
        );
        const meter = screen.getByRole('meter', { name: 'Storage used' });
        expect(meter).toHaveAttribute('aria-valuetext', '72%');
        expect(screen.getByText('72%')).toBeInTheDocument();
    });

    test('a Track holds the indicator so Label and Value sit outside the bar', () => {
        render(
            <Progress.Root value={50}>
                <Progress.Label>Sync</Progress.Label>
                <Progress.Value />
                <Progress.Track data-testid="track">
                    <Progress.Indicator data-testid="indicator" />
                </Progress.Track>
            </Progress.Root>
        );
        expect(screen.getByTestId('track')).toContainElement(screen.getByTestId('indicator'));
        expect(screen.getByTestId('track')).toHaveAttribute('data-slot', 'progress-track');
    });
});
