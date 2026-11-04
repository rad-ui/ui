import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';
import AlertDialog from '../../AlertDialog/AlertDialog';

describe('Dialog onOpenChangeComplete', () => {
    test('fires with true after opening and false after closing (no animations)', async() => {
        const user = userEvent.setup();
        const onOpenChangeComplete = jest.fn();
        render(
            <Dialog.Root onOpenChangeComplete={onOpenChangeComplete}>
                <Dialog.Trigger>Open</Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content>
                        <Dialog.Title>Title</Dialog.Title>
                        <Dialog.Close>Close</Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        );
        await user.click(screen.getByText('Open'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
        expect(onOpenChangeComplete).toHaveBeenCalledTimes(1);
        await user.click(screen.getByText('Close'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(false));
        expect(onOpenChangeComplete).toHaveBeenCalledTimes(2);
    });

    test('AlertDialog passes it through', async() => {
        const user = userEvent.setup();
        const onOpenChangeComplete = jest.fn();
        render(
            <AlertDialog.Root onOpenChangeComplete={onOpenChangeComplete}>
                <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Title>Sure?</AlertDialog.Title>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );
        await user.click(screen.getByText('Delete'));
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenLastCalledWith(true));
    });
});
