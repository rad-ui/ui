import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from '../Tooltip';

const virtualAnchor = (x: number, y: number) => ({
    getBoundingClientRect: () => ({ x, y, left: x, top: y, right: x + 10, bottom: y + 10, width: 10, height: 10, toJSON: () => ({}) })
});

const content = () => screen.queryByText('Tip')?.closest('[data-slot="tooltip-content"]') as HTMLElement | null ?? null;

describe('Tooltip options', () => {
    test('disabled never opens on focus or hover', async() => {
        const user = userEvent.setup();
        render(
            <Tooltip.Root disabled>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        await user.tab();
        await user.hover(screen.getByText('Trigger'));
        expect(content()).toBeNull();
    });

    test('turning disabled on closes an open tooltip', async() => {
        const spy = jest.fn();
        const onOpenChange = (open: boolean, details: unknown) => spy(open, details);
        const { rerender } = render(
            <Tooltip.Root defaultOpen onOpenChange={onOpenChange}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        expect(content()).not.toBeNull();
        rerender(
            <Tooltip.Root defaultOpen disabled onOpenChange={onOpenChange}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        expect(spy).toHaveBeenLastCalledWith(false, expect.anything());
    });

    test('a disabled trigger does not open the tooltip', async() => {
        const user = userEvent.setup();
        render(
            <Tooltip.Root>
                <Tooltip.Trigger disabled>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        fireEvent.focus(screen.getByText('Trigger'));
        await user.hover(screen.getByText('Trigger'));
        expect(content()).toBeNull();
    });

    test('clicking the trigger closes the tooltip by default', async() => {
        const spy = jest.fn();
        const onOpenChange = (open: boolean, details: unknown) => spy(open, details);
        render(
            <Tooltip.Root defaultOpen onOpenChange={onOpenChange}>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        fireEvent.click(screen.getByText('Trigger'));
        expect(spy).toHaveBeenLastCalledWith(false, expect.objectContaining({ reason: 'trigger-press' }));
    });

    test('closeOnClick={false} keeps it open on click', () => {
        const spy = jest.fn();
        const onOpenChange = (open: boolean, details: unknown) => spy(open, details);
        render(
            <Tooltip.Root defaultOpen onOpenChange={onOpenChange}>
                <Tooltip.Trigger closeOnClick={false}>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        fireEvent.click(screen.getByText('Trigger'));
        expect(spy).not.toHaveBeenCalledWith(false, expect.anything());
        expect(content()).not.toBeNull();
    });

    test('positionMethod sets the CSS position', async() => {
        render(
            <Tooltip.Root open>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content positionMethod="absolute">Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        await waitFor(() => expect(content()!.style.position).toBe('absolute'));
    });

    test('anchor positions against a virtual element', async() => {
        render(
            <Tooltip.Root open>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content side="bottom" anchor={virtualAnchor(200, 300)}>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        await waitFor(() => {
            const style = content()!.style;
            const box = `${style.left} ${style.top} ${style.transform}`;
            expect(box).toMatch(/200px/);
        });
    });

    test('an inline anchor function does not loop', async() => {
        const anchor = jest.fn(() => virtualAnchor(50, 60));
        render(
            <Tooltip.Root open>
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content anchor={() => anchor()} collisionAvoidance={{ side: 'none' }}>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        await act(async() => { await new Promise(resolve => setTimeout(resolve, 30)); });
        expect(content()).not.toBeNull();
        expect(anchor.mock.calls.length).toBeLessThan(20);
    });
});
