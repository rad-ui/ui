import React from 'react';
import { render } from '@testing-library/react';
import AlertDialog from '../AlertDialog';

describe('AlertDialog forwardRef', () => {
    test('forwards refs to underlying elements', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const triggerRef = React.createRef<HTMLButtonElement>();
        const overlayRef = React.createRef<HTMLDivElement>();
        const contentRef = React.createRef<HTMLDivElement>();
        const titleRef = React.createRef<HTMLHeadingElement>();
        const descRef = React.createRef<HTMLParagraphElement>();
        const cancelRef = React.createRef<HTMLButtonElement>();
        const actionRef = React.createRef<HTMLButtonElement>();

        render(
            <AlertDialog.Root ref={rootRef} open={true}>
                <AlertDialog.Trigger ref={triggerRef}>Trigger</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay ref={overlayRef} />
                    <AlertDialog.Content ref={contentRef}>
                        <AlertDialog.Title ref={titleRef}>Title</AlertDialog.Title>
                        <AlertDialog.Description ref={descRef}>Description</AlertDialog.Description>
                        <AlertDialog.Cancel ref={cancelRef}>Cancel</AlertDialog.Cancel>
                        <AlertDialog.Action ref={actionRef}>Action</AlertDialog.Action>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(overlayRef.current).toBeInstanceOf(HTMLDivElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(titleRef.current).toBeInstanceOf(HTMLHeadingElement);
        expect(descRef.current).toBeInstanceOf(HTMLParagraphElement);
        expect(cancelRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(actionRef.current).toBeInstanceOf(HTMLButtonElement);
    });
});
