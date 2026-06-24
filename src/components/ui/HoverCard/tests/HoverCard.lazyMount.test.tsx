import React from 'react';
import { render, screen } from '@testing-library/react';
import HoverCard from '../HoverCard';

describe('HoverCard lazy mount', () => {
    test('does not mount content until opened', () => {
        render(
            <HoverCard.Root>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content data-testid="hover-content">Hover body</HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        );

        expect(screen.queryByTestId('hover-content')).not.toBeInTheDocument();
    });

    test('mounts content when open', () => {
        render(
            <HoverCard.Root open>
                <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                <HoverCard.Portal>
                    <HoverCard.Content>Hover body</HoverCard.Content>
                </HoverCard.Portal>
            </HoverCard.Root>
        );

        expect(screen.getByText('Hover body')).toBeInTheDocument();
    });
});
