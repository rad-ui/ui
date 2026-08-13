import React from 'react';
import { render, screen } from '@testing-library/react';
import Theme from '~/components/ui/Theme/Theme';
import HoverCard from '../HoverCard';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') return;
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
        }))
    });
};

describe('HoverCard lazy mount', () => {
    beforeEach(() => mockMatchMedia());

    test('does not mount content until opened', () => {
        render(
            <Theme>
                <HoverCard.Root>
                    <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content data-testid="hover-content">Hover body</HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </Theme>
        );

        expect(screen.queryByTestId('hover-content')).not.toBeInTheDocument();
    });

    test('mounts content when open', () => {
        render(
            <Theme>
                <HoverCard.Root open>
                    <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                    <HoverCard.Portal>
                        <HoverCard.Content>Hover body</HoverCard.Content>
                    </HoverCard.Portal>
                </HoverCard.Root>
            </Theme>
        );

        expect(screen.getByText('Hover body')).toBeInTheDocument();
    });
});
