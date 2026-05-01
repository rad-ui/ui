import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from '../Popover';
import Theme from '~/components/ui/Theme/Theme';

const mockMatchMedia = () => {
    if ('matchMedia' in window && typeof window.matchMedia === 'function') {
        return;
    }

    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });
};

describe('Popover', () => {
    test('supports the Radix-style compound API and forwards refs', async() => {
        const user = userEvent.setup();
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const contentRef = React.createRef<HTMLDivElement>();
        const closeRef = React.createRef<HTMLButtonElement>();
        const arrowRef = React.createRef<SVGSVGElement>();

        render(
            <Popover.Root ref={rootRef}>
                <Popover.Trigger ref={triggerRef}>Open</Popover.Trigger>
                <Popover.Content ref={contentRef}>
                    Body
                    <Popover.Close ref={closeRef}>Close</Popover.Close>
                    <Popover.Arrow ref={arrowRef} />
                </Popover.Content>
            </Popover.Root>
        );

        await user.click(screen.getByRole('button', { name: 'Open' }));

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(closeRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(arrowRef.current).toBeInstanceOf(SVGSVGElement);
    });

    test('toggles open state and dismisses on outside interaction', async() => {
        const user = userEvent.setup();

        render(
            <div>
                <button>outside</button>
                <Popover.Root>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Content>Popover body</Popover.Content>
                </Popover.Root>
            </div>
        );

        await user.click(screen.getByRole('button', { name: 'Open' }));
        expect(screen.getByRole('dialog')).toHaveTextContent('Popover body');
        expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('data-state', 'open');

        await user.click(screen.getByRole('button', { name: 'outside' }));
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
        expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('data-state', 'closed');
    });

    test('supports asChild on Trigger and Close', async() => {
        const user = userEvent.setup();
        const triggerRef = React.createRef<HTMLAnchorElement>();
        const childTriggerRef = React.createRef<HTMLAnchorElement>();
        const closeRef = React.createRef<HTMLSpanElement>();

        render(
            <Popover.Root>
                <Popover.Trigger asChild ref={triggerRef as unknown as React.Ref<HTMLButtonElement>}>
                    <a href="#trigger" ref={childTriggerRef}>Custom trigger</a>
                </Popover.Trigger>
                <Popover.Content>
                    Content
                    <Popover.Close asChild ref={closeRef as unknown as React.Ref<HTMLButtonElement>}>
                        <span role="button" tabIndex={0}>Dismiss</span>
                    </Popover.Close>
                </Popover.Content>
            </Popover.Root>
        );

        await user.click(screen.getByText('Custom trigger'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(triggerRef.current).toBe(screen.getByText('Custom trigger'));
        expect(childTriggerRef.current).toBe(screen.getByText('Custom trigger'));

        const dismiss = screen.getByText('Dismiss');
        expect(closeRef.current).toBe(dismiss);
        await user.click(dismiss);
        await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    });

    test('anchors content to Popover.Anchor when provided', async() => {
        const user = userEvent.setup();

        render(
            <div style={{ padding: 40 }}>
                <Popover.Root open>
                    <Popover.Anchor data-testid="anchor" style={{ display: 'inline-block', marginLeft: 120 }}>Anchor</Popover.Anchor>
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Content sideOffset={12}>Anchored content</Popover.Content>
                </Popover.Root>
            </div>
        );

        await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
        const anchor = screen.getByTestId('anchor').getBoundingClientRect();
        const content = screen.getByRole('dialog').getBoundingClientRect();

        expect(content.left).toBeGreaterThanOrEqual(anchor.left - 1);

        await user.tab();
    });

    test('portals content inside the active theme scope', async() => {
        mockMatchMedia();

        render(
            <Theme appearance="dark" classNamespace="rad-ui">
                <Popover.Root open customRootClass="rad-ui">
                    <Popover.Trigger>Open</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content>Portaled</Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </Theme>
        );

        const content = await screen.findByRole('dialog');
        expect(content.closest('[data-rad-ui-theme="dark"]')).toBeInTheDocument();
        expect(content.closest('[data-rad-ui-portal-root]')).toBeInTheDocument();
    });
});
