import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip lazy mount', () => {
    test('does not mount tooltip content until opened', () => {
        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                <Tooltip.Content data-testid="tooltip-content">Tooltip label</Tooltip.Content>
            </Tooltip.Root>
        );

        expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument();
    });

    test('mounts content after hover opens the tooltip', async() => {
        const user = userEvent.setup();

        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Hover me</Tooltip.Trigger>
                <Tooltip.Content>Tooltip label</Tooltip.Content>
            </Tooltip.Root>
        );

        await act(async() => {
            await user.hover(screen.getByText('Hover me'));
        });
        await waitFor(() => {
            expect(screen.getByText('Tooltip label')).toBeInTheDocument();
        });
    });
});
