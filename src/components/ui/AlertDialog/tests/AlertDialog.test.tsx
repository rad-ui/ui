import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import AlertDialog from '../AlertDialog';

describe('AlertDialog', () => {
    test('forwards refs to subcomponents', () => {
        const rootRef = createRef<HTMLDivElement>();
        const triggerRef = createRef<HTMLButtonElement>();
        const overlayRef = createRef<HTMLDivElement>();
        const contentRef = createRef<HTMLDivElement>();
        const titleRef = createRef<HTMLHeadingElement>();
        const descriptionRef = createRef<HTMLParagraphElement>();
        const cancelRef = createRef<HTMLButtonElement>();
        const actionRef = createRef<HTMLButtonElement>();

        render(
            <AlertDialog.Root ref={rootRef} open>
                <AlertDialog.Trigger ref={triggerRef}>Open</AlertDialog.Trigger>
                <AlertDialog.Overlay ref={overlayRef} />
                <AlertDialog.Content ref={contentRef}>
                    <AlertDialog.Title ref={titleRef}>Title</AlertDialog.Title>
                    <AlertDialog.Description ref={descriptionRef}>Description</AlertDialog.Description>
                    <AlertDialog.Cancel ref={cancelRef}>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action ref={actionRef}>Action</AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(overlayRef.current).toBeInstanceOf(HTMLDivElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(titleRef.current?.tagName).toBe('H2');
        expect(descriptionRef.current?.tagName).toBe('P');
        expect(cancelRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(actionRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <AlertDialog.Root open>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Overlay />
                <AlertDialog.Content>
                    <AlertDialog.Title>Title</AlertDialog.Title>
                    <AlertDialog.Description>Description</AlertDialog.Description>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action>Action</AlertDialog.Action>
                </AlertDialog.Content>
            </AlertDialog.Root>
        );

        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });
});
