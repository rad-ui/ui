import React, { createRef } from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { assertFocusTrap, assertFocusReturn, assertScrollLock, assertScrollUnlock } from '~/test-utils/portal';
import Dialog from '../Dialog';
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

describe('Dialog', () => {
    test('forwards refs to subcomponents', () => {
        const rootRef = createRef<HTMLDivElement>();
        const triggerRef = createRef<HTMLButtonElement>();
        const overlayRef = createRef<HTMLDivElement>();
        const contentRef = createRef<HTMLDivElement>();
        const titleRef = createRef<HTMLHeadingElement>();
        const descriptionRef = createRef<HTMLParagraphElement>();
        const closeRef = createRef<HTMLButtonElement>();

        render(
            <Dialog.Root ref={rootRef} open>
                <Dialog.Trigger ref={triggerRef}>Open</Dialog.Trigger>
                <Dialog.Overlay ref={overlayRef} />
                <Dialog.Content ref={contentRef}>
                    <Dialog.Title ref={titleRef}>Title</Dialog.Title>
                    <Dialog.Description ref={descriptionRef}>Description</Dialog.Description>
                    <Dialog.Close ref={closeRef}>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(overlayRef.current).toBeInstanceOf(HTMLDivElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(titleRef.current?.tagName).toBe('H2');
        expect(descriptionRef.current?.tagName).toBe('P');
        expect(closeRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('hides content when closed and shows when open', () => {
        const closed = render(
            <Dialog.Root>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Description</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        );

        expect(closed.queryByText('Description')).toBeNull();
        closed.unmount();

        const opened = render(
            <Dialog.Root open>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Description</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        );

        expect(opened.queryByText('Description')).toBeInTheDocument();
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <Dialog.Root open>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Title</Dialog.Title>
                    <Dialog.Description>Description</Dialog.Description>
                    <Dialog.Close>Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Root>
        );

        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });

    test('mounts in portal, traps focus, returns focus and locks scroll', async() => {
        mockMatchMedia();
        const user = userEvent.setup();
        const { getByText, unmount } = render(
            <Theme id="rad-ui-theme-container">
                <Dialog.Root>
                    <Dialog.Trigger>Trigger</Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay />
                        <Dialog.Content>
                            <Dialog.Close>Close</Dialog.Close>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </Theme>
        );

        const portalRoot = document.querySelector('[data-rad-ui-portal-root]') as HTMLElement;

        await user.click(getByText('Trigger'));
        await waitFor(() => assertScrollLock());
        await assertFocusTrap(portalRoot);
        await user.click(getByText('Close'));
        assertFocusReturn(getByText('Trigger'));
        await waitFor(() => assertScrollUnlock());
        unmount();
    });

    test('renders under StrictMode without console errors', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const { getByText, unmount } = render(
            <React.StrictMode>
                <Dialog.Root open>
                    <Dialog.Trigger>Open</Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>Title</Dialog.Title>
                        <Dialog.Close>Close</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Root>
            </React.StrictMode>
        );

        expect(getByText('Title')).toBeInTheDocument();
        unmount();
        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
    });
});
