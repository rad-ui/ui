import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Popover from '../Popover';

const anchor = { getBoundingClientRect: () => ({ x: 400, y: 100, left: 400, top: 100, right: 420, bottom: 120, width: 20, height: 20, toJSON: () => ({}) }) };

describe('Popover positioning and trigger options', () => {
    test('anchor, positionMethod and collisionAvoidance', async() => {
        render(
            <Popover.Root open>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content positionMethod="absolute" anchor={anchor} collisionAvoidance={{ side: 'none', align: 'none' }}>Body</Popover.Content>
            </Popover.Root>
        );
        const content = screen.getByText('Body').closest('[role="dialog"]') as HTMLElement;
        await waitFor(() => expect(content.style.position).toBe('absolute'));
        await waitFor(() => expect(`${content.style.left} ${content.style.top} ${content.style.transform}`).toMatch(/410px|120px/));
    });

    test('an inline anchor function and collisionAvoidance object do not loop', async() => {
        render(
            <Popover.Root open>
                <Popover.Trigger>Open</Popover.Trigger>
                <Popover.Content anchor={() => anchor} collisionAvoidance={{ side: 'flip' }} sticky>Body</Popover.Content>
            </Popover.Root>
        );
        await act(async() => { await new Promise(resolve => setTimeout(resolve, 30)); });
        expect(screen.getByText('Body')).toBeInTheDocument();
    });

    test('openOnHover on the trigger, with its own delay', () => {
        jest.useFakeTimers();
        try {
            render(
                <Popover.Root>
                    <Popover.Trigger openOnHover delay={20}>Open</Popover.Trigger>
                    <Popover.Content>Body</Popover.Content>
                </Popover.Root>
            );
            fireEvent.mouseEnter(screen.getByText('Open'));
            fireEvent.mouseMove(screen.getByText('Open'));
            act(() => { jest.advanceTimersByTime(30); });
            expect(screen.getByText('Body')).toBeInTheDocument();
        } finally {
            jest.useRealTimers();
        }
    });
});
