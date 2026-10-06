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

describe('Popover hybrid interaction', () => {
    beforeEach(() => mockMatchMedia());

    test('pointer open then escape closes popover', async() => {
        const user = userEvent.setup();
        render(
            <Theme>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>
                            <button type="button">First</button>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const trigger = screen.getByText('Open');
        await user.click(trigger);
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        await waitFor(() => expect(trigger).toHaveFocus());
    });

    test('keyboard open via Space then pointer click on close dismisses', async() => {
        const user = userEvent.setup();
        render(
            <Theme>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>
                            Body
                            <Popover.Close>Close</Popover.Close>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const trigger = screen.getByText('Open');
        trigger.focus();
        await user.keyboard(' ');

        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());

        await user.click(screen.getByText('Close'));
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    });
});
