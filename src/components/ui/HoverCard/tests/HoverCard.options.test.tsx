import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import HoverCard from '../HoverCard';

const card = () => screen.queryByText('Card');

describe('HoverCard options', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    test('onOpenChange gets the reason and can cancel', () => {
        const spy = jest.fn();
        render(
            <HoverCard.Root openDelay={0} onOpenChange={(open, details) => { spy(open, details.reason); if (open) details.cancel(); }}>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        fireEvent.mouseEnter(screen.getByText('Trigger'));
        expect(spy).toHaveBeenCalledWith(true, 'trigger-hover');
        expect(card()).toBeNull();
    });

    test('focus opens with reason trigger-focus', () => {
        const spy = jest.fn();
        render(
            <HoverCard.Root openDelay={0} onOpenChange={(open, details) => spy(open, details.reason)}>
                <HoverCard.Trigger tabIndex={0}>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        fireEvent.focus(screen.getByText('Trigger'));
        expect(spy).toHaveBeenCalledWith(true, 'trigger-focus');
    });

    test('a trigger delay overrides the Root openDelay', () => {
        render(
            <HoverCard.Root openDelay={1000}>
                <HoverCard.Trigger delay={50}>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        fireEvent.mouseEnter(screen.getByText('Trigger'));
        act(() => { jest.advanceTimersByTime(60); });
        expect(card()).not.toBeNull();
    });

    test('a trigger closeDelay overrides the Root closeDelay', () => {
        render(
            <HoverCard.Root openDelay={0} closeDelay={1000}>
                <HoverCard.Trigger closeDelay={0}>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        fireEvent.mouseEnter(screen.getByText('Trigger'));
        expect(card()).not.toBeNull();
        fireEvent.mouseLeave(screen.getByText('Trigger'));
        act(() => { jest.advanceTimersByTime(10); });
        expect(card()).toBeNull();
    });

    test('positionMethod and anchor', async() => {
        jest.useRealTimers();
        const anchor = { getBoundingClientRect: () => ({ x: 300, y: 40, left: 300, top: 40, right: 310, bottom: 50, width: 10, height: 10, toJSON: () => ({}) }) };
        render(
            <HoverCard.Root open>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content positionMethod="absolute" anchor={anchor} collisionAvoidance={{ side: 'none', align: 'none' }}>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        const el = screen.getByText('Card');
        await waitFor(() => expect(el.style.position).toBe('absolute'));
        await waitFor(() => expect(`${el.style.left} ${el.style.transform}`).toMatch(/305px/));
    });
});
