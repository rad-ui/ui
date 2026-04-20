import React, { createRef } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithPortal, assertFocusTrap, assertFocusReturn, assertScrollLock, assertScrollUnlock } from '~/test-utils/portal';
import Drawer from '../Drawer';

const DrawerRootAny = Drawer.Root as unknown as React.ComponentType<any>;

function createDOMRect(overrides: Partial<DOMRect> = {}) {
    return {
        top: 0,
        left: 0,
        right: 320,
        bottom: 400,
        width: 320,
        height: 400,
        x: 0,
        y: 0,
        toJSON: () => {},
        ...overrides
    } as DOMRect;
}

function mockElementRect(element: HTMLElement, overrides: Partial<DOMRect> = {}) {
    const original = element.getBoundingClientRect.bind(element);
    element.getBoundingClientRect = () => createDOMRect(overrides);
    return () => {
        element.getBoundingClientRect = original;
    };
}

function mockHTMLElementRect(overrides: Partial<DOMRect> = {}) {
    const original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function() {
        return createDOMRect(overrides);
    };

    return () => {
        HTMLElement.prototype.getBoundingClientRect = original;
    };
}

describe('Drawer', () => {
    test('forwards refs to subcomponents', () => {
        const rootRef = createRef<HTMLDivElement>();
        const triggerRef = createRef<HTMLButtonElement>();
        const backdropRef = createRef<HTMLDivElement>();
        const viewportRef = createRef<HTMLDivElement>();
        const popupRef = createRef<HTMLDivElement>();
        const contentRef = createRef<HTMLDivElement>();
        const titleRef = createRef<HTMLHeadingElement>();
        const descriptionRef = createRef<HTMLParagraphElement>();
        const closeRef = createRef<HTMLButtonElement>();

        render(
            <Drawer.Root ref={rootRef} open>
                <Drawer.Trigger ref={triggerRef}>Open</Drawer.Trigger>
                <Drawer.Backdrop ref={backdropRef} />
                <Drawer.Viewport ref={viewportRef}>
                    <Drawer.Popup ref={popupRef}>
                        <Drawer.Content ref={contentRef}>
                            <Drawer.Title ref={titleRef}>Title</Drawer.Title>
                            <Drawer.Description ref={descriptionRef}>Description</Drawer.Description>
                            <Drawer.Close ref={closeRef}>Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(backdropRef.current).toBeInstanceOf(HTMLDivElement);
        expect(viewportRef.current).toBeInstanceOf(HTMLDivElement);
        expect(popupRef.current).toBeInstanceOf(HTMLDivElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(titleRef.current?.tagName).toBe('H2');
        expect(descriptionRef.current?.tagName).toBe('P');
        expect(closeRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('hides popup content when closed and shows when open', () => {
        const closed = render(
            <Drawer.Root>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Backdrop />
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                            <Drawer.Description>Description</Drawer.Description>
                            <Drawer.Close>Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(closed.queryByText('Description')).toBeNull();
        closed.unmount();

        const opened = render(
            <Drawer.Root open>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Backdrop />
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                            <Drawer.Description>Description</Drawer.Description>
                            <Drawer.Close>Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(opened.queryByText('Description')).toBeInTheDocument();
    });

    test('applies the swipe direction styling contract', () => {
        const { getByText } = render(
            <Drawer.Root open swipeDirection='right'>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                            <Drawer.Close>Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = getByText('Title').closest('[role="dialog"]');

        expect(popup).toHaveAttribute('data-swipe-direction', 'right');
        expect(popup?.parentElement).toHaveAttribute('data-swipe-direction', 'right');
    });

    test('reports trigger and close reasons through onOpenChange details', async() => {
        const user = userEvent.setup();
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root onOpenChange={handleOpenChange}>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Backdrop />
                    <Drawer.Viewport>
                        <Drawer.Popup>
                            <Drawer.Content>
                                <Drawer.Close>Close</Drawer.Close>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        );

        await user.click(screen.getByText('Open'));
        await user.click(screen.getByText('Close'));

        expect(handleOpenChange).toHaveBeenNthCalledWith(1, true, expect.objectContaining({ reason: 'trigger-press' }));
        expect(handleOpenChange).toHaveBeenNthCalledWith(2, false, expect.objectContaining({ reason: 'close-press' }));
    });

    test('supports stateful className/style and render props', () => {
        render(
            <Drawer.Root open>
                <Drawer.Trigger
                    className={({ open }) => open ? 'is-open' : 'is-closed'}
                    style={({ open }) => ({ opacity: open ? 1 : 0.5 })}
                    render={(props) => <button data-testid='custom-trigger' {...props} />}
                >
                    Open
                </Drawer.Trigger>
                <Drawer.Viewport
                    render={(props) => <section data-testid='custom-viewport' {...props} />}
                >
                    <Drawer.Popup
                        render={(props, state) => (
                            <aside
                                data-testid='custom-popup'
                                data-expanded={state.expanded ? '' : undefined}
                                {...props}
                            />
                        )}
                    >
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByTestId('custom-trigger')).toHaveClass('is-open');
        expect(screen.getByTestId('custom-trigger')).toHaveStyle({ opacity: '1' });
        expect(screen.getByTestId('custom-viewport').tagName).toBe('SECTION');
        expect(screen.getByTestId('custom-popup').tagName).toBe('ASIDE');
    });

    test('supports render props across content, title, description, close, and swipe area', () => {
        render(
            <Drawer.Root open swipeDirection='right'>
                <Drawer.SwipeArea
                    className={({ swipeDirection }) => `swipe-${swipeDirection}`}
                    style={({ open }) => ({ opacity: open ? 1 : 0.4 })}
                    render={(props) => <aside data-testid='custom-swipe-area' {...props} />}
                />
                <Drawer.Viewport>
                    <Drawer.Popup>
                        <Drawer.Content
                            className={() => 'content-slot'}
                            render={(props) => <section data-testid='custom-content' {...props} />}
                        >
                            <Drawer.Title
                                style={() => ({ letterSpacing: '0.2px' })}
                                render={(props) => <h3 data-testid='custom-title' {...props}>{props.children}</h3>}
                            >
                                Title
                            </Drawer.Title>
                            <Drawer.Description
                                className={() => 'description-slot'}
                                render={(props) => <div data-testid='custom-description' {...props}>{props.children}</div>}
                            >
                                Description
                            </Drawer.Description>
                            <Drawer.Close
                                className={({ disabled }) => disabled ? 'close-disabled' : 'close-active'}
                                render={(props) => <button data-testid='custom-close' type='button' {...props}>{props.children}</button>}
                            >
                                Close
                            </Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByTestId('custom-swipe-area')).toHaveClass('swipe-left');
        expect(screen.getByTestId('custom-swipe-area')).toHaveStyle({ opacity: '1' });
        expect(screen.getByTestId('custom-content').tagName).toBe('SECTION');
        expect(screen.getByTestId('custom-content')).toHaveClass('content-slot');
        expect(screen.getByTestId('custom-title').tagName).toBe('H3');
        expect(screen.getByTestId('custom-title')).toHaveStyle({ letterSpacing: '0.2px' });
        expect(screen.getByTestId('custom-description').tagName).toBe('DIV');
        expect(screen.getByTestId('custom-description')).toHaveClass('description-slot');
        expect(screen.getByTestId('custom-close')).toHaveClass('close-active');
    });

    test('mounts in portal, traps focus, returns focus and locks scroll', async() => {
        const user = userEvent.setup();
        const { getByText, portalRoot, cleanup } = renderWithPortal(
            <Drawer.Root swipeDirection='right'>
                <Drawer.Trigger>Trigger</Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Backdrop />
                    <Drawer.Viewport>
                        <Drawer.Popup>
                            <Drawer.Content>
                                <Drawer.Close>Close</Drawer.Close>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        );

        await user.click(getByText('Trigger'));
        await waitFor(() => assertScrollLock());
        await assertFocusTrap(portalRoot);
        await user.click(getByText('Close'));
        assertFocusReturn(getByText('Trigger'));
        await waitFor(() => assertScrollUnlock());
        cleanup();
    });

    test('provider surfaces active state to indent elements when any drawer is open', async() => {
        const user = userEvent.setup();

        render(
            <Drawer.Provider>
                <Drawer.IndentBackground data-testid='indent-background' />
                <Drawer.Indent data-testid='indent'>
                    <Drawer.Root>
                        <Drawer.Trigger>Open</Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Backdrop />
                            <Drawer.Viewport>
                                <Drawer.Popup>
                                    <Drawer.Content>
                                        <Drawer.Close>Close</Drawer.Close>
                                    </Drawer.Content>
                                </Drawer.Popup>
                            </Drawer.Viewport>
                        </Drawer.Portal>
                    </Drawer.Root>
                </Drawer.Indent>
            </Drawer.Provider>
        );

        const indent = screen.getByTestId('indent');
        const indentBackground = screen.getByTestId('indent-background');

        expect(indent).not.toHaveAttribute('data-active');
        expect(indentBackground).not.toHaveAttribute('data-active');

        await user.click(screen.getByText('Open'));

        expect(indent).toHaveAttribute('data-active', '');
        expect(indentBackground).toHaveAttribute('data-active', '');

        await user.click(screen.getByText('Close'));

        expect(indent).not.toHaveAttribute('data-active');
        expect(indentBackground).not.toHaveAttribute('data-active');
    });

    test('supports payload rendering through the root render-function child', async() => {
        const user = userEvent.setup();

        render(
            <DrawerRootAny>
                {({ payload }: { payload: unknown }) => (
                    <>
                        <div data-testid='payload'>{String(payload ?? 'none')}</div>
                        <Drawer.Trigger payload='settings'>Open Settings</Drawer.Trigger>
                    </>
                )}
            </DrawerRootAny>
        );

        expect(screen.getByTestId('payload')).toHaveTextContent('none');

        await user.click(screen.getByText('Open Settings'));

        expect(screen.getByTestId('payload')).toHaveTextContent('settings');
    });

    test('swipe area opens a closed drawer from the viewport edge', () => {
        render(
            <Drawer.Root>
                <Drawer.SwipeArea data-testid='swipe-area' />
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const swipeArea = screen.getByTestId('swipe-area');

        fireEvent.pointerDown(swipeArea, { pointerId: 11, clientY: 790, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(swipeArea, { pointerId: 11, clientY: 720, pointerType: 'touch' });

        expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
    });

    test('does not open from a disabled swipe area and exposes the inverted default direction', () => {
        render(
            <Drawer.Root swipeDirection='left'>
                <Drawer.SwipeArea
                    disabled
                    className={({ disabled }) => disabled ? 'is-disabled' : 'is-enabled'}
                    render={(props) => <div data-testid='swipe-area' {...props} />}
                />
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const swipeArea = screen.getByTestId('swipe-area');

        expect(swipeArea).toHaveAttribute('data-swipe-direction', 'right');
        expect(swipeArea).toHaveClass('is-disabled');

        fireEvent.pointerDown(swipeArea, { pointerId: 22, clientX: 8, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(swipeArea, { pointerId: 22, clientX: 80, pointerType: 'touch' });

        expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
    });

    test('detached handle opens and closes the drawer from an external trigger', async() => {
        const user = userEvent.setup();
        const handle = Drawer.createHandle<string>();

        render(
            <>
                <Drawer.Trigger handle={handle} payload='external'>Open Detached</Drawer.Trigger>
                <Drawer.Root handle={handle}>
                    {null}
                    <Drawer.Portal>
                        <Drawer.Backdrop forceMount />
                        <Drawer.Viewport>
                            <Drawer.Popup forceMount>
                                <Drawer.Content>
                                    <Drawer.Title>Detached</Drawer.Title>
                                    <Drawer.Description>{handle.payload ?? 'missing'}</Drawer.Description>
                                    <Drawer.Close>Close</Drawer.Close>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </Drawer.Portal>
                </Drawer.Root>
            </>
        );

        await user.click(screen.getByText('Open Detached'));

        expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
        expect(handle.isOpen).toBe(true);

        await user.click(screen.getByText('Close'));

        expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
        expect(handle.isOpen).toBe(false);
    });

    test('syncs detached handle payloads and trigger ids through the root state', () => {
        const handle = Drawer.createHandle<string>();

        render(
            <DrawerRootAny handle={handle}>
                {({ payload }: { payload: unknown }) => (
                    <>
                        <div data-testid='payload'>{String(payload ?? 'none')}</div>
                        <Drawer.Viewport>
                            <Drawer.Popup forceMount>
                                <Drawer.Content>
                                    <Drawer.Title>Detached</Drawer.Title>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </>
                )}
            </DrawerRootAny>
        );

        act(() => {
            handle.openWithPayload('external-payload');
        });

        expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');
        expect(screen.getByTestId('payload')).toHaveTextContent('external-payload');

        act(() => {
            handle.open('trigger-42');
        });

        expect(handle.triggerId).toBe('trigger-42');
        expect(screen.getByTestId('payload')).toHaveTextContent('external-payload');
    });

    test('applies snap point offset and expanded state on the popup', () => {
        const restoreRect = mockHTMLElementRect();

        render(
            <Drawer.Root open snapPoints={[0.4, 1]} snapPoint={0.4}>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');

        expect(popup.style.getPropertyValue('--drawer-snap-point-offset')).toBe('240px');
        expect(popup).not.toHaveAttribute('data-expanded');

        restoreRect();
    });

    test('updates controlled snap point offsets and expanded state when props change', () => {
        const restoreRect = mockHTMLElementRect();

        const { rerender } = render(
            <Drawer.Root open snapPoints={[0.4, 1]} snapPoint={null}>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Controlled</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('data-expanded', '');
        expect(screen.getByRole('dialog').style.getPropertyValue('--drawer-snap-point-offset')).toBe('0px');

        rerender(
            <Drawer.Root open snapPoints={[0.4, 1]} snapPoint={0.4}>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Controlled</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByRole('dialog')).not.toHaveAttribute('data-expanded');
        expect(screen.getByRole('dialog').style.getPropertyValue('--drawer-snap-point-offset')).toBe('240px');

        restoreRect();
    });

    test('actionsRef closes the drawer imperatively', async() => {
        const actionsRef = { current: null as { close: () => void; unmount: () => void } | null };

        render(
            <Drawer.Root defaultOpen actionsRef={actionsRef}>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('data-state', 'open');

        actionsRef.current?.close();

        await waitFor(() => {
            expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
        });
    });

    test('actionsRef unmount alias closes the drawer and clears on unmount', async() => {
        const actionsRef = { current: null as { close: () => void; unmount: () => void } | null };

        const view = render(
            <Drawer.Root defaultOpen actionsRef={actionsRef}>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Unmountable</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        actionsRef.current?.unmount();

        await waitFor(() => {
            expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
        });

        view.unmount();

        expect(actionsRef.current).toBeNull();
    });

    test('closes the drawer when the backdrop is clicked', async() => {
        const user = userEvent.setup();
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root defaultOpen onOpenChange={handleOpenChange}>
                <Drawer.Portal>
                    <Drawer.Backdrop data-testid='backdrop' />
                    <Drawer.Viewport>
                        <Drawer.Popup>
                            <Drawer.Content>
                                <Drawer.Title>Backdrop</Drawer.Title>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        );

        await user.click(screen.getByTestId('backdrop'));

        expect(handleOpenChange).toHaveBeenCalledWith(false, expect.any(Object));
        expect(screen.queryByText('Backdrop')).toBeNull();
    });

    test('supports the backdrop forceRender alias while closed', () => {
        render(
            <Drawer.Root>
                <Drawer.Backdrop forceRender data-testid='backdrop' />
            </Drawer.Root>
        );

        expect(screen.getByTestId('backdrop')).toHaveAttribute('data-state', 'closed');
    });

    test('supports modal=false without trapping focus', async() => {
        const user = userEvent.setup();

        render(
            <>
                <Drawer.Root defaultOpen modal={false}>
                    <Drawer.Portal>
                        <Drawer.Backdrop />
                        <Drawer.Viewport>
                            <Drawer.Popup forceMount>
                                <Drawer.Content>
                                    <Drawer.Close>Close</Drawer.Close>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </Drawer.Portal>
                </Drawer.Root>
                <button type='button'>Outside</button>
            </>
        );

        const dialog = screen.getByRole('dialog');
        const closeButton = screen.getByText('Close');

        expect(dialog).toHaveAttribute('aria-modal', 'false');

        closeButton.focus();
        await user.tab();

        expect(screen.getByText('Outside')).toHaveFocus();
    });

    test('supports modal="trap-focus" by trapping focus without aria-modal', async() => {
        const user = userEvent.setup();
        const { portalRoot, cleanup } = renderWithPortal(
            <>
                <Drawer.Root defaultOpen modal='trap-focus'>
                    <Drawer.Portal>
                        <Drawer.Backdrop />
                        <Drawer.Viewport>
                            <Drawer.Popup forceMount>
                                <Drawer.Content>
                                    <Drawer.Close>Close</Drawer.Close>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </Drawer.Portal>
                </Drawer.Root>
                <button type='button'>Outside</button>
            </>
        );

        expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'false');
        await assertFocusTrap(portalRoot);
        await user.tab();
        expect(screen.getByText('Outside')).not.toHaveFocus();
        cleanup();
    });

    test('fires onOpenChangeComplete after the transition window for open and close', () => {
        jest.useFakeTimers();
        const handleOpenChangeComplete = jest.fn();

        function TestDrawer() {
            const [open, setOpen] = React.useState(false);

            return (
                <>
                    <button type='button' onClick={() => setOpen(true)}>Open</button>
                    <button type='button' onClick={() => setOpen(false)}>Close</button>
                    <Drawer.Root open={open} onOpenChangeComplete={handleOpenChangeComplete}>
                        <Drawer.Viewport>
                            <Drawer.Popup forceMount>
                                <Drawer.Content>
                                    <Drawer.Title>Transition</Drawer.Title>
                                </Drawer.Content>
                            </Drawer.Popup>
                        </Drawer.Viewport>
                    </Drawer.Root>
                </>
            );
        }

        try {
            render(<TestDrawer />);

            act(() => {
                jest.advanceTimersByTime(420);
            });

            fireEvent.click(screen.getByText('Open'));
            act(() => {
                jest.advanceTimersByTime(420);
            });

            fireEvent.click(screen.getByText('Close'));
            act(() => {
                jest.advanceTimersByTime(420);
            });

            expect(handleOpenChangeComplete).toHaveBeenNthCalledWith(1, false);
            expect(handleOpenChangeComplete).toHaveBeenNthCalledWith(2, true);
            expect(handleOpenChangeComplete).toHaveBeenNthCalledWith(3, false);
        } finally {
            jest.useRealTimers();
        }
    });

    test('marks parent drawers when a nested drawer opens', async() => {
        const user = userEvent.setup();

        render(
            <Drawer.Root defaultOpen customRootClass='test-drawer'>
                <Drawer.Viewport data-testid='parent-viewport'>
                    <Drawer.Popup forceMount data-testid='parent-popup'>
                        <Drawer.Content>
                            <Drawer.Root>
                                <Drawer.Trigger>Open Child</Drawer.Trigger>
                                <Drawer.Viewport data-testid='child-viewport'>
                                    <Drawer.Popup forceMount>
                                        <Drawer.Content>
                                            <Drawer.Title>Child</Drawer.Title>
                                        </Drawer.Content>
                                    </Drawer.Popup>
                                </Drawer.Viewport>
                            </Drawer.Root>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        expect(screen.getByTestId('child-viewport')).toHaveAttribute('data-nested', '');

        await user.click(screen.getByText('Open Child'));

        expect(screen.getByTestId('parent-viewport')).toHaveAttribute('data-nested-drawer-open', '');
        expect(screen.getByTestId('parent-popup')).toHaveAttribute('data-nested-drawer-open', '');
        expect(screen.getByTestId('parent-popup')).toHaveAttribute('data-nested-drawer-count', '1');
        expect(screen.getByTestId('parent-popup').style.getPropertyValue('--rad-ui-drawer-nested-drawer-count')).toBe('1');
    });

    test('marks the nested drawer popup while its swipe area is being dragged', async() => {
        render(
            <Drawer.Root defaultOpen customRootClass='test-drawer'>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount data-testid='parent-popup'>
                        <Drawer.Content>
                            <Drawer.Root>
                                <Drawer.SwipeArea data-testid='child-swipe-area' />
                                <Drawer.Viewport>
                                    <Drawer.Popup forceMount>
                                        <Drawer.Content>
                                            <Drawer.Title>Child</Drawer.Title>
                                        </Drawer.Content>
                                    </Drawer.Popup>
                                </Drawer.Viewport>
                            </Drawer.Root>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const swipeArea = screen.getByTestId('child-swipe-area');
        const childPopup = screen.getByText('Child').closest('[role="dialog"]');

        fireEvent.pointerDown(swipeArea, { pointerId: 31, clientY: 790, button: 0, pointerType: 'touch' });

        await waitFor(() => {
            expect(childPopup).toHaveAttribute('data-nested-drawer-swiping', '');
        });

        fireEvent.pointerCancel(swipeArea, { pointerId: 31, clientY: 790, pointerType: 'touch' });

        await waitFor(() => {
            expect(childPopup).not.toHaveAttribute('data-nested-drawer-swiping');
        });
    });

    test('nested close button only closes the child drawer', async() => {
        const user = userEvent.setup();

        render(
            <Drawer.Root defaultOpen>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Parent Drawer</Drawer.Title>
                            <Drawer.Root>
                                <Drawer.Trigger>Open Child Drawer</Drawer.Trigger>
                                <Drawer.Viewport>
                                    <Drawer.Popup forceMount>
                                        <Drawer.Content>
                                            <Drawer.Title>Child Drawer</Drawer.Title>
                                            <Drawer.Close>Close Child</Drawer.Close>
                                        </Drawer.Content>
                                    </Drawer.Popup>
                                </Drawer.Viewport>
                            </Drawer.Root>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        await user.click(screen.getByText('Open Child Drawer'));

        const parentPopup = screen.getByText('Parent Drawer').closest('[role="dialog"]');
        const childPopup = screen.getByText('Child Drawer').closest('[role="dialog"]');

        expect(parentPopup).toHaveAttribute('data-state', 'open');
        expect(childPopup).toHaveAttribute('data-state', 'open');

        await user.click(screen.getByText('Close Child'));

        expect(parentPopup).toHaveAttribute('data-state', 'open');
        expect(screen.getByText('Child Drawer').closest('[role="dialog"]')).toHaveAttribute('data-state', 'closed');
    });

    test('nested drag handle interaction does not immediately close the drawer stack', () => {
        render(
            <Drawer.Root defaultOpen>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Parent Drawer</Drawer.Title>
                            <Drawer.Root defaultOpen>
                                <Drawer.Viewport>
                                    <Drawer.Popup forceMount>
                                        <Drawer.Content>
                                            <Drawer.Title>Child Drawer</Drawer.Title>
                                        </Drawer.Content>
                                    </Drawer.Popup>
                                </Drawer.Viewport>
                            </Drawer.Root>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popups = screen.getAllByRole('dialog');
        const childPopup = popups.find((popup) => popup.textContent?.includes('Child Drawer')) as HTMLElement;
        const restoreRect = mockElementRect(childPopup);

        fireEvent.pointerDown(childPopup, { pointerId: 41, clientY: 24, button: 0, pointerType: 'touch' });

        expect(screen.getByText('Parent Drawer').closest('[role="dialog"]')).toHaveAttribute('data-state', 'open');
        expect(childPopup).toHaveAttribute('data-state', 'open');

        restoreRect();
    });

    test('recent child swipe-dismiss suppresses the follow-up ancestor backdrop click', () => {
        const parentOpenChange = jest.fn();
        const childOpenChange = jest.fn();

        render(
            <Drawer.Root defaultOpen onOpenChange={parentOpenChange}>
                <Drawer.Portal>
                    <Drawer.Backdrop data-testid='parent-backdrop' forceMount />
                    <Drawer.Viewport>
                        <Drawer.Popup forceMount>
                            <Drawer.Content>
                                <Drawer.Title>Parent Drawer</Drawer.Title>
                                <Drawer.Root defaultOpen onOpenChange={childOpenChange}>
                                    <Drawer.Portal>
                                        <Drawer.Backdrop data-testid='child-backdrop' forceMount />
                                        <Drawer.Viewport>
                                            <Drawer.Popup forceMount>
                                                <Drawer.Content>
                                                    <Drawer.Title>Child Drawer</Drawer.Title>
                                                </Drawer.Content>
                                            </Drawer.Popup>
                                        </Drawer.Viewport>
                                    </Drawer.Portal>
                                </Drawer.Root>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Portal>
            </Drawer.Root>
        );

        const popups = screen.getAllByRole('dialog');
        const parentPopup = popups.find((popup) => popup.textContent?.includes('Parent Drawer')) as HTMLElement;
        const childPopup = popups.find((popup) => popup.textContent?.includes('Child Drawer')) as HTMLElement;
        const restoreRect = mockElementRect(childPopup);

        fireEvent.pointerDown(childPopup, { pointerId: 51, clientY: 24, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(childPopup, { pointerId: 51, clientY: 220, pointerType: 'touch' });
        fireEvent.pointerUp(childPopup, { pointerId: 51, clientY: 220, pointerType: 'touch' });

        fireEvent.click(screen.getByTestId('parent-backdrop'));

        expect(childOpenChange).toHaveBeenCalledWith(false, expect.any(Object));
        expect(parentOpenChange).not.toHaveBeenCalledWith(false, expect.any(Object));
        expect(screen.getByText('Parent Drawer').closest('[role="dialog"]')).toHaveAttribute('data-state', 'open');

        restoreRect();
    });

    test('does not open from a disabled trigger', async() => {
        const user = userEvent.setup();

        render(
            <Drawer.Root>
                <Drawer.Trigger disabled>Disabled Trigger</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Closed</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        await user.click(screen.getByText('Disabled Trigger'));
        expect(screen.getByText('Closed').closest('[role="dialog"]')).toHaveAttribute('data-state', 'closed');
    });

    test('does not close from a disabled close button', async() => {
        const user = userEvent.setup();

        render(
            <Drawer.Root defaultOpen>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Open Drawer</Drawer.Title>
                            <Drawer.Close disabled>Disabled Close</Drawer.Close>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        await user.click(screen.getByText('Disabled Close'));
        expect(screen.getByText('Open Drawer').closest('[role="dialog"]')).toHaveAttribute('data-state', 'open');
    });

    test('supports bottom-sheet drag to close from the header zone', () => {
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root open onOpenChange={handleOpenChange}>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        // Start inside the activation zone, drag far enough, then release.
        fireEvent.pointerDown(popup, { pointerId: 1, clientY: 24, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 1, clientY: 220, pointerType: 'touch' });
        fireEvent.pointerUp(popup, { pointerId: 1, clientY: 220, pointerType: 'touch' });

        expect(handleOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'swipe' }));
    });

    test('keeps the partial swipe offset long enough to animate a force-mounted close', async() => {
        function TestDrawer() {
            const [open, setOpen] = React.useState(true);

            return (
                <Drawer.Root open={open} onOpenChange={setOpen}>
                    <Drawer.Viewport>
                        <Drawer.Popup forceMount>
                            <Drawer.Content>
                                <Drawer.Title>Animated close</Drawer.Title>
                            </Drawer.Content>
                        </Drawer.Popup>
                    </Drawer.Viewport>
                </Drawer.Root>
            );
        }

        render(<TestDrawer />);

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        fireEvent.pointerDown(popup, { pointerId: 12, clientY: 24, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 12, clientY: 220, pointerType: 'touch' });
        fireEvent.pointerUp(popup, { pointerId: 12, clientY: 220, pointerType: 'touch' });

        expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute('data-state', 'closed');
        expect(popup.style.getPropertyValue('--rad-ui-drawer-drag-offset')).toBe('196px');

        await waitFor(() => {
            expect(screen.getByRole('dialog', { hidden: true }).style.getPropertyValue('--rad-ui-drawer-drag-offset')).toBe('0px');
        });
    });

    test('supports top-sheet drag to close from the bottom handle zone', () => {
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root open onOpenChange={handleOpenChange} swipeDirection='up'>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        // Start inside the bottom activation zone, drag upward far enough, then release.
        fireEvent.pointerDown(popup, { pointerId: 3, clientY: 388, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 3, clientY: 160, pointerType: 'touch' });
        fireEvent.pointerUp(popup, { pointerId: 3, clientY: 160, pointerType: 'touch' });

        expect(handleOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'swipe' }));
    });

    test('supports left drawer drag to close from the right handle zone', () => {
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root open onOpenChange={handleOpenChange} swipeDirection='left'>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        fireEvent.pointerDown(popup, { pointerId: 4, clientX: 308, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 4, clientX: 120, pointerType: 'touch' });
        fireEvent.pointerUp(popup, { pointerId: 4, clientX: 120, pointerType: 'touch' });

        expect(handleOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'swipe' }));
    });

    test('supports right drawer drag to close from the left handle zone', () => {
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root open onOpenChange={handleOpenChange} swipeDirection='right'>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        fireEvent.pointerDown(popup, { pointerId: 5, clientX: 12, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 5, clientX: 220, pointerType: 'touch' });
        fireEvent.pointerUp(popup, { pointerId: 5, clientX: 220, pointerType: 'touch' });

        expect(handleOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'swipe' }));
    });

    test('applies resisted upward stretch and snaps back instead of dismissing', () => {
        const handleOpenChange = jest.fn();

        render(
            <Drawer.Root open onOpenChange={handleOpenChange}>
                <Drawer.Trigger>Open</Drawer.Trigger>
                <Drawer.Viewport>
                    <Drawer.Popup forceMount>
                        <Drawer.Content>
                            <Drawer.Title>Title</Drawer.Title>
                        </Drawer.Content>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Root>
        );

        const popup = screen.getByRole('dialog');
        const originalRect = popup.getBoundingClientRect.bind(popup);

        popup.getBoundingClientRect = () => ({
            ...originalRect(),
            top: 0,
            left: 0,
            right: 320,
            bottom: 400,
            width: 320,
            height: 400,
            x: 0,
            y: 0,
            toJSON: () => {}
        });

        fireEvent.pointerDown(popup, { pointerId: 2, clientY: 24, button: 0, pointerType: 'touch' });
        fireEvent.pointerMove(popup, { pointerId: 2, clientY: -80, pointerType: 'touch' });

        expect(popup).toHaveAttribute('data-drag-stretching', 'true');
        expect((popup as HTMLElement).style.getPropertyValue('--rad-ui-drawer-drag-stretch')).not.toBe('0px');

        fireEvent.pointerUp(popup, { pointerId: 2, clientY: -80, pointerType: 'touch' });

        expect(handleOpenChange).not.toHaveBeenCalled();
        expect((popup as HTMLElement).style.getPropertyValue('--rad-ui-drawer-drag-stretch')).toBe('0px');
    });
});
