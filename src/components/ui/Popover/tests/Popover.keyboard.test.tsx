import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';
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

describe('Popover keyboard paths', () => {
    beforeEach(() => mockMatchMedia());

    test('escape closes popover and returns focus to trigger', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>Body</Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const trigger = screen.getByText('Open');
        await user.click(trigger);
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        expect(trigger).toHaveFocus();
    });

    test('Space on trigger toggles popover open state', async() => {
        const user = userEvent.setup();

        render(
            <Theme>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>Body</Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const trigger = screen.getByText('Open');
        trigger.focus();
        await user.keyboard(' ');
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

        await user.keyboard(' ');
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    });
});
