import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
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

const renderPopover = () => render(
    <Theme>
        <Popover.Root>
            <Popover.Trigger>Open</Popover.Trigger>
            <Popover.Content>
                <p>Popover body</p>
                <Popover.Close>Close</Popover.Close>
            </Popover.Content>
        </Popover.Root>
    </Theme>
);

describe('Popover accessibility', () => {
    beforeEach(() => mockMatchMedia());

    test('axe: no violations when closed', async() => {
        const { container } = renderPopover();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations when open', async() => {
        const user = userEvent.setup();
        const { container } = renderPopover();
        await user.click(screen.getByText('Open'));
        await waitFor(() => expect(screen.getByText('Popover body')).toBeInTheDocument());
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('trigger is a button and toggles the popover', async() => {
        const user = userEvent.setup();
        renderPopover();
        const trigger = screen.getByRole('button', { name: 'Open' });
        await user.click(trigger);
        await waitFor(() => expect(screen.getByText('Popover body')).toBeInTheDocument());
    });

    test('content is reachable by the dialog role', async() => {
        const user = userEvent.setup();
        renderPopover();
        await user.click(screen.getByRole('button', { name: 'Open' }));
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
    });

    test('close button dismisses the content', async() => {
        const user = userEvent.setup();
        renderPopover();
        await user.click(screen.getByRole('button', { name: 'Open' }));
        await waitFor(() => expect(screen.getByText('Popover body')).toBeInTheDocument());
        await user.click(screen.getByRole('button', { name: 'Close' }));
        await waitFor(() => expect(screen.queryByText('Popover body')).not.toBeInTheDocument());
    });
});