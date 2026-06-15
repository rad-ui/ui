import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

describe('Dialog controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { unmount } = render(
            <Dialog.Root>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content>Content</Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Content')).toBeInTheDocument();
        unmount();

        render(
            <Dialog.Root open={false} onOpenChange={onOpenChange}>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content>Content</Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { unmount } = render(
            <Dialog.Root open onOpenChange={() => {}}>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content>Content</Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        expect(screen.getByText('Content')).toBeInTheDocument();
        unmount();

        render(
            <Dialog.Root>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content>Content</Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        await waitFor(() => {
            expect(screen.getByText('Content')).toBeInTheDocument();
        });
    });
});
