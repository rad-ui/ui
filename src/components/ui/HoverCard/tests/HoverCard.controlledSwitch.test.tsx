import React from 'react';
import { render, screen } from '@testing-library/react';
import HoverCard from '../HoverCard';

describe('HoverCard controlled switch', () => {
    const hoverCard = (rootProps: Partial<React.ComponentProps<typeof HoverCard.Root>>) => (
        <HoverCard.Root {...rootProps}>
            <HoverCard.Trigger>Trigger</HoverCard.Trigger>
            <HoverCard.Content>Hover content</HoverCard.Content>
        </HoverCard.Root>
    );

    test('switches from uncontrolled to controlled open', () => {
        const onOpenChange = jest.fn();

        const { rerender } = render(hoverCard({ open: true }));

        expect(screen.getByText('Hover content')).toBeInTheDocument();

        rerender(hoverCard({ open: false, onOpenChange }));
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();
    });

    test('switches from controlled open to uncontrolled', () => {
        const { rerender } = render(hoverCard({ open: true }));

        expect(screen.getByText('Hover content')).toBeInTheDocument();

        rerender(hoverCard({}));
        expect(screen.queryByText('Hover content')).not.toBeInTheDocument();
    });
});
