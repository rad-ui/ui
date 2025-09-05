import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Dialog from '../Dialog';

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
});

