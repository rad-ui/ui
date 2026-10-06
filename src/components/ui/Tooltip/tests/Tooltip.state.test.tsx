import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

describe('Tooltip open state', () => {
    test('Escape closes an open tooltip and the trigger is described by it', async() => {
        const user = userEvent.setup();
        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Helpful hint</Tooltip.Content>
            </Tooltip.Root>
        );

        const trigger = screen.getByText('Trigger');
        await user.tab();
        expect(trigger).toHaveFocus();
        const tooltip = await screen.findByRole('tooltip');
        expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
        expect(trigger).toHaveAccessibleDescription('Helpful hint');

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
        expect(trigger).toHaveAttribute('data-state', 'closed');
        expect(trigger).not.toHaveAttribute('aria-describedby');
    });

    test('supports controlled open and reports changes via onOpenChange', async() => {
        const onOpenChange = jest.fn();
        const { rerender } = render(
            <Tooltip.Root open={false} onOpenChange={onOpenChange}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Hint</Tooltip.Content>
            </Tooltip.Root>
        );

        fireEvent.focus(screen.getByText('Trigger'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        rerender(
            <Tooltip.Root open onOpenChange={onOpenChange}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Hint</Tooltip.Content>
            </Tooltip.Root>
        );
        expect(await screen.findByRole('tooltip')).toHaveTextContent('Hint');
    });

    test('supports defaultOpen', async() => {
        render(
            <Tooltip.Root defaultOpen>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Hint</Tooltip.Content>
            </Tooltip.Root>
        );
        expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });

    test('respects openDelay for hover', () => {
        jest.useFakeTimers();
        try {
            render(
                <Tooltip.Root openDelay={500}>
                    <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                    <Tooltip.Content>Hint</Tooltip.Content>
                </Tooltip.Root>
            );
            fireEvent.mouseEnter(screen.getByText('Trigger'));
            act(() => { jest.advanceTimersByTime(200); });
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
            act(() => { jest.advanceTimersByTime(400); });
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        } finally {
            jest.useRealTimers();
        }
    });

    test('consumer className is merged with the themed class instead of replacing it', async() => {
        render(
            <Tooltip.Root defaultOpen customRootClass="rad-ui">
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content className="custom">Hint</Tooltip.Content>
            </Tooltip.Root>
        );
        const tooltip = await screen.findByRole('tooltip');
        expect(tooltip).toHaveClass('rad-ui-tooltip-floating-element');
        expect(tooltip).toHaveClass('custom');
        expect(tooltip.querySelector('[data-slot="tooltip-arrow"]')).toHaveClass('rad-ui-tooltip-arrow');
    });
});
