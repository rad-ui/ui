import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';
import axe from 'axe-core';

describe('Tooltip interactions', () => {
    test('shows on hover/focus and hides on leave/blur/escape with correct attributes', async() => {
        render(
            <Tooltip.Root>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Content</Tooltip.Content>
            </Tooltip.Root>
        );

        const trigger = screen.getByText('Trigger');
        expect(trigger).toHaveAttribute('data-state', 'closed');

        await userEvent.hover(trigger);
        const tooltip = await screen.findByRole('tooltip');
        expect(tooltip).toHaveAttribute('data-state', 'open');
        expect(trigger).toHaveAttribute('data-state', 'open');

        await userEvent.unhover(trigger);
        await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
        expect(trigger).toHaveAttribute('data-state', 'closed');

        trigger.focus();
        const tooltipFocus = await screen.findByRole('tooltip');
        expect(tooltipFocus).toBeInTheDocument();

        trigger.blur();
        await waitFor(() => expect(screen.queryByRole('tooltip')).toBeNull());
    });

    test('asChild trigger preserves element and forwards refs', async() => {
        const childRef = React.createRef<HTMLAnchorElement>();
        const triggerRef = React.createRef<HTMLAnchorElement>();

        render(
            <Tooltip.Root>
                <Tooltip.Trigger asChild ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}>
                    <a href="#anchor" ref={childRef}>link</a>
                </Tooltip.Trigger>
                <Tooltip.Content>tip</Tooltip.Content>
            </Tooltip.Root>
        );

        const trigger = screen.getByText('link');
        expect(trigger.tagName).toBe('A');
        expect(triggerRef.current).toBe(trigger);
        expect(childRef.current).toBe(trigger);

        await userEvent.hover(trigger);
        expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });

    test('axe: no violations when tooltip is shown', async() => {
        const { container } = render(
            <Tooltip.Root>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Accessible</Tooltip.Content>
            </Tooltip.Root>
        );

        await userEvent.hover(screen.getByText('Trigger'));
        const results = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } });
        expect(results.violations).toHaveLength(0);
    });

    test('does not open when trigger is disabled', async() => {
        render(
            <Tooltip.Root>
                <Tooltip.Trigger disabled>Disabled</Tooltip.Trigger>
                <Tooltip.Content>Hidden</Tooltip.Content>
            </Tooltip.Root>
        );

        const trigger = screen.getByText('Disabled');
        trigger.focus();
        expect(screen.queryByRole('tooltip')).toBeNull();
    });

    test('renders in rtl without issues', async() => {
        render(
            <div dir="rtl">
                <Tooltip.Root placement="bottom-start">
                    <Tooltip.Trigger>RTL</Tooltip.Trigger>
                    <Tooltip.Content>direction</Tooltip.Content>
                </Tooltip.Root>
            </div>
        );

        const trigger = screen.getByText('RTL');
        await userEvent.hover(trigger);
        expect(await screen.findByRole('tooltip')).toBeInTheDocument();
    });
});
