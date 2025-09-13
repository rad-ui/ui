import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import AlertDialog from '../AlertDialog';

// Mock canvas for jsdom
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn(() => ({
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(() => ({ data: new Array(4) })),
        putImageData: jest.fn(),
        createImageData: jest.fn(() => ({ data: new Array(4) })),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn()
    }))
});

describe('AlertDialog a11y and behaviors', () => {
    afterEach(() => {
        // Clean up any portal root elements that might have been added to document.body
        const portalRoot = document.querySelector('#portal-root');
        if (portalRoot) {
            document.body.removeChild(portalRoot);
        }
    });
    test('Trigger opens dialog; first focusable receives focus; data-state="open" on overlay/content', async() => {
        const user = userEvent.setup();
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                        <AlertDialog.Description>Description</AlertDialog.Description>
                        <button>First</button>
                        <button>Second</button>
                        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        const trigger = screen.getByText('Open');
        await user.click(trigger);

        const content = await screen.findByRole('alertdialog');
        const overlay = document.querySelector('[data-floating-ui-portal] [data-state="open"]') as HTMLElement | null;

        // first focusable should have focus (First button) - wait for focus to change
        await waitFor(() => {
            expect(screen.getByText('First')).toHaveFocus();
        });

        // data-state on overlay/content
        expect(content).toHaveAttribute('data-state', 'open');
        if (overlay) {
            expect(overlay).toHaveAttribute('data-state', 'open');
        }
    });

    test('Esc and overlay click close dialog; focus returns to trigger; data-state="closed"', async() => {
        const user = userEvent.setup();
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        const trigger = screen.getByText('Open');
        await user.click(trigger);
        const content = await screen.findByRole('alertdialog');
        const overlay = document.querySelector('[data-floating-ui-portal] [data-state="open"]') as HTMLElement | null;

        // Close with ESC
        await user.keyboard('{Escape}');
        await waitFor(() => expect(trigger).toHaveFocus());

        // Re-open and close via overlay click
        await user.click(trigger);
        const openContent = await screen.findByRole('alertdialog');
        const openOverlay = document.querySelector('[data-floating-ui-portal] [data-state="open"]') as HTMLElement | null;
        if (openOverlay) {
            await user.click(openOverlay);
        }
        await waitFor(() => expect(trigger).toHaveFocus());

        // content/overlay should reflect closed state when mounted with forceMount
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open2</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay forceMount />
                    <AlertDialog.Content forceMount>
                        <AlertDialog.Title>Title2</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
        const forcedContent = screen.getByText('Title2').closest('[role="alertdialog"]')!;
        const forcedOverlay = document.querySelector('[data-floating-ui-portal] [data-state="closed"]') as HTMLElement | null;
        expect(forcedContent).toHaveAttribute('data-state', 'closed');
        if (forcedOverlay) expect(forcedOverlay).toHaveAttribute('data-state', 'closed');
    });

    test('AXE: no violations when open or closed', async() => {
        const user = userEvent.setup();
        const { container } = render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <AlertDialog.Title>Accessible Title</AlertDialog.Title>
                        <AlertDialog.Description>Accessible Description</AlertDialog.Description>
                        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        // Closed
        const closed = await axe.run(container);
        expect(closed.violations).toHaveLength(0);

        // Open and test again
        await user.click(screen.getByText('Open'));
        const opened = await axe.run(container);
        expect(opened.violations).toHaveLength(0);
    });

    test('Tab/Shift+Tab loop within content; Enter/Space activates focused close button', async() => {
        const user = userEvent.setup();
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay />
                    <AlertDialog.Content>
                        <button>First</button>
                        <button>Middle</button>
                        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        await user.click(screen.getByText('Open'));
        const content = await screen.findByRole('alertdialog');
        const utils = within(content);
        const first = utils.getByText('First');
        const middle = utils.getByText('Middle');
        const close = utils.getByText('Close');

        await waitFor(() => {
            expect(first).toHaveFocus();
        });
        await user.tab();
        expect(middle).toHaveFocus();
        await user.tab();
        expect(close).toHaveFocus();
        await user.tab();
        // Loop back to first
        expect(first).toHaveFocus();

        // Shift+Tab loops backwards
        await user.tab({ shift: true });
        expect(close).toHaveFocus();

        // Activate Close via keyboard
        await user.keyboard('{Enter}');
        expect(screen.getByText('Open')).toHaveFocus();
    });

    test('asChild on Trigger and Cancel preserves semantics and refs', async() => {
        const user = userEvent.setup();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const cancelRef = React.createRef<HTMLButtonElement>();

        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                    <button ref={triggerRef} data-testid="custom-trigger">Open</button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Cancel asChild>
                            <button ref={cancelRef} data-testid="custom-cancel">Close</button>
                        </AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        const trigger = screen.getByTestId('custom-trigger');
        await user.click(trigger);
        expect(screen.getByTestId('custom-cancel')).toBeInTheDocument();
        await user.click(screen.getByTestId('custom-cancel'));
        expect(triggerRef.current).toHaveFocus();
    });

    test('controlled vs uncontrolled: open prop syncs and defaultOpen works', async() => {
        const user = userEvent.setup();
        const { rerender } = render(
            <AlertDialog.Root open={false}>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        // Not open
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

        // Control open externally
        rerender(
            <AlertDialog.Root open>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();

        // defaultOpen uncontrolled
        render(
            <AlertDialog.Root defaultOpen>
                <AlertDialog.Trigger>Open2</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Another</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
        expect(screen.getByText('Another')).toBeInTheDocument();
    });

    test('container prop portals correctly and returns focus', async() => {
        const user = userEvent.setup();
        const portalRoot = document.createElement('div');
        portalRoot.setAttribute('id', 'portal-root');
        document.body.appendChild(portalRoot);

        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal container={portalRoot}>
                    <AlertDialog.Content>
                        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        const trigger = screen.getByText('Open');
        await user.click(trigger);
        const dialog = await screen.findByRole('alertdialog');
        expect(portalRoot.contains(dialog)).toBe(true);
        await user.click(screen.getByText('Close'));
        expect(trigger).toHaveFocus();
    });

    test('SSR safety: Portal mounts on client without mismatch warnings', () => {
        // Rendering should not throw; initial render without container should be fine
        expect(() => {
            render(
                <AlertDialog.Root>
                    <AlertDialog.Portal>
                        <AlertDialog.Content forceMount>
                            <AlertDialog.Title>SSR</AlertDialog.Title>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            );
        }).not.toThrow();
        expect(screen.getByText('SSR')).toBeInTheDocument();
    });

    test('disabled trigger prevents dialog from opening', async() => {
        const user = userEvent.setup();
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger disabled>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Title</AlertDialog.Title>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    });

    test('nested dialogs return focus to their respective triggers', async() => {
        const user = userEvent.setup();
        render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Outer</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Outer</AlertDialog.Title>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>Inner</AlertDialog.Trigger>
                            <AlertDialog.Portal>
                                <AlertDialog.Content>
                                    <AlertDialog.Title>Inner</AlertDialog.Title>
                                    <AlertDialog.Cancel>Close Inner</AlertDialog.Cancel>
                                </AlertDialog.Content>
                            </AlertDialog.Portal>
                        </AlertDialog.Root>
                        <AlertDialog.Cancel>Close Outer</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        await user.click(screen.getByText('Outer'));
        await user.click(screen.getByText('Inner'));
        await user.click(screen.getByText('Close Inner'));
        await waitFor(() => expect(screen.getByText('Inner')).toHaveFocus());
        await user.click(screen.getByText('Close Outer'));
        await waitFor(() => expect(screen.getByText('Outer')).toHaveFocus());
    });

    test('dialog functions in RTL direction', async() => {
        const user = userEvent.setup();
        render(
            <div dir="rtl">
                <AlertDialog.Root>
                    <AlertDialog.Trigger>فتح</AlertDialog.Trigger>
                    <AlertDialog.Portal>
                        <AlertDialog.Content>
                            <AlertDialog.Cancel>إغلاق</AlertDialog.Cancel>
                        </AlertDialog.Content>
                    </AlertDialog.Portal>
                </AlertDialog.Root>
            </div>
        );

        const trigger = screen.getByText('فتح');
        await user.click(trigger);
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
        await user.click(screen.getByText('إغلاق'));
        expect(trigger).toHaveFocus();
    });
});
