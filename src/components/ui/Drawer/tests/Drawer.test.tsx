import React, { createRef } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithPortal, assertFocusTrap, assertFocusReturn, assertScrollLock, assertScrollUnlock } from '~/test-utils/portal';
import Drawer from '../Drawer';

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
});
