import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Tooltip from '../Tooltip';
import HoverCard from '../../HoverCard/HoverCard';

describe('side and align on floating content', () => {
    test('Tooltip.Content side/align set the placement and data attributes', async() => {
        render(
            <Tooltip.Root open placement="top">
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content side="bottom" align="start" sideOffset={12}>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        const content = screen.getByText('Tip').closest('[data-slot="tooltip-content"]') as HTMLElement;
        // jsdom has no layout, so pick a side that doesn't flip there.
        await waitFor(() => expect(content).toHaveAttribute('data-side', 'bottom'));
        expect(content).toHaveAttribute('data-align', 'start');
    });

    test('Tooltip without side keeps the Root placement', async() => {
        render(
            <Tooltip.Root open placement="bottom-end">
                <Tooltip.Trigger>Trigger</Tooltip.Trigger>
                <Tooltip.Content>Tip</Tooltip.Content>
            </Tooltip.Root>
        );
        const content = screen.getByText('Tip').closest('[data-slot="tooltip-content"]') as HTMLElement;
        await waitFor(() => expect(content).toHaveAttribute('data-side', 'bottom'));
        expect(content).toHaveAttribute('data-align', 'end');
    });

    test('HoverCard.Content side/align set the placement and data attributes', async() => {
        render(
            <HoverCard.Root open>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content side="top" align="end">Card</HoverCard.Content>
            </HoverCard.Root>
        );
        const content = screen.getByText('Card');
        await waitFor(() => expect(content).toHaveAttribute('data-side', 'top'));
        expect(content).toHaveAttribute('data-align', 'end');
    });

    test('HoverCard.Content defaults to bottom, centred', async() => {
        render(
            <HoverCard.Root open>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        const content = screen.getByText('Card');
        await waitFor(() => expect(content).toHaveAttribute('data-side', 'bottom'));
        expect(content).toHaveAttribute('data-align', 'center');
    });

    test('a style prop on HoverCard.Content keeps its positioning', async() => {
        render(
            <HoverCard.Root open>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Content style={{ color: 'red', position: 'static' }}>Card</HoverCard.Content>
            </HoverCard.Root>
        );
        const content = screen.getByText('Card');
        expect(content.style.color).toBe('red');
        // floating-ui positions it with position: fixed; a consumer style must not undo that.
        expect(content.style.position).toBe('fixed');
    });
});
