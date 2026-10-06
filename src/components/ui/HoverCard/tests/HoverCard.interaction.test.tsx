import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import HoverCard from '../HoverCard';

describe('HoverCard interactions', () => {
    afterEach(() => {
        jest.useRealTimers();
    });

    test('opens when focus lands inside the trigger and closes on blur', async() => {
        const user = userEvent.setup();
        render(
            <>
                <HoverCard.Root openDelay={0} closeDelay={0}>
                    <HoverCard.Trigger><a href="#profile">@radui</a></HoverCard.Trigger>
                    <HoverCard.Content>Card content</HoverCard.Content>
                </HoverCard.Root>
                <button>After</button>
            </>
        );

        await user.tab();
        expect(screen.getByText('@radui')).toHaveFocus();
        expect(await screen.findByText('Card content')).toBeInTheDocument();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Card content')).not.toBeInTheDocument());

        await user.tab();
        expect(screen.getByText('After')).toHaveFocus();
        await user.tab({ shift: true });
        expect(await screen.findByText('Card content')).toBeInTheDocument();

        act(() => screen.getByText('After').focus());
        await waitFor(() => expect(screen.queryByText('Card content')).not.toBeInTheDocument());
    });

    test('a quick pointer pass shorter than openDelay never opens the card', () => {
        jest.useFakeTimers();
        const onOpenChange = jest.fn();
        render(
            <HoverCard.Root openDelay={300} closeDelay={0} onOpenChange={onOpenChange}>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        const trigger = screen.getByText('Trigger');
        fireEvent.mouseEnter(trigger);
        act(() => { jest.advanceTimersByTime(100); });
        fireEvent.mouseLeave(trigger);
        act(() => { jest.advanceTimersByTime(1000); });

        expect(screen.queryByText('Card content')).not.toBeInTheDocument();
        expect(onOpenChange).not.toHaveBeenCalledWith(true);
    });

    test('moving from trigger into content keeps the card open', () => {
        jest.useFakeTimers();
        render(
            <HoverCard.Root openDelay={0} closeDelay={200}>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        fireEvent.mouseEnter(screen.getByText('Trigger'));
        const content = screen.getByText('Card content');
        fireEvent.mouseLeave(screen.getByText('Trigger'));
        act(() => { jest.advanceTimersByTime(50); });
        fireEvent.pointerEnter(content);
        act(() => { jest.advanceTimersByTime(1000); });
        expect(screen.getByText('Card content')).toBeInTheDocument();

        fireEvent.pointerLeave(content);
        act(() => { jest.advanceTimersByTime(250); });
        expect(screen.queryByText('Card content')).not.toBeInTheDocument();
    });

    test('supports defaultOpen and only reports real open changes', () => {
        jest.useFakeTimers();
        const onOpenChange = jest.fn();
        render(
            <HoverCard.Root defaultOpen openDelay={0} closeDelay={0} onOpenChange={onOpenChange}>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        expect(screen.getByText('Card content')).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByText('Trigger'));
        expect(onOpenChange).not.toHaveBeenCalled();

        fireEvent.mouseLeave(screen.getByText('Trigger'));
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    test('trigger wrapper carries no invalid ARIA; axe passes while open', async() => {
        const { container } = render(
            <HoverCard.Root open onOpenChange={() => {}}>
                <HoverCard.Trigger><a href="#profile">@radui</a></HoverCard.Trigger>
                <HoverCard.Content>Card content</HoverCard.Content>
            </HoverCard.Root>
        );

        const trigger = container.querySelector('[data-slot="hover-card-trigger"]')!;
        expect(trigger).not.toHaveAttribute('aria-expanded');
        expect(trigger).not.toHaveAttribute('aria-haspopup');
        expect(screen.getByRole('dialog')).toHaveTextContent('Card content');

        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations.map(v => v.id)).toEqual([]);
    });
});
