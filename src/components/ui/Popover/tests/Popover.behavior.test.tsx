import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithPortal, assertFocusReturn } from '~/test-utils/portal';
import { axe, keyboard } from "test-utils";
import Popover from '../Popover';

describe('Popover interactions', () => {
    test('opens on click and closes on escape with proper data attributes', async () => {
        const user = userEvent.setup();
        render(
            <Popover.Root>
                <Popover.Trigger>Trigger</Popover.Trigger>
                <Popover.Content>
                    <Popover.Arrow />
                    <div>Content</div>
                </Popover.Content>
            </Popover.Root>
        );

        const trigger = screen.getByText('Trigger');
        expect(trigger).toHaveAttribute('data-state', 'closed');
        await user.click(trigger);
        const content = await screen.findByText("Content");
        const contentWrapper = content.closest("[data-state]") as HTMLElement;
        expect(contentWrapper).toHaveAttribute("data-state", "open");
        expect(trigger).toHaveAttribute('data-state', 'open');
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByText('Content')).toBeNull());
        expect(trigger).toHaveAttribute('data-state', 'closed');
    });

    test('portal renders content and focus returns to trigger on escape', async () => {
        const user = userEvent.setup();
        const { getByText, cleanup } = renderWithPortal(
            <Popover.Root>
                <Popover.Trigger>Trigger</Popover.Trigger>
                <Popover.Content>
                    <div>Portalled</div>
                </Popover.Content>
            </Popover.Root>
        );
        const trigger = getByText('Trigger');
        await user.click(trigger);
        await screen.findByText('Portalled');
        await user.keyboard('{Escape}');
        await waitFor(() => assertFocusReturn(trigger));
        cleanup();
    });

    test('has no a11y violations when open', async () => {
        const { container } = render(
            <Popover.Root>
                <Popover.Trigger>Trigger</Popover.Trigger>
                <Popover.Content>
                    <div>Accessible</div>
                </Popover.Content>
            </Popover.Root>
        );
        const user = keyboard();
        await user.click(screen.getByText('Trigger'));
        const results = await axe(container);
        expect(results.violations).toHaveLength(0);
});
});
