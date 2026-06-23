import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AlertDialog from '../AlertDialog';

describe('AlertDialog controlled/uncontrolled mode switching', () => {
    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(
            <AlertDialog.Root>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>Alert content</AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Alert content')).toBeInTheDocument();

        rerender(
            <AlertDialog.Root open={false} onOpenChange={onOpenChange}>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>Alert content</AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        expect(screen.queryByText('Alert content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(
            <AlertDialog.Root open onOpenChange={() => {}}>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>Alert content</AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        expect(screen.getByText('Alert content')).toBeInTheDocument();

        rerender(
            <AlertDialog.Root defaultOpen={false}>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>Alert content</AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        expect(screen.queryByText('Alert content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    test('closes without onOpenChange callback', async() => {
        const user = userEvent.setup();

        render(
            <AlertDialog.Root defaultOpen>
                <AlertDialog.Trigger>Open</AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Content>
                        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        );

        await user.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
});
