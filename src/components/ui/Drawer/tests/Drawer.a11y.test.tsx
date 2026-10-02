import React, { useRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';
import Drawer from '../Drawer';
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

const renderDrawer = () => render(
    <Theme>
        <Drawer.Root>
            <Drawer.Trigger>Open drawer</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Title>Drawer</Drawer.Title>
                    <Drawer.Description>Slides in from the right.</Drawer.Description>
                    <Drawer.Close>Close</Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    </Theme>
);

describe('Drawer accessibility', () => {
    beforeEach(() => mockMatchMedia());

    test('axe: no violations when closed', async() => {
        const { container } = renderDrawer();
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('axe: no violations when open', async() => {
        const user = userEvent.setup();
        const { container } = renderDrawer();
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Slides in from the right.')).toBeInTheDocument());
        // Wrapped in Theme, so the portal root lands inside RTL's container and
        // `container` is the right scan boundary here. Asserted so a future
        // portal-target change cannot silently reduce this scan to nothing.
        expect(container).toContainElement(screen.getByText('Slides in from the right.'));
        const results = await axe.run(container, { runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS } });
        expect(results.violations).toHaveLength(0);
    });

    test('content exposes the dialog role', async() => {
        const user = userEvent.setup();
        renderDrawer();
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Drawer')).toBeInTheDocument());
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('drawer title is auto-wired to aria-labelledby', async() => {
        const user = userEvent.setup();
        renderDrawer();
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Drawer')).toBeInTheDocument());
        expect(screen.getByRole('dialog')).toHaveAttribute('aria-labelledby');
    });

    test('consumer-supplied aria-labelledby names the dialog', async() => {
        const user = userEvent.setup();
        render(
            <Theme>
                <Drawer.Root>
                    <Drawer.Trigger>Open drawer</Drawer.Trigger>
                    <Drawer.Portal>
                        <Drawer.Overlay />
                        <Drawer.Content aria-labelledby="drawer-heading">
                            <Drawer.Title id="drawer-heading">Drawer</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Portal>
                </Drawer.Root>
            </Theme>
        );
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Drawer')).toBeInTheDocument());
        expect(screen.getByRole('dialog', { name: 'Drawer' })).toBeInTheDocument();
    });

    test('description is exposed', async() => {
        const user = userEvent.setup();
        renderDrawer();
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Slides in from the right.')).toBeInTheDocument());
    });

    test('close button dismisses the drawer', async() => {
        const user = userEvent.setup();
        renderDrawer();
        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByText('Slides in from the right.')).toBeInTheDocument());
        await user.click(screen.getByRole('button', { name: 'Close' }));
        await waitFor(() => expect(screen.queryByText('Slides in from the right.')).not.toBeInTheDocument());
    });

    test('finalFocus receives focus when the drawer closes', async() => {
        const user = userEvent.setup();

        function Example() {
            const finalFocusRef = useRef<HTMLButtonElement>(null);
            return (
                <Theme>
                    <button ref={finalFocusRef}>After drawer</button>
                    <Drawer.Root>
                        <Drawer.Trigger>Open drawer</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Content finalFocus={finalFocusRef}>
                                <Drawer.Title>Drawer</Drawer.Title>
                                <Drawer.Close>Close</Drawer.Close>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </Theme>
            );
        }

        render(<Example />);

        await user.click(screen.getByText('Open drawer'));
        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
        await user.click(screen.getByRole('button', { name: 'Close' }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'After drawer' })).toHaveFocus();
        });
    });
});
