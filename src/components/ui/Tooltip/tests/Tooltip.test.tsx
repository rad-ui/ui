import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
    test('renders component', () => {
        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                <Tooltip.Content>label</Tooltip.Content>
            </Tooltip.Root>
        );
        expect(screen.getByText('Hover me')).toBeInTheDocument();
        expect(screen.queryByText('label')).not.toBeInTheDocument();
    });

    describe('Labels', () => {
        test('renders tooltip on hover and hides on unhover', async() => {
            render(
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>label</Tooltip.Content>
                </Tooltip.Root>
            );
            // tooltip is initially hidden
            expect(screen.queryByText('label')).not.toBeInTheDocument();
            const text = screen.getByText('Hover me');
            // hover over the trigger text
            await userEvent.hover(text);
            // tooltip is visible now
            expect(screen.getByText('label')).toBeInTheDocument();
            // unhover from the trigger text
            await userEvent.unhover(text);
            // tooltip is hidden again
            expect(screen.queryByText('label')).not.toBeInTheDocument();
        });

        test('renders tooltip with empty content', async() => {
            render(
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>{''}</Tooltip.Content>
                </Tooltip.Root>
            );
            // tooltip is initially hidden
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            const text = screen.getByText('Hover me');
            // hover over the trigger text
            await userEvent.hover(text);
            // tooltip is visible now
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
            // unhover from the trigger text
            await userEvent.unhover(text);
            // tooltip is hidden again
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });

        test('renders tooltip with different content types', async() => {
            const { rerender } = render(
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>{42}</Tooltip.Content>
                </Tooltip.Root>
            );
            // hover over the trigger text
            await userEvent.hover(screen.getByText('Hover me'));
            // tooltip renders without throwing an error
            expect(screen.getByText('42')).toBeInTheDocument();

            rerender(
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>{String(true)}</Tooltip.Content>
                </Tooltip.Root>
            );
            // hover over the trigger text
            await userEvent.hover(screen.getByText('Hover me'));
            // tooltip renders with the string representation of boolean
            expect(screen.getByText('true')).toBeInTheDocument();

            rerender(
                <Tooltip.Root>
                    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                    <Tooltip.Content>{null}</Tooltip.Content>
                </Tooltip.Root>
            );
            // hover over the trigger text
            await userEvent.hover(screen.getByText('Hover me'));
            // empty tooltip renders without throwing an error
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });
    });
});
