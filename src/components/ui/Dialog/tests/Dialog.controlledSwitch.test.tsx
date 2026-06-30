import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../Dialog';

describe('Dialog controlled/uncontrolled mode switching', () => {
    const dialog = (rootProps: Partial<React.ComponentProps<typeof Dialog.Root>>) => (
        <Dialog.Root {...rootProps}>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content>Content</Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );

    test('switches from uncontrolled to controlled', async() => {
        const user = userEvent.setup();
        const onOpenChange = jest.fn();

        const { rerender } = render(dialog({}));
        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Content')).toBeInTheDocument();

        rerender(dialog({ open: false, onOpenChange }));

        await user.click(screen.getByText('Open'));
        expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    test('switches from controlled to uncontrolled', async() => {
        const user = userEvent.setup();

        const { rerender } = render(dialog({ open: true, onOpenChange: () => {} }));
        expect(screen.getByText('Content')).toBeInTheDocument();

        rerender(dialog({}));
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
        await user.click(screen.getByText('Open'));
        await waitFor(() => {
            expect(screen.getByText('Content')).toBeInTheDocument();
        });
    });
});
