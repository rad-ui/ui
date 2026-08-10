import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';

describe('HoverCard controlled switch', () => {
    const hoverCard = (rootProps: Partial<React.ComponentProps<typeof HoverCard.Root>>) => (
        <HoverCard.Root openDelay={0} closeDelay={0} {...rootProps}>
            <HoverCard.Trigger>Trigger</HoverCard.Trigger>
            <HoverCard.Content>Hover content</HoverCard.Content>
        </HoverCard.Root>
    );

    test('switches from uncontrolled to controlled open', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(hoverCard({}));

        await user.hover(screen.getByText('Trigger'));
        await waitFor(() => {
            expect(screen.getByText('Hover content')).toBeInTheDocument();
        });

        rerender(hoverCard({ open: false, onOpenChange }));
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();

        await user.hover(screen.getByText('Trigger'));
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();
    });

    test('switches from controlled open to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(hoverCard({ open: true }));

        expect(screen.getByText('Hover content')).toBeInTheDocument();

        rerender(hoverCard({}));
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();

        await user.hover(screen.getByText('Trigger'));
        await waitFor(() => {
            expect(screen.getByText('Hover content')).toBeInTheDocument();
        });
    });
});
