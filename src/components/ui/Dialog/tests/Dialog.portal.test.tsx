import React, { createRef } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import Dialog from '../Dialog';
import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
// @ts-ignore - React 18/19 server rendering types may not be present
const { renderToString } = require('react-dom/server');
// @ts-ignore - hydrateRoot typings may be unavailable in this environment
const { hydrateRoot } = require('react-dom/client');
// @ts-ignore - test-utils typings may be unavailable
const { act } = require('react-dom/test-utils');

// Helper to flush microtasks
const flush = () => new Promise(resolve => setTimeout(resolve, 0));

describe('Dialog portal and accessibility', () => {
    test('manages focus and data-state, closes on escape and overlay click', async() => {
        const user = userEvent.setup();
        render(
            <Dialog.Root>
                <Dialog.Trigger data-testid="trigger">Open</Dialog.Trigger>
                <Dialog.Overlay forceMount data-testid="overlay" />
                <Dialog.Content forceMount data-testid="content">
                    <button>First</button>
                    <button>Second</button>
                </Dialog.Content>
            </Dialog.Root>
        );

        const trigger = screen.getByTestId('trigger');
        await user.click(trigger);

        const first = screen.getByText('First');
        await waitFor(() => expect(first).toHaveFocus());

        const root = trigger.closest('[data-state]');
        const overlay = screen.getByTestId('overlay');
        const content = screen.getByTestId('content');
        expect(root).toHaveAttribute('data-state', 'open');
        expect(overlay).toHaveAttribute('data-state', 'open');
        expect(content).toHaveAttribute('data-state', 'open');

        await user.keyboard('{Escape}');
        await waitFor(() => expect(trigger).toHaveFocus());
        expect(root).toHaveAttribute('data-state', 'closed');
        expect(overlay).toHaveAttribute('data-state', 'closed');
        expect(content).toHaveAttribute('data-state', 'closed');

        await user.click(trigger);
        await user.click(overlay);
        await waitFor(() => expect(trigger).toHaveFocus());
        expect(root).toHaveAttribute('data-state', 'closed');
        expect(overlay).toHaveAttribute('data-state', 'closed');
        expect(content).toHaveAttribute('data-state', 'closed');
    });

    test('portal container mounts elements and preserves layering', async() => {
        const portalRoot = document.createElement('div');
        portalRoot.id = 'portal-root';
        document.body.appendChild(portalRoot);

        const user = userEvent.setup();
        render(
            <Dialog.Root>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal container={portalRoot}>
                    <Dialog.Overlay data-testid="overlay" />
                    <Dialog.Content data-testid="content">
                        <button>btn</button>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );

        await user.click(screen.getByText('Open'));

        const overlay = within(portalRoot).getByTestId('overlay');
        const content = within(portalRoot).getByTestId('content');
        expect(portalRoot).toContainElement(overlay);
        expect(portalRoot).toContainElement(content);
        const relation = overlay.compareDocumentPosition(content);
        expect(relation & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    });

    test('is accessible with axe when open', async() => {
        const { container } = render(
            <Dialog.Root open>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content aria-label="dialog">
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Description</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        );

        const results = await axe.run(container);
        expect(results.violations).toHaveLength(0);
    });

    test('hydrates SSR markup without warnings', async() => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        const html = renderToString(
            <Dialog.Root open>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content>
                    <button>btn</button>
                </Dialog.Content>
            </Dialog.Root>
        );

        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        let root: ReturnType<typeof hydrateRoot>;
        await act(async() => {
            root = hydrateRoot(container, (
                <Dialog.Root open>
                    <Dialog.Trigger>Open</Dialog.Trigger>
                    <Dialog.Overlay />
                    <Dialog.Content>
                        <button>btn</button>
                    </Dialog.Content>
                </Dialog.Root>
            ));
            await flush();
        });

        const filteredWarns = warn.mock.calls.filter(([msg]) => !String(msg).includes('useLayoutEffect does nothing on the server'));
        const filteredErrors = error.mock.calls.filter(([msg]) => {
            const text = String(msg);
            return !text.includes('useLayoutEffect does nothing on the server') && !text.includes('ReactDOMTestUtils.act');
        });
        expect(filteredWarns).toHaveLength(0);
        expect(filteredErrors).toHaveLength(0);

        await act(() => root.unmount());
        container.remove();

        warn.mockRestore();
        error.mockRestore();
    });

    test('asChild preserves semantics and refs', () => {
        const triggerRef = createRef<HTMLAnchorElement>();
        const contentRef = createRef<HTMLFormElement>();
        render(
            <Dialog.Root open>
                <Dialog.Trigger asChild ref={triggerRef as unknown as React.RefObject<HTMLButtonElement>}>
                    <a href="#open">Open</a>
                </Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content asChild ref={contentRef as unknown as React.RefObject<HTMLDivElement>}>
                    <form>
                        <button>Submit</button>
                    </form>
                </Dialog.Content>
            </Dialog.Root>
        );

        expect(triggerRef.current?.tagName).toBe('A');
        expect(contentRef.current?.tagName).toBe('FORM');
    });
});
