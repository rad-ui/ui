import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HoverCard from '../HoverCard';
import Theme from '~/components/ui/Theme/Theme';

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

describe('HoverCard RTL', () => {
    beforeEach(() => mockMatchMedia());

    test('shows content in rtl layout', async() => {
        const user = userEvent.setup();

        render(
            <div dir="rtl">
                <Theme>
                    <HoverCard.Root openDelay={0} closeDelay={0}>
                        <HoverCard.Trigger>Trigger</HoverCard.Trigger>
                        <HoverCard.Portal>
                            <HoverCard.Content>RTL content</HoverCard.Content>
                        </HoverCard.Portal>
                    </HoverCard.Root>
                </Theme>
            </div>
        );

        const trigger = screen.getByText('Trigger');
        expect(trigger.closest('[dir="rtl"]')).not.toBeNull();

        await act(async() => {
            await user.hover(trigger);
        });

        await waitFor(() => expect(screen.getByText('RTL content')).toBeInTheDocument());
    });
});
